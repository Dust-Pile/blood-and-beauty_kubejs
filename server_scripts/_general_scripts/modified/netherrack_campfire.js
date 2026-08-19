let campfires = [ 'minecraft:campfire','minecraft:soul_campfire' ]

BlockEvents.placed( "minecraft:netherrack", event => {
    let blockUp = event.block.up
    if ( campfires.includes( blockUp.getId() ) ) {
        addEternal( blockUp )
    }
})
BlockEvents.broken( "minecraft:netherrack", event => {
    let blockUp = event.getBlock().getUp()
    if (campfires.includes(blockUp.getId())) {
        removeEternal(blockUp)
    }
})

BlockEvents.rightClicked( "better_campfires:campfire_build", event => {
    global.tick.timeout(() => {
        if (campfires.includes(event.getBlock().getId())) {
            if (hasNetherrack(event.getBlock())) {
                addEternal(event.getBlock())
            } else {
                removeEternal(event.getBlock())
            }
        }
    },1)
})

BlockEvents.placed( campfires, event => {
    if (hasNetherrack(event.getBlock())) {
        addEternal(event.getBlock())
    } else {
        removeEternal(event.getBlock())
    }
})

let hasNetherrack = (block) => {
    return block.getDown().getId().equals('minecraft:netherrack')
}

let addEternal = (block) => {
    let pos = global.new.point(block.x, block.y, block.z)
    global.run("data modify block "+pos.toCommandString()+" IsEternal set value 1b")
}

let removeEternal = (block) => {
    let pos = global.new.point(block.x, block.y, block.z)
    global.run("data modify block "+pos.toCommandString()+" IsEternal set value 0b")
}