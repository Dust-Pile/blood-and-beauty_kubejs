StartupEvents.registry( 'item', event => {
    event.create( 'bloodandbeauty:obsidian_chunk' )
        .texture( 'bloodandbeauty:item/materials/obsidian_chunk' )

    // crafting materials
    event.create( MODID_ + 'leather_strips', 'basic' )
        .texture( 'bloodandbeauty:item/materials/leather_strips' )
    event.create( MODID_ + 'stone_hammer' )
        .texture( 'bloodandbeauty:item/tools/stone_hammer' )
        .maxDamage( 131 )

    // handles
    event.create( MODID_ + 'tool_handle', 'basic')
        .texture('bloodandbeauty:item/materials/tool_handle')
    event.create( MODID_ + 'fine_handle', 'basic')
        .texture('bloodandbeauty:item/materials/fine_handle')
})