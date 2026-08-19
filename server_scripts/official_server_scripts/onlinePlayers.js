//priority: 99

/**
 * Registers a command to allow checking online players in the console
 */
ServerEvents.commandRegistry(event => {    
    event.register( event.commands.literal( 'onlineplayers' )
      .requires( s => s.hasPermission(4))
      .executes( c => {
        var onlinePlayers = Utils.server.getPlayers()
        if ( onlinePlayers.length > 0 ) {
            let printString = 'Players Online: ' + onlinePlayers[0].getUsername()
            for ( var i = 1; i < onlinePlayers.length; i++ ) {
                printString += ', ' + onlinePlayers[i].getUsername()
            }
            console.log( printString )
        } else {
            console.log( 'No Players Online' )
        }
        return 1
      })
    )
})