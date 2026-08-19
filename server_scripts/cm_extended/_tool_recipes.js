// priority: 1

const MODID = "cm_extended"
const MODID_ = MODID + ':'

const recipeTemplates = global.weaponry.recipeTemplates
const materials = global.weaponry.materials
const itemLists = global.weaponry.castingItems
const handhelds = itemLists.handheld

ServerEvents.tags( 'item', event => {
    // Molds
    event.add('forge:graphite_molds', new RegExp( MODID_ + 'graphite_.*_mold' ) )
    // Hammers
    event.add('forge:tools/hammers', new RegExp( MODID_ + '.*hammer$' ) )

    global.forEachIn( handhelds, ( item, name ) => {
        global.forEachIn( materials, ( material, matName ) => {
            for ( var tag of item.tags ) {
                event.add( tag, MODID_ + matName + '_' + name )
            }
        })
    })
})

ServerEvents.recipes( event => {
    // All normal tools, parts, and molds
    global.forEachIn( handhelds, ( item, name ) => {
        //graphite molds
        event.stonecutting(item.moldName, 'createmetallurgy:graphite_blank_mold')

        //normal tools / weapons and parts
        global.forEachIn( materials, ( material, matName ) => {
            if ( !material.isStandard || material.toolItems[name] == undefined ) {
                return //basically 'continue'
            }

            var itemName = matName + '_' + name
            // Casting
            event.recipes.createmetallurgy.casting_in_table(
                Item.of( MODID_ + 'rough_' + itemName + '_' + item.headSuffix),
                [
                    Fluid.of( material.fluid, item.fluidAmount * material.requiredMaterialMult ),
                    Item.of( item.moldName )
                ],
                60 * material.processingTimeMult
            )
            event.recipes.create.sandpaper_polishing( 
                MODID_ + itemName + '_' + item.headSuffix,
                MODID_ + 'rough_' + itemName + '_' + item.headSuffix,
                50 * material.processingTimeMult
            )
            // Tool crafting
            var layout = []
            switch ( item.handle ) {
                case MODID_ + 'tool_handle':
                case 'minecraft:stick':
                    if ( item.nailPos.equals('top') ) { layout.push('A') }
                    layout.push( 'B' + ( item.nailPos.equals('side') ? 'A' : '' ) )
                    layout.push( 'C' + ( item.nailPos.equals('side') ? ' ' : '' ) )
                    break
                case MODID_ + 'fine_handle':
                    layout.push( 'B' + ( item.nailPos.equals('side') ? ' ' : '' ) )
                    layout.push( 'C' + ( item.nailPos.equals('side') ? 'A' : '' ) )
                    if ( item.nailPos.equals('bottom') ) { layout.push('A') }
                    break
                case MODID_ + 'pole':
                    layout = [
                        ' AB',
                        ' C ',
                        'C  '
                    ]
                    break
            }
            var keys = {
                A: 'cgs:nail',
                B: MODID_ + itemName + '_' + item.headSuffix,
                C: item.handle.equals( MODID_ + 'pole' ) ? MODID_ + 'tool_handle' : item.handle
            }
            if ( item.nailPos.equals('none') ) {
                delete keys.A
            }

                // Remove previous recipes
            var templates = global.weaponry.recipeTemplates
            if ( !material.toolItems[name].split(':')[0].equals( 'cm_extended' ) ) {
                event.remove( { output: material.toolItems[name] } )
            }
            if ( material.craftOverride( item, name ) && templates[ name ] != null ) {
                templates[ name ]( event, material.craftItems.ingot, material.toolItems[name] )
            }

            event.shaped(
                material.toolItems[name],
                layout,
                keys
            )
        })
    })

    // Netherite
    global.forEachIn( handhelds, ( item, name ) => {
        const netherite = materials.netherite
        const netheriteTools = netherite.toolItems
        if ( netheriteTools[name] == null ) {
            return
        }

        // Don't remove armor until we implement it...
        event.remove({ type: 'minecraft:smithing_transform', output: netheriteTools[name] })
        event.recipes.createmetallurgy.casting_in_table(
            Item.of( netheriteTools[name], 1 ),
            [
                Item.of( materials.tungsten.toolItems[name] ),
                Fluid.of( netherite.fluid, 90 )
            ],
            60 * netherite.processingTimeMult,
            true
        )
    })

    // Remove Diamond Recipes
    global.forEachIn( handhelds, ( item, name ) => {
        if ( materials.diamond.toolItems[name] != null ) {
            event.remove( { output: materials.diamond.toolItems[name] } )
        }
    })
    global.forEachIn( itemLists.armors, ( name ) => {
        if ( materials.diamond.armorItems[name] != null ) {
            event.remove( { output: materials.diamond.armorItems[name] } )
        }
    })

    // Other Tools
    event.shaped(
        Item.of('cm_extended:stone_hammer'),
        [
            'AAA',
            'AAA',
            ' B '
        ],
        {
            A: '#quark:stone_tool_materials',
            B: 'minecraft:stick'
        }
    )
})

// Load bearing coconut: improper items must be made for some reason.
//  Replace at server startup for proper recipes.
global.weaponry.materials.copper.toolItems = {
    sword: "minecraft:copper_sword",
    hoe: "minecraft:copper_hoe",
    axe: "minecraft:copper_axe",
    pick: "minecraft:copper_pickaxe",
    shovel: "minecraft:copper_shovel",
    knife: "create_things_and_misc:copper_knife",
    pickaxe: 'cm_extended:copper_pickaxe',
    pickadze: 'cm_extended:copper_pickadze',
    grubhoe: 'cm_extended:copper_grubhoe',
    dagger: 'cm_extended:copper_dagger',
    katana: 'cm_extended:copper_katana',
    rapier: 'cm_extended:copper_rapier',
    spear: "minecraft:copper_spear",
    glaive: 'cm_extended:copper_glaive',
    hammer: 'cm_extended:copper_hammer'
}