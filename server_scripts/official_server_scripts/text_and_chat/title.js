//priority: 89

if (global.title == null) {
    global.title = {}
}

/**
 * Creates new Title object
 * @returns new Title object
 */
global.new.title = () => {
    let thisTitle = {
        'title': null,
        'subtitle': null,
        'actionbar': null,

        /**
         * Sets a value of the title
         * @param {String} type Type to change ('title', 'subtitle', 'actionbar')
         * @param {Object} text Text object
         * @returns success
         */
        'set': (type, text) => { return global.title.set(thisTitle, type, text) },
        /**
         * Set all values of the Title object
         * @param {Object} textOne title text
         * @param {Object} textTwo subtitle text
         * @param {Object} textThree actionbar text
         */
        'setAll': (textOne, textTwo, textThree) => { global.title.setAll(thisTitle, textOne, textTwo, textThree) },
        /**
         * Displays Title object to player(s)
         * @param {String} player valid target selctor
         */
        'display': (player) => { global.title.display(thisTitle, player) }
    }

    return thisTitle
}
/**
 * Create new title object with defined values
 * @param {Object} textOne title text
 * @param {Object} textTwo subtitle text
 * @param {Object} textThree actionbar text
 * @returns new Title object
 */
global.new.definedTitle = (textOne, textTwo, textThree) => {
    let thisTitle = global.new.title()
    thisTitle.setAll(textOne, textTwo, textThree)

    return thisTitle
}
/**
 * Sets a value of the title
 * @param {Object} title Title object
 * @param {String} type Type to change ('title', 'subtitle', 'actionbar')
 * @param {Object} text Text object
 * @returns success
 */
global.title.set = (title, type, text) => {
    let newText = Object.assign({}, text)
    delete newText.clickEvent
    delete newText.hoverEvent
    switch(type) {
        case 'title':
            title.title = newText
            return true
        case 'subtitle':
            if (title.title == null) {
                title.title = global.text.blank
            }
            title.subtitle = newText
            return true
        case 'actionbar':
            title.actionbar = newText
            return true
    }
    return false
}
/**
 * Set all values of the Title object
 * @param {Object} title Title object
 * @param {Object} textOne title text
 * @param {Object} textTwo subtitle text
 * @param {Object} textThree actionbar text
 */
global.title.setAll = (title, textOne, textTwo, textThree) => {
    title.set('title', textOne)
    title.set('subtitle', textTwo)
    title.set('actionbar', textThree)
}
/**
 * Displays Title object to player(s)
 * @param {Object} title Title object 
 * @param {String} player valid target selctor
 */
global.title.display = (title, player) => {
    let commands = []
    if (title.title != null) {
        commands.splice(commands.length, 0, 'title '+player+" title "+title.title.toString())
    }
    if (title.subtitle != null) {
        commands.splice(commands.length, 0, 'title '+player+" subtitle "+title.subtitle.toString())
    }
    if (title.actionbar != null) {
        commands.splice(commands.length, 0, 'title '+player+" actionbar "+title.actionbar.toString())
    }
    global.run(commands)
}