/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("widget-base",function(b){var g=b.Lang,t=b.Node,e=b.ClassNameManager,z=e.getClassName,R,u=b.cached(function(L){return L.substring(0,1).toUpperCase()+L.substring(1);}),J="content",V="visible",Q="hidden",B="disabled",F="focused",d="width",D="height",S="boundingBox",y="contentBox",k="parentNode",n="ownerDocument",K="offsetHeight",A="auto",j="srcNode",O="body",N="tabIndex",s="id",i="render",P="rendered",o="destroyed",a="strings",p="<div></div>",C="Change",q="loading",I="_uiSet",H="",M=function(){},l=/(\w+):(\w+)/,x="$2",w=true,T=false,v,m={},f=[V,B,D,d,F],G=b.UA.webkit,r=b.UA.ie,U="contentUpdate",E={},h={};function c(W){this._strs={};this._cssPrefix=this.constructor.CSS_PREFIX||z(this.constructor.NAME.toLowerCase());c.superclass.constructor.apply(this,arguments);var X=this.get(i),L;if(X){if(X!==w){L=X;}this.render(L);}}c.NAME="widget";v=c.UI_SRC="ui";c.ATTRS=m;m[s]={valueFn:"_guid",writeOnce:w};m[P]={value:T,readOnly:w};m[S]={value:null,setter:"_setBB",writeOnce:w};m[y]={valueFn:"_defaultCB",setter:"_setCB",writeOnce:w};m[N]={value:null,validator:"_validTabIndex"};m[F]={value:T,readOnly:w};m[B]={value:T};m[V]={value:w};m[D]={value:H};m[d]={value:H};m[a]={value:{},setter:"_strSetter",getter:"_strGetter"};m[i]={value:T,writeOnce:w};c.CSS_PREFIX=z(c.NAME.toLowerCase());c.getClassName=function(){return z.apply(e,[c.CSS_PREFIX].concat(b.Array(arguments),true));};R=c.getClassName;c.getByNode=function(L){var X,W=R();L=t.one(L);if(L){L=L.ancestor("."+W,true);if(L){X=h[b.stamp(L,w)];}}return X||null;};b.extend(c,b.Base,{getClassName:function(){return z.apply(e,[this._cssPrefix].concat(b.Array(arguments),true));},getSkinName:function(){var L=this.get(y)||this.get(S),X=new RegExp("\\b"+z("skin")+"-(\\S+)"),W;if(L){L.ancestor(function(Y){W=Y.get("className").match(X);return W;});}return(W)?W[1]:null;},initializer:function(L){h[b.stamp(this.get(S))]=this;this.publish(U,{preventable:T});if(this._applyParser){this._applyParser(L);}},destructor:function(){var L=this.get(S),X=b.stamp(L,w),W=b.stamp(this,w);if(X in h){delete h[X];}b.each(E,function(Z,Y){if(Z.instances[W]){delete Z.instances[W];if(b.Object.isEmpty(Z.instances)){Z.handle.detach();if(E[Y]){delete E[Y];}}}});this._unbindUI(L);L.remove(w);},render:function(L){if(!this.get(o)&&!this.get(P)){this.publish(i,{queuable:T,fireOnce:w,defaultTargetOnly:w,defaultFn:this._defRenderFn});this.fire(i,{parentNode:(L)?t.one(L):null});}return this;},_defRenderFn:function(L){this._parentNode=L.parentNode;this.renderer();this._set(P,w);this._removeLoadingClassNames();},renderer:function(){this._renderUI();this.renderUI();this._bindUI();this.bindUI();this._syncUI();this.syncUI();},bindUI:M,renderUI:M,syncUI:M,hide:function(){return this.set(V,T);},show:function(){return this.set(V,w);},focus:function(){return this._set(F,w);},blur:function(){return this._set(F,T);},enable:function(){return this.set(B,T);},disable:function(){return this.set(B,w);},_uiSizeCB:function(X){var Z=this.get(S),W=this.get(y),L=R("tmp","forcesize"),Y=this._bbs,aa=r&&r<7;if(Y){W.toggleClass(R(J,"expanded"),X);}else{if(X){if(aa){Z.addClass(L);}W.set(K,Z.get(K));if(aa){Z.removeClass(L);}}else{W.setStyle(D,H);}}},_renderBox:function(L){var W=this.get(y),X=this.get(S),aa=this.get(j),Y=this.DEF_PARENT_NODE,Z=(aa&&aa.get(n))||X.get(n)||W.get(n);if(aa&&!aa.compareTo(W)&&!W.inDoc(Z)){aa.replace(W);}if(!X.compareTo(W.get(k))&&!X.compareTo(W)){if(W.inDoc(Z)){W.replace(X);}X.appendChild(W);}L=L||(Y&&t.one(Y));if(L){L.appendChild(X);}else{if(!X.inDoc(Z)){t.one(O).insert(X,0);}}this._bbs=!(r&&r<8&&Z.compatMode!="BackCompat");},_setBB:function(L){return this._setBox(this.get(s),L,this.BOUNDING_TEMPLATE);},_setCB:function(L){return(this.CONTENT_TEMPLATE===null)?this.get(S):this._setBox(null,L,this.CONTENT_TEMPLATE);},_defaultCB:function(L){return this.get(j)||null;},_setBox:function(X,W,L){W=t.one(W)||t.create(L);if(!W.get(s)){W.set(s,X||b.guid());}return W;},_renderUI:function(){this._renderBoxClassNames();this._renderBox(this._parentNode);},_renderBoxClassNames:function(){var Y=this._getClasses(),L,W=this.get(S),X;W.addClass(R());for(X=Y.length-3;X>=0;X--){L=Y[X];W.addClass(L.CSS_PREFIX||z(L.NAME.toLowerCase()));}this.get(y).addClass(this.getClassName(J));},_removeLoadingClassNames:function(){var W=this.get(S),L=this.get(y);W.removeClass(R(q));W.removeClass(this.getClassName(q));L.removeClass(R(q));L.removeClass(this.getClassName(q));},_bindUI:function(){this._bindAttrUI(this._BIND_UI_ATTRS);this._bindDOM();},_unbindUI:function(L){this._unbindDOM(L);},_bindDOM:function(){var L=this.get(S).get(n);this._hDocFocus=L.on("focus",this._onDocFocus,this);if(G){this._hDocMouseDown=L.on("mousedown",this._onDocMouseDown,this);}},_unbindDOM:function(L){if(this._hDocFocus){this._hDocFocus.detach();}if(G&&this._hDocMouseDown){this._hDocMouseDown.detach();}},_syncUI:function(){this._syncAttrUI(this._SYNC_UI_ATTRS);},_uiSetHeight:function(L){this._uiSetDim(D,L);this._uiSizeCB((L!==H&&L!==A));},_uiSetWidth:function(L){this._uiSetDim(d,L);},_uiSetDim:function(L,W){this.get(S).setStyle(L,g.isNumber(W)?W+this.DEF_UNIT:W);},_uiSetVisible:function(L){this.get(S).toggleClass(this.getClassName(Q),!L);},_uiSetDisabled:function(L){this.get(S).toggleClass(this.getClassName(B),L);},_uiSetFocused:function(X,W){var L=this.get(S);L.toggleClass(this.getClassName(F),X);if(W!==v){if(X){L.focus();}else{L.blur();}}},_uiSetTabIndex:function(W){var L=this.get(S);if(g.isNumber(W)){L.set(N,W);}else{L.removeAttribute(N);}},_onDocMouseDown:function(L){if(this._hasDOMFocus){this._onDocFocus(L);}},_onDocFocus:function(W){var L=this.get(S).contains(W.target);this._hasDOMFocus=L;this._set(F,L,{src:v});},toString:function(){return this.constructor.NAME+"["+this.get(s)+"]";},DEF_UNIT:"px",DEF_PARENT_NODE:null,CONTENT_TEMPLATE:p,BOUNDING_TEMPLATE:p,_guid:function(){return b.guid();},_validTabIndex:function(L){return(g.isNumber(L)||g.isNull(L));},_bindAttrUI:function(W){var X,L=W.length;for(X=0;X<L;X++){this.after(W[X]+C,this._setAttrUI);}},_syncAttrUI:function(X){var Y,W=X.length,L;
for(Y=0;Y<W;Y++){L=X[Y];this[I+u(L)](this.get(L));}},_setAttrUI:function(L){this[I+u(L.attrName)](L.newVal,L.src);},_strSetter:function(L){return b.merge(this.get(a),L);},getString:function(L){return this.get(a)[L];},getStrings:function(){return this.get(a);},_BIND_UI_ATTRS:f,_SYNC_UI_ATTRS:f.concat(N),UI_EVENTS:b.Node.DOM_EVENTS,_getUIEventNode:function(){return this.get(S);},_createUIEvent:function(W){var Z=this._getUIEventNode(),L=(b.stamp(Z)+W),Y=E[L],X;if(!Y){X=Z.delegate(W,function(aa){var ab=c.getByNode(this);ab.fire(aa.type,{domEvent:aa});},"."+R());E[L]=Y={instances:{},handle:X};}Y.instances[b.stamp(this)]=1;},_getUIEvent:function(W){if(g.isString(W)){var X=W.replace(l,x),L;if(this.UI_EVENTS[X]){L=X;}return L;}},_initUIEvent:function(W){var X=this._getUIEvent(W),L=this._uiEvtsInitQueue||{};if(X&&!L[X]){this._uiEvtsInitQueue=L[X]=1;this.after(i,function(){this._createUIEvent(X);delete this._uiEvtsInitQueue[X];});}},on:function(L){this._initUIEvent(L);return c.superclass.on.apply(this,arguments);},after:function(L){this._initUIEvent(L);return c.superclass.after.apply(this,arguments);},publish:function(W,L){var X=this._getUIEvent(W);if(X&&L&&L.defaultFn){this._initUIEvent(X);}return c.superclass.publish.apply(this,arguments);}});b.Widget=c;},"3.2.0",{requires:["attribute","event-focus","base-base","base-pluginhost","node-base","node-style","node-event-delegate","classnamemanager"]});YUI.add("widget-htmlparser",function(f){var e=f.Widget,c=f.Node,d=f.Lang,a="srcNode",b="contentBox";e.HTML_PARSER={};e._buildCfg={aggregates:["HTML_PARSER"]};e.ATTRS[a]={value:null,setter:c.one,getter:"_getSrcNode",writeOnce:true};f.mix(e.prototype,{_getSrcNode:function(g){return g||this.get(b);},_applyParsedConfig:function(i,g,h){return(h)?f.mix(g,h,false):g;},_applyParser:function(g){var i=this,j=i.get(a),h=i._getHtmlParser(),l,k;if(h&&j){f.Object.each(h,function(n,m,p){k=null;if(d.isFunction(n)){k=n.call(i,j);}else{if(d.isArray(n)){k=j.all(n[0]);}else{k=j.one(n);}}if(k!==null&&k!==undefined){l=l||{};l[m]=k;}});}g=i._applyParsedConfig(j,g,l);},_getHtmlParser:function(){var h=this._getClasses(),k={},g,j;for(g=h.length-1;g>=0;g--){j=h[g].HTML_PARSER;if(j){f.mix(k,j,true);}}return k;}});},"3.2.0",{requires:["widget-base"]});YUI.add("widget",function(a){},"3.2.0",{use:["widget-base","widget-htmlparser"]});