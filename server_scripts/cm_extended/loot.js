LootJS.modifiers( event => {
    // Add Andesite Alloy
    event.addLootTableModifier('minecraft:chests/abandoned_mineshaft')
        .randomChance(0.3)
        .addLoot(Item.of('create:andesite_alloy', 2))
    event.addLootTableModifier('minecraft:chests/shipwreck_supply')
        .randomChance(0.5)
        .addLoot(Item.of('create:andesite_alloy', 2))
        .randomChance(0.5)
        .addLoot(Item.of('create:andesite_alloy', 3))
    event.addLootTableModifier('minecraft:chests/spawn_bonus_chest')
        .addLoot(Item.of('create:andesite_alloy', 3))
    event.addLootTableModifier('minecraft:chests/village/village_armorer')
        .addLoot(Item.of('create:andesite_alloy', 3))
        .randomChance(0.5)
        .addLoot(Item.of('create:andesite_alloy', 2))
    event.addLootTableModifier('minecraft:chests/village/village_toolsmith')
        .addLoot(Item.of('create:andesite_alloy', 3))
        .randomChance(0.5)
        .addLoot(Item.of('create:andesite_alloy', 2))
    event.addLootTableModifier('minecraft:chests/village/village_weaponsmith')
        .addLoot(Item.of('create:andesite_alloy', 3))
        .randomChance(0.5)
        .addLoot(Item.of('create:andesite_alloy', 2))

    // Replace Materials
    event.addLootTableModifier(/.*/).replaceLoot( 'minecraft:iron_ingot', 'createdeco:industrial_iron_ingot', true )

    // Replace Tools
    const materials = global.weaponry.materials
    const castingItems = global.weaponry.castingItems
    global.forEachIn( castingItems.handheld, ( item, name ) => {
        if ( materials.diamond.toolItems[ name ] == null ) {
            return
        }

        global.forEachIn( castingItems.materials, ( material, matName ) => {
            if ( replacements[ matName ] == null ) {
                return
            }

            for ( var filter of replacements[ matName ] ) {
                event.addLootTableModifier( filter ).replaceLoot( materials.diamond.toolItems[name], materials[ matName ].toolItems[name] )
            }
        })

        event.addLootTableModifier(/.*/).replaceLoot( materials.diamond.toolItems[name], materials.silver.toolItems[name] )
        event.addLootTableModifier(/.*/).replaceLoot( materials.iron.toolItems[name], materials.brass.toolItems[name] )
    })


    global.forEachIn( castingItems.armors, ( name ) => {
        event.addLootTableModifier(/.*/).replaceLoot( materials.diamond.armorItems[name], materials.silver.armorItems[name] )
    })
})

var replacements = {
    "steel": [
        /^betterfortresses:chests/,
        /.*chests.*bastion.*/,
        /.*chests.*nether.*/,
        /.*chests.*piglin.*/
    ],
    "diamond": [
        /.*chests.*ancient.*/,
        /^minecraft:chests\/end.*/,
        /^deeperdarker.*chests.*/,
        /^endlessbiomes.*chests.*/
    ],
    "electrum": [
        "minecraft:chests/woodland_mansion"
    ]

}