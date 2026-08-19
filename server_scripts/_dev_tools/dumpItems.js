ServerEvents.commandRegistry( event => {
    event.register(event.commands.literal('dumpitems') // The name of the command
      .requires(s => s.hasPermission(4))
      .executes(c => {
        if ( !c.getSource().isPlayer() ) {
            return 0
        }
        var player = c.getSource().player
        var itemString = '\nItem Dump of player ' + player.username + ':\n<========================>\n\n'
        player.inventory.allItems.forEach( item => {
          itemString += '"' + item.id + '",'
          //itemString += '' + item.id + ','
        })
        console.log( itemString + '\n\n<========================>')
        global.run('tellraw ' + player.username + ' {"text":"Items Dumped Successfully"}')
        return 1
      })
    )
})