@import <Foundation/Foundation.j>

let anArray = [[CPArray alloc] initWithObjects:@"Bellows"],
	test = "Hello";

[anArray addObject:@"Hello"];
[anArray addObject:@"World"];

console.assert([anArray count] == 3, "CPArray is not adding objects.");

[anArray replaceObjectAtIndex:1 withObject:@"Goodbye" atTest:2];

console.log(anArray);
[anArray removeObjectAtIndex:1];

console.assert([anArray count] == 2, "CPArray is not removing objects at index.");
console.log(anArray);

[anArray removeLastObject];
console.log(anArray);
[anArray insertObject:@"Test" atIndex:0];
console.log(anArray);
function test22(arg1, arg2) {

	console.log("Test");
}

const tesFN = function(test1) {
	console.log("HERe");
	let x = 0;

};
if (help) {
	console.log("here");
}
let i = 0;
while(i != 4){
	i++;

}
i = 0;
do {
	i++;

} while(i != 4 && j == 0);

x = i - 4;
