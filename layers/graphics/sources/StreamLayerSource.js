// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

define(["../../../core/declare","dojo/Deferred","../../../core/Accessor","../../../core/Promise","../../../core/lang","../../../core/urlUtils","../../../core/promiseUtils","../../../geometry/Extent","../../support/WebSocketConnector","../../../tasks/QueryTask","../../../request"],function(e,r,t,n,i,s,o,a,l,u,c){return e([t,n],{declaredClass:"esri.layers.graphics.sources.StreamLayerSource",getDefaults:function(e){var r=this.inherited(arguments),t=e.layer;return t&&(r=i.mixin(r,{url:t.url})),r},initialize:function(){this.addResolvingPromise(this._fetchLayers())},properties:{connectionInfo:{get:function(){if(this.layer.hasMemorySource||this.layer.socketUrl)return{serviceSocketUrls:[this.layer.socketUrl]};if(this.layerDefinition){var e,r,t,n,i={},o=this.layerDefinition,a=[],l=[],u=[];if(o.streamUrls&&o.streamUrls.forEach(function(e){"ws"===e.transport&&(a=e.urls,i.token=e.token)},this),a.forEach(function(e){0===e.lastIndexOf("wss",0)?u.push(e):l.push(e)}),(e="https"===s.appUrl.scheme||0===this.url.lastIndexOf("https:",0)?u:0===l.length?u:l)&&e.length>1)for(r=0;r<e.length-1;r++)t=r+Math.floor(Math.random()*(e.length-r)),n=e[t],e[t]=e[r],e[r]=n;return i.serviceSocketUrls=e,i}}},latestUrl:{get:function(){var e=this.layerDefinition,r=e.keepLatestArchive&&e.keepLatestArchive.featuresUrl;return r=r||null}},latestQueryTask:{get:function(){var e=this.latestUrl;return e?new u(e):null}},layer:{},relatedFeaturesInfo:{get:function(){var e=this.layerDefinition||{},r=e.relatedFeatures;return r=r&&r.featuresUrl?r:null}},relatedFeaturesQueryTask:{get:function(){var e=this.relatedFeaturesInfo,r=e?e.featuresUrl:null;return r?new u(r):null}},parsedUrl:{get:function(){return this.url?s.urlToObject(this.url):null}},url:null},createWebSocketConnector:function(e){var t=new r;return this.when(function(){var r,n,s,o,a=this.connectionInfo,u=this.layer.spatialReference,c={};try{r=this.makeFilter()}catch(e){return void t.reject(e)}if(a){if(a.socketUrl?s=[a.socketUrl]:a.serviceSocketUrls&&(s=a.serviceSocketUrls.map(function(e){return e+"/"+this.layer.socketDirection}.bind(this))),c.socketUrls=s,r&&(r.where||r.geometry||r.outFields)){var h=r.geometry;h&&"string"!=typeof h&&(h=h.toJSON?JSON.stringify(h.toJSON()):JSON.stringify(h)),n=i.mixin(n||{},{where:r.where,geometry:h,outFields:r.outFields})}a.token&&(n=i.mixin(n||{},{token:a.token})),e&&u&&e.wkid!==u.wkid&&(n=i.mixin(n||{},{outSR:e.wkid})),c.queryParams=n,c.layerSource=this,o=new l(c),t.resolve(o)}else t.reject(new Error("No web socket urls found"))}.bind(this)),t.promise},getWebSocketToken:function(){return this._fetchStreamLayer().then(function(e){var r=e.data,t=null;return r.streamUrls&&r.streamUrls.some(function(e){if("ws"===e.transport)return t=e.token,!0},this),t}.bind(this))},makeFilter:function(e){var r,t=this.layer,n=null;if(e){var s;if(r={},e.hasOwnProperty("where")&&(r.where=e.where),e.hasOwnProperty("geometry")){if((s=e.geometry)&&!s.hasOwnProperty("xmin"))throw new Error("Cannot make filter. Only Extent is supported for the geometry filter");s&&!s.declaredClass&&(s=new a(s)),r.geometry=s}}else{var o=t.filter||{};r={where:o.where,geometry:o.geometry};var l=this.relatedFeaturesInfo&&this.relatedFeaturesInfo.outFields||t.outFields;if(l&&-1===l.indexOf("*")){var u=t.fields.map(function(e){return e.name});n=l.filter(function(e){return-1!==u.indexOf(e)}).join(","),r=i.mixin(r||{},{outFields:n})}}return r},queryFeatures:function(e,r){return o.reject()},_fetchLayers:function(){return this._fetchStreamLayer().then(function(e){return e.ssl&&(this.url=this.url.replace(/^http:/i,"https:")),this.layerDefinition=e.data,this._fetchArchiveLayer()}.bind(this)).then(function(e){return this.archivedLayerDefinition=e&&e.data,this._fetchRelatedLayer()}.bind(this)).then(function(e){this.relatedLayerDefinition=e&&e.data}.bind(this))},_fetchStreamLayer:function(){return this._requestServiceDefinition({url:this.layer.parsedUrl.path,content:i.mixin({f:"json"},this.layer.parsedUrl.query)})},_fetchArchiveLayer:function(){var e=this.latestUrl;return e?this._requestServiceDefinition({url:e}):o.resolve()},_fetchRelatedLayer:function(){var e=this.relatedFeaturesInfo;return e?this._requestServiceDefinition({url:e.featuresUrl}):o.resolve()},_requestServiceDefinition:function(e){return e&&e.url?c(e.url,{query:i.mixin(e.content||{},{f:"json"}),responseType:"json"}):o.reject(new Error("url is a required options property"))}})});