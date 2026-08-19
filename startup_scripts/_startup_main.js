//priority: 10

if ( global.listeners == undefined ) {
    global.listeners = {}
}

// Methods and Utils
global.registerEvent = ( eventName, cancelable ) => {
    var eventObject = {
        isUsed: false,
        isCancelable: cancelable,
        cancelable: {},
        uncancelable: {},
        cancelableOrder: [],
        uncancelableOrder: []
    }

    eventObject.run = ( context ) => { return runListeners( context, eventObject ) }
    eventObject.remove = ( name ) => { return removeListener( eventObject, name ) }

    global.listeners[ eventName ] = eventObject
}
global.addListener = ( eventName, name, handler, hasCancel, priority ) => {
    if ( hasCancel == undefined ) {
        hasCancel = false
        priority = 0
    } else if ( priority == undefined ) {
        priority = 0
    }

    var eventObject = global.listeners[ eventName ]

    if ( !eventObject.cancelable && hasCancel ) {
        console.error( 'Cannot add listener ' + name + ' to event ' + eventName + ': event is not cancelable.')
        return
    }

    var type = hasCancel ? "cancelable" : "uncancelable"
    var order = hasCancel ? eventObject.cancelableOrder : eventObject.uncancelableOrder
    var functions = hasCancel ? eventObject.cancelable : eventObject.uncancelable

    if ( functions[ name ] != undefined ) {
        global.removeElement( order, name )
    }

    functions[ name ] = { handler: handler, priority: priority }
    if ( priority == 0 ) {
        order.push( name )
    } else {
        binaryInsert( order, name, ( a, b ) => {
            var path = global.listeners[ eventName ][ type ]
            return path[ a ].priority - path[ b ].priority
        })
    }
}
function runListeners( eventContext, eventObject ) {
    eventObject.isUsed = true

    var context
    for ( var name of eventObject.uncancelableOrder ) {
        var path = eventObject.uncancelable[ name ]
        if ( path == undefined ) {
            console.error( 'Expected function ' + name + ': Not Found.' )
            continue
        }
        context = path.handler( eventContext )
    }
    if ( !eventObject.isCancelable ) {
        return 1
    }

    for ( var name of eventObject.cancelableOrder ) {
        var path = eventObject.cancelable[ name ]
        if ( path == undefined ) {
            console.error( 'Expected function ' + name + ': Not Found.' )
            continue
        }
        context = path.handler( eventContext )
        if ( context != undefined && context.cancelEvent != undefined && context.cancelEvent ) {
            event.cancel()
            return 0
        }
    }

    return 1
}
function removeListener( eventObject, name ) {
    if ( eventObject.uncancelable[ name ] != undefined ) {
        delete eventObject.uncancelable[ name ]
        global.removeElement( eventObject.uncancelableOrder, name )
        return true
    }
    if ( eventObject.cancelable[ name ] != undefined ) {
        delete eventObject.cancelable[ name ]
        global.removeElement( eventObject.cancelableOrder, name )
        return true
    }
    console.warn( 'Failed to remove listener' + name + ' from event: element not found' )
    return false
}

// ===========================================================================================================================
// ===========================================================================================================================

if ( global._startup_main == undefined ) {
    global._startup_main = {
        initialized: false
    }
}

var initForgeEvents = {
    'net.minecraftforge.event.entity.living.MobEffectEvent$Added': false,
    'net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteract': true,
    'net.minecraftforge.event.entity.ProjectileImpactEvent': false
}

// Register events that must be done during startup
if ( !global._startup_main.initialized ) {
    global.forEachIn( initForgeEvents, ( cancelable, eventName ) => {
        global.registerEvent( eventName, cancelable )

        ForgeEvents.onEvent( eventName, event => {
            global.listeners[ eventName ].run( event )
        })
    })
}

StartupEvents.init( event => {
    global._startup_main.initialized = true
})