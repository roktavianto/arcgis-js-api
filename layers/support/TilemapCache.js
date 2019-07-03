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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../request","../../core/Accessor","../../core/Error","../../core/Handles","../../core/Logger","../../core/LRUCache","../../core/PooledArray","../../core/promiseUtils","../../core/urlUtils","../../core/watchUtils","../../core/accessorSupport/decorators","./Tilemap"],function(e,t,i,r,l,a,n,o,s,p,c,u,h,v,f,y,m){var b=p.getLogger("esri.layers.support.TilemapCache");return function(e){function t(t){var i=e.call(this)||this;return i._handles=new s,i._pendingTilemapRequests={},i._availableLevels={},i.levels=5,i.cacheByteSize=2097152,i.request=a,i}r(t,e),n=t,t.prototype.initialize=function(){var e=this;this._tilemapCache=new c(this.cacheByteSize),this._handles.add([this.watch(["layer.parsedUrl","layer.tileServers?"],function(){return e._initializeTilemapDefinition()}),f.init(this,"layer.tileInfo.lods",function(t){return e._initializeAvailableLevels(t)},!0)]),this._initializeTilemapDefinition()},t.prototype.destroy=function(){this._handles&&(this._handles.destroy(),this._handles=null)},t.prototype.castLevels=function(e){return e<=2?(b.error("Minimum levels for Tilemap is 3, but got ",e),3):e},Object.defineProperty(t.prototype,"size",{get:function(){return 1<<this.levels},enumerable:!0,configurable:!0}),t.prototype.getTilemap=function(e,t,i){return this._tilemapFromCache(e,t,i,this._tmpTilemapDefinition)},t.prototype.fetchTilemap=function(e,t,r,l){var a=this;if(!this._availableLevels[e])return h.reject(new o("tilemap-cache:level-unavailable","Level "+e+" is unavailable in the service"));var n=this._tmpTilemapDefinition,s=this._tilemapFromCache(e,t,r,n);if(s)return h.resolve(s);var p=l&&l.signal;return l=i({},l,{signal:null}),h.create(function(e,t){h.onAbort(p,function(){return t(h.createAbortError())});var i=m.tilemapDefinitionId(n),r=a._pendingTilemapRequests[i];if(!r){r=m.Tilemap.fromDefinition(n,l).then(function(e){return a._tilemapCache.put(i,e,e.byteSize),e});var o=function(){return delete a._pendingTilemapRequests[i]};a._pendingTilemapRequests[i]=r,r.then(o,o)}r.then(e,t)})},t.prototype.getAvailability=function(e,t,i){if(!this._availableLevels[e])return"unavailable";var r=this.getTilemap(e,t,i);return r?r.getAvailability(t,i):"unknown"},t.prototype.getAvailabilityUpsample=function(e,t,i,r){r.level=e,r.row=t,r.col=i;var l=this.layer.tileInfo;for(l.updateTileInfo(r);;){var a=this.getAvailability(r.level,r.row,r.col);if("unavailable"!==a)return a;if(!l.upsampleTile(r))return"unavailable"}},t.prototype.fetchAvailability=function(e,t,i,r){return this._availableLevels[e]?this.fetchTilemap(e,t,i,r).catch(function(e){return e}).then(function(r){if(r instanceof m.Tilemap){var l=r.getAvailability(t,i);return"unavailable"===l?h.reject(new o("tile-map:tile-unavailable","Tile is not available",{level:e,row:t,col:i})):l}return h.isAbortError(r)?h.reject(r):"unknown"}):h.reject(new o("tilemap-cache:level-unavailable","Level "+e+" is unavailable in the service"))},t.prototype.fetchAvailabilityUpsample=function(e,t,r,l,a){var o=this;l.level=e,l.row=t,l.col=r;var s=this.layer.tileInfo;s.updateTileInfo(l);var p=!1,c=this.fetchAvailability(e,t,r,a).catch(function(e){if(h.isAbortError(e))throw e;if(s.upsampleTile(l))return o.fetchAvailabilityUpsample(l.level,l.row,l.col,l);throw e}).then(function(e){return p=!0,e},function(e){throw p=!0,e});if(p)return c;for(var u={id:l.id,level:e,row:t,col:r},v=h.createAbortController(),f=i({},a,{signal:v.signal}),y=this,m=0;n._prefetches.length<n._maxPrefetch&&s.upsampleTile(u);++m)!function(e){var t=y.fetchAvailability(u.level,u.row,u.col,f);n._prefetches.push(t);var i=function(){n._prefetches.removeUnordered(t)};t.then(i,i)}();return c.then(function(){return v.abort()},function(){return v.abort()}),c},t.prototype._initializeTilemapDefinition=function(){if(this.layer.parsedUrl){var e=this.layer.parsedUrl,t=e.query;this._tilemapCache.clear(),this._tmpTilemapDefinition={service:{url:e.path,query:t?v.objectToQuery(t):null,tileServers:this.layer.tileServers,request:this.request,type:this.layer.type},width:this.size,height:this.size,level:0,row:0,col:0}}},t.prototype._tilemapFromCache=function(e,t,i,r){var l=this._getTilemapDefinition(e,t,i,r),a=m.tilemapDefinitionId(l);return this._tilemapCache.get(a)},t.prototype._getTilemapDefinition=function(e,t,i,r){return r.level=e,r.row=t-t%this.size,r.col=i-i%this.size,r},t.prototype._initializeAvailableLevels=function(e){var t=this;this._availableLevels={},e&&e.forEach(function(e){return t._availableLevels[e.level]=!0})};var n;return t._maxPrefetch=4,t._prefetches=new u({initialSize:n._maxPrefetch}),l([y.property({constructOnly:!0,type:Number})],t.prototype,"levels",void 0),l([y.cast("levels")],t.prototype,"castLevels",null),l([y.property({readOnly:!0,dependsOn:["levels"],type:Number})],t.prototype,"size",null),l([y.property({constructOnly:!0,type:Number})],t.prototype,"cacheByteSize",void 0),l([y.property({constructOnly:!0})],t.prototype,"layer",void 0),l([y.property({constructOnly:!0})],t.prototype,"request",void 0),t=n=l([y.subclass("esri.layers.support.TilemapCache")],t)}(y.declared(n))});