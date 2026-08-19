//priority: 99

//reload on startup
ServerEvents.loaded(event => {
    //Utils.server.runCommandSilent( "reload" )
    global.tick.timeout(() => {
        global.run([
            //"kubejs reload server_scripts",
            "gamerule sendCommandFeedback true",
            "gamerule artifacts.pickaxeHeater.enabled false"
        ])
    }, 2)
})

// New Random Seed ( every reload )
Utils.random.setSeed( Date.now().valueOf() )