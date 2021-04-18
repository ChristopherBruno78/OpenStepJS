@import <Foundation/Foundation.j>


var myString = @"hello, world";


console.assert([myString length] === 12, "String length wrong.");
console.assert([myString capitalizedString] === "Hello, World");
console.assert([myString substringToIndex: 6] === "hello,");
console.assert([myString substringFromIndex: 7] === "world");
console.log([myString stringByReplacingCharactersInRange: CPMakeRange(1, 4) withString: @"oooo"]);
console.assert([myString stringByReplacingCharactersInRange: CPMakeRange(1, 4)
                                                 withString: @"oooo"] === "hoooo, world");


