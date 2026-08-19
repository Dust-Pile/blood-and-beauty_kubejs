ServerEvents.recipes(event => {

    // Copper Nugget
    event.replaceInput(
        { item: "minecraft:copper_nugget" },
        "minecraft:copper_nugget",
        "create:copper_nugget"
    )

    // Zinc Sheet
    event.replaceInput( 
        { input: "createdeco:zinc_sheet" },
        "createdeco:zinc_sheet",
        "createaddition:zinc_sheet"
    )

    event.remove({ input: "createdeco:white_shipping_container" })

    //Remove redundant seed oil
    event.remove({ output: Fluid.of("gourmet:seed_oil") })

    //Remove redundant fried egg
    event.replaceInput(
        { input: 'gourmet:fried_egg' },
        'gourmet:fried_egg',
        '#forge:cooked_eggs'
    )
    event.replaceInput(
        { input: 'luckyclover:fried_egg' },
        'luckyclover:fried_egg',
        '#forge:cooked_eggs'
    )
    event.replaceInput(
        { input: 'incubation:fried_egg' },
        'incubation:fried_egg',
        '#forge:cooked_eggs'
    )
    event.remove({ output: 'incubation:fried_egg' })
    event.remove({ output: 'gourmet:fried_egg' })

    //Hexalia replace salt recipes
    event.replaceOutput(
        { output: 'hexalia:salt' },
        'hexalia:salt',
        'vintagedelight:salt_dust'
    )
    event.replaceInput(
        { input: 'hexalia:salt' },
        'hexalia:salt',
        'vintagedelight:salt_dust'
    )

    //Tenticle Compats
    event.replaceInput(
        { input: "oceansdelight:tentacles" },
        "oceansdelight:tentacles",
        "crabbersdelight:raw_squid_tentacles"
    )

    //Animal Fat Adjustments
    event.replaceInput(
        { input: 'delightful:animal_fat' },
        'delightful:animal_fat',
        'hexerei:animal_fat'
    )
    
})

LootJS.modifiers(event => {

    // Tenticle Compat
    event.addEntityLootModifier('minecraft:squid').removeLoot('oceansdelight:tentacles')

    // Animal fat adjustments
    event.addLootTableModifier(/.*/).removeLoot('hexerei:animal_fat').replaceLoot('delightful:animal_fat', 'hexerei:animal_fat', true)

    // Hexalia Salt
    event.addLootTableModifier(/.*/).replaceLoot('hexalia:salt_block', 'vintagedelight:salt_block', true)
        .replaceLoot('hexalia:salt', 'vintagedelight:salt_dust', true)

    for (var item of lootBlacklist) {
        event.addLootTableModifier(/.*/).removeLoot(item)
    }

    // Remove armor of the ages loot from non-ancient structure loot tables
    event.addLootTableModifier(/^((?!ancientstructures).)*$/).removeLoot(/^armoroftheages:.*/)
    
})

// table_top_craft:chess_piece_figure

let lootBlacklist = [
    'artifacts:pickaxe_heater',
    // Lowlands
    "lowlands_clothing:herbs_fiber",
    "lowlands_clothing:herbs_whip",
    "lowlands_clothing:furpelt",
    //unique accessories
    "uniqueaccessories:sun_stone",
    "uniqueaccessories:moon_stone",
    "uniqueaccessories:shiny_stone",
    //effortless building
    /^effortlessbuilding:.*/,
    //chess pieces
    /^table_top_craft:.*/,
    //tallow
    "immersive_weathering:tallow",
]