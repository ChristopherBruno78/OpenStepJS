// @import "CPObject.j"

CPCaseInsensitiveSearch = 1;
CPLiteralSearch = 2;
CPBackwardsSearch = 4;
CPAnchoredSearch = 8;
CPNumericSearch = 64;
CPDiacriticInsensitiveSearch = 128;

var CPStringUIDs = {},
    CPStringRegexSpecialCharacters = [
        '/',
        '.',
        '*',
        '+',
        '?',
        '|',
        '$',
        '^',
        '(',
        ')',
        '[',
        ']',
        '{',
        '}',
        '\\'
    ],
    CPStringRegexEscapeExpression = new RegExp("(\\" + CPStringRegexSpecialCharacters.join("|\\") + ")", 'g'),
    CPStringRegexTrimWhitespace = new RegExp("(^\\s+|\\s+$)", 'g');

// @implementation CPString : CPObject
var $the_class = objj_allocateClassPair(CPObject, "CPString");
objj_registerClassPair($the_class);

var CPStringNull = /* CPNull null]; */ (CPNull == null ? null : CPNull.isa.objj_msgSend0(CPNull, "null"));

// Instance methods
class_addMethods($the_class,
[
    // - (id)initWithString:
    new objj_method(sel_getUid("initWithString:"),
    function $CPString__initWithString_(self, _cmd, aString)
    {
        if (/* self class]  */ self.isa.objj_msgSend0(self, "class") === CPString)
            return new String(aString);

        var result = new String(aString);

        result.isa = /* self class]; */ self.isa.objj_msgSend0(self, "class");

        return result;
    },
    // argument types
    ["id", "CPString"]),

    // - (CPString)description
    new objj_method(sel_getUid("description"),
    function $CPString__description(self, _cmd)
    {
        return self;
    },
    // argument types
    ["CPString"]),

    // - (int)length
    new objj_method(sel_getUid("length"),
    function $CPString__length(self, _cmd)
    {
        return self.length;
    },
    // argument types
    ["int"]),

    // - (CPString)characterAtIndex:
    new objj_method(sel_getUid("characterAtIndex:"),
    function $CPString__characterAtIndex_(self, _cmd, anIndex)
    {
        return self.charAt(anIndex);
    },
    // argument types
    ["CPString", "CPUInteger"]),

    // - (CPString)stringByAppendingString:
    new objj_method(sel_getUid("stringByAppendingString:"),
    function $CPString__stringByAppendingString_(self, _cmd, aString)
    {
        return self + aString;
    },
    // argument types
    ["CPString", "CPString"]),

    // - (CPArray)componentsSeparatedByString:
    new objj_method(sel_getUid("componentsSeparatedByString:"),
    function $CPString__componentsSeparatedByString_(self, _cmd, aString)
    {
        return self.split(aString);
    },
    // argument types
    ["CPArray", "CPString"]),

    // - (CPString)substringFromIndex:
    new objj_method(sel_getUid("substringFromIndex:"),
    function $CPString__substringFromIndex_(self, _cmd, anIndex)
    {
        return self.substr(anIndex);
    },
    // argument types
    ["CPString", "unsigned"]),

    // - (CPString)substringWithRange:
    new objj_method(sel_getUid("substringWithRange:"),
    function $CPString__substringWithRange_(self, _cmd, aRange)
    {
        if (aRange.location < 0 || CPMaxRange(aRange) > self.length)
            throw new Error("aRange out of bounds");

        return self.substr(aRange.location, aRange.length);
    },
    // argument types
    ["CPString", "CPRange"]),

    // - (CPString)substringToIndex:
    new objj_method(sel_getUid("substringToIndex:"),
    function $CPString__substringToIndex_(self, _cmd, anIndex)
    {
        if (anIndex > self.length)
            throw new Error("index out of bounds");

        return self.substring(0, anIndex);
    },
    // argument types
    ["CPString", "unsigned"]),

    // - (CPRange)rangeOfString:
    new objj_method(sel_getUid("rangeOfString:"),
    function $CPString__rangeOfString_(self, _cmd, aString)
    {
        return /* self rangeOfString: aString options: 0]; */ self.isa.objj_msgSend2(self, "rangeOfString:options:", aString, 0);
    },
    // argument types
    ["CPRange", "CPString"]),

    // - (CPRange)rangeOfString:options:
    new objj_method(sel_getUid("rangeOfString:options:"),
    function $CPString__rangeOfString_options_(self, _cmd, aString, aMask)
    {
        return /* self rangeOfString: aString options: aMask range: nil]; */ self.isa.objj_msgSend3(self, "rangeOfString:options:range:", aString, aMask, nil);
    },
    // argument types
    ["CPRange", "CPString", "int"]),

    // - (CPRange)rangeOfString:options:range:
    new objj_method(sel_getUid("rangeOfString:options:range:"),
    function $CPString__rangeOfString_options_range_(self, _cmd, aString, aMask, aRange)
    {
        if (!aString)
            return CPMakeRange(CPNotFound, 0);

        var string = aRange == nil ? self : /* self substringWithRange: aRange], */ self.isa.objj_msgSend1(self, "substringWithRange:", aRange),
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
            location = (string.substr(0, aString.length)).indexOf(aString) != CPNotFound ? 0 : CPNotFound;
        else
            location = string.indexOf(aString);

        if (location == CPNotFound)
            return CPMakeRange(CPNotFound, 0);

        return CPMakeRange(location + (aRange ? aRange.location : 0), aString.length);
    },
    // argument types
    ["CPRange", "CPString", "int", "CPrange"]),

    // - (CPString)stringByEscapingRegexControlCharacters
    new objj_method(sel_getUid("stringByEscapingRegexControlCharacters"),
    function $CPString__stringByEscapingRegexControlCharacters(self, _cmd)
    {
        return self.replace(CPStringRegexEscapeExpression, "\\$1");
    },
    // argument types
    ["CPString"]),

    // - (CPString)stringByReplacingOccurrencesOfString:withString:
    new objj_method(sel_getUid("stringByReplacingOccurrencesOfString:withString:"),
    function $CPString__stringByReplacingOccurrencesOfString_withString_(self, _cmd, target, replacement)
    {
        return self.replace(new RegExp(/* target stringByEscapingRegexControlCharacters], */ (target == null ? null : target.isa.objj_msgSend0(target, "stringByEscapingRegexControlCharacters")), "g"), replacement);
    },
    // argument types
    ["CPString", "CPString", "CPString"]),

    // - (CPString)stringByReplacingOccurrencesOfString:withString:options:range:
    new objj_method(sel_getUid("stringByReplacingOccurrencesOfString:withString:options:range:"),
    function $CPString__stringByReplacingOccurrencesOfString_withString_options_range_(self, _cmd, target, replacement, options, searchRange)
    {
        var start = self.substring(0, searchRange.location),
            stringSegmentToSearch = self.substr(searchRange.location, searchRange.length),
            end = self.substring(searchRange.location + searchRange.length, self.length),
            target = /* target stringByEscapingRegexControlCharacters], */ (target == null ? null : target.isa.objj_msgSend0(target, "stringByEscapingRegexControlCharacters")),
            regExp;

        if (options & CPCaseInsensitiveSearch)
            regExp = new RegExp(target, "gi");
        else
            regExp = new RegExp(target, "g");

        return start + '' + stringSegmentToSearch.replace(regExp, replacement) + '' + end;
    },
    // argument types
    ["CPString", "CPString", "CPString", "int", "CPRange"]),

    // - (CPString)stringByReplacingCharactersInRange:withString:
    new objj_method(sel_getUid("stringByReplacingCharactersInRange:withString:"),
    function $CPString__stringByReplacingCharactersInRange_withString_(self, _cmd, range, replacement)
    {
        return '' + self.substring(0, range.location) + replacement + self.substring(range.location + range.length, self.length);
    },
    // argument types
    ["CPString", "CPRange", "CPString"]),

    // - (CPString)stringByTrimmingWhitespace
    new objj_method(sel_getUid("stringByTrimmingWhitespace"),
    function $CPString__stringByTrimmingWhitespace(self, _cmd)
    {
        return self.replace(CPStringRegexTrimWhitespace, "");
    },
    // argument types
    ["CPString"]),

    // - (CPComparisonResult)compare:
    new objj_method(sel_getUid("compare:"),
    function $CPString__compare_(self, _cmd, aString)
    {
        return /* self compare: aString options: nil]; */ self.isa.objj_msgSend2(self, "compare:options:", aString, nil);
    },
    // argument types
    ["CPComparisonResult", "CPString"]),

    // - (CPComparisonResult)caseInsensitiveCompare:
    new objj_method(sel_getUid("caseInsensitiveCompare:"),
    function $CPString__caseInsensitiveCompare_(self, _cmd, aString)
    {
        return /* self compare: aString options: CPCaseInsensitiveSearch]; */ self.isa.objj_msgSend2(self, "compare:options:", aString, CPCaseInsensitiveSearch);
    },
    // argument types
    ["CPComparisonResult", "CPString"]),

    // - (CPComparisonResult)compare:options:
    new objj_method(sel_getUid("compare:options:"),
    function $CPString__compare_options_(self, _cmd, aString, aMask)
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
    },
    // argument types
    ["CPComparisonResult", "CPString", "int"]),

    // - (CPComparisonResult)compare:options:range:
    new objj_method(sel_getUid("compare:options:range:"),
    function $CPString__compare_options_range_(self, _cmd, aString, aMask, range)
    {
        var lhs = /* self substringWithRange: range], */ self.isa.objj_msgSend1(self, "substringWithRange:", range),
            rhs = aString;

        return /* lhs compare: rhs options: aMask]; */ (lhs == null ? null : lhs.isa.objj_msgSend2(lhs, "compare:options:", rhs, aMask));
    },
    // argument types
    ["CPComparisonResult", "CPString", "int", "CPRange"]),

    // - (BOOL)hasPrefix:
    new objj_method(sel_getUid("hasPrefix:"),
    function $CPString__hasPrefix_(self, _cmd, aString)
    {
        return aString && aString != "" && self.indexOf(aString) == 0;
    },
    // argument types
    ["BOOL", "CPString"]),

    // - (BOOL)hasSuffix:
    new objj_method(sel_getUid("hasSuffix:"),
    function $CPString__hasSuffix_(self, _cmd, aString)
    {
        return aString && aString != "" && self.length >= aString.length && self.lastIndexOf(aString) == self.length - aString.length;
    },
    // argument types
    ["BOOL", "CPString"]),

    // - (BOOL)isEqual:
    new objj_method(sel_getUid("isEqual:"),
    function $CPString__isEqual_(self, _cmd, anObject)
    {
        if (self === anObject)
            return YES;

        if (!anObject || !/* anObject isKindOfClass: [CPString class]]) */ (anObject == null ? null : anObject.isa.objj_msgSend1(anObject, "isKindOfClass:", CPString.isa.objj_msgSend0(CPString, "class"))))
            return NO;

        return /* self isEqualToString: anObject]; */ self.isa.objj_msgSend1(self, "isEqualToString:", anObject);
    },
    // argument types
    ["BOOL", "id"]),

    // - (BOOL)isEqualToString:
    new objj_method(sel_getUid("isEqualToString:"),
    function $CPString__isEqualToString_(self, _cmd, aString)
    {
        return self == String(aString);
    },
    // argument types
    ["BOOL", "CPString"]),

    // - (CPString)UID
    new objj_method(sel_getUid("UID"),
    function $CPString__UID(self, _cmd)
    {
        var UID = CPStringUIDs[self];

        if (!UID)
        {
            UID = objj_generateObjectUID();
            CPStringUIDs[self] = UID;
        }

        return UID + "";
    },
    // argument types
    ["CPString"]),

    // - (CPString)capitalizedString
    new objj_method(sel_getUid("capitalizedString"),
    function $CPString__capitalizedString(self, _cmd)
    {
        var parts = self.split(/\b/g),
            i = 0,
            count = parts.length;

        for (; i < count; i++)
        {
            if (i == 0 || /\s$/.test(parts[i - 1]))
                parts[i] = (parts[i].substring(0, 1)).toUpperCase() + (parts[i].substring(1)).toLowerCase();
            else
                parts[i] = parts[i].toLowerCase();
        }

        return parts.join("");
    },
    // argument types
    ["CPString"]),

    // - (CPString)lowercaseString
    new objj_method(sel_getUid("lowercaseString"),
    function $CPString__lowercaseString(self, _cmd)
    {
        return self.toLowerCase();
    },
    // argument types
    ["CPString"]),

    // - (CPString)uppercaseString
    new objj_method(sel_getUid("uppercaseString"),
    function $CPString__uppercaseString(self, _cmd)
    {
        return self.toUpperCase();
    },
    // argument types
    ["CPString"]),

    // - (double)doubleValue
    new objj_method(sel_getUid("doubleValue"),
    function $CPString__doubleValue(self, _cmd)
    {
        return parseFloat(self, 10);
    },
    // argument types
    ["double"]),

    // - (BOOL)boolValue
    new objj_method(sel_getUid("boolValue"),
    function $CPString__boolValue(self, _cmd)
    {
        var replaceRegExp = new RegExp("^\\s*[\\+,\\-]?0*");

        return (RegExp("^[Y,y,t,T,1-9]")).test(self.replace(replaceRegExp, ''));
    },
    // argument types
    ["BOOL"]),

    // - (int)intValue
    new objj_method(sel_getUid("intValue"),
    function $CPString__intValue(self, _cmd)
    {
        return parseInt(self, 10);
    },
    // argument types
    ["int"])
]);

