ServerEvents.recipes( event => {
    //remove old recipes
    event.remove({ output: 'teslacabinet:microscope_brass' })
    event.remove({ output: 'teslacabinet:microscope_single' })
    event.remove({ output: 'teslacabinet:orange_multimeter' })
    event.remove({ output: 'teslacabinet:phonograph_edison' })
    event.remove({ output: 'teslacabinet:scales' })
    event.remove({ output: 'teslacabinet:static_electricity_dome' })
    event.remove({ output: 'teslacabinet:thermocouple' })
    event.remove({ output: 'teslacabinet:tungsten_lamp' })

    //New Recipes
    event.shaped(
        'teslacabinet:microscope_brass',
        [
            ' E ',
            'BCB',
            'ADA'
        ],
        {
            A: 'createaddition:brass_rod',
            B: 'create:brass_nugget',
            C: '#forge:glass_panes',
            D: 'create:brass_sheet',
            E: 'minecraft:spyglass'
        }
    )
    event.shaped(
        'teslacabinet:microscope_single',
        [
            ' E ',
            'BCB',
            'ADA'
        ],
        {
            A: 'createaddition:brass_rod',
            B: 'create:brass_nugget',
            C: '#forge:glass_panes',
            D: 'create:iron_sheet',
            E: 'minecraft:spyglass'
        }
    )
    event.shaped(
        'teslacabinet:orange_multimeter',
        [
            'ABA',
            'CDC',
            'CEC'

        ],
        {
            A: 'createaddition:connector',
            B: '#forge:glass_panes',
            C: 'create:copper_sheet',
            D: 'minecraft:compass',
            E: 'createaddition:gold_wire'
        }
    )
    event.shaped(
        'teslacabinet:phonograph_edison',
        [
            'ABA',
            'CDC',
            'EFE'
        ],
        {
            A: 'create:golden_sheet',
            B: 'minecraft:goat_horn',
            C: 'create:brass_nugget',
            D: 'minecraft:jukebox',
            E: 'minecraft:blackstone',
            F: 'createaddition:copper_spool'
        }
    )
    event.shaped(
        'teslacabinet:scales',
        [
            ' A ',
            'BCB',
            'DED'
        ],
        {
            A: 'create:brass_nugget',
            B: 'createaddition:gold_wire',
            C: 'createaddition:brass_rod',
            D: 'minecraft:bowl',
            E: 'create:brass_sheet'
        }
    )
    event.shaped(
        'teslacabinet:static_electricity_dome',
        [
            'A B',
            'CDE',
            'FFF'
        ],
        {
            A: 'createaddition:connector',
            B: '#forge:glass_panes',
            C: 'createaddition:copper_wire',
            D: 'create:brass_sheet',
            E: 'createaddition:tesla_coil',
            F: '#minecraft:wooden_slabs'
        }
    )
    event.shaped(
        'teslacabinet:thermocouple',
        [
            'ABA',
            'CDC',
            'EFE'
        ],
        {
            A: 'minecraft:red_terracotta',
            B: 'minecraft:compass',
            C: 'create:brass_sheet',
            D: 'minecraft:comparator',
            E: 'createaddition:connector',
            F: 'minecraft:charcoal'
        }
    )
    event.shaped(
        Item.of('teslacabinet:tungsten_lamp', 4),
        [
            'AAA',
            'ABA',
            ' C '
        ],
        {
            A: '#forge:glass_panes',
            B: 'createmetallurgy:tungsten_wire',
            C: 'create:golden_sheet'
        }
    )
})