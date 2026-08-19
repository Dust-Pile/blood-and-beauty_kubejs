//priority: 1

const DROPS_COINS_TAG = "DROPS_COINS"
const BOSSMOB_TAG = "BOSSMOB"

var coin_data = global.coin_data
var coinValues = coin_data.values
var coins = coin_data.coins

// Label Entities with tier and boolean tag
EntityEvents.spawned( event => {
    const { entity } = event

    global.tick.timeout( () => {
        // Only living entities drop coins
        if ( !entity.isLiving() ) {
            return
        }

        // Check if the entity drops coins
        if ( global.run( 'execute as ' + entity.username + ' if entity @s[type=#bloodandbeauty:drops_coins]' )
        ) {
            entity.addTag( DROPS_COINS_TAG )
        } else {
            return
        }

        // Check if is bossmob ( shared coins will not be reduced )
        if (
            global.run( 'execute as ' + entity.username + ' if entity @s[type=#bloodandbeauty:bossmob]' )
        ) {
            entity.addTag( BOSSMOB_TAG )
        }

        // Filter the type of coin dropper
        for ( var tier of Object.keys( mobs ) ) {
            if ( 
                global.run( 'execute as ' + entity.username + ' if entity @s[type=#bloodandbeauty:' + tier + ']' )
            ) {
                entity.addTag( tier.toUpperCase() )
                return
            }
        }

    }, 0)
    
})
ServerEvents.tags( 'entity_type', event => {
    global.forEachIn( mobs, ( data, tier ) => {
        var entities = data.entities
        // Add to main catagory
        event.add( 'bloodandbeauty:drops_coins', entities )
        // Add to specific category
        event.add( 'bloodandbeauty:' + tier, entities )
        // Boss tag
        if ( /boss/.test( tier ) ) {
            event.add( 'bloodandbeauty:bossmob', entities )
        }
    } )
})

// Credit players with damage to award coin
var hitCredit = {}
EntityEvents.hurt( event => {
    const { entity, source, damage } = event

    if ( !entity.tags.contains( DROPS_COINS_TAG ) ) {
        return
    }

    var username = '_Non_Player' // Mojang does not allow a username to start with '_'
    if ( source.player != null ) {
        username = source.player.username
    }

    var identifier = entity.uuid.toString()
    var entityData = hitCredit[ identifier ]
    if ( hitCredit[ identifier ] == null ) {
        hitCredit[ identifier ] = {}
        entityData = hitCredit[ identifier ]
    }

    if ( entityData[ username ] == null ) {
        entityData[ username ] = damage
    } else {
        entityData[ username ] += damage
    }
})

EntityEvents.death( event => {
    const { entity, source, level } = event
    var identifier = entity.uuid.toString()
    var entityData = hitCredit[ identifier ]

    if ( !entity.tags.contains( DROPS_COINS_TAG ) ) {
        return
    }

    global.tick.timeout( () => {
        if ( entity.isAlive() ) {
            return
        }

        // Get basic constants
        var playerDamageSum = 0
        var numPlayers = 0
        var maxPlayerDamage = 0
        var nonPlayerDamage = entityData._Non_Player == null ? 0 : entityData._Non_Player
        global.forEachIn( entityData, ( damage, player ) => {
            if ( /^_/.test( player ) ) {
                return
            }
            playerDamageSum += damage

            // Exclude offline players
            if ( Utils.server.playerNames.indexOf( player ) < 0 ) {
                delete entityData[ player ]
                return
            }

            numPlayers ++
            maxPlayerDamage = damage > maxPlayerDamage ? damage : maxPlayerDamage
        })

        // Rectify nonPlayerDamage
        var shouldDropItems = source.player == null ? 
            ( nonPlayerDamage > maxPlayerDamage ) : 
            ( nonPlayerDamage > playerDamageSum ) && ( nonPlayerDamage > 1.25*maxPlayerDamage ) 
            // Will not drop for a single player
        if ( nonPlayerDamage > playerDamageSum ) {
            maxPlayerDamage = nonPlayerDamage
        } else if ( nonPlayerDamage > maxPlayerDamage ) {
            nonPlayerDamage = maxPlayerDamage
        }
        numPlayers += shouldDropItems ? 1 : 0

        // Get base coin values
        var tier = getTier( entity )
        var coinValue = valueFromTier( getLevel( entity ), tier )
        if ( !entity.tags.contains( BOSSMOB_TAG ) ) {
            coinValue *= shareMax( numPlayers )
        }

        // Apply Values
        global.forEachIn( entityData, ( damage, player ) => {
            if ( /^_/.test( player ) ) {
                if ( shouldDropItems ) {
                    dropItems( valueToCoinsPartial( coinValue * ( damage / maxPlayerDamage ) ), entity, level )
                }
                return
            }

            var coinsToGive = valueToCoinsPartial( coinValue * ( damage / maxPlayerDamage ) )
            var playerObj = Utils.server.getPlayer( player )

            if ( coin_data.hasPouch( playerObj ) ) {
                if ( coin_data.addCoinsToBundle( playerObj, coinsToGive ) ) {
                    return
                }
            }

            for ( var coinStack of coinsToGive ) {
                playerObj.give( coinStack )
            }
        })

        delete hitCredit[ entity.uuid.toString() ]
    }, 0)

})

