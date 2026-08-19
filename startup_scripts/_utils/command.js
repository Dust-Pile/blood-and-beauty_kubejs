//priority: 99
global.command = {}

global.new.command = (command, macro, handler) => {
    let thisCommand = {
        class: 'command',
        command: command,
        macro: null,
        handler: null,

        run: () => { return global.command.run(thisCommand) },
        toString: () => { return global.command.toString(thisCommand) },
        setMacro: (macro) => { return global.command.setMacro(thisCommand, macro) },
        setHandler: (handler) => { return global.command.setHandler(thisCommand, handler) },
    }

    if (macro != null) {
        thisCommand.macro = macro
    }
    if (handler != null) {
        thisCommand.handler = handler
    }

    return thisCommand
}

global.command.run = (command) => {
    global.run(command)
}

global.command.toString = (command) => {
    return command.command
}

global.command.setMacro = (command, macro) => {
    command.macro = macro

    return command
}

global.command.setHandler = (command, handler) => {
    command.handler = handler

    return command
}


//---
global.commandGroup = {}

global.new.commandGroup = (command, macro, handler) => {
    let thisGroup = {
        class: 'commandGroup',
        group: [],

        run: () => { return global.commandGroup.run(thisGroup) },
        toString: () => { return global.commandGroup.toString(thisGroup) },
        add: (command, macro, handler) => { return global.commandGroup.add(thisGroup, command, macro, handler) },
        setLastMacro: (macro) => { return global.commandGroup.setLastMacro(thisGroup, macro) },
        setLastHandler: (handler) => { return global.commandGroup.setLastHandler(thisGroup, handler) },
    }

    if (command != null) {
        thisGroup.add(command, macro, handler)
    }

    return thisGroup
}

global.commandGroup.run = (commandGroup) => {
    return global.run(commandGroup.group)
}

global.commandGroup.toString = (commandGroup) => {
    if (commandGroup.group.length == 0) {
        return ''
    }
    let outString = commandGroup.group[0].toString()
    for (var i = 1; i < commandGroup.group.length; i++) {
        outString += '\n' + commandGroup.group[i].toString()
    }

    return outString
}

global.commandGroup.add = (commandGroup, command, macro, handler) => {
    let thisCommand = global.new.command(command, macro, handler)

    commandGroup.group.splice(commandGroup.group.length, 0, thisCommand)

    return commandGroup
}

global.commandGroup.getLast = (commandGroup) => {
    return commandGroup.group[commandGroup.group.length -1]
}

global.commandGroup.setLastMacro = (commandGroup, macro) => {
    commandGroup.getLast().setMacro(macro)

    return commandGroup
}

global.commandGroup.setLastHandler = (commandGroup, handler) => {
    commandGroup.getLast().setHandler(handler)

    return commandGroup
}

//---
global.checkList = {}

global.new.checkList = () => {

}