Platform.mods.kubejs.name = 'Blood and Beauty'

BlockEvents.modification( event => {

    // Sounds
    event.modify( 'mh_automated:medicine_shelf', block => {
        block.setSoundType( 'wood' )
    })
    event.modify( 'minecraft:nether_portal', block => {
        block.setSoundType( 'shroomlight' )
    })

    // Vital herbs (stop glowing so bright its driving me crazzyyyy)
    event.modify( 'vital_herbs:aura_crystal_ore', block => {
        block.setLightEmission( 0 )
    })
    event.modify( 'vital_herbs:deepslate_aura_crystal_ore', block => {
        block.setLightEmission( 0 )
    })

})

ItemEvents.modification( event => {

    // Tar Burntime / Fixes
    event.modify( 'better_campfires:firewood', item => {
        item.burnTime = 200
    })
    event.modify( 'luckyclover:fried_egg', item => {
        item.craftingRemainder = null
    })

    // Add meds crafting item
    for ( var bottle of medBottles ) {
        event.modify( bottle, item => {
            item.craftingRemainder = Item.of( 'meds_and_herbs:empty_bottle_dirty' )
        })
    }
})

StartupEvents.registry('item', event => {

    // Add Stripped Bamboo item
    event.create('bloodandbeauty:stripped_bamboo')
        .texture('bloodandbeauty:item/stripped_bamboo')
    // Add Coal Dust
    event.create('bloodandbeauty:coal_dust')
        .texture('bloodandbeauty:item/materials/coal_dust')
        .burnTime( 200 * 6 )
    // Add Hellish Viscera
    event.create( 'bloodandbeauty:hellish_viscera' )
        .texture( 'bloodandbeauty:item/hellish_viscera' )
        .unstackable()

})

StartupEvents.registry('block', event => {
    
})

var medBottles = [
    "meds_and_herbs:extract_herbal",
    "meds_and_herbs:extract_vinca",
    "meds_and_herbs:extract_belladonna",
    "meds_and_herbs:extract_sweet_clover",
    "meds_and_herbs:extract_chamomile",
    "meds_and_herbs:extract_artemisia",
    "meds_and_herbs:extract_opium",
    "meds_and_herbs:extract_mushroom",
    "meds_and_herbs:extract_caffeine",
    "meds_and_herbs:extract_glucose",
    "meds_and_herbs:bottled_blood",
    "meds_and_herbs:bottled_poison_blood",
    "meds_and_herbs:bottled_hpp_blood",
    "meds_and_herbs:bottled_adrenaline_blood",
    "meds_and_herbs:medicine_adrenaline",
    "meds_and_herbs:medicine_antidote",
    "meds_and_herbs:medicine_hpa",
    "meds_and_herbs:poison",
    "meds_and_herbs:belladonna_poison",
    "meds_and_herbs:poison_hpp",
    "meds_and_herbs:medicine_penicillin",
    "meds_and_herbs:medicine_mophine",
    "meds_and_herbs:alcohol_ethanol",
    "meds_and_herbs:alcohol_methanol"
]