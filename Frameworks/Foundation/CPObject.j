/*!
	NSObject
    Foundation

	The root class (a root class is a class with no superclass) of the NS hierarchy,
	so all classes normally inherit from NSObject.

	All your own classes should inherit (directly or indirectly) from NSObject.
	NSObject provides the basic common functionality shared by all NS classes
	and objects.
**/

@import "CPObjJRuntime.j"

@implementation CPObject {
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

- (CPString) className
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

/*!
    Returns \c YES if the receiving class is a subclass of \c aClass.
    @param aClass the class to test inheritance from
 */
+ (BOOL)isSubclassOfClass:(Class)aClass
{
    var theClass = self;

    for (; theClass; theClass = theClass.super_class)
        if (theClass === aClass)
        return YES;

    return NO;
}

/*!
    Returns \c YES if the receiver is a \c aClass type, or a subtype of it.
    @param aClass the class to test as the receiver's class or super class.
 */
- (BOOL)isKindOfClass:(Class)aClass
{
    return [isa isSubclassOfClass: aClass];
}

+ (BOOL)isKindOfClass:(Class)aClass
{
    return [self isSubclassOfClass: aClass];
}


- (id)init
{
    return self;
}


/*!
    Tests whether the receiver responds to the provided selector.
    @param aSelector the selector for which to test the receiver
    @return \c YES if the receiver responds to the selector
 */
- (BOOL)respondsToSelector:(SEL)aSelector
{
    // isa is isa.isa in class case.
    return !!class_getInstanceMethod(isa, aSelector);
}

/*!
    Returns a hash for the object
 */
- (unsigned)hash
{
    return [self UID];
}

- (CPString)UID
{
    if (typeof self._UID === "undefined")
        self._UID = objj_generateObjectUID();

    return self._UID + "";
}

    // Describing objects
/*!
    Returns a human readable string describing the receiver
 */
- (CPString)description
{
    return "<" + class_getName(isa) + " 0x" + [CPString stringWithHash: [self UID]] + ">";
}

+ (CPString)description
{
    return class_getName(self.isa);
}

    // Sending Messages
/*!
    Sends the specified message to the receiver.
    @param aSelector the message to send
    @return the return value of the message
 */
- (id)performSelector:(SEL)aSelector
{
    return self.isa.objj_msgSend0(self, aSelector);
}

/*!
    Sends the specified message to the receiver, with one argument.
    @param aSelector the message to send
    @param anObject the message argument
    @return the return value of the message
 */
- (id)performSelector:(SEL)aSelector withObject:(id)anObject
{
    return self.isa.objj_msgSend1(self, aSelector, anObject);
}

/*!
    Sends the specified message to the receiver, with two arguments.
    @param aSelector the message to send
    @param anObject the first message argument
    @param anotherObject the second message argument
    @return the return value of the message
 */
- (id)performSelector:(SEL)aSelector withObject:(id)anObject withObject:(id)anotherObject
{
    return self.isa.objj_msgSend2(self, aSelector, anObject, anotherObject);
}

/*!
Sends the specified message to the reciever, with any number of arguments.
@param aSelector the message to send
@param anObject... comma seperated objects to pass to the selector
@return the return value of the message
 */
- (id)performSelector:(SEL)aSelector withObjects:(id)anObject, ...
{
    var params = [self, aSelector].concat(Array.prototype.slice.apply(arguments, [3]));
    return objj_msgSend.apply(this, params);
}

- (id)forwardingTargetForSelector:(SEL)aSelector
{
    return nil;
}

    // Forwarding Messages
/*!
    Subclasses can override this method to forward message to
    other objects. Overwriting this method in conjunction with
    \c -methodSignatureForSelector: allows the receiver to
    forward messages for which it does not respond, to another object that does.
 */
- (void)forwardInvocation:(CPInvocation)anInvocation
{
    [self doesNotRecognizeSelector: [anInvocation selector]];
}


    // Error Handling
/*!
    Called by the Objective-J runtime when an object can't respond to
    a message. It's not recommended to call this method directly, unless
    you need your class to not support a method that it has inherited from a super class.
 */

- (BOOL)doesNotRecognizeSelector:(SEL)aSelector
{
    throw new Error((class_isMetaClass(isa) ? "+" : "-") + " [" + [self className] + " " + aSelector + "] unrecognized selector sent to " +
        (class_isMetaClass(isa) ? "class " + class_getName(isa) : "instance " + [self UID]));
}

/*!
    Determines if \c anObject is functionally equivalent to the receiver.
    @return \c YES if \c anObject is functionally equivalent to the receiver.
 */
- (BOOL)isEqual:(id)anObject
{
    return self === anObject || [self UID] === [anObject UID];
}

/*!
    Returns the receiver's super class.
 */
- (Class)superclass
{
    return isa.super_class;
}

@end
