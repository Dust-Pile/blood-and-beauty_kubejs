//priority: 2

if ( global.coin_data == null ) {
    global.coin_data = {}
}

global.coin_data.exchangeRates = {
    'createdeco:copper_coin': NaN,
    'createdeco:zinc_coin': 4,
    'createdeco:brass_coin': 4,
    'createdeco:iron_coin': 6, //Is actually silver
    'createdeco:gold_coin': 8
}
global.coin_data.coins = [
    'createdeco:copper_coin',
    'createdeco:zinc_coin',
    'createdeco:brass_coin',
    'createdeco:iron_coin', //Is actually silver
    'createdeco:gold_coin'
]
global.coin_data.values = {
    'createdeco:copper_coin': 1
}
var coins = global.coin_data.coins
for ( var i = 1; i < coins.length; i++ ) {
    global.coin_data.values[ coins[ i ] ] = 
        global.coin_data.values[ coins[ i - 1 ] ] * global.coin_data.exchangeRates[ coins[ i ] ]
}

var exchangeRates = global.coin_data.exchangeRates

ServerEvents.recipes(event => {

    //Clear Current Recipes
    event.remove({ input: /.*nugget.*/, output: /createdeco:.*_coin/ })
        //replace industrial iron recipe (is not a valid currency)
    event.recipes.create.pressing( 'createdeco:industrial_iron_coin', 'createdeco:industrial_iron_nugget' )

    //Coin Manufacturing
    event.recipes.create.compacting( 'createdeco:brass_coin', Item.of( 'create:brass_sheet', 2 ) )
    event.recipes.create.compacting(
        'createdeco:iron_coin', 
        [
            Item.of( 'cm_extended:silver_sheet' ),
            Item.of( 'minecraft:amethyst_shard', 2 )
        ]
    )
    // event.recipes.create.compacting(
    //     'createdeco:gold_coin', 
    //     [
    //         Item.of( 'create:golden_sheet', 2 ),
    //         Item.of( 'create:polished_rose_quartz' )
    //     ]
    // )
    event.recipes.create.compacting( 'createdeco:netherite_coin', 'createdeco:netherite_sheet' )

    // Coins Exchanging
    var coins = global.coin_data.coins
    for ( var i = 1; i < coins.length; i++ ) {
        var coin = coins[ i ]
        // Normal Coins
        event.shapeless(
            coin,
            [
                '' + exchangeRates[ coin ] + 'x ' + coins[ i - 1 ]
            ]
        )
        event.shapeless(
            Item.of( coins[ i - 1 ], exchangeRates[ coin ] ),
            [
                coin
            ]
        )
        // Stacks
        event.shapeless(
            coin + 'stack',
            [
                '' + exchangeRates[ coin ] + 'x ' + coins[ i - 1 ] + 'stack'
            ]
        )
    }
})