//priority: 100

//Used instead of setTimeout when possible due to loading errors
if (global.tick == null) {
    global.tick = {
        "queue":[],
        "count":0
    }
}

global.tick.timeout = (callback, ticks) => {
    if ( ticks == undefined ) {
        ticks = 0
    }

    let timeout = {
        "callback": callback,
        "end": ( global.tick.count + ticks ),
        "returned": null,
        "cancelled": false,
        "hasRun": false
    }
    timeout.cancel = () => { return global.tick.cancel( timeout ) }

    global.binaryInsert( global.tick.queue, timeout, ( a, b ) => {
        return b.end - a.end
    } )
    
    return timeout
}

global.tick.cancel = ( timeout ) => {
    if ( timeout == null || timeout.hasRun ) {
        return false
    }
    timeout.cancelled = true
    return true
}

let tick = global.tick

ServerEvents.tick( event => {
    tick.count++
    while ( tick.queue.length > 0 ) {
        if ( tick.queue[0].end <= tick.count ) {
            let timeout = tick.queue.shift()
            if ( timeout.cancelled ) {
                continue
            }

            timeout.returned = timeout.callback( event )
            timeout.hasRun = true
        } else if ( tick.queue[0].end == NaN ) {
            console.error( 'NaN element purged from queue\n' + console.trace() )
            tick.queue.shift()
        } else {
            break
        }
    }
})

// let checks = ['>', '<', '>=', '<=']
// global.orderedInsert = (list, check, insertObj, property) => {
//     switch (check) {
//         case '>':
//             for (var i = list.length -1; i >= 0; i--) {
//                 if (list[i][property] > insertObj[property]) {
//                     list.splice(i+1, 0, insertObj)
//                     return insertObj
//                 }
//             }
//             list.splice(0,0,insertObj)
//             return true
//         case '<':
//             for (var i = list.length -1; i >= 0; i--) {
//                 if (list[i][property] < insertObj[property]) {
//                     list.splice(i+1, 0, insertObj)
//                     return insertObj
//                 }
//             }
//             list.splice(0,0,insertObj)
//             return true
//         case '>=':
//             for (var i = list.length -1; i >= 0; i--) {
//                 if (list[i][property] >= insertObj[property]) {
//                     list.splice(i+1, 0, insertObj)
//                     return insertObj
//                 }
//             }
//             list.splice(0,0,insertObj)
//             return true
//         case '<=':
//             for (var i = list.length -1; i >= 0; i--) {
//                 if (list[i][property] <= insertObj[property]) {
//                     list.splice(i+1, 0, insertObj)
//                     return insertObj
//                 }
//             }
//             list.splice(0,0,insertObj)
//             return true
//     }
//     console.error('Invalid check value in orderedInsert')
//     return false
    
// }