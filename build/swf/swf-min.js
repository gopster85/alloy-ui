/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("swf",function(b){var m=b.Event,g=b.SWFDetect,i=b.Lang,h=b.UA,j=b.Node,f="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",e="application/x-shockwave-flash",d="10.0.22",a="http://fpdownload.macromedia.com/pub/flashplayer/update/current/swf/autoUpdater.swf?"+Math.random(),c="SWF.eventHandler",k={align:"",allowFullScreen:"",allowNetworking:"",allowScriptAccess:"",base:"",bgcolor:"",menu:"",name:"",quality:"",salign:"",scale:"",tabindex:"",wmode:""};function l(r,o,D){this._id=b.guid("yuiswf");var s=this._id;var x=j.one(r);var G=D["version"]||d;var A=(G+"").split(".");var t=g.isFlashVersionAtLeast(parseInt(A[0]),parseInt(A[1]),parseInt(A[2]));var z=(g.isFlashVersionAtLeast(8,0,0));var q=z&&!t&&D["useExpressInstall"];var p=(q)?a:o;var F="<object ";var u,C;var E="yId="+b.id+"&YUISwfId="+s+"&YUIBridgeCallback="+c+"&allowedDomain="+document.location.hostname;b.SWF._instances[s]=this;if(x&&(t||q)&&p){F+='id="'+s+'" ';if(h.ie){F+='classid="'+f+'" ';}else{F+='type="'+e+'" data="'+p+'" ';}u="100%";C="100%";F+='width="'+u+'" height="'+C+'">';if(h.ie){F+='<param name="movie" value="'+p+'"/>';}for(var v in D.fixedAttributes){if(k.hasOwnProperty(v)){F+='<param name="'+v+'" value="'+D.fixedAttributes[v]+'"/>';}}for(var y in D.flashVars){var n=D.flashVars[y];if(i.isString(n)){E+="&"+y+"="+encodeURIComponent(n);}}if(E){F+='<param name="flashVars" value="'+E+'"/>';}F+="</object>";x.setContent(F);this._swf=j.one("#"+s);}else{var B={};B.type="wrongflashversion";this.publish("wrongflashversion",{fireOnce:true});this.fire("wrongflashversion",B);}}l._instances=l._instances||{};l.eventHandler=function(n,o){l._instances[n]._eventHandler(o);};l.prototype={_eventHandler:function(n){if(n.type==="swfReady"){this.publish("swfReady",{fireOnce:true});this.fire("swfReady",n);}else{if(n.type==="log"){}else{this.fire(n.type,n);}}},callSWF:function(o,n){if(!n){n=[];}if(this._swf._node[o]){return(this._swf._node[o].apply(this._swf._node,n));}else{return null;}},toString:function(){return"SWF "+this._id;}};b.augment(l,b.EventTarget);b.SWF=l;},"3.4.0",{requires:["event-custom","node","swfdetect"]});