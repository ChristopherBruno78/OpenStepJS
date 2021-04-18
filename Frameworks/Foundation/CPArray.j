/*
 * CPArray.j
 * Foundation
 *
 *
 */

@import "CPObject.j"
@import "CPRange.j"

var concat = Array.prototype.concat,
    indexOf = Array.prototype.indexOf,
    join = Array.prototype.join,
    pop = Array.prototype.pop,
    push = Array.prototype.push,
    slice = Array.prototype.slice,
    splice = Array.prototype.splice;

@implementation CPArray : CPObject

+ (id)alloc
{
    return [];
}

- (id)initWithObjects:(id)anObject, ...
{
    // The arguments array contains self and _cmd, so the first object is at position 2.
    let index = 2,
        count = arguments.length;

    for (; index < count; ++index)
        if (arguments[index] == nil)
        break;

    return slice.call(arguments, 2, index);

}

- (CPUInteger)count
{
    return self.length;
}

- (id)objectAtIndex:(CPUInteger)anIndex
{
    if (anIndex >= self.length || anIndex < 0)
        throw new Error("CPArray out or range");

    return self[anIndex];
}

- (CPUInteger)indexOfObject:(id)anObject inRange:(CPRange)aRange
{
    // Only use isEqual: if our object is a CPObject.
    if (anObject && anObject.isa)
    {
        var index = aRange ? aRange.location : 0,
            count = aRange ? CPMaxRange(aRange) : self.length;

        for (; index < count; ++index)
            if ([self[index] isEqual:anObject])
            return index;

        return CPNotFound;
    }

    return [self indexOfObjectIdenticalTo:anObject inRange:aRange];
}

- (CPUInteger)indexOfObjectIdenticalTo:(id)anObject inRange:(CPRange)aRange
{
    if (indexOf && !aRange)
        return indexOf.call(self, anObject);

    var index = aRange ? aRange.location : 0,
        count = aRange ? CPMaxRange(aRange) : self.length;

    for (; index < count; ++index)
        if (self[index] === anObject)
        return index;

    return CPNotFound;
}

- (void)insertObject:(id)anObject atIndex:(CPUInteger)anIndex
{
    if (anIndex > self.length || anIndex < 0)
        throw new Error("CPArray out or range");

    splice.call(self, anIndex, 0, anObject);
}

- (void)removeObjectAtIndex:(CPUInteger)anIndex
{
    if (anIndex >= self.length || anIndex < 0)
        throw new Error("CPArray out or range");

    splice.call(self, anIndex, 1);
}

/*!
    Remove all instances of \c anObject from the array.
    The search for the object is done using \c ==.
    @param anObject the object to remove
*/
- (void)removeObjectIdenticalTo:(id)anObject
{
    [self removeObjectIdenticalTo:anObject inRange:CPMakeRange(0, [self count])];
}


/*!
    Remove the first instance of \c anObject from the array,
    within the range specified by \c aRange.
    The search for the object is done using \c ==.
    @param anObject the object to remove
    @param aRange the range in the array to search for the object
*/
- (void)removeObjectIdenticalTo:(id)anObject inRange:(CPRange)aRange
{
    var index,
        count = [self count];

    while ((index = [self indexOfObjectIdenticalTo:anObject inRange:aRange]) !== CPNotFound)
    {
        [self removeObjectAtIndex:index];
        aRange = CPIntersectionRange(CPMakeRange(index, (--count) - index), aRange);
    }
}

- (void)removeObjectsInRange:(CPRange)aRange
{
    if (aRange.location < 0 || CPMaxRange(aRange) > self.length)
        throw new Error("CPArray range exception");

    splice.call(self, aRange.location, aRange.length);
}

- (void)replaceObjectAtIndex:(CPUInteger)anIndex withObject:(id)anObject
{
    if (anIndex >= self.length || anIndex < 0)
        throw new Error("CPArray range exception");

    self[anIndex] = anObject;
}


- (void)addObject:(id)anObject
{
    push.call(self, anObject);
}

- (void)removeLastObject
{
    pop.call(self);
}

- (id)copy
{
    return slice.call(self, 0);
}

@end


Array.prototype.isa = CPArray;
