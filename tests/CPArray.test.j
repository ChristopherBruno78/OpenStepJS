
@import <Foundation/Foundation.j>

var anArray = [[CPArray alloc] initWithObjects: @"Bellows"];


[anArray addObject: @"Hello"];
[anArray addObject: @"World"];

console.assert([anArray count] == 3, "CPArray is not adding objects.");

[anArray replaceObjectAtIndex: 1 withObject: @"Goodbye"];

console.log(anArray);

[anArray removeObjectAtIndex:1];

console.assert([anArray count] == 2, "CPArray is not removing objects at index.");

console.log(anArray);

[anArray removeLastObject];

console.log(anArray);

[anArray insertObject:@"Test" atIndex:0];
console.log(anArray);
