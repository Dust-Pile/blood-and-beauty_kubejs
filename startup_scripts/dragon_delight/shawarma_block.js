var slug = 'dragon_delight:'
global.shawarmaBlock = {
    tick: ( entity ) => {}
}

StartupEvents.registry( 'block', event => {
    event.create( slug + 'skewered_dragon_round', 'basic' )
        //.model( 'bloodandbeauty:block/skewered_dragon_round' )
        .notSolid()
        .hardness( 3 )
        .noValidSpawns( true )
        .box( 4, 1, 4, 12, 15, 12, true )
        .box( 7, 0, 7, 9, 16, 9, true )
        .fullBlock( false )
        .transparent( true )
        .soundType( 'wart_block' )
        .item( item => {
            item
                .maxStackSize( 4 )
                .modelJson({
                    "parent": "minecraft:item/generated",
                    "textures": {
                        "layer0": "bloodandbeauty:item/dragon_food/skewered_dragon_round"
                    }
                })
        })
        .blockEntity( entity => {
            entity
                .initialData( {"age":0} )
            entity
                .serverTick( tick => {
                    global.shawarmaBlock.tick( tick )
                })
        })
        .property(BlockProperties.UP)
        .property(BlockProperties.DOWN)
        .property(BlockProperties.AGE_3)
        .defaultState( state => {
            state.set( BlockProperties.UP, true )
            state.set( BlockProperties.DOWN, false )
            state.set( BlockProperties.AGE_3, 0 )
        })
        .placementState( state => {
            const { player, clickedFace: face, block } = state
            
            if ( face != Direction.UP && face != Direction.DOWN ) {
                state.set(BlockProperties.DOWN, true) //BAD STATE
            }
            if ( !block.getDown().hasTag('dragon_delight:can_support_meat') ) {
                if (!block.getUp().hasTag('dragon_delight:can_suspend_meat') ) {
                    global.run( 'title ' + player.username + ' actionbar {"text":"I should place this on a stove or hang it from a rope...","italic":true,"color":"gray"}')
                    state.set(BlockProperties.DOWN, true) //BAD STATE
                } else {
                    if ( !validSuspendState( block.getUp() ) ) {
                        state.set(BlockProperties.DOWN, true) //BAD STATE
                    }
                }
            }
        })
        .blockstateJson = {
            "variants": {
                "up=true,down=true,age=0": {
                    "model": "bloodandbeauty:block/blank",
                    "x":0,
                    "y":0
                },
                "up=true,down=false,age=0": {
                    "model": "bloodandbeauty:block/dragon_round/skewered_dragon_round",
                    "x":0,
                    "y":0
                },
                "up=false,down=false,age=0": {
                    "model": "bloodandbeauty:block/dragon_round/shawarma_0",
                    "x":0,
                    "y":0
                },
                "up=false,down=true,age=0": {
                    "model": "bloodandbeauty:block/dragon_round/cooked_shawarma_0",
                    "x":0,
                    "y":0
                },
                "up=false,down=false,age=1": {
                    "model": "bloodandbeauty:block/dragon_round/shawarma_1",
                    "x":0,
                    "y":0
                },
                "up=false,down=true,age=1": {
                    "model": "bloodandbeauty:block/dragon_round/cooked_shawarma_1",
                    "x":0,
                    "y":0
                },
                "up=false,down=false,age=2": {
                    "model": "bloodandbeauty:block/dragon_round/shawarma_2",
                    "x":0,
                    "y":0
                },
                "up=false,down=true,age=2": {
                    "model": "bloodandbeauty:block/dragon_round/cooked_shawarma_2",
                    "x":0,
                    "y":0
                },
                "up=false,down=false,age=3": {
                    "model": "bloodandbeauty:block/dragon_round/shawarma_3",
                    "x":0,
                    "y":0
                },
                "up=false,down=true,age=3": {
                    "model": "bloodandbeauty:block/dragon_round/cooked_shawarma_3",
                    "x":0,
                    "y":0
                }
            }
        }
        
})

// BlockEvents.modification( event => {
//     event.modify( slug + 'skewered_dragon_round', event => {
        
//     } )
// })

var validSuspendState = ( block ) => {
    for ( var catagory of supportingBlocks ) {
        if ( !catagory.isMatch( block ) ) {
            continue
        }
        if ( catagory.criteria == undefined ) {
            return true
        }

        var type = catagory.criteria.type
        var blockState = global.blockState.get( block )
        var result = global.forEachIn( catagory.criteria.states, ( value, name ) => {
            var isEqual = false
            if ( typeof blockState[name].equals('string') ) {
                isEqual = blockState[name].equals(value)
            } else {
                isEqual = blockState[name] == value
            }

            if ( isEqual ) {
                if ( type.equals('none') ) {
                    return false
                } else if ( type.equals('any') ) {
                    return true
                }
            } else {
                if ( type.equals('all') ) {
                    return false
                }
            }
        })

        if ( result == undefined ) {
            if ( type.equals('all') || type.equals('none') ) {
                return true
            } else {
                return false
            }
        } else {
            return result
        } 

    }

    return false
}

var supportingBlocks = [
    {
        isMatch: ( block ) => {
            return block.id.equals("supplementaries:stick")
        },
        criteria: {
            type: 'all',
            states: {
                axis_y: true
            }
        }
    },
    {
        isMatch: ( block ) => {
            return block.id.equals("minecraft:chain")
        },
        criteria: {
            type: 'all',
            states: {
                axis: 'y'
            }
        }
    },
    {
        isMatch: ( block ) => {
            return block.id.equals("farmersdelight:rope")
        }
    },
    {
        isMatch: ( block ) => {
            return block.id.equals("minecraft:end_rod") || block.id.equals("quark:iron_rod")
        },
        criteria: {
            type: 'any',
            states: {
                facing: 'up',
                facing: 'down'
            }
        }
    },
    {
        isMatch: ( block ) => {
            return /bars/.test( block.id ) || /pane$/
        },
        criteria: {
            type: 'all',
            states: {
                north: false,
                east: false,
                south: false,
                west: false
            }
        }
    },
    {
        isMatch: ( block ) => {
            return block.id.equals('dragon_delight:skewered_dragon_round')
        }
    }
]