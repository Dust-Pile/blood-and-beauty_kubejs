ServerEvents.tags('item', event => {

    event.add('forge:rotten_flesh', 'minecraft:rotten_flesh', 'irons_spellbooks:hogskin')

    event.add('forge:cattails', 'projectvibrantjourneys:cattail', 'biomesoplenty:cattail')

})

LootJS.modifiers(event => {

    //Entities who would have dropped leather drop 'Raw Hide'
    event.addLootTableModifier(/^.*:entities\/.*/).replaceLoot("minecraft:leather", "bloodandbeauty:raw_hide");

    //Hoglins
    //Do not drop 'irons_spellbooks:hogskin'
    event.addLootTableModifier('minecraft:entities/hoglin').removeLoot('irons_spellbooks:hogskin');
    //Drop less 'cold_sweat:hoglin_hide'
    event.addLootTableModifier('minecraft:entities/hoglin').removeLoot('cold_sweat:hoglin_hide');
    event.addLootTableModifier('minecraft:entities/hoglin').addAlternativesLoot(
        LootEntry.of('cold_sweat:hoglin_hide').when((c) => c.randomChance(0.5))
    );
})

ServerEvents.recipes(event => {

    // Stripped Bamboo Recipes
    {
        //crafting recipes
        event.recipes.farmersdelight.cutting(
            "minecraft:stripped_bamboo_block",
            '#forge:tools/knives', // tool
            [ // results
                Item.of("bloodandbeauty:stripped_bamboo", 9),
            ],
            ''
        )
        event.recipes.farmersdelight.cutting(
            'minecraft:bamboo',
            '#forge:tools/knives', // tool
            [ // results
                Item.of("bloodandbeauty:stripped_bamboo"),
                Item.of('farmersdelight:straw')
                    .withChance(0.112)
            ],
            ''
        )
        //quiver recipe
        event.shaped(
            Item.of('supplementaries:quiver', 1),
            [
                "  A",
                " BC",
                "DC "
            ],
            {
                A:"minecraft:string",
                B:"bloodandbeauty:stripped_bamboo",
                C:"minecraft:leather",
                D:'#bloodandbeauty:tough_ironlike_nugget'
            }
        )
        // Chime recipe
        event.shaped(
            Item.of( 'chimes:carved_bamboo_chimes', 1 ),
            [
                'A',
                'B',
                'C'
            ],
            {
                A: '#minecraft:wooden_slabs',
                B: "minecraft:string",
                C: 'bloodandbeauty:stripped_bamboo'
            }
        )
        //reversed craft
        event.shapeless(
            "minecraft:stripped_bamboo_block",
            [
                "9x bloodandbeauty:stripped_bamboo"
            ]
        )
    }

    // Hide Recipes
    {
        //'Raw Hide' -> 'Dry Hide'
        event.smelting('bloodandbeauty:dry_hide', 'bloodandbeauty:raw_hide')
        event.smoking('bloodandbeauty:dry_hide', 'bloodandbeauty:raw_hide')
        event.campfireCooking('bloodandbeauty:dry_hide', 'bloodandbeauty:raw_hide', 0.35, 600)
        //'Dry Hide' -> 'Leather'
        event.recipes.farmersdelight.cutting(
            'bloodandbeauty:dry_hide',
            '#forge:tools/knives', // tool
            [ // results
                Item.of('minecraft:leather', 1),
                Item.of('minecraft:leather')
                    .withChance(0.5),
                Item.of('minecraft:leather')
                    .withChance(0.5)
            ],
            ''
        );

        //Hoglin Balance
        //Remove Recipes
        event.remove({ input: 'nethersdelight:hoglin_hide', output: 'minecraft:leather' })
        event.remove({ input: 'cold_sweat:hoglin_hide', output: 'minecraft:leather' })
        event.remove({ input: 'irons_spellbooks:hogskin', output: 'minecraft:leather' })
        //Cutting 'nethersdelight:hoglin_hide' gives 2-4 'cold_sweat:hoglin_hide'
        event.recipes.farmersdelight.cutting(
            'nethersdelight:hoglin_hide',
            '#forge:tools/knives', // tool
            [ // results
                Item.of('cold_sweat:hoglin_hide', 2),
                Item.of('cold_sweat:hoglin_hide')
                    .withChance(0.5),
                Item.of('cold_sweat:hoglin_hide')
                    .withChance(0.25)
            ],
            ''
        );
        //Cutting 'cold_sweat:hoglin_hide' gives 1 leather and 0.5 'irons_spellbooks:hogskin'
        event.recipes.farmersdelight.cutting(
            'cold_sweat:hoglin_hide',
            '#forge:tools/knives', // tool
            [ // results
                Item.of('minecraft:leather', 1),
                Item.of('irons_spellbooks:hogskin')
                    .withChance(0.5)
            ],
            ''
        );
        //'irons_spellbooks:hogskin' usable as rotten flesh
        event.replaceInput(
            { input: 'minecraft:rotten_flesh' }, 
            'minecraft:rotten_flesh',            
            '#forge:rotten_flesh'         
        )
    }

    // Cattail Recipes
    {
        //cattail_stalk
        event.recipes.farmersdelight.cutting(
            '#forge:cattails',
            '#forge:tools/knives', // tool
            [ // results
                Item.of('bloodandbeauty:cattail_stalk', 3)
            ],
            ''
        )
        //cooked_cattail_stalk
        event.smelting('bloodandbeauty:cooked_cattail_stalk', 'bloodandbeauty:cattail_stalk')
        event.smoking('bloodandbeauty:cooked_cattail_stalk', 'bloodandbeauty:cattail_stalk')
        event.campfireCooking('bloodandbeauty:cooked_cattail_stalk', 'bloodandbeauty:cattail_stalk', 0.35, 600)
        //fried_cattail_stalk
        event.recipes.farmersdelight.cooking(
            ['bloodandbeauty:cattail_stalk','culturaldelights:corn_dough','delightful:animal_oil_bottle'],
            'bloodandbeauty:fried_cattail_stalk', // output
            1, // exp
            200 // cookTime
        )
    }
})

