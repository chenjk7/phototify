(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{175:function(e,t){e.exports=function(e,t,r,n){var o=r?r.call(n,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(var u=Object.prototype.hasOwnProperty.bind(t),c=0;c<a.length;c++){var l=a[c];if(!u(l))return!1;var f=e[l],T=t[l];if(!1===(o=r?r.call(n,f,T,l):void 0)||void 0===o&&f!==T)return!1}return!0}},273:function(e,t){t.__esModule=!0;t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"};var r=t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},n=(t.VALID_TAG_NAMES=Object.keys(r).map((function(e){return r[e]})),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(n).reduce((function(e,t){return e[n[t]]=t,e}),{}),t.SELF_CLOSING_TAGS=[r.NOSCRIPT,r.SCRIPT,r.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},475:function(e,t,r){t.__esModule=!0,t.Helmet=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=T(r(0)),i=T(r(1)),u=T(r(476)),c=T(r(477)),l=r(478),f=r(273);function T(e){return e&&e.__esModule?e:{default:e}}function s(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}var p,d,E,m=(0,u.default)(l.reducePropsToState,l.handleClientStateChange,l.mapStateOnServer)((function(){return null})),A=(p=m,E=d=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!(0,c.default)(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case f.TAG_NAMES.SCRIPT:case f.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case f.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,o=e.arrayTypeChildren,a=e.newChildProps,i=e.nestedChildren;return n({},o,((t={})[r.type]=[].concat(o[r.type]||[],[n({},a,this.mapNestedChildrenToProps(r,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,o=e.child,a=e.newProps,i=e.newChildProps,u=e.nestedChildren;switch(o.type){case f.TAG_NAMES.TITLE:return n({},a,((t={})[o.type]=u,t.titleAttributes=n({},i),t));case f.TAG_NAMES.BODY:return n({},a,{bodyAttributes:n({},i)});case f.TAG_NAMES.HTML:return n({},a,{htmlAttributes:n({},i)})}return n({},a,((r={})[o.type]=n({},i),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=n({},t);return Object.keys(e).forEach((function(t){var o;r=n({},r,((o={})[t]=e[t],o))})),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return a.default.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,a=o.children,i=s(o,["children"]),u=(0,l.convertReactPropstoHtmlAttributes)(i);switch(r.warnOnInvalidChildren(e,a),e.type){case f.TAG_NAMES.LINK:case f.TAG_NAMES.META:case f.TAG_NAMES.NOSCRIPT:case f.TAG_NAMES.SCRIPT:case f.TAG_NAMES.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:u,nestedChildren:a});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:u,nestedChildren:a})}}})),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=s(e,["children"]),o=n({},r);return t&&(o=this.mapChildrenToProps(t,o)),a.default.createElement(p,o)},o(t,null,[{key:"canUseDOM",set:function(e){p.canUseDOM=e}}]),t}(a.default.Component),d.propTypes={base:i.default.object,bodyAttributes:i.default.object,children:i.default.oneOfType([i.default.arrayOf(i.default.node),i.default.node]),defaultTitle:i.default.string,defer:i.default.bool,encodeSpecialCharacters:i.default.bool,htmlAttributes:i.default.object,link:i.default.arrayOf(i.default.object),meta:i.default.arrayOf(i.default.object),noscript:i.default.arrayOf(i.default.object),onChangeClientState:i.default.func,script:i.default.arrayOf(i.default.object),style:i.default.arrayOf(i.default.object),title:i.default.string,titleAttributes:i.default.object,titleTemplate:i.default.string},d.defaultProps={defer:!0,encodeSpecialCharacters:!0},d.peek=p.peek,d.rewind=function(){var e=p.rewind();return e||(e=(0,l.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},E);A.renderStatic=A.rewind,t.Helmet=A,t.default=A},476:function(e,t,r){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var o=r(0),a=n(o),i=n(r(175));function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var l,f=[];function T(){l=e(f.map((function(e){return e.props}))),s.canUseDOM?t(l):r&&(l=r(l))}var s=function(e){var t,r;function o(){return e.apply(this,arguments)||this}r=e,(t=o).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,o.peek=function(){return l},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=l;return l=void 0,f=[],e};var u=o.prototype;return u.shouldComponentUpdate=function(e){return!i(e,this.props)},u.componentWillMount=function(){f.push(this),T()},u.componentDidUpdate=function(){T()},u.componentWillUnmount=function(){var e=f.indexOf(this);f.splice(e,1),T()},u.render=function(){return a.createElement(n,this.props)},o}(o.Component);return u(s,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(n)+")"),u(s,"canUseDOM",c),s}}},477:function(e,t,r){"use strict";var n=Array.isArray,o=Object.keys,a=Object.prototype.hasOwnProperty,i="undefined"!=typeof Element;e.exports=function(e,t){try{return function e(t,r){if(t===r)return!0;if(t&&r&&"object"==typeof t&&"object"==typeof r){var u,c,l,f=n(t),T=n(r);if(f&&T){if((c=t.length)!=r.length)return!1;for(u=c;0!=u--;)if(!e(t[u],r[u]))return!1;return!0}if(f!=T)return!1;var s=t instanceof Date,p=r instanceof Date;if(s!=p)return!1;if(s&&p)return t.getTime()==r.getTime();var d=t instanceof RegExp,E=r instanceof RegExp;if(d!=E)return!1;if(d&&E)return t.toString()==r.toString();var m=o(t);if((c=m.length)!==o(r).length)return!1;for(u=c;0!=u--;)if(!a.call(r,m[u]))return!1;if(i&&t instanceof Element&&r instanceof Element)return t===r;for(u=c;0!=u--;)if(!("_owner"===(l=m[u])&&t.$$typeof||e(t[l],r[l])))return!1;return!0}return t!=t&&r!=r}(e,t)}catch(e){if(e.message&&e.message.match(/stack|recursion/i)||-2146828260===e.number)return console.warn("Warning: react-fast-compare does not handle circular references.",e.name,e.message),!1;throw e}}},478:function(e,t,r){(function(e){t.__esModule=!0,t.warn=t.requestAnimationFrame=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=c(r(0)),i=c(r(163)),u=r(273);function c(e){return e&&e.__esModule?e:{default:e}}var l,f=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},T=function(e){var t=m(e,u.TAG_NAMES.TITLE),r=m(e,u.HELMET_PROPS.TITLE_TEMPLATE);if(r&&t)return r.replace(/%s/g,(function(){return t}));var n=m(e,u.HELMET_PROPS.DEFAULT_TITLE);return t||n||void 0},s=function(e){return m(e,u.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},p=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return o({},e,t)}),{})},d=function(e,t){return t.filter((function(e){return void 0!==e[u.TAG_NAMES.BASE]})).map((function(e){return e[u.TAG_NAMES.BASE]})).reverse().reduce((function(t,r){if(!t.length)for(var n=Object.keys(r),o=0;o<n.length;o++){var a=n[o].toLowerCase();if(-1!==e.indexOf(a)&&r[a])return t.concat(r)}return t}),[])},E=function(e,t,r){var o={};return r.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&_("Helmet: "+e+' should be of type "Array". Instead found type "'+n(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,r){var n={};r.filter((function(e){for(var r=void 0,a=Object.keys(e),i=0;i<a.length;i++){var c=a[i],l=c.toLowerCase();-1===t.indexOf(l)||r===u.TAG_PROPERTIES.REL&&"canonical"===e[r].toLowerCase()||l===u.TAG_PROPERTIES.REL&&"stylesheet"===e[l].toLowerCase()||(r=l),-1===t.indexOf(c)||c!==u.TAG_PROPERTIES.INNER_HTML&&c!==u.TAG_PROPERTIES.CSS_TEXT&&c!==u.TAG_PROPERTIES.ITEM_PROP||(r=c)}if(!r||!e[r])return!1;var f=e[r].toLowerCase();return o[r]||(o[r]={}),n[r]||(n[r]={}),!o[r][f]&&(n[r][f]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var a=Object.keys(n),c=0;c<a.length;c++){var l=a[c],f=(0,i.default)({},o[l],n[l]);o[l]=f}return e}),[]).reverse()},m=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},A=(l=Date.now(),function(e){var t=Date.now();t-l>16?(l=t,e(t)):setTimeout((function(){A(e)}),0)}),y=function(e){return clearTimeout(e)},h="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||A:e.requestAnimationFrame||A,S="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||y:e.cancelAnimationFrame||y,_=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},g=null,b=function(e,t){var r=e.baseTag,n=e.bodyAttributes,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,l=e.onChangeClientState,f=e.scriptTags,T=e.styleTags,s=e.title,p=e.titleAttributes;P(u.TAG_NAMES.BODY,n),P(u.TAG_NAMES.HTML,o),R(s,p);var d={baseTag:O(u.TAG_NAMES.BASE,r),linkTags:O(u.TAG_NAMES.LINK,a),metaTags:O(u.TAG_NAMES.META,i),noscriptTags:O(u.TAG_NAMES.NOSCRIPT,c),scriptTags:O(u.TAG_NAMES.SCRIPT,f),styleTags:O(u.TAG_NAMES.STYLE,T)},E={},m={};Object.keys(d).forEach((function(e){var t=d[e],r=t.newTags,n=t.oldTags;r.length&&(E[e]=r),n.length&&(m[e]=d[e].oldTags)})),t&&t(),l(e,E,m)},v=function(e){return Array.isArray(e)?e.join(""):e},R=function(e,t){void 0!==e&&document.title!==e&&(document.title=v(e)),P(u.TAG_NAMES.TITLE,t)},P=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute(u.HELMET_ATTRIBUTE),o=n?n.split(","):[],a=[].concat(o),i=Object.keys(t),c=0;c<i.length;c++){var l=i[c],f=t[l]||"";r.getAttribute(l)!==f&&r.setAttribute(l,f),-1===o.indexOf(l)&&o.push(l);var T=a.indexOf(l);-1!==T&&a.splice(T,1)}for(var s=a.length-1;s>=0;s--)r.removeAttribute(a[s]);o.length===a.length?r.removeAttribute(u.HELMET_ATTRIBUTE):r.getAttribute(u.HELMET_ATTRIBUTE)!==i.join(",")&&r.setAttribute(u.HELMET_ATTRIBUTE,i.join(","))}},O=function(e,t){var r=document.head||document.querySelector(u.TAG_NAMES.HEAD),n=r.querySelectorAll(e+"["+u.HELMET_ATTRIBUTE+"]"),o=Array.prototype.slice.call(n),a=[],i=void 0;return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n))if(n===u.TAG_PROPERTIES.INNER_HTML)r.innerHTML=t.innerHTML;else if(n===u.TAG_PROPERTIES.CSS_TEXT)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[n]?"":t[n];r.setAttribute(n,c)}r.setAttribute(u.HELMET_ATTRIBUTE,"true"),o.some((function(e,t){return i=t,r.isEqualNode(e)}))?o.splice(i,1):a.push(r)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return r.appendChild(e)})),{oldTags:o,newTags:a}},w=function(e){return Object.keys(e).reduce((function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n}),"")},M=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[u.REACT_TAG_MAP[r]||r]=e[r],t}),t)},C=function(e,t,r){switch(e){case u.TAG_NAMES.TITLE:return{toComponent:function(){return e=t.title,r=t.titleAttributes,(n={key:e})[u.HELMET_ATTRIBUTE]=!0,o=M(r,n),[a.default.createElement(u.TAG_NAMES.TITLE,o,e)];var e,r,n,o},toString:function(){return function(e,t,r,n){var o=w(r),a=v(t);return o?"<"+e+" "+u.HELMET_ATTRIBUTE+'="true" '+o+">"+f(a,n)+"</"+e+">":"<"+e+" "+u.HELMET_ATTRIBUTE+'="true">'+f(a,n)+"</"+e+">"}(e,t.title,t.titleAttributes,r)}};case u.ATTRIBUTE_NAMES.BODY:case u.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return M(t)},toString:function(){return w(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,r){var n,o=((n={key:r})[u.HELMET_ATTRIBUTE]=!0,n);return Object.keys(t).forEach((function(e){var r=u.REACT_TAG_MAP[e]||e;if(r===u.TAG_PROPERTIES.INNER_HTML||r===u.TAG_PROPERTIES.CSS_TEXT){var n=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:n}}else o[r]=t[e]})),a.default.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,r){return t.reduce((function(t,n){var o=Object.keys(n).filter((function(e){return!(e===u.TAG_PROPERTIES.INNER_HTML||e===u.TAG_PROPERTIES.CSS_TEXT)})).reduce((function(e,t){var o=void 0===n[t]?t:t+'="'+f(n[t],r)+'"';return e?e+" "+o:o}),""),a=n.innerHTML||n.cssText||"",i=-1===u.SELF_CLOSING_TAGS.indexOf(e);return t+"<"+e+" "+u.HELMET_ATTRIBUTE+'="true" '+o+(i?"/>":">"+a+"</"+e+">")}),"")}(e,t,r)}}}};t.convertReactPropstoHtmlAttributes=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[u.HTML_TAG_MAP[r]||r]=e[r],t}),t)},t.handleClientStateChange=function(e){g&&S(g),e.defer?g=h((function(){b(e,(function(){g=null}))})):(b(e),g=null)},t.mapStateOnServer=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,l=e.scriptTags,f=e.styleTags,T=e.title,s=void 0===T?"":T,p=e.titleAttributes;return{base:C(u.TAG_NAMES.BASE,t,n),bodyAttributes:C(u.ATTRIBUTE_NAMES.BODY,r,n),htmlAttributes:C(u.ATTRIBUTE_NAMES.HTML,o,n),link:C(u.TAG_NAMES.LINK,a,n),meta:C(u.TAG_NAMES.META,i,n),noscript:C(u.TAG_NAMES.NOSCRIPT,c,n),script:C(u.TAG_NAMES.SCRIPT,l,n),style:C(u.TAG_NAMES.STYLE,f,n),title:C(u.TAG_NAMES.TITLE,{title:s,titleAttributes:p},n)}},t.reducePropsToState=function(e){return{baseTag:d([u.TAG_PROPERTIES.HREF],e),bodyAttributes:p(u.ATTRIBUTE_NAMES.BODY,e),defer:m(e,u.HELMET_PROPS.DEFER),encode:m(e,u.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:p(u.ATTRIBUTE_NAMES.HTML,e),linkTags:E(u.TAG_NAMES.LINK,[u.TAG_PROPERTIES.REL,u.TAG_PROPERTIES.HREF],e),metaTags:E(u.TAG_NAMES.META,[u.TAG_PROPERTIES.NAME,u.TAG_PROPERTIES.CHARSET,u.TAG_PROPERTIES.HTTPEQUIV,u.TAG_PROPERTIES.PROPERTY,u.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:E(u.TAG_NAMES.NOSCRIPT,[u.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:s(e),scriptTags:E(u.TAG_NAMES.SCRIPT,[u.TAG_PROPERTIES.SRC,u.TAG_PROPERTIES.INNER_HTML],e),styleTags:E(u.TAG_NAMES.STYLE,[u.TAG_PROPERTIES.CSS_TEXT],e),title:T(e),titleAttributes:p(u.ATTRIBUTE_NAMES.TITLE,e)}},t.requestAnimationFrame=h,t.warn=_}).call(this,r(75))},61:function(e,t,r){"use strict";var n=r(9),o=r(13);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(r(0)),i=n(r(1)),u=r(475),c=function(e){var t=e.title,r=e.description,n=e.keywords,o=e.imageTitle,i=e.imageURL,c=e.imageWidth,l=e.imageHeight;return a.default.createElement(a.Fragment,null,a.default.createElement(u.Helmet,null,a.default.createElement("title",null,t),a.default.createElement("meta",{name:"description",content:r}),n&&a.default.createElement("meta",{name:"keywords",content:n.join(", ")}),a.default.createElement("meta",{name:"application-name",content:"500px"}),a.default.createElement("meta",{name:"theme-color",content:"#222"}),a.default.createElement("meta",{property:"og:url",content:window.location.href}),a.default.createElement("meta",{property:"og:title",content:o||t}),a.default.createElement("meta",{property:"og:description",content:r||"500px is Photography"}),i&&a.default.createElement("meta",{property:"og:image",content:i}),c&&a.default.createElement("meta",{property:"og:image:width",content:c}),l&&a.default.createElement("meta",{property:"og:image:height",content:l}),a.default.createElement("meta",{property:"al:ios:app_name",content:"500px"}),a.default.createElement("meta",{property:"al:android:app_name",content:"500px"}),a.default.createElement("meta",{property:"al:ios:url",content:window.location.href}),a.default.createElement("meta",{property:"al:android:url",content:window.location.href}),a.default.createElement("meta",{property:"al:ios:app_store_id",content:"471965292"}),a.default.createElement("meta",{property:"al:android:package",content:"com.fivehundredpx.viewer"}),a.default.createElement("meta",{property:"twitter:app:name:iphone",content:"500px"}),a.default.createElement("meta",{property:"twitter:app:name:ipad",content:"500px"}),a.default.createElement("meta",{property:"twitter:app:name:googleplay",content:"500px"}),a.default.createElement("meta",{property:"twitter:app:url:googleplay",content:window.location.href}),a.default.createElement("meta",{property:"twitter:app:id:iphone",content:"471965292"}),a.default.createElement("meta",{property:"twitter:app:id:ipad",content:"471965292"}),a.default.createElement("meta",{property:"twitter:app:id:googleplay",content:"com.fivehundredpx.viewer"}),a.default.createElement("meta",{property:"twitter:card",content:"photo"}),a.default.createElement("meta",{property:"twitter:site",content:"500px"}),a.default.createElement("meta",{property:"twitter:title",content:o||t}),i&&a.default.createElement("meta",{property:"twitter:image:src",content:i}),c&&a.default.createElement("meta",{property:"twitter:image:width",content:c}),l&&a.default.createElement("meta",{property:"twitter:image:height",content:l}),a.default.createElement("meta",{property:"twitter:domain",content:"500px.com"})))};c.defaultProps={imageTitle:void 0,imageURL:void 0,imageWidth:void 0,imageHeight:void 0},c.propTypes={title:i.default.string.isRequired,description:i.default.string.isRequired,keywords:i.default.arrayOf(i.default.string.isRequired).isRequired,imageTitle:i.default.string,imageURL:i.default.string,imageWidth:i.default.string,imageHeight:i.default.string};var l=c;t.default=l}}]);