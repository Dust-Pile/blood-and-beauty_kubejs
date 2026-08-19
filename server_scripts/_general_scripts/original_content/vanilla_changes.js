ServerEvents.recipes( event => {
    
    //'minecraft:enchanted_golden_apple' recipie
    event.shaped(
        Item.of('minecraft:enchanted_golden_apple', 1),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'minecraft:gold_block',
            B: 'minecraft:apple'
        }
    )
    //Bundle Recipie
    event.remove({ output: 'minecraft:bundle' })
    event.shaped(
        Item.of("minecraft:bundle", 1),
        [
            'A',
            'B'
        ],
        {
            A: 'minecraft:string',
            B: 'minecraft:leather'
        }
    )
    //Lead Recipe
    event.replaceInput(
        { output: 'minecraft:lead' },
        'minecraft:slime_ball',
        'minecraft:string'
    )

    //Banner Recipe Overwrite
    event.remove({ output: /minecraft:.*_banner/})
    global.colors.forEach( color => {
        event.shaped(
            Item.of('minecraft:' + color + '_banner', 2),
            [
                'A',
                'A',
                'B'
            ],
            {
                A: 'minecraft:' + color + '_wool',
                B: 'minecraft:stick'
            }
        )
    })

    //Jukebox Recipe Overwrite
    event.remove({ output: "minecraft:jukebox" })
    event.shaped(
        Item.of( "minecraft:jukebox", 1 ),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: '#minecraft:planks',
            B: '#immersive_melodies:instruments'
        }
    )

})