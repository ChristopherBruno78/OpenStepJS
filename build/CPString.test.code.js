// @import <Foundation/Foundation.j>

var myString = "hello, world";

console.assert(/* [myString length] */ (myString == null ? null : myString.isa.objj_msgSend0(myString, "length")) === 12, "String length wrong.");
console.assert(/* [myString capitalizedString] */ (myString == null ? null : myString.isa.objj_msgSend0(myString, "capitalizedString")) === "Hello, World");
console.assert(/* [myString substringToIndex: 6] */ (myString == null ? null : myString.isa.objj_msgSend1(myString, "substringToIndex:", 6)) === "hello,");
console.assert(/* [myString substringFromIndex: 7] */ (myString == null ? null : myString.isa.objj_msgSend1(myString, "substringFromIndex:", 7)) === "world");
console.log(/* [myString stringByReplacingCharactersInRange: CPMakeRange(1, 4) withString: @"oooo"] */ (myString == null ? null : myString.isa.objj_msgSend2(myString, "stringByReplacingCharactersInRange:withString:", CPMakeRange(1, 4), "oooo")));
console.assert(/* [myString stringByReplacingCharactersInRange: CPMakeRange(1, 4)
                                                 withString: @"oooo"] */ (myString == null ? null : myString.isa.objj_msgSend2(myString, "stringByReplacingCharactersInRange:withString:", CPMakeRange(1, 4), "oooo")) === "hoooo, world");
