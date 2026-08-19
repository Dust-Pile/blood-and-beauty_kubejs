//priority: 99

var tips = global.cursorTips

ServerEvents.tags( 'block', event => {
    for ( var block of tips.blocks ) {
        event.add( 'bloodandbeauty:has_cursor_tip', block )
    }
})

PlayerEvents.inventoryOpened( event => {
    event.player.sendData( tips.CHANNEL, {
        playerData: {
            inInventory: true
        }
    } )
})

PlayerEvents.inventoryClosed( event => {
    event.player.sendData( tips.CHANNEL, {
        playerData: {
            inInventory: false
        }
    })
})