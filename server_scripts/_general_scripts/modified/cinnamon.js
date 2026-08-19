//Cinnamon recipes use other cinnamon
ServerEvents.recipes( event => {
    event.replaceInput(
        { input: 'festive_delight:cinnamon_sticks' },
        'festive_delight:cinnamon_sticks',
        '#forge:cinnamon'
    )
    event.remove({ output: "festive_delight:cinnamon_powder" })
    event.recipes.farmersdelight.cutting(
        'farmers_delight_christmas_editon:cinnamon',
        '#forge:tools/knives', 
        [ 
            Item.of('festive_delight:cinnamon_powder', 1)
        ],
        ''
	);

    event.remove({ output: "farmers_delight_christmas_editon:cinnamon" })
})

//Cinnamon tag
ServerEvents.tags('item', event => {
    event.add('forge:cinnamon', 'festive_delight:cinnamon_sticks')
    event.add('forge:cinnamon', 'farmers_delight_christmas_editon:cinnamon')
})

EntityEvents.spawned( 'item', event => {
    const { entity } = event

    if ( !entity.item.id.equals('festive_delight:cinnamon_sticks') ) {
        return
    }

    entity.item = 'farmers_delight_christmas_editon:cinnamon'
})