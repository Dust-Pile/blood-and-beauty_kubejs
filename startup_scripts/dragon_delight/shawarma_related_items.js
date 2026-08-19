var slug = 'dragon_delight:'
var texturePath = 'bloodandbeauty:item/dragon_food/'

StartupEvents.registry( 'item', event => {
    //Tzatziki Sauce
    event.create( slug + 'tzatziki_sauce' )
        .texture( texturePath + 'tzatziki_sauce' )
        .maxStackSize( 16 )
        .containerItem( 'minecraft:bowl' )
        .food( food => {
            food
                .hunger( 4 )
                .saturation( 0.2 )
        })
    //Tzatziki Chip
    event.create( slug + 'chip_with_tzatziki_sauce' )
        .texture( texturePath + 'chip_with_tzatziki_sauce' )
        .food( food => {
            food
                .hunger( 4 )
                .saturation( 0.4 )
        })
    //Simple Shawarma Wrap
    event.create( slug + 'simple_shawarma_wrap' )
        .texture( texturePath + 'simple_shawarma')
        .food( food => {
            food
                .hunger( 8 )
                .saturation( 0.6 )
        })
    //Dragon Salad
    event.create( slug + 'dragon_salad' )
        .texture( texturePath + 'dragon_salad')
        .maxStackSize( 16 )
        .containerItem( 'minecraft:bowl' )
        .food( food => {
            food
                .hunger( 7 )
                .saturation( 0.75 )
        })
    //Shawarma Strips
    event.create( slug + 'shawarma_strips' )
        .texture( texturePath + 'shawarma_strips')
        .food( food => {
            food
                .hunger( 4 )
                .saturation( 1 )
        })
})