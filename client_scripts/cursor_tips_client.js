if ( global.cursorTips.playerData == null ) {
    global.cursorTips.playerData = {}
}

var tips = global.cursorTips

ClientEvents.tick( event => {
    const { player } = event
    var playerData = tips.playerData

    var block
    var params = {}
    var animTime
    var frame

    if ( playerData.inInventory ) {
        return
    }
    
    const { xRot, yRot, x: px, y: py, z: pz } = player
    if ( playerData.hasInteract == 0 && playerData.lastPosition[0] == xRot && playerData.lastPosition[1] == yRot 
        && playerData.lastPosition[2] == px && playerData.lastPosition[3] == py && playerData.lastPosition[4] == pz )
    {
        playerData.idleTicks++
        if ( playerData.idleTicks > 240 ) {
            return
        }
        block = playerData.lastBlock
        if ( playerData.lastBlock == null || !block.hasTag( 'bloodandbeauty:has_cursor_tip' ) ) {
            clear( player )
            return
        }

        if ( !playerData.isAnimated ) {
            return
        }

        params = playerData.lastParams
        playerData.lookingTicks++
        animTime = ( params.TIME_CONSTANT != null ) ? params.TIME_CONSTANT : tips.TIME_CONSTANT
        frame = Math.floor( ( playerData.lookingTicks % ( params.resources.length * animTime ) ) / animTime )
        if ( frame == playerData.lastFrame ) {
            return
        }
        playerData.lastFrame = frame

    } else {
        playerData.idleTicks = 0
        playerData.lastPosition = [ xRot, yRot, px, py, pz ]
        if ( playerData.hasInteract > 0 || tips.hasInteract > 0 ) {
            playerData.lastBlock = null
            playerData.hasInteract--
            tips.hasInteract--
        }

        var hit = player.rayTrace( player.blockReach, false )
        if ( !hit.type.toString().equals('BLOCK') ) {
            clear( player )
            return
        }
        block = hit.block

        if ( !block.hasTag( 'bloodandbeauty:has_cursor_tip' ) ) {
            clear( player )
            return
        }

        const { x, y, z } = block
        if ( playerData.lastBlock != null && playerData.lastBlock.x == x && playerData.lastBlock.y == y && playerData.lastBlock.z == z ) {
            if ( !playerData.isAnimated ) {
                return
            }
            params = playerData.lastParams
            playerData.lookingTicks++
            animTime = ( params.TIME_CONSTANT != null ) ? params.TIME_CONSTANT : tips.TIME_CONSTANT
            frame = Math.floor( ( playerData.lookingTicks % ( params.resources.length * animTime ) ) / animTime )
            if ( frame == playerData.lastFrame ) {
                return
            }
            playerData.lastFrame = frame

        } else {
            params = tips.blockTips[block.id]( player, block )
            playerData.lastParams = params
            playerData.lastBlock = block
            playerData.lookingTicks++
            if ( params.resource == undefined ) {
                animTime = ( params.TIME_CONSTANT != null ) ? params.TIME_CONSTANT : tips.TIME_CONSTANT
                frame = Math.floor( ( playerData.lookingTicks % ( params.resources.length * animTime ) ) / animTime )
            }
        }
    }

    if ( !params.isVisible ) {
        if ( !playerData.isClear ) {
            player.paint({cursorTip: {
                visible: false
            }})
            playerData.lookingTicks = -1
            playerData.lastFrame = -1
            playerData.isClear = true
        }
        return
    }

    if ( params.type != undefined ) {
        player.paint({cursorTip: {
            type: params.type
        }})
    } else {
        player.paint({cursorTip: {
            type: 'item'
        }})
    }

    if ( params.resource != undefined ) {
        playerData.isAnimated = false
        player.paint({cursorTip: {
            item: params.resource,
            visible: true
        }})
    } else {
        playerData.isAnimated = true
        player.paint({cursorTip: {
            item: params.resources[ frame ],
            visible: true
        }})
    }
    
    playerData.isClear = false
})

function clear( player ) {
    var playerData = tips.playerData
    playerData.lastBlock = null
    playerData.lookingTicks = -1
    playerData.lastFrame = -1
    if ( playerData.isClear ) {
        return
    }
    playerData.isClear = true
    player.paint({cursorTip: {
        visible: false
    }})
}

ClientEvents.loggedIn( event => {
    const { player } = event

    tips.playerData = {
        inInventory: false,
        lookingTicks: 0,
        lastPosition: [0,0,0,0,0],
        lastBlock: null,
        lastParams: {},
        hasInteract: 0,
        isAnimated: false,
        idleTicks: 0,
        lastFrame: -1,
        isClear: true
    }

    player.paint({cursorTip: {
        type: 'item',
        x: '($screenW/2)+8',
        y: '($screenH/2)+8',
        w: 16,
        h: 16,
        item: 'alekiships:cannonball',
        visible: false
    }})
})

//Lets not have any nasty memory leaks...
ClientEvents.loggedOut( event => {
    delete tips.playerData
})

NetworkEvents.dataReceived( tips.CHANNEL, event => {
    const { data } = event

    if ( data.playerData != undefined ) {
        var playerData = data.playerData
        if ( playerData.inInventory != undefined ) {
            tips.playerData.inInventory = playerData.inInventory
        }
        if ( playerData.hasInteract != undefined ) {
            tips.playerData.hasInteract = playerData.hasInteract
        }
    }
    if ( data.hasInteract != undefined ) {
        tips.hasInteract = data.hasInteract
    }

} )

// global.cursorTips.register( 'dragon_delight:skewered_dragon_round', ( player, block ) => {
//     var params = {
//         isVisible: false,
//         resource: 'dungeonsdelight:iron_cleaver'
//     }

//     var state = global.blockState.get( block )
//     if ( state.up ) {
//         params.isVisible = true
//     }

//     return params
// })