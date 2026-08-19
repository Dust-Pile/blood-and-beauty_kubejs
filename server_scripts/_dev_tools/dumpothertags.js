// var tags = [
//     '#quark:seed_pouch_holdable'
// ]

// ServerEvents.tags( 'block', event => {
//     event.add( 'bloodandbeauty:all_blocks', /.*/ )
//     for ( var tag of tags ) {
//         if ( tag.charAt( 0 ) == '#' ) {
//             tag = tag.substring( 1 )
//         }

//         var blocks = event.get( 'bloodandbeauty:all_blocks' ).getObjectIds()
//         var outputString = ''
//         for ( var block of blocks ) {
//             var item = Block.getBlock( block ).asItem().id
//             if ( !Item.of( item ).hasTag( tag ) ) {
//                 continue
//             }
            
//             outputString += 
//                 '\n"' + block + '": {' +
//                 '\n\t"seed": "' + item + '",' +
//                 '\n\t"type": "F",' + 
//                 '\n\t"min": 32,' +
//                 '\n\t"max": 100' +
//                 '\n},'
//         }

//         console.log( outputString )

//         //var resources = event.get( tag ).getObjectIds()
//         //var outputString = '\nDump of biome tag "#' + tag + '":\n<========================>\n'
//         //for ( var i = 0; i < resources.size(); i++ ) {
//         //    outputString += '\n"' + resources[i] + '",'
//         //}
//         //console.log( outputString + '\n\n<========================>')
//     }
    
// } )