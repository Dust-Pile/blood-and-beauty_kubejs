//priority: 5

const $Grubhoe = Java.loadClass( 'net.dusty_dusty.bnb_core.tools.Grubhoe' )
const $Pickaxe = Java.loadClass( 'net.dusty_dusty.bnb_core.tools.Pickaxe' )
const $Pickadze = Java.loadClass( 'net.dusty_dusty.bnb_core.tools.Pickadze' )

const $Spears = Java.loadClass( 'com.notunanancyowen.spears.Spears' )
const $SpearItem = Java.loadClass( 'com.notunanancyowen.spears.items.SpearItem' )

const $CleaverItem = Java.loadClass( 'net.yirmiri.dungeonsdelight.common.item.CleaverItem' )

const $ItemProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')

const MODID = "cm_extended"
const MODID_ = MODID + ':'

if ( global.weaponry == undefined ) {
    global.weaponry = {}
}

global.weaponry.castingItems = {
    armors: [
        "helmet",
        "chestplate",
        "leggings",
        "boots"
    ],
    handheld: {
        "pick": {
            isTool: true,
            isWeapon: false,
            isVanilla: true,
            headSuffix: 'head',
            handle: MODID_ + 'tool_handle',
            fluidAmount: 270,
            nailPos: 'top',
            tags: [
                'forge:tools',
                'zipline:attachment',
                'minecraft:breaks_decorated_pots',
                'c:pickaxes',
                'minecraft:pickaxes',
                'forge:tools/pickaxes',
                'minecraft:cluster_max_harvestables'
            ],
            type: 'pickaxe'
        },
        "axe": {
            isTool: true,
            isWeapon: true,
            isVanilla: true,
            headSuffix: 'head',
            handle: MODID_ + 'tool_handle',
            fluidAmount: 270,
            nailPos: 'top',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'zipline:attachment',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'c:axes',
                'sliceanddice:allowed_tools',
                'minecraft:axes',
                'bloodandbeauty:ship_collect_tool',
                'forge:tools/axes',
                'realmrpg_quests:quests/cook/cutting',
                'immersive_armors:axes'
            ],
            type: 'axe'
        },
        "hoe": {
            isTool: true,
            isWeapon: false,
            isVanilla: true,
            headSuffix: 'head',
            handle: MODID_ + 'tool_handle',
            fluidAmount: 180,
            nailPos: 'top',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'zipline:attachment',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'minecraft:hoes',
                'c:hoes'
            ],
            type: 'hoe'
        },
        "shovel": {
            isTool: true,
            isWeapon: false,
            isVanilla: true,
            headSuffix: 'blade',
            handle: MODID_ + 'tool_handle',
            fluidAmount: 90,
            nailPos: 'side',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'minecraft:shovels',
                'c:shovels',
                'projectvibrantjourneys:harvests_mossy_hollow_logs',
                'forge:tools/shovels'
            ],
            type: 'shovel'
        },
        "pickaxe": {
            isTool: true,
            isWeapon: false,
            isVanilla: false,
            headSuffix: 'head',
            handle: MODID_ + 'tool_handle',
            fluidAmount: 360,
            nailPos: 'top',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'zipline:attachment',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',
                
                'minecraft:cluster_max_harvestables',
                'c:pickaxes',
                'minecraft:pickaxes',
                'forge:tools/pickaxes',
                'minecraft:cluster_max_harvestables',

                'c:axes',
                'sliceanddice:allowed_tools',
                'minecraft:axes',
                'bloodandbeauty:ship_collect_tool',
                'forge:tools/axes',
                'realmrpg_quests:quests/cook/cutting',
                'immersive_armors:axes'
            ],
            type: 'import',
            import: ( matName, material, tier ) => {
                var properties = new $ItemProperties()
                if ( matName.equals( 'netherite' ) || matName.equals( 'warden' ) ) {
                    properties.fireResistant()
                }
                return new $Pickaxe( tier, 3.0, -3.0, properties )
            }
        },
        "pickadze": {
            isTool: true,
            isWeapon: false,
            isVanilla: false,
            headSuffix: 'head',
            handle: MODID_ + 'tool_handle',
            fluidAmount: 320,
            nailPos: 'top',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'zipline:attachment',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'c:pickaxes',
                'minecraft:pickaxes',
                'forge:tools/pickaxes',
                'minecraft:cluster_max_harvestables',

                'minecraft:shovels',
                'c:shovels',
                'projectvibrantjourneys:harvests_mossy_hollow_logs',
                'forge:tools/shovels'
            ],
            type: 'import',
            import: ( matName, material, tier ) => {
                var properties = new $ItemProperties()
                if ( matName.equals( 'netherite' ) || matName.equals( 'warden' ) ) {
                    properties.fireResistant()
                }
                return new $Pickadze( tier, 1, -2.8, properties )
            }
        },
        "grubhoe": {
            isTool: true,
            isWeapon: false,
            isVanilla: false,
            headSuffix: 'head',
            handle: MODID_ + 'tool_handle',
            fluidAmount: 270,
            nailPos: 'top',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'zipline:attachment',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'minecraft:shovels',
                'c:shovels',
                'projectvibrantjourneys:harvests_mossy_hollow_logs',
                'forge:tools/shovels',

                'minecraft:hoes',
                'c:hoes'
            ],
            type: 'import',
            import: ( matName, material, tier ) => {
                var properties = new $ItemProperties()
                if ( matName.equals( 'netherite' ) || matName.equals( 'warden' ) ) {
                    properties.fireResistant()
                }
                return new $Grubhoe( tier, 0, -3.0, properties )
            }
        },
        "sword": {
            isTool: false,
            isWeapon: true,
            isVanilla: true,
            headSuffix: 'blade',
            handle: 'minecraft:stick',
            fluidAmount: 230,
            nailPos: 'side',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'minecraft:swords',
                'c:swords',
                'realmrpg_quests:quests/cook/cutting',
                'guardvillagers:convertible_guard_items'
            ],
            type: 'sword'
        },
        "dagger": {
            isTool: false,
            isWeapon: true,
            isVanilla: false,
            headSuffix: 'blade',
            handle: 'minecraft:stick',
            fluidAmount: 30,
            nailPos: 'none',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',
            ],
            type: 'sword' // To import later...
        },
        "katana": {
            isTool: false,
            isWeapon: true,
            isVanilla: false,
            headSuffix: 'blade',
            handle: MODID_ + 'fine_handle',
            fluidAmount: 180,
            nailPos: 'side',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'minecraft:swords',
                'c:swords',
                'realmrpg_quests:quests/cook/cutting',
                'guardvillagers:convertible_guard_items'
            ],
            type: 'sword' // To import later...?
        },
        "rapier": {
            isTool: false,
            isWeapon: true,
            isVanilla: false,
            headSuffix: 'blade',
            handle: MODID_ + 'fine_handle',
            fluidAmount: 130,
            nailPos: 'bottom',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'minecraft:swords',
                'c:swords',
                'realmrpg_quests:quests/cook/cutting',
                'guardvillagers:convertible_guard_items'
            ],
            type: 'sword' // To import later ???
        },
        "spear": {
            isTool: false,
            isWeapon: true,
            isVanilla: false,
            headSuffix: 'head',
            handle: MODID_ + 'pole',
            fluidAmount: 90,
            nailPos: 'side',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',
            ],
            type: 'import',
            import: ( matName, material, tier ) => {
                var properties = (new $ItemProperties()).durability( tier.getUses() )
                if ( matName.equals( 'netherite' ) || matName.equals( 'warden' ) ) {
                    properties.fireResistant()
                }
                var seconds = ( 1.25 - ( material.properties.weight * 0.1 ) ) * 20.0
                console.log( " ===== " + matName + " Spear Swing Anim Ticks: " + seconds + " ===== " )
                console.log( "         Attack Speed: " + ( 1 / (seconds * 0.05) - 4.0 ) )
                console.log( "         Divisor: " + ( (seconds * 0.05) - 4.0 ) )
                return new $SpearItem( tier, seconds, 
                    0.6 + ( tier.getAttackDamageBonus() * 0.12 ) + ( material.properties.weight * 0.05 ),
                    0.8 - ( tier.getAttackDamageBonus() * 0.1 ), 3.0, ( 11 - tier.getAttackDamageBonus() ), 
                    6.0 - ( tier.getAttackDamageBonus() * 0.5 ), 5.1, 10.0, 4.6,
                    $Spears.SPEAR_HIT, $Spears.SPEAR_ATTACK, $Spears.SPEAR_USE,
                    properties
                )
                // Tier material, int swingAnimationTicks (attack speed),
                // float chargeDamageMultiplier, 
                // float chargeDelaySeconds, float maxDurationForDismountSeconds, float minSpeedForDismount, 
                // float maxDurationForChargeKnockbackInSeconds, float minSpeedForChargeKnockback, float maxDurationForChargeDamageInSeconds, float minRelativeSpeedForChargeDamage, 
                // SoundEvent hitSound, SoundEvent attackSound, SoundEvent useSound, 
                // Item.Properties settings
            }
        },
        "glaive": {
            isTool: false,
            isWeapon: true,
            isVanilla: false,
            headSuffix: 'blade',
            handle: MODID_ + 'pole',
            nailPos: 'side',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'minecraft:swords',
                'c:swords',
                'realmrpg_quests:quests/cook/cutting',
                'guardvillagers:convertible_guard_items'
            ],
            fluidAmount: 270,
            type: 'import',
            import: ( matName, material, tier ) => {
                var properties = (new $ItemProperties()).durability( tier.getUses() )
                if ( matName.equals( 'netherite' ) || matName.equals( 'warden' ) ) {
                    properties.fireResistant()
                }
                var seconds = ( 1.25 - ( material.properties.weight * 0.1 ) ) * 20.0
                return new $SpearItem( tier, seconds, 
                    0.6 + ( tier.getAttackDamageBonus() * 0.12 ) + ( material.properties.weight * 0.05 ),
                    0.8 - ( tier.getAttackDamageBonus() * 0.1 ), 3.0, ( 11 - tier.getAttackDamageBonus() ), 
                    6.0 - ( tier.getAttackDamageBonus() * 0.5 ), 5.1, 10.0, 4.6,
                    $Spears.SPEAR_HIT, $Spears.SPEAR_ATTACK, $Spears.SPEAR_USE,
                    properties
                )
            }
        },
        "hammer": {
            isTool: false,
            isWeapon: true,
            isVanilla: false,
            headSuffix: 'head',
            handle: MODID_ + 'tool_handle',
            fluidAmount: 540,
            nailPos: 'top',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook'
            ],
            type: 'sword', // To import later...
            // import: ''
        },
        "knife": {
            isTool: true,
            isWeapon: true,
            isVanilla: false,
            headSuffix: 'blade',
            handle: 'minecraft:stick',
            fluidAmount: 70,
            nailPos: 'side',
            tags: [
                'sliceanddice:allowed_tools',
                'farmersdelight:straw_harvesters',
                'nethersdelight:tools/hunting_tools',
                'forge:tools',
                'forge:tools/knives',
                'farmersdelight:tools/knives',
                'minecraft:breaks_decorated_pots',
                'minecraft:tools'
            ],
            type: 'farmersdelight:knife'
        },
        "cleaver": {
            isTool: true,
            isWeapon: true,
            isVanilla: false,
            headSuffix: 'blade',
            handle: 'minecraft:stick',
            fluidAmount: 140,
            nailPos: 'side',
            tags: [
                'minecraft:tools',
                'forge:tools',
                'minecraft:breaks_decorated_pots',
                'amendments:goes_in_tripwire_hook',

                'sliceanddice:allowed_tools',
                'farmersdelight:straw_harvesters',
                'nethersdelight:tools/hunting_tools',
                'forge:tools/knives',
                'farmersdelight:tools/knives',
                'minecraft:breaks_decorated_pots'
            ],
            type: 'import',
            import: ( matName, material, tier ) => {
                var properties = (new $ItemProperties()).durability( tier.getUses() )
                if ( matName.equals( 'netherite' ) || matName.equals( 'warden' ) ) {
                    properties.fireResistant()
                }
                return new $CleaverItem( 2 - ( 0.2 * material.properties.weight ), tier, 2, -3.1, properties )
            }
        }
    },
    crafting: {
        'block': ['','_block'],
        'ingot': ['','_ingot'],
        'raw': ['raw_',''],
        'crushed': ['crushed_raw_',''],
        'dirty': ['dirty_','_dust'],
        'dust': ['','_dust'],
        'sheet': ['','_sheet'],
        'nugget': ['','_nugget']
    }
}

