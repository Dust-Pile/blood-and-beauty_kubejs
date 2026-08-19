//priority: 0

// const MODID = "cm_extended"
// const MODID_ = '' + MODID + ':'

// Item defs for weapon / tools / armor overhaul
StartupEvents.registry('item', event => {
    var materials = global.weaponry.materials
    var itemLists = global.weaponry.castingItems
    var handhelds = itemLists.handheld

    // Molds
    global.forEachIn( handhelds, ( item, name ) => {
        var moldName = 'graphite_' + name + '_mold'
        event.create( MODID_ + moldName, 'basic' )
            .texture('bloodandbeauty:item/molds/' + name + '_graphite_mold' )
        item.moldName = MODID_ + moldName
    } )
    
    console.log( 'Creating Items ====== ')
    global.forEachIn( materials, ( material, matName ) => {

        // Tool Items
        global.forEachIn( handhelds, ( item, name ) => {
            if ( material.toolItems[name] == undefined ) {
                return
            }

            var itemName = matName + '_' + name
            var texturePath = 'bloodandbeauty:item/tools/' + matName + '/'
            if ( material.isStandard ) {
                event.create( MODID_ + 'rough_' + itemName + '_' + item.headSuffix, 'basic')
                    .texture( texturePath + 'rough_' + itemName + '_' + item.headSuffix )
                event.create( MODID_ + itemName + '_' + item.headSuffix, 'basic')
                    .texture( texturePath + itemName + '_' + item.headSuffix )
            }
                
            // Create Tool
            if ( material.toolItems[name].equals('') ) {
                if ( item.type == undefined ) {
                    event.create( MODID_ + itemName, 'basic' )
                        .texture( texturePath + itemName )
                    console.log( ' * Created placeholder for ' + itemName + '.' )
                } else if ( item.type != 'import' ) {
                    event.create( MODID_ + itemName, item.type )
                        .texture( texturePath + itemName )
                        .tier( global.TIERS[matName] )
                } else {
                    if ( typeof item.import == 'string' ) {
                        event.create( MODID_ + itemName, 'basic' )
                            .texture( texturePath + itemName )
                        console.log( ' * Created placeholder for ' + itemName + ' ( requires import ).' )
                    } else {
                        event.createCustom( MODID_ + itemName, () => item.import( matName, material, global.TIERS[matName] ) )
                    }
                }

                material.toolItems[name] = MODID_ + itemName
            }
        })
    } )

    // missing materials
    console.log( 'Filling missing materials:\n ')
    global.forEachIn( materials, ( material, name ) => {
        global.forEachIn( itemLists.crafting, ( itemNames, item ) => {
            if ( material.craftItems[item] == undefined || !material.craftItems[item].equals('') ) {
                return
            }
            var itemName = itemNames[0] + name + itemNames[1]
            var resourceLocation = event.create( MODID_ + itemName, 'basic' )
                .texture( 'bloodandbeauty:item/generated_materials/' + itemName )
            material.craftItems[item] = resourceLocation.id.toString()
            console.log( ' * created: ' + resourceLocation.id.toString() )
        })
    })

})