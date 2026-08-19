BlockEvents.broken( event => {
    const { block, player, level } = event

    if ( !Block.getBlock( block.id ).mod.equals( "table_top_craft" ) ) {
        return
    }

    if ( !player.isCreative() ) {
        if ( player.isCrouching() ) {
            block.popItem( Item.of( block.id ) )
        } else {
            block.popItem( Item.of( 
                block.id, 
                '{BlockEntityTag:{ChessValues:' + block.entityData.get( "ChessValues" ).toString() + '}}'
            ) )

            global.run( 'title ' + player.username + 
                ' actionbar {"text":"Crouch and break table top games to reset their data","italic":true}'
            )
        }
    } 
    
})