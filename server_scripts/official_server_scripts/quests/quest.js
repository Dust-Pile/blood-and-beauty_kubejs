//priority: 80

if (global.quest == null) {
    global.quest = {
        quests: {},
        orderedQuests: [],
        lastSort: Date.now(),
        SORT_PERIOD: 3600000 / 6, //Sort every 10 minutes
        PAGE_LENGTH: 8,
        NAME_DISPLAY_MIN_LENGTH: 14,
    }
}

if (global.new == null) {
    global.new = {
        private: {}
    }
}

global.new.quest = (name, description, priority, location) => {
    let thisQuest = {
        'class': 'quest',
        'name': name,
        'priority': 0,
        'basePriority': 0,
        'description': [],
        'location': null,
        'criteria': [],
        'dates': {},

        reload: () => { return global.quest.reload(thisQuest) },
        displayText: (player) => { return global.quest.displayText(thisQuest, player) },
        summaryText: () => { return global.quest.summaryText(thisQuest) },
        getNameColor: () => { return global.quest.getNameColor(thisQuest) },
        getPercent: () => { return global.quest.getPercent(thisQuest) },
        getCommand: () => { return global.quest.getCommand(thisQuest) },
        getStatus: () => { return global.quest.getStatus(thisQuest) },
        getStatusColor: () => { return global.quest.getStatusColor(thisQuest) },
        setDates: (start, end) => { return global.quest.setDates(thisQuest, start, end) },
        setPriority: (priority) => { return global.quest.setPriority(thisQuest, priority) },
        getPriority: () => { return global.quest.getPriority(thisQuest) },
        updatePriority: () => { return global.quest.updatePriority(thisQuest) },
        addCriteria: (criteria) => { return global.quest.addCriteria(thisQuest, criteria) }
    }

    if (global.quest.quests[name] == null) {
        if (description.text != null) {
            thisQuest.description = global.new.textList(description)
        } else {
            thisQuest.description = description
        }
    
        if (priority != null) {
            if (priority > 20) {
                thisQuest.basePriority = 20
            } else if (priority < 0) {
                thisQuest.basePriority = 0
            } else {
                thisQuest.basePriority = priority
            }
        }
        if (location != null) {
            thisQuest.location = location
        } else {
            thisQuest.location = ""
        }

        thisQuest.updatePriority()
        // global.orderedInsert(global.quest.orderedQuests, '>=', thisQuest, 'priority')
        global.binaryInsert( global.quest.orderedQuests, thisQuest, ( a, b ) => { return a.priority - b.priority })
        global.quest.quests[name] = thisQuest
        return thisQuest
    } else {
        console.warn('Quest Attempted Overrite '+name)
        return global.quest.quests[name]
    }
}
global.quest.displayText = (quest, player) => {
    let outText = global.new.textList()
    let status = quest.getStatus()
    let statusColor = quest.getStatusColor()

    outText.add('['+quest.name+']',quest.getNameColor())
        .add(' : ')
        .add(status, statusColor)
        .newLine()

    switch (status) {
        case 'Active':
            if (quest.dates.end == null) {
                outText.add(' '+quest.location+'; ', 'gray')
                    .add(' No End Date.', 'gray').newLine()
                break
            }
        case 'Ending Soon':
            outText.add(' '+quest.location+'; ', 'gray')
                .add(' Ending '+dateFormat(new Date(quest.dates.end))+'.', 'gray').newLine()
            break
        case 'Pending':
            if (quest.dates.start == null) {
                outText.add(' No Start Date.', 'gray').newLine()
                break
            }
        case 'Starting Soon':
            outText.add(' '+quest.location+'; ', 'gray')
                .add(' Starting '+dateFormat(new Date(quest.dates.start))+'.', 'gray').newLine()
            break
        case 'Completed':
            if (quest.dates.end == null) {
                break
            } else if (quest.dates.end - Date.now() > 0) {
                outText.add(' Completed ahead of Schedule.').newLine()
            }
        case 'Expired':
            outText.add(' Ended '+dateFormat(new Date(quest.dates.end))+'.', 'gray').newLine()
    }

    outText.add(quest.description)
        .newLine()
        .newLine()

    for (var criterion of quest.criteria) {
        let percent = criterion.getPercent()
        var color
        if (percent < 5) {
            color = 'red'
        } else if (percent < 33) {
            color = 'gold'
        } else if (percent < 66) {
            color = 'yellow'
        } else if (percent < 99.8) {
            color = 'green'
        } else if (percent <= 100) {
            color = 'aqua'
        }
        outText.add(' -'+global.loadingBar(percent)+'-', color)
            .space()
            .add(criterion.description)
            .newLine()
    }

    return outText.tellraw(player)
}
global.quest.summaryText = (quest) => {
    let outText = global.new.textList()
    outText.add(quest.name, quest.getNameColor())
        .getLast()
        .setCommand(quest.getCommand())
        .setHoverEvent('show_text', 'See Quest Details')
    outText.addSpaceAfter(quest.name, global.quest.NAME_DISPLAY_MIN_LENGTH)
        .add(': ')
        .add('-'+global.loadingBar(quest.getPercent())+'- '+Math.floor(quest.getPercent())+'%')
        .add(' | ')
        .add(quest.getStatus(), quest.getStatusColor())

    return outText
}
//'colors': ['black','dark_blue','dark_green','dark_aqua','dark_red','dark_purple','gold',
// 'gray','dark_gray','blue','green','aqua','red','light_purple','yellow','white']
global.quest.getNameColor = (quest) => {
    let p = quest.basePriority
    if (p <= 4) {
        return 'green'
    } else if (p <= 9) {
        return 'aqua'
    } else if (p <= 14) {
        return 'blue'
    } else if (p <= 19) {
        return 'gold'
    } else if (p == 20) {
        return 'light_purple'
    }
}
global.quest.getPercent = (quest) => {
    let sum = 0
    let sumWeight = 0
    for (var criterion of quest.criteria) {
        sum += criterion.getPercent()*criterion.getWeight()
        sumWeight += criterion.getWeight()
    }
    if (sum == 0 || sumWeight == 0) {
        return 0
    }

    let outVal = sum / sumWeight
    return outVal
}
global.quest.getCommand = (quest) => {
    return '/quests "'+quest.name+'"'
}
global.quest.getStatus = (quest) => {
    if (quest.dates == null || (quest.dates.start == null && quest.dates.end == null)) {
        return 'Pending'
    }
    if (quest.dates.end != null && quest.dates.start == null) {
        quest.dates.start = Date.now()
    }
    let dayMS = 86400000 //One day in Milliseconds

    let now = Date.now()
    if (quest.dates.start <= now) {
        if (quest.getPercent() >= 99) {
            return 'Completed'
        }
        
        if (quest.dates.end == null || quest.dates.end - now > dayMS * 2) {
            return 'Active'
        }
        if (quest.dates.end - now <= dayMS * 2 && quest.dates.end > now) {
            return 'Ending Soon'
        }
        if (quest.dates.end <= now) {
            return 'Expired'
        }
    }
    if (quest.dates.start - now <= dayMS * 2) {
        return 'Starting Soon'
    }
    return 'Pending'
}
global.quest.getStatusColor = (quest) => {
    let status = quest.getStatus()
    switch (status) {
        case 'Starting Soon':
            return 'aqua'
        case 'Active':
        case 'Completed':
            return 'green'
        case 'Pending':
            return 'yellow'
        case 'Ending Soon':
            return  'gold'
        case 'Expired':
            return 'red'
    }
}
//accepts dates as in "let date = new Date("December 17, 1995 03:24:00")"
global.quest.setDates = (quest, start, end) => {
    quest.dates = {}
    if (start != null) {
        quest.dates.start = start.getTime()
    } else {
        quest.dates.start = Date.now()
    }
    if (end != null) {
        quest.dates.end = end.getTime()
    }
    return quest
}
global.quest.setPriority = (quest, priority) => {
    quest.basePriority = priority
    return quest
}
global.quest.getPriority = (quest) => {
    let status = quest.getStatus()
    let outPriority = quest.basePriority
    let dayMS = 86400000 //One day in Milliseconds
    switch (status) {
        case 'Active':
            return outPriority
        case 'Ending Soon':
            //Equation for +0 to +20 points linearly over the 2 days till expiration
            let daysTillExpired = (quest.dates.end - Date.now()) / dayMS
            return outPriority + (-10)*(daysTillExpired - 2)
        case 'Pending':
            return (outPriority - 10) * (outPriority - 10 > 0 ? 1 : 0)
        case 'Starting Soon':
            return basePriority
        case 'Completed':
            if (quest.dates.end != null && Date.now() - quest.dates.end <= dayMS * 2) {
                return outPriority
            }
            return outPriority - 21
        case 'Expired':
            if (Date.now() - quest.dates.end <= dayMS * 2) {
                return outPriority
            }
            return outPriority - 41
    }
}
global.quest.updatePriority = (quest) => {
    quest.priority = quest.getPriority()
    return quest.priority
}
global.quest.addCriteria = (quest, criteria) => {
    if (criteria == null) {
        return null
    }
    if (criteria[0] == null) {
        criteria = [criteria]
    }

    for (var c of criteria) {
        let hasCriteria = false
        for (var i = 0; i < quest.criteria.length; i++) {
            if (quest.criteria[i].matches(c)) {
                hasCriteria = true
            }
        }
        if (hasCriteria) {
            continue
        }

        quest.criteria.splice(quest.criteria.length, 0, c)
    }
    
    return quest
}
global.quest.resetCriteria = (quest) => {
    quest.criteria = []
}
global.quest.getList = (page) => {
    if (page < 1) {
        page = 1
    }

    let thisPage = global.new.textList()
    let quests = global.quest.orderedQuests

    let start = ((page-1) * global.quest.PAGE_LENGTH)
    let end = page * global.quest.PAGE_LENGTH

    for (var i = start; i < quests.length && i < end; i++) {
        thisPage.add(quests[i].summaryText())
        thisPage.newLine()
    }
    if (thisPage.list.length == 0) {
        thisPage.add("Page is out of range","red").newLine()
    }

    return thisPage
}
global.quest.sortPriority = () => {
    if (Date.now() - global.quest.lastSort < global.quest.SORT_PERIOD) {
        return
    }
    global.quest.orderedQuests.sort((a,b) => {a.updatePriority() - b.updatePriority()})
}

