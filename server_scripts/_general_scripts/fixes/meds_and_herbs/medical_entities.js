// Entity Tagger
EntityEvents.spawned( event => {
    const { entity } = event

    global.tick.timeout( () => {
        if ( !entity.isLiving() ) {
            return
        }

        if (
            global.run( 'execute as ' + entity.username + ' if entity @s[type=#bloodandbeauty:meds_immune]' )
        ) {
            entity.addTag( "MEDS_IMMUNE" )
        } else if (
            global.run( 'execute as ' + entity.username + ' if entity @s[type=#bloodandbeauty:no_blood]' )
        ) {
            entity.addTag( "NO_BLOOD" )
        } else if (
            global.run( 'execute as ' + entity.username + ' if entity @s[type=#bloodandbeauty:self_treating]' )
        ) {
            entity.addTag( "SELF_TREATING" )
        }

    }, 0)
    
})

// Tags
ServerEvents.tags( 'entity_type', event => {
    for ( var filter of medsEffectsImmune ) {
        event.add( 'bloodandbeauty:meds_immune', filter )
    }
    for ( var filter of medsNoBlood ) {
        event.add( 'bloodandbeauty:no_blood', filter )
    }
    for ( var filter of medsSelfTreating ) {
        event.add( 'bloodandbeauty:self_treating', filter )
    }
})
ServerEvents.tags( 'item', event => {
    // Syringe
    event.add( 'bloodandbeauty:syringe_sound', '#meds_and_herbs:syringes' )
    event.add( 'bloodandbeauty:syringe_sound', 'meds_and_herbs:syringe_empty' )
    // Dressing
    event.add( 'bloodandbeauty:dressing_sound', 'meds_and_herbs:dressing_plantago' )
    event.add( 'bloodandbeauty:dressing_sound', '#meds_and_herbs:dressings' )
    event.add( 'bloodandbeauty:dressing_sound', 'meds_and_herbs:splint' )
    event.add( 'bloodandbeauty:dressing_sound', 'meds_and_herbs:plaster' )
    // Sewing Kit ( just one item )     'meds_and_herbs:sewing_kit'
    // Medkits ( has their own tag )    '#meds_and_herbs:medkits'
    // Might want this later:           '#meds_and_herbs:extracts'
})

// Effects Handler
global.addListener( 
    'net.minecraftforge.event.entity.living.MobEffectEvent$Added',
    'meds_effects_handler',
    ( event ) => {
    const { entity, effectInstance } = event
    var type = 'none'
    var hasBlood = true

    if ( entity.tags.contains( "MEDS_IMMUNE" ) ) {
        type = 'immune'
    } else {
        if ( entity.tags.contains( "NO_BLOOD" ) ) {
            hasBlood = false
        }
        if ( entity.tags.contains( "SELF_TREATING" ) ) {
            type = 'treating'
        }
        if ( hasBlood && type.equals( 'none' ) ) {
            return
        }
    }
    
    var effectString = effectInstance.toString()
    if ( !/meds_and_herbs/.test( effectString ) ) {
        return
    }

    effectString = effectString.split(',')[0].split(' ')[0].replace('effect.', '').replace('.',':')

    if ( type.equals( 'immune' ) ) {
        removeEffect( entity, effectString )
        return
    } 
    if ( !hasBlood ) {
        for ( var effect of medsBloodEffects ) {
            if ( effect.equals( effectString )) {
                removeEffect( entity, effectString )
                return
            }
        }
    }
    if ( type.equals( 'treating' ) ) {
        var treatment = treatments[ effectString ]
        if ( treatment == undefined ) {
            return
        }
        global.tick.timeout( () => {
            if ( treatment( entity, effectInstance )) {
                entity.removeEffect( effectString )
            }
        }, Math.floor( ( Utils.random.nextDouble( 0, 1 ) * 80 ) + 20 ) )
    }
} )

// Sounds and Usage Tweaks TODO
ItemEvents.rightClicked( event => {
    const { item, player, hand, level } = event

    if ( !/^meds_/.test( item.id ) ) {
        return
    }

    if ( item.hasTag( 'bloodandbeauty:syringe_sound' ) ) {
        event.cancel()
        
    } else if ( item.hasTag( 'bloodandbeauty:dressing_sound' ) ) {

    } else if ( item.hasTag( 'meds_and_herbs:medkits' ) ) {

    } else if ( item.id.equals( 'meds_and_herbs:sewing_kit' ) ) {

    }
} )

// Helper Functions
function removeEffect( entity, effectString ) {
    global.tick.timeout( () => {
        entity.removeEffect( effectString )
    }, 0)
}
function playsound( entity, sound, sourceType ) {
    const { x, y, z } = entity
    var loc = global.new.point( x, y, z )
    sourceType = ( sourceType == undefined ) ? ( entity.isPlayer() ? 'player' : 'neutral' ) : sourceType 

    global.run(
        'playsound ' + sound + ' ' + sourceType + ' @a ' + loc.toCommandString() + ' 1 1'
    )
}

