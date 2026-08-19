//priority: 90

//TODO:
// Add text list handler

global.newEmpty.text = () => {
    return global.new.text('')
}
/**
 * Creates new Text object
 * 
 * @param {String} text Text to be contained
 * @param {String} color Color chosen from global.text.colors
 * @returns 
 */
global.new.text = (text, color) => {
    let thisText = {
        'text': text,
        'class': 'text',

        'bold': false,
        'italic': false,
        'underlined': false,
        'strikethrough': false,
        'obfuscated': false,

        'toString': () => { return global.text.toString(thisText) },
        'setClickEvent': (action, value) => { return global.text.setClickEvent(thisText, action, value) },
        'setCommand': (command) => { return global.text.setCommand(thisText, command) },
        'setHoverEvent': (action, contents) => { return global.text.setHoverEvent(thisText, action, contents) },
        'setHoverEventValue': (action, value) => { return global.text.setHoverEvent(thisText, action, value) },
        'tellraw': (player, moreText) => { global.text.tellraw(player, thisText, moreText) },

        'setBold': (setValue) => { return global.text.format(thisText, 'bold', setValue) },
        'setItalic': (setValue) => { return global.text.format(thisText, 'italic', setValue) },
        'setUnderlined': (setValue) => { return global.text.format(thisText, 'underlined', setValue) },
        'setStrikethrough': (setValue) => { return global.text.format(thisText, 'strikethrough', setValue) },
        'setObfuscated': (setValue) => { return global.text.format(thisText, 'obfuscated', setValue) },
    }

    if (color == null) {
        thisText.color = 'white'
    } else {
        thisText.color = color
    }
    
    return thisText
}

if (global.text == null) {
    global.text = {
        'blank': global.new.text(''),
        'newLine': global.new.text('\\n'),
        'space': global.new.text(' '),
        'colors': ['black','dark_blue','dark_green','dark_aqua','dark_red','dark_purple','gold','gray','dark_gray','blue','green','aqua','red','light_purple','yellow','white']
    }
}

/**
 * Creates a string of the text and color as used by tellraw and title commands
 * 
 * @param {Object} text text object
 * @returns formated string
 */
global.text.toString = (text) => {
    return global.objectToString(text)
}
global.text.setClickEvent = (text, action, value) => {
    text.clickEvent = {
        'action': action,
        'value': value
    }
    return text
}
global.text.setCommand = (text, command) => {
    return global.text.setClickEvent(text, 'run_command', command)
}
global.text.setHoverEvent = (text, action, contents) => {
    text.hoverEvent = {
        'action': action,
        'contents': contents
    }
    return text
}
global.text.setHoverEventValue = (text, action, value) => {
    text.hoverEvent = {
        'action': action,
        'value': value
    }
    return text
}
/**
 * Sends text to players
 * @param {Object} text text object
 * @param {String} player valid target selector
 */
global.text.tellraw = (player, text, moreText) => {
    let runString = 'tellraw '+player+' '
    if (moreText != null) {
        if (moreText.text != null) {
            moreText = [moreText]
        }
        runString += '['+text.toString()
        for (var t of moreText) {
            runString += ','+t.toString()
        }
        runString += ']'
    } else {
        runString += text.toString()
    }
    global.run(runString)
    return runString
}
global.text.format = (text, attribute, setValue) => {
    if (setValue == null) {
        setValue = true
    }
    switch (attribute) {
        case 'bold':
            text.bold = setValue
            break
        case 'italic':
            text.italic = setValue
            break
        case 'underlined':
            text.underlined = setValue
            break
        case 'strikethrough':
            text.strikethrough = setValue
            break
        case 'obfuscated':
            text.obfuscated = setValue
            break
    }

    return text
}

//Helper Functions
/*
global.addSpaceBefore = (string, minLength) => {
    let addCount = minLength - string.length
    let outString = ''
    if (addCount <= 0) {
        return string
    }
    for (var i = 0; i < addCount; i++) {
        outString += ' '
    }
    return outString + string
}
global.addSpaceAfter = (string, minLength) => {
    let addCount = minLength - string.length
    let outString = string
    if (addCount <= 0) {
        return outString
    }
    for (var i = 0; i < addCount; i++) {
        outString += ' '
    }
    return outString
}
*/

