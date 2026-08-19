ServerEvents.recipes( event => {
    event.recipes.create.crushing(
        Item.of( "create:powdered_obsidian" ).withChance( 0.5 ),
        Item.of( "bloodandbeauty:obsidian_chunk" )
    )
})

// Obsidian Chunk
BlockEvents.rightClicked( "minecraft:obsidian", event => {
    const { player, item, block, facing } = event

    if ( !item.id.equals( "minecraft:diamond" ) ) {
        return
    }

    player.swing()
    var loc = global.new.point( block.x, block.y, block.z )
    global.run( "execute in " + block.level.name.string + " run playsound minecraft:block.calcite.break block @a " 
        + loc.toCommandString() + " 1 2" 
    )
    if ( Utils.random.nextDouble() > 0.9 ) {
        block.popItemFromFace( "bloodandbeauty:obsidian_chunk", facing )
        if ( Utils.random.nextDouble() > 0.75 ) {
            block.set( "minecraft:air" )
            global.run( "execute in " + block.level.name.string + " run playsound minecraft:block.stone.break block @a " + loc.toCommandString() )
        }
    }
})

// Basin Cycling
BlockEvents.rightClicked( 'createmetallurgy:foundry_basin', event => {
    const { player, block } = event

    if ( !player.crouching || !player.mainHandItem.id.equals( "minecraft:air" ) ) {
        return
    }

    // Find valid fluids
    var nbt = block.entityData
    var tanks = []
    for ( var i = 0; i < 4; i++ ) {
        if ( !nbt.OutputTanks[i].TankContent.FluidName.equals( "minecraft:empty" ) ) {
            tanks.push( nbt.OutputTanks[i] )
        }
    }
    if ( tanks.length == 0 ) {
        return
    }

    // Cycle Fluids
    var temp = tanks[0]
    for ( var i = 0; i < tanks.length - 1; i++ ) {
        tanks[i] = tanks[ i+1 ]
    }
    tanks[ tanks.length - 1 ] = temp

    while ( tanks.length < 4 ) {
        tanks.push({})
    }

    // Assign to block data
    nbt.OutputTanks = tanks
    block.setEntityData( nbt )

    event.cancel()
})