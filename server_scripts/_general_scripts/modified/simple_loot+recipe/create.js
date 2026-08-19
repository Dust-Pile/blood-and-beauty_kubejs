ServerEvents.recipes( event => {

    { // Immersive Aircraft
        /*
            Creatify all immersive_aircraft recipies 
            dependancies: Create, Create Crafts & Additions
        */
        event.remove({ mod: 'immersive_aircraft' })

        //Engines
        //Basic Engine
        event.shaped(
            Item.of('immersive_aircraft:boiler', 1),
            [
            'ACA',
            'BDB',
            'AEF'
            ],
            {
            A: 'create:andesite_casing',
            B: 'create:fluid_pipe',  
            C: 'create:shaft',
            D: 'create:steam_engine',
            E: 'minecraft:blast_furnace',
            F: 'create:fluid_tank'
            }
        )
        //Advanced Engine
        event.shaped(
            Item.of('immersive_aircraft:engine', 1), 
            [
            ' C ',
            'BDE',
            'AFA'
            ],
            {
            A: 'create:brass_casing',
            B: 'create:precision_mechanism',  
            C: 'create:shaft',
            D: 'create:gearbox',
            E: 'create:nixie_tube',
            F: 'immersive_aircraft:boiler'
            }
        )
        //Water Engine
        event.shaped(
            Item.of('immersive_aircraft:eco_engine', 1), 
            [
            ' C ',
            'BAB', 
            'EFD'
            ],
            {
            A: 'createaddition:electric_motor',
            B: 'create:railway_casing',  
            C: 'create:shaft',
            D: 'create:gearbox',
            E: 'create:precision_mechanism',
            F: 'immersive_aircraft:engine'
            }
        )
        //Lava Engine
        event.shaped(
            Item.of('immersive_aircraft:nether_engine', 1), 
            [
            ' C ',
            'ADA', 
            'BEB'
            ],
            {
            A: 'minecraft:lava_bucket',
            B: 'create:railway_casing',  
            C: 'minecraft:netherite_ingot',
            D: 'immersive_aircraft:engine',
            E: 'create:blaze_burner'
            }
        )

        //Propellers
        //Large Propeller
        event.shaped(
            Item.of('immersive_aircraft:propeller', 1), 
            [
            ' A ',
            'ABA', 
            ' A '
            ],
            {
            A: '#bloodandbeauty:tough_ironlike_sheet',
            B: 'create:propeller'
            }
        )
        //Brass Propeller
        event.shaped(
            Item.of('immersive_aircraft:enhanced_propeller', 1), 
            [
            ' A ',
            'ABA', 
            ' A '
            ],
            {
            A: 'create:brass_sheet',
            B: 'immersive_aircraft:propeller'
            }
        )

        //Hulls
        //Hull
        event.shaped(
            Item.of('immersive_aircraft:hull', 1), 
            [
            'BBB',
            'AAA', 
            'BBB'
            ],
            {
            A: '#bloodandbeauty:tough_ironlike_sheet',
            B: 'create:andesite_casing'
            }
        )
        //Reinforced Hull
        event.shaped(
            Item.of('immersive_aircraft:hull_reinforcement', 1), 
            [
            'BBB',
            'AAA', 
            'BBB'
            ],
            {
            A: 'immersive_aircraft:hull',
            B: 'create:brass_casing'
            }
        )
        //Large Sail
        event.shaped(
            Item.of('immersive_aircraft:sail', 1), 
            [
            ' B ',
            'BAB', 
            ' B '
            ],
            {
            A: '#bloodandbeauty:aircraft_cable',
            B: 'create:white_sail'
            }
        )

        //Weapons
        //Bomb Bay
        event.shaped(
        Item.of('immersive_aircraft:bomb_bay', 1), 
        [
            'ABA',
            'BDC', 
            'B E'
        ],
        {
            A: 'create:andesite_casing',
            B: '#bloodandbeauty:tough_ironlike_sheet',
            C: 'create:precision_mechanism',
            D: 'minecraft:tnt',
            E: 'minecraft:flint_and_steel'
        }
        )
        //Heavy Crossbow
        event.shaped(
        Item.of('immersive_aircraft:heavy_crossbow', 1), 
        [
            ' A ',
            'ABC', 
            ' D '
        ],
        {
            A: '#bloodandbeauty:tough_ironlike_sheet',
            B: 'minecraft:crossbow',
            C: 'minecraft:tripwire_hook',
            D: '#minecraft:logs'
        }
        )
        //Rotary Cannon
        event.recipes.create.mechanical_crafting('immersive_aircraft:rotary_cannon', [
            'FE   ',
            'DCAAA',
            ' BAAA'
        ], {
            A: 'create:fluid_pipe',
            B: '#bloodandbeauty:tough_ironlike_block',
            C: 'create:precision_mechanism',
            D: 'minecraft:dispenser',
            E: 'create:gearbox',
            F: 'minecraft:flint_and_steel'
        }
        )

        //Other Upgrades
        //Improved Landing Gear
        event.shaped(
        Item.of('immersive_aircraft:improved_landing_gear', 1), 
        [
            'BCD',
            'BA ', 
            'AE '
        ],
        {
            A: 'create:cogwheel',
            B: 'create:shaft',
            C: 'create:precision_mechanism',
            D: 'create:large_cogwheel',
            E: 'create:belt_connector'
        }
        )
        //Sturdy Pipes
        event.shaped(
        Item.of('immersive_aircraft:sturdy_pipes', 1), 
        [
            ' BA',
            'AAA', 
            'AB '
        ],
        {
            A: 'create:fluid_pipe',
            B: 'create:sturdy_sheet'
        }
        )
        //Industrial Gears
        event.shaped(
        Item.of('immersive_aircraft:industrial_gears', 1), 
        [
            'ABA',
            'CDC', 
            'ABA'
        ],
        {
            A: 'create:sturdy_sheet',
            B: 'create:gearbox',
            C: 'create:cogwheel',
            D: 'create:brass_casing'
        }
        )
        //Steel Boiler
        event.shaped(
        Item.of('immersive_aircraft:steel_boiler', 1), 
        [
            'AAA',
            'BDB', 
            'CEC'
        ],
        {
            A: '#bloodandbeauty:tough_ironlike_sheet',
            B: 'create:fluid_pipe',
            C: 'create:fluid_tank',
            D: 'immersive_aircraft:boiler',
            E: 'minecraft:blast_furnace'
        }
        )
        //Gyroscope
        event.shaped(
        Item.of('immersive_aircraft:gyroscope', 1), 
        [
            ' CD',
            'ABE', 
            'AB '
        ],
        {
            A: 'minecraft:compass',
            B: 'minecraft:comparator',
            C: 'create:nixie_tube',
            D: 'create:propeller',
            E: 'create:pulse_repeater'
        }
        )
        //Advanced Gyroscope
        event.shaped(
        Item.of('immersive_aircraft:gyroscope_dials'),
        [
            'AB',
            'C '
        ],
        {
            A: 'create:cogwheel',
            B: 'create:display_board',
            C: 'immersive_aircraft:gyroscope'
        }
        )
        //Telescope
        event.shaped(
        Item.of('immersive_aircraft:telescope', 1), 
        [
            'A',
            'B', 
            'C'
        ],
        {
            A: 'minecraft:spyglass',
            B: 'create:gearbox',
            C: 'create:copper_sheet'
        }
        )

        //Crafts
        //Balloon
        event.remove({ output: 'breezy:hot_air_balloon' })
        event.shaped(
        Item.of('breezy:hot_air_balloon', 1),
        [
            'AAA',
            'B B',
            'CDC'
        ],
        {
            A: 'immersive_aircraft:sail',
            B: '#bloodandbeauty:aircraft_cable',
            C: '#minecraft:planks',
            D: '#create:seats'
        }
        )
        //Airship
        event.shaped(
        Item.of('immersive_aircraft:airship', 1), 
        [
            'AAA',
            'ACA', 
            'BDB'
        ],
        {
            A: 'immersive_aircraft:sail',
            B: 'immersive_aircraft:hull',
            C: 'breezy:hot_air_balloon',
            D: 'immersive_aircraft:engine'
        }
        )
        //Cargo Airship
        event.recipes.create.mechanical_crafting('immersive_aircraft:cargo_airship', [
            ' DDD ',
            ' E E ',
            'CBABC',
            ' CBC '
        ], {
            A: 'immersive_aircraft:airship',
            B: 'immersive_aircraft:hull',
            C: 'minecraft:chest',
            D: 'immersive_aircraft:sail',
            E: '#bloodandbeauty:aircraft_cable'
        }
        )
        //Warship
        event.recipes.create.mechanical_crafting('immersive_aircraft:warship', [
        'GAAAG',
        'GAAAG',
        ' B B ',
        'BCFCB',
        ' DED '
        ], {
        A: 'immersive_aircraft:sail',
        B: 'immersive_aircraft:hull',
        C: '#create:seats',
        D: 'immersive_aircraft:engine',
        E: 'create:railway_casing',
        F: 'immersive_aircraft:cargo_airship',
        G: 'create:sturdy_sheet'
        }
        )
        //Biplane
        event.recipes.create.mechanical_crafting('immersive_aircraft:biplane', [
        '   E ',
        'E  A ',
        'EABCD',
        'E  A ',
        '   E '
        ], {
        A: 'immersive_aircraft:hull',
        B: '#create:seats',
        C: 'immersive_aircraft:engine',
        D: 'immersive_aircraft:propeller',
        E: 'immersive_aircraft:sail'
        }
        )
        //Quadrocopter
        event.recipes.create.mechanical_crafting('immersive_aircraft:quadrocopter', [
        'ABA',
        'BCB',
        'BDB',
        'ABA'
        ], {
        A: 'immersive_aircraft:propeller',
        B: 'minecraft:bamboo',
        C: '#create:seats',
        D: 'immersive_aircraft:engine'
        }
        )
        //Gyrodyne
        event.recipes.create.mechanical_crafting('immersive_aircraft:gyrodyne', 
        [
            '  D  ',
            'ABCBA',
            ' EFG '
        ], 
        {
            A: 'immersive_aircraft:sail',
            B: 'immersive_aircraft:hull',
            C: '#create:seats',
            D: 'immersive_aircraft:propeller',
            E: 'immersive_aircraft:nether_engine',
            F: 'create:gearbox',
            G: 'immersive_aircraft:eco_engine'
        }
        )
        //Bamboo Hopper
        event.recipes.create.mechanical_crafting('immersive_aircraft:bamboo_hopper', 
        [
            '    A',
            'ACBDE',
            'C FGH',
            'ACBDE',
            '    A'
        ], 
        {
            A: 'immersive_aircraft:sail',
            B: 'immersive_aircraft:hull',
            C: 'minecraft:bamboo',
            D: '#create:seats',
            E: 'minecraft:bamboo_block',
            F: 'immersive_aircraft:propeller',
            G: 'immersive_aircraft:engine',
            H: 'immersive_aircraft:biplane'
        }
        )
    }

    { // Waystones
        //remove recipes
        event.remove({ output: /waystones:.*_scroll/ })
        event.remove({ output: /waystones:.*waystone/ })
        event.remove({ output: "waystones:sharestone" })

        //Standard waystone Recipes
        waystoneRecipe(event, 'minecraft:stone_bricks', 'waystones:waystone' )
        waystoneRecipe(event, 'minecraft:mossy_stone_bricks', 'waystones:mossy_waystone' )
        waystoneRecipe(event, 'minecraft:deepslate_bricks', 'waystones:deepslate_waystone' )
        waystoneRecipe(event, 'minecraft:polished_blackstone_bricks', 'waystones:blackstone_waystone' )
        waystoneRecipe(event, 'minecraft:chiseled_sandstone', 'waystones:sandy_waystone' )
        waystoneRecipe(event, 'minecraft:end_stone_bricks', 'waystones:end_stone_waystone' )

        //Mossy Alternate Recipe
        event.shapeless(
            'waystones:mossy_waystone',
            [
                '3x minecraft:vine',
                'waystones:waystone'
            ]
        )

        //Base Sharestone Recipe
        event.recipes.create.mechanical_crafting( 'waystones:sharestone', 
        [
            ' F ',
            'AEA',
            'BDB',
            ' C '
        ], 
        {
            A: 'minecraft:stone_bricks',
            B: 'minecraft:obsidian',
            C: 'minecraft:crying_obsidian',
            D: 'waystones:warp_stone',
            E: 'create_things_and_misc:vibration_mechanism',
            F: 'irons_spellbooks:ender_rune'
        }
        )

        //Warp stone and dust recipes
        event.remove({ output: /waystones:warp.*/ })
        event.shaped(
            'waystones:warp_stone',
            [
                'ABA',
                'BCB',
                'ABA'
            ],
            {
                A: 'minecraft:amethyst_shard',
                B: 'minecraft:ender_pearl',
                C: 'irons_spellbooks:arcane_ingot'
            }
        )
        event.shapeless(
            Item.of('waystones:warp_dust', 4),
            [
                'irons_spellbooks:arcane_ingot',
                'minecraft:ender_pearl',
                'minecraft:amethyst_shard'
            ]
        )
        event.shaped(
            Item.of('waystones:warp_plate'),
            [
                'ABA',
                'BCB',
                'ABA'
            ],
            {
                A: 'minecraft:stone_bricks',
                B: 'waystones:warp_dust',
                C: 'irons_spellbooks:arcane_ingot'
            }
        )
    }

    { // Immersive Weathering
        // Clay from clay
        event.recipes.create.mixing(
            [
                'minecraft:mud',
                Item.of( 'minecraft:clay_ball', 4 )
            ],
            [
                Item.of( 'immersive_weathering:earthen_clay', 2 ),
                Fluid.of( 'minecraft:water', 100 )
            ]
        )
    }

    { // Addon Minor
        // ===== Create: Rubberworks =====
        // Other Compats
        event.recipes.create.compacting(
            Item.of( "minecraft:resin_clump" ),
            [
                Fluid.of( "rubberworks:resin", 500 )
            ]
        )
        event.custom({
            "type": "vintagedelight:fermenting",
            "ingredients": [
                { "item": "minecraft:resin_clump" },
                { "item": "minecraft:resin_clump" },
                { 
                    "item": "minecraft:potion",
                    "count": 1,
                    "nbt": '{Potion:"minecraft:water"}'
                },
                { "item": "minecraft:sugar" }
            ],
            "container": { "item": "minecraft:glass_bottle" },
            "output": {
                "item": 'mushroomquest:tree_resin',
                "count": 1
            },
            "processingTime": 400
        })

        // Low grade rubber stuff
        event.remove( { id: "create:crafting/appliances/copper_backtank" } )
        event.remove( { id: "create:crafting/appliances/copper_diving_helmet" } )
        event.remove( { id: "create:crafting/appliances/copper_diving_boots" } )
        event.replaceInput( 
            { output: "#bloodandbeauty:rubberify_weak" },
            'rubberworks:rubber_sheet',
            "rubberworks:rubber"
        )
        event.replaceInput( 
            { id: "createaddition:crafting/small_connector_copper" },
            "minecraft:slime_ball",
            "rubberworks:rubber"
        )
        event.replaceInput( 
            { id: "create_things_and_misc:sprinklerheadcraft" },
            "minecraft:dried_kelp",
            "rubberworks:rubber"
        )
        event.shaped(
            Item.of( "create:copper_backtank" ),
            [
                'ABA',
                'CDC',
                ' E '
            ],
            {
                A: "create:andesite_alloy",
                B: 'create:shaft',
                C: "rubberworks:rubber",
                D: "minecraft:copper_block",
                E: "minecraft:copper_ingot"
            }
        )
        event.shaped(
            Item.of( "create:copper_diving_helmet" ),
            [
                'AAA',
                'ABA',
                ' C '
            ],
            {
                A: "minecraft:copper_ingot",
                B: "#forge:glass",
                C: "rubberworks:rubber"
            }
        )
        event.shaped(
            Item.of( "create:copper_diving_boots" ),
            [
                'A A',
                'B B',
                'C C'
            ],
            {
                A: "rubberworks:rubber",
                B: "minecraft:copper_ingot",
                C: "create:andesite_alloy"
            }
        )

        // High Grade Rubber Stuff
        event.remove( { id: "rubberworks:pressing/rubber_sheet" } )
        event.recipes.create.compacting(
            Item.of( "rubberworks:rubber_sheet", 4 ),
            [
                "cgs:sulfur",
                Item.of( "rubberworks:rubber", 3 )
            ]
        ).heatRequirement( "lowheated" )
        event.replaceInput(
            { output: "createaddition:large_connector" },
            "minecraft:slime_ball",
            "rubberworks:rubber_sheet"
        )
        event.replaceInput(
            { output: '#bloodandbeauty:rubberify_tough' },
            "minecraft:dried_kelp",
            "rubberworks:rubber_sheet"
        )

        
        // ===== Create Deco =====
        // Change sturdy sheet block recipe
        event.remove({ output: "create_things_and_misc:sturdy_sheet_block" })
        event.shaped(
            "create_things_and_misc:sturdy_sheet_block",
            [
                "AA",
                "AA"
            ],
            {
                A: "create:sturdy_sheet"
            }
        )

        // Change industrial iron and andesite sheet blocks to match compacted versions
        event.remove({ output: "createdeco:andesite_sheet_metal" })
        event.remove({ output: "createdeco:industrial_iron_sheet_metal" })
        event.shapeless(
            "createdeco:andesite_sheet_metal",
            [
                "9x createdeco:andesite_sheet"
            ]
        )
        event.shapeless(
            "createdeco:industrial_iron_sheet_metal",
            [
                "9x createdeco:industrial_iron_sheet"
            ]
        )
        event.shapeless(
            Item.of("createdeco:andesite_sheet", 9),
            [
                "createdeco:andesite_sheet_metal"
            ]
        )
        event.shapeless(
            Item.of("createdeco:industrial_iron_sheet", 9),
            [
                "createdeco:industrial_iron_sheet_metal"
            ]
        )
    }

    { // Other Minor
        // Ship Cannon Recipe
        event.remove({ output: 'smallships:cannon' })
        event.shaped(
            Item.of( 'smallships:cannon', 1 ),
            [
                'AB ',
                'CDC'
            ],
            {
                A: 'create:industrial_iron_block',
                B: 'supplementaries:cannon',
                C: 'trotting_wagons:wheel',
                D: '#minecraft:planks'
            }
        )

        // Charcoal Dust Compat
        event.replaceInput(
            { Input: 'cgs:charcoal_dust' },
            'cgs:charcoal_dust',
            'meds_and_herbs:powder_charcoal'
        )
        event.replaceOutput(
            { output: 'cgs:charcoal_dust' },
            'cgs:charcoal_dust',
            'meds_and_herbs:powder_charcoal'
        )
        event.remove({ type: 'create:compacting', output: 'meds_and_herbs:powder_charcoal' })
        event.remove({ type: 'create:crushing', output: 'meds_and_herbs:powder_charcoal' })
        event.recipes.create.crushing(
            [
                Item.of( 'meds_and_herbs:powder_charcoal' ),
                Item.of( 'meds_and_herbs:powder_charcoal' ).withChance( 0.5 ),
            ],
            [
                'minecraft:charcoal'
            ]
        )

        // Ash
        event.recipes.farmersdelight.cooking(
            [ '#minecraft:logs' ],
            'supplementaries:ash',
            0.1,
            200
        )
        event.recipes.create.splashing(
            Item.of( 'cgs:niter' ).withChance( 0.5 ),
            'supplementaries:ash'
        )

        // Bombs
        event.remove({ output: 'betterarcheology:bomb' })
        event.shaped(
            Item.of( 'betterarcheology:bomb', 1 ),
            [
                ' AB',
                'ACA',
                ' A '
            ],
            {
                A: 'minecraft:iron_ingot',
                B: 'minecraft:string',
                C: 'minecraft:tnt'
            }
        )
        event.remove({ output: 'supplementaries:bomb' })
        event.shaped(
            Item.of( 'supplementaries:bomb', 1 ),
            [
                'AAB',
                'ACA',
                'AAA'
            ],
            {
                A: 'minecraft:iron_nugget',
                B: 'minecraft:string',
                C: 'minecraft:gunpowder'
            }
        )

        // Replace sulphur
        event.remove({ id: 'cgs:crushing/magma_block' }) // fix overwritten recipe
        event.recipes.create.crushing(
            [
                "minecraft:gravel",
                Item.of( 'cgs:sulfur' ),
                Item.of( 'cgs:sulfur', 1 ).withChance( 0.5 ),
                Item.of( 'cgs:sulfur', 1 ).withChance( 0.25 )
            ],
            Item.of( 'biomesoplenty:brimstone' )
        )
        event.remove({ type: 'create:crushing', input: 'minecraft:coal' })
        event.remove({ type: 'create:milling', input: 'minecraft:coal' })
        event.recipes.create.crushing(
            [
                Item.of( 'bloodandbeauty:coal_dust' ),
                Item.of( 'cgs:sulfur', 1 ).withChance( 0.5 )
            ],
            Item.of( 'minecraft:coal' )
        )
        event.recipes.create.milling(
            [
                Item.of( 'bloodandbeauty:coal_dust' ),
                Item.of( 'cgs:sulfur', 1 ).withChance( 0.125 )
            ],
            'minecraft:coal'
        )
        event.shapeless(
            'minecraft:black_dye',
            'bloodandbeauty:coal_dust'
        )
        event.shapeless(
            Item.of( 'minecraft:yellow_dye' ),
            'cgs:sulfur'
        )
    }

})

ServerEvents.tags( 'item', event => {
    event.add('create:pulpifiable', 'farmersdelight:tree_bark', 'farmersdelight:straw', 'meds_and_herbs:cotton_fibers')

    event.add('bloodandbeauty:aircraft_cable', 'minecraft:string', 'minecraft:lead')

    event.add( 'bloodandbeauty:coal_like', 'minecraft:coal', 'bloodandbeauty:coal_dust' )

    event.add( 'bloodandbeauty:rubberify_weak', 
        "create:andesite_funnel","create:spout","create:belt_connector" 
    )
    event.add( 
        'bloodandbeauty:rubberify_tough', 
        "create_things_and_misc:card_reader","create_hypertube:hypertube_entrance","petrolsparts:pneumatic_tube"
    )
})

// Helper Functions
function waystoneRecipe(event, block, output) {
    event.recipes.create.mechanical_crafting( output, 
      [
        ' F ',
        'AEA',
        'BDB',
        ' C '
      ], 
      {
        A: block,
        B: 'minecraft:obsidian',
        C: 'minecraft:crying_obsidian',
        D: 'waystones:warp_stone',
        E: 'create_things_and_misc:vibration_mechanism',
        F: 'irons_spellbooks:arcane_rune'
      }
    )
}