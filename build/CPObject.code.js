// @import "CPObjJRuntime.j"

// @implementation CPObject
var $the_class = objj_allocateClassPair(Nil, "CPObject");
objj_registerClassPair($the_class);

class_addIvars($the_class,
[
    new objj_ivar("isa", "id")
]);

// Instance methods
class_addMethods($the_class,
[
    // - (CPString)className
    new objj_method(sel_getUid("className"),
    function $CPObject__className(self, _cmd)
    {
        return self.isa.name;
    },
    // argument types
    ["CPString"]),

    // - (BOOL)isKindOfClass:
    new objj_method(sel_getUid("isKindOfClass:"),
    function $CPObject__isKindOfClass_(self, _cmd, aClass)
    {
        return /* isSubclassOfClass: aClass];
}

 */ ((___r1 = self.isa), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "isSubclassOfClass:", aClass));

        // Generated receiver temp variables
        var ___r1;
    },
    // argument types
    ["BOOL", "Class"]),

    // - (id)init
    new objj_method(sel_getUid("init"),
    function $CPObject__init(self, _cmd)
    {
        return self;
    },
    // argument types
    ["id"]),

    // - (BOOL)respondsToSelector:
    new objj_method(sel_getUid("respondsToSelector:"),
    function $CPObject__respondsToSelector_(self, _cmd, aSelector)
    {
        return !!class_getInstanceMethod(self.isa, aSelector);
    },
    // argument types
    ["BOOL", "SEL"]),

    // - (unsigned)hash
    new objj_method(sel_getUid("hash"),
    function $CPObject__hash(self, _cmd)
    {
        return /*  UID];
}

 */ self.isa.objj_msgSend0(self, "UID");
    },
    // argument types
    ["unsigned"]),

    // - (CPString)UID
    new objj_method(sel_getUid("UID"),
    function $CPObject__UID(self, _cmd)
    {
        if (typeof self._UID === "undefined")
            self._UID = objj_generateObjectUID();

        return self._UID + "";
    },
    // argument types
    ["CPString"]),

    // - (CPString)description
    new objj_method(sel_getUid("description"),
    function $CPObject__description(self, _cmd)
    {
        return "<" + class_getName(self.isa) + " 0x" + /* ring stringWithHash: [self UID]] + "> */ (CPString == null ? null : CPString.isa.objj_msgSend1(CPString, "stringWithHash:", self.isa.objj_msgSend0(self, "UID"))) + ">";
    },
    // argument types
    ["CPString"]),

    // - (id)performSelector:
    new objj_method(sel_getUid("performSelector:"),
    function $CPObject__performSelector_(self, _cmd, aSelector)
    {
        return self.isa.objj_msgSend0(self, aSelector);
    },
    // argument types
    ["id", "SEL"]),

    // - (id)performSelector:withObject:
    new objj_method(sel_getUid("performSelector:withObject:"),
    function $CPObject__performSelector_withObject_(self, _cmd, aSelector, anObject)
    {
        return self.isa.objj_msgSend1(self, aSelector, anObject);
    },
    // argument types
    ["id", "SEL", "id"]),

    // - (id)performSelector:withObject:withObject:
    new objj_method(sel_getUid("performSelector:withObject:withObject:"),
    function $CPObject__performSelector_withObject_withObject_(self, _cmd, aSelector, anObject, anotherObject)
    {
        return self.isa.objj_msgSend2(self, aSelector, anObject, anotherObject);
    },
    // argument types
    ["id", "SEL", "id", "id"]),

    // - (id)performSelector:withObjects:
    new objj_method(sel_getUid("performSelector:withObjects:"),
    function $CPObject__performSelector_withObjects_(self, _cmd, aSelector, anObject)
    {
        var params = [self, aSelector].concat(Array.prototype.slice.apply(arguments, [3]));

        return objj_msgSend.apply(this, params);
    },
    // argument types
    ["id", "SEL", "id"]),

    // - (id)forwardingTargetForSelector:
    new objj_method(sel_getUid("forwardingTargetForSelector:"),
    function $CPObject__forwardingTargetForSelector_(self, _cmd, aSelector)
    {
        return nil;
    },
    // argument types
    ["id", "SEL"]),

    // - (void)forwardInvocation:
    new objj_method(sel_getUid("forwardInvocation:"),
    function $CPObject__forwardInvocation_(self, _cmd, anInvocation)
    {
        /*  doesNotRecognizeSelector: [anInvocation selector]];
}

 */ self.isa.objj_msgSend1(self, "doesNotRecognizeSelector:", (anInvocation == null ? null : anInvocation.isa.objj_msgSend0(anInvocation, "selector")));
    },
    // argument types
    ["void", "CPInvocation"]),

    // - (BOOL)doesNotRecognizeSelector:
    new objj_method(sel_getUid("doesNotRecognizeSelector:"),
    function $CPObject__doesNotRecognizeSelector_(self, _cmd, aSelector)
    {
        throw new Error((class_isMetaClass(self.isa) ? "+" : "-") + " [" + /* className] + " " */ self.isa.objj_msgSend0(self, "className") + " " + aSelector + "] unrecognized selector sent to " + (class_isMetaClass(self.isa) ? "class " + class_getName(self.isa) : "instance " + /* UID]));
}
 */ self.isa.objj_msgSend0(self, "UID")));
    },
    // argument types
    ["BOOL", "SEL"]),

    // - (BOOL)isEqual:
    new objj_method(sel_getUid("isEqual:"),
    function $CPObject__isEqual_(self, _cmd, anObject)
    {
        return self === anObject || /* UID] === [ */ self.isa.objj_msgSend0(self, "UID") === /* ect UID];
}

/ */ (anObject == null ? null : anObject.isa.objj_msgSend0(anObject, "UID"));
    },
    // argument types
    ["BOOL", "id"]),

    // - (Class)_superclass
    new objj_method(sel_getUid("_superclass"),
    function $CPObject___superclass(self, _cmd)
    {
        return self.isa._super_class;
    },
    // argument types
    ["Class"])
]);

