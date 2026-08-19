ItemEvents.rightClicked( 'meadow:wooden_bucket', event => {
    const { player, hand } = event

    var hitResult = player.rayTrace( player.blockReach, true )
    if ( hand.toString().equals( "OFF_HAND" ) 
        || !hitResult.type.toString().equals( "BLOCK" ) 
        || !hitResult.block.id.equals( 'create:basin' ) 
    ) {
        return
    }

    var basin = hitResult.block
    player.swing( 'main_hand', true )
    
    var nbt = basin.entityData
    var length = nbt.InputTanks.length
    var fluid = "water"
    var i
    for ( i = 0; i < length; i++ ) {
        var tank = nbt.InputTanks[i].TankContent
        if ( tank.FluidName.equals( "minecraft:water" ) && tank.Amount == 1000 ) {
            nbt.InputTanks.remove( i )
            basin.setEntityData( nbt )
            break
        } else if ( tank.FluidName.equals( "minecraft:milk" ) && tank.Amount == 1000 ) {
            fluid = 'milk'
            nbt.InputTanks.remove( i )
            basin.setEntityData( nbt )
            break
        }
    }
    if ( !( i >= length ) ) {
        if ( !player.creative ) {
            if ( player.mainHandItem.count > 1 ) {
                player.give( Item.of( 'meadow:wooden_' + fluid + '_bucket', 1 ) )
                player.mainHandItem.shrink( 1 )
            } else {
                player.setMainHandItem( Item.of( 'meadow:wooden_' + fluid + '_bucket', 1 ) )
            }
        }
    }

    event.cancel()
})

ServerEvents.recipes( event => {

    // Create compats
    event.recipes.create.emptying(
        [
            Fluid.of( 'minecraft:water', 1000 ),
            'meadow:wooden_bucket'
        ],
        'meadow:wooden_water_bucket'
    )
    event.recipes.create.emptying(
        [
            Fluid.of( 'minecraft:milk', 1000 ),
            'meadow:wooden_bucket'
        ],
        'meadow:wooden_milk_bucket'
    )
    event.recipes.create.filling(
        'meadow:wooden_water_bucket',
        [
            Fluid.of( 'minecraft:water', 1000 ),
            'meadow:wooden_bucket'
        ]
    )
    event.recipes.create.filling(
        'meadow:wooden_milk_bucket',
        [
            Fluid.of( 'minecraft:milk', 1000 ),
            'meadow:wooden_bucket'
        ]
    )

    // Standard Meadow Recipes
    event.remove( { output: 'meadow:cooking_cauldron' } )
    event.remove( { output: 'meadow:fondue' } )

    event.replaceInput(
        { input: "meadow:limestone_bricks" },
        "meadow:limestone_bricks",
        "#minecraft:terracotta"
    )

    event.shaped(
        Item.of( 'meadow:fondue' ),
        [
            'BAB',
            'BBB'
        ],
        {
            A: 'handcrafted:terracotta_wide_pot',
            B: 'create:copper_nugget'
        }
    )

    event.recipes.farmersdelight.cooking(
        [
            'minecraft:amethyst_cluster',
            'vintagedelight:salt_dust',
            '#c:milk'
        ],
        Item.of( 'meadow:wooden_amethyst_milk_bucket' ),
        1,
        200,
        'meadow:wooden_bucket'
    )

    event.recipes.farmersdelight.cooking(
        [
            'minecraft:baked_potato',
            'minecraft:rabbit',
            'minecraft:carrot',
            '#meadow:cheese'
        ],
        Item.of( 'minecraft:rabbit_stew' ),
        1,
        200,
        'minecraft:bowl'
    )

    event.recipes.farmersdelight.cooking(
        [
            'vintagedelight:raw_oats',
            'vintagedelight:raw_oats',
            'vintagedelight:raw_oats'
        ],
        Item.of( 'meadow:wooden_grain_milk_bucket' ),
        0.5,
        200,
        'meadow:wooden_water_bucket'
    )

    event.recipes.farmersdelight.cooking(
        [
            '#forge:eggs',
            'vintagedelight:salt_dust'
        ],
        Item.of( 'meadow:rennet' ),
        0.5,
        200,
        'minecraft:glass_bottle'
    )

    event.recipes.farmersdelight.cooking(
        [
            'meadow:raw_buffalo_meat',
            '#meadow:cheese',
            'veggiesdelight:garlic'
        ],
        Item.of( 'meadow:sausage_with_cheese' ),
        0.5,
        200,
        'minecraft:bowl'
    )

    event.recipes.farmersdelight.cooking(
        [
            'meadow:raw_buffalo_meat',
            'farmersdelight:onion',
            'minecraft:potato'
        ],
        Item.of( 'meadow:roasted_ham' ),
        0.5,
        200,
        'minecraft:bowl'
    )
})