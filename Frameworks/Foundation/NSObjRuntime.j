/**
    Defining globals for the Obj-J runtime
*/

objj_defineGlobals({

        NSStringFromSelector : function(aSelector)
    	{
    	    return sel_getName(aSelector);
    	},

    	NSSelectorFromString : function(aSelectorName)
    	{
    	    return sel_registerName(aSelectorName);
    	},

    	NSClassFromString : function(aClassName)
    	{
    	    return objj_getClass(aClassName);
    	},

    	NSStringFromClass : function(aClass)
    	{
    	    return class_getName(aClass);
    	},

    	/*!
    	    The left operand is smaller than the right.
    	    @global
    	    @group NSComparisonResult
    	*/
    	NSOrderedAscending      : -1,
    	/*!
    	    The left and right operands are equal.
    	    @global
    	    @group NSComparisonResult
    	*/
    	NSOrderedSame           :  0,
    	/*!
    	    The left operand is greater than the right.
    	    @global
    	    @group NSComparisonResult
    	*/
    	NSOrderedDescending     :  1,

    	NSNotFound              : -1

});