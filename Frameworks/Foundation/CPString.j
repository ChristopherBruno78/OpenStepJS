/*   CPString.j
 *    Foundation
 *
 *
 *
 */

@import "CPObject.j"

/*!
    A case insensitive search
    @global
    @class CPString
 */
CPCaseInsensitiveSearch = 1;
/*!
    Exact character match
    @global
    @class CPString
 */
CPLiteralSearch         = 2;
/*!
    Start searching from the end of the string
    @global
    @class CPString
 */
CPBackwardsSearch       = 4;
/*!
    @global
    @class CPString
 */
CPAnchoredSearch        = 8;
/*!
    Numbers in the string are compared as numbers instead of strings
    @global
    @class CPString
 */
CPNumericSearch         = 64;
/*!
    Search ignores diacritic marks.
    @global
    @class CPString
 */
/*!
    Search ignores diacritic marks.
    @global
    @class CPString
 */
CPDiacriticInsensitiveSearch = 128;

var CPStringUIDs = {},
    CPStringRegexSpecialCharacters = [
            '/', '.', '*', '+', '?', '|', '$', '^',
            '(', ')', '[', ']', '{', '}', '\\'
    ],
    CPStringRegexEscapeExpression = new RegExp("(\\" + CPStringRegexSpecialCharacters.join("|\\") + ")", 'g'),
    CPStringRegexTrimWhitespace = new RegExp("(^\\s+|\\s+$)", 'g');

@implementation CPString : CPObject


+ (id)alloc
{
    if ([self class] !== CPString)
        return [super alloc];

    return new String;
}

/*!
    Returns a new string
 */
+ (id)string
{
    return [[self alloc] init];
}

/*!
    Returns a CPString containing the specified hash.
    @param aHash the hash to represent as a string
 */
+ (id)stringWithHash:(unsigned)aHash
{
    var hashString = parseInt(aHash, 10).toString(16);
    return "000000".substring(0, MAX(6 - hashString.length, 0)) + hashString;
}

/*!
    Initializes the string with data from the specified string.
    @param aString the string to copy data from
    @return the initialized CPString
 */
- (id)initWithString:(CPString)aString
{
    if ([self class] === CPString)
        return new String(aString);

    var result = new String(aString);

    result.isa = [self class];

    return result;
}


/*!
    Returns a description of this CPString object.
 */
- (CPString)description
{
    return self;
}

/*!
    Returns the number of UTF-8 characters in the string.
 */
- (int)length
{
    return self.length;
}

/*!
    Returns the character at the specified index.
    @param anIndex the index of the desired character
 */
- (CPString)characterAtIndex:(CPUInteger)anIndex
{
    return self.charAt(anIndex);
}

/*!
    Creates a new CPString from the concatenation of the receiver and the specified string.
    @param aString the string to append to the receiver
    @return the new string
 */
- (CPString)stringByAppendingString:(CPString)aString
{
    return self + aString;
}


//Dividing Strings
/*!
    Tokenizes the receiver string using the specified
    delimiter. For example, if the receiver is:
    \c "arash.francisco.ross.tom"
    and the delimiter is:
    \c "."
    the returned array would contain:
    <pre> ["arash", "francisco", "ross", "tom"] </pre>
    @param the delimiter
    @return the array of tokens
 */
- (CPArray)componentsSeparatedByString:(CPString)aString
{
    return self.split(aString);
}

/*!
    Returns a substring starting from the specified index to the end of the receiver.
    @param anIndex the starting string (inclusive)
    @return the substring
 */
- (CPString)substringFromIndex:(unsigned)anIndex
{
    return self.substr(anIndex);
}

/*!
    Returns a substring starting from the specified range \c location to the range \c length.
    @param the range of the substring
    @return the substring
 */
- (CPString)substringWithRange:(CPRange)aRange
{
    if (aRange.location < 0 || CPMaxRange(aRange) > self.length)
        throw new Error("aRange out of bounds");

    return self.substr(aRange.location, aRange.length);
}

/*!
    Creates a substring of characters from the receiver, starting at the beginning and up to
    the given index.
    @param anIndex the index of the receiver where the substring should end (non inclusive)
    @return the substring
 */
- (CPString)substringToIndex:(unsigned)anIndex
{
    if (anIndex > self.length)
        throw new Error("index out of bounds");

    return self.substring(0, anIndex);
}

// Finding characters and substrings

/*!
    Finds the range of characters in the receiver where the specified string exists. If the string
    does not exist in the receiver, the range \c length will be 0.
    @param aString the string to search for in the receiver
    @return the range of characters in the receiver
 */
- (CPRange)rangeOfString:(CPString)aString
{
    return [self rangeOfString: aString options: 0];
}

/*!
    Finds the range of characters in the receiver
    where the specified string exists. The search
    is subject to the options specified in the
    specified mask which can be a combination of:
    <pre>
    CPCaseInsensitiveSearch
    CPDiacriticInsensitiveSearch
    CPLiteralSearch
    CPBackwardsSearch
    CPAnchoredSearch
    CPNumericSearch
    </pre>
    @param aString the string to search for
    @param aMask the options to use in the search
    @return the range of characters in the receiver. If the string was not found,
    the \c length of the range will be 0.
 */
