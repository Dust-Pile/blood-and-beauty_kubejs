ItemEvents.modification( event => {
    for ( var i = 0; i < itemLists.length; i++ ) {
        var items = itemLists[ i ]
        for ( var item of items ) {
            var size = sizes[ i ]
            event.modify( item, item => {
                item.maxStackSize = size
            })
        }
    }
})

var sizes = [
    1,
    4,
    8,
    16,
    64
]

var itemLists = [
    [
        // Hexerei / Containers
        'hexerei:coffer', 'hexerei:herb_jar',
        /create:.*toolbox/,
        // Waystones
        /waystones:.*sharestone/,
        "waystones:portstone","waystones:waystone","waystones:mossy_waystone","waystones:sandy_waystone",
        "waystones:deepslate_waystone","waystones:blackstone_waystone","waystones:end_stone_waystone",
        // Other
        "summoningrituals:altar",
    ],
    [
        // Horse equipment and related
        "horseshoes:gold_horseshoes","horseshoes:iron_horseshoes","horseshoes:netherite_horseshoes",
        "horseshoes:diamond_horseshoes","alexsmobs:straddle_saddle","minecraft:saddle","horseshoes:netherite_horse_armor",
        "minecraft:diamond_horse_armor","minecraft:golden_horse_armor","minecraft:iron_horse_armor",
        "minecraft:leather_horse_armor",
        // Minecraft
        /minecraft:.*bed/, /handcrafted:.*bed/,
        // Other
        "petrolsparts:colossal_cogwheel",
    ],
    [
        "create:schematicannon","supplementaries:cannon",
        "create:large_water_wheel",
        /.*banner_pattern.*/,
    ],
    [
        // Food
        'endersdelight:stuffed_shulker_bowl', /meds_and_herbs:dressing.*/, 'meds_and_herbs:splint',
        // Other
        'hexerei:dried_sage_bundle',
        /.*music_disc.*/, 'minecraft:goat_horn',
        'minecraft:suspicious_stew',
        'waystones:warp_stone',"waystones:warp_plate",
        // Workstations / machines / functional / related
        "create:blaze_burner","create:water_wheel","create:encased_fan","create:millstone","create:mechanical_press",
        "create:mechanical_mixer","minecraft:crafting_table","createaddition:rolling_mill","minecraft:anvil",
        "minecraft:chipped_anvil","minecraft:damaged_anvil","irons_spellbooks:arcane_anvil","minecraft:stonecutter",
        "minecraft:cartography_table","minecraft:fletching_table","minecraft:smithing_table","minecraft:grindstone",
        "minecraft:loom","minecraft:furnace","minecraft:smoker","minecraft:blast_furnace","minecraft:jukebox",
        "minecraft:enchanting_table","minecraft:brewing_stand","minecraft:cauldron","minecraft:bell","minecraft:beacon",
        "minecraft:conduit","minecraft:lectern","create:crushing_wheel","create:empty_blaze_burner",
        "create:steam_engine","create:spout","create:elevator_pulley","create:rope_pulley","create:windmill_bearing",
        "create:mechanical_bearing","create:clockwork_bearing","create:mechanical_piston","create:sticky_mechanical_piston",
        "create:mechanical_saw","create:deployer","create:mechanical_harvester","create:mechanical_roller",
        "create:mechanical_arm","create:rotation_speed_controller","create:package_frogport",
        "create_hypertube:hypertube_accelerator","create_hypertube:hypertube_entrance","sculkcatalyticchamber:chamber",
        "sculkcatalyticchamber:mechanical_shrieker","createhorsepower:horse_crank",
        "create_power_loader:empty_brass_chunk_loader","create_power_loader:brass_chunk_loader",
        "create_power_loader:empty_andesite_chunk_loader","create_power_loader:andesite_chunk_loader","create:chain_conveyor",
        "sliceanddice:slicer","create:peculiar_bell","create:haunted_bell","create:hose_pulley","create:schematic_table",
        "deeperdarker:ancient_vase","irons_spellbooks:scroll_forge","irons_spellbooks:pedestal",
        "irons_spellbooks:alchemist_cauldron","pots_and_mimics:treasure_pot","pots_and_mimics:nether_treasure_pot",
        "pots_and_mimics:end_treasure_pot","pots_and_mimics:decorative_pot","pots_and_mimics:decorative_nether_pot",
        "pots_and_mimics:decorative_end_pot","minecraft:dispenser","minecraft:dropper","easel_does_it:easel",
        "supplementaries:urn","supplementaries:hat_stand","supplementaries:statue","enchantinginfuser:enchanting_infuser",
        "enchantinginfuser:advanced_enchanting_infuser","irons_spellbooks:inscription_table","minecraft:respawn_anchor",
    ],
    [
        'dungeonsdelight:sculk_polyp'
    ]
]