//Helper Functions
global.loadingBar = (percent, size, type) => {
    if (percent > 100) {
        percent = 100
    } else if (percent < 0) {
        percent = 0
    }
    if (size == null) {
        size = 30
    } else {
        size = Math.floor(size)
    }
    if (type == null) {
        type = 'left'
    }

    let outString = ''
    let count = size
    switch (type) {
        case 'left':
            for (var i = (100 / size); i <= percent; i += (100 / size)) {
                outString += '|'
                count--
            }
            while (count > 0) {
                outString += '.'
                count--
            }
            return outString
        case 'right':
            for (var i = 100; i > percent; i -= (100 / size)) {
                outString += '.'
                count--
            }
            while (count > 0) {
                outString += '|'
                count--
            }
            return outString
        case 'center':
            let centerChar = ''
            if (size % 2 == 1) {
                if ((100 / size) <= percent) {
                    centerChar = '|'
                } else {
                    centerChar = '.'
                }
            }
            size = Math.floor(size / 2)
            return ''+global.loadingBar(percent, size, 'right') + centerChar + global.loadingBar(percent, size, 'left')
        default:
            return ''
    }
}
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let dateFormat = (date) => {
    let h = date.getHours()
    let m = addZero(date.getMinutes())
    var ampm
    if (h > 12) {
        ampm = 'PM'
        h -= 12
    } else {
        ampm = 'AM'
    }
    return WEEKDAYS[date.getDay()] + ' ' + MONTHS[date.getMonth()] + ' ' + date.getDate() + ' at ' + h + ':' + m + ' ' + ampm
}
let addZero = (i) => {
    if (i < 10 && i > 0) {
        i = "0" + i
    } else if (i >= 10) {
        return i
    }
    return '00';
}

