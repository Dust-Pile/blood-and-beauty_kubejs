// priority: 0

// const materials = global.weaponry.materials

ServerEvents.recipes( event => {
    { //Remove washing and blasting ores / etc
        event.remove({ type: 'create:splashing', input: /.*crushed_.*_pile/ })
        event.remove({ type: 'create:splashing', input: /.*crushed_raw.*/ })
        event.remove({ type: 'minecraft:blasting', input: /.*raw.*block/ })
        event.remove({ type: 'minecraft:smelting', input: /.*raw.*block/ })
            //Netherite
        event.remove({ type: 'minecraft:crafting_shapeless', output: 'minecraft:netherite_ingot' })
        event.remove({ type: 'minecraft:smelting', output: 'minecraft:netherite_scrap' })
        event.remove({ type: 'minecraft:smelting', output: 'minecraft:netherite_ingot' })
        event.remove({ type: 'minecraft:blasting', output: 'minecraft:netherite_ingot' })
        event.remove({ output: 'minecraft:netherite_upgrade_smithing_template' })
        event.shaped(
            Item.of( 'minecraft:netherite_upgrade_smithing_template', 1 ),
            [
                'ABA',
                'ACA',
                'DAD'
            ],
            {
                A: 'minecraft:diamond',
                B: 'minecraft:netherite_upgrade_smithing_template',
                C: 'minecraft:netherrack',
                D: 'cgs:sulfur'
            }
        )
        event.shaped(
            Item.of( 'minecraft:netherite_upgrade_smithing_template', 1 ),
            [
                'ABA',
                'ACA',
                'DAD'
            ],
            {
                A: 'createaddition:electrum_ingot',
                B: 'minecraft:netherite_upgrade_smithing_template',
                C: 'minecraft:netherrack',
                D: 'cgs:sulfur'
            }
        )
        event.recipes.create.crushing(
            [
                'minecraft:netherite_scrap',
                Item.of( 'minecraft:netherite_scrap', 1 ).withChance( 0.2 )
            ],
            Item.of( 'minecraft:ancient_debris' ),
            600
        )
            //Iron
        event.remove({ type: 'minecraft:smelting', output: 'minecraft:iron_ingot' })
        event.remove({ type: 'minecraft:smelting', output: 'minecraft:iron_nugget' })
        event.remove({ type: 'create:compacting', output: 'createdeco:industrial_iron_ingot' })
        event.remove({ type: 'minecraft:stonecutting', output: 'create:industrial_iron_block' })
        event.remove({ type: 'minecraft:stonecutting', output: 'create:weathered_iron_block' })
        event.replaceOutput(
            { type: 'minecraft:blasting', output: 'minecraft:iron_ingot' },
            'minecraft:iron_ingot',
            'createdeco:industrial_iron_ingot'
        )
        event.replaceOutput(
            { type: 'minecraft:blasting', output: 'minecraft:iron_nugget' },
            'minecraft:iron_nugget',
            'createdeco:industrial_iron_nugget'
        )
            //Silver
        event.remove({ type: 'minecraft:smelting', output: 'simplesilver:silver_ingot'})
        event.remove({ type: 'minecraft:blasting', output: 'simplesilver:silver_ingot'})
    }
    
    // Replace / add melting recipes
    global.forEachIn( materials, ( material, name ) => {
        if ( !material.redoMelting ) {
            return
        }

        event.remove({ id: new RegExp( "^createmetallurgy:melting/.*" + name + ".*" ) })
        global.forEachIn( metalMeltingMap, ( outputs, itemType ) => {
            if ( material.craftItems[ itemType ] == null ) {
                return
            }

            const heatRequirement = ( material.heatRequirement.equals( 'furnace' ) || material.heatRequirement.equals( 'blast' ) )
                ? 'lowheated' : material.heatRequirement 

            if ( outputs.slag != null && outputs.slag != 0 ) {
                event.recipes.createmetallurgy.melting(
                    [
                        Fluid.of( material.fluid, outputs.metal ),
                        Fluid.of( 'createmetallurgy:molten_slag', outputs.slag )
                    ],
                    Item.of( material.craftItems[ itemType ], 1 )
                ).heatRequirement( heatRequirement )
            } else {
                event.recipes.createmetallurgy.melting( 
                    Fluid.of( material.fluid, outputs.metal ),
                    Item.of( material.craftItems[ itemType ], 1 )
                ).heatRequirement( heatRequirement )
            }
        })
    })

    // Add basic casting
    { // Silver
        event.recipes.createmetallurgy.casting_in_table(
            Item.of( materials.silver.craftItems.ingot ),
            [
                Fluid.of( materials.silver.fluid, 90 ),
                Item.of( 'createmetallurgy:graphite_ingot_mold' )
            ],
            60
        )
        event.recipes.createmetallurgy.casting_in_table(
            Item.of( materials.silver.craftItems.nugget ),
            [
                Fluid.of( materials.silver.fluid, 10 ),
                Item.of( 'createmetallurgy:graphite_nugget_mold' )
            ],
            6
        )
        event.recipes.createmetallurgy.casting_in_table(
            Item.of( materials.silver.craftItems.sheet ),
            [
                Fluid.of( materials.silver.fluid, 90 ),
                Item.of( 'createmetallurgy:graphite_plate_mold' )
            ],
            60
        )
        event.recipes.createmetallurgy.casting_in_basin(
            Item.of( materials.silver.craftItems.block ),
            [
                Fluid.of( materials.silver.fluid, 810 )
            ],
            480
        )
        event.recipes.create.pressing(
            Item.of( materials.silver.craftItems.sheet, 1 ),
            Item.of( materials.silver.craftItems.ingot, 1 )
        )
        event.recipes.create.crushing(
            [ 'cm_extended:crushed_raw_silver', Item.of( 'create:experience_nugget', 2 ).withChance( 0.75 ) ],
            Item.of( "simplesilver:raw_silver" )
        )
        event.recipes.create.crushing(
            [ 
                'cm_extended:crushed_raw_silver', 
                Item.of('cm_extended:crushed_raw_silver').withChance( 0.75 ), 
                Item.of( 'create:experience_nugget', 2 ).withChance( 0.75 ),
                'minecraft:cobblestone'
            ],
            Item.of( 'simplesilver:silver_ore' )
        )
        event.recipes.create.crushing(
            [ 
                Item.of( 'cm_extended:crushed_raw_silver', 2 ), 
                Item.of('cm_extended:crushed_raw_silver').withChance( 0.75 ), 
                Item.of( 'create:experience_nugget', 2 ).withChance( 0.75 ),
                'minecraft:cobbled_deepslate'
            ],
            Item.of( 'simplesilver:deepslate_silver_ore' )
        )
        event.recipes.create.crushing(
            [ 
                Item.of( 'simplesilver:silver_nugget', 18 ),
                Item.of( 'create:experience_nugget', 2 ).withChance( 0.75 ),
                'minecraft:netherrack'
            ],
            Item.of( 'simplesilver:deepslate_silver_ore' )
        )
        event.recipes.create.crushing(
            [ 'cm_extended:dirty_silver_dust', Item.of( 'cm_extended:dirty_silver_dust' ).withChance( 0.25 ) ],
            'cm_extended:crushed_raw_silver'
        )
        event.recipes.create.splashing(
            [ 'cm_extended:silver_dust', Item.of( 'hexerei:selenite_shard' ).withChance( 0.15 ) ],
            'cm_extended:dirty_silver_dust'
        )
    }
    { // Lead
        event.recipes.createmetallurgy.casting_in_table(
            Item.of( materials.lead.craftItems.sheet ),
            [
                Fluid.of( materials.lead.fluid, 90 ),
                Item.of( 'createmetallurgy:graphite_plate_mold' )
            ],
            60
        )
        event.recipes.create.pressing(
            Item.of( materials.lead.craftItems.sheet, 1 ),
            Item.of( materials.lead.craftItems.ingot, 1 )
        )
        event.recipes.create.crushing(
            [ 'cm_extended:dirty_lead_dust', Item.of( 'cm_extended:dirty_lead_dust' ).withChance( 0.25 ) ],
            'create:crushed_raw_lead'
        )
        event.recipes.create.splashing(
            [ 'cm_extended:lead_dust', Item.of( 'simplesilver:silver_nugget' ).withChance( 0.5 ) ],
            'cm_extended:dirty_lead_dust'
        )
    }
        // Steel
    event.recipes.create.pressing(
        Item.of( materials.steel.craftItems.sheet, 1 ),
        Item.of( materials.steel.craftItems.ingot, 1 )
    )
    event.recipes.createmetallurgy.casting_in_table(
        Item.of( materials.steel.craftItems.nugget ),
        [
            Fluid.of( materials.steel.fluid, 10 ),
            Item.of( 'createmetallurgy:graphite_nugget_mold' )
        ],
        6
    )
    event.recipes.createmetallurgy.casting_in_table(
        Item.of( materials.steel.craftItems.sheet ),
        [
            Fluid.of( materials.steel.fluid, 90 ),
            Item.of( 'createmetallurgy:graphite_plate_mold' )
        ],
        60
    )
    event.shapeless(
        Item.of( 'cm_extended:steel_nugget', 9 ),
        ['createmetallurgy:steel_ingot']
    )
    event.shapeless(
        'createmetallurgy:steel_ingot',
        ['9x cm_extended:steel_nugget']
    )

    // Replace / add alloying recipes
        // Brass
    event.remove({ type: 'create:mixing', output: 'create:brass_ingot' })
    event.remove({ id: "createmetallurgy:alloying/brass" })
    event.recipes.createmetallurgy.melting(
        Fluid.of( materials.brass.fluid, 20 ),
        [
            Fluid.of( materials.zinc.fluid, 10 ),
            Fluid.of( materials.copper.fluid, 10 )
        ]
    ).heatRequirement( materials.brass.heatRequirement )
        // Netherite
    event.remove({ id: /^createmetallurgy:alloying.*netherite.*/ })
    event.remove({ id: /^createmetallurgy:melting.*netherite.*/ })
    event.recipes.createmetallurgy.alloying(
        Fluid.of( materials.netherite.fluid, 90 ),
        [
            Item.of( 'minecraft:netherite_scrap' ),
            Item.of( 'minecraft:netherite_scrap' ),
            Item.of( 'minecraft:netherite_scrap' ),
            Item.of( 'minecraft:netherite_scrap' ),
            Item.of( 'minecraft:netherite_upgrade_smithing_template' ),
            Fluid.of( materials.gold.fluid, 360 )
        ],
        100 * materials.netherite.processingTimeMult
    ).heatRequirement( materials.netherite.heatRequirement )
    event.recipes.createmetallurgy.melting(
        Fluid.of( materials.netherite.fluid, 90 ),
        [
            Item.of( 'minecraft:netherite_ingot' ),
            Item.of( 'minecraft:netherite_upgrade_smithing_template' ),
        ],
        100 * materials.netherite.processingTimeMult
    ).heatRequirement( materials.netherite.heatRequirement )

    { // Iron Ingredient replacement
        event.replaceInput(
            { output: '#bloodandbeauty:weak_ironlike_item' },
            "minecraft:iron_ingot",
            '#bloodandbeauty:weak_ironlike_ingot'
        )
        event.replaceInput(
            { output: '#bloodandbeauty:weak_ironlike_item' },
            "minecraft:iron_nugget",
            '#bloodandbeauty:weak_ironlike_nugget'
        )
        event.replaceInput(
            { output: '#bloodandbeauty:weak_ironlike_item' },
            "create:iron_sheet",
            '#bloodandbeauty:weak_ironlike_sheet'
        )
        event.replaceInput(
            { output: '#bloodandbeauty:weak_ironlike_item' },
            "minecraft:iron_block",
            '#bloodandbeauty:weak_ironlike_block'
        )
        event.replaceInput(
            { output: '#bloodandbeauty:tough_ironlike_item' },
            "minecraft:iron_ingot",
            '#bloodandbeauty:tough_ironlike_ingot'
        )
        event.replaceInput(
            { output: '#bloodandbeauty:tough_ironlike_item' },
            "minecraft:iron_nugget",
            '#bloodandbeauty:tough_ironlike_nugget'
        )
        event.replaceInput(
            { output: '#bloodandbeauty:tough_ironlike_item' },
            "create:iron_sheet",
            '#bloodandbeauty:tough_ironlike_sheet'
        )
        event.replaceInput(
            { output: '#bloodandbeauty:tough_ironlike_item' },
            "minecraft:iron_block",
            '#bloodandbeauty:tough_ironlike_block'
        )

        for ( var outputFilter of hasBars ) {
            event.replaceInput(
                { output: outputFilter },
                "minecraft:iron_trapdoor",
                '#bloodandbeauty:ironlike_bars'
            )
        }
        for ( var outputFilter of hasTrapdoor ) {
            event.replaceInput(
                { output: outputFilter },
                "minecraft:iron_trapdoor",
                '#bloodandbeauty:ironlike_trapdoor'
            )
        }

        // Other Iron Ingredient Replacement
        event.replaceInput(
            { output: 'create:mechanical_drill' },
            'minecraft:iron_ingot',
            'createmetallurgy:steel_ingot'
        )
        event.replaceInput(
            { output: 'quark:crafter' },
            'minecraft:iron_ingot',
            'create:andesite_alloy'
        )

        // for ( var outputFilter of weakIronlikeItems ) {
        //     event.replaceInput(
        //         { output: outputFilter },
        //         "minecraft:iron_ingot",
        //         '#bloodandbeauty:weak_ironlike_ingot'
        //     )
        //     event.replaceInput(
        //         { output: outputFilter },
        //         "minecraft:iron_nugget",
        //         '#bloodandbeauty:weak_ironlike_nugget'
        //     )
        //     event.replaceInput(
        //         { output: outputFilter },
        //         "create:iron_sheet",
        //         '#bloodandbeauty:weak_ironlike_sheet'
        //     )
        //     event.replaceInput(
        //         { output: outputFilter },
        //         "minecraft:iron_block",
        //         '#bloodandbeauty:weak_ironlike_block'
        //     )
        // }
        // for ( var outputFilter of toughIronlikeItems ) {
        //     event.replaceInput(
        //         { output: outputFilter },
        //         "minecraft:iron_ingot",
        //         '#bloodandbeauty:tough_ironlike_ingot'
        //     )
        //     event.replaceInput(
        //         { output: outputFilter },
        //         "minecraft:iron_nugget",
        //         '#bloodandbeauty:tough_ironlike_nugget'
        //     )
        //     event.replaceInput(
        //         { output: outputFilter },
        //         "create:iron_sheet",
        //         '#bloodandbeauty:tough_ironlike_sheet'
        //     )
        //     event.replaceInput(
        //         { output: outputFilter },
        //         "minecraft:iron_block",
        //         '#bloodandbeauty:tough_ironlike_block'
        //     )
        // }
    }
})

