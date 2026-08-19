ServerEvents.recipes(event => {
    //Make blank rune craftable
    event.recipes.create.compacting(
        'irons_spellbooks:blank_rune',
        [
            Fluid.of('create_wizardry:mana', 1000),
            Item.of('minecraft:smooth_stone', 4),
            'irons_spellbooks:mithril_scrap',
            Item.of('supplementaries:ash', 8),
        ],
        60,
    ).superheated()

    //Fire Ale Recipe with lets do nether vinery (and festive delight)
    event.custom({
        "type": "vinery:wine_fermentation",
        "juice": {
          "type": "red_crimson",
          "amount": 18
        },
        "ingredients": [
          {
            "item": "nethervinery:blazewine_pinot"
          },
          {
            "item": "nethersdelight:propelplant_cane"
          },
          {
            "item": "farmers_delight_christmas_editio:cinnamon"
          }
        ],
        "wine_bottle": {
          "required": true
        },
        "result": {
          "item": "irons_spellbooks:fire_ale",
          "count": 1
        }
      })

    //Get things when you destroy things
    event.recipes.create.crushing(
        Item.of('irons_spellbooks:mithril_scrap')
            .withChance(0.5),
        '#forge:arcane_curios'
    )
    event.recipes.create.crushing(
        Item.of('irons_spellbooks:mithril_scrap')
            .withChance(0.20),
        'irons_spellbooks:silver_ring'
    )
    event.recipes.create.crushing(
        [
        Item.of('irons_spellbooks:mithril_scrap', 2),
        Item.of('irons_spellbooks:mithril_scrap')
            .withChance(0.50),
        ],
        'irons_spellbooks:weapon_parts'
    )
    event.recipes.create.crushing(
        [
            Item.of('irons_spellbooks:weapon_parts'),
            Item.of('irons_spellbooks:mithril_scrap')
                .withChance(0.5),
            Item.of('irons_spellbooks:mithril_scrap')
                .withChance(0.5),
        ],
        'irons_spellbooks:spellbreaker'
    )
    event.recipes.create.crushing(
        Item.of('irons_spellbooks:weapon_parts'),
        'irons_spellbooks:amethyst_rapier'
    )
    event.recipes.create.crushing(
        [
        Item.of('minecraft:netherite_scrap'),
        Item.of('irons_spellbooks:weapon_parts')
            .withChance(0.5),
        Item.of('minecraft:netherite_scrap')
            .withChance(0.5),
        Item.of('minecraft:netherite_scrap')
            .withChance(0.25)
        ],
        'irons_spellbooks:keeper_flamberge'
    )
    
})

ServerEvents.tags('item', event => {
    event.add('forge:arcane_curios', 'irons_spellbooks:emerald_stoneplate_ring')
    event.add('forge:arcane_curios', 'irons_spellbooks:fireward_ring')
    event.add('forge:arcane_curios', 'irons_spellbooks:frostward_ring')
    event.add('forge:arcane_curios', 'irons_spellbooks:cast_time_ring')
    event.add('forge:arcane_curios', 'irons_spellbooks:concentration_amulet')
    event.add('forge:arcane_curios', 'irons_spellbooks:conjurers_talisman')
    event.add('forge:arcane_curios', 'irons_spellbooks:affinity_ring')
    event.add('forge:arcane_curios', 'irons_spellbooks:poisonward_ring')
    event.add('forge:arcane_curios', 'irons_spellbooks:heavy_chain_necklace')
    event.add('forge:arcane_curios', 'irons_spellbooks:cooldown_ring')

})

PlayerEvents.inventoryOpened( 'vinery:fermentation_barrel_gui_handler', event => {
    //remove annoying tags

    let item = event.getInventoryContainer().getSlot(5).getItem()
    if (item.getId().equals('irons_spellbooks:fire_ale')) {
        item.setNbt(item.getNbt().remove('tag'))
    }
})