/*
  Example Tellraw:
  tellraw @a {"text":"[Testing]","color":"green","clickEvent":{"action":"run_command","value":"/tp @s 0 0.5 0"},
   "hoverEvent":{"action":"show_text","value":"Teleport to Spawn"}} 
*/
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    let getPrevNext = (page) => {
        let outText = []
        if (page == 1 || (page-1)*global.quest.PAGE_LENGTH > global.quest.orderedQuests.length) {
            outText.splice(0,0,global.new.text("[Previous] ","dark_gray"))
        } else {
            outText.splice(0,0,global.new.text("[Previous] ","green")
                .setCommand("/quests "+(page-1))
                .setHoverEvent("show_text","Previous Page")
            )
        }
        if (page*global.quest.PAGE_LENGTH >= global.quest.orderedQuests.length) {
            outText.splice(1,0,global.new.text("[Next]","dark_gray"))
        } else {
            outText.splice(1,0,global.new.text("[Next]","green")
                .setCommand("/quests "+(page+1))
                .setHoverEvent("show_text","Next Page")
            )
        }
        return outText
    }

    let sendQuestList = (page, player) => {
        global.quest.sortPriority()
        let text = global.new.textList()
            .add("See active quests and Item Deposit outside The Keep", "gray").newLine()
            .add("Quest Board Page "+page+":").newLine()
            .add(getPrevNext(page)).newLine()
            .add(global.quest.getList(page))
            .add(getPrevNext(page)).newLine()

        text.get(0).setItalic()

        text.tellraw(player)
    }
    
    event.register(Commands.literal('quests')
        .executes(c => {
            let player = c.source.getPlayer().getUsername()
            let page = 1
            //global.say('Executing Default')
            sendQuestList(page, player)
            
            return 1
        })
        .then(Commands.argument('page', Arguments.INTEGER.create(event))
            .executes(c => {
                let page = Arguments.INTEGER.getResult(c, 'page')
                let player = c.source.getPlayer().getUsername()
                //global.say('Showing Page '+page)
                sendQuestList(page, player)

                return 1
            })
        )
        .then(Commands.argument('quest name', Arguments.STRING.create(event))
            .executes(c => {
                let name = Arguments.STRING.getResult(c, 'quest name')
                let player = c.source.getPlayer().getUsername()
                //global.say('Showing Quest Details "'+name+'"')
                if (global.quest.quests[name] == null) {
                    global.new.text("No Quest Found", "red").tellraw(player)
                    return 0
                } else {
                    global.quest.quests[name].displayText(player)
                }
                return 1
            })
        )
    )
})

