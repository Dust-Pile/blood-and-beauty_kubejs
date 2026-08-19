//priority: 3

global.PI = 3.141592653

if (global.point == null) {
    global.point = {}
}
global.new.point = (x,y,z) => {
    let thisPoint = {
        'class': 'point',

        'x': x, 
        'y': y,
        'z': z,

        'equals': (point) => { return global.point.equals(thisPoint, point) },
        'exactEquals': (point) => { return global.point.exactEquals(thisPoint, point) },
        'toString': () => { return global.point.toString(thisPoint) },
        'toCommandString': () => { return global.point.toCommandString(thisPoint) },
        'distanceFlat': (point) => { return global.point.distanceFlat(thisPoint, point) },
        'distanceCardinal': (point) => { return global.point.distanceCardinal(thisPoint, point) },
        'distance': (point) => { return global.point.distance(thisPoint, point) },
        'midPoint': (point) => { return global.point.midPoint(thisPoint, point) }
    }

    return thisPoint
}
global.point.equals = (pointOne, pointTwo) => {
    return Math.floor(pointOne.x) == Math.floor(pointTwo.x) && Math.floor(pointOne.y) == Math.floor(pointTwo.y) && Math.floor(pointOne.z) == Math.floor(pointTwo.z)
}
global.point.exactEquals = (pointOne, pointTwo) => {
    return pointOne.x == pointTwo.x && pointOne.y == pointTwo.y && pointOne.z == pointTwo.z
}
global.point.toString = (point) => {
    return "x:"+point.x+", y:"+point.y+", z:"+point.z
}
global.point.toCommandString = (point) => {
    return ''+point.x+' '+point.y+' '+point.z
}
global.point.distanceFlat = (point1,point2) => {
    return Math.sqrt(Math.pow((point2.x - point1.x), 2)+Math.pow((point2.z - point1.z), 2))
}
global.point.distance = (point1,point2) => {
    return Math.sqrt(Math.pow((point2.x - point1.x), 2)+Math.pow((point2.y - point1.y), 2)+Math.pow((point2.z - point1.z), 2))
}
global.point.minMax = (pointOne, pointTwo) => {
    var pointOneCopy = Object.assign({}, pointOne )
    pointOne.x = Math.min(pointOne.x, pointTwo.x)
    pointOne.y = Math.min(pointOne.y, pointTwo.y)
    pointOne.z = Math.min(pointOne.z, pointTwo.z)

    pointTwo.x = Math.max(pointOneCopy.x, pointTwo.x)
    pointTwo.y = Math.max(pointOneCopy.y, pointTwo.y)
    pointTwo.z = Math.max(pointOneCopy.z, pointTwo.z)
}
global.point.midPoint = (pointOne, pointTwo) => {
    return global.new.point((pointOne.x + pointTwo.x)/2, (pointOne.y + pointTwo.y)/2, (pointOne.z + pointTwo.z)/2)
}
global.point.distanceCardinal = (pointOne, pointTwo) => {
    return global.new.point(Math.abs(pointOne.x-pointTwo.x), Math.abs(pointOne.y-pointTwo.y), Math.abs(pointOne.z-pointTwo.z))
}