//Get item from stripping bamboo
BlockEvents.rightClicked( 'minecraft:bamboo', event => {
    let player = event.getPlayer()
    let handItem = player.getMainHandItem()
    if (!handItem.hasTag('minecraft:axes')) {
        event.exit()
    }

    player.swing()
    player.damageEquipment('mainhand')

    let block = event.getBlock()
    block.popItem(Item.of('bloodandbeauty:stripped_bamboo'))
    block.set('minecraft:air')
    let loc = global.new.point(block.getX(), block.getY(), block.getZ())
    global.run('playsound minecraft:block.bamboo.break block @a '+loc.toCommandString()+' 1 1')
    global.run('playsound minecraft:item.axe.strip block @a '+loc.toCommandString()+' 1 1')
})

function enableBonemealCopy( blockID, item ) {
    BlockEvents.rightClicked( blockID, event => {
        if (event.getItem().is( 'minecraft:bone_meal' )) {
            var block = event.getBlock()
            block.popItem( Item.of( item, 1 ) )
            event.getItem().shrink( 1 )

            global.playsoundOnBlock( block, 'minecraft:item.bone_meal.use' )
            global.runAt( event.level, block.pos, 'particle minecraft:egg_crack ~ ~0.4 ~ 0.25 0.25 0.25 1 20')
        }
    })
}

ItemEvents.foodEaten( "bloodandbeauty:cattail_stalk", event => {
    let name = event.getPlayer().getUsername()
    global.run('damage '+name+' 2 minecraft:player_explosion by '+name)
    global.run('execute at '+name+' run particle minecraft:spit ^ ^1.62 ^0.2 0.3 0.3 .3 0 20')
    global.run('execute at '+name+' run playsound minecraft:block.snow.break player @a ~ ~ ~ 10 0.9')
})

// Data
/** 
 * List of elements to be used by enableBonemealCopy
 * 
 * Input string arrays in ['<block>','<item>'] form where '<item>' is optional
 *  '<item>' can be used when the block and item have different names.
 * format: [['<block>', '<item>'],[<block>]...]
*/
let TO_BONEMEAL_COPY = [
    ['projectvibrantjourneys:cattail'],
    ['biomesoplenty:cattail'],
    ['projectvibrantjourneys:reeds'],
    ['projectvibrantjourneys:sea_oats'],
    ['biomesoplenty:sea_oats'],
    ['biomesoplenty:barley'],
    ['biomesoplenty:dune_grass'],
    ['projectvibrantjourneys:beach_grass'],
    ['biomesoplenty:sprout']
]

for (var i = 0; i < TO_BONEMEAL_COPY.length; i++) {
    let item = TO_BONEMEAL_COPY[i]

    if (item.length == 1) {
        enableBonemealCopy(item[0], item[0])
    } else if (item.length >= 2){
        enableBonemealCopy(item[0], item[1])
    }
}