// Data
var metalMeltingMap = {
    ingot: {
        metal: 90
    },
    raw: {
        metal: 90,
        slag: 45
    },
    crushed: {
        metal: 90,
        slag: 45
    },
    dirty: {
        metal: 90,
        slag: 30
    },
    dust: {
        metal: 90
    },
    sheet: {
        metal: 90
    },
    nugget: {
        metal: 10
    }
}

var weakIronlikeItems = [
    /.*blast_furnace/,
    /^createmetallurgy:.*light_bulb$/,
    "bits_n_bobs:small_flanged_cogwheel","create:super_glue","create:filter","cgs:nail","create_things_and_misc:glue_packaging",
    "sawmill:sawmill","irons_spellbooks:wayward_compass","minecraft:compass","minecraft:chain",
    "festive_delight:gingerbread_man_cutter","festive_delight:sword_cutter","festive_delight:flake_cutter",
    "aquaculture:fishing_line","betterarcheology:iron_brush","minecraft:tripwire_hook","betterarcheology:bomb",
    "dustydecorations:holiday_ornaments","dustydecorations:giant_chains","festive_delight:creeper_cutter",
    "vintagedelight:cheese_mold","aquaculture:iron_hook","aquaculture:heavy_hook","alcocraftplus:keg","luckyclover:empty_can",
    "meadow:can","vital_herbs:watering_can","minecraft:cauldron","bits_n_bobs:large_flanged_cogwheel","minecraft:bucket",
    "hexerei:witch_hazel_courier_depot","hexerei:willow_courier_depot","dustydecorations:rusty_corrugated_metal_block",
    "meadow:wooden_cauldron","create:metal_bracket","create:chute","minecraft:piston","ancientcurses:sconced_redstone_torch",
    "minecraft:lantern","minecraft:soul_lantern","farmers_delight_christmas_editon:circle_cookie_cutter",
    "farmers_delight_christmas_editon:tree_cookie_cutter","farmers_delight_christmas_editon:man_cutter",
    "farmers_delight_christmas_editon:star_cookie_cutter","dustydecorations:corrugated_metal","dustydecorations:anchor",
    "dustydecorations:fishing_lures","jemscampfires:fire_poker","irons_spellbooks:brazier_soul","irons_spellbooks:brazier",
    "supplementaries:sconce_soul","supplementaries:sconce","meadow:oil_lantern","supplementaries:bubble_blower",
    "hexalia:rustic_oven","handcrafted:hammer","quark:abacus","minecraft:flint_and_steel","ancientcurses:sconced_torch",
    "ancientcurses:sconced_soul_torch","meadow:stove_tiles_bench","meadow:stove_tiles","meadow:stove_tiles_lid",
    "meadow:stove_tiles_wood"
]
var toughIronlikeItems = [
    /^railways:.*smokestack.*/,
    /^supplementaries:candle_holder.*/,
    /.*shelf.*/,
    /^table_top_craft:.*chess_timer$/,
    /^sophisticatedbackpacks/,
    /^sophisticatedstorage/,
    /^davespotioneering:.*umbrella$/,
    /^dawnoftimebuilder/,
    "handcrafted:bench","dustydecorations:giant_anchor","crittersandcompanions:grappling_hook",
    "irons_spellbooks:alchemist_cauldron","hexerei:mixing_cauldron","minecraft:hopper_minecart","minecraft:minecart",
    "railways:paint_brush","create:metal_girder","supplementaries:cannon","minecraft:stonecutter","create:mechanical_harvester",
    "create:mechanical_plough","create:packager","create:redstone_requester","createaddition:rolling_mill",
    "bellsandwhistles:headlight","railways:link_and_pin","railways:big_buffer","railways:small_buffer","railways:semaphore",
    "create:item_vault","create:mechanical_saw","framedblocks:framing_saw","create:rope_pulley","create:fluid_valve",
    "bellsandwhistles:metal_pilot","railways:track_coupler","create_connected:item_silo","create:propeller",
    "create:redstone_contact","create:whisk","create:mechanical_press","framedblocks:powered_framing_saw",
    "create:minecart_coupling","minecraft:hopper","minecraft:furnace_minecart","minecraft:chest_minecart",
    "framedblocks:framed_fancy_activator_rail","framedblocks:framed_fancy_rail","framedblocks:framed_fancy_detector_rail",
    "minecraft:detector_rail","minecraft:rail","minecraft:activator_rail","vital_herbs:oil_extractor","vital_herbs:teapot",
    "railways:smokestack_diesel","hexerei:witch_hazel_woodcutter","dustydecorations:wedged_knife",
    "dustydecorations:wedged_cleaver","farmersdelight:stove","farmersdelight:cooking_pot","farmersdelight:skillet",
    "hexerei:mahogany_woodcutter","hexerei:willow_woodcutter","alexsmobs:echolocator","chimes:amethyst_chimes",
    "chimes:iron_chimes","minecraft:shield","toolbelt:belt","hexerei:witch_hazel_broom_stand","hexerei:willow_broom_stand",
    "vc_gliders:reinforced_paper_iron","nethervinery:warped_apple_press","nethervinery:crimson_apple_press",
    "vital_herbs:herb_bath","smallships:cannon","supplementaries:cannonball","smallships:cannon_ball","aquaculture:tackle_box",
    "aquaculture:iron_fishing_rod","nethervinery:crimson_fermentation_barrel","nethervinery:warped_fermentation_barrel",
    "shieldexp:iron_shield","meds_and_herbs:sewing_kit","minecraft:shears","trotting_wagons:wheel",
    "trotting_wagons:armored_wagon","minecraft:smithing_table","minecraft:saddle","minecraft:anvil",
    "quark:trowel","irons_spellbooks:graybeard_staff","createaddition:spool","meds_and_herbs:syringe_empty",
    "nethervinery:crimson_grapevine_pot","nethervinery:warped_grapevine_pot","create_connected:freewheel_clutch",
    "lowlands_clothing:needle_and_string"
]
var hasBars = [
    /^table_top_craft:.*connect_four$/,
    "create:item_drain",
    "hexerei:stone_window",
    "dawnoftimebuilder:wrought_iron_fence",
    "sliceanddice:sprinkler",
    "handcrafted:kitchen_hood",
    "handcrafted:kitchen_hood_pipe",
    "handcrafted:oven",
    "handcrafted:bench",
    "dustydecorations:giant_anchor",
    'teslacabinet:alembic_copper'
]
var hasTrapdoor = [
    "vinery:apple_press",
    "create:item_hatch",
    "meadow:stove_tiles_lid"
]

