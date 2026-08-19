JEIAddedEvents.registerCategories( ( event ) => {
    event.custom( "meds_and_herbs:incubator", ( category ) => {
        const guiHelper = category.jeiHelpers.guiHelper

        category.title( "Incubation" )
            .background( guiHelper.drawableBuilder( 
                "bloodandbeauty:textures/gui/incubator.png", 0, 0, 99, 29 )
                .setTextureSize( 99, 29 )
                .build()
            )
            .setWidth( 99 )
            .setHeight( 29 )
            .icon( guiHelper.createDrawableItemStack( Item.of( 'meds_and_herbs:incubator' ) ) )
            // Set the callback function that will verify if a recipe is a valid recipe for this category.
            .isRecipeHandled( ( recipe ) => {
                return recipe.data != null && recipe.data.type != null && recipe.data.type.equals( "incubator" )
            })
            // Set the callback function that will allow JEI to index this recipe and determine
            // what the inputs and outputs of each recipe are.
            .handleLookup( ( builder, recipe, focuses ) => {
                handleIncubator( category.jeiHelpers, builder, recipe, focuses )
            })
            // Set the callback function for rendering additional detials to the screen.
            .setDrawHandler( ( recipe, recipeSlotsView, guiGraphics, mouseX, mouseY ) => {
                guiHelper.createAnimatedRecipeArrow( 1 ).draw( guiGraphics, 34, 6 )
            })
    })
})

JEIAddedEvents.registerRecipeCatalysts( event => {
    let addRecipeCatalyst = 'addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])'
    let recipeType = event.data.jeiHelpers.getRecipeType( "meds_and_herbs:incubator" ).get()
    event.data[addRecipeCatalyst]( 'meds_and_herbs:incubator', recipeType )
})

/**
 * @param {Internal.IJeiHelpers} jeiHelpers 
 * @param {Internal.IRecipeLayoutBuilder} builder 
 * @param {Internal.CustomJSRecipe} recipe 
 * @param {Internal.IFocusGroup} focuses 
 */
function handleIncubator( jeiHelpers, builder, recipe, focuses ) {
    //Main Things
    builder.addSlot( "input", 6, 6 ).addItemStack( Item.of( recipe.data.input, 1 ) )
    builder.addSlot( "output", 63 , 6 ).addItemStack( Item.of( recipe.data.outputs[0], 1 ) )
    builder.addSlot( "output", 82 , 6 ).addItemStack( Item.of( recipe.data.outputs[1], 1 ) )
}

// Recipes
JEIAddedEvents.registerRecipes( event => {
    event.custom("meds_and_herbs:incubator")
        .add( { 
            type: "incubator", 
            input: 'meds_and_herbs:petridish_agar', 
            outputs: [ 'meds_and_herbs:petridish_penicillium', 'meds_and_herbs:petridish_moldy' ] 
        } )
})