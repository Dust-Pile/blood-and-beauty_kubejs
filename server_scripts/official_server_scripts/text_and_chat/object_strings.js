global.objectToString = (object) => {
    if (object == null) {
        return 'null'
    }
    let keys = Object.keys(object)
    let outString = ''
    for (var key of keys) {
        //Skip all functions
        if ((typeof object[key]).equals('function')) {
            continue
        }
        //Comma Separated
        if (!outString.equals('')) {
            outString += ','
        }
        //Key
        outString += '"' + key + '":'
        //Value
        outString += valueToString(object[key])
    }
    return '{' + outString + '}'
}
let valueToString = (value) => {
    let outString = ''
    if ((typeof value).equals('object')) {
        if (global.isArray(value)) {
            outString += arrayToString(value)
        } else {
            outString += global.objectToString(value)
        }
    } else if ((typeof value).equals('number') || (typeof value).equals('boolean')){
        outString += ''+value
    } else if ((typeof value).equals('string')){
        outString += '"'+global.escapeString(value)+'"'
    } else {
        outString += '"'+value+'"'
    }

    return outString
}
let arrayToString = (array) => {
    if (array == null || array.length < 1) {
        return '[]'
    }
    let outString = ''
    for (var i = 0; i < array.length; i++) {
        if (typeof array[i] == 'function') {
            continue
        }
        if (!outString.equals('')) {
            outString += ','
        }
        outString += valueToString(array[i])
    }

    return '['+outString+']'
}

let escapeChars = ['"',"'",'\\']
let escapeExempt = {
    '\\': ['n']
}
global.escapeString = (string) => {
    let chars = string.split('')
    let outputString = ''
    for (var i = 0; i < chars.length; i++) {
        if (escapeChars.includes(chars[i])) {
            if (escapeExempt[chars[i]] != null && i+1 < chars.length && escapeExempt[chars[i]].includes(chars[i+1])) {
                outputString += chars[i]
                continue
            }
            outputString += '\\'
        }
        outputString += chars[i]
    }
    return outputString
}

global.isArray = (object) => {
    if (typeof object == 'object') {
        if(Object.prototype.toString.call(object) === '[object Array]') {
            return true
        }
    }
    return false
}

/*
global.parseString = (string) => {
    if (string == null || string.equals('')) {
        return null
    }
    if (string.charAt(0).equals('{')) {
        return objectFromString(string, 1).object
    } else if (string.charAt(0).equals('[')) {
        return arrayFromString(string, 1).array
    } else {
        return nextMetaValue(string, 0).value
    }
}
let objectFromString = (string, index) => {
    let outObject = {}
    let thisKey = ''

    for (index; index < string.length; index++) {
        //global.sendAlert('Dusty_Flow', global.new.text(''+index+', '+string.charAt(index)))
        if (string.charAt(index).equals('"')) {
            let obj = nextMetaString(string, index+1)
            index = obj.index
            thisKey = obj.string
        } else if (string.charAt(index).equals(':')) {
            if (thisKey == '') {
                global.sendAlert('Dusty_Flow', global.new.text('thisKey == \'\'', 'gold'))
                return null
            }
            let obj = nextMetaValue(string, index+1)
            index = obj.index
            outObject[thisKey] = obj.value
            //global.sendAlert('Dusty_Flow', global.new.text(''+thisKey+':'+obj.value, 'yellow'))
            thisKey = ''
            if (!obj.type.equals('object') && string.charAt(index).equals('}')) {
                break
            }
        } else if (string.charAt(index).equals('}')) {
            break
        }
    }

    if (outObject.class != null && global.newEmpty[outObject.class] != null) {
        let emptyObject = global.newEmpty[outObject.class]()
        outObject = Object.assign(emptyObject, outObject)
    }

    return {object: outObject, index: index}
}
let arrayFromString = (string, index) => {
    let outArray = []
    while (index < string.length) {
        let obj = nextMetaValue(string, index)
        index = obj.index + 1
        if (obj.value != null) {
            outArray.splice(outArray.length, 0, obj.value)
        }
        if (obj.type != 'array' && string.charAt(obj.index) == ']') {
            break
        }
    }

    return {array: outArray, index: index}
}
let nextMetaString = (string, index) => {
    let outString = ''
    for (index; index < string.length; index++) {
        if (string.charAt(index).equals('"')) {
            return {string: outString, index: index}

        } else if (string.charAt(index).equals('\\')) {
            if (!escapeExempt['\\'].includes(string.charAt(index+1))) {
               index++
            }
        }
        outString += string.charAt(index)
    }

    return null
}
let nextMetaValue = (string, index) => {
    var outValue = ''

    for (index; index < string.length; index++) {
        let char = string.charAt(index)
        if (char.equals(',') || char.equals(']') || char.equals('}')) {
            if (outValue.trim().length == 0) {
                return {value: null, index: index, type: 'none'}
            }
            break

        } else if (char.equals('"')) {
            let obj = nextMetaString(string, index+1)
            index = obj.index
            return {value: obj.string, index: index, type: 'string'}

        } else if (char.equals('{')) {
            let obj = objectFromString(string, index+1)
            index = obj.index
            return {value: obj.object, index: index, type: 'object'}

        } else if (char.equals('[')) {
            let obj = arrayFromString(string, index+1)
            index = obj.index
            return {value: obj.array, index: index, type: 'array'}
        }

        outValue += char
    }


    outValue = outValue.trim()
    if (outValue.equals('true')) {
        outValue = true
    } else if (outValue.equals('false')) {
        outValue = false
    } else {
        outValue = Number(outValue)
    }

    return {value: outValue, index: index, type: 'other'}
}
    /** */

/*
//Object testing
global.new.text('---Object Testing---','red').tellraw('@a')
let testObject = {
    'testObj': {
        'class': 'CLASS',
        'name': 'NAME',
        'priority': 0,
        'basePriority': 0,
        'description': global.new.textList("Your Mother"),
        'location': "None",
        'criteria': [],
        'dates': {},
    },
    'Another': {
        'class': 'CLASS',
        'name': 'NAME',
        'priority': 0,
        'basePriority': 0,
        'description': global.new.textList("Your Mother"),
        'location': "None",
        'criteria': [],
        'dates': {},
    }
}
testObject = Object.assign(global.new.quest('', ''), testObject)
global.say(global.objectToString(testObject))
global.say('========')
global.say(global.objectToString(global.parseString(global.objectToString(testObject))))
/**/