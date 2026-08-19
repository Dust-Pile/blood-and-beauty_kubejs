JEIAddedEvents.registerCategories( ( event ) => {
    event.custom( "meds_and_herbs:boiling_flask", ( category ) => {
        const guiHelper = category.jeiHelpers.guiHelper

        category.title( "Boiling Flask" )
            .background( guiHelper.drawableBuilder( 
                "bloodandbeauty:textures/gui/boiling_flask.png", 0, 0, 127, 39 )
                .setTextureSize( 127, 39 )
                .build()
            )
            .setWidth( 127 )
            .setHeight( 39 )
            .icon( guiHelper.createDrawableItemStack( Item.of( 'meds_and_herbs:boiling_flask' ) ) )
            // Set the callback function that will verify if a recipe is a valid recipe for this category.
            .isRecipeHandled( ( recipe ) => {
                return recipe.data != null && recipe.data.type != null && recipe.data.type.equals( "boiling_flask" )
            })
            // Set the callback function that will allow JEI to index this recipe and determine
            // what the inputs and outputs of each recipe are.
            .handleLookup( ( builder, recipe, focuses ) => {
                handleBoilingFlask( category.jeiHelpers, builder, recipe, focuses )
            })
            // Set the callback function for rendering additional detials to the screen.
            .setDrawHandler( ( recipe, recipeSlotsView, guiGraphics, mouseX, mouseY ) => {
                guiHelper.createAnimatedRecipeArrow( 1 ).draw( guiGraphics, 70, 11 )
            })
    })
})

JEIAddedEvents.registerRecipeCatalysts( event => {
    let addRecipeCatalyst = 'addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])'
    let recipeType = event.data.jeiHelpers.getRecipeType( "meds_and_herbs:boiling_flask" ).get()
    event.data[addRecipeCatalyst]( 'meds_and_herbs:boiling_flask', recipeType )
})

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.IRecipeLayoutBuilder} builder 
 * @param {Internal.CustomJSRecipe} recipe 
 * @param {Internal.IFocusGroup} focuses 
 */
function handleBoilingFlask( jeiHelpers, builder, recipe, focuses ) {
    //Main Things
    builder.addSlot( "input", 2, 2 ).addItemStack( Item.of( recipe.data.input, 4 ) )
    builder.addSlot( "output", 104 , 11 ).addItemStack( Item.of( recipe.data.output, 1 ) )

    //Related Items
    builder.addSlot( "input", 2, 20 ).addItemStack( Item.of( 'meds_and_herbs:bottled_water', 1 ) )
    builder.addSlot( "catalyst", 24, 11 ).addItemStack( Item.of( 'meds_and_herbs:cotton_filter', 1 ) )
    builder.addSlot( "input", 46, 11 ).addItemStack( Item.of( 'meds_and_herbs:empty_bottle_clean', 1 ) )

    //Connections
    builder.addInvisibleIngredients( 'output' ).addItemStack( Item.of( 'meds_and_herbs:distilled_leftovers' ) )
}

// Recipes
JEIAddedEvents.registerRecipes( event => {
    event.custom("meds_and_herbs:boiling_flask")
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_artemisia', 'meds_and_herbs:extract_artemisia' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_belladonna', 'meds_and_herbs:extract_belladonna' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_chamomile', 'meds_and_herbs:extract_chamomile' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_cocoa', 'meds_and_herbs:extract_caffeine' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_herbal', 'meds_and_herbs:extract_herbal' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_kelp', 'meds_and_herbs:material_agar' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_opium', 'meds_and_herbs:extract_opium' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_shrooms', 'meds_and_herbs:extract_mushroom' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_sugarcane', 'meds_and_herbs:extract_glucose' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_sweet_clover', 'meds_and_herbs:extract_sweet_clover' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_vinca', 'meds_and_herbs:extract_vinca' ) )
        .add( boilingFlaskRecipe( 'meds_and_herbs:powder_wood', 'meds_and_herbs:alcohol_methanol' ) )
})
function boilingFlaskRecipe( input, output ) {
    return { type: "boiling_flask", input: input, output: output }
}