// Data
var lanterns = [
    "minecraft:waxed_weathered_copper_lantern","minecraft:waxed_exposed_copper_lantern","minecraft:waxed_copper_lantern",
    "minecraft:oxidized_copper_lantern","minecraft:weathered_copper_lantern","minecraft:exposed_copper_lantern",
    "minecraft:copper_lantern","minecraft:soul_lantern","minecraft:lantern","meadow:oil_lantern","ribbits:swamp_lantern",
    "upgrade_aquatic:tooth_lantern","suppsquared:brass_lantern","suppsquared:crimson_lantern","suppsquared:copper_lantern",
    "dungeonsdelight:living_lantern","sons_of_sins:ether_lantern","minecraft:waxed_oxidized_copper_lantern"
]
var onTopLanternMap = {}
for ( var lantern of lanterns ) {
    var onTopName = 'cts_compats:' + lantern.split(':')[1] + '_on_top'
    onTopLanternMap[ onTopName ] = lantern

    BlockEvents.rightClicked( lantern, event => {
        lanternHandler( event, false )
    })

    if ( Item.of( onTopName ) != null ) {
        BlockEvents.rightClicked( onTopName, event => {
            lanternHandler( event, true )
        })
    }
}

/**
 * @param { Internal.BlockRightClickedEventJS_ } event
 */
function lanternHandler ( event, isOnTop ) {
    const { player, hand, item, block, level } = event
    var thisLantern = isOnTop ? onTopLanternMap[ block.item.id ] : block.item.id

    if ( !item.id.equals( thisLantern ) ) {
        if ( !hand.toString().equals( 'OFF_HAND' ) && player.offHandItem.id.equals( thisLantern ) ) {
            return
        }
        if ( !hand.toString().equals( 'MAIN_HAND' ) || !item.id.equals( 'minecraft:air' ) ) {
            return
        }

        player.giveInHand( Item.of( thisLantern, 1 ) )
        level.destroyBlock( block.pos, false )

    } else if ( item.count < item.maxStackSize ) {
        item.grow( 1 )
        level.destroyBlock( block.pos, false )

    } else {
        level.destroyBlock( block.pos, true )
    }

    player.swing( hand.toString().toLocaleLowerCase(), true )
    event.cancel()
}

PlayerEvents.advancement( 'bloodandbeauty:collect_ship', event => {
    const { player } = event

    global.run( 'advancement revoke ' + player.username + ' only bloodandbeauty:collect_ship' )

    var entity = player.rayTrace( player.entityReach, false ).entity
    if ( Math.abs( entity.motionX ) > 0.001 || Math.abs( entity.motionZ ) > 0.001 || Math.abs( entity.motionY ) > 0.2001 ) {
        global.run( 'title ' + player.username + ' actionbar {"text":"Cannot break moving ship","italic":true,"color":"red"}' )
        return
    } else if ( player.swimming ) {
        global.run( 'title ' + player.username + ' actionbar {"text":"Cannot break ship while swimming","italic":true,"color":"red"}' )
        return
    }

    var entityString = entity.type
    var mod = entityString.split(":")[0]
    var name = entityString.split(":")[1]
    if ( mod.equals( 'smallships' ) ) {
        if ( entity.nbt.Sail.State != 0 ) {
            global.run( 'title ' + player.username + ' actionbar {"text":"Cannot break ship while in motion","italic":true,"color":"red"}' )
            return
        }

        var material = entity.nbt.Type
        var item = player.level.createEntity( 'minecraft:item' )
        var cannons = player.level.createEntity( 'minecraft:item' )

        item.x = entity.x
        item.y = entity.y
        item.z = entity.z
        item.mergeNbt({
            Item: {
                id: mod + ':' + material + '_' + name,
                Count: 1,
                tag: {
                    "Sail": entity.nbt.Sail,
                    "Banner": entity.nbt.Banner
                }
            }
        })
        item.spawn()

        cannons.x = entity.x
        cannons.y = entity.y
        cannons.z = entity.z
        cannons.mergeNbt({
            Item: {
                id: "smallships:cannon",
                Count: entity.nbt.CannonCount
            }
        })
        cannons.spawn()
    }

    entity.kill()
    event.cancel()
})

var smallShips = [
    "smallships:dark_oak_drakkar","smallships:mangrove_cog","smallships:mangrove_brigg","smallships:mangrove_galley",
    "smallships:mangrove_drakkar","smallships:bamboo_cog","smallships:bamboo_brigg","smallships:bamboo_galley",
    "smallships:bamboo_drakkar","smallships:oak_cog","smallships:oak_brigg","smallships:oak_galley","smallships:oak_drakkar",
    "smallships:spruce_cog","smallships:spruce_brigg","smallships:spruce_galley","smallships:spruce_drakkar",
    "smallships:birch_cog","smallships:birch_brigg","smallships:birch_galley","smallships:birch_drakkar",
    "smallships:jungle_cog","smallships:jungle_brigg","smallships:jungle_galley","smallships:jungle_drakkar",
    "smallships:acacia_cog","smallships:acacia_brigg","smallships:acacia_galley","smallships:acacia_drakkar",
    "smallships:cherry_cog","smallships:cherry_brigg","smallships:cherry_galley","smallships:cherry_drakkar",
    "smallships:dark_oak_cog","smallships:dark_oak_brigg","smallships:dark_oak_galley"
]
for ( var ship of smallShips ) {
    ItemEvents.rightClicked( ship, event => {
        const { item, player } = event

        if ( item.nbt == null ) {
            return
        }

        global.tick.timeout( () => {
            var hitResult = player.rayTrace( player.entityReach, false )
            if ( !hitResult.type.toString().equals( "ENTITY" ) || !hitResult.entity.type.split(":")[0].equals( "smallships" ) ) {
                global.say( 'not smallships entity' )
                global.say( hitResult.type.toString() + ', ' + hitResult.entity.type + ', ' + hitResult.entity.type.split(":")[0] )
                return
            }

            var entity = hitResult.entity
            entity.mergeNbt({
                Banner: item.nbt.Banner,
                Sail: item.nbt.Sail
            })
        }, 0)
    })
}

ServerEvents.tags( 'item', event => {
    event.add( 'bloodandbeauty:ship_collect_tool', 
        "create:wrench",
        "framedblocks:framed_wrench",
        "#minecraft:axes"
    )
})
ServerEvents.tags( 'entity_type', event => {
    event.add( 'bloodandbeauty:collectable_entities',  
        'smallships:brigg',
        'smallships:cog',
        'smallships:drakkar',
        'smallships:galley'
    )
})