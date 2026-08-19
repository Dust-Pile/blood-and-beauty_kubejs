//Make belt lantern work with curios
if ( global.curios == undefined ) {
    global.curios = {}
}

// Handle Player Data
PlayerEvents.loggedIn( event => {
    const { player } = event
    global.curios[ player.uuid.toString() ] = { 
        inMenu: false 
    }
})
PlayerEvents.loggedOut( event => {
    const { player } = event
    delete global.curios[ player.uuid.toString() ]
})

//Track user inputs and match with inventory
PlayerEvents.inventoryOpened( 'curios:curios_container_v2', event => {
    const { player } = event
    var curioData = global.curios[ player.uuid.toString() ]
    curioData.inMenu = true

    //Recursive-ish, runs till player exits menu
    Utils.runAsync( function resolveLantern () {
        if ( usingLantern( player ) ) {
            if ( !checkBelt( player ).equals( 'minecraft:lantern' ) ) {
                setBelt( player, 'minecraft:lantern' )
            }
        } else if ( usingSoulLantern( player ) ) {
            if ( !checkBelt( player ).equals( 'minecraft:soul_lantern' ) ) {
                setBelt( player, 'minecraft:soul_lantern' )
            }
        } else if ( !checkBelt( player ).equals( 'minecraft:air' ) ) {
            setBelt( player, 'minecraft:air' )
        }

        if ( curioData.inMenu ) {
            global.tick.timeout(() => {
                resolveLantern()
            }, 2)
        }
        return
    })
})

// Exits checking loop
PlayerEvents.inventoryClosed( 'curios:curios_container_v2', event => {
    global.curios[ event.player.uuid.toString() ].inMenu = false
})

// Prevents accessories inventory access
PlayerEvents.inventoryOpened( 'accessories:accessories_menu', event => {
    event.player.closeMenu()
})

// Accessory Belt Slot Access ( lantern default for Toni's Immersive Lanterns )
function setBelt( player, itemId ) {
    var replaced = false
    player.accessoriesCapability().getAllEquipped().forEach( accessory => {
        if ( accessory.reference().slotName().equals( 'belt' ) ) {
            accessory.reference().setStack( Item.of( itemId ) )
            replaced = true
        }
    })
    if ( !replaced ) {
        player.accessoriesCapability().attemptToEquipAccessory( Item.of( itemId ) )
    }
    return replaced
}
function checkBelt( player ) {
    var output = 'minecraft:air'
    player.accessoriesCapability().getAllEquipped().forEach( accessory => {
        if ( accessory.reference().slotName().equals( 'belt' ) ) {
            output = accessory.reference().getStack().id
        }
    })
    return output
}

// Curio Checking Functions
function usingLantern( player ) {
    for ( var lantern of lanternMap.lanterns ) {
        if ( player.isCuriosEquipped( lantern ) ) {
            return true
        }
    }
    return false
}
function usingSoulLantern( player ) {
    for ( var lantern of lanternMap.soul_lanterns ) {
        if ( player.isCuriosEquipped( lantern ) ) {
            return true
        }
    }
    return false
}

// Data
    // Implemented this way to allow more lanterns to be added. 
    //      Mod only supports vanilla, but curio can hold more with data.
    //      Format: Accessory: [ ...Allowed Curios ]
var lanternMap = {
    'lanterns': ['minecraft:lantern'],
    'soul_lanterns': ['minecraft:soul_lantern']
}