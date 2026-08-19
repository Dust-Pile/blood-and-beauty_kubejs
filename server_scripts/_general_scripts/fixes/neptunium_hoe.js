ItemEvents.rightClicked( 'aquaculture:neptunium_hoe', event => {
    const { item, player, hand } = event
    const hit = player.rayTrace( player.blockReach, false )

    if ( !hit.type.toString().equals( 'BLOCK' ) ) {
        return
    }

    const block = hit.block
    if ( !block.hasTag( 'bloodandbeauty:special_farmland' ) ) {
        return
    }

    block.set( soilMap[ block.id ] )
    if ( !player.creative ) {
        item.setDamageValue( item.damageValue + 1 )
    }
    if ( hand.toString().equals( 'MAIN_HAND' ) ) {
        player.swing( 'main_hand', true )
    } else {
        player.swing( 'off_hand', false )
    }

    var loc = global.new.point( block.x, block.y, block.z )
    global.run(
        'execute in ' + player.level.name.string + ' run playsound minecraft:item.hoe.till block @a ' + loc.toCommandString() + ' 1 1'
    )
    
    event.exit()
})

ServerEvents.tags( 'block', event => {
    // Stubborn Farmlands
    global.forEachIn( soilMap, ( soil, dirt ) => {
        event.add( 'bloodandbeauty:special_farmland', dirt )
    } )
})

var soilMap = {
    "swampier_swamps:decaying_kelp": "swampier_swamps:fertile_farmland",
    "farmersdelight:rich_soil": "farmersdelight:rich_soil_farmland",
    "hexalia:infused_dirt": "hexalia:infused_farmland"
}