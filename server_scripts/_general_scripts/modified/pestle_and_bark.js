//create / modify recipes
ServerEvents.recipes( event => {
    //Meds and Herbs powders
    {
        event.recipes.farmersdelight.cutting(
            'meds_and_herbs:aloe_leaves',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_aloe', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'meds_and_herbs:artemisia_leaves',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_artemisia', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'meds_and_herbs:belladonna_leaves',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_belladonna', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'meds_and_herbs:chamomile_flowers',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_chamomile', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'minecraft:charcoal',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_charcoal', 1)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'minecraft:cocoa_beans',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_cocoa', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'meds_and_herbs:bouquet',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_herbal', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'minecraft:kelp',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_kelp', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'meds_and_herbs:opium_poppies',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_opium', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            '#meds_and_herbs:shrooms',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_shrooms', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'minecraft:sugar_cane',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_sugarcane', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'meds_and_herbs:sweet_clover_flowers',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_sweet_clover', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'meds_and_herbs:vinca_leaves',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_vinca', 1).withChance(0.25)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'farmersdelight:tree_bark',
            '#forge:tools/knives', 
            [ 
                Item.of('meds_and_herbs:powder_wood', 1)
            ],
        )
    }
    
    //remove mortar and pestle
    event.remove({ output: "meds_and_herbs:grinder" })
    event.replaceInput(
        { Input: "meds_and_herbs:bark_acacia" },
        "meds_and_herbs:bark_acacia",
        "farmersdelight:tree_bark"
    )
    event.replaceInput(
        { Input: "immersive_weathering:oak_bark" },
        "immersive_weathering:oak_bark",
        "farmersdelight:tree_bark"
    )
    // event.remove({ id: /^immersive_weathering:.*unstrip/ })
    // event.remove({ id: 'immersive_weathering:oak_wood_from_bark' })

    //Hexalia remove normal recipe
    event.remove({ input: 'hexalia:mortar_and_pestle' })
    //Hexalia powders and pastes
    {
        event.recipes.farmersdelight.cutting(
            'hexalia:saltsprout',
            '#forge:tools/knives', 
            [ 
                Item.of('vintagedelight:salt_dust', 1)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'hexalia:silk_fiber',
            '#forge:tools/knives', 
            [ 
                Item.of('minecraft:string', 3)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'hexalia:ghost_fern',
            '#forge:tools/knives', 
            [ 
                Item.of('hexalia:ghost_powder', 1)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'hexalia:siren_kelp',
            '#forge:tools/knives', 
            [ 
                Item.of('hexalia:siren_paste', 1)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'hexalia:dreamshroom',
            '#forge:tools/knives', 
            [ 
                Item.of('hexalia:dream_paste', 1)
            ],
        )
        event.recipes.farmersdelight.cutting(
            'hexalia:spirit_bloom',
            '#forge:tools/knives', 
            [ 
                Item.of('hexalia:spirit_powder', 1)
            ],
        )
    }
    //remove hexalia mortar and pestle
    event.remove({ output: "hexalia:mortar_and_pestle" })

    for ( var log of extraLogs ) {
        event.recipes.farmersdelight.cutting(
            log,
            '#minecraft:axes',
            [ 
                Item.of( log.split(':')[0] + ':stripped_' + log.split(':')[1], 1 ),
                Item.of( "farmersdelight:tree_bark", 1 )
            ],
        )
    }

    event.remove({ output: "create:andesite_casing" })
    event.remove({ output: "create:brass_casing" })
    event.recipes.create.item_application(
        "create:andesite_casing",
        [
            "#bloodandbeauty:stripped_logs",
            "create:andesite_alloy"
        ]
    )
    event.recipes.create.item_application(
        "create:brass_casing",
        [
            "#bloodandbeauty:stripped_logs",
            "create:brass_ingot"
        ]
    )

})

//Remove meds bark drops
BlockEvents.rightClicked( event => {
    const { block, facing } = event

    if ( !event.getItem().hasTag('minecraft:axes') || !block.hasTag( "bloodandbeauty:strippable" ) ) {
        return
    }

    block.popItemFromFace( 'farmersdelight:tree_bark', facing )
})

EntityEvents.spawned( 'item', event => {
    const { entity } = event
    var item = entity.item

    if ( !item.hasTag('meds_and_herbs:bark') ) {
        return
    }

    entity.item = 'minecraft:air'
})

const stripped = Ingredient.of( /.*stripped.*/ )
const hollow = Ingredient.of( /.*hollow.*/ )
ServerEvents.tags( "item", event => {
    event.add( "meds_and_herbs:bark", /^meds_and_herbs:bark.*/ )

    console.info(event.get("meds_and_herbs:bark").entries)

    for( var item of event.get( 'minecraft:logs' ).getObjectIds() ) {
        if ( stripped.test( item ) ) {
            event.add( "bloodandbeauty:stripped_logs", item )
        }
    }
})
ServerEvents.tags( "block", event => {
    for( var block of event.get( 'minecraft:logs' ).getObjectIds() ) {
        if ( stripped.test( block ) || hollow.test( block ) ) {
            continue
        }

        event.add( "bloodandbeauty:strippable", block )
    }
})

// Data
var extraLogs = [
    "quark:blossom_log","quark:azalea_log","quark:ancient_log","biomesoplenty:hellbark_wood","biomesoplenty:empyreal_wood",
    "hexerei:mahogany_wood","hexerei:willow_wood","hexerei:witch_hazel_wood","hexerei:willow_log","hexerei:witch_hazel_log",
    "hexerei:mahogany_log","biomesoplenty:fir_wood","biomesoplenty:pine_wood","biomesoplenty:maple_wood",
    "biomesoplenty:redwood_wood","biomesoplenty:empyreal_log","biomesoplenty:dead_wood","biomesoplenty:mahogany_wood",
    "biomesoplenty:jacaranda_wood","biomesoplenty:mahogany_log","biomesoplenty:jacaranda_log","biomesoplenty:palm_log",
    "biomesoplenty:willow_log","biomesoplenty:dead_log","biomesoplenty:umbran_log","biomesoplenty:magic_wood",
    "biomesoplenty:palm_wood","biomesoplenty:willow_wood","biomesoplenty:fir_log","biomesoplenty:pine_log",
    "biomesoplenty:maple_log","biomesoplenty:redwood_log","biomesoplenty:magic_log","biomesoplenty:hellbark_log",
    "biomesoplenty:umbran_wood"
]