ServerEvents.tags( 'item', event => {
    // Ironlike items
    for ( var outputFilter of weakIronlikeItems ) {
        event.add( 'bloodandbeauty:weak_ironlike_item', outputFilter )
    }
    for ( var outputFilter of toughIronlikeItems ) {
        event.add( 'bloodandbeauty:tough_ironlike_item', outputFilter )
    }

    // Table top craft
    event.add( 'table_top_craft:connect_four_nuggets', 'createdeco:industrial_iron_nugget' )

    // Other Groups
    event.add('bloodandbeauty:ironlike_bars', 
        'minecraft:iron_bars', 'createdeco:industrial_iron_bars'
    )
    event.add('bloodandbeauty:ironlike_trapdoor',
        'minecraft:iron_trapdoor', 'createdeco:industrial_iron_trapdoor'
    )

    // Early Game Metal
    //'#bloodandbeauty:weak_ironlike_ingot'
    //'#bloodandbeauty:weak_ironlike_nugget'
    //'#bloodandbeauty:weak_ironlike_sheet'
    //'#bloodandbeauty:weak_ironlike_block'
    event.add('bloodandbeauty:weak_ironlike_ingot', 
        'create:zinc_ingot', 
        'cgs:lead_ingot', 
        'createdeco:industrial_iron_ingot'
    )
    event.add('bloodandbeauty:weak_ironlike_nugget', 
        'create:zinc_nugget', 
        'cgs:lead_nugget', 
        'createdeco:industrial_iron_nugget'
    )
    event.add('bloodandbeauty:weak_ironlike_sheet', 
        'createaddition:zinc_sheet', 
        'cm_extended:lead_sheet', 
        'createdeco:industrial_iron_sheet'
    )
    event.add('bloodandbeauty:weak_ironlike_block', 
        'create:zinc_block', 
        'cgs:lead_block', 
        'create:industrial_iron_block'
    )

    // Mid Game Metal
    //'#bloodandbeauty:tough_ironlike_ingot'
    //'#bloodandbeauty:tough_ironlike_nugget'
    //'#bloodandbeauty:tough_ironlike_sheet'
    //'#bloodandbeauty:tough_ironlike_block'
    event.add('bloodandbeauty:tough_ironlike_ingot', 
        'createdeco:industrial_iron_ingot', 
        'minecraft:iron_ingot'
    )
    event.add('bloodandbeauty:tough_ironlike_nugget', 
        'createdeco:industrial_iron_nugget', 
        'minecraft:iron_nugget'
    )
    event.add('bloodandbeauty:tough_ironlike_sheet', 
        'createdeco:industrial_iron_sheet', 
        'create:iron_sheet'
    )
    event.add('bloodandbeauty:tough_ironlike_block', 
        'create:industrial_iron_block', 
        'minecraft:iron_block'
    )
})