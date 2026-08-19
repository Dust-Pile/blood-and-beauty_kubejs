JEIAddedEvents.registerCategories( ( event ) => {
    event.custom( "meds_and_herbs:distillery", ( category ) => {
        const guiHelper = category.jeiHelpers.guiHelper

        category.title( "Distillery Apparatus" )
            .background( guiHelper.drawableBuilder( 
                "bloodandbeauty:textures/gui/distillery.png", 0, 0, 127, 29 )
                .setTextureSize( 127, 29 )
                .build()
            )
            .setWidth( 127 )
            .setHeight( 29 )
            .icon( guiHelper.createDrawableItemStack( Item.of( 'meds_and_herbs:distillery_apparatus' ) ) )
            // Set the callback function that will verify if a recipe is a valid recipe for this category.
            .isRecipeHandled( ( recipe ) => {
                return recipe.data != null && recipe.data.type != null && recipe.data.type.equals( "disitllery" )
            })
            // Set the callback function that will allow JEI to index this recipe and determine
            // what the inputs and outputs of each recipe are.
            .handleLookup( ( builder, recipe, focuses ) => {
                handleDistillery( category.jeiHelpers, builder, recipe, focuses )
            })
            // Set the callback function for rendering additional detials to the screen.
            .setDrawHandler( ( recipe, recipeSlotsView, guiGraphics, mouseX, mouseY ) => {
                guiHelper.createAnimatedRecipeArrow( 1 ).draw( guiGraphics, 70, 6 )
            })
    })
})

JEIAddedEvents.registerRecipeCatalysts( event => {
    let addRecipeCatalyst = 'addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])'
    let recipeType = event.data.jeiHelpers.getRecipeType( "meds_and_herbs:distillery" ).get()
    event.data[addRecipeCatalyst]( 'meds_and_herbs:distillery_apparatus', recipeType )
})

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.IRecipeLayoutBuilder} builder 
 * @param {Internal.CustomJSRecipe} recipe 
 * @param {Internal.IFocusGroup} focuses 
 */
function handleDistillery( jeiHelpers, builder, recipe, focuses ) {
    //Main Things
    builder.addSlot( "input", 2, 6 ).addItemStack( Item.of( recipe.data.inputs[0], recipe.data.count ) )
    builder.addSlot( "output", 104 , 6 ).addItemStack( Item.of( recipe.data.output, 1 ) )
    if ( recipe.data.inputs.length > 1 ) {
        builder.addSlot( "input", 20, 6 ).addItemStack( Item.of( recipe.data.inputs[1], 1 ) )
    }

    //Related Items
    builder.addSlot( "input", 46, 6 ).addItemStack( Item.of( 'meds_and_herbs:empty_bottle_clean', 1 ) )

    //Beverage
    if ( recipe.data.output.equals( 'meds_and_herbs:alcohol_methanol' ) ) {
        builder.addInvisibleIngredients( 'output' ).addItemStack( Item.of( 'meds_and_herbs:distilled_leftovers' ) )
        builder.addInvisibleIngredients( 'output' ).addItemStack( Item.of( 'meds_and_herbs:beveragebucket' ) )
    } else if ( recipe.data.output.equals( 'meds_and_herbs:alcohol_ethanol' ) ) {
        builder.addInvisibleIngredients( 'output' ).addItemStack( Item.of( 'meds_and_herbs:distilled_leftovers' ) )
        builder.addInvisibleIngredients( 'output' ).addItemStack( Item.of( 'minecraft:water_bucket' ) )
    }
    
}

// Recipes
JEIAddedEvents.registerRecipes( event => {
    event.custom( "meds_and_herbs:distillery" )
        .add( distilleryRecipe( [ 'meds_and_herbs:belladonna_poison', 'meds_and_herbs:poison' ], 'meds_and_herbs:poison_hpp' ) )
        .add( distilleryRecipe( [ 'meds_and_herbs:alcohol_ethanol', 'meds_and_herbs:bottled_adrenaline_blood' ], 'meds_and_herbs:medicine_adrenaline' ) )
        .add( distilleryRecipe( [ 'meds_and_herbs:bottled_poison_blood',  'meds_and_herbs:alcohol_ethanol'], 'meds_and_herbs:medicine_antidote' ) )
        .add( distilleryRecipe( [ 'meds_and_herbs:bottled_hpp_blood', 'meds_and_herbs:medicine_antidote' ], 'meds_and_herbs:medicine_hpa' ) )
        .add( distilleryRecipe( [ 'meds_and_herbs:extract_opium', 'meds_and_herbs:alcohol_ethanol' ], 'meds_and_herbs:medicine_mophine' ) )
        .add( distilleryRecipe( [ 'meds_and_herbs:penicillium_coal_powder', 'meds_and_herbs:alcohol_ethanol' ], 'meds_and_herbs:medicine_penicillin', 4 ) )
        .add( distilleryRecipe( [ 'meds_and_herbs:beveragebucket' ], 'meds_and_herbs:alcohol_ethanol' ) )
        .add( distilleryRecipe( [ 'meds_and_herbs:raw_beverage_bucket' ], 'meds_and_herbs:alcohol_methanol' ) )
})
function distilleryRecipe( inputs, output, count ) {
    return { type: "disitllery", inputs: [ inputs[ 0 ], inputs[ 1 ] ], output: output, count: count == null ? 1 : count }
}
