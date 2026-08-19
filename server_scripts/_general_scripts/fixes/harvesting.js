var tickLimiter = {}
var timeout = { hasRun: true }

//Right click harvest for vital herbs
BlockEvents.rightClicked( event => {
    const { player, block, item } = event

    // Prevent double clicking
    if ( tickLimiter[ player.username ] != undefined ) {
        return
    } else {
        tickLimiter[ player.username ] = true
        if ( timeout.hasRun ) {
            timeout = global.tick.timeout( () => {
                tickLimiter = {}
            }, 0 )
        }
    }

    if ( harvestCrop( block ) ) {
        player.swing( "main_hand", true )

        if ( item.hasTag('minecraft:hoes') ) {
            var size = item.hasTag('quark:big_harvesting_hoes') ? 2 : 1
            const { x, y, z } = block
            for ( var i = ( 0 - size ); i <= size; i++ ) {
                for ( var j = ( 0 - size ); j <= size; j++ ) {
                    for ( var k = 0; k <= 1; k++ ) {
                        harvestCrop( event.level.getBlock( x+i, y+k, z+j ) )
                    }
                }
            }
        }
    }

    //TODO: add bushes and leaves

})

// ServerEvents.tick( event => {
//     tickLimiter = {}
// })

function harvestCrop( block ) {
    if ( !block.hasTag( 'minecraft:crops' ) ) {
        if ( block.hasTag( 'meds_and_herbs:grown_crops' ) ) {
            return medsAndHerbsCrop( block )
        } else {
            return false
        }
    } else if ( block.hasTag( 'bloodandbeauty:nonxp_crop' ) ) {
        return false
    }

    const state = global.blockState.getOptions( block )
    if ( state.age == undefined || state.age.value < state.age.options.length - 1 ) {
        if ( !block.id.split(':')[0].equals('createcafe') || state.age.value != 3 ) {
            return false
        }
    }

    if ( block.id.equals('supplementaries:flax') && state.half.value.equals('upper') ) {
        const { x, y, z } = block
        var loc = global.new.point( x, y, z )

        loc.y -= 1
        global.run([
            'setblock ' + loc.toCommandString() + ' minecraft:air destroy',
            'setblock ' + loc.toCommandString() + ' supplementaries:flax[age=0,half=lower] replace'
        ])
    }

    summonXpOrb( block, 0.4, [2,4] )

    vitalHerbsCrop( block, state )

    return true
}

// Special Managers

    //TODO: drop less seeds
function vitalHerbsCrop( block, blockstate ) {
    if ( !block.hasTag('vital_herbs:vital_herbs_crop') ) {
        return false
    }

    summonXpOrb( block, 0.5, [2,2] )

    let loc = global.new.point(block.x, block.y, block.z)
    global.run('setblock ' + loc.toCommandString() + ' minecraft:air destroy')

    if ( blockstate.waterlogged != undefined && blockstate.waterlogged.value ) {
        global.run('setblock ' + loc.toCommandString() + ' ' + block.id + '[age=0,waterlogged=true]')
    } else {
        global.run('setblock ' + loc.toCommandString() + ' ' + block.id + '[age=0] replace')
    }
    return true

}
function medsAndHerbsCrop( block ) {
    const { x, y, z } = block
    var loc = global.new.point( x, y, z )
    if ( global.blockState.get( block ).half != undefined && global.blockState.get( block ).half.equals( 'upper' ) ) {
        loc.y -= 1
    }

    //Spawn Loot
    var crop = medsAndHerbsCrops[ block.id.toString() ]
    global.forEachIn( crop.loot, ( amount, itemId ) => {
        block.popItem( Item.of( itemId, amount ) )
    } )

    global.run([
        'setblock ' + loc.toCommandString() + ' minecraft:air destroy',
        'setblock ' + loc.toCommandString() + ' ' + crop.replace + ' replace'
    ])
    summonXpOrb( block, 0.4, [2,4] )
    return true
}
// Helper Functions
function summonXpOrb( block, chance, range ) {
    if ( Math.random() > chance ) {
        return
    }

    const { x, y, z } = block
    var loc = global.new.point( x+0.5, y+0.1, z+0.5 )
    var amount = Math.round( ( Math.random() * (range[1] - range[0]) ) + range[0] )
    global.run('summon minecraft:experience_orb ' + loc.toCommandString() + ' {clumpedMap:{1:'+amount+'}}')
}

ServerEvents.tags( 'block', event => {
    global.forEachIn( medsAndHerbsCrops, ( crop, name ) => {
        event.add('meds_and_herbs:grown_crops', name )
    })
    for ( var crop of addToMinecraftCrops ) {
        event.add('minecraft:crops', crop )
    }
    for ( var crop of cropBlacklist ) {
        event.add('bloodandbeauty:nonxp_crop', crop )
    }
})

// Data
var addToMinecraftCrops = [
    "snowyspirit:ginger",
    "pineapple_delight:pineapple_crop",
    "culturaldelights:corn",
    "culturaldelights:eggplants",
    "createcafe:cassava_crop",
    "createcafe:coffee_crop"
]
var cropBlacklist = [
    'dungeonsdelight:rotbulb_crop',
    "minecraft:pumpkin_stem",
    "minecraft:melon_stem"
]
var medsAndHerbsCrops = {
    "meds_and_herbs:vinca": {
        replace: "meds_and_herbs:vinca_1",
        loot: {
            "meds_and_herbs:vinca_flowers": 4,
            "meds_and_herbs:vinca_leaves": 4
        }
    },
    "meds_and_herbs:chamomile_5": {
        replace: "meds_and_herbs:chamomile_1",
        loot: {
            "meds_and_herbs:chamomile_flowers": 3
        }
    },
    "meds_and_herbs:artemisia": {
        replace: "meds_and_herbs:artemisia_1",
        loot: {
            "meds_and_herbs:artemisia_leaves": 4
        }
    },
    "meds_and_herbs:opium": {
        replace: "meds_and_herbs:opium_1",
        loot: {
            "meds_and_herbs:opium_poppies": 4,
            "meds_and_herbs:opium_flowers": 1
        }
    },
    "meds_and_herbs:aloe_plant": {
        replace: "meds_and_herbs:aloe_4",
        loot: {
            "meds_and_herbs:aloe_fruits": 4
        }
    },
    "meds_and_herbs:cotton_plant": {
        replace: "meds_and_herbs:cotton_0",
        loot: {
            "meds_and_herbs:cotton_fibers": 4
        }
    },
    "meds_and_herbs:belladonna": {
        replace: "meds_and_herbs:belladonna_5",
        loot: {
            "meds_and_herbs:belladonna_berry": 4,
            "meds_and_herbs:belladonna_leaves": 1
        }
    },
    "meds_and_herbs:sweet_clover": {
        replace: "meds_and_herbs:sweet_cloverstage_0",
        loot: {
            "meds_and_herbs:sweet_clover_flowers": 6,
            "meds_and_herbs:seeds_sweet_clover": 1
        }
    }
}