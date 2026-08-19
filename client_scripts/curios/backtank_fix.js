//Makes backtanks and jetpacks render when in curios slots

CuriosJSEvents.registerRenderer(event => {

    // register netherite jetpack render
    event.register('create_jetpack:netherite_jetpack', context => {
        let {
            stack,
            slotContext,
            matrixStack,
            renderLayerParent,
            renderTypeBuffer,
            light,
            limbSwing,
            limbSwingAmount,
            partialTicks,
            ageInTicks,
            netHeadYaw,
            headPitch
        } = context

        console.log( 'Identifier: ' + slotContext.identifier )

        let { modelManager } = Client
        let entity = slotContext.entity()
        //let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'))
        let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'facing=north,waterlogged=false'))
        
        //let model = modelManager.getModel(new ModelResourceLocation("create_jetpack:block/netherite_jetpack", '[waterlogged=true,facing=north]'))

        matrixStack.pushPose()
        CuriosRenderer.translateIfSneaking(matrixStack, entity)
        CuriosRenderer.rotateIfSneaking(matrixStack, entity)
        matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))
        matrixStack.translate(0.0,-0.205,0.4375)
        matrixStack.scale(1.025,1.04,1.025)
        //global.say("" + matrixStack + " | " + matrixStack.toString())
        //matrixStack.mulPose(RotationAxis.YP.deg(-netHeadYaw))
        //matrixStack.mulPose(RotationAxis.XP.deg(-headPitch))
        Client.itemRenderer.render(
            stack,
            'none',
            false,
            matrixStack,
            renderTypeBuffer,
            light,
            OverlayTexture.NO_OVERLAY,
            model
        )
        matrixStack.popPose()
    })

    // register jetpack
    event.register('create_jetpack:jetpack', context => {
        let {
            stack,
            slotContext,
            matrixStack,
            renderLayerParent,
            renderTypeBuffer,
            light,
            limbSwing,
            limbSwingAmount,
            partialTicks,
            ageInTicks,
            netHeadYaw,
            headPitch
        } = context

        let { modelManager } = Client
        let entity = slotContext.entity()
        let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'facing=north,waterlogged=false'))
        
        matrixStack.pushPose()
        CuriosRenderer.translateIfSneaking(matrixStack, entity)
        CuriosRenderer.rotateIfSneaking(matrixStack, entity)
        matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))
        matrixStack.translate(0.0,-0.205,0.4375)
        matrixStack.scale(1.025,1.04,1.025)

        Client.itemRenderer.render(
            stack,
            'none',
            false,
            matrixStack,
            renderTypeBuffer,
            light,
            OverlayTexture.NO_OVERLAY,
            model
        )
        matrixStack.popPose()
    })

    // register copper backtank
    event.register('create:copper_backtank', context => {
        let {
            stack,
            slotContext,
            matrixStack,
            renderLayerParent,
            renderTypeBuffer,
            light,
            limbSwing,
            limbSwingAmount,
            partialTicks,
            ageInTicks,
            netHeadYaw,
            headPitch
        } = context

        let { modelManager } = Client
        let entity = slotContext.entity()
        let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'))
        //let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'facing=north,waterlogged=false'))
        
        //let model = modelManager.getModel(new ModelResourceLocation("create_jetpack:block/netherite_jetpack", '[waterlogged=true,facing=north]'))

        matrixStack.pushPose()
        CuriosRenderer.translateIfSneaking(matrixStack, entity)
        CuriosRenderer.rotateIfSneaking(matrixStack, entity)
        matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))
        matrixStack.translate(0.0,-0.1875,0.4375)
        //global.say("" + matrixStack + " | " + matrixStack.toString())
        //matrixStack.mulPose(RotationAxis.YP.deg(-netHeadYaw))
        //matrixStack.mulPose(RotationAxis.XP.deg(-headPitch))
        Client.itemRenderer.render(
            stack,
            'none',
            false,
            matrixStack,
            renderTypeBuffer,
            light,
            OverlayTexture.NO_OVERLAY,
            model
        )
        matrixStack.popPose()
    })

    // register netherite backtank
    event.register('create:netherite_backtank', context => {
        let {
            stack,
            slotContext,
            matrixStack,
            renderLayerParent,
            renderTypeBuffer,
            light,
            limbSwing,
            limbSwingAmount,
            partialTicks,
            ageInTicks,
            netHeadYaw,
            headPitch
        } = context

        let { modelManager } = Client
        let entity = slotContext.entity()
        let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'))
        //let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'facing=north,waterlogged=false'))
        
        //let model = modelManager.getModel(new ModelResourceLocation("create_jetpack:block/netherite_jetpack", '[waterlogged=true,facing=north]'))

        matrixStack.pushPose()
        CuriosRenderer.translateIfSneaking(matrixStack, entity)
        CuriosRenderer.rotateIfSneaking(matrixStack, entity)
        matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))
        matrixStack.translate(0.0,-0.1875,0.4375)
        //global.say("" + matrixStack + " | " + matrixStack.toString())
        //matrixStack.mulPose(RotationAxis.YP.deg(-netHeadYaw))
        //matrixStack.mulPose(RotationAxis.XP.deg(-headPitch))
        Client.itemRenderer.render(
            stack,
            'none',
            false,
            matrixStack,
            renderTypeBuffer,
            light,
            OverlayTexture.NO_OVERLAY,
            model
        )
        matrixStack.popPose()
    })
})