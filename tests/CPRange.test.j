@import <Foundation/Foundation.j>


let range = CPMakeRange(0, 5);

console.log(range);

console.assert(CPMaxRange(range) === 5, "CPMaxRange not working");
console.assert(CPLocationInRange(6, range) === false, "CPLocationInRange not working");
