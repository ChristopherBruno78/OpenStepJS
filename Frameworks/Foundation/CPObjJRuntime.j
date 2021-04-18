/*
 * CPObjJRuntime.j
 * Foundation
 *
 */

/**
    Defining globals for the Obj-J runtime
 */

objj_defineGlobals({

    CPStringFromSelector : function(aSelector)
    {
        return sel_getName(aSelector);
    },

    CPSelectorFromString : function(aSelectorName)
    {
        return sel_registerName(aSelectorName);
    },

    CPClassFromString : function(aClassName)
    {
        return objj_getClass(aClassName);
    },

    CPStringFromClass : function(aClass)
    {
        return class_getName(aClass);
    },

    /*!
        The left operand is smaller than the right.
        @global
        @group NSComparisonResult
     */
    CPOrderedAscending      : -1,
    /*!
        The left and right operands are equal.
        @global
        @group NSComparisonResult
     */
    CPOrderedSame           :  0,
    /*!
        The left operand is greater than the right.
        @global
        @group NSComparisonResult
     */
    CPOrderedDescending     :  1,

    CPNotFound              : -1

});
