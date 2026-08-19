//priority: 99

global.cursorTips = {
    TIME_CONSTANT: 20,
    blocks: [],
    blockTips: {},
    hasInteract: 0,
    CHANNEL: 'bloodandbeauty:cursor_tips_update'
}

var tips = global.cursorTips

tips.register = ( blockID, caseHandler ) => {
    if ( tips.blockTips[blockID] != null ) {
        console.warn( 'Registering tip for block ' + blockID + '; already exists.' )
        tips.blockTips[blockID] = caseHandler
        return
    }

    tips.blockTips[blockID] = caseHandler
    tips.blocks.push( blockID )
}

// Use function where an important blockstate is expected to change
tips.sendInteract = ( context ) => {
    context.player.sendData( tips.CHANNEL, {
        playerData: {
            hasInteract: 2
        }
    })
    sendToAllPlayersLevel( context, tips.CHANNEL, {
        hasInteract: 3
    })

}

// Example:
/*
BlockEvents.rightClicked( <block>, event => {
    global.cursorTips.sendInteract( event )

    // other code here ...
})

 */

function sendToAllPlayersLevel( context, channel, data ) {
    context.level.players.forEach( player => {
        player.sendData( channel, data )
    })
}

global.cursorTips.register( 'dragon_delight:skewered_dragon_round', ( player, block ) => {
    var params = {
        isVisible: false,
        resource: 'dungeonsdelight:iron_cleaver'
    }

    var state = global.blockState.get( block )
    params.isVisible = state.up && !state.down

    return params
})


// For animation debug

// global.cursorTips.register( 'minecraft:dirt', ( player, block ) => {
//     var params = {
//         isVisible: true,
//         resources: ['minecraft:stick','minecraft:stone_shovel']
//     }

//     return params
// })