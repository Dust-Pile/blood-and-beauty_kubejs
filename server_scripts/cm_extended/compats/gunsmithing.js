ServerEvents.recipes( event => {
    // NOTE: THIS IS A TEMPORARY PATCH AND CAUSES ISSUES
    event.replaceInput(
        { input: "cgs:steel_block" },
        "cgs:steel_block",
        "createmetallurgy:steel_block"
    )
    event.replaceInput(
        { input: "cgs:steel_ingot" },
        "cgs:steel_ingot",
        "createmetallurgy:steel_ingot"
    )
    event.replaceInput(
        { input: "cgs:steel_sheet" },
        "cgs:steel_sheet",
        "cm_extended:steel_sheet"
    )
    event.replaceInput(
        { input: "cgs:steel_nugget" },
        "cgs:steel_nugget",
        "cm_extended:steel_nugget"
    )
    event.remove({ output: "cgs:steel_block" })
    event.remove({ output: "cgs:steel_ingot" })
    event.remove({ output: "cgs:steel_sheet" })
    event.remove({ output: "cgs:steel_nugget" })
    // END TEMPORARY PATCH
})