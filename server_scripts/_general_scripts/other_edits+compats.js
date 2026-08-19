ServerEvents.recipes( event => {

    // Flour and Bread
    event.remove( { id: "vintagedelight:cutting/oat_cutting" } )
    event.remove( { input: "minecraft:wheat", output: 'farmersdelight:wheat_dough' } )
    event.remove( { id: "farmersdelight:wheat_dough_from_water" } )
    event.replaceInput( 
        { input: 'create:dough' },
        'create:dough',
        '#forge:dough'
    )
    event.remove( { id: "festive_delight:ginger_bread_dough_craft" } )
    event.shapeless(
        Item.of( "festive_delight:gingerbread_dough", 1 ),
        [
            'snowyspirit:ginger',
            'festive_delight:cinnamon_powder',
            'create:wheat_flour',
            '#forge:eggs',
            'minecraft:honey_bottle'
        ]
    )
    event.recipes.create.mixing(
        Item.of( "festive_delight:gingerbread_dough", 2 ),
        [
            'snowyspirit:ginger',
            'festive_delight:cinnamon_powder',
            'create:wheat_flour',
            '#forge:eggs',
            Fluid.of( "create:honey", 250 )
        ]
    )
    event.replaceInput(
        { input: "create_confectionery:gingerdough" },
        'create_confectionery:gingerdough',
        "festive_delight:gingerbread_dough"
    )
    event.replaceInput(
        { input: 'farmers_delight_christmas_editon:raw_gingerbread_dough' },
        'farmers_delight_christmas_editon:raw_gingerbread_dough',
        "festive_delight:gingerbread_dough"
    )

    // Dusty Decorations leather from cutting board
    event.remove( { type: "minecraft:crafting_shapeless", input: /^dustydecorations:.*_hide.*/ } )
    event.recipes.farmersdelight.cutting( 
        'dustydecorations:cow_hide_rug',
        '#forge:tools/knives',
        [
            Item.of( 'minecraft:leather', 2 ),
            Item.of( 'minecraft:leather' ).withChance( 0.5 )
        ]
    )
    event.recipes.farmersdelight.cutting( 
        'dustydecorations:mooshroom_hide',
        '#forge:tools/knives',
        [
            Item.of( 'minecraft:leather', 2 ),
            Item.of( 'minecraft:leather' ).withChance( 0.5 )
        ]
    )

    // Charred Log
    event.remove( { type: "minecraft:blasting", output: "dawnoftimebuilder:charred_spruce_log_stripped" } )
    event.remove( { type: "minecraft:smelting", output: "dawnoftimebuilder:charred_spruce_log_stripped" } )

    // Fried Egg Compats
    event.smelting( 'luckyclover:fried_egg', 'minecraft:blue_egg' )
    event.smelting( 'luckyclover:fried_egg', 'minecraft:brown_egg' )
    event.smoking( 'luckyclover:fried_egg', 'minecraft:blue_egg' )
    event.smoking( 'luckyclover:fried_egg', 'minecraft:brown_egg' )
    event.campfireCooking( 'luckyclover:fried_egg', 'minecraft:blue_egg', 0.35, 600 )
    event.campfireCooking( 'luckyclover:fried_egg', 'minecraft:brown_egg', 0.35, 600 )

    // Allow smooth quartz recycle
    event.recipes.farmersdelight.cutting(
        'minecraft:smooth_quartz',
        '#forge:tools/pickaxes',
        [ 
            Item.of( 'minecraft:quartz', 4 )
        ],
        ''
    )

    //Arcane Chili recipe
    event.recipes.farmersdelight.cooking(
        [
            "dungeonsdelight:rotten_tripe",
            "dungeonsdelight:sculk_polyp",
            "dungeonsdelight:sculk_polyp",
            "dungeonsdelight:wardenzola_crumbles",
            "ironsspells:arcane_essence",
            "farmersrespite:blazing_chili"
        ],
        "dungeonsdelight:arcane_chili",
        2,
        600,
        'minecraft:bucket'
    )

    //Use Barley instead (doesn't work)
    event.replaceInput(
        { input: 'alcocraftplus:dry_seeds'},
        'alcocraftplus:dry_seeds',
        'biomesoplenty:barley'
    )

    //blackstone furnace compat
    event.replaceInput(
        { input: 'nethersdelight:blackstone_furnace' },
        'nethersdelight:blackstone_furnace',
        'quark:blackstone_furnace'
    )

    //remove cutting in crafting table
    event.remove( { type: "minecraft:crafting", input: "#forge:tools/knives" } )

    //Fixing 'netherite' recipies (use smithing table smh)
    //'sophisticatedbackpacks:stack_upgrade_tier_4' 
    event.remove({ output: 'sophisticatedbackpacks:stack_upgrade_tier_4' })
    event.smithing(
        'sophisticatedbackpacks:stack_upgrade_tier_4',   // arg 1: output
        'minecraft:netherite_upgrade_smithing_template', // arg 2: the smithing template
        'sophisticatedbackpacks:stack_upgrade_tier_3',   // arg 3: the item to be upgraded
        'minecraft:netherite_block'                      // arg 4: the upgrade item
    )
    //change nether upgrade
    event.shaped(
        Item.of('vc_gliders:nether_upgrade', 1),
        [
            'ABA',
            'C C'
        ],
        {
            A: 'minecraft:nether_brick',
            B: 'minecraft:obsidian',
            C: 'minecraft:nether_brick_fence'
        }
    )

    //Oat recipes
    event.recipes.farmersdelight.cutting(
        /^.*:sea_oats/,
        '#forge:tools/knives',
        [ 
            Item.of('vintagedelight:oat_seeds', 1)
        ],
        ''
	)

    //Rope Adjustments
    event.replaceInput(
        { input: 'farmersdelight:rope' },
        'farmersdelight:rope',
        '#forge:rope'
    )
    event.replaceInput(
        { input: 'supplementaries:rope' },
        'supplementaries:rope',
        '#forge:rope'
    )
    event.replaceInput(
        { input: 'quark:rope' },
        'quark:rope',
        '#forge:rope'
    )
    event.replaceInput(
        { input: 'dustydecorations:rope' },
        'dustydecorations:rope',
        '#forge:rope'
    )
    event.shapeless(
        "supplementaries:rope",
        [
            "#forge:rope"
        ]
    )

    //Remove Hexerei dry zombie flesh into leather
    event.remove({ id: 'hexerei:leather_from_drying_rack' })

    //Trotting Wagons Recipes allow more wood
    event.replaceInput(
        { mod: 'trotting_wagons' },
        'minecraft:spruce_planks',
        '#minecraft:planks'
    )
    event.replaceInput(
        { mod: 'trotting_wagons' },
        'minecraft:stripped_spruce_log',
        '#forge:stripped_logs'
    )

    //Incubation twig nest recipe
    event.shaped(
        'incubation:twig_nest',
        [
            'A A',
            'AAA'
        ],
        {
            A: 'farmersdelight:straw'
        }
    )

    //Cucumber compat
    event.remove({ output: "vintagedelight:cucumber_noodles" })
    event.replaceInput(
        { input: "culturaldelights:cucumber" },
        "culturaldelights:cucumber",
        "vintagedelight:cucumber"
    )
    event.remove({ output: "culturaldelights:cucumber_crate" })
    event.remove({ output: "culturaldelights:cucumber" })

})

