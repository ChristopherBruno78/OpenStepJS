// @import "CPObject.j"

var CPNullSharedNull = nil;

// @implementation CPNull : CPObject
var $the_class = objj_allocateClassPair(CPObject, "CPNull");
objj_registerClassPair($the_class);

// Instance methods
class_addMethods($the_class,
[
    // - (BOOL)isEqual:
    new objj_method(sel_getUid("isEqual:"),
    function $CPNull__isEqual_(self, _cmd, anObject)
    {
        if (self === anObject)
            return YES;

        return /* [anObject isKindOfClass: [CPNull class]] */ (anObject == null ? null : anObject.isa.objj_msgSend1(anObject, "isKindOfClass:", CPNull.isa.objj_msgSend0(CPNull, "class")));
    },
    // argument types
    ["BOOL", "id"]),

    // - (id)initWithCoder:
    new objj_method(sel_getUid("initWithCoder:"),
    function $CPNull__initWithCoder_(self, _cmd, aCoder)
    {
        return /* [CPNull null] */ CPNull.isa.objj_msgSend0(CPNull, "null");
    },
    // argument types
    ["id", "CPCoder"]),

    // - (void)encodeWithCoder:
    new objj_method(sel_getUid("encodeWithCoder:"),
    function $CPNull__encodeWithCoder_(self, _cmd, aCoder)
    {
    },
    // argument types
    ["void", "CPCoder"])
]);

// Class methods
class_addMethods($the_class.isa,
[
    // + (CPNull)null
    new objj_method(sel_getUid("null"),
    function $CPNull__null(self, _cmd)
    {
        if (!CPNullSharedNull)
            CPNullSharedNull = /* [[CPNull alloc] init] */ ((___r1 = CPNull.isa.objj_msgSend0(CPNull, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init"));

        return CPNullSharedNull;

        // Generated receiver temp variables
        var ___r1;
    },
    // argument types
    ["CPNull"])
]);
// @end: @implementation CPNull : CPObject
