// Rename
ClientEvents.lang( "en_us", event => {
    global.forEachIn( blocks, ( display, id ) => {
        event.renameBlock( id, display )
    })
    global.forEachIn( items, ( display, id ) => {
        event.renameItem( id, display )
    })
    global.forEachIn( enchantmentDescriptions, ( display, id ) => {
        event.add( 'enchdesc', id, display )
    })
    global.forEachIn( other, ( display, id ) => {
        event.add( id, display )
    })
    for ( var pick of picks ) {
        event.renameItem( pick, pickify( pick ) )
    }
    
})

// Lists
var blocks = {
    'cgs:sulfur_ore': 'Sulphur Ore',
    "createdeco:andesite_sheet_metal": "Andesite Sheet Block",
    "createdeco:industrial_iron_sheet_metal": "Industrial Iron Sheet Block",
    "createdeco:iron_coinstack": "Silver Coinstack",
}
var items = {
    'cgs:sulfur': 'Sulphur',
    "crabbersdelight:frog_leg_kebob": "Frog Leg Kabob",
    "crabbersdelight:squid_kebob": "Squid Kabob",
    "meds_and_herbs:powder_charcoal": "Charcoal Dust",
    "createdeco:iron_coin": "Silver Coin",
    "createdeco:iron_coinstack": "Silver Coinstack",
    "alexsmobs:bear_fur": "Fur Pelt",
    "lowlands_clothing:needle_and_string": "Sewing Needle",
    "meadow:cheese_stick": "Cheesy Bread",
}
var enchantmentDescriptions = {
    "enchantment.endlessbiomes.shared_pain.desc": "Overkill damage is transfered onto nearby hostile mobs.",
    "enchantment.ice_enchantments.frost.desc": "Arrows fired from the bow will apply additional frost damage.",
    "enchantment.ice_enchantments.frost_aspect.desc": "Causes additional frost damage when used to attack a mob.",
    "enchantment.ancientcurses.seismic.desc": "Causes area effect damage when landing with a golden feather.",
    "enchantment.ancientcurses.soaring.desc": "Increases the launching power of the golden feather.",
    "enchantment.ancientcurses.tailwind.desc": "Improves the golden feather.",
    "enchantment.ancientcurses.zephyr_rush.desc": "Improves the golden feather.",
    "enchantment.ntrials.wind_burst.desc": "Creates a wind burst when hitting a mob while falling.",
    "enchantment.ntrials.density.desc": "Deal more damage to mobs when falling, proportional to fall distance.",
    "enchantment.ntrials.breach.desc": "Cause attacks to breach through armor.",
    "enchantment.mushroomquest.sporestep.desc": "Provides speed, jump boost, and slow falling when on mushroom-related blocks.",
}
var other = {
    // Not working in items section ig?
    "upgrade.minecraft.netherite_upgrade": "Netherite Flux",
    // Unique
    "fluid_type.create_things_and_misc.diluted_bonemeal": "Diluted Bonemeal",
    // Curios
    "curios.identifier.tool_belt": "Tool Belt",
    "curios.identifier.quiver": "Quiver",
    "curios.identifier.glider": "Air Gear",
    "curios.identifier.lantern": "Lantern",
    "curios.identifier.ears": "Ears",
    "curios.identifier.pouch": "Coin Pouch",
    // Tool Tiers
    "text.hltweaker.level.copper": "Copper",
    "text.hltweaker.level.steel": "Steel",
    "text.hltweaker.level.tungsten": "Tungsten"
}

var picks = [
    "minecraft:wooden_pickaxe",
    "minecraft:stone_pickaxe",
    "minecraft:iron_pickaxe",
    "minecraft:golden_pickaxe",
    "minecraft:diamond_pickaxe",
    "minecraft:netherite_pickaxe",
    "deeperdarker:resonarium_pickaxe",
    "deeperdarker:warden_pickaxe",
    "kobolds:kobold_iron_pickaxe",
    "simplesilver:silver_pickaxe",
    "vital_herbs:razor_leaf_pickaxe",
    "alexsmobs:ghostly_pickaxe",
    "aquaculture:neptunium_pickaxe",
    "sons_of_sins:osseous_pickaxe",
    "sons_of_sins:flesh_pickaxe",
    "sons_of_sins:sinful_pickaxe",
    "minecraft:copper_pickaxe"
]
/**
 * 
 * @param {String} pickId 
 */
function pickify( pickId ) {
    var parts = pickId.split(':')[1].split('_')
    var outString = ''
    for ( var i = 0; i < parts.length - 1; i++ ) {
        outString += parts[i].charAt(0).toUpperCase() + parts[i].substring( 1 ) + ' '
    }
    return outString + 'Pick'
}