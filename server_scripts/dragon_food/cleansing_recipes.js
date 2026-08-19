if ( global.recipes == undefined ) {
    global.recipes = {}
}

global.recipes.materialObject = ( string ) => {
    if ( string.charAt( 0 ) == '#' ) {
        return { "tag": string.substring( 1 ) }
    } else {
        return { "item": string }
    }
}

ServerEvents.recipes( event => {
    event.custom( cleansing( 'dragon_steak', 1, 1200 ).finish() )
    event.custom( cleansing( 'dragon_filet', 2, 1200 ).finish() )
    event.custom( cleansing( 'dragon_round', 1, 2400 ).finish() )
})

var materialObject = global.recipes.materialObject

var cleansing = ( meat, count, processingTime ) => {
    var ingredients = [
        'vintagedelight:vinegar_mason_jar'
    ]

    for ( var i = 0; i < count; i++ ) {
        ingredients.push( 'kubejs:'.concat(meat) )
    }

    return global.recipes.fermenting( 
        ingredients,
        "kubejs:clean_" + meat,
        processingTime,
        count
    )
}

global.recipes.fermenting = ( ingredients, output, processingTime, count, container ) => {
    var template = global.deepCopy( fermentingTemplate )

    if ( typeof ingredients == 'string' ) {
        ingredients = [ingredients]
    }

    if ( ingredients[0] != null ) {
        for ( var ingredient of ingredients ) {
            template.ingredients.push( materialObject( ingredient ) )
        }
    } else {
        template.ingredients = ingredients
    }

    if ( typeof output == 'string' ) {
        template.output.item = output
    } else {
        template.output = output
    }
    
    template.processingTime = processingTime

    if ( count != null ) {
        template.output.count = count
    }
    if ( container != null ) {
        template.container = materialObject( container )
    }

    var recipe = {
        "template": template
    }
    recipe.addSecondaryOutput = ( material, count ) => { addSecondaryOutput( template, material, count ); return recipe }
    recipe.setContainer = ( container ) => { setContainer( template, container ); return recipe }
    recipe.setOutputNbt = ( nbtString ) => { setOutputNbt( template, nbtString ); return recipe }
    recipe.finish = ( event ) => { finish( template, event ); return template }

    return recipe
}

var addSecondaryOutput = ( template, material, count ) => {
    template.secondaryOutput = {}

    if ( typeof material == 'string' ) {
        template.secondaryOutput.item = material
    } else {
        template.secondaryOutput = material
    }

    if ( count != null ) {
        template.secondaryOutput.count = count
    } else {
        template.secondaryOutput.count = 1
    }
}
var setContainer = ( template, container ) => {
    template.container = materialObject( container )
}
var setOutputNbt = ( template, nbtString ) => {
    template.output.nbt = nbtString
}
var finish = ( template, event ) => {
    if ( event != null ) {
        event.custom( template )
    }
}

var fermentingTemplate = {
  "type": "vintagedelight:fermenting",
  "ingredients": [
  ],
  "output": {
    "item": "",
    "count": 1
  },
  "processingTime": 400
}

/*
{
  "type": "vintagedelight:fermenting",
  "ingredients": [
    { "item": "minecraft:blaze_powder" },
    { "item": "vintagedelight:salt_dust" },
    { "item": "minecraft:crimson_fungus" },
    { "item": "minecraft:fermented_spider_eye" },
    { "item": "minecraft:ghast_tear" }
  ],
  "container": { "item": "minecraft:glass_bottle" },
  "output": {
    "item": "minecraft:potion",
    "count": 1,
    "nbt": "{Potion:\"minecraft:water\",CustomPotionEffects:[{Id:5,Amplifier:2,Duration:600},{Id:11,Amplifier:3,Duration:600},{Id:20,Amplifier:0,Duration:400}],CustomPotionColor:11141120,display:{Name:'{\"text\":\"Berserker\\'s Brew\",\"italic\":false}'}}"
  },
  "processingTime": 400
}
*/