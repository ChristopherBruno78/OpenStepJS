// @import <Foundation/Foundation.j>

// @implementation MyObject : CPObject
var $the_class = objj_allocateClassPair(CPObject, "MyObject");
objj_registerClassPair($the_class);

// Instance methods
class_addMethods($the_class,
[
    // - (void)helloWorld
    new objj_method(sel_getUid("helloWorld"),
    function $MyObject__helloWorld(self, _cmd)
    {
        console.log("Hello, World");
    },
    // argument types
    ["void"])
]);
// @end: @implementation MyObject : CPObject

var obj = /* [MyObject new] */ MyObject.isa.objj_msgSend0(MyObject, "new");

console.log(/* [obj respondsToSelector:@selector(helloWorld)] */ (obj == null ? null : obj.isa.objj_msgSend1(obj, "respondsToSelector:", sel_getUid("helloWorld"))));
/* [obj performSelector:@selector(helloWorld)] */ (obj == null ? null : obj.isa.objj_msgSend1(obj, "performSelector:", sel_getUid("helloWorld")));
