//priority: 100

if ( global.blockState == null ) {
    global.blockState = {}
}

if ( global.colors == null ) {
    global.colors = {
        list: []
    }
}

// Get blockState information from a block
/**
 * @param { Internal.BlockContainerJS_ } block 
 * @returns { Internal.JsonObject_ }
 */
global.blockState.get = ( block ) => {
    var output = {}
    
    block.properties.forEach( property => {
        output[ property ] = block.properties[ property ]
    })

    return output
}

//Gets current blockstate information and all options for other states
/**
 * @param { Internal.BlockContainerJS_ } block 
 * @returns { Internal.JsonObject_ }
 */
global.blockState.getOptions = ( block ) => {
    var output = {}
    block.blockState.values.entrySet().forEach( entry => {
        const key = entry.key
        output[ key.name ] = {
            "options": []
        }
        if ( ( typeof entry.value ).equals( 'number' ) || ( typeof entry.value ).equals( 'boolean' ) ) {
            output[ key.name ].value = entry.value

        } else {
            output[ key.name ].value = entry.value.toString()

        }
        for ( var val of key.possibleValues ) {
            output[ key.name ].options.push( val )
        }
    })

    return output
}

global.find = ( list, condition ) => {
    for (var i = 0; i < list.size(); i++) {
        if ( condition( list, i ) ) {
            return true
        }
    }
    return false
}

/**
 * @param { Internal.Consumer_<String> } callback
 */
global.colors.forEach = ( callback ) => {
    for ( var i = 0; i < 16; i++) {
        callback(global.colors.list[i])
    }
}
global.colors.list = [
    'white',
    'light_gray',
    'gray',
    'black',
    'brown',
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'cyan',
    'light_blue',
    'blue',
    'purple',
    'magenta',
    'pink'
]

/**
 * @param { Internal.JsonObject_ } object 
 * @returns
 */
global.deepCopy = ( object ) => {
    return JSON.parse(JSON.stringify(object))
}

/**
 * @param { Internal.ItemStack } item 
 * @param { Number } amount
 * @param { Function } deleter
 */
global.damage = ( item, amount, deleter ) => {
    if ( !item.damageableItem ) {
        return false
    }

    if ( amount == null ) {
        amount = 1
    }

    item.damageValue += amount
    if ( item.damageValue >= item.maxDamage ) {
        if ( deleter != null ) {
            deleter()
        }
        return true
    }

    return false
}

/**
 * @param { Object } obj 
 * @returns { String }
 */
global.locFormat = ( obj ) => {
    return ' ' + obj.x + ' ' + obj.y + ' ' + obj.z
}

// Comparator guide: ( newElem, listElem ) => { return int }
// return value >0, move towards the front of the list ( index 0 )
/**
 * 
 * @param { Array } list 
 * @param { * } element 
 * @param { Function } comparator 
 * @param { Number } first 
 * @param { Number } last 
 * @returns { boolean }
 */
global.binaryInsert = ( list, element, comparator, first, last ) => {
    if ( list.length < 1 ) {
        list.push( element )
        return true
    }
    
    if ( first == undefined ) {
        first = 0
    }
    if ( last == undefined ) {
        last = list.length - 1
    }
    
    var mid = Math.floor( ( first + last )/2 )
    var relation = comparator( element, list[ mid ] )

    if ( relation == null ) {
        console.error( "Binary Search input error: comparator returned null." )
        return false
    } else if ( relation == NaN ) {
        console.error( "Binary Search input error: comparator returned NaN." )
        return false
    }

    if ( ( last - first ) <= 1 ) {
        if ( comparator( element, list[ first ] ) >= 0 ) {
            list.splice( first, 0, element )
            return true
        } else if ( comparator( element, list[ last ] ) <= 0 ) {
            list.splice( last + 1, 0, element )
            return true
        } else if ( comparator( element, list[ first ] ) < 0 ) {
            list.splice( first + 1, 0, element )
            return true
        }
        console.error( "Binary Search edge case: solution not found." )
        return false
    }

    if ( relation == 0 ) {
        list.splice( mid, 0, element )
        return true
    } else if ( relation > 0 ) {
        last = mid - 1
    } else {
        first = mid + 1
    }

    return global.binaryInsert( list, element, comparator, first, last )

}
global.forEachIn = ( list, consumer ) => {
    if ( list == null ) {
        console.error( 'Error in global.forEachIn(): List is null' )
        //consumer( list ) //enable to ping the error location
        return false
    }
    if ( list.class != undefined ) {
        return forEachInCompoundTag( list, consumer )
    }
    if ( typeof list != 'object' ) {
        consumer( list )
        return true
    }
    if ( list[0] != undefined ) {
        var length = ( list.size != undefined ) ? list.size() : list.length
        for (var i = 0; i < length; i++ ) {
            var result = consumer( list[i] ) 
            if ( result != undefined ) {
                return result
            }
        }
    } else {
        var keys = Object.keys(list)
        var length = keys.length
        for (var i = 0; i < length; i++ ) {
            var result = consumer( list[keys[i]], keys[i] ) 
            if ( result != undefined ) {
                return result
            }
        }
    }
}
function forEachInCompoundTag( tag, consumer ) {
    if ( tag.class.toString().equals( "class dev.latvian.mods.rhino.mod.util.OrderedCompoundTag" ) ) {
        var keys = Object.keys( tag )
        for ( var i = 0; i < keys.length; i++ ) {
            var result = consumer( tag[ keys[i] ], keys[i] )
            if ( result != undefined ) {
                return result
            }
        }
        return
    }
}
global.removeElement = ( list, value ) => {
    for ( var i = 0; i < list.length; i++ ) {
        if ( list[i] == value ) {
            list.splice( i, 1 )
            return true
        }
    }
    return false
}