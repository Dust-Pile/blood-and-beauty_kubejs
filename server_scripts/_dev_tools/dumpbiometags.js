var tags = [
    // 'c:savanna',
    // 'c:jungle',
    // 'c:forest',
    // 'c:plains',
    // 'c:birch_forest',
    // 'c:floral',
    // 'c:flower_forests',
    // 'c:mountain',
    // 'c:mountain_peak'
]

//var biomeContext
// ServerEvents.tags( 'worldgen/biome', event => {
//     event.add( 'bloodandbeauty:all_biomes', /.*/ )
//     for ( var tag of tags ) {
//         if ( tag.charAt( 0 ) == '#' ) {
//             tag = tag.substring( 1 )
//         }

//         var resources = event.get( tag ).getObjectIds()
//         var outputString = '\nDump of biome tag "#' + tag + '":\n<========================>\n'
//         for ( var i = 0; i < resources.size(); i++ ) {
//             outputString += '\n"' + resources[i] + '",'
//         }
//         console.log( outputString + '\n\n<========================>')
//     }
    
// } )

// ServerEvents.commandRegistry( event => {
//     event.register( event.commands.literal('dumpbiomes') // The name of the command
//         .requires( s => s.hasPermission(4))
//         .then( event.commands.argument( 'tag', event.arguments.RESOURCE_LOCATION.create( event ))
//             .executes( c => {
//                 var tag = event.arguments.RESOURCE_LOCATION.getResult( c, 'tag' )
//                 var resources = biomeContext.get( tag ).getObjectIds()
//                 if ( resources[0] == undefined ) {
//                     if ( c.getSource().isPlayer() ) {
//                         global.run('tellraw ' + c.getSource().player.username + ' {"text":"Tag ' + tag + ' is empty"}')
//                     }
//                     return 0
//                 }
                
//                 var outputString = '\nDump of biome tag "' + tag + '":\n<========================>\n'
//                 var playerString = 'Dump of biome tag ' + tag + ':'
//                 for ( var i = 0; i < resources.size(); i++ ) {
//                     outputString += '\n"' + resources[i] + '",'
//                     playerString += '' + resources[i] + ', '
//                 }
//                 console.log( outputString + '\n\n<========================>')

//                 if ( c.getSource().isPlayer() ) {
//                     global.run([
//                         'tellraw ' + c.getSource().player.username + ' {"text":"' + playerString + '"}',
//                         'tellraw ' + c.getSource().player.username + ' {"text":"Biomes Dumped Successfully"}'
//                     ])
//                 }
//                 return 1
//             })
//         )
//     )
// })