//---
global.newEmpty.textList = () => {
    return global.new.textList()
}
global.new.textList = (text) => {
    let thisList = {
        list: [],
        class: 'textList',

        add: (text, color) => { return global.textList.add(thisList, text, color) },
        get: (index) => { return global.textList.get(thisList, index) },
        getLast: () => { return global.textList.getLast(thisList) },
        getText: () => { return global.textList.getText(thisList) },
        insert: (text, index) => { return global.textList.insert(thisList, text, index) },
        indexOf: (string, skip) => { return global.textList.indexOf(thisList, string, skip) },
        insertAtLine: (text, line, offset) => { return global.textList.insertAtLine(thisList, text, line, offset) },
        newLine: () => { return global.textList.newLine(thisList) },
        space: () => { return global.textList.space(thisList) },
        tellraw: (player) => { return global.textList.tellraw(thisList, player) },
        addSpaceAfter: (text, minLength) => { return global.textList.addSpaceAfter(thisList, text, minLength) },
    }

    if (text == null) {
        return thisList
    }

    thisList.add(text)

    return thisList
}
global.textList = {}
global.textList.add = (textList, text, color) => {
    if (typeof text == 'string') {
        text = [global.new.text(text, color)]
    } else if (text.text != null) {
        text = [text]
    } else if (text.list != null) {
        return textList.add(text.getText())
    }

    textList.list = textList.list.concat(text)

    return textList
}
global.textList.getLast = (textList) => {
    return textList.get(textList.list.length - 1)
}
global.textList.get = (textList, index) => {
    return textList.list[index]
}
global.textList.insert = (textList, text, index) => {
    if (text.list != null) {
        return textList.insert(text.getText(), index)
    } else if (text.text != null) {
        text = [text]
    }

    for (var i = 0; i < text.length; i++) {
        textList.list.splice(index+i, 0, text[i])
    }

    return textList
}
global.textList.indexOf = (textList, string, skip) => {
    if (skip == null) {
        skip = 0
    }

    let text = textList.getText()
    if (skip >= 0) {
        for (var i = 0; i < text.length; i++) {
            if (text[i].text.equals(string)) {
                if (skip != 0) {
                    skip--
                } else {
                    return i
                }
            }
        }
    } else {
        for (var i = text.length-1; i >= 0; i--) {
            if (text[i].text.equals(string)) {
                if (skip != -1) {
                    skip++
                } else {
                    return i
                }
            }    
        }
    }
    return -1
}
global.textList.insertAtLine = (textList, text, line, offset) => {
    if (offset == null) {
        offset = 0
    }

    var index
    if (line = 0) {
        index = 0
    } else {
        if (line > 0) {
            line -= 1
        }
        index = textList.indexOf('\\n', line)
    }
    if (index != -1) {
        index += offset + 1
        textList.insert(text, index)
    }
    
    return textList
}
global.textList.getText = (textList) => {
    return textList.list.slice()
}
global.textList.newLine = (textList) => {
    textList.add(global.text.newLine)

    return textList
}
global.textList.space = (textList) => {
    textList.add(global.text.space)

    return textList
}
global.textList.tellraw = (textList, player) => {
    let text = textList.getText()
    let header = text.shift()
    return header.tellraw(player, text)
}
let charLens = {
    'i': 1,'l': 1,'.': 1,'!': 1,'|': 1,"'": 1,':': 1,';': 1,
    '`': 1.5,
    't': 2,'I': 2,'(': 2,')': 2,'{': 2,'}': 2,'[': 2,']': 2,' ': 2,'"': 2,
    'f': 2.5,'k': 2.5,'~': 2.5,'<': 2.5,'>': 2.5,
    '@': 3.5
}
global.textList.addSpaceAfter = (textList, text, minLength) => {
    var chars
    if (text.text != null) {
        chars = text.text.split('')
    } else if (text.list != null) {
        for (var t of text.list) {
            chars.concat(t.text.split(''))
        }
    } else {
        chars = text.split('')
    }
    
    let realLength = 0
    for (var char of chars) {
        if (charLens[char] == null) {
            realLength += 3
        } else {
            realLength += charLens[char]
        }
    }

    if (realLength >= minLength*3) {
        return textList
    }
    
    let diff = minLength*3 - realLength
    while (diff > 2.05) {
        textList.space()
        diff -= 2
    }
    if (diff > 1.55) {
        textList.space()
    } else if (diff > 1.1) {
        textList.add('`')
    } else {
        textList.add('.')
    }

    return textList
}


/*
let text = global.new.text('Testing ', 'red')
let text2 = global.new.text('[Button]', 'green').setHoverEvent('show_text', 'Hi').setClickEvent('run_command', '/tp @s 0 0.5 0')

text.tellraw('@a', text2)
*/

/*
let text = global.new.text('Testing', 'red')
let text2 = global.new.text('[Button]', 'green').setHoverEvent('show_text', 'Hi').setClickEvent('run_command', '/tp @s 0 0.5 0')

let list = global.new.textList(text).space()
list.newLine().add(" Also still testing uwu~", "gray").getLast().setItalic()

list.tellraw('@a')
list.insertAtLine(global.new.textList(text2).space().add(text), 1, -1)
list.tellraw('@a')
*/

//Example Tellraw
///tellraw @a {"text":"[Testing]","color":"green","clickEvent":{"action":"run_command","value":"/tp @s 0 0.5 0"},
// "hoverEvent":{"action":"show_text","value":"Teleport to Spawn"}}