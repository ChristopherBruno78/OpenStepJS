// @import <Foundation/Foundation.j>

var anArray = /* [[CPArray alloc] initWithObjects:@"Bellows"] */ ((___r1 = (CPArray == null ? null : CPArray.isa.objj_msgSend0(CPArray, "alloc"))), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithObjects:", "Bellows")),
    test = "Hello";

/* [anArray addObject:@"Hello"] */ (anArray == null ? null : anArray.isa.objj_msgSend1(anArray, "addObject:", "Hello"));
/* [anArray addObject:@"World"] */ (anArray == null ? null : anArray.isa.objj_msgSend1(anArray, "addObject:", "World"));
console.assert(/* [anArray count] */ (anArray == null ? null : anArray.isa.objj_msgSend0(anArray, "count")) == 3, "CPArray is not adding objects.");
/* [anArray replaceObjectAtIndex:1 withObject:@"Goodbye"] */ (anArray == null ? null : anArray.isa.objj_msgSend2(anArray, "replaceObjectAtIndex:withObject:", 1, "Goodbye"));
console.log(anArray);
/* [anArray removeObjectAtIndex:1] */ (anArray == null ? null : anArray.isa.objj_msgSend1(anArray, "removeObjectAtIndex:", 1));
console.assert(/* [anArray count] */ (anArray == null ? null : anArray.isa.objj_msgSend0(anArray, "count")) == 2, "CPArray is not removing objects at index.");
console.log(anArray);
/* [anArray removeLastObject] */ (anArray == null ? null : anArray.isa.objj_msgSend0(anArray, "removeLastObject"));
console.log(anArray);
/* [anArray insertObject:@"Test" atIndex:0] */ (anArray == null ? null : anArray.isa.objj_msgSend2(anArray, "insertObject:atIndex:", "Test", 0));
console.log(anArray);

// Generated receiver temp variables
var ___r1;