global.weaponry.materials = {
    zinc: {
        fluid: 'createmetallurgy:molten_zinc',
        isStandard: true,
        isAlloy: false,
        canCast: true,
        redoMelting: true,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'furnace',
        processingTimeMult: 0.8,
        requiredMaterialMult: 1,
        properties: {
            weight: 2,
            hardness: 2
        },
        toolItems: {},
        armorItems: {},
        craftItems: {
            block: "create:zinc_block",
            ingot: "create:zinc_ingot",
            raw: "create:raw_zinc",
            crushed: "create:crushed_raw_zinc",
            dirty: "createmetallurgy:dirty_zinc_dust",
            dust: "createmetallurgy:zinc_dust",
            sheet: "createaddition:zinc_sheet",
            nugget: "create:zinc_nugget",
        }
    },
    lead: {
        fluid: "createmetallurgy:molten_lead",
        isStandard: true,
        isAlloy: false,
        canCast: true,
        redoMelting: true,
        craftOverride: ( handheld, name ) => {
            return !name.equals('hammer') && !name.equals('dagger')
        },
        heatRequirement: 'furnace',
        processingTimeMult: 0.8,
        requiredMaterialMult: 2,
        properties: {
            weight: 5,
            hardness: 1
        },
        toolItems: {
            sword: "",
            hoe: "",
            axe: "",
            pick: "",
            shovel: "",
            knife: "delightful:lead_knife",
            dagger: '',
            hammer: ''
        },
        armorItems: {
            chestplate: "",
            helmet: "",
            leggings: "",
            boots: ""
        },
        craftItems: {
            block: "cgs:lead_block",
            ingot: "cgs:lead_ingot",
            raw: "cgs:raw_lead",
            crushed: "create:crushed_raw_lead",
            dirty: "",
            dust: "",
            sheet: "",
            nugget: "cgs:lead_nugget",
        }
    },
    gold: {
        fluid: 'createmetallurgy:molten_gold',
        isStandard: true,
        isAlloy: false,
        canCast: true,
        redoMelting: true,
        craftOverride: ( handheld, name ) => {
            return ( handheld.isVanilla ) || name.equals('knife')
        },
        heatRequirement: 'lowheated',
        processingTimeMult: 0.8,
        requiredMaterialMult: 1,
        properties: {
            weight: 5,
            hardness: 1
        },
        toolItems: {
            sword: "minecraft:golden_sword",
            hoe: "minecraft:golden_hoe",
            axe: "minecraft:golden_axe",
            pick: "minecraft:golden_pickaxe",
            shovel: "minecraft:golden_shovel",
            knife: "farmersdelight:golden_knife",
            cleaver: "dungeonsdelight:golden_cleaver",
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            katana: '',
            rapier: '',
            spear: "minecraft:golden_spear",
            glaive: '',
            hammer: ''
        },
        armorItems: {
            chestplate: "minecraft:golden_chestplate",
            helmet: "minecraft:golden_helmet",
            leggings: "minecraft:golden_leggings",
            boots: "minecraft:golden_boots"
        },
        craftItems: {
            block: "minecraft:gold_block",
            ingot: "minecraft:gold_ingot",
            raw: "minecraft:raw_gold",
            crushed: "create:crushed_raw_gold",
            dirty: "createmetallurgy:dirty_gold_dust",
            dust: "createmetallurgy:gold_dust",
            sheet: "create:golden_sheet",
            nugget: "minecraft:gold_nugget"
        }
    },
    copper: {
        fluid: "createmetallurgy:molten_copper",
        isStandard: true,
        isAlloy: false,
        canCast: true,
        redoMelting: true,
        craftOverride: ( handheld, name ) => {
            return ( handheld.isVanilla ) || name.equals('knife')
        },
        heatRequirement: 'furnace',
        processingTimeMult: 1,
        requiredMaterialMult: 1,
        properties: {
            weight: 4,
            hardness: 2
        },
        toolItems: {
            sword: "",
            hoe: "",
            axe: "",
            pick: "",
            shovel: "",
            // Load bearing coconut: improper items must be made for some reason.
            //  Replace at server startup for proper recipes.
                // sword: "minecraft:copper_sword",
                // hoe: "minecraft:copper_hoe",
                // axe: "minecraft:copper_axe",
                // pick: "minecraft:copper_pickaxe",
                // shovel: "minecraft:copper_shovel",
            knife: "create_things_and_misc:copper_knife",
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            katana: '',
            rapier: '',
            spear: '',
            glaive: '',
            hammer: ''
        },
        armorItems: {
            chestplate: "minecraft:copper_chestplate",
            helmet: "minecraft:copper_helmet",
            leggings: "minecraft:copper_leggings",
            boots: "minecraft:copper_boots"
        },
        craftItems: {
            block: "minecraft:copper_block",
            ingot: "minecraft:copper_ingot",
            raw: "minecraft:raw_copper",
            crushed: "create:crushed_raw_copper",
            dirty: "createmetallurgy:dirty_copper_dust",
            dust: "createmetallurgy:copper_dust",
            sheet: "create:copper_sheet",
            nugget: "create:copper_nugget",
        }
    },
    industrial_iron: {
        fluid: 'createmetallurgy:molten_iron',
        isStandard: true,
        isAlloy: true,
        canCast: false,
        redoMelting: true,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'blast',
        processingTimeMult: 1,
        requiredMaterialMult: 1,
        properties: {
            weight: 4,
            hardness: 5
        },
        toolItems: {},
        armorItems: {
            chestplate: "",
            helmet: ""
        },
        craftItems: {
            block: "create:industrial_iron_block",
            ingot: "createdeco:industrial_iron_ingot",
            sheet: "createdeco:industrial_iron_sheet",
            nugget: "createdeco:industrial_iron_nugget",
        }
    },
    brass: {
        fluid: 'createmetallurgy:molten_brass',
        isStandard: true,
        isAlloy: true,
        canCast: true,
        redoMelting: true,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'heated',
        processingTimeMult: 1,
        requiredMaterialMult: 1,
        properties: {
            weight: 3,
            hardness: 3
        },
        toolItems: {
            sword: "",
            hoe: "",
            axe: "",
            pick: "",
            shovel: "",
            knife: "delightful:brass_knife",
            cleaver: "",
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            spear: '',
            glaive: '',
            hammer: ''
        },
        armorItems: {},
        craftItems: {
            block: "create:brass_block",
            ingot: "create:brass_ingot",
            sheet: "create:brass_sheet",
            nugget: "create:brass_nugget",
        }
    },
    iron: {
        fluid: 'createmetallurgy:molten_iron',
        isStandard: true,
        isAlloy: false,
        canCast: true,
        redoMelting: true,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'heated',
        processingTimeMult: 1.2,
        requiredMaterialMult: 1,
        properties: {
            weight: 3,
            hardness: 3
        },
        toolItems: {
            sword: "minecraft:iron_sword",
            hoe: "minecraft:iron_hoe",
            axe: "minecraft:iron_axe",
            pick: "minecraft:iron_pickaxe",
            shovel: "minecraft:iron_shovel",
            knife: "farmersdelight:iron_knife",
            cleaver: "dungeonsdelight:iron_cleaver",
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            katana: '',
            rapier: '',
            spear: "minecraft:iron_spear",
            glaive: '',
            hammer: ''
        },
        armorItems: {
            chestplate: "minecraft:iron_chestplate",
            helmet: "minecraft:iron_helmet",
            leggings: "minecraft:iron_leggings",
            boots: "minecraft:iron_boots"
        },
        craftItems: {
            block: "minecraft:iron_block",
            ingot: "minecraft:iron_ingot",
            raw: "minecraft:raw_iron",
            crushed: "create:crushed_raw_iron",
            dirty: "createmetallurgy:dirty_iron_dust",
            dust: "createmetallurgy:iron_dust",
            sheet: "create:iron_sheet",
            nugget: "minecraft:iron_nugget",
        }
    },
    silver: {
        fluid: 'createmetallurgy:molten_silver',
        isStandard: true,
        isAlloy: false,
        canCast: true,
        redoMelting: true,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'heated',
        processingTimeMult: 1,
        requiredMaterialMult: 1,
        properties: {
            weight: 2,
            hardness: 3
        },
        toolItems: {
            sword: "simplesilver:silver_sword",
            hoe: "simplesilver:silver_hoe",
            axe: "simplesilver:silver_axe",
            pick: "simplesilver:silver_pickaxe",
            shovel: "simplesilver:silver_shovel",
            knife: "",
            cleaver: "",
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            katana: '',
            rapier: '',
            spear: '',
            glaive: '',
            hammer: ''
        },
        armorItems: {
            chestplate: "simplesilver:silver_chestplate",
            helmet: "simplesilver:silver_helmet",
            leggings: "simplesilver:silver_leggings",
            boots: "simplesilver:silver_boots"
        },
        craftItems: {
            block: "simplesilver:silver_block",
            ingot: "simplesilver:silver_ingot",
            raw: "simplesilver:raw_silver",
            crushed: "",
            dirty: "",
            dust: "",
            sheet: "",
            nugget: "simplesilver:silver_nugget",
        }
    },
    electrum: {
        fluid: 'createmetallurgy:molten_electrum',
        isStandard: true,
        isAlloy: true,
        canCast: true,
        redoMelting: false,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'heated',
        processingTimeMult: 1,
        requiredMaterialMult: 1,
        properties: {
            weight: 3,
            hardness: 3
        },
        toolItems: {
            sword: "",
            hoe: "",
            axe: "",
            pick: "",
            shovel: "",
            knife: "delightful:electrum_knife",
            cleaver: "",
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            katana: '',
            rapier: '',
            spear: '',
            glaive: '',
            hammer: ''
        },
        armorItems: {
            chestplate: '',
            helmet: '',
            leggings: '',
            boots: ''
        },
        craftItems: {
            block: "createaddition:electrum_block",
            ingot: "createaddition:electrum_ingot",
            sheet: "createaddition:electrum_nugget",
            nugget: "createaddition:electrum_sheet",
        }
    },
    diamond: {
        isStandard: false,
        isAlloy: false,
        canCast: false,
        redoMelting: false,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'none',
        processingTimeMult: 1,
        requiredMaterialMult: 1,
        properties: {
            weight: 1,
            hardness: 5
        },
        toolItems: {
            sword: "minecraft:diamond_sword",
            hoe: "minecraft:diamond_hoe",
            axe: "minecraft:diamond_axe",
            pick: "minecraft:diamond_pickaxe",
            shovel: "minecraft:diamond_shovel",
            knife: "farmersdelight:diamond_knife",
            cleaver: "dungeonsdelight:diamond_cleaver",
            spear: "minecraft:diamond_spear",
        },
        armorItems: {
            chestplate: "minecraft:diamond_chestplate",
            helmet: "minecraft:diamond_helmet",
            leggings: "minecraft:diamond_leggings",
            boots: "minecraft:diamond_boots"
        },
        craftItems: {
            block: "minecraft:diamond_block",
            ingot: "minecraft:diamond",
        }
    },
    steel: {
        fluid: 'createmetallurgy:molten_steel',
        isStandard: true,
        isAlloy: true,
        canCast: true,
        redoMelting: false,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'heated',
        processingTimeMult: 1.5,
        requiredMaterialMult: 1,
        properties: {
            weight: 2,
            hardness: 4
        },
        toolItems: {
            sword: "",
            hoe: "",
            axe: "",
            pick: "",
            shovel: "",
            knife: "delightful:steel_knife",
            cleaver: "",
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            katana: '',
            rapier: '',
            spear: '',
            glaive: '',
            hammer: ''
        },
        armorItems: {
            chestplate: '',
            helmet: '',
            leggings: '',
            boots: ''
        },
        craftItems: {
            block: "createmetallurgy:steel_block",
            ingot: "createmetallurgy:steel_ingot",
            sheet: "",
            nugget: "",
        }
    },
    tungsten: {
        fluid: 'createmetallurgy:molten_tungsten',
        isStandard: true,
        isAlloy: false,
        canCast: true,
        redoMelting: false,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'superheated',
        processingTimeMult: 2,
        requiredMaterialMult: 1,
        properties: {
            weight: 5,
            hardness: 5
        },
        toolItems: {
            sword: "",
            hoe: "",
            axe: "",
            pick: "",
            shovel: "",
            knife: "",
            cleaver: "",
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            katana: '',
            rapier: '',
            spear: '',
            glaive: '',
            hammer: ''
        },
        armorItems: {
            chestplate: "",
            helmet: "",
            leggings: "",
            boots: ""
        },
        craftItems: {
            block: "createmetallurgy:tungsten_block",
            ingot: "createmetallurgy:tungsten_ingot",
            raw: "createmetallurgy:raw_wolframite",
            crushed: "createmetallurgy:crushed_raw_wolframite",
            dirty: "createmetallurgy:dirty_wolframite_dust",
            dust: "createmetallurgy:wolframite_dust",
            sheet: "createmetallurgy:tungsten_sheet",
            nugget: "createmetallurgy:tungsten_nugget",
        }
    },
    netherite: {
        fluid: 'createmetallurgy:molten_netherite',
        isStandard: false,
        isAlloy: true,
        canCast: true,
        redoMelting: false,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'superheated',
        processingTimeMult: 2,
        requiredMaterialMult: 1,
        properties: {
            weight: 4,
            hardness: 5
        },
        toolItems: {
            sword: "minecraft:netherite_sword",
            hoe: "minecraft:netherite_hoe",
            axe: "minecraft:netherite_axe",
            pick: "minecraft:netherite_pickaxe",
            shovel: "minecraft:netherite_shovel",
            knife: "farmersdelight:netherite_knife",
            cleaver: "dungeonsdelight:netherite_cleaver",
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            katana: '',
            rapier: '',
            spear: "minecraft:netherite_spear",
            glaive: '',
            hammer: ''
        },
        armorItems: {
            chestplate: "minecraft:netherite_chestplate",
            helmet: "minecraft:netherite_helmet",
            leggings: "minecraft:netherite_leggings",
            boots: "minecraft:netherite_boots"
        },
        craftItems: {
            block: "minecraft:netherite_block",
            ingot: "minecraft:netherite_ingot",
            sheet: "createdeco:netherite_sheet",
            nugget: "createdeco:netherite_nugget",
        }
    },
    warden: {
        isStandard: false,
        isAlloy: true,
        canCast: false,
        redoMelting: false,
        craftOverride: ( handheld, name ) => {
            return false
        },
        heatRequirement: 'superheated',
        processingTimeMult: 1,
        requiredMaterialMult: 1,
        properties: {
            weight: 2,
            hardness: 5
        },
        toolItems: {
            sword: "deeperdarker:warden_sword",
            hoe: "deeperdarker:warden_hoe",
            axe: "deeperdarker:warden_axe",
            pick: "deeperdarker:warden_pickaxe",
            shovel: "deeperdarker:warden_shovel",
            knife: "delightful:warden_knife",
            cleaver: '',
            pickaxe: '',
            pickadze: '',
            grubhoe: '',
            dagger: '',
            katana: '',
            rapier: '',
            spear: '',
            glaive: '',
            hammer: ''
        },
        armorItems: {
            chestplate: "deeperdarker:warden_chestplate",
            helmet: "deeperdarker:warden_helmet",
            leggings: "deeperdarker:warden_leggings",
            boots: "deeperdarker:warden_boots"
        },
        craftItems: {
            ingot: "deeperdarker:warden_carapace"
        }
    }
}

ItemEvents.armorTierRegistry(event => {


    // === Example ===
    // event.add('copper', tier => {
    //     tier.durabilityMultiplier = 45 // Each slot will be multiplied with [13, 15, 16, 11]
    //     tier.slotProtections = [1, 3, 4, 1] // Slot indicies are [FEET, LEGS, BODY, HEAD]
    //     tier.enchantmentValue = 8
    //     tier.equipSound = 'minecraft:item.armor.equip_iron'
    //     tier.repairIngredient = 'forge:ingots/copper'
    //     tier.toughness = 0.0 // diamond has 2.0, netherite 3.0
    //     tier.knockbackResistance = 0.0
    // })
})