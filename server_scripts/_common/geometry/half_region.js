//priority: 0

global.new.region = (point) => {
    let thisRegion = global.new.private.regionForce(point)

    if (thisRegion.isUnique()) {
        global.region.regions[thisRegion.toString()] = thisRegion
        return thisRegion
    }

    return global.region.regions[thisRegion.toString()]
}
global.new.private.regionForce = (point) => {
    let thisRegion = {
        'x': 0,
        'z': 0,

        'toString': () => { return global.region.toString(thisRegion) },
        'isUnique': () => { return global.region.isUnique(thisRegion) },
        'getRelative': (rx,rz) => { return global.region.getRelative(thisRegion, rx, rz) },
        'hasIntersect': (shape) => { return global.region.hasIntersect(thisRegion, shape) }
    }

    thisRegion.x = Math.floor(point.x / global.region.EDGE_LENGTH)
    thisRegion.z = Math.floor(point.z / global.region.EDGE_LENGTH)

    return thisRegion
}
global.region = {
    'EDGE_LENGTH': 256,
    'regions': {}
}
global.region.toString = (region) => {
    return 'r:'+region.x+","+region.z
}
global.region.isUnique = (region) => {
    return global.region.regions[region.toString()] == null
}
global.region.getRelative = (region, rx, rz) => {
    let newRegion = global.new.private.regionForce(global.new.point(0,0,0))
    newRegion.x = region.x + rx
    newRegion.z = region.z + rz

    if (newRegion.isUnique()) {
        global.region.regions[newRegion.toString()] = newRegion
        return newRegion
    }

    return global.region.regions[newRegion.toString()]
}
global.region.hasIntersect = (region, shape) => {
    let cornerOne = global.new.point(region.x*global.region.EDGE_LENGTH, 0, region.z*global.region.EDGE_LENGTH)
    let cornerTwo = global.new.point((region.x + 1)*global.region.EDGE_LENGTH, 0, (region.z + 1)*global.region.EDGE_LENGTH)
    let regionRect = global.new.rect(cornerOne, cornerTwo)
    return regionRect.hasIntersect(shape)
}
//---
global.region.getRegions = (shape) => {
    if (shape.radius < 0) {
        return null
    }

    var regions = []
    let centerRegion = global.new.region(shape.center)
    let reachMax = Math.ceil(shape.radius / global.region.EDGE_LENGTH)
    for (var i = 0 - reachMax; i <= reachMax; i++) {
        for (var j = 0 - reachMax; j <= reachMax; j++) {
            let currentRegion = centerRegion.getRelative(i, j)
            if (currentRegion.hasIntersect(shape)) {
                regions.splice(regions.length, 0, currentRegion)
            }
        }
    }
    

    return regions
}