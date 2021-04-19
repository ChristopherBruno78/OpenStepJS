// @import "CPObject.j"

// @import "CPRange.j"

var concat = Array.prototype.concat,
    indexOf = Array.prototype.indexOf,
    join = Array.prototype.join,
    pop = Array.prototype.pop,
    push = Array.prototype.push,
    slice = Array.prototype.slice,
    splice = Array.prototype.splice;

// @implementation CPArray : CPObject
var $the_class = objj_allocateClassPair(CPObject, "CPArray");
objj_registerClassPair($the_class);

// Instance methods
class_addMethods($the_class,
[
    // - (id)initWithObjects:
    new objj_method(sel_getUid("initWithObjects:"),
    function $CPArray__initWithObjects_(self, _cmd, anObject)
    {
        var index = 2,
            count = arguments.length;

        for (; index < count; ++index)
            if (arguments[index] == nil)
                break;

        return slice.call(arguments, 2, index);
    },
    // argument types
    ["id", "id"]),

    // - (CPUInteger)count
    new objj_method(sel_getUid("count"),
    function $CPArray__count(self, _cmd)
    {
        return self.length;
    },
    // argument types
    ["CPUInteger"]),

    // - (id)objectAtIndex:
    new objj_method(sel_getUid("objectAtIndex:"),
    function $CPArray__objectAtIndex_(self, _cmd, anIndex)
    {
        if (anIndex >= self.length || anIndex < 0)
            throw new Error("CPArray out or range");

        return self[anIndex];
    },
    // argument types
    ["id", "CPUInteger"]),

    // - (CPUInteger)indexOfObject:inRange:
    new objj_method(sel_getUid("indexOfObject:inRange:"),
    function $CPArray__indexOfObject_inRange_(self, _cmd, anObject, aRange)
    {
        if (anObject && anObject.isa)
        {
            var index = aRange ? aRange.location : 0,
                count = aRange ? CPMaxRange(aRange) : self.length;

            for (; index < count; ++index)
                if (/* [self[index] isEqual:anObject] */ ((___r1 = self[index]), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "isEqual:", anObject)))
                    return index;

            return CPNotFound;
        }

        return /* [self indexOfObjectIdenticalTo:anObject inRange:aRange] */ self.isa.objj_msgSend2(self, "indexOfObjectIdenticalTo:inRange:", anObject, aRange);

        // Generated receiver temp variables
        var ___r1;
    },
    // argument types
    ["CPUInteger", "id", "CPRange"]),

    // - (CPUInteger)indexOfObjectIdenticalTo:inRange:
    new objj_method(sel_getUid("indexOfObjectIdenticalTo:inRange:"),
    function $CPArray__indexOfObjectIdenticalTo_inRange_(self, _cmd, anObject, aRange)
    {
        if (indexOf && !aRange)
            return indexOf.call(self, anObject);

        var index = aRange ? aRange.location : 0,
            count = aRange ? CPMaxRange(aRange) : self.length;

        for (; index < count; ++index)
            if (self[index] === anObject)
                return index;

        return CPNotFound;
    },
    // argument types
    ["CPUInteger", "id", "CPRange"]),

    // - (void)insertObject:atIndex:
    new objj_method(sel_getUid("insertObject:atIndex:"),
    function $CPArray__insertObject_atIndex_(self, _cmd, anObject, anIndex)
    {
        if (anIndex > self.length || anIndex < 0)
            throw new Error("CPArray out or range");

        splice.call(self, anIndex, 0, anObject);
    },
    // argument types
    ["void", "id", "CPUInteger"]),

    // - (void)removeObjectAtIndex:
    new objj_method(sel_getUid("removeObjectAtIndex:"),
    function $CPArray__removeObjectAtIndex_(self, _cmd, anIndex)
    {
        if (anIndex >= self.length || anIndex < 0)
            throw new Error("CPArray out or range");

        splice.call(self, anIndex, 1);
    },
    // argument types
    ["void", "CPUInteger"]),

    // - (void)removeObjectIdenticalTo:
    new objj_method(sel_getUid("removeObjectIdenticalTo:"),
    function $CPArray__removeObjectIdenticalTo_(self, _cmd, anObject)
    {
        /* [self removeObjectIdenticalTo:anObject inRange:CPMakeRange(0, [self count])] */ self.isa.objj_msgSend2(self, "removeObjectIdenticalTo:inRange:", anObject, CPMakeRange(0, self.isa.objj_msgSend0(self, "count")));
    },
    // argument types
    ["void", "id"]),

    // - (void)removeObjectIdenticalTo:inRange:
    new objj_method(sel_getUid("removeObjectIdenticalTo:inRange:"),
    function $CPArray__removeObjectIdenticalTo_inRange_(self, _cmd, anObject, aRange)
    {
        var index,
            count = /* [self count] */ self.isa.objj_msgSend0(self, "count");

        while ((index = /* [self indexOfObjectIdenticalTo:anObject inRange:aRange] */ self.isa.objj_msgSend2(self, "indexOfObjectIdenticalTo:inRange:", anObject, aRange)) !== CPNotFound)
        {
            /* [self removeObjectAtIndex:index] */ self.isa.objj_msgSend1(self, "removeObjectAtIndex:", index);
            aRange = CPIntersectionRange(CPMakeRange(index, --count - index), aRange);
        }
    },
    // argument types
    ["void", "id", "CPRange"]),

    // - (void)removeObjectsInRange:
    new objj_method(sel_getUid("removeObjectsInRange:"),
    function $CPArray__removeObjectsInRange_(self, _cmd, aRange)
    {
        if (aRange.location < 0 || CPMaxRange(aRange) > self.length)
            throw new Error("CPArray range exception");

        splice.call(self, aRange.location, aRange.length);
    },
    // argument types
    ["void", "CPRange"]),

    // - (void)replaceObjectAtIndex:withObject:
    new objj_method(sel_getUid("replaceObjectAtIndex:withObject:"),
    function $CPArray__replaceObjectAtIndex_withObject_(self, _cmd, anIndex, anObject)
    {
        if (anIndex >= self.length || anIndex < 0)
            throw new Error("CPArray range exception");

        self[anIndex] = anObject;
    },
    // argument types
    ["void", "CPUInteger", "id"]),

    // - (void)addObject:
    new objj_method(sel_getUid("addObject:"),
    function $CPArray__addObject_(self, _cmd, anObject)
    {
        push.call(self, anObject);
    },
    // argument types
    ["void", "id"]),

    // - (void)removeLastObject
    new objj_method(sel_getUid("removeLastObject"),
    function $CPArray__removeLastObject(self, _cmd)
    {
        pop.call(self);
    },
    // argument types
    ["void"]),

    // - (id)copy
    new objj_method(sel_getUid("copy"),
    function $CPArray__copy(self, _cmd)
    {
        return slice.call(self, 0);
    },
    // argument types
    ["id"])
]);

// Class methods
class_addMethods($the_class.isa,
[
    // + (id)alloc
    new objj_method(sel_getUid("alloc"),
    function $CPArray__alloc(self, _cmd)
    {
        return [];
    },
    // argument types
    ["id"])
]);
// @end: @implementation CPArray : CPObject

Array.prototype.isa = CPArray;
