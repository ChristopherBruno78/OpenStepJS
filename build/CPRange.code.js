// @typedef CPRange
objj_registerTypeDef(objj_allocateTypeDef("CPRange"));

function CPMakeRange(location, length)
{
    return {
        location: location,
        length: length
    };
}

function CPMakeRangeCopy(aRange)
{
    return {
        location: aRange.location,
        length: aRange.length
    };
}

function CPEmptyRange(aRange)
{
    return aRange.length === 0;
}

function CPMaxRange(aRange)
{
    return aRange.location + aRange.length;
}

function CPEqualRanges(lhsRange, rhsRange)
{
    return lhsRange.location === rhsRange.location && lhsRange.length === rhsRange.length;
}

function CPLocationInRange(aLocation, aRange)
{
    return aLocation >= aRange.location && aLocation < CPMaxRange(aRange);
}

function CPUnionRange(lhsRange, rhsRange)
{
    var location = MIN(lhsRange.location, rhsRange.location);

    return CPMakeRange(location, MAX(CPMaxRange(lhsRange), CPMaxRange(rhsRange)) - location);
}

function CPIntersectionRange(lhsRange, rhsRange)
{
    if (CPMaxRange(lhsRange) < rhsRange.location || CPMaxRange(rhsRange) < lhsRange.location)
        return CPMakeRange(0, 0);

    var location = MAX(lhsRange.location, rhsRange.location);

    return CPMakeRange(location, MIN(CPMaxRange(lhsRange), CPMaxRange(rhsRange)) - location);
}

function CPRangeInRange(lhsRange, rhsRange)
{
    return lhsRange.location <= rhsRange.location && CPMaxRange(lhsRange) >= CPMaxRange(rhsRange);
}

function CPStringFromRange(aRange)
{
    return "{" + aRange.location + ", " + aRange.length + "}";
}

function CPRangeFromString(aString)
{
    var comma = aString.indexOf(',');

    return {
        location: parseInt(aString.substr(1, comma - 1)),
        length: parseInt(aString.substring(comma + 1, aString.length))
    };
}
