ServerEvents.recipes( event => {

    // Netherless Mechanical Crafter
    event.remove({ output: 'create:mechanical_crafter' })
    event.shaped(
        Item.of( 'create:mechanical_crafter', 3 ),
        [
            'A',
            'B',
            'C'
        ],
        {
            A: 'create:cogwheel',
            B: 'quark:crafter',
            C: 'create:brass_casing'
        }
    )

    // Critical Materials
    event.recipes.farmersdelight.cutting(
        'minecraft:leather',
        '#forge:tools/knives',
        [
            Item.of( 'cm_extended:leather_strips', 2 )
        ]
    )

    event.recipes.farmersdelight.cutting(
        '#minecraft:planks',
        '#minecraft:axes',
        [
            Item.of( 'cm_extended:tool_handle' )
        ]
    )

    event.shapeless(
        Item.of( "cm_extended:fine_handle" ),
        [
            'cm_extended:tool_handle',
            'cm_extended:leather_strips'
        ]
    )

    //Revamp chamber recipe
    event.remove( { output: 'sculkcatalyticchamber:chamber' } )
    event.recipes.create.mechanical_crafting(
        Item.of( 'sculkcatalyticchamber:chamber', 1 ),
        [
            'ABA',
            'CDC',
            'EFE',
            'GDH',
            'IBI'
        ],
        {
            A: 'minecraft:sculk',
            B: 'create:sturdy_sheet',
            C: 'create:fluid_tank',
            D: 'create:basin',
            E: 'minecraft:calibrated_sculk_sensor',
            F: 'create:andesite_casing',
            G: 'create:hose_pulley',
            H: 'deeperdarker:heart_of_the_deep',
            I: 'minecraft:sculk_catalyst'
        }
    )

})