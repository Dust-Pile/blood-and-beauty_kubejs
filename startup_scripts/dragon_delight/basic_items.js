var textureRoot = 'bloodandbeauty:item/dragon_food/'
var slug = 'dragon_delight:'

StartupEvents.registry( 'item', event => {
    
    //Steak
    event.create( slug + 'dragon_steak', 'basic')
        .texture( textureRoot + 'dragon_steak' )
        .maxStackSize( 16 )
        .food( food => {
            food
                .hunger( 8 )
                .saturation( 0 )
                .effect( 'minecraft:wither', 45*20, 1, 1 )
                .effect( 'minecraft:blindness', 45*20, 0, 1 )
                .effect( 'minecraft:slowness', 45*20, 2, 1 )
                .effect( 'endlessbiomes:weight', 30*20, 0, 1 )
                .effect( 'minecraft:hunger', 60*20, 1, 1 )
                .effect( 'minecraft:nausea', 15*20, 3, 1 )
        })
    event.create( slug + 'clean_dragon_steak', 'basic')
        .texture( textureRoot + 'clean_dragon_steak' )
        .maxStackSize( 16 )
        .food( food => {
            food
                .meat()
                .hunger( 10 )
                .saturation( 0 )
                .effect( 'minecraft:hunger', 30*20, 0, 0.75 )
        })
    event.create( slug + 'cooked_dragon_steak', 'basic')
        .texture( textureRoot + 'cooked_dragon_steak' )
        .maxStackSize( 16 )
        .food( food => {
            food
                .meat()
                .hunger( 14 )
                .saturation( 0.75 )
                .effect( 'minecraft:resistance', 30*20, 0, 1 )
                .effect( 'minecraft:strength', 30*20, 0, 1 )
                .effect( 'minecraft:absorption', 60*20, 0, 1 )
        })

    //Filet
    event.create( slug + 'dragon_filet', 'basic')
        .texture( textureRoot + 'dragon_filet' )
        .food( food => {
            food
                .hunger( 4 )
                .saturation( 0 )
                .effect( 'minecraft:wither', 45*20, 0, 1 )
                .effect( 'minecraft:blindness', 45*20, 0, 1 )
                .effect( 'minecraft:slowness', 45*20, 1, 1 )
                .effect( 'minecraft:hunger', 60*20, 1, 1 )
                .effect( 'minecraft:nausea', 15*20, 1, 1 )
        })
    event.create( slug + 'clean_dragon_filet', 'basic')
        .texture( textureRoot + 'clean_dragon_filet' )
        .food( food => {
            food
                .meat()
                .hunger( 5 )
                .saturation( 0 )
                .effect( 'minecraft:hunger', 30*20, 0, 0.75 )
        })
    event.create( slug + 'cooked_dragon_filet', 'basic')
        .texture( textureRoot + 'cooked_dragon_filet' )
        .food( food => {
            food
                .meat()
                .hunger( 8 )
                .saturation( 0.75 )
                .effect( 'minecraft:strength', 20*20, 0, 1 )
        })

    //mince
    event.create( slug + 'dragon_mince', 'basic')
        .texture( textureRoot + 'dragon_mince' )
        .food( food => {
            food
                .meat()
                .hunger( 5 )
                .saturation( 0 )
                .effect( 'minecraft:hunger', 30*20, 0, 0.75 )
        })
    event.create( slug + 'dragon_patty', 'basic')
        .texture( textureRoot + 'dragon_patty' )
        .food( food => {
            food
                .meat()
                .hunger( 8 )
                .saturation( 0.75 )
                .effect( 'minecraft:resistance', 20*20, 0, 1 )
        })
    //burger
    event.create( slug + 'dragon_burger', 'basic')
        .texture( textureRoot + 'dragon_burger' )
        .maxStackSize( 16 )
        .food( food => {
            food
                .hunger( 16 )
                .saturation( 0.75 )
                .effect( 'minecraft:resistance', 30*20, 0, 1 )
                .effect( 'minecraft:strength', 30*20, 0, 1 )
                .effect( 'minecraft:absorption', 60*20, 0, 1 )
                .effect( 'farmersdelight:comfort', 120*20, 0, 1 )
        })

    //Not food
    event.create( slug + 'dragon_round', 'basic' )
        .texture( textureRoot + 'dragon_round' )
        .maxStackSize( 4 )
    event.create( slug + 'clean_dragon_round', 'basic' )
        .texture( textureRoot + 'clean_dragon_round' )
        .maxStackSize( 4 )
    event.create( slug + 'dragon_body', 'basic' )
        .texture( textureRoot + 'dragon_body' )
        .unstackable()
    event.create( slug + 'dragon_wing', 'basic' )
        .texture( textureRoot + 'dragon_wing' )
        .maxStackSize( 4 )
    
})


// global.forEachIn = ( list, consumer ) => {
//     if ( typeof list != 'object' ) {
//         consumer( list )
//         return true
//     }
//     if ( list[0] != undefined ) {
//         var length = ( list.size != undefined ) ? list.size() : list.length
//         for (var i = 0; i < length; i++ ) {
//             consumer( list[i] ) 
//         }
//         return true
//     } else {
//         var keys = Object.keys(list)
//         var length = keys.length
//         for (var i = 0; i < length; i++ ) {
//             consumer( list[keys[i]], keys[i] ) 
//         }
//         return true
//     }
// }