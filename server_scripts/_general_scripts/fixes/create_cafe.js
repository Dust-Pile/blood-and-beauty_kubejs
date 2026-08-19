ServerEvents.recipes( event => {
    //Fruits
    event.recipes.create.filling(
        [
            Item.of('createcafe:blood_orange')
        ],
        [
            Item.of('vital_herbs:fizz_fruit'),
            Fluid.of('create_wizardry:blood', 250)
        ]
    )
    event.recipes.create.filling(
        [
            Item.of('createcafe:mana_berries')
        ],
        [
            Item.of('minecraft:sweet_berries'),
            Fluid.of('create_wizardry:mana', 250)
        ]
    )

    //Milk Tea
    global.forEachIn( milkTeaMap, ( ingredient, tea ) => {
        event.recipes.create.mixing(
            [
                Fluid.of( tea.split('_')[0].concat('_tea'), 500 )
            ], 
            [
                ingredient,
                Fluid.of('minecraft:milk', 250),
                Fluid.of('createcafe:melted_sugar', 250)
            ]
        ).heatRequirement('heated')
    })
    //Coffee
    global.forEachIn( coffeeMap, ( ingredient, syrup ) => {
        event.recipes.create.mixing(
            [
                Fluid.of( syrup.split('_')[0].concat('_syrup'), 1000 )
            ], 
            [
                ingredient,
                Fluid.of('minecraft:water', 250),
                Fluid.of('createcafe:melted_sugar', 750)
            ]
        ).heatRequirement('heated')
    })
})

var milkTeaMap = {
    'createcafe:dragonfruit_milk_tea': 'minecraft:dragon_breath',
    'createcafe:mana_berry_milk_tea': 'createcafe:mana_berries',
    'createcafe:strawberry_milk_tea': 'mushroomquest:strawberry_bracket',
    'createcafe:peach_milk_tea': 'yungscavebiomes:prickly_peach',
    'createcafe:apricot_milk_tea': 'mushroomquest:apricot_jelly',
    'createcafe:durian_milk_tea': 'endlessbiomes:endurian',
    'createcafe:aloe_milk_tea': 'meds_and_herbs:aloe_leaves',
    'createcafe:pineapple_milk_tea': 'pineapple_delight:pineapple_side',
    'createcafe:blueberry_milk_tea': 'meds_and_herbs:belladonna_berry',
    'createcafe:coconut_milk_tea': 'crabbersdelight:coconut_halve',
    'createcafe:cherry_milk_tea': 'vinery:cherry',
    'createcafe:blackberry_milk_tea': 'upgrade_aquatic:mulberry',
    'createcafe:redlove_milk_tea': 'vital_herbs:bleeding_heart_cream',
    'createcafe:grape_milk_tea': '#vinery:red_grape',
}

var coffeeMap = {
    'createcafe:coconut_iced_coffee': 'crabbersdelight:coconut_halve',
    'createcafe:mint_iced_coffee': 'vital_herbs:frost_mint',
    'createcafe:strawberry_iced_coffee': 'mushroomquest:strawberry_bracket',
    'createcafe:caramel_iced_coffee': 'create_confectionery:bar_of_caramel'
}