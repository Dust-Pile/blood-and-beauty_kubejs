//priority: 81

global.criterion = {}

/*
global.criterion = {
    commandTrigger: global.parseString(event.getServer().getPersistentData().commandTrigger),
}
if (global.criterion.commandTrigger == null) {
    global.criterion.commandTrigger = {
        counts: {}
    }
}
    /** */
//if (global.criterion.commandTrigger.counts == null) {
//    global.criterion.commandTrigger.counts = {}
//} 

global.new.criterion = (description, weight, type) => {
    let thisCriterion = {
        'description': description,
        'weight': weight,
        'class': type,
        'data': {},

        'getPercent': () => { return global.criterion.getPercent(thisCriterion, thisCriterion.class) },
        'getWeight': () => { return thisCriterion.weight },
        'matches': (criterion) => { return global.criterion.matches(thisCriterion, criterion) },
    }

    return thisCriterion
}
/*
global.newEmpty.commandTrigger = () => {
    return global.new.commandTrigger(global.text.blank, 1, '')
}
    /** */

//If you want a scoreboard that isn't a dummy, make it beforehand.
global.new.scoreboard = (description, objective, player, count, weight) => {
    //validation
    if (count == null || count < 1) {
        count = 1
    }
    if (weight == null) {
        weight = count
    }
    if (objective == null || player == null) {
        return null
    }

    let thisCriterion = global.new.criterion(description, weight, 'scoreboard')

    thisCriterion.data = {
        targetCount: count,
        objective: objective,
        player: player
    }

    global.new.commandGroup(
        '$scoreboard objectives add ${objective} dummy', 
        {objective: objective, player: player}
    )
        .add('$execute unless score ${player} ${objective} matches -999999999..999999999 run scoreboard players set ${player} ${objective} 0')
        .run()

    return thisCriterion
}

global.criterion.matches = (criterion, compareCriterion) => {
    if (!criterion.class.equals(compareCriterion.class)) {
        return false
    } 
    switch (criterion.class) {
        case 'scoreboard':
            if (criterion.data.objective == compareCriterion.data.objective) {
                return criterion.data.player == compareCriterion.data.player
            }
            break
    }
    return false
}

global.criterion.getPercent = (criterion, type) => {
    var percent
    let data = criterion.data
    switch (type) {
        case 'scoreboard':
            percent = global.new.commandGroup(
                '$scoreboard players get ${player} ${objective}', 
                {objective: data.objective, player: data.player},
                (result, context) => {
                    return (result / data.targetCount) * 100
                }
            ).run()
            return validatePercent(percent)
        default:
            console.error('Invalid Subtype: '+type+' is not registered with criteria interface.')
    }
}

/*
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal('quest_trigger')
        .requires(s => s.hasPermission(4))
        .then(Commands.argument('name', Arguments.STRING.create(event))
            .executes(c => {
                let counts = global.criterion.commandTrigger.counts
                let name = Arguments.STRING.getResult(c, 'name')
                let username = c.source.getPlayer().getUsername()

                if (counts[name] == null) {
                    global.new.text("Unknown Criterion", "red").tellraw(username)
                    return 0
                }

                counts[name]++
                global.new.text("Added 1 to count for "+name+" for a total of "+counts[name]+".").tellraw(username)
                return 1
            })
            .then(Commands.argument('count', Arguments.INTEGER.create(event))
                .executes(c => {
                    let counts = global.criterion.commandTrigger.counts
                    let count = Arguments.INTEGER.getResult(c, 'count')
                    let name = Arguments.STRING.getResult(c, 'name')
                    let username = c.source.getPlayer().getUsername()

                    if (counts[name] == null) {
                        global.new.text("Unknown Criterion", "red").tellraw(username)
                        return 0
                    }

                    counts[name] += count
                    global.new.text("Added "+count+" to count for "+name+" for a total of "+counts[name]+".").tellraw(username)
                    return 1
                })
            )
        )
    )
})
/**/

let validatePercent = (percent) => {
    if (percent > 100) {
        return 100
    } else if (percent < 0) {
        return 0
    }
    return percent
}

/*
let regChests = []
regChests[regChests.length] = {
    'trigger': global.new.point(7, 0, 7),
    'check': global.new.point(9, 0, 7)
}

PlayerEvents.chestOpened(event => {
    global.say('Box Opened')
    let b = event.getBlock()
    let location = global.new.point(b.getX(), b.getY(), b.getZ())
    let contEvent = false
    for (var chest of regChests) {
        if (location.equals(chest.trigger)) {
            let chestContext = event.getLevel().getBlock(chest.check.x, chest.check.y, chest.check.z)
            global.say('Registered Box Opened')
            let items = chestContext.getInventory().getAllItems()
            global.say(items.toString())
            break
        }
    }
})
    */