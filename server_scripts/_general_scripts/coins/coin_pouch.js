//priority: 0

var coin_data = global.coin_data
var coinValues = coin_data.values

for ( var coin of coin_data.coins ) {
    ItemEvents.canPickUp( coin, event => pickupHandler( event ) )
}
ItemEvents.canPickUp( 'createdeco:netherite_coin', event => pickupHandler( event ) )

// Main Functions
/**
 * @param {Internal.ItemPickedUpEventJS} event
 */
function pickupHandler( event ) {
    const { player, item } = event
    var pouchSlot = player.curiosInventory.getCurios().get( 'pouch' )
    var pouches = pouchSlot.getStacks().allItems
    if ( pouches.length == 0 ) {
        return
    }

    if ( coin_data.addCoinsToBundle( player, [ item ] ) ) {
        var loc = global.new.point( player.x, player.y, player.z )
        global.run(
            'playsound minecraft:entity.item.pickup player @a ' + loc.toCommandString()
        )
        event.itemEntity.kill()
        event.cancel()
    }
}

/**
 * @param {Internal.Player} player 
 * @param {Internal.ItemStack[]} coinItems 
 * @returns {Boolean}
 */
coin_data.addCoinsToBundle = ( player, coinItems ) => {
    var pouchSlot = player.curiosInventory.getCurios().get( 'pouch' )
    var pouchItem = pouchSlot.getStacks().allItems.get( 0 )
    var { coins, other: otherItems, otherCount: otherItemsCount, netheriteCoins } = getItemsFromCoinPouch( pouchItem )
    var { coins: moreCoins, netheriteCoins: moreNetheriteCoins } = separateCoins( coinItems )

    // Merge coin stacks
    var value = coin_data.coinsToValue( coins ) + coin_data.coinsToValue( moreCoins )
    coins = stackCoins( coin_data.valueToCoins( value ) )

    // Merge netherite coin stacks
    netheriteCoins = handleNetheriteCoins( netheriteCoins, moreNetheriteCoins )

    for ( var coinItem of netheriteCoins ) {
        coins.push( coinItem )
    }
    var coinItemCount = 0
    for ( var coinItem of coins ) {
        coinItemCount += coinItem.count
    }

    if ( coinItemCount + otherItemsCount > bundleCapacities[ pouchItem.id ] ) {
        global.run(
            '/title ' + player.username + ' actionbar {"text":"My coin pouch is full","italic":true,"color":"gray"}'
        )
        return false
    }
    var items = coins
    for ( var item of otherItems ) {
        items.push( item )
    }

    var bundle = createBundleWithItems( items, pouchItem.id )
    pouchSlot.getStacks().setStackInSlot( 0, bundle )
    return true
}

// Coin managing functions
/**
 * @param {Number} value 
 * @returns {Internal.ItemStack[]}
 */
coin_data.valueToCoins = ( value ) => {
    value = Math.ceil( value )
    const coins = coin_data.coins

    var outputCoins = []
    for ( var i = coins.length - 1; i >= 0; i-- ) {
        var count = 0

        while ( value >= coinValues[ coins[ i ] ] ) {
            value -= coinValues[ coins[ i ] ]
            count++
        }
        if ( count > 0 ) {
            outputCoins.push( Item.of( coins[ i ], count ) )
        }
    }
    return outputCoins
}
/**
 * @param {Internal.ItemStack[]} items 
 * @return {Number}
 */
coin_data.coinsToValue = ( items ) => {
    var value = 0
    for ( var coinItemStack of items ) {
        if ( /stack$/.test( coinItemStack.id ) ) {
            value += coinValues[ coinItemStack.id.replace( 'stack', '' ) ] * 4 * coinItemStack.count
        } else {
            value += coinValues[ coinItemStack.id ] * coinItemStack.count
        }
    }
    return value
}
/**
 * @param {Internal.Player} player 
 * @returns {Boolean}
 */
