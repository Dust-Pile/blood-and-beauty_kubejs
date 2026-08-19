const RECIPE_TIME = 200

// Recipe
ServerEvents.recipes( event => {
    event.shaped(
        Item.of( 'summoningrituals:altar', 1 ),
        [
            'ABA',
            ' C ',
            'DED'
        ],
        {
            A: "hexerei:candle",
            B: '#bloodandbeauty:skulls',
            C: "hexerei:infused_fabric_block_ornate",
            D: '#minecraft:planks',
            E: "vital_herbs:aura_crystal"
        }
    )

    // Recipe
    event.recipes.summoningrituals.altar( "waystones:warp_stone" )
        .blockBelow( 'dungeonsdelight:dungeon_stove', { lit: true } )
        .itemOutput( 'bloodandbeauty:hellish_viscera' )
        .input( [
            "meds_and_herbs:poison_hpp",
            "create_things_and_misc:crushed_magma",
            "createaddition:electrum_block"
        ] )
        .dayTime( 'night' )
        .recipeTime( RECIPE_TIME )

    //     .sacrifice( 'sons_of_sins:blud' )
    //     .sacrificeRegion( 3, 3 )
    
})
ServerEvents.tags( 'item', event => {
    for ( var skull of skulls ) {
        event.add( 'bloodandbeauty:skulls', skull )
    }
})

// Portal Lighting Rules
ItemEvents.rightClicked( 'bloodandbeauty:hellish_viscera', event => {
    const { player, level, hand } = event
    var target = player.rayTrace( player.blockReach, false )
    if ( !target.type.toString().equals( 'BLOCK' ) || !target.block.id.equals( 'minecraft:obsidian' ) ) {
        return
    }
    var hitLocation = player.pick( player.blockReach, 0, false ).location
    
    var hitBlock = level.getBlock( hitLocation )
    if ( !hitBlock.id.equals( 'minecraft:air' ) ) {
        var newLoc = oppositeBlock( hitLocation )
        hitBlock = level.getBlock( Math.floor( newLoc.x ), Math.floor( newLoc.y ), Math.floor( newLoc.z ) )
        if ( !hitBlock.id.equals( 'minecraft:air' ) ) {
            return
        }
    }

    hitBlock.set( 'minecraft:fire' )
    const { x, y, z } = hitBlock
    if ( !level.getBlock( x, y, z ).id.equals( 'minecraft:nether_portal' ) ) {
        hitBlock.set( 'minecraft:air' )
        return
    }
    player.swing( hand, true )
    
    var loc = global.new.point( x, y, z )
    global.run([
        'playsound minecraft:block.end_portal.spawn master @a ' + loc.toCommandString() + ' 1 0.5',
        'playsound sons_of_sins:ether_scream master @a ' + loc.toCommandString() + ' 1 0.5'
    ])
})
BlockEvents.placed( 'minecraft:fire', event => {
    const { player, block, level } = event

    if ( level.name.string.equals( "minecraft:the_nether" ) ) {
        return
    }

    for ( var dir of directions ) {
        if (  block[ dir ].id.equals( 'minecraft:obsidian' ) ) {
            if ( player != undefined ) {
                global.run( 'title ' + player.username + ' actionbar {"text":"Something else is needed to light the portal...","italic":"true","color":"gray"}')
            }
            event.cancel()
        }
    }  
})
var directions = [
    'up',
    'down',
    'east',
    'west',
    'north',
    'south'
]
function oppositeBlock( vector ) {
    var output = {
        x: vector.x(),
        y: vector.y(),
        z: vector.z()
    }
    if ( output.x % 1 == 0 ) {
        output.x -= 0.75
    } else if ( output.y % 1 == 0 ) {
        output.y -= 0.75
    } else {
        output.z -= 0.75
    }
    return output
}