- (CPRange)rangeOfString:(CPString)aString options:(int)aMask
{
    return [self rangeOfString: aString options: aMask range: nil];
}

/*!
    Finds the range of characters in the receiver where the specified string
    exists in the given range of the receiver.The search is subject to the
    options specified in the specified mask which can be a combination of:
    <pre>
    CPCaseInsensitiveSearch
    CPDiacriticInsensitiveSearch
    CPLiteralSearch
    CPBackwardsSearch
    CPAnchoredSearch
    CPNumericSearch
    </pre>
    @param aString the string to search for
    @param aMask the options to use in the search
    @param aRange the range of the receiver in which to search for
    @return the range of characters in the receiver. The range is relative to
    the start of the full string and not the passed-in range. If the
    string was not found, or if it was @"", the range will be
    {CPNotFound, 0}.
 */
- (CPRange)rangeOfString:(CPString)aString options:(int)aMask range:(CPrange)aRange
{
    // Searching for @"" always returns CPNotFound.
    if (!aString)
        return CPMakeRange(CPNotFound, 0);

    var string = (aRange == nil) ? self : [self substringWithRange: aRange],
        location = CPNotFound;

    if (aMask & CPCaseInsensitiveSearch)
    {
        string = string.toLowerCase();
        aString = aString.toLowerCase();
    }
    if (aMask & CPDiacriticInsensitiveSearch)
    {
        string = string.stripDiacritics();
        aString = aString.stripDiacritics();
    }

    if (aMask & CPBackwardsSearch)
    {
        location = string.lastIndexOf(aString);
        if (aMask & CPAnchoredSearch && location + aString.length != string.length)
            location = CPNotFound;
    }
    else if (aMask & CPAnchoredSearch)
        location = string.substr(0, aString.length).indexOf(aString) != CPNotFound ? 0 : CPNotFound;
    else
        location = string.indexOf(aString);

    if (location == CPNotFound)
        return CPMakeRange(CPNotFound, 0);

    return CPMakeRange(location + (aRange ? aRange.location : 0), aString.length);
}

//Replacing Substrings

- (CPString)stringByEscapingRegexControlCharacters
{
    return self.replace(CPStringRegexEscapeExpression, "\\$1");
}

/*!
    Returns a new string in which all occurrences of a target string in the receiver are replaced by
    another given string.
    @param target The string to replace.
    @param replacement the string with which to replace the \c target
 */

- (CPString)stringByReplacingOccurrencesOfString:(CPString)target withString:(CPString)replacement
{
    return self.replace(new RegExp([target stringByEscapingRegexControlCharacters], "g"), replacement);
}

/*
    Returns a new string in which all occurrences of a target string in a specified range of the receiver
    are replaced by another given string.
    @param target The string to replace
    @param replacement the string with which to replace the \c target.
    @param options A mask of options to use when comparing \c target with the receiver. Pass 0 to specify no options
    @param searchRange The range in the receiver in which to search for \c target.
 */

- (CPString)stringByReplacingOccurrencesOfString:(CPString)target withString:(CPString)replacement options:(int)options
        range:(CPRange)searchRange
{
    var start = self.substring(0, searchRange.location),
        stringSegmentToSearch = self.substr(searchRange.location, searchRange.length),
        end = self.substring(searchRange.location + searchRange.length, self.length),
        target = [target stringByEscapingRegexControlCharacters],
        regExp;

    if (options & CPCaseInsensitiveSearch)
        regExp = new RegExp(target, "gi");
    else
        regExp = new RegExp(target, "g");

    return start + '' + stringSegmentToSearch.replace(regExp, replacement) + '' + end;
}

/*
    Returns a new string in which the characters in a specified range of the receiver
    are replaced by a given string.
    @param range A range of characters in the receiver.
    @param replacement The string with which to replace the characters in \c range.
 */

- (CPString)stringByReplacingCharactersInRange:(CPRange)range withString:(CPString)replacement
{
    return '' + self.substring(0, range.location) + replacement + self.substring(range.location + range.length, self.length);
}

/*!
    Returns a new string with leading and trailing whitespace trimmed
 */
- (CPString)stringByTrimmingWhitespace
{
    return self.replace(CPStringRegexTrimWhitespace, "");
}

// Identifying and comparing strings

/*!
    Compares the receiver to the specified string.
    @param aString the string with which to compare
    @return the result of the comparison
 */
- (CPComparisonResult)compare:(CPString)aString
{
    return [self compare: aString options: nil];
}

/*
    Compares the receiver to the specified string.
    @param aString the string with which to compare
    @return the result of the comparison
 */
- (CPComparisonResult)caseInsensitiveCompare:(CPString)aString
{
    return [self compare: aString options: CPCaseInsensitiveSearch];
}

