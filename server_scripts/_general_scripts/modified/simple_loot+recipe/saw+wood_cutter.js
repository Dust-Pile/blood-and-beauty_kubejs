// ServerEvents.recipes( event => {
//     for ( var filter of sawmillFilters ) {
//         event.remove( { output: filter, type: "sawmill:woodcutting" } )
//     }
// })
ServerEvents.tags( "item", event => {
    for ( var filter of sawmillFilters ) {
        event.add( "sawmill:blacklist", filter )
    }
})

var sawmillFilters = [
    "shieldexp:wooden_shield",
    "alcocraftplus:mug",
    "meadow:cheese_form",
    "meadow:wooden_bucket",
    "ancientcurses:dowsing_rod",
    "minecraft:barrel",
    /.*boat/,
    "minecraft:chiseled_bookshelf",
    /^snowyspirit:sled.*/,
    "minecraft:wooden_pickaxe",
    "minecraft:wooden_axe",
    "crafting_on_a_stick:crafting_table",
    "minecraft:wooden_hoe",
    "easel_does_it:easel",
    "meds_and_herbs:fermentation_barrel",
    "minecraft:wooden_sword",
    "festive_delight:rolling_pin",
    "immersive_armors:wooden_leggings",
    "simplehats:hatdisplay",
    "immersive_armors:wooden_chestplate",
    "immersive_armors:wooden_helmet",
    "dustydecorations:decorative_bowl",
    "vinery:fermentation_barrel",
    "vinery:grapevine_pot",
    "immersive_armors:wooden_boots",
]