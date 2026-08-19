//priority: 10

// For testing
// delete Utils.server.persistentData.chunk_loader_limit

// Essential Variables
const MAXIMUM_LOADED_CHUNKS = 150
const MAXIMUM_INACTIVE_TIME = 1000*60*60*24*7 //One Week ( Currently Unused )
const UPDATE_FREQUENCY = 20
var update_ticker = 0
var chunkLoaders = {}
var isLoaded = false

ServerEvents.loaded( event => {
    if ( Utils.server.persistentData.chunk_loader_limit == undefined ) {
        Utils.server.persistentData.chunk_loader_limit = {
            players: {},
            loaders: {},
            number: 0 // Currently unused
        }
    }
    chunkLoaders = Utils.server.persistentData.chunk_loader_limit
    isLoaded = true
})

// Add Tags
var loaderBlocks = [
    'create_power_loader:andesite_chunk_loader',
    'create_power_loader:brass_chunk_loader'
]
ServerEvents.tags( 'block', event => {
    for ( var loader of loaderBlocks ) {
        event.add( 'bloodandbeauty:chunk_loaders', loader )
    }
})

// Basic Block Behaviours
for ( var loader of loaderBlocks ) {
    BlockEvents.placed( loader, event => {
        const { block, player } = event

        if ( player == undefined || block.down.id.equals( 'create:track_station' ) ) { // cancel if not player
            event.cancel()
        }

        registerLoader( event )
    })

    BlockEvents.broken( loader, event => {
        const { block, player } = event

        var blockData = chunkLoaders.loaders[ posString( block ) ]
        if ( blockData.active ) {
            loaderDisabled( block )
        }

        unregisterLoader( block )
    })
}

// Check for station placement / removal
BlockEvents.placed( 'create:track_station', event => {
    const { block } = event

    var directions = Object.keys( FACING_OPPOSITE )
    for ( var dir of directions ) {
        var neighbor = block[ dir ]
        
        if ( 
            neighbor.id == 'create_power_loader:brass_chunk_loader' && 
            neighbor.properties.facing.equals( dir )
        ) {
            if ( dir == 'up' ) {
                destroyLoader( neighbor )
                continue
            }
            var loader = chunkLoaders.loaders[ posString( neighbor ) ]

            if ( loader.active ) {
                loaderDisabled( neighbor )
            }

            loader.isStation = true
            loader.range = 1
        }
    }
})
BlockEvents.broken( 'create:track_station', event => {
    const { block } = event

    var directions = Object.keys( FACING_OPPOSITE )
    for ( var dir of directions ) {
        var neighbor = block[ dir ]
        
        if ( 
            neighbor.id == 'create_power_loader:brass_chunk_loader' && 
            neighbor.properties.facing.equals( dir )
        ) {
            var loader = chunkLoaders.loaders[ posString( neighbor ) ]
            if ( loader.active ) {
                loaderDisabled( neighbor )
            }

            loader.isStation = false
            loader.range = 0
        }
    }
})

ServerEvents.tick( event => {
    if ( !isLoaded ) {
        return
    }
    update_ticker++
    if ( update_ticker % UPDATE_FREQUENCY != 0 ) {
        return
    }

    global.forEachIn( chunkLoaders.loaders, ( loader, name ) => {
        const { x, y, z } = loader.position
        var block = event.server.getLevel( loader.level ).getBlock( x, y, z )

        var speed = block.entityData.Speed
        var active = false
        var range = 0
        if ( loader.type == 'create_power_loader:brass_chunk_loader' ) {
            if ( loader.isStation ) {
                active = block.entityData.CoreActive == 1
                if ( loader.active && !active ) {
                    loaderDisabled( block )
                } else if ( !loader.active && active ) {
                    loaderEnabled( block )
                }
            } else {
                range = block.entityData.ScrollValue
                if ( speed >= REQUIRED_SPEED[ range ] ) {
                    active = true
                }
                if ( loader.active && !active ) {
                    loaderDisabled( block )
                    changeRange( block, range )
                } else if ( !loader.active && active ) {
                    changeRange( block, range )
                    loaderEnabled( block )
                } else {
                    changeRange( block, range )
                }
            }
        } else {
            if ( speed >= REQUIRED_SPEED[ range ] ) {
                active = true
            }
            if ( loader.active && !active ) {
                loaderDisabled( block )
            } else if ( !loader.active && active ) {
                loaderEnabled( block )
            }
        }
        
    } )
})

// Reset last online
PlayerEvents.loggedOut( event => {
    const { player } = event
    var playerData = chunkLoaders.players[ player.uuid.toString() ]
    if ( playerData != undefined ) {
        playerData.lastOnline = Date.now().valueOf()
    }
})
PlayerEvents.loggedIn( event => {
    onPlayerJoined( event.player )
})

