if ( global.weaponry.recipeTemplates == undefined ) {
    global.weaponry.recipeTemplates = {}
}

var templates = global.weaponry.recipeTemplates

// Tool Meta Templates
templates.hammered = ( event, material, output, array ) => {
    event.shaped(
        Item.of( output ),
        array,
        {
            A: material,
            B: 'minecraft:stick',
            C: '#forge:tools/hammers'
        }
    ).damageIngredient("#forge:tools/hammers")
}
templates.nonHammered = ( event, material, output, array ) => {
    event.shaped(
        Item.of( output ),
        array,
        {
            A: material,
            B: 'minecraft:stick'
        }
    )
}

// Tool Templates
templates.sword = ( event, material, output ) => {
    templates.hammered( event, material, output, [
        'A ',
        'A ',
        'BC'
    ])
}
templates.hoe = ( event, material, output ) => {
    templates.hammered( event, material, output, [
        'AAC',
        ' B ',
        ' B '
    ])
}
templates.axe = ( event, material, output ) => {
    templates.hammered( event, material, output, [
        'AAC',
        'AB ',
        ' B '
    ])
}
templates.pick = ( event, material, output ) => {
    templates.hammered( event, material, output, [
        'AAA',
        ' BC',
        ' B '
    ])
}
templates.shovel = ( event, material, output ) => {
    templates.hammered( event, material, output, [
        'AC',
        'B ',
        'B '
    ])
}
templates.knife = ( event, material, output ) => {
    templates.nonHammered( event, material, output, [
        'A',
        'B'
    ])
}
templates.dagger = ( event, material, output ) => {
    templates.nonHammered( event, material, output, [
        ' A',
        'B '
    ])
}
templates.hammer = ( event, material, output ) => {
    templates.nonHammered( event, material, output, [
        'AAA',
        'AAA',
        ' B '
    ])
}
templates.spear = ( event, material, output ) => {
    templates.hammered( event, material, output, [
        ' CA',
        ' B ',
        'B  '
    ])
}