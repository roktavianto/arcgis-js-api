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

define(["require","exports","../../../../core/libs/gl-matrix-2/gl-matrix","../../../../geometry/Point","../graphics/ElevationContext","../graphics/featureExpressionInfoUtils","../graphics/Graphics3DSymbolCommonCode","./I3SUtil","../../support/geometryUtils","../../support/orientedBoundingBox","../../support/projectionUtils"],function(e,t,i,s,r,o,n,a,c,h,p){return function(){function e(e,t,n,a,h,p,l,u){void 0===u&&(u={}),this.indexSR=e,this._renderCoordsHelper=t,this.extent=h,this.elevationProvider=p,this.options=u,this._computedOBBs={},this._computedMBSs={},this._isNodeVisibleCached={},this.fp=c.frustum.create(),this._idleCamera=!0,this.maxDistance=0,this.maxLodLevel=2,this._tmp1=i.vec3f64.create(),this._tmp2=i.vec3f64.create(),this._tmp3=i.vec3f64.create(),this._tmp0=i.vec3f64.create(),this.supportedMetrics=["maxScreenThreshold","screenSpaceRelative","removedFeatureDiameter","distanceRangeFromDefaultCamera"],this.screenspaceErrorBias=u.screenspaceErrorBias||1,this.progressiveLoadFactor=u.progressiveLoadFactor||1,this.enableLoD=!u.disableLod,this.updateCamera(n),this._poi=i.vec3f64.clone(a),this.engineSR=this._renderCoordsHelper.spatialReference,l?(this._elevationContext=new r,this._elevationContext.featureExpressionInfoContext=o.createContext(o.extractExpressionInfo(l,!1)),this._elevationContext.mixinApi(l)):this._elevationContext=null,this.tmpPoint=new s({x:0,y:0,z:0,spatialReference:e})}return e.prototype.updateCamera=function(e){c.frustum.fromMatrix(e.viewMatrix,e.projectionMatrix,this.fp),this._screenSizeFactor=1/e.perPixelRatio,this._camPos=e.eye,this._isNodeVisibleCached={},this.maxDistance=0},e.prototype.updateNode=function(e){delete this._isNodeVisibleCached[e]},e.prototype.updatePointOfInterest=function(e){i.vec3.copy(this._poi,e)},e.prototype.updateScreenSpaceErrorBias=function(e){var t=this.screenspaceErrorBias;return this.screenspaceErrorBias=e,t},e.prototype.setCameraIdle=function(e){this._idleCamera!==e&&(this._idleCamera=e,this._isNodeVisibleCached={})},e.prototype.updateExtent=function(e){this.extent=e,this._isNodeVisibleCached={}},e.prototype.computeMbs=function(e){var t=this._computedMBSs[e.id];return t||(t=i.vec4f64.fromValues(e.mbs[0],e.mbs[1],e.mbs[2],-1),this._computedMBSs[e.id]=t),t[3]<0&&(i.vec4.copy(t,e.mbs),this._elevationContext&&t[3]<1e5&&(this.tmpPoint.x=t[0],this.tmpPoint.y=t[1],this.tmpPoint.z=t[2],t[2]=n.computeElevation(this.elevationProvider,this.tmpPoint,this._elevationContext,this._renderCoordsHelper,null)),p.mbsToMbs(t,this.indexSR,t,this.engineSR)),t},e.prototype.computeObb=function(e){if(e.obb&&!(e.obb.halfSize[0]<0)){var t=this._computedOBBs[e.id];return t||(t=h.clone(e.obb),t.halfSize[0]=-1,this._computedOBBs[e.id]=t),t.halfSize[0]<0&&(t.halfSize[0]=e.obb.halfSize[0],i.vec3.copy(t.center,e.obb.center),this._elevationContext&&e.mbs[3]<1e5&&(this.tmpPoint.x=e.obb.center[0],this.tmpPoint.y=e.obb.center[1],this.tmpPoint.z=e.obb.center[2],t.center[2]=n.computeElevation(this.elevationProvider,this.tmpPoint,this._elevationContext,this._renderCoordsHelper,null)),p.bufferToBuffer(t.center,this.indexSR,0,t.center,this.engineSR,0,1)),t}},e.prototype._isNodeVisible=function(e){var t=this.computeMbs(e);if(!this.isMBSinExtent(t))return!1;if(e.hasServiceOBB&&e.obb){var i=this.computeObb(e);return h.isVisible(i,this.fp)}return this.isMBSVisible(t)},e.prototype.isNodeVisible=function(e){return!this.enableLoD||(this._idleCamera?null!=this._isNodeVisibleCached[e.id]?this._isNodeVisibleCached[e.id]:(this._isNodeVisibleCached[e.id]=this._isNodeVisible(e),this._isNodeVisibleCached[e.id]):this._isNodeVisible(e))},e.prototype.isGeometryVisible=function(e){if(!this.isNodeVisible(e))return!1;if(e.hasServiceOBB)return!0;var t=this.computeObb(e);return!t||h.isVisible(t,this.fp)},e.prototype.invalidateCache=function(e){if(null==e){for(var t=0,i=Object.keys(this._computedMBSs);t<i.length;t++){var s=i[t];this._computedMBSs[s][3]=-1}for(var r=0,o=Object.keys(this._computedOBBs);r<o.length;r++){var s=o[r];this._computedOBBs[s].halfSize[0]=-1}}else this._computedMBSs[e]&&(this._computedMBSs[e][3]=-1),this._computedOBBs[e]&&(this._computedOBBs[e].halfSize[0]=-1)},e.prototype.isMBSinExtent=function(e){return!this.extent||0!==a.intersectBoundingBoxWithMbs(this.extent,e)},e.prototype.isMBSVisible=function(e){return c.frustum.intersectsSphere(this.fp,c.sphere.wrap(e[3],e))},e.prototype.calcScreenSpaceSize=function(e,t){var s=this.computeMbs(e),r=i.vec3.squaredDistance(s,this._camPos),o=s[3];this.maxDistance=Math.max(this.maxDistance,Math.sqrt(r)-o);var n=r-o*o;return n<0?.5*Number.MAX_VALUE:t/Math.sqrt(n)*this._screenSizeFactor},e.prototype.calcCameraDistance=function(e){var t=this.computeMbs(e),s=i.vec3.distance(t,this._camPos)-t[3];return this.maxDistance=Math.max(this.maxDistance,s),s},e.prototype.calcAngleDependentLoD=function(e){var t=this.computeMbs(e),s=t[3],r=Math.abs(t[0]*(t[0]-this._camPos[0])+t[1]*(t[1]-this._camPos[1])+t[2]*(t[2]-this._camPos[2]))/i.vec3.length(t),o=(r+s)/i.vec3.distance(t,this._camPos);return Math.min(1,o)},e.prototype.hasLOD=function(e){return null!=e.lodSelection},e.prototype.hasFeatures=function(e){return null!=e.featureData},e.prototype.getDistancePlanarMode=function(e,t,i){var s=e[0]-t[0],r=e[1]-t[1],o=e[2]-t[2],n=s*s+r*r;if(n<=i*i)return Math.abs(o);var a=Math.sqrt(n)-i;return Math.sqrt(o*o+a*a)},e.prototype.getDistanceGlobeMode=function(e,t,s){var r=i.vec3.length(t),o=i.vec3.length(e)-r;if(i.vec3.scale(this._tmp0,e,i.vec3.dot(e,t)/i.vec3.squaredLength(e)),i.vec3.squaredDistance(t,this._tmp0)<=s*s)return Math.abs(o);var n=i.vec3.scale(this._tmp0,t,1/r),a=s,c=r,h=a*a/2/c,p=i.vec3.scale(this._tmp1,n,c-h),l=e,u=i.vec3.subtract(this._tmp2,l,p),d=i.vec3.subtract(this._tmp2,u,i.vec3.scale(this._tmp3,n,i.vec3.dot(n,u))),m=i.vec3.add(this._tmp2,p,i.vec3.scale(this._tmp2,d,a/i.vec3.length(d))),v=i.vec3.distance(l,m);if(o>=2e5){var f=i.vec3.subtract(this._tmp1,l,m),b=i.vec3.dot(f,n)/i.vec3.length(f);b<.08&&(b=1e-4),v/=b}return v},e.prototype.getDistance=function(e,t,i){return this.engineSR===p.SphericalECEFSpatialReference?this.getDistanceGlobeMode(e,t,i):this.getDistancePlanarMode(e,t,i)},e.prototype._selectErrorMetric=function(e){for(var t=0;t<e.length;t++)if(this.supportedMetrics.indexOf(e[t].metricType)>=0)return e[t];return null},e.prototype.getLodLevel=function(e){if(!e.lodSelection||e.lodSelection.length<=0||!1===this.hasFeatures(e))return 0;if(null==e.children||0===e.children.length)return this.maxLodLevel;var t=this.enableLoD?this._selectErrorMetric(e.lodSelection):null;if(null==t)return 0;if(this.progressiveLoadFactor<1){var i=this.progressiveLoadFactor*this.screenspaceErrorBias,s=this.screenspaceErrorBias;return this.evaluateLODmetric(e,i,t)?this.evaluateLODmetric(e,s,t)?2:1:0}return this.evaluateLODmetric(e,this.screenspaceErrorBias,t)?this.maxLodLevel:0},e.prototype.evaluateLODmetric=function(e,t,i){switch(i.metricType){case"screenSpaceRelative":var s=this.computeMbs(e),r=this.getDistance(this._camPos,s,s[3]);this.maxDistance=Math.max(this.maxDistance,r);var o=2*r/this._screenSizeFactor;return i.maxError*t<=o;case"maxScreenThreshold":var n=this.calcScreenSpaceSize(e,e.mbs[3]*t);return this.options.angleDependentLoD&&(n*=this.calcAngleDependentLoD(e)),n<i.maxError;case"removedFeatureDiameter":return this.calcScreenSpaceSize(e,i.maxError)*t<10;case"distanceRangeFromDefaultCamera":return this.calcCameraDistance(e)>i.maxError*t}return!1},e.prototype.distToPOI=function(e){var t=this.computeMbs(e);return i.vec3.distance(t,this._poi)-t[3]},e.prototype.distCameraToPOI=function(){return i.vec3.distance(this._camPos,this._poi)},e}()});