// Class methods
class_addMethods($the_class.isa,
[
    // + (id)alloc
    new objj_method(sel_getUid("alloc"),
    function $CPObject__alloc(self, _cmd)
    {
        return class_createInstance(self);
    },
    // argument types
    ["id"]),

    // + (id)new
    new objj_method(sel_getUid("new"),
    function $CPObject__new(self, _cmd)
    {
        return /* [self alloc] init]; */ ((___r1 = self.isa.objj_msgSend0(self, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init"));

        // Generated receiver temp variables
        var ___r1;
    },
    // argument types
    ["id"]),

    // + (void)initialize
    new objj_method(sel_getUid("initialize"),
    function $CPObject__initialize(self, _cmd)
    {
    },
    // argument types
    ["void"]),

    // + (Class)class
    new objj_method(sel_getUid("class"),
    function $CPObject__class(self, _cmd)
    {
        return self;
    },
    // argument types
    ["Class"]),

    // + (Class)_superclass
    new objj_method(sel_getUid("_superclass"),
    function $CPObject___superclass(self, _cmd)
    {
        return class_getSuperclass(self);
    },
    // argument types
    ["Class"]),

    // + (BOOL)isSubclassOfClass:
    new objj_method(sel_getUid("isSubclassOfClass:"),
    function $CPObject__isSubclassOfClass_(self, _cmd, aClass)
    {
        var theClass = self;

        for (; theClass; theClass = theClass._super_class)
            if (theClass === aClass)
                return YES;

        return NO;
    },
    // argument types
    ["BOOL", "Class"]),

    // + (BOOL)isKindOfClass:
    new objj_method(sel_getUid("isKindOfClass:"),
    function $CPObject__isKindOfClass_(self, _cmd, aClass)
    {
        return /*  isSubclassOfClass: aClass];
}

 */ self.isa.objj_msgSend1(self, "isSubclassOfClass:", aClass);
    },
    // argument types
    ["BOOL", "Class"]),

    // + (CPString)description
    new objj_method(sel_getUid("description"),
    function $CPObject__description(self, _cmd)
    {
        return class_getName(self.isa);
    },
    // argument types
    ["CPString"])
]);
// @end: @implementation CPObject
