// Bundle Recipes
ServerEvents.recipes( event => {

    event.remove({ output: /metalbundles:.*bundle/ })

    bundleUpgrade( "minecraft:bundle", "metalbundles:copper_bundle", 'minecraft:copper_ingot' )
    bundleUpgrade( "metalbundles:copper_bundle", "metalbundles:iron_bundle", 'minecraft:iron_ingot' )
    bundleUpgrade( "metalbundles:iron_bundle", "metalbundles:golden_bundle", 'minecraft:gold_ingot' )
    bundleUpgrade( "metalbundles:golden_bundle", "metalbundles:diamond_bundle", 'minecraft:diamond' )

    event.smithing(
        Item.of( "metalbundles:netherite_bundle" ),
        'minecraft:netherite_upgrade_smithing_template',
        'minecraft:netherite_ingot',
        "metalbundles:diamond_bundle"
    )

    /** Generic Upgrade
     * 
     * @param { Internal.Item_ } bundleID 
     * @param { Internal.Item_ } outputID 
     * @param { Internal.Item_ } materialID 
     */
    function bundleUpgrade( bundleID, outputID, materialID ) {
        event.shaped(
            Item.of( outputID, 1 ),
            [
                ' A ',
                'ABA',
                ' A '
            ],
            {
                A: materialID,
                B: bundleID
            }
        ).modifyResult( ( grid, item ) => {
            var originalBundle = grid.find( bundleID )
            return Item.of( outputID, 1, originalBundle.nbt )
        })
    }
})