// Class methods
class_addMethods($the_class.isa,
[
    // + (id)alloc
    new objj_method(sel_getUid("alloc"),
    function $CPString__alloc(self, _cmd)
    {
        if (/* [self class] */ self.isa.objj_msgSend0(self, "class") !== CPString)
            return /* [super alloc]; */ (_super == null ? null : _super.isa.objj_msgSend0(_super, "alloc"));

        return new String();
    },
    // argument types
    ["id"]),

    // + (id)string
    new objj_method(sel_getUid("string"),
    function $CPString__string(self, _cmd)
    {
        return /* [self alloc] init]; */ ((___r1 = self.isa.objj_msgSend0(self, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init"));

        // Generated receiver temp variables
        var ___r1;
    },
    // argument types
    ["id"]),

    // + (id)stringWithHash:
    new objj_method(sel_getUid("stringWithHash:"),
    function $CPString__stringWithHash_(self, _cmd, aHash)
    {
        var hashString = (parseInt(aHash, 10)).toString(16);

        return "000000".substring(0, MAX(6 - hashString.length, 0)) + hashString;
    },
    // argument types
    ["id", "unsigned"])
]);
// @end: @implementation CPString : CPObject

// @implementation CPString (JSON)
var $the_class = objj_getClass("CPString");

if (!$the_class)
    throw new ReferenceError("Cannot find declaration for class 'CPString'");


// Instance methods
class_addMethods($the_class,
[
    // - (JSObject)objectFromJSON
    new objj_method(sel_getUid("objectFromJSON"),
    function $CPString__objectFromJSON(self, _cmd)
    {
        return JSON.parse(self);
    },
    // argument types
    ["JSObject"])
]);

// Class methods
class_addMethods($the_class.isa,
[
    // + (CPString)JSONFromObject:
    new objj_method(sel_getUid("JSONFromObject:"),
    function $CPString__JSONFromObject_(self, _cmd, anObject)
    {
        return JSON.stringify(anObject);
    },
    // argument types
    ["CPString", "JSObject"])
]);
// @end: @implementation CPString (JSON)

// @implementation CPString (UUID)
var $the_class = objj_getClass("CPString");

if (!$the_class)
    throw new ReferenceError("Cannot find declaration for class 'CPString'");


// Class methods
class_addMethods($the_class.isa,
[
    // + (CPString)UUID
    new objj_method(sel_getUid("UUID"),
    function $CPString__UUID(self, _cmd)
    {
        var g = "",
            i = 0;

        for (; i < 32; i++)
            g += (FLOOR(RAND() * 0xF)).toString(0xF);

        return g;
    },
    // argument types
    ["CPString"])
]);
// @end: @implementation CPString (UUID)

String.prototype.isa = CPString;
