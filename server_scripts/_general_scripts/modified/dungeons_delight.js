const $EntityTypeTags = Java.loadClass( "net.minecraft.tags.EntityTypeTags" )
const $ProjectileImpactEvent = Java.loadClass( "net.minecraftforge.event.entity.ProjectileImpactEvent" )
const $HitResult = Java.loadClass( "net.minecraft.world.phys.HitResult" )

global.addListener( 
    "net.minecraftforge.event.entity.ProjectileImpactEvent",
    "shootWormouth",
    event => handler( event.getProjectile(), event.getRayTraceResult() )
)

/**
 * @param { Internal.Entity } projectile 
 * @param { Internal.BlockHitResult } hitResult 
 */
function handler( projectile, hitResult ) {
    if ( !projectile.entityType.is( $EntityTypeTags.IMPACT_PROJECTILES ) || hitResult.type != $HitResult.Type.BLOCK ) {
        return
    }
    
    var pos = hitResult.getBlockPos()
    var level = projectile.level
    var blockState = level.getBlockState( pos )
    if ( !blockState.is( "dungeonsdelight:wormouth" ) ) {
        return
    }

    level.getBlock( pos ).popItem( 'dungeonsdelight:wormouth' )
    global.run( "execute in " + level.name.string + " run setblock" + global.locFormat( pos ) + " minecraft:air destroy" )
}