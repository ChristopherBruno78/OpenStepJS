// @import <Foundation/Foundation.j>

var rect = CPMakeRect(0, 3, 5, 5);

console.assert(CPRectGetMaxY(rect) === 8, "Rect fail");

var pt = CPMakePoint(2, 3);

var size = CPMakeSize(5, 5);

console.log(size);
