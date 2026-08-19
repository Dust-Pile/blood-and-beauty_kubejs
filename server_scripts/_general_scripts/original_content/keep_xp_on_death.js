var xpCache = {}

EntityEvents.death( "minecraft:player", event => {
    const { player } = event
    const uuid = player.uuid.toString()

    xpCache[ uuid ] = {
        xp: global.run( 'xp query ' + player.username + " points" ),
        levels: player.getXpLevel()
    }

    global.tick.timeout( () => {
        const { x, y, z } = player
        var aabb = AABB.of( x+5, y+5, z+5, x-5, y-5, z-5 )
        var entities = event.level.getEntitiesWithin( aabb )
        for ( var entity of entities ) {
            if ( entity.type.equals( "minecraft:experience_orb" ) && entity.age != null && entity.age <= 2 ) {
                entity.kill()
            }
        }
    }, 0 )
})

EntityEvents.spawned( "minecraft:player", event => {
    const { player } = event
    const uuid = player.uuid.toString()

    if ( xpCache[ uuid ] != null ) {
        global.tick.timeout( () => {
            player.setXpLevel( xpCache[ uuid ].levels )
            global.run( 'xp add ' + player.username + " " + xpCache[ uuid ].xp + ' points' )
            xpCache[ uuid ] = null
        }, 0 )
    }
})