ServerEvents.recipes( event => {
    var keys = Object.keys( syringeMap )
    for ( var key of keys ) {
        fillSyringeRecipe( event, key )
    }

    // Meds and Herbs Recipe nerfs
    event.remove( { output: 'meds_and_herbs:incubator' } )
    event.remove( { output: 'mh_automated:medicine_shelf' } )
    event.shaped(
        Item.of( 'meds_and_herbs:incubator', 1 ),
        [
            'AA',
            'BC',
            'AA'
        ],
        {
            A: '#bloodandbeauty:tough_ironlike_ingot',
            B: 'minecraft:redstone',
            C: '#forge:glass_panes'
        }
    )
    event.shaped(
        Item.of( 'mh_automated:medicine_shelf', 1 ),
        [
            'AAA',
            'BBB',
            'AAA'
        ],
        {
            A: '#minecraft:planks',
            B: 'meds_and_herbs:empty_bottle_clean'
        }
    )
})

/**
 * 
 * @param {Internal.RecipesEventJS} event 
 * @param {String} key 
 */
function fillSyringeRecipe( event, key ) {
    event.shapeless( 
        Item.of( key, 3 ),
        [
            syringeMap[ key ],
            '3x meds_and_herbs:syringe_empty'
        ]
    )
}

// Data
var syringeMap = {
    "meds_and_herbs:syringe_herbal": "meds_and_herbs:extract_herbal",
    "meds_and_herbs:syringe_vinca": "meds_and_herbs:extract_vinca",
    "meds_and_herbs:syringe_belladonna": "meds_and_herbs:extract_belladonna",
    "meds_and_herbs:syringe_sweet_clover": "meds_and_herbs:extract_sweet_clover",
    "meds_and_herbs:syringe_chamomile": "meds_and_herbs:extract_chamomile",
    "meds_and_herbs:syringe_artemisia": "meds_and_herbs:extract_artemisia",
    "meds_and_herbs:syringe_opium": "meds_and_herbs:extract_opium",
    "meds_and_herbs:syringe_mushroom": "meds_and_herbs:extract_mushroom",
    "meds_and_herbs:syringe_caffeine": "meds_and_herbs:extract_caffeine",
    "meds_and_herbs:syringe_glucose": "meds_and_herbs:extract_glucose",
    "meds_and_herbs:syringe_blood": "meds_and_herbs:bottled_blood",
    "meds_and_herbs:syringe_blood_poison": "meds_and_herbs:bottled_poison_blood",
    "meds_and_herbs:syringe_blood_hpp": "meds_and_herbs:bottled_hpp_blood",
    "meds_and_herbs:syringe_blood_adrenaline": "meds_and_herbs:bottled_adrenaline_blood",
    "meds_and_herbs:syringe_adrenaline": "meds_and_herbs:medicine_adrenaline",
    "meds_and_herbs:syringe_antidote": "meds_and_herbs:medicine_antidote",
    "meds_and_herbs:syringe_hpa": "meds_and_herbs:medicine_hpa",
    "meds_and_herbs:syringe_poison": "meds_and_herbs:poison",
    "meds_and_herbs:syringe_belladonna_poison": "meds_and_herbs:belladonna_poison",
    "meds_and_herbs:syringe_hpp": "meds_and_herbs:poison_hpp",
    "meds_and_herbs:syringe_penicillin": "meds_and_herbs:medicine_penicillin",
    "meds_and_herbs:syringe_morphine": "meds_and_herbs:medicine_mophine",
    "meds_and_herbs:syringe_ethanol": "meds_and_herbs:alcohol_ethanol",
    "meds_and_herbs:syringe_methanol": "meds_and_herbs:alcohol_methanol"
}