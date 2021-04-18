/*
 * CPNumber.j
 * Foundation
 *
 */


@import "CPNull.j"
@import "CPObject.j"
@import "CPObjJRuntime.j"

var CPNumberUIDs    = {};

/*!
    @class CPNumber
    @ingroup foundation
    @brief A bridged object to native Javascript numbers.
    This class primarily exists for source compatibility. The JavaScript
    \c Number type can be changed on the fly based on context,
    so there is no need to call any of these methods.
    In other words, native JavaScript numbers are bridged to CPNumber,
    so you can use them interchangeably (including operators and methods).
 */
@implementation CPNumber : CPObject

+ (id)alloc
{
    var result = new Number();
    result.isa = [self class];
    return result;
}

+ (id)numberWithBool:(BOOL)aBoolean
{
    return aBoolean ? 1 : 0;
}

+ (id)numberWithChar:(char)aChar
{
    if (aChar.charCodeAt)
        return aChar.charCodeAt(0);

    return aChar;
}

+ (id)numberWithDouble:(double)aDouble
{
    return aDouble;
}

+ (id)numberWithFloat:(float)aFloat
{
    return aFloat;
}

+ (id)numberWithInt:(int)anInt
{
    return anInt;
}


- (id)initWithBool:(BOOL)aBoolean
{
    return aBoolean;
}

- (id)initWithChar:(char)aChar
{
    if (aChar.charCodeAt)
        return aChar.charCodeAt(0);

    return aChar;
}

- (id)initWithDouble:(double)aDouble
{
    return aDouble;
}

- (id)initWithInt:(int)anInt
{
    return anInt;
}

- (CPString)UID
{
    var UID = CPNumberUIDs[self];

    if (!UID)
    {
        UID = objj_generateObjectUID();
        CPNumberUIDs[self] = UID;
    }

    return UID + "";
}

- (BOOL)boolValue
{
    // Ensure we return actual booleans.
    return self ? true : false;
}

- (char)charValue
{
    return String.fromCharCode(self);
}

- (CPComparisonResult)compare:(CPNumber)aNumber
{
    if (aNumber == nil || aNumber['isa'] === CPNull)
        throw new Error("nil argument");

    if (self > aNumber)
        return CPOrderedDescending;
    else if (self < aNumber)
        return CPOrderedAscending;

    return CPOrderedSame;
}

- (BOOL)isEqualToNumber:(CPNumber)aNumber
{
    return self == aNumber;
}

@end

@implementation CPNumber (CPCoding)

- (id)initWithCoder:(CPCoder)aCoder
{
    return [aCoder decodeObjectForKey: @"self"];
}

- (void)encodeWithCoder:(CPCoder)aCoder
{
    [aCoder encodeNumber: self forKey: @"self"];
}

@end

Number.prototype.isa = CPNumber;
Boolean.prototype.isa = CPNumber;
[CPNumber initialize];
