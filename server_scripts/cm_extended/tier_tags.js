// Set block mineability for tool tiers
ServerEvents.tags( 'block', event => {
    // Add Tags
    global.forEachIn( assignments, ( filters, tag ) => {
        for ( var filter of filters ) {
            event.add( tag, filter )
        }
    })

    // Remove Tags
    global.forEachIn( removals, ( filters, tag ) => {
        for ( var filter of filters ) {
            event.remove( tag, filter )
        }
    })
})

// Add Tags
var assignments = {
    "minecraft:needs_stone_tool": [
        /.*deepslate.*/,
        "create:zinc_ore",
        "cgs:lead_ore",
        "deeperdarker:sculk_stone_gold_ore",
        "minecraft:gold_ore",
        "deeperdarker:gloomslate_coal_ore",
        "minecraft:deepslate_coal_ore"
    ],
    "hltweaker:needs_copper_tool": [
        /.*gloomslate.*/,
        "vital_herbs:aura_crystal_ore",
        "minecraft:deepslate_gold_ore",
        "minecraft:deepslate_copper_ore",
        "deeperdarker:sculk_stone_iron_ore",
        "minecraft:deepslate_iron_ore",
        "minecraft:iron_ore",
        "vital_herbs:deepslate_aura_crystal_ore",
        "minecraft:deepslate_lapis_ore"
    ],
    "hltweaker:needs_steel_tool": [
        "#minecraft:needs_diamond_tool",
        "minecraft:obsidian",
        "minecraft:crying_obsidian",
        "endlessbiomes:shattered_obsidian"
    ],
    "hltweaker:needs_tungsten_tool": [
        "minecraft:ancient_debris"
    ]
}

// Remove Tags
var removals = {
    "minecraft:needs_iron_tool": [
        "cgs:deepslate_lead_ore",
        "cgs:lead_ore",
        "create:zinc_ore",
        "vital_herbs:deepslate_aura_crystal_ore",
        "vital_herbs:aura_crystal_ore",
        "deeperdarker:gloomslate_gold_ore",
        "minecraft:gold_ore",
        "deeperdarker:sculk_stone_gold_ore",
        "minecraft:deepslate_gold_ore"
    ],
    "hltweaker:needs_copper_tool": [
        "deeperdarker:gloomslate_coal_ore"
    ],
    "forge:needs_wood_tool": [
        "mh_automated:medicine_shelf"
    ]
}