ServerEvents.recipes( event => {
    // Simple Silver Fix
    event.replaceOutput( 
        { type: "minecraft:smelting", output: "simplesilver:silver_nugget" },
        'simplesilver:silver_nugget',
        'simplesilver:silver_ingot'
    )
    event.replaceOutput( 
        { type: "minecraft:blasting", output: "simplesilver:silver_nugget" },
        'simplesilver:silver_nugget',
        'simplesilver:silver_ingot'
    )
    event.replaceOutput(
        { input: 'simplesilver:basalt_silver_ore' },
        'simplesilver:silver_ingot',
        'simplesilver:silver_nugget'
    )

    // horseshoes
    event.blasting( "minecraft:iron_ingot", "horseshoes:iron_horseshoes" )
    event.recipes.create.crushing(
        [
            Item.of( "minecraft:iron_ingot", 2 ),
            Item.of( "minecraft:iron_ingot" ).withChance( 0.5 )
        ],
        Item.of( "horseshoes:iron_horseshoes" )
    )
    event.blasting( "minecraft:gold_ingot", "horseshoes:gold_horseshoes" )
    event.recipes.create.crushing(
        [
            Item.of( "minecraft:gold_ingot", 2 ),
            Item.of( "minecraft:gold_ingot" ).withChance( 0.5 )
        ],
        Item.of( "horseshoes:gold_horseshoes" )
    )
    event.blasting( "minecraft:diamond", "horseshoes:diamond_horseshoes" )
    event.recipes.create.crushing(
        [
            Item.of( "minecraft:diamond", 2 ),
            Item.of( "minecraft:diamond" ).withChance( 0.5 )
        ],
        Item.of( "horseshoes:diamond_horseshoes" )
    )
    event.blasting( "minecraft:netherite_scrap", "horseshoes:netherite_horseshoes" )
    event.recipes.create.crushing(
        [
            Item.of( "minecraft:netherite_scrap" ),
            Item.of( "minecraft:netherite_scrap" ).withChance( 0.5 )
        ],
        Item.of( "horseshoes:netherite_horseshoes" )
    )
    // Horse Armor
    event.blasting( "minecraft:netherite_scrap", 'horseshoes:netherite_horse_armor' )
    event.recipes.create.crushing(
        [
            Item.of( "minecraft:netherite_scrap" ),
            Item.of( "minecraft:leather", 2 ).withChance( 0.5 ),
            Item.of( "minecraft:netherite_scrap" ).withChance( 0.5 ),
            Item.of( "minecraft:string", 2 ).withChance( 0.25 ),
            Item.of( 'minecraft:netherite_upgrade_smithing_template' ).withChance( 0.15 )
        ],
        Item.of( 'horseshoes:netherite_horse_armor' )
    )

    // Fix Netherite Thing
    event.replaceOutput(
        { output: "minecraft:netherite_ingot", type: "minecraft:blasting" },
        "minecraft:netherite_ingot",
        Item.of( "minecraft:netherite_scrap" )
    )
    event.remove( { output: "minecraft:netherite_ingot", type: "minecraft:smelting" } )

    // Simple Hats
    event.recipes.create.crushing(
        Item.of('create:experience_nugget')
            .withChance(0.25),
        'simplehats:hatbag_common'
    )
    event.recipes.create.crushing(
        Item.of('create:experience_nugget')
            .withChance(0.5),
        'simplehats:hatbag_uncommon'
    )
    event.recipes.create.crushing(
        Item.of('create:experience_nugget')
            .withChance(0.75),
        'simplehats:hatbag_rare'
    )
    event.recipes.create.crushing(
        [
            Item.of('create:experience_nugget')
                .withChance(0.75),
            Item.of('create:experience_nugget')
                .withChance(0.5)
        ],
        '#simplehats:epic_hatbag'
    )

})

ServerEvents.tags('item', event => {
    event.add('simplehats:epic_hatbag', 'simplehats:hatbag_epic')
    event.add('simplehats:epic_hatbag', 'simplehats:hatbag_easter')
    event.add('simplehats:epic_hatbag', 'simplehats:hatbag_summer')
    event.add('simplehats:epic_hatbag', 'simplehats:hatbag_halloween')
    event.add('simplehats:epic_hatbag', 'simplehats:hatbag_festive')
})