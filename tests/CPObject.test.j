@import <Foundation/Foundation.j>


@implementation MyObject : CPObject


- (void)helloWorld
{
    console.log("Hello, World");
}


@end


var obj = [MyObject new];


console.log([obj respondsToSelector: @selector(helloWorld)]);

[obj performSelector: @selector(helloWorld)];