//Set All Quests
global.tick.timeout(() => {
    global.quest.quests = {}
    global.quest.orderedQuests = []

    var description

    //Dragon Fight
    description = global.new.textList("It's time to free the end! Kill the dragon and get its eggs, skin, and mana.")
    description.newLine().add(" End will be unlocked at 2:30 ET", 'gray').getLast().setItalic()
    global.new.quest("Dragon Fight", description, 20, "The End; -1298, -11, -1066")
        .setDates(new Date(2025, 3-1, 8, 14, 30), new Date(2025, 3-1, 8, 15, 30))
        .addCriteria(global.new.scoreboard(global.new.text("Kill the Dragon", "dark_purple"), "basic_quests", "#dragon_kill", 1))

    //Market Build
    description = global.new.textList()
        .add("The Keep", "blue").space()
        .add("requests materials in order to build the market.").space()
        .add("Collect them and bring them to the Quest Board.")
        .newLine().space()
    description.add("Players will be able to select a spot and set up their trades. Shop mod coming soon!", "gray")
        .getLast().setItalic()
    global.new.quest("Market Materials", description, 1, "The Keep (Spawn)")
        .setDates(new Date(2025, 3-1, 8, 12, 0), null)
        .addCriteria(global.new.scoreboard(global.new.text("128x Cobblestone", "gray"), "market", "#cobble_1", 128))
        .addCriteria(global.new.scoreboard(global.new.text("128x Cobblestone Bricks", "gray"), "market", "#cobble_brick_1", 128))
        .addCriteria(global.new.scoreboard(global.new.text("256x Oak Logs", "gold"), "market", "#oak_log_1", 256))
    /* */
}, 40)
