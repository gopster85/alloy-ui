/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("io-upload-iframe",function(c){var n=c.config.win,j=c.config.doc,h=(j.documentMode&&j.documentMode>=8),i=decodeURIComponent;function f(u,t){var v=[],d=t.split("="),r,q;for(r=0,q=d.length-1;r<q;r++){v[r]=j.createElement("input");v[r].type="hidden";v[r].name=i(d[r].substring(d[r].lastIndexOf("&")+1));v[r].value=(r+1===q)?i(d[r+1]):i(d[r+1].substring(0,(d[r+1].lastIndexOf("&"))));u.appendChild(v[r]);}return v;}function k(r,s){var q,d;for(q=0,d=s.length;q<d;q++){r.removeChild(s[q]);}}function g(q,r,d){q.setAttribute("action",d);q.setAttribute("method","POST");q.setAttribute("target","ioupload"+r);q.setAttribute(c.UA.ie&&!h?"encoding":"enctype","multipart/form-data");}function p(q,d){var r;for(r in d){if(d.hasOwnProperty(r)){if(d[r]){q.setAttribute(r,d[r]);}else{q.removeAttribute(r);}}}}function e(d,q){c.io._timeout[d.id]=n.setTimeout(function(){var s={id:d.id,status:"timeout"};c.io.complete(s,q);c.io.end(s,q);},q.timeout);}function m(d){n.clearTimeout(c.io._timeout[d]);delete c.io._timeout[d];}function l(d){c.Event.purgeElement("#ioupload"+d,false);c.one("body").removeChild(c.one("#ioupload"+d));}function a(t,u){var s=c.one("#ioupload"+t.id).get("contentWindow.document"),q=s.one("body"),r;if(u.timeout){m(t.id);}if(q){r=q.one("pre:first-child");t.c.responseText=r?r.get("text"):q.get("text");}else{t.c.responseXML=s._node;}c.io.complete(t,u);c.io.end(t,u);n.setTimeout(function(){l(t.id);},0);}function o(q,r){var d=c.Node.create('<iframe id="ioupload'+q.id+'" name="ioupload'+q.id+'" />');d._node.style.position="absolute";d._node.style.top="-1000px";d._node.style.left="-1000px";c.one("body").appendChild(d);c.on("load",function(){a(q,r);},"#ioupload"+q.id);}function b(t,r,u){var s=(typeof u.form.id==="string")?j.getElementById(u.form.id):u.form.id,q,d={action:s.getAttribute("action"),target:s.getAttribute("target")};g(s,t.id,r);if(u.data){q=f(s,u.data);}if(u.timeout){e(t,u);}s.submit();c.io.start(t.id,u);if(u.data){k(s,q);}p(s,d);return{id:t.id,abort:function(){var v={id:t.id,status:"abort"};if(c.one("#ioupload"+t.id)){l(t.id);c.io.complete(v,u);c.io.end(v,u);}else{return false;}},isInProgress:function(){return c.one("#ioupload"+t.id)?true:false;}};}c.mix(c.io,{upload:function(q,d,r){o(q,r);return b(q,d,r);}});},"3.4.0",{requires:["io-base","node-base"]});