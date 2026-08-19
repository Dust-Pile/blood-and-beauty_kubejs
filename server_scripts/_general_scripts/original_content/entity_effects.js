const EFFECTS = {
    'richs_races_wood_elves:wood_elf': {
        'minecraft:regeneration': {
            strength: 1
        }
    },
    'minecraft:horse': {
        'minecraft:speed': {
            strength: 2
        }
    },
    'minecraft:donkey': {
        'minecraft:speed': {}
    },
    'minecraft:mule': {
        'minecraft:speed': {}
    }
}

global.forEachIn( EFFECTS, ( entityEffects, id ) => {
    EntityEvents.spawned( id, event => {
        const { entity } = event

        global.forEachIn( entityEffects, ( properties, effect ) => {
            global.tick.timeout( () => {
                global.applyEffect( entity, effect, properties.duration, properties.strength, properties.doParticle )
            }, 2 )
        })
        
    })
})