coin_data.hasPouch = ( player ) => {
    if ( player.curiosInventory.getCurios().get( 'pouch' ).getStacks().allItems.length == 0 ) {
        return false
    }
    return true
}

// Helper Functions
/**
 * @param {Internal.ItemStack} bundleItem 
 * @returns {Object}
 */
function getItemsFromCoinPouch( bundleItem ) {
    var output = {
        coins: [],
        netheriteCoins: [],
        other: [],
        otherCount: 0
    }

    if ( bundleItem.nbt == null || bundleItem.nbt.empty ) {
        return output
    }

    var items = bundleItem.nbt.Items
    for ( var item of items ) {
        if ( 
            !/^createdeco:.*coin/.test( item.id ) ||
            /^createdeco:industrial/.test( item.id )
        ) {
            if ( item.tag != null ) {
                output.other.push( Item.of( item.id, item.Count, item.tag ) )
            } else {
                output.other.push( Item.of( item.id, item.Count ) )
            }
            output.otherCount += item.Count
        } else {
            if ( /^createdeco:netherite/.test( item.id )) {
                output.netheriteCoins.push( Item.of( item.id, item.Count ) )
            } else {
                output.coins.push( Item.of( item.id, item.Count ) )
            }
        }
    }
    return output
}
/**
 * @param {Internal.ItemStack[]}
 * @param {String}
 */
function createBundleWithItems( items, bundleId ) {
    var nbtItems = []
    for ( var item of items ) {
        if ( item.nbt == null || item.nbt.empty ) {
            nbtItems.push({
                id: item.id,
                Count: item.count
            })
        } else {
            nbtItems.push({
                id: item.id,
                Count: item.count,
                tag: item.nbt
            })
        }
    }
    return Item.of( bundleId, { Items: nbtItems } )
}
/**
 * @param {Internal.ItemStack[]} items
 */
function separateCoins ( items ) {
    var output = {
        coins: [],
        netheriteCoins: []
    }
    for ( var item of items ) {
        if ( /^createdeco:netherite/.test( item.id ) ) {
            output.netheriteCoins.push( item )
        } else {
            output.coins.push( item )
        }
    }
    return output
}
/**
 * @param {Internal.ItemStack[]} coinItems
 */
function stackCoins( coinItems ) {
    var output = []
    for ( var coinItem of coinItems ) {
        if ( coinItem.count < 4 ) {
            output.push( coinItem )
            continue
        }
        if ( coinItem.count % 4 != 0 ) {
            output.push( Item.of( coinItem.id, coinItem.count % 4 ) )
        }
        output.push( Item.of( coinItem.id + 'stack', Math.floor( coinItem.count / 4 ) ) )
    }
    return output
}
/**
 * @param {Internal.ItemStack} coins1 
 * @param {Internal.ItemStack} coins2 
 */
function handleNetheriteCoins( coins1, coins2 ) {
    var coins = 0
    var stacks = 0
    var output = []
    for ( var coin of coins1 ) {
        if ( coin.id.equals( 'createdeco:netherite_coin' ) ) {
            coins += coin.count
        } else {
            stacks += coin.count
        }
    }
    for ( var coin of coins2 ) {
        if ( coin.id.equals( 'createdeco:netherite_coin' ) ) {
            coins += coin.count
        } else {
            stacks += coin.count
        }
    }

    stacks += Math.floor( coins / 4 )
    coins %= 4

    if ( coins > 0 ) {
        output.push( Item.of( 'createdeco:netherite_coin', coins ) )
    }
    if ( stacks > 0 ) {
        output.push( Item.of( 'createdeco:netherite_coinstack', stacks ) )
    }
    return output
}

// Data
var bundleCapacities = {
    "minecraft:bundle": 64,
    "metalbundles:copper_bundle": 128,
    "metalbundles:iron_bundle": 512,
    "metalbundles:golden_bundle": 1024,
    "metalbundles:diamond_bundle": 2048
}