// This is for speed
var CPStringNull = [CPNull null];

/*!
    Compares the receiver to the specified string, using options.
    @param aString the string with which to compare
    @param aMask the options to use for the comparison
    @return the result of the comparison
 */
- (CPComparisonResult)compare:(CPString)aString options:(int)aMask
{
    if (aString == nil)
        return CPOrderedDescending;

    if (aString === CPStringNull)
        throw new Error("compare: argument can't be 'CPNull'");

    var lhs = self,
        rhs = aString;

    if (aMask & CPCaseInsensitiveSearch)
    {
        lhs = lhs.toLowerCase();
        rhs = rhs.toLowerCase();
    }

    if (aMask & CPDiacriticInsensitiveSearch)
    {
        lhs = lhs.stripDiacritics();
        rhs = rhs.stripDiacritics();
    }

    if (lhs < rhs)
        return CPOrderedAscending;

    if (lhs > rhs)
        return CPOrderedDescending;

    return CPOrderedSame;
}

/*!
    Compares the receiver to the specified string, using options in range.
    @param aString the string with which to compare the range of the receiver specified by range.
    @param aMask the options to use for the comparison
    @param range the range of the receiver over which to perform the comparison. The range must not exceed the bounds of the receiver.
    @return the result of the comparison
 */
- (CPComparisonResult)compare:(CPString)aString options:(int)aMask range:(CPRange)range
{
    var lhs = [self substringWithRange: range],
        rhs = aString;

    return [lhs compare: rhs options: aMask];
}

/*!
    Returns \c YES if the receiver starts
    with the specified string. If \c aString
    is empty, the method will return \c NO.
 */
- (BOOL)hasPrefix:(CPString)aString
{
    return aString && aString != "" && self.indexOf(aString) == 0;
}

/*!
    Returns \c YES if the receiver ends
    with the specified string. If \c aString
    is empty, the method will return \c NO.
 */
- (BOOL)hasSuffix:(CPString)aString
{
    return aString && aString != "" && self.length >= aString.length && self.lastIndexOf(aString) == (self.length - aString.length);
}

- (BOOL)isEqual:(id)anObject
{
    if (self === anObject)
        return YES;

    if (!anObject || ![anObject isKindOfClass: [CPString class]])
        return NO;

    return [self isEqualToString: anObject];
}


/*!
    Returns \c YES if the specified string contains the same characters as the receiver.
 */
- (BOOL)isEqualToString:(CPString)aString
{
    return self == String(aString);
}


/*!
    Returns a hash of the string instance.
 */
- (CPString)UID
{
    var UID = CPStringUIDs[self];

    if (!UID)
    {
        UID = objj_generateObjectUID();
        CPStringUIDs[self] = UID;
    }

    return UID + "";
}


/*!
    Returns a copy of the receiver with all the first letters of words capitalized.
 */
- (CPString)capitalizedString
{
    var parts = self.split(/\b/g), // split on word boundaries
        i = 0,
        count = parts.length;

    for (; i < count; i++)
    {
        if (i == 0 || (/\s$/).test(parts[i - 1])) // only capitalize if previous token was whitespace
            parts[i] = parts[i].substring(0, 1).toUpperCase() + parts[i].substring(1).toLowerCase();
        else
            parts[i] = parts[i].toLowerCase();
    }
    return parts.join("");
}

/*!
    Returns a copy of the string with all its characters made lower case.
 */
- (CPString)lowercaseString
{
    return self.toLowerCase();
}

/*!
    Returns a copy of the string with all its characters made upper case.
 */
- (CPString)uppercaseString
{
    return self.toUpperCase();
}


/*!
    Returns the text as a floating point value.
 */
- (double)doubleValue
{
    return parseFloat(self, 10);
}
/*!
    Returns \c YES on encountering one of "Y", "y", "T", "t", or
    a digit 1-9. Returns \c NO otherwise. This method skips the initial
    whitespace characters, +,- followed by Zeroes.
 */
- (BOOL)boolValue
{
    var replaceRegExp = new RegExp("^\\s*[\\+,\\-]?0*");
    return RegExp("^[Y,y,t,T,1-9]").test(self.replace(replaceRegExp, ''));
}

/*!
    Returns the text as an integer
 */
- (int)intValue
{
    return parseInt(self, 10);
}


@end

@implementation CPString (JSON)

/*!
    Returns a string representing the supplied JavaScript object encoded as JSON.
 */
+ (CPString)JSONFromObject:(JSObject)anObject
{
    return JSON.stringify(anObject);
}

/*!
    Returns a JavaScript object decoded from the string's JSON representation.
 */
- (JSObject)objectFromJSON
{
    return JSON.parse(self);
}

@end


@implementation CPString (UUID)

/*!
    Returns a randomly generated Universally Unique Identifier.
 */
+ (CPString)UUID
{
    var g = @"",
        i = 0;

    for (; i < 32; i++)
        g += FLOOR(RAND() * 0xF).toString(0xF);

    return g;
}

@end

String.prototype.isa = CPString;
