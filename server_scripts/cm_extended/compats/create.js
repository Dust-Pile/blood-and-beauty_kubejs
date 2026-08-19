ServerEvents.recipes( event => {

    // New create recipes
    event.remove({ output: 'create:adjustable_chain_gearshift' })
    event.shapeless(
        Item.of( 'create:adjustable_chain_gearshift', 1 ),
        [
            'create:encased_chain_drive',
            'minecraft:redstone',
            'create:large_cogwheel'
        ]
    )
    event.remove({ output: "create:schematicannon" })
    event.shaped(
        Item.of( 'create:schematicannon', 1 ),
        [
            ' A ',
            ' B ',
            'CDC'
        ],
        {
            A: 'create:industrial_iron_block',
            B: 'supplementaries:cannon',
            C: 'create:large_cogwheel',
            D: 'create:turntable'
        }
    )
})