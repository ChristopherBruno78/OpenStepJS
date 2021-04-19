// @import "_CGGeometry.j"

// @typedef CPRectEdge
objj_registerTypeDef(objj_allocateTypeDef("CPRectEdge"));
CPMinXEdge = 0;
CPMinYEdge = 1;
CPMaxXEdge = 2;
CPMaxYEdge = 3;
CPMakePoint = CGPointMake;
CPMakeSize = CGSizeMake;
CPMakeRect = CGRectMake;
CPPointCreateCopy = CGPointMakeCopy;
CPPointEqualToPoint = CGPointEqualToPoint;
CPPointInRect = function(aPoint, aRect)
{
    return CGRectContainsPoint(aRect, aPoint);
};

CPRectEqualToRect = CGRectEqualToRect;
CPRectIsEmpty = CGRectIsEmpty;
CPRectContainsRect = CGRectContainsRect;
CPRectIntersection = CGRectIntersection;
CPPointMake = CGPointMake;
CPRectInset = CGRectInset;
CPRectIntegral = CGRectIntegral;
CPRectCreateCopy = CGRectCreateCopy;
CPRectMake = CGRectMake;
CPRectOffset = CGRectOffset;
CPRectStandardize = CGRectStandardize;
CPRectUnion = CGRectUnion;
CPSizeCreateCopy = CGSizeCreateCopy;
CPSizeMake = CGSizeMake;
CPRectContainsPoint = CGRectContainsPoint;
CPRectGetHeight = CGRectGetHeight;
CPRectGetMaxX = CGRectGetMaxX;
CPRectGetMaxY = CGRectGetMaxY;
CPRectGetMidX = CGRectGetMidX;
CPRectGetMidY = CGRectGetMidY;
CPRectGetMinX = CGRectGetMinX;
CPRectGetMinY = CGRectGetMinY;
CPRectGetWidth = CGRectGetWidth;
CPRectIntersectsRect = CGRectIntersectsRect;
CPRectIsNull = CGRectIsNull;
CPDivideRect = CGRectDivide;
CPSizeEqualToSize = CGSizeEqualToSize;
CPStringFromPoint = CGStringFromPoint;
CPStringFromSize = CGStringFromSize;
CPStringFromRect = CGStringFromRect;
CPPointFromString = CGPointFromString;
CPSizeFromString = CGSizeFromString;
CPRectFromString = CGRectFromString;
CPPointFromEvent = CGPointFromEvent;
CPSizeMakeZero = CGSizeMakeZero;
CPRectMakeZero = CGRectMakeZero;
CPPointMakeZero = CGPointMakeZero;
