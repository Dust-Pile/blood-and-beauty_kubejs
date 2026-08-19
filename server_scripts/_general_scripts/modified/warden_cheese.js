// wardenzola ha ha ha

const DAMAGE_TABLE = [ 1, 1, 1, 1, 0.9, 0.75, 0.5, 0.25, 0.13, 0.06 ]
const HP_THRESHOLD = 10
const CHEESE_EVENT_THRESHOLD = DAMAGE_TABLE.length

var lastTime = Date.now().valueOf()
var wardenCowards = {}

EntityEvents.spawned( "minecraft:warden", event => {
    const { entity } = event

    var currentTime = Date.now().valueOf()
    if ( currentTime - lastTime >= 20*60 ) { // One minute
        global.forEachIn( wardenCowards, ( data, name ) => {
            if ( !data.entity.alive ) {
                delete wardenCowards[ name ]
            }
        })
    }

    wardenCowards[ entity.username ] = {
        entity: entity,
        cheeseHits: 0,
        cheeseEvents: 0,
        maxHp: 550,
        exploded: false
    }

    global.tick.timeout( () => {
        wardenCowards[ entity.username ].maxHp = entity.nbt.Health
        global.run( 'data modify entity ' + entity.username + ' Brain.memories."minecraft:dig_cooldown".ttl set value 6000' )
    }, 1 )

} )

EntityEvents.hurt( event => {
    const { entity, source } = event

    if ( source.getType().equals( "sonic_boom" ) ) {
        wardenExplode( event, source.causingEntity )
        return
    } else if ( entity.type.equals( 'minecraft:warden' ) ) {
        wardenDamageModifier( event )
        return
    }
    
})

EntityEvents.death( "minecraft:warden", event => {
    const { entity } = event

    delete wardenCowards[ entity.username ]
} )

LootJS.modifiers( event => {
    event.addEntityLootModifier( "minecraft:warden" )
        .removeLoot("deeperdarker:heart_of_the_deep")
        .removeLoot("deeperdarker:warden_carapace")
        .pool( p => {
            p
                .rolls([1, 1])
                .customCondition({
                    "condition": "minecraft:killed_by_player",
                    "inverse": true
                })
                .addLoot("deeperdarker:heart_of_the_deep")
                .addLoot("deeperdarker:warden_carapace")
        })
})

// Hurt Actions
function wardenExplode( event, warden ) {
    const { x, y, z } = warden
    event.level.getBlock( x, y + 2, z ).createExplosion().causesFire( false ).strength( 3.5 ).explosionMode( "block" ).explode()
    wardenCowards[ warden.username ].exploded = true
}

function wardenDamageModifier( event ) {
    const { damage, entity: warden, source } = event

    var wardenData = wardenCowards[ warden.username ]
    var player = source.causingEntity
    if ( player == undefined ) {
        player = source.actual
    }

    var health = warden.nbt.Health
    var isCheese = false

    if ( source.getType().equals( 'genericKill' ) || source.getType.equals( "minecraft:wither" )
        || source.getType().equals( 'minecraft:in_fire' ) || source.getType().equals( "minecraft:on_fire" )
    ) {
        return
    } else if ( source.getType().equals( 'explosion' ) && wardenData.exploded ) {
        wardenData.exploded = false
        event.cancel()
    }

    if ( player == undefined || !player.isPlayer() || !inRange( warden, player ) ) {
        isCheese = true
        wardenData.cheeseHits++
    } else {
        if ( wardenData.cheeseHits >= 4 ) {
            wardenData.cheeseEvents++
        }
        wardenData.cheeseHits = 0
    }

    if ( isCheese ) {
        var realDamage = Math.ceil( reduceDamage( damage, health, wardenData ) )
        Utils.server.runCommandSilent( 'damage ' + warden.username + ' ' + realDamage + ' minecraft:generic_kill' )
        warden.invulnerableTime = 10
        event.cancel()
    } else {
        return
    }
}

// Helper Functions
function inRange( warden, player ) {
    const { x, y, z } = player
    const { x:wx, y:wy, z:wz } = warden
    return ( 1 >= ( Math.pow( (x-wx)/14, 2 ) + Math.pow( ((y-wy)/20), 2 ) + Math.pow( ((z-wz)/14), 2 ) ) )
}
function reduceDamage( damage, health, wardenData ) {
    var reducedDamage = damage
    var level = wardenData.cheeseHits + wardenData.cheeseEvents - 1
    if ( level < DAMAGE_TABLE.length ) {
        reducedDamage *= DAMAGE_TABLE[ level ]
    } else if ( wardenData.cheeseHits == 1 ) {
        reducedDamage *= DAMAGE_TABLE[ DAMAGE_TABLE.length - 1 ]
    } else {
        return 0
    }

    if ( health - reducedDamage <= HP_THRESHOLD ) {
        return 0
    }

    return reducedDamage * ( asymtoteCurve( health, HP_THRESHOLD, wardenData.maxHp ) + 0.05 )
}
function asymtoteCurve( x, zero, percentile95 ) {
    var weight = ( percentile95 - zero ) / 19

    return ( 1 - ( weight / ( x - zero + weight ) ) )
}

//data modify entity @e[type=warden,limit=1] Brain.memories."minecraft:dig_cooldown".ttl set value 0
//data modify entity @e[type=warden,limit=1] PersistenceRequired set value 0b
//Brain.memories."minecraft:sonic_boom_cooldown".ttl