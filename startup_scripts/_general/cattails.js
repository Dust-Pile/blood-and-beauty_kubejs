StartupEvents.registry('item', event => {

    //Edible Cattails
    event.create('bloodandbeauty:cattail_stalk')
        .texture('bloodandbeauty:item/cattail_stalk')
        .food(food => {
            food
                .hunger(1)
                .saturation(0.5)
                .effect('minecraft:hunger', 15, 1, 0.75)
                .fastToEat(true)
        })
    event.create('bloodandbeauty:cooked_cattail_stalk')
        .texture('bloodandbeauty:item/cooked_cattail_stalk')
        .food(food => {
            food
                .hunger(2)
                .saturation(0.5)
                .fastToEat(true)
        })
    event.create('bloodandbeauty:fried_cattail_stalk')
        .texture('bloodandbeauty:item/fried_cattail_stalk')
        .food(food => {
            food
                .hunger(5)
                .saturation(0.75)
        })

})