// Not preferred, but needed for some edge cases.
JEIEvents.hideItems(event => {
    for ( var item of itemBlacklist ) {
        event.hide(item)
    }
})

JEIEvents.hideFluids(event => {
    //Redundant Fluids
    event.hide("gourmet:seed_oil")
    event.hide("hexerei:quicksilver_fluid")

    // Create Cafe
    for (var item of unmakeableDrinks) {
        event.hide(item.split('_')[0].concat('_tea'))
    }
})

JEIEvents.addItems(event => {
    for (var item of itemWhitelist) {
        event.add(item)
    }

    //Show gingerbread???
    event.add(/snowyspirit:gingerbread.*/)
})

/*
JEIEvents.addFluids(event => {
})
/** */

let itemWhitelist = [
    //irons spellbooks
    "irons_spellbooks:arcane_anvil",
    "irons_spellbooks:incription_table",
    "irons_spellbooks:scroll_forge",
    //sol apple pie
    "solapplepie:food_book",
    //Dungons Delight
    "dungeonsdelight:arcane_chili"
]

var itemBlacklist = [
    // Meds bark
    "meds_and_herbs:bark_oak","meds_and_herbs:bark_birch","meds_and_herbs:bark_dark_oak",
    "meds_and_herbs:bark_spruce","meds_and_herbs:bark_acacia","meds_and_herbs:bark_jungle",
    "meds_and_herbs:bark_mangrove","meds_and_herbs:bark_cherry","meds_and_herbs:bark_crimson",
    "meds_and_herbs:bark_warped"

]

var unmakeableDrinks = [
    //Create Cafe unmakeable drinks
    "createcafe:lime_milk_tea",
    "createcafe:grapefruit_milk_tea",
    "createcafe:starfruit_milk_tea",
    "createcafe:mandarin_milk_tea",
    "createcafe:jackfruit_milk_tea",
    "createcafe:lychee_milk_tea",
    "createcafe:plum_milk_tea",
    "createcafe:mango_milk_tea",
    "createcafe:barberry_milk_tea",
    "createcafe:citron_milk_tea",
    "createcafe:passionfruit_milk_tea",
    "createcafe:guava_milk_tea",
    "createcafe:orange_milk_tea",
    "createcafe:yucca_milk_tea",
    "createcafe:persimmon_milk_tea",
    "createcafe:pomegranate_milk_tea",
    "createcafe:pomelo_milk_tea",
    "createcafe:raspberry_milk_tea",
    "createcafe:raspberry_iced_coffee",
    "createcafe:lemon_milk_tea",
    "createcafe:vanilla_milk_tea",
    "createcafe:vanilla_iced_coffee",
    "createcafe:gooseberry_milk_tea",
    "createcafe:kiwi_milk_tea",
    "createcafe:papaya_milk_tea",
    "createcafe:tamarind_milk_tea",
    "createcafe:fig_milk_tea",
]