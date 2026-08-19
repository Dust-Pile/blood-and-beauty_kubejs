//priority: 99

// general utils
/**
 * @param { Internal.Level } level 
 * @param { BlockPos } pos 
 * @param { String } command 
 */
global.runAt = ( level, pos, command ) => {
    return global.run( "execute in " + level.name.string + " positioned" + global.locFormat( pos ) + " run " + command )
}

// Apply effect to mob
global.applyEffect = ( entity, effect, duration, strength, doParticle ) => {
    if ( doParticle == undefined ) {
        doParticle = false
    }
    if ( duration == undefined ) {
        duration = 'infinite'
    }
    if ( strength == undefined ) {
        strength = 0
    }

    var cmdString = 'effect give ' + entity.username + ' ' + effect + ' ' + duration + ' ' + strength + ' ' + ( !doParticle )
    var success = global.run([
        'effect clear ' + entity.username + ' ' + effect,
        cmdString
    ])

    if ( !success ) {
        console.warn( 
            'Failed to apply effect "' + effect + '" to entity ' + entity.name.string + ' (' + entity.username + '):\n\t' +
            '"' + cmdString + '"'
        )
    }
}

/**
 * @param { Internal.Level } level 
 * @param { String } sound 
 * @param { String } type 
 * @param { String } selector 
 * @param { Object } pos 
 * @param { Number } volume 
 * @param { Number } pitch 
 * @param { Number } minVolume 
 */
global.playsound = ( level, sound, pos, type, selector, volume, pitch, minVolume ) => {
    if ( volume == null ) { volume = 1 }
    if ( pitch == null ) { pitch = 1 }
    if ( minVolume == null ) { minVolume = 0 }
    if ( type == null ) { type = 'master' }
    if ( selector == null ) { selector = '@a' }

    return global.run( 
        'execute in ' + level.name.string + ' run playsound ' + sound + ' ' + type + ' ' + selector 
        + global.locFormat( pos ) + ' ' + volume + ' ' + pitch + ' ' + minVolume 
    )
}

/**
 * @param { Internal.Entity } entity 
 * @param { String } sound 
 * @param { String } type 
 * @param { Number } volume 
 * @param { Number } pitch 
 * @param { Number } minVolume 
 */
global.playsoundOnEntity = ( entity, sound, type, volume, pitch, minVolume ) => {
    if ( volume == null ) { volume = 1 }
    if ( pitch == null ) { pitch = 1 }
    if ( minVolume == null ) { minVolume = 0 }
    if ( type == null ) {
        if ( entity.isPlayer ) {
            type = 'player'
        } else {
            type = 'neutral'
        }
    }

    global.playsound( entity.level, sound, entity, type, '@a', volume, pitch, minVolume )
}

/**
 * @param { Internal.BlockContainerJS_ } block 
 * @param { String } sound 
 * @param { Number } volume 
 * @param { Number } pitch 
 * @param { Number } minVolume 
 */
global.playsoundOnBlock = ( block, sound, volume, pitch, minVolume ) => {
    if ( volume == null ) { volume = 1 }
    if ( pitch == null ) { pitch = 1 }
    if ( minVolume == null ) { minVolume = 0 }

    global.playsound( block.level, sound, block.pos, 'block', '@a', volume, pitch, minVolume )
}