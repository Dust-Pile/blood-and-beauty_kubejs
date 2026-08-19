//priority: 4
const $Tiers = Java.loadClass("net.minecraft.world.item.Tiers")
const $ForgeTier = Java.loadClass("net.minecraftforge.common.ForgeTier")
const $BlockTags = Java.loadClass("net.minecraft.tags.BlockTags")

if ( global.TIERS == undefined ) {
    global.TIERS = {
        'wood': $Tiers.WOOD,
        'stone': $Tiers.STONE,
        'lead': {},
        'gold': $Tiers.GOLD,
        'copper': {},
        'brass': {},
        'iron': $Tiers.IRON,
        'silver': {},
        'electrum': {},
        'steel': {},
        'tungsten': {},
        'netherite': $Tiers.NETHERITE,
        'warden': {}
    }
}

const materials = global.weaponry.materials
ItemEvents.toolTierRegistry(event => {
    global.forEachIn( materials, ( material, name ) => {
        if ( tierData[name] == null ) {
            return
        }

        // Is this even needed?
        event.add( name, tier => {
            tier.uses = tierData[name].uses
            tier.speed = tierData[name].speed
            tier.attackDamageBonus = tierData[name].attackDamageBonus
            tier.level = tierData[name].level
            tier.enchantmentValue = tierData[name].enchantmentValue
            tier.repairIngredient = material.craftItems.ingot
        })

        global.TIERS[name] = new $ForgeTier( 
            tierData[name].level, tierData[name].uses, tierData[name].speed, 
            tierData[name].attackDamageBonus, tierData[name].enchantmentValue, 
            $BlockTags.create( 'placeholder:placeholder' ), () => Ingredient.of( material.craftItems.ingot ))
    })
})

// const handhelds = global.weaponry.castingItems.handheld
// ItemEvents.modification( event => {
//     global.forEachIn( materials, ( material, matName ) => {
//         if ( tierModifiers[matName] == null ) {
//             return
//         }

//         global.forEachIn( handhelds, ( handheld, name ) => {
//             event.modify( material.toolItems[name], item => {
//                 item.maxDamage += tierModifiers[matName].uses
//                 // item.digSpeed += tierModifiers[matName].speed
//                 // item.attackDamage += tierModifiers[matName].attackDamageBonus
//             })
//         })
//     })
// })

// Data
// const tierModifiers = {
//     'copper': {
//         uses: 10,
//         speed: 1,
//         attackDamageBonus: 1
//     },
//     'netherite': {
//         uses: 500,
//         speed: 1,
//         attackDamageBonus: 1.5
//     },
//     'warden': {
//         uses: 500,
//         speed: 1,
//         attackDamageBonus: 2
//     }
// }
const tierData = {
    lead: {
        uses: 32,
        speed: 11.0,
        attackDamageBonus: 1.0,
        level: 1,
        enchantmentValue: 1
    },
    copper: {
        uses: 190, 
        speed: 5.0, 
        attackDamageBonus: 1.0,
        level: 2,
        enchantmentValue: 13
    },
    brass: {
        uses: 256,
        speed: 5.5,
        attackDamageBonus: 2.5,
        level: 1,
        enchantmentValue: 18
    },
    silver: {
        uses: 1041, 
        speed: 9.0, 
        attackDamageBonus: 2.0, 
        level: 3,
        enchantmentValue: 20
    },
    electrum: {
        uses: 1041,
        speed: 10.0,
        attackDamageBonus: 4,
        level: 3,
        enchantmentValue: 20
    },
    steel: {
        uses: 1536,
        speed: 8.0,
        attackDamageBonus: 4,
        level: 3,
        enchantmentValue: 12
    },
    tungsten: {
        uses: 2031,
        speed: 9.0,
        attackDamageBonus: 5,
        level: 4,
        enchantmentValue: 10
    },
    warden: {
        uses: 2519,
        speed: 10,
        attackDamageBonus: 5,
        level: 5,
        enchantmentValue: 18
    }
}

/*
event.add( 'lead', tier => {
        tier.uses = 32
        tier.speed = 11.0
        tier.attackDamageBonus = 1.0
        tier.level = 1
        tier.enchantmentValue = 1
        tier.repairIngredient = materials.lead.craftItems.ingot
    })

    event.add( 'copper', tier => {
        tier.uses = 256
        tier.speed = 6.0
        tier.attackDamageBonus = 2
        tier.level = 1
        tier.enchantmentValue = 18
        tier.repairIngredient = materials.copper.craftItems.ingot
    })

    event.add( 'brass', tier => {
        tier.uses = 384
        tier.speed = 7.25
        tier.attackDamageBonus = 3
        tier.level = 2
        tier.enchantmentValue = 10
        tier.repairIngredient = materials.brass.craftItems.ingot
    })

    event.add( 'electrum', tier => {
        tier.uses = 1041
        tier.speed = 10.0
        tier.attackDamageBonus = 4
        tier.level = 3
        tier.enchantmentValue = 20
        tier.repairIngredient = materials.electrum.craftItems.ingot
    })

    event.add( 'steel', tier => {
        tier.uses = 1536
        tier.speed = 8.0
        tier.attackDamageBonus = 4
        tier.level = 3
        tier.enchantmentValue = 12
        tier.repairIngredient = materials.steel.craftItems.ingot
    })

    event.add( 'tungsten', tier => {
        tier.uses = 2031
        tier.speed = 9.0
        tier.attackDamageBonus = 5
        tier.level = 4
        tier.enchantmentValue = 10
        tier.repairIngredient = materials.tungsten.craftItems.ingot
    })
    */

/*
const $TierSortingRegistry = Java.loadClass("net.minecraftforge.common.TierSortingRegistry")
const $Tiers = Java.loadClass("net.minecraft.world.item.Tiers")
const $ForgeTier = Java.loadClass("net.minecraftforge.common.ForgeTier")

ItemEvents.toolTierRegistry((event) => {
  event.add("bronze", (tier) => {
    tier.uses = 100
    tier.speed = 2.0
    tier.attackDamageBonus = 1.0
  //You can edit these values however youd like EXCEPT for "tier.level", it must be -1 to work properly
    tier.level = -1
    tier.enchantmentValue = 5.0
  //Make sure to set the "tier.repairIngredient" to the item or tag you want to use in your recipy
    tier.repairIngredient = "#forge:ingots/bronze"
  })
//The "$BlockTags.create" should contain the name of the tag you want to use to set the material requirment of your block, it's best to folow the name format of "<mod_name>:needs_<material>_tool"
//The "Ingredient.of" should contain the item or tag you want to use in your recipy
  $TierSortingRegistry.registerTier(BronzeTier, "bronze", [$Tiers.STONE], [$Tiers.IRON])
})

//Register the pick with your new tier
StartupEvents.registry('item', event => {
  event.create('bronze_pickaxe', 'pickaxe').tier('bronze')
})
*/