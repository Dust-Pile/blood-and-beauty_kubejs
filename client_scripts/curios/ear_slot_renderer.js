// Set artifacts to only render in specific curios slots.

// Classes
const $ItemRenderer = Java.loadClass( 'net.minecraft.client.renderer.entity.ItemRenderer' )
const $OverlayTexture = Java.loadClass( 'net.minecraft.client.renderer.texture.OverlayTexture' )
const $ArtifactLayers = Java.loadClass( 'artifacts.client.item.ArtifactLayers' )
const $VertexConsumer = Java.loadClass( 'com.mojang.blaze3d.vertex.VertexConsumer' )

// Only these models are implemented. All items additionally have specific render layers and other things.
//   See the artifacts github to implement more ( also view the renderers ):
//   https://github.com/ochotonida/artifacts/tree/1.20.1/common/src/main/java/artifacts/client/item/model
const $NecklaceModel = Java.loadClass( 'artifacts.client.item.model.NecklaceModel' )
const $BeltModel = Java.loadClass( 'artifacts.client.item.model.BeltModel' )


// KubeJS Curios registration event
CuriosJSEvents.registerRenderer( event => {

    // Helper function which iterates through objects with access to a key ( value, key ) => {}
    global.forEachIn( problemEarrings, ( properties, id ) => {
        var name = id.split(':')[1] // Remove MODID from id to get name
        const { identifier, bakeLayer } = properties // Per item properties defined below

        // Register Renderers for all items in the object
        event.register( id, context => {
            let { stack, slotContext, matrixStack, renderLayerParent, renderTypeBuffer, light, limbSwing, 
                limbSwingAmount, partialTicks, ageInTicks, netHeadYaw, headPitch
            } = context
            var entity = slotContext.entity()

            // Filter By Curios Slot Identifier
            if ( slotContext.identifier().equals( identifier ) ) {
                var texture = $ArtifactRenderer.getTexturePath( name )
                matrixStack.pushPose()

                // Dynamically get the model
                var model
                switch ( identifier ) {
                    case 'necklace':
                        model = new $NecklaceModel( Client.entityModels.bakeLayer( bakeLayer ) )
                        break
                    case 'belt':
                        model = $BeltModel[ properties.modelFunction ]()
                        break
                    default:
                        console.error( 'Cannot assign model; identifier unknown.' )
                }

                // Basically scraped and js-ified from the artifacts renderers
                //   https://github.com/ochotonida/artifacts/tree/1.20.1/common/src/main/java/artifacts/client/item/renderer
                model.setupAnim( entity, limbSwing, limbSwingAmount, ageInTicks, netHeadYaw, headPitch )
                model.prepareMobModel( entity, limbSwing, limbSwingAmount, partialTicks )
                if ( identifier.equals( 'belt' ) ) {
                    model.setCharmPosition( slotContext.index() )
                }
                $ArtifactRenderer.followBodyRotations( entity, model )

                if ( entity.type.equals( 'minecraft:ghast' ) && identifier.equals( 'necklace' ) ) {
                    model.head.yRot = model.body.yRot
                    matrixStack.scale(2.5, 2.5, 2.5)
                    matrixStack.translate(0, -2.5/16.0, 0)
                }

                var renderType = model.renderType( texture )
                var vertexBuilder = $ItemRenderer.getFoilBuffer( renderTypeBuffer, renderType, false, stack.hasFoil() )
                model.renderToBuffer( matrixStack, vertexBuilder, light, $OverlayTexture.NO_OVERLAY, 1, 1, 1, 1 )

                matrixStack.popPose();
            }
        })
    })
})

// Data
const $ArtifactRenderer = Java.loadClass( 'artifacts.client.item.renderer.ArtifactRenderer' )
var problemEarrings = {
    "artifacts:thorn_pendant": {
        bakeLayer: $ArtifactLayers.PENDANT,
        identifier: 'necklace'
    },
    "artifacts:flame_pendant": {
        bakeLayer: $ArtifactLayers.PENDANT,
        identifier: 'necklace'
    },
    "artifacts:cross_necklace": {
        bakeLayer: $ArtifactLayers.CROSS_NECKLACE,
        identifier: 'necklace'
    },
    "artifacts:panic_necklace": {
        bakeLayer: $ArtifactLayers.PANIC_NECKLACE,
        identifier: 'necklace'
    },
    "artifacts:universal_attractor": {
        bakeLayer: $ArtifactLayers.UNIVERSAL_ATTRACTOR,
        identifier: 'belt',
        modelFunction: 'createUniversalAttractorModel'
    }
}