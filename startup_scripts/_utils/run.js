//priority: 100

//Contains utilities related to running commands

/**
 * Method for easily sending messages to the game chat (mainly for debug)
 * 
 * @param {String} str Message to be sent
 */
global.say = ( str ) => {
    global.run( 'say ' + str )
}

var TRACE_ENABLED = false
/**
 * Adds the 'debug' keyword to the message to be more clear.
 * 
 * @param {String} str 
 */
global.debug = ( str, traceOverride ) => {
    global.say( 'DEBUG: ' + str )

    if ( TRACE_ENABLED || ( traceOverride != null && traceOverride ) ) {
        global.say( 'Trace logged in console' )
        console.info( 'Stack trace for debug message "' + str + '":\n' + console.trace() )
    }
}

/**
 * A utility for running commands. Can run strings, arrays of strings, or command object list
 *  Command objects include 'command' key with optional 'macro' and 'handler' keys
 * 
 * @param {Object[]} commands commands to be run and accompanying features 
 * @returns void
 */
global.run = (commands) => {
    //Allow Running Singular (overloading basically)
    if (typeof commands == 'string') {
        return Utils.server.runCommandSilent(commands)
    }
    //Environemnt param to allow handler to modify command running
    let context = {
        shouldBreak: false,
        skipCount: 0,
        returnValue: null,

        'skip': (count) => { context.count = count },
        'break': () => { context.shouldBreak = true }
    }
    var macro
    for (var i = 0; i < commands.length; i++) {
        //get macro
        if (commands[i].macro != null) {
            macro = commands[i].macro
        }
        if (typeof commands[i] === 'string') {
            //Run command, no params or handler
            Utils.server.runCommandSilent(commands[i])
        } else {
            //Run command with handler
            //Check Macro
            let thisCommand = commands[i].command
            if (thisCommand.substring(0,1) == '$') {
                thisCommand = commandMacro(thisCommand, macro)
            }
            //Check for and run handler
            if (commands[i].handler == null) {
                Utils.server.runCommandSilent(thisCommand)
            } else {
                context.returnValue = commands[i].handler(Utils.server.runCommandSilent(thisCommand), context)
            }
        }
        if (context.shouldBreak == true) {
            return context.returnValue
        }
        i += context.skipCount
        context.skipCount = 0
    }
    return context.returnValue
}

//args is an array containing objects with keys "none", "any", and "all"
//  these object cointain their own array with commands or a subtitle being "none", "any", or "all"
let ALL_MODES = [
    "none",
    "any",
    "all"
]
let CHECK_MODES = {
    none: (isTrue) => {
        return isTrue -1
    },
    any: (isTrue) => {
        return (isTrue*3) -2
    },
    all: (isTrue) => {
        return (!isTrue) -1
    }
}
let FINISH_MODES = {
    none: true,
    any: false,
    all: true
}
global.check = (args, mode) => {
    //Validation
    if (mode == null) {
        mode = "all"
    } else if (!CHECK_MODES.includes(mode)) {
        console.error('Incorrect indentifier delivered to global.check: invalid mode')
        return null
    }
    if (typeof args == 'string') { //allow single string input
        args = [args]
    }
    if (args == null || !global.isArray(args)) {
        console.error('Incorrect type delivered to global.check: args was not an array')
        return null
    }

    //Parse commands with run
    for (var argument of args) {
        var returnedVal
        //No implicit interpretation for list of commands, only single strings
        if (argument.mode == null) {
            returnedVal = global.run(argument)
            if (returnedVal == null) {
                if (returnedVal.handler == null) {
                    console.error('Implicit command handler failed to produce a valid response.')
                } else {
                    console.error('Invalid response from command handler: null.')
                }
                return null
            }
        } else {
            returnedVal = global.check(argument.commands, argument.mode)
            //Means something has gone wrong- pass it up the chain
            if (returnedVal == null) {
                return null
            }
        }

        //default handler
        if (typeof returnedVal != 'boolean') {
            if (returnedVal >= 1) {
                returnedVal = true
            } else if (returnedVal <= 0) {
                returnedVal = false
            } else {
                console.error('Invalid state returned to default handler: '+returnedVal+' is not a Number or a Boolean')
            }
        }

        //Apply result to check mode
        let condition = CHECK_MODES[mode](returnedVal)
        if (condition != -1) {
            return Boolean(condition)
        }
    }
    //If loop was not canceled, send implied condition
    return FINISH_MODES[mode]
}

/**
 * A utility for identifying a matching closing bracket in the string following an opening bracket
 * 
 * @param {String} string string to search through
 * @param {String} openTerm term which indicates going down a layer (like '{')
 * @param {String} closeTerm term which indicates going up a layer (like '}')
 * @returns index of closing term that breaks out of the string or -1
 */
global.bracketFindMatch = (string, openTerm, closeTerm) => {
    let sum = 1
    for (var i = 0; i < string.length - closeTerm.length + 1; i++) {
        var openQuery = ""; 
        if ( !(string.substring(i).length < openTerm.length)) {
            openQuery = string.substring(i, i + openTerm.length)
        }
        let closeQuery = string.substring(i, i + closeTerm.length)
        if (openQuery.equals(openTerm)) {
            sum++
        } else if (closeQuery.equals(closeTerm)) {
            sum--
            if (sum == 0) {
                return i
            }
        }
    }
    return -1
}
/**
 * Replaces terms in a string with values from the macro object.
 *  Works in the format '$blah blah ${key}'
 * 
 * @param {String} string string for values to be replaced
 * @param {Object} macro object contianing replacement values
 * @returns modified string
 */
let commandMacro = (string, macro) => {
    //Trim Identifier
    string = string.substring(1)
    let partials = string.split("${")
    if (partials.length == 1) {
        return string
    }
    let output = ""
    for (var i = 0; i < partials.length; i++) {
        let closeIndex = global.bracketFindMatch(partials[i], "{", "}")
        if (closeIndex == -1) {
            if (i == 0) {
                output += partials[0]
                continue
            }
            return "return fail"
        }
        let path = partials[i].substring(0,closeIndex).trim().split(".")
        var value = macro[path[0]]
        for (var i = 1; i < path.length; i++) {
            value = value[path[i]]
        }
        output += value + partials[i].substring(closeIndex + 1)
    }
    return output
}

//debug
/*
global.say(global.new.commandGroup(
    '$return ${number}', 
    {number: 5}, 
    (result) => { return result }
).run())
/** */