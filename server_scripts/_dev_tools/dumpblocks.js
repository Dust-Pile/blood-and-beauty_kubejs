ServerEvents.commandRegistry( event => {
    event.register(event.commands.literal('dumpblocks') // The name of the command
        .requires(s => s.hasPermission(4))
        .then(event.commands.argument('startPos', event.arguments.BLOCK_POS.create(event))
            .then(event.commands.argument('endPos', event.arguments.BLOCK_POS.create(event))
                .executes(c => {
                    var startPos = event.arguments.BLOCK_POS.getResult(c, 'startPos')
                    var endPos = event.arguments.BLOCK_POS.getResult(c, 'endPos')

                    if (startPos.x > endPos.x) {
                        var temp = startPos.x
                        startPos.x = endPos.x
                        endPos.x = temp
                    }
                    if (startPos.y > endPos.y) {
                        var temp = startPos.y
                        startPos.y = endPos.y
                        endPos.y = temp
                    }
                    if (startPos.z > endPos.z) {
                        var temp = startPos.z
                        startPos.z = endPos.z
                        endPos.z = temp
                    }

                    var blockString = '\nBlock Dump from '+ startPos + ' to ' + endPos + ':\n<========================>\n'

                    for (var i = startPos.x; i <= endPos.x; i++) {
                        for (var j = startPos.y; j <= endPos.y; j++) {
                            for (var k = startPos.z; k <= endPos.z; k++) {
                                var block = c.source.level.getBlock(i, j, k)
                                if ( block.hasTag('minecraft:air')) {
                                    continue
                                }
                                blockString += '\n"' + block.id + '",'
                            }
                        }
                    }

                    console.log( blockString + '\n\n<========================>')
                    if ( c.getSource().isPlayer() ) {
                        global.run('tellraw ' + c.getSource().player.username + ' {"text":"Blocks Dumped Successfully"}')
                    }
                    return 1
                })
            )
        )
    )
})