ServerEvents.tags( 'item', event => {

    // Owl Food
    event.add('hexerei:owl_taming_food', '#forge:raw_fishes')
    event.add('hexerei:owl_breeding_food', '#forge:raw_fishes')

    // Rope Adjustments
    event.add('forge:rope', 'farmersdelight:rope')
    event.add('forge:rope', 'supplementaries:rope')
    event.add('forge:rope', 'quark:rope')
    event.add('forge:rope', 'dustydecorations:rope')

    // Delightful Compat
    event.add('forge:coconut', 'crabbersdelight:coconut_halve')
    event.add('minecraft:flowers/azalea', 'immersive_weathering:azalea_flowers')

})

ServerEvents.tags( 'block', event => {

    //Heat source compatability. Is buggy but whatever :sweat_smile:
    event.add('vital_herbs:heat', '#farmersdelight:heat_sources')

    //Replaceable Fix
    event.remove( 'minecraft:replaceable', 'biomesoplenty:high_grass', 'biomesoplenty:high_grass_plant' )

    // Ores Fixes
    event.add( "bloodandbeauty:aura_crystal_ores", 'vital_herbs:aura_crystal_ore', 'vital_herbs:deepslate_aura_crystal_ore' )
    event.add( "bloodandbeauty:silver_ores", 'simplesilver:silver_ore', 
        'simplesilver:deepslate_silver_ore', 'simplesilver:basalt_silver_ore' )
    event.add( "c:ores", "#bloodandbeauty:aura_crystal_ores", "#bloodandbeauty:silver_ores" )

})

