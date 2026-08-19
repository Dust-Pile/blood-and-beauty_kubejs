JEIEvents.information( event => {
    // Sons of Sins Tips
    for ( var item of mobParts ) {
        event.addItem( item,
            "Organs can be aquired by murdering creatures with the Sickle of Struggle."
        )
    }
    event.addItem( "sons_of_sins:ether_ashes", "Ether Ashes can be obtained by killing a mob with any osseous weapon." )

    // Meds and Herbs Tips
    for ( var plant of medsPlants ) {
        event.addItem( plant,
            "Use the Plant Guide Book to learn about this plant's effects."
        )
    }

    event.addItem( 'meds_and_herbs:raw_beverage_bucket', 'Unfiltered Beverage is fermented in the fermentation barrel.' )
})

// Data
var mobParts = [
    "mobs_of_sins:capucin_monkey_heart",
    "mobs_of_sins:cockroach_heart",
    "mobs_of_sins:gazelle_ribs",
    "mobs_of_sins:grizzly_bear_ribs",
    "mobs_of_sins:frilled_shark_ribs",
    "mobs_of_sins:nuisances_muscle",
    "mobs_of_sins:tarantula_hawk_muscles",
    "mobs_of_sins:tiger_muscles",
    "sons_of_sins:charged_creeper_ribs",
    "sons_of_sins:ribs",
    "sons_of_sins:muscle",
    "sons_of_sins:heart",
    "sons_of_sins:creeper_ribs",
    "sons_of_sins:golem_cuirass",
    "sons_of_sins:slime_rear",
    "sons_of_sins:enderman_muscle",
    "sons_of_sins:strider_muscle",
    "sons_of_sins:ravager_muscle",
    "sons_of_sins:blazing_heart",
    "sons_of_sins:spider_heart",
    "sons_of_sins:ice_heart"
]
var medsPlants = [
    "meds_and_herbs:sweet_clover_flowers","meds_and_herbs:chamomile_flowers","meds_and_herbs:opium_poppies",
    "meds_and_herbs:aloe_leaves","meds_and_herbs:cotton_fibers","meds_and_herbs:belladonna_leaves","meds_and_herbs:bouquet",
    "meds_and_herbs:plantago_leaves","meds_and_herbs:artemisia_leaves","meds_and_herbs:powder_herbal",
    "meds_and_herbs:powder_vinca","meds_and_herbs:powder_belladonna","meds_and_herbs:powder_sweet_clover",
    "meds_and_herbs:powder_chamomile","meds_and_herbs:powder_artemisia","meds_and_herbs:powder_opium",
    "meds_and_herbs:powder_aloe"
]