/*!
	NSObject

	The root class (a root class is a class with no superclass) of the NS hierarchy,
	so all classes normally inherit from NSObject.

	All your own classes should inherit (directly or indirectly) from NSObject.
	NSObject provides the basic common functionality shared by all NS classes
	and objects.
**/

@import 'NSObjRuntime.j'

@implementation NSObject {
    id isa;
}

+(id) alloc {
	return class_createInstance(self);
}

+(id) new {
	return [[self alloc] init];
}

+ (void)initialize
{

}

// Identifying classes
/*!
    Returns the Class object for this class definition.
*/
+ (Class)class
{
    return self;
}

- (String)className
{
    return isa.name;
}

/*!
    Returns the class object super class
*/
+ (Class)superclass
{
    return class_getSuperclass(self);
}

-(id) init {
	return self;
}

/*!
    Returns a hash for the object
*/
- (unsigned)hash
{
    return [self UID];
}

- (String)UID
{

    if (typeof self._UID === "undefined")
        self._UID = objj_generateObjectUID();

    return self._UID + "";
}


// Error Handling
/*!
    Called by the Objective-J runtime when an object can't respond to
    a message. It's not recommended to call this method directly, unless
    you need your class to not support a method that it has inherited from a super class.
*/


-(BOOL) doesNotRecognizeSelector:(SEL)aSelector {
	throw new Error((class_isMetaClass(isa) ? "+" : "-") + " [" + [self className] + " " + aSelector + "] unrecognized selector sent to " +
        (class_isMetaClass(isa) ? "class " + class_getName(isa) : "instance " + [self UID]));
}


@end

