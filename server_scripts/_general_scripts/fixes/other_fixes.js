ServerEvents.recipes(event => {

	//Fix Nether Fizz Recipe
    event.remove({ input: 'minecraft:crimson_fungus', output: 'nethervinery:lava_fizz' })
    event.custom(
        {
            "type": "vinery:wine_fermentation",
            "juice": {
              "type": "red_crimson",
              "amount": 12
            },
            "ingredients": [
              {
                "item": "minecraft:crimson_fungus"
              },
              {
                "item": "minecraft:warped_fungus"
              }
            ],
            "wine_bottle": {
              "required": true
            },
            "result": {
              "item": "nethervinery:nether_fizz",
              "count": 1
            }
        }
    )

	//Fix cloud latte (overwritten before)
    event.replaceInput(
        { output: 'quarkdelight:cloud_latte' },
        'minecraft:cocoa_beans',
        'createcafe:roasted_coffee_beans'
    )

    //Remove bucket dupe
    event.remove({ output: "quarkdelight:bucket_of_sweet_gelatine" })
    event.recipes.farmersdelight.cooking(
	    ["quark:slime_in_a_bucket",'minecraft:wheat','minecraft:sugar'],
	    'quarkdelight:bucket_of_sweet_gelatine', // output
	    1, // exp
	    10, // cookTime
	    'minecraft:bucket', // container
	);

	//Add back mushroom stew
	event.shapeless(
		"minecraft:mushroom_stew",
		[
			"minecraft:bowl",
			"minecraft:brown_mushroom",
			"minecraft:red_mushroom"
		]
	)
})

// Picky Wheels: Make all biomes whitelisted
// TODO: May not be needed
ServerEvents.tags('worldgen/biome', event => {
    event.add('createpickywheels:windmills_whitelist', /.*/)
    event.add('createpickywheels:waterwheels_whitelist', /.*/)
})