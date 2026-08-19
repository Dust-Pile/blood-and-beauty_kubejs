ServerEvents.recipes( event => {

    // New Sewing table
    event.remove({ output: 'cold_sweat:sewing_table' })
    event.shapeless(
        Item.of( 'cold_sweat:sewing_table', 1 ),
        [
            'minecraft:crafting_table',
            "lowlands_clothing:needle_and_string"
        ]
    )

    // Rebalance Heavy Armor to match better with seige armor
    event.replaceInput( 
        { output: /^immersive_armors:heavy_.*/ },
        "minecraft:iron_ingot",
        "create:sturdy_sheet"
    )
    event.replaceInput( 
        { output: /^immersive_armors:heavy_.*/ },
        "minecraft:iron_block",
        "#bloodandbeauty:tough_ironlike_block"
    )

    // Lowlands Compat
    event.replaceInput(
        { input: "meds_and_herbs:sewing_kit" },
        "meds_and_herbs:sewing_kit",
        "lowlands_clothing:needle_and_string"
    )
    event.shapeless(
        "lowlands_clothing:needle_and_string",
        [
            "create:zinc_nugget",
            "minecraft:string"
        ]
    )

    event.remove({ input: "lowlands_clothing:blacksmith_hammer" })
    event.remove({ output: 'lowlands_clothing:heavy_iron_ingot' })
    event.blasting( 'lowlands_clothing:heavy_iron_ingot', 'lowlands_clothing:rough_heavy_iron_ingots' )
    event.shaped(
        Item.of( 'lowlands_clothing:rough_heavy_iron_ingots' ),
        [
            ' A ',
            'BCB',
            'BCB'
        ],
        {
            A: '#forge:tools/hammers',
            B: '#bloodandbeauty:tough_ironlike_ingot',
            C: 'minecraft:coal'
        }
    ).damageIngredient("#forge:tools/hammers")

    event.replaceInput(
        { output: 'lowlands_clothing:iron_smithing_template' },
        "minecraft:iron_ingot",
        "#bloodandbeauty:tough_ironlike_ingot"
    )
    event.replaceInput( 
        { input: "lowlands_clothing:herbs_fiber" },
        "lowlands_clothing:herbs_fiber",
        "farmersdelight:straw"
    )
    event.replaceInput(
        { input: "lowlands_clothing:furpelt" },
        "lowlands_clothing:furpelt",
        '#bloodandbeauty:furs'
    )
    event.shaped(
        Item.of( 'meds_and_herbs:dressing_cheap', 1 ),
        [
            'AB',
            'B '
        ],
        {
            A: 'minecraft:string',
            B: "lowlands_clothing:cloth_fabric"
        }
    )
})

ItemEvents.rightClicked( 'lowlands_clothing:needle_and_string', event => {
    const { player, hand } = event

    if ( player.hasEffect( 'meds_and_herbs:laceration' ) ) {
        player.removeEffect( 'meds_and_herbs:laceration' )
        useSewingItem( event )
    }

    var hitResult = player.rayTrace( player.entityReach, false )
    if ( !hitResult.type.toString().equals( "ENTITY" ) ) {
        return
    }

    var entity = hitResult.entity
    if ( entity.hasEffect( 'meds_and_herbs:laceration' ) ) {
        entity.removeEffect( 'meds_and_herbs:laceration' )
        useSewingItem( event )
    }
})

ServerEvents.tags( 'item', event => {
    // Furs
    event.add( 'bloodandbeauty:furs', 'alexsmobs:bear_fur' )
    event.add( 'bloodandbeauty:furs', 'alexsmobs:bison_fur' )
})

LootJS.modifiers( event => {
    // Lowlands Compat
    event.addLootTableModifier( "alexsmobs:entities/grizzly_bear" )
        .addLoot( Item.of( 'lowlands_clothing:rawgrizzlymeat', 2 ) )
        .randomChance( 0.5 )
        .addLoot( Item.of( 'lowlands_clothing:rawgrizzlymeat', 1 ) )
})

// Knife Loot Adders
{
    BlockEvents.broken( 'projectvibrantjourneys:short_grass', event => {
        giveKnifeLoot( event, 'lowlands_clothing:quality_plant_fibers', 0.01 )
    })
    BlockEvents.broken( 'minecraft:grass', event => {
        giveKnifeLoot( event, 'lowlands_clothing:quality_plant_fibers', 0.02 )
    })
    BlockEvents.broken( 'minecraft:short_dry_grass', event => {
        giveKnifeLoot( event, 'lowlands_clothing:quality_plant_fibers', 0.02 )
    })
    BlockEvents.broken( 'minecraft:tall_grass', event => {
        giveKnifeLoot( event, 'lowlands_clothing:quality_plant_fibers', 0.05 )
    })
    BlockEvents.broken( 'minecraft:tall_dry_grass', event => {
        giveKnifeLoot( event, 'lowlands_clothing:quality_plant_fibers', 0.05 )
    })

    BlockEvents.broken( 'minecraft:kelp', event => {
        if ( giveKnifeLoot( event, 'lowlands_clothing:slimy_fibers', 0.02 ) ) {
            event.level.destroyBlock( event.block.pos, false )
        }
    })
    BlockEvents.broken( 'minecraft:kelp_plant', event => {
        if ( giveKnifeLoot( event, 'lowlands_clothing:slimy_fibers', 0.02 ) ) {
            event.level.destroyBlock( event.block.pos, false )
        }
    })
    BlockEvents.broken( 'minecraft:lily_pad', event => {
        if ( giveKnifeLoot( event, 'lowlands_clothing:slimy_fibers', 0.05 ) ) {
            event.level.destroyBlock( event.block.pos, false )
        }
    })
}


// Helper Functions
/**
 * @param { Internal.BlockBrokenEventJS_ } event 
 * @param { String } item 
 * @param { number } chance 
 * @return { boolean }
 */
function giveKnifeLoot( event, item, chance ) {
    const { player, block } = event

    if ( !player.mainHandItem.hasTag( 'forge:tools/knives' ) || Utils.random.nextDouble() > chance ) {
        return false
    }

    block.popItem( Item.of( item, 1 ) )
}

/**
 * @param { Internal.ItemClickedEventJS_ } event 
 */
function useSewingItem( event ) {
    const { player, hand } = event

    player.swing( hand, true )
    global.playsoundOnEntity( player, 'bloodandbeauty:entity.sew' )
    if ( player.creative ) {
        event.cancel()
    }

    var isMainHand = hand.toString().equals( "MAIN_HAND" )
    if ( global.damage( isMainHand ? player.mainHandItem : player.offHandItem, 1, () =>
        { isMainHand ? player.setMainHandItem( Item.of( 'air' ) ) : player.setOffHandItem( Item.of( 'air' ) ) }
    ) ) {
        global.playsoundOnEntity( player, 'minecraft:item.flintandsteel.use', 'player', 1, 2 )
    }

    event.cancel()
}