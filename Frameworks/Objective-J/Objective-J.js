var ObjectiveJ={};!function(s){s.NO=!1,s.YES=!0,s.nil=null,s.Nil=null,s.NULL=null,s.ABS=Math.abs,s.ASIN=Math.asin,s.ACOS=Math.acos,s.ATAN=Math.atan,s.ATAN2=Math.atan2,s.SIN=Math.sin,s.COS=Math.cos,s.TAN=Math.tan,s.EXP=Math.exp,s.POW=Math.pow,s.CEIL=Math.ceil,s.FLOOR=Math.floor,s.ROUND=Math.round,s.MIN=Math.min,s.MAX=Math.max,s.RAND=Math.random,s.SQRT=Math.sqrt,s.E=Math.E,s.LN2=Math.LN2,s.LN10=Math.LN10,s.LOG=Math.log,s.LOG2E=Math.LOG2E,s.LOG10E=Math.LOG10E,s.PI=Math.PI,s.PI2=2*Math.PI,s.PI_2=Math.PI/2,s.SQRT1_2=Math.SQRT1_2,s.SQRT2=Math.SQRT2;var e=1;s.objj_generateObjectUID=function(){return e++},s.objj_ivar=function(e,t){this.name=e,this.type=t},s.objj_method=function(e,t,o){var n=t||function(e,t){throw new Error(e.isa.method_msgSend0(self,"className")+" does not have an implementation for selector '"+t+"'")};return n.method_name=e,n.method_imp=t,n.method_types=o,n},s.objj_class=function(e){this.isa=NULL,this.version=0,this.super_class=NULL,this.name=NULL,this.info=0,this.ivar_list=[],this.ivar_store=function(){},this.ivar_dtable=this.ivar_store.prototype,this.method_list=[],this.method_store=function(){},this.method_dtable=this.method_store.prototype,this.protocol_list=[],this.allocator=function(){},this._UID=-1},s.objj_protocol=function(e){this.name=e,this.instance_methods={},this.class_methods={}},s.objj_object=function(){this.isa=NULL,this._UID=-1},s.objj_typeDef=function(e){this.name=e},s.class_getName=function(e){return e==Nil?"":e.name},s.class_isMetaClass=function(e){return e?2&e.info:NO},s.class_getSuperclass=function(e){return e==Nil?Nil:e.super_class},s.class_setSuperclass=function(e,t){e.super_class=t,e.isa.super_class=t.isa},s.class_addIvar=function(e,t,o){var n=e.allocator.prototype;if(void 0!==n[t])return NO;o=new objj_ivar(t,o);return e.ivar_list.push(o),e.ivar_dtable[t]=o,n[t]=NULL,YES},s.class_addIvars=function(e,t){for(var o=0,n=t.length,r=e.allocator.prototype;o<n;++o){var s=t[o],a=s.name;void 0===r[a]&&(e.ivar_list.push(s),e.ivar_dtable[a]=s,r[a]=NULL)}},s.class_copyIvarList=function(e){return e.ivar_list.slice(0)},s.class_addMethod=function(e,t,o,n){var r=new objj_method(t,o,n);return e.method_list.push(r),e.method_dtable[t]=r,2&e.info||(2&e.info?e:e.isa).isa!==(2&e.info?e:e.isa)||class_addMethod(2&e.info?e:e.isa,t,o,n),YES},s.class_addMethods=function(e,t){for(var o=0,n=t.length,r=e.method_list,s=e.method_dtable;o<n;++o){var a=t[o];r.push(a),s[a.method_name]=a}2&e.info||(2&e.info?e:e.isa).isa!==(2&e.info?e:e.isa)||class_addMethods(2&e.info?e:e.isa,t)},s.class_getInstanceMethod=function(e,t){if(!e||!t)return NULL;t=e.method_dtable[t];return t||NULL},s.class_getInstanceVariable=function(e,t){return e&&t?e.ivar_dtable[t]:NULL},s.class_getClassMethod=function(e,t){if(!e||!t)return NULL;t=(2&e.info?e:e.isa).method_dtable[t];return t||NULL},s.class_respondsToSelector=function(e,t){return class_getClassMethod(e,t)!=NULL},s.class_copyMethodList=function(e){return e.method_list.slice(0)},s.class_getVersion=function(e){return e.version},s.class_setVersion=function(e,t){e.version=parseInt(t,10)},s.class_replaceMethod=function(e,t,o){if(!e||!t)return NULL;var n=e.method_dtable[t],r=n.method_imp,o=new objj_method(n.method_name,o,n.method_types);o.displayName=n.displayName,e.method_dtable[t]=o;n=e.method_list.indexOf(n);return-1!==n?e.method_list[n]=o:e.method_list.push(o),r},s.class_addProtocol=function(e,t){if(t&&!class_conformsToProtocol(e,t))return(e.protocol_list||(e.protocol_list=[])).push(t),!0},s.class_conformsToProtocol=function(e,t){if(!t)return!1;for(;e;){for(var o=e.protocol_list,n=o?o.length:0,r=0;r<n;r++){var s=o[r];if(s.name===t.name)return!0;if(protocol_conformsToProtocol(s,t))return!0}e=class_getSuperclass(e)}return!1},s.class_copyProtocolList=function(e){e=e.protocol_list;return e?e.slice(0):[]},s.protocol_conformsToProtocol=function(e,t){if(!e||!t)return!1;if(e.name===t.name)return!0;for(var o=e.protocol_list,n=o?o.length:0,r=0;r<n;r++){var s=o[r];if(s.name===t.name)return!0;if(protocol_conformsToProtocol(s,t))return!0}return!1};var t=Object.create(null);s.objj_allocateProtocol=function(e){return new objj_protocol(e)},s.objj_registerProtocol=function(e){t[e.name]=e},s.protocol_getName=function(e){return e.name},s.protocol_addMethodDescription=function(e,t,o,n,r){e&&t&&n&&((r?e.instance_methods:e.class_methods)[t]=new objj_method(t,null,o))},s.protocol_addMethodDescriptions=function(e,t,o,n){if(o)for(var r=0,s=t.length,a=n?e.instance_methods:e.class_methods;r<s;++r){var i=t[r];a[i.method_name]=i}},s.protocol_copyMethodDescriptionList=function(e,t,o){if(!t)return[];var n,r=o?e.instance_methods:e.class_methods,s=[];for(n in r)r.hasOwnProperty(n)&&s.push(r[n]);return s},s.protocol_addProtocol=function(e,t){e&&t&&(e.protocol_list||(e.protocol_list=[])).push(t)};var o=Object.create(null);s.objj_allocateTypeDef=function(e){return new objj_typeDef(e)},s.objj_registerTypeDef=function(e){o[e.name]=e},s.typeDef_getName=function(e){return e.name};var d=function(e){var t=2&e.info?e:e.isa;2&e.info&&(e=objj_getClass(e.name)),!e.super_class||4&(2&e.super_class.info?e.super_class:e.super_class.isa).info||d(e.super_class),4&t.info||8&t.info||(t.info=-1&(8|t.info),e.objj_msgSend=objj_msgSendFast,e.objj_msgSend0=objj_msgSendFast0,e.objj_msgSend1=objj_msgSendFast1,e.objj_msgSend2=objj_msgSendFast2,e.objj_msgSend3=objj_msgSendFast3,t.objj_msgSend=objj_msgSendFast,t.objj_msgSend0=objj_msgSendFast0,t.objj_msgSend1=objj_msgSendFast1,t.objj_msgSend2=objj_msgSendFast2,t.objj_msgSend3=objj_msgSendFast3,e.method_msgSend=e.method_dtable,t.method_msgSend=t.method_dtable,t.objj_msgSend0(e,"initialize"),t.info=-9&(4|t.info))};_objj_forward=function(e,t){var o=e.isa,n=2&o.info?o:o.isa;4&n.info||8&n.info||d(o);var r=o.method_msgSend[t];if(r)return r.apply(o,arguments);if(r=o.method_dtable[u]){var s=r(e,u,t);if(s&&s!==e)return(arguments[0]=s).isa.objj_msgSend.apply(s.isa,arguments)}if(r=o.method_dtable[j]){var a=o.method_dtable[m];if(a){n=r(e,j,t);if(n){s=objj_lookUpClass("CPInvocation");if(s){var i=s.isa.objj_msgSend1(s,h,n),c=0,l=arguments.length;if(null!=i)for(var _=i.isa;c<l;++c)_.objj_msgSend2(i,b,arguments[c],c);return a(e,m,i),null==i?null:_.objj_msgSend0(i,p)}}}}if(r=o.method_dtable[f])return r(e,f,t);throw class_getName(o)+" does not implement doesNotRecognizeSelector:. Did you forget a superclass for "+class_getName(o)+"?"},s.class_getMethodImplementation=function(e,t){return 4&(2&e.info?e:e.isa).info||d(e),e.method_dtable[t]||_objj_forward};var n=Object.create(null);s.objj_enumerateClassesUsingBlock=function(e){for(var t in n)e(n[t])},s.objj_allocateClassPair=function(e,t){var o=new objj_class(t),n=new objj_class(t),r=o;if(e){for(r=e;r.superclass;)r=r.superclass;o.allocator.prototype=new e.allocator,o.ivar_dtable=o.ivar_store.prototype=new e.ivar_store,o.method_dtable=o.method_store.prototype=new e.method_store,n.method_dtable=n.method_store.prototype=new e.isa.method_store,o.super_class=e,n.super_class=e.isa}else o.allocator.prototype=new objj_object;return o.isa=n,o.name=t,o.info=1,o._UID=objj_generateObjectUID(),o.init=!0,n.isa=r.isa,n.name=t,n.info=2,n._UID=objj_generateObjectUID(),n.init=!0,o},s.objj_registerClassPair=function(e){s[e.name]=e,n[e.name]=e},s.objj_resetRegisterClasses=function(){for(var e in n)delete s[e];n=Object.create(null),t=Object.create(null),o=Object.create(null)};var r=Object.create(null);s.objj_getObjectByReference=function(e){return r[e]},s.objj_addObjectReference=function(e,t){if(e){if(r[e])throw new Error("*** Attempting to add duplicate reference "+e+". A reference name can be used only once in an application.");r[e]=t}},s.objj_removeObjectReference=function(e){r[e]&&delete r[e]};var a=Object.create(null);s.objj_defineCib=function(e,t){a[e]=t},s.CibId=null,s.objj_currentCibId=function(){return s.CibId},s.objj_loadCib=function(e,t,o){var n=a[e];if(n){s.CibId=objj_generateObjectUID();var r=new n(t);return o&&setTimeout(function(){o.call(s,r)},0),s.CibId=null,r}throw new Error("*** No such cib: "+e)},s.class_createInstance=function(e){if(!e)throw new Error("*** Attempting to create object with Nil class.");var t=new e.allocator;return t.isa=e,t._UID=objj_generateObjectUID(),t},s.object_getClassName=function(e){if(!e)return"";e=e.isa;return e?class_getName(e):""},s.objj_lookUpClass=function(e){e=n[e];return e||Nil},s.objj_getClass=function(e){e=n[e];return e||Nil},s.objj_getClassList=function(e,t){for(var o in n)if(e.push(n[o]),t&&0==--t)break;return e.length},s.objj_getMetaClass=function(e){e=objj_getClass(e);return 2&e.info?e:e.isa},s.objj_getProtocol=function(e){return t[e]},s.objj_getTypeDef=function(e){return o[e]},s.ivar_getName=function(e){return e.name},s.ivar_getTypeEncoding=function(e){return e.type},s.objj_msgSend=function(e,t){if(e==nil)return nil;var o=e.isa;o.init&&d(o);var o=o.method_dtable[t],n=o?o.method_imp:_objj_forward;switch(arguments.length){case 2:return n(e,t);case 3:return n(e,t,arguments[2]);case 4:return n(e,t,arguments[2],arguments[3]);case 5:return n(e,t,arguments[2],arguments[3],arguments[4]);case 6:return n(e,t,arguments[2],arguments[3],arguments[4],arguments[5]);case 7:return n(e,t,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6])}return n.apply(e,arguments)},s.objj_msgSendSuper=function(e,t){var o=e.super_class;return arguments[0]=e.receiver,4&(2&o.info?o:o.isa).info||d(o),(o.method_dtable[t]||_objj_forward).apply(e.receiver,arguments)},s.objj_msgSendSuper0=function(e,t){return(e.super_class.method_dtable[t]||_objj_forward)(e.receiver,t)},s.objj_msgSendSuper1=function(e,t,o){return(e.super_class.method_dtable[t]||_objj_forward)(e.receiver,t,o)},s.objj_msgSendSuper2=function(e,t,o,n){return(e.super_class.method_dtable[t]||_objj_forward)(e.receiver,t,o,n)},s.objj_msgSendSuper3=function(e,t,o,n,r){return(e.super_class.method_dtable[t]||_objj_forward)(e.receiver,t,o,n,r)},s.objj_msgSendFast=function(e,t){return(this.method_dtable[t]||_objj_forward).apply(e,arguments)},s.objj_msgSendFast0=function(e,t){return(this.method_dtable[t]||_objj_forward)(e,t)},s.objj_msgSendFast1=function(e,t,o){return(this.method_dtable[t]||_objj_forward)(e,t,o)},s.objj_msgSendFast2=function(e,t,o,n){return(this.method_dtable[t]||_objj_forward)(e,t,o,n)},s.objj_msgSendFast3=function(e,t,o,n,r){return(this.method_dtable[t]||_objj_forward)(e,t,o,n,r)},s.method_getName=function(e){return e.method_name},s.method_copyReturnType=function(e){e=e.method_types;if(e){e=e[0];return e!=NULL?e:NULL}return NULL},s.method_copyArgumentType=function(e,t){switch(t){case 0:return"id";case 1:return"SEL";default:var o=e.method_types;if(o){o=o[t-1];return o!=NULL?o:NULL}return NULL}},s.method_getNumberOfArguments=function(e){var t=e.method_types;return t?t.length+1:(e.method_name.match(/:/g)||[]).length+2},s.method_getImplementation=function(e){return e.method_imp},s.method_setImplementation=function(e,t){var o=e.method_imp;return e.method_imp=t,o},s.method_exchangeImplementations=function(e,t){var o=method_getImplementation(e),n=method_getImplementation(t);method_setImplementation(e,n),method_setImplementation(t,o)},s.sel_getName=function(e){return e||"<null selector>"},s.sel_getUid=function(e){return e},s.sel_isEqual=function(e,t){return e===t},s.sel_registerName=function(e){return e},s.objj_global=function(){return s},objj_class.prototype.toString=objj_object.prototype.toString=function(){var e=this.isa;return class_getInstanceMethod(e,i)?e.objj_msgSend0(this,i):class_isMetaClass(e)?this.name:"["+e.name+" Object](-description not implemented)"},s.objj_defineGlobals=function(e){Object.assign(s,e)},objj_class.prototype.objj_msgSend=function(e,t){return d(this),this.objj_msgSend.apply(this,arguments)},objj_class.prototype.objj_msgSend0=function(e,t){return d(this),this.objj_msgSend0(e,t)},objj_class.prototype.objj_msgSend1=function(e,t,o){return d(this),this.objj_msgSend1(e,t,o)},objj_class.prototype.objj_msgSend2=function(e,t,o,n){return d(this),this.objj_msgSend2(e,t,o,n)},objj_class.prototype.objj_msgSend3=function(e,t,o,n,r){return d(this),this.objj_msgSend3(e,t,o,n,r)},objj_class.prototype.method_msgSend=Object.create(null);var i=sel_getUid("description"),u=sel_getUid("forwardingTargetForSelector:"),j=sel_getUid("methodSignatureForSelector:"),m=sel_getUid("forwardInvocation:"),f=sel_getUid("doesNotRecognizeSelector:"),h=sel_getUid("invocationWithMethodSignature:"),b=(sel_getUid("setTarget:"),sel_getUid("setSelector:"),sel_getUid("setArgument:atIndex:")),p=sel_getUid("returnValue")}("undefined"==typeof window?global:window);