// Registration Functions
function registerPlayer( player ) {
    chunkLoaders.players[ player.uuid.toString() ] = {
        loaders: [],
        loadedChunks: 0,
        lastOnline: Date.now().valueOf(),
        username: player.username
    }

    return chunkLoaders.players[ player.uuid.toString() ]
}
function registerLoader( event ) {
    const { block, player } = event

    var playerData = chunkLoaders.players[ player.uuid.toString() ]
    if ( playerData == undefined ) {
        playerData = registerPlayer( player )
    }

    playerData.loaders.push( posString( block ) )

    var isStation = checkStation( event )
    chunkLoaders.loaders[ posString( block ) ] = {
        owner: player.uuid.toString(),
        active: false,
        type: block.id,
        range: isStation ? 1 : 0,
        position: {
            x: block.x,
            y: block.y,
            z: block.z
        },
        level: block.level.name.string,
        isStation: isStation
    }
}
function unregisterLoader( block ) {
    const [ blockData, playerData ] = getData( block )

    removeElement( playerData.loaders, posString( block ) )
    delete chunkLoaders.loaders[ posString( block ) ]
}

// Loader Updator Functions
function loaderEnabled( block ) {
    const [ blockData, playerData ] = getData( block )

    playerData.loadedChunks += AREA[ blockData.range ]
    blockData.active = true

    if ( playerData.loadedChunks > MAXIMUM_LOADED_CHUNKS ) {
        disableLoader( block )
    }
}
function loaderDisabled( block ) {
    const [ blockData, playerData ] = getData( block )

    playerData.loadedChunks -= AREA[ blockData.range ]
    blockData.active = false
}
function disableLoader( block ) {
    const [ blockData, playerData ] = getData( block )
    if ( blockData == undefined ) {
        console.error( 'Attempted to reset block at ' + posString( block ) + ': Not registered.' )
        return
    }
    if ( !blockData.active ) {
        console.error( 'Attempting to disable chunk loader ' + posString( block ) + ': Not Active.' )
        return
    }

    const { x, y, z } = block
    var loc = global.new.point( x, y, z )

    if ( blockData.isStation ) {
        if ( block.down.id.equals( 'create:track_station' ) ) {
            destroyLoader( block )
            return
        }
        block.set( blockData.type, {facing: 'up'} )
        blockData.isStation = false
    } else {
        // Break create network
        global.run( 
            'execute in ' + blockData.level + ' run data modify block ' + loc.toCommandString() + ' Network.Size set value 0' 
        )
    }

    notifyPlayer( playerData.username, block )
    loaderDisabled( block )
}
function changeRange( block, newRange ) {
    const [ blockData, playerData ] = getData( block )
    if ( blockData.range == newRange ) {
        return
    }

    if ( !blockData.active ) {
        blockData.range = newRange
        return
    }

    loaderDisabled( block )
    blockData.range = newRange
    loaderEnabled( block )
}
function destroyLoader( block ) {
    const [ blockData, playerData ] = getData( block )
    const { x, y, z } = block
    var loc = global.new.point( x, y, z )

    global.run( 'execute in ' + blockData.level + ' run setblock ' + loc.toCommandString() + ' air destroy')
    notifyPlayer( playerData.username, block )
    if ( blockData.active ) {
        loaderDisabled( block )
    }
    unregisterLoader( block )
}

// Helper Functions
function posString( block ) {
    return ('x' + block.x + 'y' + block.y + 'z' + block.z + '_' + block.level.name.string )
}
function getData( block ) {
    var blockData = chunkLoaders.loaders[ posString( block ) ]
    var playerData = chunkLoaders.players[ blockData.owner ]
    return [ blockData, playerData ]
}
function checkStation( blockPlaceEvent ) {
    const { block } = blockPlaceEvent

    if ( block.id != 'create_power_loader:brass_chunk_loader' ) {
        return false
    }

    var facing = FACING_OPPOSITE[ block.properties.facing ]
    var station = block[ facing ].id

    return station.equals( "create:track_station" )
}
function removeElement( list, value ) {
    for ( var i = 0; i < list.length; i++ ) {
        if ( list[i] == value ) {
            delete list[i]
            return true
        }
    }
    return false
}
function onPlayerJoined( player, tries ) {
    if ( tries == undefined ) {
        tries = 0
    } else if ( tries >= 5 ) {
        console.error( 'chunk_loader_limit error: Could not load playerdata for player ' + player.username )
        return
    }

    if ( !isLoaded ) {
        global.tick.timeout( () => {
            onPlayerJoined( player, tries++ )
        }, 10)  
        return
    }

    var playerData = chunkLoaders.players[ player.uuid.toString() ]
    if ( playerData != undefined ) {
        playerData.lastOnline = Date.now().valueOf()
    }
}
function notifyPlayer( username, block ) {

}

// Data
const AREA = [
    1,
    9,
    25
]
const REQUIRED_SPEED = [
    60,
    120,
    240
]
const FACING_OPPOSITE = {
    'up':'down',
    'down':'up',
    'east':'west',
    'west':'east',
    'north':'south',
    'south':'north'
}

// blockData.active = false
// var size = AREA[ blockData.range ]
// var playerData = chunkLoaders.players[ blockData.owner ]