// Coin managing functions
/**
 * @param {Number} value 
 * @returns {Internal.ItemStack[]}
 */
function valueToCoinsPartial ( value ) {
    value = Math.ceil( value )

    var outputCoins = []
    var coinTypes = 0
    for ( var i = coins.length - 1; i >= 0; i-- ) {
        var count = 0

        while ( value >= coinValues[ coins[ i ] ] ) {
            value -= coinValues[ coins[ i ] ]
            count++
        }
        if ( count > 0 ) {
            outputCoins.push( Item.of( coins[ i ], count ) )
            coinTypes++

            if ( coinTypes >= 3 ) {
                return outputCoins
            }
        }
    }
    return outputCoins
}

// Helper Functions
function shareMax( numPlayers ) {
    return 1 / ( ( numPlayers * ( 1/4 ) ) + 1 )
}
function valueFromTier( entityLevel, tier ) {
    // May need more functionality later...
    return generateValue( entityLevel, mobs[ tier ].rewards.coinValues[ 0 ], mobs[ tier ].rewards.coinValues[ 1 ] )
}
/**
 * @param {Number} entityLevel 
 * @param {Number} minValue 
 * @param {Number} maxValue 
 * @param {Function} randomProvider 
 * @param {Function} levelFunction 
 * @returns {Number}
 */
function generateValue( entityLevel, minValue, maxValue, randomProvider, levelFunction ) {
    // Allows changeing the distrobution.
    if ( randomProvider == null ) {
        randomProvider = () => { return ( Utils.random.nextDouble() + Utils.random.nextDouble() ) / 2 }
    }

    if ( levelFunction == null ) {
        levelFunction = ( level ) => { 
            var sqrtLevelDiv = Math.sqrt( level ) / 2
            return 1 + ( Utils.random.nextDouble() * ( sqrtLevelDiv - 0.5 ) ) + sqrtLevelDiv
        }
    }

    var value = minValue + ( randomProvider() * ( maxValue - minValue ) )
    value *= levelFunction( entityLevel )
    return value
}
/**
 * @param {Internal.LivingEntity} entity 
 */
function getLevel( entity ) {
    return entity.nbt.ForgeData.LEVEL + 1
}
/**
 * @param {Internal.LivingEntity} entity 
 */
function getTier( entity ) {
    return global.forEachIn( mobs, ( data, tier ) => {
        if ( entity.tags.contains( tier.toUpperCase() ) ) {
            return tier
        }
    })
}
/**
 * @param {Internal.ItemStack[]} items 
 * @param {Internal.LivingEntity} entity
 * @param {Internal.Level} level
 */
function dropItems( items, entity, level ) {
    for ( var itemStack of items ) {
        var coinItemEntity = level.createEntity( 'minecraft:item' )
        coinItemEntity.setNbt( { Item: { id: itemStack.id, Count: itemStack.count } } )
        coinItemEntity.setX( entity.x )
        coinItemEntity.setY( entity.y )
        coinItemEntity.setZ( entity.z )
        coinItemEntity.spawn()
    }
}

// Data
    // Whitelisted mobs and catagories
    // TODO: make lists
    // TODO: convert to json file
var mobs = {
    tier_1: {
        entities: [
            //'minecraft:creeper'
        ],
        rewards: {
            coinValues: [ 1, 5 ]
        }
    },
    tier_2: {
        entities: [],
        rewards: {
            coinValues: [ 1, 15 ]
        }
    }, //... more tiers possible
    minor_boss: {
        entities: [],
        rewards: {
            coinValues: [ 1, 15 ]
        }
    },
    boss: {
        entities: [],
        rewards: {
            coinValues: [ 1, 15 ],
            special: 'createdeco:netherite_coin'
        }
    }
}