// Data
var medsBloodEffects = [
    'meds_and_herbs:bleeding',
    'meds_and_herbs:blood_loss',
    'meds_and_herbs:internal_bleeding',
    'meds_and_herbs:laceration',
    'meds_and_herbs:thrombosis'
]
var treatments = {
    'meds_and_herbs:bleeding': ( entity, effectInstance ) => { playsound( entity, "bloodandbeauty:entity.bandage" ); return true },
    'meds_and_herbs:blood_loss': ( entity, effectInstance ) => { playsound( entity, "bloodandbeauty:entity.inject" ); return true },
    'meds_and_herbs:internal_bleeding': ( entity, effectInstance ) => { playsound( entity, "bloodandbeauty:entity.inject" ); return true },
    'meds_and_herbs:laceration': ( entity, effectInstance ) => { playsound( entity, "bloodandbeauty:entity.sew" ); return true },
    'meds_and_herbs:thrombosis': ( entity, effectInstance ) => { playsound( entity, "bloodandbeauty:entity.inject" ); return true },
    'meds_and_herbs:burns': ( entity, effectInstance ) => { playsound( entity, "bloodandbeauty:entity.bandage" ); return true },
    'meds_and_herbs:broken_bone': ( entity, effectInstance ) => { 
        playsound( entity, "bloodandbeauty:entity.bandage" )
        global.applyEffect( entity, 'meds_and_herbs:bone_heal', Math.floor( effectInstance.duration / 40 ), 0, true )
        return true
    },
    'meds_and_herbs:parasites': ( entity, effectInstance ) => { playsound( entity, "bloodandbeauty:entity.inject" ); return true },
    'meds_and_herbs:bacterial_infection': ( entity, effectInstance ) => {
        if ( Utils.random.nextDouble( 0, 1 ) > 0.2 ) {
            return false
        } else {
            playsound( entity, "bloodandbeauty:entity.inject" )
            global.applyEffect( entity, 'meds_and_herbs:antibiotics', 120, 0, true )
            return true
        }
    }

}
var medsEffectsImmune = [
    /deeperdarker/,
    'dummmmmmy:target_dummy',
    /endlessbiomes/,
    /irons_spellbooks:/,
    'minecraft:creeper',
    'minecraft:elder_guardian',
    'minecraft:ender_dragon',
    'minecraft:iron_golem',
    'minecraft:magma_cube',
    'minecraft:snow_golem',
    'minecraft:warden',
    'minecraft:wither',
    'quark:stoneling',
    'quark:wraith',
    /realmrpg_quests:/,
    /gingerbread/,
    '#sons_of_sins:is_a_sin',
    'irons_spellbooks:spectral_steed'
]
var medsNoBlood = [
    /skeleton/,
    /zombie/,
    /myths_of_the_sea:/,
    /spider/,
    'quark:forgotten',
    /pots_and_mimics:/,
    /realmrpg_wyrms:/,
    /mushroomquest:/,
    'trials:bogged',
    'trials:breeze',
    'minecraft:allay',
    'minecraft:blaze',
    'minecraft:drowned',
    'minecraft:enderman',
    'minecraft:endermite',
    'minecraft:ghast',
    'minecraft:husk',
    'minecraft:phantom',
    'minecraft:shulker',
    'minecraft:slime',
    'minecraft:sniffer',
    'minecraft:stray',
    'minecraft:strider',
    'minecraft:zoglin',
    'minecraft:zombified_piglin',
    'minecraft:vex',
    'irons_spellbooks:summoned_vex',
    'irons_spellbooks:summoned_zombie',
    'irons_spellbooks:summoned_skeleton',
    'realmrpg_quests:headless_skeleton'
]
var medsSelfTreating = [
    'richs_races_wood_elves:wood_elf',
    'minecraft:villager',
    'guardvillagers:guard',
    'kobolds:kobold',
    'kobolds:kobold_captain',
    'kobolds:kobold_child',
    'kobolds:kobold_enchanter',
    'kobolds:kobold_engineer',
    'kobolds:kobold_pirate',
    'kobolds:kobold_rascal',
    'kobolds:kobold_warrior',
    'minecraft:illusioner',
    'minecraft:pillager',
    'minecraft:vindicator',
    'minecraft:piglin',
    'minecraft:piglin_brute',
    'realmrpg_quests:angler',
    'realmrpg_quests:cook',
    'realmrpg_quests:monster_hunter',
    'realmrpg_quests:piglin_gambler'
]