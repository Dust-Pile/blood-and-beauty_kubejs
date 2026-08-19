// Tag plants for their seasons
ServerEvents.tags( 'block', event => {
    var tagData = JSON.parse( JsonIO.readString( "./kubejs/server_scripts/_general_scripts/_data/grow_seasons_blocks.json" ) )
    var allBlocks = []
    global.forEachIn( tagData, ( blocks, tag ) => {
        for ( var block of blocks ) {
            allBlocks.push( block )
        }
    })

    var seasonTags = Object.keys( tagData )
    for ( var tag of seasonTags ) {
        event.remove( tag, allBlocks )
    }

    global.forEachIn( tagData, ( blocks, tag ) => {
        event.add( tag, blocks )
    })
    for ( var tag of seasonTags ) {
        event.add( tag, 'sereneseasons:year_round_crops' )
    }

})

ServerEvents.tags( 'item', event => {
    var tagData = JSON.parse( JsonIO.readString( "./kubejs/server_scripts/_general_scripts/_data/grow_seasons_items.json" ) )
    var allItems = []
    global.forEachIn( tagData, ( items, tag ) => {
        for ( var item of items ) {
            allItems.push( item )
        }
    })

    var seasonTags = Object.keys( tagData )
    for ( var tag of seasonTags ) {
        event.remove( tag, allItems )
    }

    global.forEachIn( tagData, ( items, tag ) => {
        event.add( tag, items )
    })
    for ( var tag of seasonTags ) {
        event.add( tag, 'sereneseasons:year_round_crops' )
    }
})