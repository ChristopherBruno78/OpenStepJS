// @import "CPNull.j"

// @import "CPObject.j"

// @import "CPObjJRuntime.j"

var CPNumberUIDs = {};

// @implementation CPNumber : CPObject
var $the_class = objj_allocateClassPair(CPObject, "CPNumber");
objj_registerClassPair($the_class);

// Instance methods
class_addMethods($the_class,
[
    // - (id)initWithBool:
    new objj_method(sel_getUid("initWithBool:"),
    function $CPNumber__initWithBool_(self, _cmd, aBoolean)
    {
        return aBoolean;
    },
    // argument types
    ["id", "BOOL"]),

    // - (id)initWithChar:
    new objj_method(sel_getUid("initWithChar:"),
    function $CPNumber__initWithChar_(self, _cmd, aChar)
    {
        if (aChar.charCodeAt)
            return aChar.charCodeAt(0);

        return aChar;
    },
    // argument types
    ["id", "char"]),

    // - (id)initWithDouble:
    new objj_method(sel_getUid("initWithDouble:"),
    function $CPNumber__initWithDouble_(self, _cmd, aDouble)
    {
        return aDouble;
    },
    // argument types
    ["id", "double"]),

    // - (id)initWithInt:
    new objj_method(sel_getUid("initWithInt:"),
    function $CPNumber__initWithInt_(self, _cmd, anInt)
    {
        return anInt;
    },
    // argument types
    ["id", "int"]),

    // - (CPString)UID
    new objj_method(sel_getUid("UID"),
    function $CPNumber__UID(self, _cmd)
    {
        var UID = CPNumberUIDs[self];

        if (!UID)
        {
            UID = objj_generateObjectUID();
            CPNumberUIDs[self] = UID;
        }

        return UID + "";
    },
    // argument types
    ["CPString"]),

    // - (BOOL)boolValue
    new objj_method(sel_getUid("boolValue"),
    function $CPNumber__boolValue(self, _cmd)
    {
        return self ? true : false;
    },
    // argument types
    ["BOOL"]),

    // - (char)charValue
    new objj_method(sel_getUid("charValue"),
    function $CPNumber__charValue(self, _cmd)
    {
        return String.fromCharCode(self);
    },
    // argument types
    ["char"]),

    // - (CPComparisonResult)compare:
    new objj_method(sel_getUid("compare:"),
    function $CPNumber__compare_(self, _cmd, aNumber)
    {
        if (aNumber == nil || aNumber['isa'] === CPNull)
            throw new Error("nil argument");

        if (self > aNumber)
            return CPOrderedDescending;
        else if (self < aNumber)
            return CPOrderedAscending;

        return CPOrderedSame;
    },
    // argument types
    ["CPComparisonResult", "CPNumber"]),

    // - (BOOL)isEqualToNumber:
    new objj_method(sel_getUid("isEqualToNumber:"),
    function $CPNumber__isEqualToNumber_(self, _cmd, aNumber)
    {
        return self == aNumber;
    },
    // argument types
    ["BOOL", "CPNumber"])
]);

// Class methods
class_addMethods($the_class.isa,
[
    // + (id)alloc
    new objj_method(sel_getUid("alloc"),
    function $CPNumber__alloc(self, _cmd)
    {
        var result = new Number();

        result.isa = /* [self class] */ self.isa.objj_msgSend0(self, "class");

        return result;
    },
    // argument types
    ["id"]),

    // + (id)numberWithBool:
    new objj_method(sel_getUid("numberWithBool:"),
    function $CPNumber__numberWithBool_(self, _cmd, aBoolean)
    {
        return aBoolean ? 1 : 0;
    },
    // argument types
    ["id", "BOOL"]),

    // + (id)numberWithChar:
    new objj_method(sel_getUid("numberWithChar:"),
    function $CPNumber__numberWithChar_(self, _cmd, aChar)
    {
        if (aChar.charCodeAt)
            return aChar.charCodeAt(0);

        return aChar;
    },
    // argument types
    ["id", "char"]),

    // + (id)numberWithDouble:
    new objj_method(sel_getUid("numberWithDouble:"),
    function $CPNumber__numberWithDouble_(self, _cmd, aDouble)
    {
        return aDouble;
    },
    // argument types
    ["id", "double"]),

    // + (id)numberWithFloat:
    new objj_method(sel_getUid("numberWithFloat:"),
    function $CPNumber__numberWithFloat_(self, _cmd, aFloat)
    {
        return aFloat;
    },
    // argument types
    ["id", "float"]),

    // + (id)numberWithInt:
    new objj_method(sel_getUid("numberWithInt:"),
    function $CPNumber__numberWithInt_(self, _cmd, anInt)
    {
        return anInt;
    },
    // argument types
    ["id", "int"])
]);
// @end: @implementation CPNumber : CPObject

// @implementation CPNumber (CPCoding)
var $the_class = objj_getClass("CPNumber");

if (!$the_class)
    throw new ReferenceError("Cannot find declaration for class 'CPNumber'");


// Instance methods
class_addMethods($the_class,
[
    // - (id)initWithCoder:
    new objj_method(sel_getUid("initWithCoder:"),
    function $CPNumber__initWithCoder_(self, _cmd, aCoder)
    {
        return /* [aCoder decodeObjectForKey: @"self"] */ (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "self"));
    },
    // argument types
    ["id", "CPCoder"]),

    // - (void)encodeWithCoder:
    new objj_method(sel_getUid("encodeWithCoder:"),
    function $CPNumber__encodeWithCoder_(self, _cmd, aCoder)
    {
        /* [aCoder encodeNumber: self forKey: @"self"] */ (aCoder == null ? null : aCoder.isa.objj_msgSend2(aCoder, "encodeNumber:forKey:", self, "self"));
    },
    // argument types
    ["void", "CPCoder"])
]);
// @end: @implementation CPNumber (CPCoding)

Number.prototype.isa = CPNumber;
Boolean.prototype.isa = CPNumber;
/* [CPNumber initialize] */ CPNumber.isa.objj_msgSend0(CPNumber, "initialize");
