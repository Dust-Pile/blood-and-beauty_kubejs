const materials = global.weaponry.materials

JEIEvents.information( event => {
    // event.addItem( 'meds_and_herbs:raw_beverage_bucket', 'Unfiltered Beverage is fermented in the fermentation barrel.' )
    event.addItem( "bloodandbeauty:obsidian_chunk", 
        "Obsidian chunks can be obtained by right clicking a block of obsidian with a diamond."
    )
    event.addItem( "createlowheated:basic_burner", 
        "Blowing air through an Encased Fan at 128 rpm or greater empowers the basic burner. " 
        + "This allows it to act like a blaze burner and complete \"heated\" recipes while using eight times more fuel than normal."
    )

    global.forEachIn( materials, ( material, name ) => {
        if ( material.heatRequirement == 'furnace' 
            || material.heatRequirement == 'blast' 
            || material.heatRequirement == 'lowheated' 
        ) {
            if ( material.craftItems.raw != null ) {
                event.addItem( material.craftItems.raw, "Can be melted by a basic burner from create low-heated" )
            }
            event.addItem( material.craftItems.ingot, "Can be melted by a basic burner from create low-heated" )
            event.addFluid( material.fluid, "Can be obtained by melting materials with a basic burner from create low-heated" )
        } else if ( material.heatRequirement == 'heated' ) {
            if ( material.craftItems.raw != null ) {
                event.addItem( material.craftItems.raw, "Can be melted by an empowered basic burner from create low-heated" )
            }
            event.addItem( material.craftItems.ingot, "Can be melted by an empowered basic burner from create low-heated" )
            event.addFluid( material.fluid, "Can be obtained by melting materials with an empowered basic burner from create low-heated" )
        }
    })
})