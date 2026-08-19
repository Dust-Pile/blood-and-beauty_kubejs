//Block entity tick event function
global.shawarmaBlock.tick = ( entity ) => {
    var age = parseInt( entity.data.get('age').toString().replace( 'd', '' ) )
    const { x, y, z } = entity.block
    var block = entity.level.getBlock( x, y, z )
    var blockState = global.blockState.get( block )

    if ( !blockState.up && isHeating( block.down ) ) { //No Skin
        if ( age < 240 ) {
            if ( !blockState.down ) {
                if ( age % 40 == 0 ) {
                    global.run(
                        'playsound farmersdelight:block.skillet.sizzle block @a ' + x + ' ' + y + ' ' + z + ' 1 0.7'
                    )
                }
                entity.data.merge( {'age': age + 1 } )
            }
        } else {
            entity.data.merge( {'age': 0 } )
            global.run([
                'setblock ' + x + ' ' + y + ' ' + z + ' dragon_delight:skewered_dragon_round[up=false,down=true,age=' + blockState.age + '] replace',
                'playsound minecraft:entity.generic.extinguish_fire block @a ' + x + ' ' + y + ' ' + z + ' 0.7 1.3',
                'particle minecraft:smoke ' + x + ' ' + y + ' ' + z + ' 0 0 0 0.05 30'
            ])
        }
    } else {
        entity.data.merge( {'age': 0 } )
    }
}

function isHeating ( block ) {
    if ( !block.hasTag( 'farmersdelight:heat_sources' ) ) {
        return false
    }

    var blockState = global.blockState.get( block )
    if ( blockState.lit != undefined ) {
        return blockState.lit
    }
    return true
    
}

//Cancel placement of BAD STATE
BlockEvents.placed( 'dragon_delight:skewered_dragon_round', event => {
    const { block } = event

    if ( global.blockState.get( block ).down ) {
        event.cancel()
    }
})

BlockEvents.rightClicked( 'dragon_delight:skewered_dragon_round', event => {
    const { block, player, facing } = event
    const { mainHandItem: main, offHandItem: secondary } = player

    if ( !main.hasTag('forge:tools/knives') ) {
        return
    }

    var blockState = global.blockState.get( block )
    const { x, y, z } = block
    var loc = global.new.point( x, y, z )

    if ( blockState.up ) { // ( has skin )
        if ( main.hasTag('forge:tools/cleavers') ) {
            global.run(
                'playsound alexsmobs:mantis_shrimp_hurt block @a ' + loc.toCommandString() + ' 1 1'
            )
            player.damageHeldItem( 'main_hand', 1 )
            player.swing( 'main_hand', true )

            global.tick.timeout( () => {
                global.run(
                    'setblock ' + loc.toCommandString() + ' dragon_delight:skewered_dragon_round[up=false]'
                )
                //block.set( 'dragon_delight:skewered_dragon_round', blockState )
                block.popItemFromFace( 'irons_spellbooks:dragonskin', facing )
            }, 3)
        }
        //Cursor tips compat for cancellable event
        global.cursorTips.sendInteract( player )

        event.cancel()
    }

    if ( blockState.down ) { // ( is cooked )
        global.run([
            'playsound minecraft:block.beehive.shear block @a ' + loc.toCommandString() + ' 1 1.5'
        ])
        player.damageHeldItem( 'main_hand', 1 )
        player.swing( 'main_hand', true )

        global.tick.timeout( () => {
            if ( secondary.id.equals( 'culturaldelights:tortilla' ) ) {
                secondary.shrink( 1 )
                player.give( 'dragon_delight:simple_shawarma_wrap' )
            } else if ( secondary.id.equals( 'farmersdelight:mixed_salad' ) ) {
                secondary.shrink( 1 )
                player.give( 'dragon_delight:dragon_salad' )
            } else {
                block.popItemFromFace( 'dragon_delight:shawarma_strips', facing )
            }

            //Exit if depleated
            if ( blockState.age == 3 ) {
                global.run('setblock ' + loc.toCommandString() + ' supplementaries:stick[axis_y=true] replace')
                return
            }

            //Set proper state
            global.run(
                'setblock ' + loc.toCommandString() + ' dragon_delight:skewered_dragon_round[up=false,down=false,age=' + ( blockState.age + 1 ) + ']'
            )

        }, 3)

        event.cancel()
    }
})

BlockEvents.broken( event => {
    const { block } = event

    if ( block.hasTag( 'dragon_delight:can_suspend_meat' )) {
        if ( block.down.id.equals( 'dragon_delight:skewered_dragon_round' ) 
            && !block.down.down.hasTag( 'dragon_delight:can_support_meat' ) ) 
        {
            const { x, y, z } = block.down
            var loc = global.new.point( x, y, z )
            global.run('setblock ' + loc.toCommandString() + ' air destroy')
        }
    } else if ( block.hasTag( 'dragon_delight:can_support_meat' ) ) {
        if ( block.up.id.equals( 'dragon_delight:skewered_dragon_round' ) 
            && !block.up.up.hasTag( 'dragon_delight:can_suspend_meat' ) ) 
        {
            const { x, y, z } = block.up
            var loc = global.new.point( x, y, z )
            global.run('setblock ' + loc.toCommandString() + ' air destroy')
        }
    }
})

ServerEvents.tags( 'block', event => {
    //Suspending Blocks
    event.add( 'dragon_delight:can_suspend_meat', "supplementaries:stick" )
    event.add( 'dragon_delight:can_suspend_meat', "minecraft:chain" )
    event.add( 'dragon_delight:can_suspend_meat', "farmersdelight:rope" )
    event.add( 'dragon_delight:can_suspend_meat', "minecraft:end_rod" )
    event.add( 'dragon_delight:can_suspend_meat', "quark:iron_rod" )
    event.add( 'dragon_delight:can_suspend_meat', /bars/ )
    event.add( 'dragon_delight:can_suspend_meat', /pane$/ )
    event.add( 'dragon_delight:can_suspend_meat', 'dragon_delight:skewered_dragon_round' )

    //Supporting Blocks
    event.add( 'dragon_delight:can_support_meat', /stove/ )
    event.add( 'dragon_delight:can_support_meat', "minecraft:magma_block" )
    
})

LootJS.modifiers( event => {
    event.addBlockLootModifier( 'dragon_delight:skewered_dragon_round' )
        .removeLoot( /.*/ )
        .pool( p => {
            p
                .rolls([1, 1])
                .customCondition({
                    "condition": "minecraft:block_state_property",
                    "block": "dragon_delight:skewered_dragon_round",
                    "properties": {
                        "up": "true"
                    }
                })
                .addLoot( Item.of( 'dragon_delight:skewered_dragon_round', 1 ) )
        })
        .pool( p => {
            p
                .rolls([1, 1])
                .customCondition({
                    "condition": "minecraft:block_state_property",
                    "block": "dragon_delight:skewered_dragon_round",
                    "properties": {
                        "up": "false"
                    }
                })
                .addLoot( Item.of( 'minecraft:stick', 1 ) )
        })
})