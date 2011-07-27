/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("datasource-local",function(c){var b=c.Lang,a=function(){a.superclass.constructor.apply(this,arguments);};c.mix(a,{NAME:"dataSourceLocal",ATTRS:{source:{value:null}},_tId:0,transactions:{},issueCallback:function(h,g){var f=(h.error||h.response.error);if(f){h.error=h.error||h.response.error;g.fire("error",h);}if(h.callback){var d=(f&&h.callback.failure)||h.callback.success;if(d){d(h);}}}});c.extend(a,c.Base,{initializer:function(d){this._initEvents();},_initEvents:function(){this.publish("request",{defaultFn:c.bind("_defRequestFn",this),queuable:true});this.publish("data",{defaultFn:c.bind("_defDataFn",this),queuable:true});this.publish("response",{defaultFn:c.bind("_defResponseFn",this),queuable:true});},_defRequestFn:function(f){var d=this.get("source");if(b.isUndefined(d)){f.error=new Error("Local source undefined");}this.fire("data",c.mix({data:d},f));},_defDataFn:function(h){var f=h.data,g=h.meta,d={results:(b.isArray(f))?f:[f],meta:(g)?g:{}};this.fire("response",c.mix({response:d},h));},_defResponseFn:function(d){a.issueCallback(d,this);},sendRequest:function(d){d=d||{};var e=a._tId++;this.fire("request",{tId:e,request:d.request,callback:d.callback,cfg:d.cfg||{}});return e;}});c.namespace("DataSource").Local=a;},"3.4.0",{requires:["base"]});YUI.add("datasource-io",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.mix(a,{NAME:"dataSourceIO",ATTRS:{io:{value:b.io,cloneDefaultValue:false},ioConfig:{value:null}}});b.extend(a,b.DataSource.Local,{initializer:function(c){this._queue={interval:null,conn:null,requests:[]};},successHandler:function(g,c,f){var d=this.get("ioConfig");delete b.DataSource.Local.transactions[f.tId];this.fire("data",b.mix({data:c},f));if(d&&d.on&&d.on.success){d.on.success.apply(d.context||b,arguments);}},failureHandler:function(g,c,f){var d=this.get("ioConfig");delete b.DataSource.Local.transactions[f.tId];f.error=new Error("IO data failure");this.fire("data",b.mix({data:c},f));if(d&&d.on&&d.on.failure){d.on.failure.apply(d.context||b,arguments);}},_queue:null,_defRequestFn:function(h){var g=this.get("source"),i=this.get("io"),d=this.get("ioConfig"),f=h.request,c=b.merge(d,h.cfg,{on:b.merge(d,{success:this.successHandler,failure:this.failureHandler}),context:this,"arguments":h});if(b.Lang.isString(f)){if(c.method&&(c.method.toUpperCase()==="POST")){c.data=c.data?c.data+f:f;}else{g+=f;}}b.DataSource.Local.transactions[h.tId]=i(g,c);return h.tId;}});b.DataSource.IO=a;},"3.4.0",{requires:["datasource-local","io-base"]});YUI.add("datasource-get",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.DataSource.Get=b.extend(a,b.DataSource.Local,{_defRequestFn:function(h){var g=this.get("source"),d=this.get("get"),c=b.guid().replace(/\-/g,"_"),f=this.get("generateRequestCallback"),i;this._last=c;YUI.Env.DataSource.callbacks[c]=b.bind(function(e){delete YUI.Env.DataSource.callbacks[c];delete b.DataSource.Local.transactions[h.tId];var j=this.get("asyncMode")!=="ignoreStaleResponses"||this._last===c;if(j){this.fire("data",b.mix({data:e},h));}else{}},this);g+=h.request+f.call(this,c);b.DataSource.Local.transactions[h.tId]=d.script(g,{autopurge:true,onFailure:b.bind(function(j,k){delete YUI.Env.DataSource.callbacks[c];delete b.DataSource.Local.transactions[j.tId];j.error=new Error(k.msg||"Script node data failure");this.fire("data",j);},this,h),onTimeout:b.bind(function(j,k){delete YUI.Env.DataSource.callbacks[c];delete b.DataSource.Local.transactions[j.tId];j.error=new Error(k.msg||"Script node data timeout");this.fire("data",j);},this,h)});return h.tId;},_generateRequest:function(c){return"&"+this.get("scriptCallbackParam")+"=YUI.Env.DataSource.callbacks."+c;}},{NAME:"dataSourceGet",ATTRS:{get:{value:b.Get,cloneDefaultValue:false},asyncMode:{value:"allowAll"},scriptCallbackParam:{value:"callback"},generateRequestCallback:{value:function(){return this._generateRequest.apply(this,arguments);}}}});YUI.namespace("Env.DataSource.callbacks");},"3.4.0",{requires:["datasource-local","get"]});YUI.add("datasource-function",function(b){var a=b.Lang,c=function(){c.superclass.constructor.apply(this,arguments);};b.mix(c,{NAME:"dataSourceFunction",ATTRS:{source:{validator:a.isFunction}}});b.extend(c,b.DataSource.Local,{_defRequestFn:function(h){var g=this.get("source"),d;if(g){try{d=g(h.request,this,h);this.fire("data",b.mix({data:d},h));}catch(f){h.error=f;this.fire("data",h);}}else{h.error=new Error("Function data failure");this.fire("data",h);}return h.tId;}});b.DataSource.Function=c;},"3.4.0",{requires:["datasource-local"]});YUI.add("datasource-cache",function(c){var b=function(){};c.mix(b,{NS:"cache",NAME:"dataSourceCacheExtension"});b.prototype={initializer:function(d){this.doBefore("_defRequestFn",this._beforeDefRequestFn);this.doBefore("_defResponseFn",this._beforeDefResponseFn);},_beforeDefRequestFn:function(f){var d=(this.retrieve(f.request))||null;if(d&&d.response){this.get("host").fire("response",c.mix(d,f));return new c.Do.Halt("DataSourceCache extension halted _defRequestFn");}},_beforeDefResponseFn:function(d){if(d.response&&!d.cached){this.add(d.request,d.response);}}};c.namespace("Plugin").DataSourceCacheExtension=b;function a(f){var e=f&&f.cache?f.cache:c.Cache,g=c.Base.create("dataSourceCache",e,[c.Plugin.Base,c.Plugin.DataSourceCacheExtension]),d=new g(f);g.NS="tmpClass";return d;}c.mix(a,{NS:"cache",NAME:"dataSourceCache"});c.namespace("Plugin").DataSourceCache=a;},"3.4.0",{requires:["datasource-local","cache-base","plugin"]});YUI.add("datasource-jsonschema",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.mix(a,{NS:"schema",NAME:"dataSourceJSONSchema",ATTRS:{schema:{}}});b.extend(a,b.Plugin.Base,{initializer:function(c){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(f){var d=f.data?(f.data.responseText?f.data.responseText:f.data):f.data,c=b.DataSchema.JSON.apply.call(this,this.get("schema"),d);if(!c){c={meta:{},results:d};}this.get("host").fire("response",b.mix({response:c},f));
return new b.Do.Halt("DataSourceJSONSchema plugin halted _defDataFn");}});b.namespace("Plugin").DataSourceJSONSchema=a;},"3.4.0",{requires:["datasource-local","plugin","dataschema-json"]});YUI.add("datasource-xmlschema",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.mix(a,{NS:"schema",NAME:"dataSourceXMLSchema",ATTRS:{schema:{}}});b.extend(a,b.Plugin.Base,{initializer:function(c){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(f){var d=(b.DataSource.IO&&(this.get("host") instanceof b.DataSource.IO)&&f.data.responseXML&&(f.data.responseXML.nodeType===9))?f.data.responseXML:f.data,c=b.DataSchema.XML.apply.call(this,this.get("schema"),d);if(!c){c={meta:{},results:d};}this.get("host").fire("response",b.mix({response:c},f));return new b.Do.Halt("DataSourceXMLSchema plugin halted _defDataFn");}});b.namespace("Plugin").DataSourceXMLSchema=a;},"3.4.0",{requires:["datasource-local","plugin","dataschema-xml"]});YUI.add("datasource-arrayschema",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.mix(a,{NS:"schema",NAME:"dataSourceArraySchema",ATTRS:{schema:{}}});b.extend(a,b.Plugin.Base,{initializer:function(c){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(f){var d=(b.DataSource.IO&&(this.get("host") instanceof b.DataSource.IO)&&b.Lang.isString(f.data.responseText))?f.data.responseText:f.data,c=b.DataSchema.Array.apply.call(this,this.get("schema"),d);if(!c){c={meta:{},results:d};}this.get("host").fire("response",b.mix({response:c},f));return new b.Do.Halt("DataSourceArraySchema plugin halted _defDataFn");}});b.namespace("Plugin").DataSourceArraySchema=a;},"3.4.0",{requires:["datasource-local","plugin","dataschema-array"]});YUI.add("datasource-textschema",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.mix(a,{NS:"schema",NAME:"dataSourceTextSchema",ATTRS:{schema:{}}});b.extend(a,b.Plugin.Base,{initializer:function(c){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(f){var d=(b.DataSource.IO&&(this.get("host") instanceof b.DataSource.IO)&&b.Lang.isString(f.data.responseText))?f.data.responseText:f.data,c=b.DataSchema.Text.apply.call(this,this.get("schema"),d);if(!c){c={meta:{},results:d};}this.get("host").fire("response",b.mix({response:c},f));return new b.Do.Halt("DataSourceTextSchema plugin halted _defDataFn");}});b.namespace("Plugin").DataSourceTextSchema=a;},"3.4.0",{requires:["datasource-local","plugin","dataschema-text"]});YUI.add("datasource-polling",function(b){function a(){this._intervals={};}a.prototype={_intervals:null,setInterval:function(d,e){var c=b.later(d,this,this.sendRequest,[e],true);this._intervals[c.id]=c;return c.id;},clearInterval:function(d,c){d=c||d;if(this._intervals[d]){this._intervals[d].cancel();delete this._intervals[d];}},clearAllIntervals:function(){b.each(this._intervals,this.clearInterval,this);}};b.augment(b.DataSource.Local,a);},"3.4.0",{requires:["datasource-local"]});YUI.add("datasource",function(a){},"3.4.0",{use:["datasource-local","datasource-io","datasource-get","datasource-function","datasource-cache","datasource-jsonschema","datasource-xmlschema","datasource-arrayschema","datasource-textschema","datasource-polling"]});