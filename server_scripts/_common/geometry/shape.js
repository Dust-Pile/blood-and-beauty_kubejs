//priority: 2

if (global.shape == null) {
    global.shape = {
        'TYPES': ['rect','circle', 'sphere', 'cuboid'],
        'COMPLEX_THRESH': 30,
        'circle': {},
        'sphere': {},
        'rect': {},
        'cuboid': {},
    }
}

//---
global.new.shape = (type, start) => {
    if (!global.shape.TYPES.includes(type)) {
        return null
    }

    let thisShape = {
        'type': type,
        'start': start,

        'isComplex': () => { return global.shape.isComplex(thisShape) },
        'toString': () => { return global.shape.toString(thisShape) },
        'hasIntersect': (shape) => { return global.shape.hasIntersect(thisShape, shape) }
        //'contains': (point) => { return global.shape.contains(thisShape, point) }
    }

    thisShape.isFlat = thisShape.type.equals('circle') || thisShape.type.equals('rect')

    return thisShape
}
global.new.circle = (center, radius) => {
    let thisShape = global.new.shape('circle', center)
    thisShape.center = center
    thisShape.radius = radius

    thisShape.contains = (point) => { return global.shape.circle.contains(thisShape, point) }

    thisShape.perimeter = 2*global.PI*thisShape.radius
    thisShape.area = global.PI*Math.pow(thisShape.radius, 2)
    thisShape.complex = 12

    return thisShape
}
global.new.sphere = (start, radius) => {
    let thisShape = global.new.shape('sphere', start)
    thisShape.center = center
    thisShape.radius = radius

    thisShape.contains = (point) => { return global.shape.sphere.contains(thisShape, point) }

    thisShape.perimeter = 2*global.PI*thisShape.radius
    thisShape.area = global.PI*Math.pow(thisShape.radius, 2)
    thisShape.complex = 12

    return thisShape
}
global.new.rect = (start, end) => {
    let thisShape = global.new.shape('rect', start)
    thisShape.end = end
    thisShape.center = start.midPoint(end)
    thisShape.radius = thisShape.center.distanceFlat(start)

    thisShape.contains = (point) => { return global.shape.rect.contains(thisShape, point) }

    global.point.minMax(thisShape.start, thisShape.end)
    thisShape.xLen = thisShape.end.x - thisShape.start.x
    thisShape.zLen = thisShape.end.z - thisShape.start.z
    thisShape.perimeter = (thisShape.xLen*2) + (thisShape.zLen*2)
    thisShape.area = thisShape.xLen*thisShape.zLen
    thisShape.complex = (thisShape.perimeter*thisShape.perimeter)/thisShape.area

    return thisShape
}
global.new.cuboid = (start, end) => {
    let thisShape = global.new.shape('cuboid', start)
    thisShape.end = end
    thisShape.center = start.midPoint(end)
    thisShape.radius = thisShape.center.distance(start)

    thisShape.contains = (point) => { return global.shape.cuboid.contains(thisShape, point) }

    global.point.minMax(thisShape.start, thisShape.end)
    thisShape.xLen = thisShape.end.x - thisShape.start.x
    thisSHape.yLen = thisShape.end.y - thisShape.start.y
    thisShape.zLen = thisShape.end.z - thisShape.start.z
    thisShape.perimeter = Math.min((thisShape.xLen+thisShape.yLen)*2, (thisShape.yLen+thisShape.zLen)*2, (thisShape.xLen+thisShape.zLen)*2)
    thisShape.area = Math.min(thisShape.xLen*thisShape.yLen, thisShape.yLen*thisShape.zLen, thisShape.xLen*thisShape.zLen)
    thisShape.complex = (thisShape.perimeter*thisShape.perimeter)/thisShape.area
    thisShape.area = Math.max(thisShape.xLen*thisShape.yLen, thisShape.yLen*thisShape.zLen, thisShape.xLen*thisShape.zLen)
    thisShape.perimeter = (thisShape.xLen+thisShape.zLen)*2

    return thisShape
}
//---
global.shape.circle.contains = (shape, point) => {
    return shape.center.distanceFlat(point) <= shape.radius
}
global.shape.sphere.contains = (shape, point) => {
    return shape.center.distance(point) <= shape.radius
}
global.shape.rect.contains = (shape, point) => {
    return point.x >= shape.start.x && point.z >= shape.start.z && point.x <= shape.end.x && point.z <= shape.end.z
}
global.shape.cuboid.contains = (shape, point) => {
    if (global.shape.rect.contains(shape, point)) {
        return point.y >= shape.start.y && point.y <= shape.end.y
    }
}
global.shape.contains = (shape, point) => {
    if (shape.type.equals('circle')) {
        return global.shape.circle.contains(shape, point)
    } else if (shape.type.equals('sphere')) {
        return global.shape.sphere.contains(shape, point)
    } else if (shape.type.equals('rect')) {
        return global.shape.rect.contains(shape, point)
    } else if (shape.type.equals('cuboid')) {
        return global.shape.cuboid.contains(shape, point)
    }
    return false
}
//---
global.shape.toString = (shape) => {
    let shapeString = ''+shape.type
    switch (shape.type) {
        case 'rect':
            shapeString += ", Start: "+shape.start.toString() + ", End: "+shape.end.toString()
            break
        default:
            shapeString += ", Center: "+shape.center.toString() + ', Radius: '+shape.radius
            break
    }
    
    return shapeString
}
global.shape.isComplex = (shape) => {
    if (shape.complex > global.shape.COMPLEX_THRESH) {
        return true
    }
    return false
}
global.shape.hasIntersect = (shapeOne, shapeTwo) => {
    if (shapeOne.isFlat || shapeTwo.isFlat) {
        if (shapeOne.type.equals('rect') && shapeTwo.type.equals('rect')) {
            let distance = shapeTwo.center.distanceCardinal(shapeOne.center)
            return (distance.x <= (shapeOne.xLen + shapeTwo.xLen)/2) && (distance.z <= (shapeOne.zLen + shapeTwo.zLen)/2)
        } else if (shapeOne.type.equals('rect') || shapeTwo.type.equals('rect')) {
            var rect
            var circle
            if (shapeOne.type.equals('rect')) {
                rect = shapeOne
                circle = shapeTwo
            } else {
                rect = shapeTwo
                circle = shapeOne
            }
            let dist = rect.center.distanceCardinal(circle.center)
            if ((dist.x < rect.xLen/2 && dist.z < (rect.zLen/2)+circle.radius) || (dist.z < rect.zLen/2 && dist.x < (rect.xLen/2)+circle.radius)) {
                return true
            } else {
                let pointThree = global.new.point(rect.start.x, 0, rect.end.z)
                let pointFour = global.new.point(rect.end.x, 0, rect.start.z)
                return circle.contains(rect.start) || circle.contains(rect.end) || circle.contains(pointThree) || circle.contains(pointFour)
            }
        }
        return (shapeOne.center.distanceFlat(shapeTwo.center) - shapeOne.radius - shapeTwo.radius) < 0
    } else {
        return (shapeOne.center.distance(shapeTwo.center) - shapeOne.radius - shapeTwo.radius) < 0
    }
}
