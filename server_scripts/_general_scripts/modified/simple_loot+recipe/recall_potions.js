ServerEvents.recipes(event => {
    //Change Recall Potion Recipies
    event.remove({ mod: 'recall_potion' })

    //Recall Potion
    event.shapeless(
        Item.of('recall_potion:recall_potion', 3),
        [
          'minecraft:water_bucket',
          'minecraft:amethyst_shard', 	      
          'minecraft:ender_pearl'
        ]
    )
    //Nether Potion
    event.shapeless(
        Item.of('recall_potion:nether_potion', 2),
        [
          'minecraft:honey_bottle',
          'minecraft:magma_cream', 	      
          'minecraft:crimson_fungus',
          'recall_potion:recall_potion'
        ]
    )
    event.shapeless(
        Item.of('recall_potion:nether_potion', 1),
        [
          'minecraft:honey_bottle',
          'minecraft:magma_cream', 	      
          'minecraft:crimson_fungus'
        ]
    )
    //End Potion
    event.shapeless(
        Item.of('recall_potion:end_potion', 2),
        [
          'minecraft:dragon_breath',
          'minecraft:phantom_membrane', 	      
          'minecraft:chorus_fruit',
          'recall_potion:nether_potion'
        ]
    )
    event.shapeless(
        Item.of('recall_potion:end_potion', 1),
        [
          'minecraft:dragon_breath',
          'minecraft:phantom_membrane', 	      
          'minecraft:chorus_fruit'
        ]
    )
})