ServerEvents.tags( 'entity_type', event => {

    //remove snow leopard attacking rideables (annoying)
    event.remove('alexsmobs:snow_leopard_targets', 'minecraft:horse')
    event.remove('alexsmobs:snow_leopard_targets', 'minecraft:donkey')
    event.remove('alexsmobs:snow_leopard_targets', 'minecraft:mule')

})

//Switch an item to a single silk touch required drop for a block in a Lootjs.modifier event
function silkify( event, block, item ) {
    event
        .addBlockLootModifier(block)
        .removeLoot(item)
        .randomChanceWithEnchantment("minecraft:silk_touch", [0, 1])
        .addLoot(item);
}

LootJS.modifiers( event => {

    // Adjust end wyrm loot TODO

    // Add coffee and embers to nether pots
    event.addBlockLootModifier("pots_and_mimics:nether_treasure_pot")
        .randomChance(0.15)
        .addAlternativesLoot(
            LootEntry.of("farmersrespite:coffee_beans").when((c) => c.randomChance(0.2)),
            LootEntry.of("farmersrespite:wild_coffee_bush").when((c) => c.randomChance(0.1))
        )

    //Change projectvibrantjourneys bark to silk touch only ("projectvibrantjourneys:bark_mushroom")
    silkify(event, "projectvibrantjourneys:bark_mushroom", "projectvibrantjourneys:bark_mushroom")
    silkify(event, "projectvibrantjourneys:orange_bark_mushroom", "projectvibrantjourneys:orange_bark_mushroom")
    silkify(event, "projectvibrantjourneys:light_brown_bark_mushroom", "projectvibrantjourneys:light_brown_bark_mushroom")
    silkify(event, "projectvibrantjourneys:glowing_blue_fungus", "projectvibrantjourneys:glowing_blue_fungus")

    // New Mob Spawner Loot
    event.addBlockLootModifier('minecraft:spawner')
        .removeLoot(/.*/)
        .addAlternativesLoot(
            LootEntry.of("sons_of_sins:bottle_of_blood").when((c) => c.randomChance(0.5)),
            LootEntry.of("sons_of_sins:soul_steel").when((c) => c.randomChance(0.3)),
            LootEntry.of("uniqueaccessories:accessory_box").when((c) => c.randomChance(0.1))
        )
        .addWeightedLoot(
            [2,5],
            [
                LootEntry.of("createdeco:brass_coin").withChance(50),
                LootEntry.of("createdeco:iron_coin").withChance(5)
            ]
        )
        .dropExperience(15)
        .addLoot(Item.of("dungeonsdelight:stained_scrap", 1))
        .randomChance(0.5)
        .addLoot(Item.of("dungeonsdelight:stained_scrap", 1))
        .randomChance(0.1)
        .addLoot('createdeco:gold_coin')

})
