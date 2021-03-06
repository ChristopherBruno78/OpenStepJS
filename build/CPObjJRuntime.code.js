objj_defineGlobals({
    CPStringFromSelector: function(aSelector) {
    return sel_getName(aSelector); },
    CPSelectorFromString: function(aSelectorName) {
    return sel_registerName(aSelectorName); },
    CPClassFromString: function(aClassName) {
    return objj_getClass(aClassName); },
    CPStringFromClass: function(aClass) {
    return class_getName(aClass); },
    CPOrderedAscending: -1,
    CPOrderedSame: 0,
    CPOrderedDescending: 1,
    CPNotFound: -1
});