// Data
var skulls = [
    "dustydecorations:wolf_skull",
    "dustydecorations:equine_skull",
    "dustydecorations:cow_skull",
    "betterarcheology:wolf_fossil_head",
    "betterarcheology:ocelot_fossil_head",
    "betterarcheology:chicken_fossil_head",
    "betterarcheology:villager_fossil_head",
    "betterarcheology:creeper_fossil_head",
    "kobolds:kobold_skull",
    "minecraft:wither_skeleton_skull",
    "minecraft:skeleton_skull",
    "uniqueaccessories:starved_wolf_skull",
    "artifacts:obsidian_skull",
    "betterarcheology:guardian_fossil_head",
    "betterarcheology:sheep_fossil_head"
]
var sinLoot = [
    "sons_of_sins:ether_engine",
    "sons_of_sins:cursed_head",
    "sons_of_sins:butcher_cleaver",
    "sons_of_sins:bloody_bone",
    "sons_of_sins:wistivers_jaws",
    "sons_of_sins:hand_of_riot",
    "sons_of_sins:puppet_of_strife",
    "sons_of_sins:touch_of_greed",
    "sons_of_sins:ether_ashes",
    "sons_of_sins:soul_steel"
]

// Fancy Effects for recipe complete + confirmation
SummoningRituals.start( event => {
    const { pos, player } = event

    if ( !event.getRecipe().catalyst.getFirst().id.equals( "waystones:warp_stone" ) ) {
        return
    }

    const { x, y, z } = pos
    var loc = global.new.point( x, y, z )

    // Sacrifice Handler
    if ( global.run( 
        'execute positioned ' + loc.toCommandString() + ' if entity @e[type=#sons_of_sins:is_a_sin, distance=..3]' 
    ) == 1 ) {
        global.run([
            'execute positioned ' + loc.toCommandString() + ' as @e[type=#sons_of_sins:is_a_sin, distance=..3,limit=1] at @s run summon marker ~ ~ ~ {Tags:["bnb_sin_sacrifice"]}',
            'execute at @e[tag=bnb_sin_sacrifice] run kill @e[type=#sons_of_sins:is_a_sin,limit=1,distance=..0.1]'
        ])
        for ( var loot of sinLoot ) {
            global.run( 'execute at @e[tag=bnb_sin_sacrifice] run kill @e[nbt={Item:{id:"'+loot+'"}},distance=..1]' )
        }
        global.run( 'kill @e[tag=bnb_sin_sacrifice]' )
    } else {
        global.run( 'title ' + player.username + ' actionbar {"text":"A sin must be sacrificed to complete the ritual...","italic":"true","color":"gray"}' )
        event.cancel()
    }

    // Effects
    loc.y += 1.25
    global.run([
        'playsound sons_of_sins:ether_scream master @a ' + loc.toCommandString() + ' 0.5 0.75',
        'particle sons_of_sins:blood_particle ' + loc.toCommandString() + ' 0 0 0 0.05 1'
    ])

    for ( var i = 1; i < RECIPE_TIME; i++ ) {
        loc.y += ( 2 - 1.25 ) / 198
        if ( i % 2 != 0 ) {
            continue
        }

        var thisPos = loc.toCommandString()
        global.tick.timeout( () => {
            global.run( 'particle sons_of_sins:blood_particle ' + thisPos + ' 0 0 0 0.05 1' )
        }, i)

        if ( i % 40 != 0 ) {
            continue
        }
        global.tick.timeout( () => {
            global.run( 'playsound sons_of_sins:ether_ambient master @a ' + thisPos + ' 1 1' )
        }, i)
    }
    
})
SummoningRituals.complete( event => {
    const { pos } = event
    const { x, y, z } = pos
    var loc = global.new.point( x, y+2, z )

    if ( !event.getRecipe().catalyst.getFirst().id.equals( "waystones:warp_stone" ) ) {
        return
    }

    // Finishing Effects
    global.run([
        'playsound sons_of_sins:ether_scream master @a ' + loc.toCommandString() + ' 1 1',
        'particle sons_of_sins:ether_soul ' + loc.toCommandString() + ' 0 0 0 0.1 40',
        'playsound alexsmobs:dropbear_hurt master @a ' + loc.toCommandString() + ' 1.25 0.75',
        'playsound alexsmobs:dropbear_hurt master @a ' + loc.toCommandString() + ' 1 0.5'
    ])
})