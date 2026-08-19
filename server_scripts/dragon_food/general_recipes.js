var slug = 'dragon_delight:'

ServerEvents.recipes( event => {
    //round cutting
    event.recipes.farmersdelight.cutting(
        'dragon_delight:dragon_round',
        '#forge:tools/cleavers',
        [
            Item.of( 'dragon_delight:dragon_steak', 2 ),
            'minecraft:bone',
            'irons_spellbooks:dragonskin',
            Item.of( 'minecraft:bone_meal' ).withChance(0.5)
        ]
    )
    event.recipes.farmersdelight.cutting(
        'dragon_delight:clean_dragon_round',
        '#forge:tools/cleavers',
        [
            Item.of( 'dragon_delight:clean_dragon_steak', 2 ),
            'minecraft:bone',
            'irons_spellbooks:dragonskin',
            Item.of( 'minecraft:bone_meal' ).withChance(0.5)
        ]
    )

    //Steak Cutting
    event.recipes.farmersdelight.cutting(
        'dragon_delight:dragon_steak',
        '#forge:tools/knives',
        [
            Item.of( 'dragon_delight:dragon_filet', 2 ),
            Item.of( 'minecraft:bone_meal' ).withChance(0.25)
        ]
    )
    event.recipes.farmersdelight.cutting(
        'dragon_delight:clean_dragon_steak',
        '#forge:tools/knives',
        [
            Item.of( 'dragon_delight:clean_dragon_filet', 2 ),
            Item.of( 'minecraft:bone_meal' ).withChance(0.25)
        ]
    )
    event.recipes.farmersdelight.cutting(
        'dragon_delight:cooked_dragon_steak',
        '#forge:tools/knives',
        [
            Item.of( 'dragon_delight:cooked_dragon_filet', 2 ),
            Item.of( 'minecraft:bone_meal' ).withChance(0.25)
        ]
    )

    //Mince
    event.recipes.farmersdelight.cutting(
        'dragon_delight:clean_dragon_filet',
        '#forge:tools/knives',
        [
            'dragon_delight:dragon_mince'
        ]
    )

    //Normal Cooking
    event.smelting( 'dragon_delight:cooked_dragon_steak', 'dragon_delight:dragon_steak' ).xp(2)
    event.smelting( 'dragon_delight:cooked_dragon_filet', 'dragon_delight:dragon_filet' ).xp(1)
    event.smelting( 'dragon_delight:dragon_patty', 'dragon_delight:dragon_mince' ).xp(1)

    event.smoking( 'dragon_delight:cooked_dragon_steak', 'dragon_delight:dragon_steak' ).xp(2)
    event.smoking( 'dragon_delight:cooked_dragon_filet', 'dragon_delight:dragon_filet' ).xp(1)
    event.smoking( 'dragon_delight:dragon_patty', 'dragon_delight:dragon_mince' ).xp(1)

    event.campfireCooking( 'dragon_delight:cooked_dragon_steak', 'dragon_delight:dragon_steak' ).xp(2)
    event.campfireCooking( 'dragon_delight:cooked_dragon_filet', 'dragon_delight:dragon_filet' ).xp(1)
    event.campfireCooking( 'dragon_delight:dragon_patty', 'dragon_delight:dragon_mince' ).xp(1)

    //Crafting
    event.shapeless(
        Item.of( "dragon_delight:dragon_burger", 1 ),
        [
            "#forge:bread",
            "#forge:bread",
            "dragon_delight:dragon_patty",
            "minecraft:chorus_fruit",
            "#forge:crops/cabbage",
            "#forge:crops/tomato",
            "vintagedelight:pickled_onion"
        ]
    )
})

ServerEvents.tags( 'item', event => {
    //Cleaver Tool
    event.add( 'forge:tools/cleavers', /_cleaver$/ )
    event.remove( 'forge:tools/cleavers', 'sons_of_sins:butcher_cleaver' )
})