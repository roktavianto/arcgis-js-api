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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../Camera","../../../config","../../../core/Logger","../../../core/promiseUtils","../../../core/libs/gl-matrix-2/gl-matrix","../../../geometry/Point","../../../geometry/SpatialReference","../../../geometry/support/scaleUtils","../../../geometry/support/webMercatorUtils","../camera/intersectionUtils","./cameraUtilsPlanar","./cameraUtilsSpherical","./earthUtils","./mathUtils","./projectionUtils","../webgl-engine/lib/Camera"],function(e,t,r,n,a,i,o,c,l,s,u,f,v,d,m,p,g,h,T){function y(e){return e.spatialReference||s.WGS84}function M(e){return"global"===e.viewingMode?m:d}function x(e,t,r,n,a){return M(e).headingTiltToDirectionUp(t,r,n,a)}function S(e,t){var r=e.renderSpatialReference,n=M(e).headingTiltToDirectionUp,a=c.vec3f64.create();if(!h.pointToVector(t.position,a,r))return null;var i=n(a,t.heading,t.tilt);c.vec3.scale(i.direction,i.direction,e.state.camera.distance),c.vec3.add(i.direction,i.direction,a);var o=v.cameraOnContentAlongViewDirection(e,a,i.direction,i.up);return o.fov=g.deg2rad(t.fov),o}function C(e,t,r){var a=e.renderSpatialReference,i=c.vec3.copy(ne,t.viewForward),o=P(e,t.eye,i,t.up,ae),u=y(e);return h.vectorToVector(t.eye,a,te,u)||(u=s.WGS84,h.vectorToVector(t.eye,a,te,u)),r?(r.position.x=te[0],r.position.y=te[1],r.position.z=te[2],r.position.spatialReference=u,r.heading=o.heading,r.tilt=o.tilt,r.fov=g.rad2deg(t.fov),r):new n(new l(te,u),o.heading,o.tilt,g.rad2deg(t.fov))}function w(e,t,r){var n=e.state.camera,i=n.fovX,o=n.width/2;return"global"===e.viewingMode&&null!=r&&(t*=Math.cos(g.deg2rad(r))),t/=e.renderCoordsHelper.unitInMeters,o/(a.screenDPI*B/t)/Math.tan(i/2)}function R(e,t,r){var n=e.state.camera,i=n.fovX,o=t*Math.tan(i/2),c=n.width/2,l=c/o,s=a.screenDPI*B,u=s/l;return"global"===e.viewingMode&&(u/=Math.cos(g.deg2rad(r))),u*=e.renderCoordsHelper.unitInMeters}function b(e,t,r,n,a,i){return D(e,t,w(e,r,t.latitude),n,a,i)}function D(e,t,r,n,a,i){if(X(i)){var c=o.createResolver();return O(e,n.heading,n.tilt,t,r,a,c),void c.promise.then(function(t){return i.resolve(G(e,t,n.fov))})}var l=O(e,n.heading,n.tilt,t,r,a);return G(e,l,n.fov,i)}function P(e,t,r,n,a){return M(e).directionToHeadingTilt(t,r,n,a)}function U(e,t,r){return e.basemapTerrain&&e.renderCoordsHelper.fromRenderCoords(t,ie,e.spatialReference)&&e.basemapTerrain.getElevation(ie)>ie.z-1}function z(e,t,r){return e.renderCoordsHelper.fromRenderCoords(t,ie,e.spatialReference)?e.elevationProvider.queryElevation(ie).then(function(e){return e>ie.z-10}):o.resolve(!1)}function E(e,t){var r=c.vec3f64.create();if(t)if(t instanceof l){if(h.pointToVector(t,r,e.renderSpatialReference),null==t.z&&null!=e.basemapTerrain)return e.elevationProvider.queryElevation(t).then(function(t){return null!=t&&e.renderCoordsHelper.setAltitude(t,r),r})}else c.vec3.copy(r,t);else c.vec3.copy(r,e.state.camera.center);return o.resolve(r)}function A(e,t){var r=c.vec3f64.create();if(t&&t instanceof l){if(h.pointToVector(t,r,e.renderSpatialReference),null==t.z&&null!=e.basemapTerrain){var n=e.elevationProvider.getElevation(t);null!=n&&e.renderCoordsHelper.setAltitude(n,r)}}else t?c.vec3.copy(r,t):c.vec3.copy(r,e.state.camera.center);return r}function O(e,t,r,n,a,i,o){var c=n&&n instanceof l?n:null;if(X(o))return void E(e,n).then(function(n){H(e,t,r,c,n,a,i,o)});var s=A(e,n);return H(e,t,r,c,s,a,i,o)}function H(e,t,r,n,a,i,o,l){if(!n){var s=e.renderSpatialReference,u=y(e);n=h.vectorToPoint(a,s,u)}i=Math.max(i,e.state.constraints.minimumPoiDistance);var f=j(e,t,r,a,i,o),v=M(e).eyeForCenterWithHeadingTilt,d=v(a,i,f.heading,f.tilt);if(o===_.ADJUST&&"global"===e.viewingMode&&r>0){var m=function(){var c=J(e,a,i,q(e,i,r,a));return o=r-c<1?_.LOCKED:_.ADJUST,H(e,t,c,n,a,i,o,l)};if(U(e,d.eye,d.tilt))return m();if(X(l))return void z(e,d.eye,d.tilt).then(function(e){if(e)return m();l.resolve({eye:d.eye,up:d.up,center:c.vec3f64.clone(a),heading:d.heading,tilt:d.tilt})})}var p={center:c.vec3f64.create(),eye:c.vec3f64.create(),up:c.vec3f64.create(),tilt:0,heading:0};return l&&!X(l)&&(p=l),p.eye=d.eye,p.up=d.up,p.center=c.vec3f64.clone(a),p.heading=d.heading,p.tilt=d.tilt,X(l)&&l.resolve(p),p}function I(e,t,r,n,a,i){var c,u=0;null!=t.zmax&&null!=t.zmin&&(c=(t.zmax+t.zmin)/2,u=t.zmax-t.zmin);var v,d,m;if("global"===e.viewingMode){var g=s.WebMercator,h=t.spatialReference||g,T=new l(t.xmin,t.ymin,h),M=new l(t.xmax,t.ymax,h);if(T=f.project(T,g),M=f.project(M,g),null===T||null===M)return void(X(i)&&i.reject());v=new l(oe.center(T.x,M.x),(M.y+T.y)/2,g),null!=c&&(v.z=c);var x=p.getGreatCircleSpanAt(v,T,M);d=x.lon,m=x.lat,oe.diff(T.x,M.x)>oe.range/2&&(d+=p.halfEarthCircumference),d=Math.min(d,p.halfEarthCircumference),m=Math.min(m,p.halfEarthCircumference)}else{var S=y(e);f.canProject(t,S)&&(t=f.project(t,S)),d=t.xmax-t.xmin,m=t.ymax-t.ymin,v=new l({x:t.xmin+.5*d,y:t.ymin+.5*m,z:c,spatialReference:S})}var C=e.state.camera,w=1/Math.tan(C.fovX/2),R=1/Math.tan(C.fovY/2),b=1/Math.tan(C.fov/2),D=Math.max(.5*d*w,.5*m*R,.5*u*b)/Q;if(X(i)){var P=o.createResolver();return O(e,r,n,v,D,a,P),void P.promise.then(function(t){return i.resolve(G(e,t,e.camera.fov))})}var U=O(e,r,n,v,D,a);return G(e,U,e.camera.fov,i)}function L(e,t,r,n,a){t||(r||(r=e.state.camera),t=C(e,r,a));var i,o,c=e.renderSpatialReference;if(r)i=h.vectorToPoint(r.center,c,y(e)),o=r.distance;else{if(!(i=e.toMap(e.screenCenter)))return null;o=p.computeCarthesianDistance(t.position,i)}r||(r=e.state.camera);var l=Math.tan(r.fovX/2),s=Math.tan(r.fovY/2),u=2*o*l*Q,f=2*o*s*Q;return"global"===e.viewingMode?m.toExtent(e,i,u,f,n):d.toExtent(e,i,u,f,n)}function V(e,t,r){var n=e.pointsOfInterest.centerOnSurfaceFrequent.distance;if(Math.log(r/n)/Math.LN2>$)return!0;var a=e.renderSpatialReference,i=y(e),o=h.vectorToPoint(t,a,i),c=h.vectorToPoint(e.pointsOfInterest.centerOnSurfaceFrequent.renderLocation,a,i),l=Math.tan(.5*e.state.camera.fov)*n;return c.distance(o)/l>ee}function j(e,t,r,n,a,i){var o=0;return i===_.ADJUST&&V(e,n,a)?(t=0,o=F(e,a,r,n)):o=W(e,n,a,r),o=e.state.constraints.clampTilt(a,o),r=J(e,n,a,o),{heading:t,tilt:r}}function F(e,t,r,n){var a=e.state.constraints.tilt(t);a.max=Math.min(a.max,.5*Math.PI);var i=a.min*(1-ce)+a.max*ce,o=W(e,n,t,r);return Math.min(o,i)}function q(e,t,r,n){var a=e.state.constraints.tilt(t),i=W(e,n,t,r);return i=Math.min(i,.5*Math.PI),a.min*(1-ce)+i*ce}function J(e,t,r,n){return M(e).lookAtTiltToEyeTilt(t,r,n)}function W(e,t,r,n){return M(e).eyeTiltToLookAtTilt(t,r,n)}function G(e,t,r,a){var i=e.renderSpatialReference,o=y(e),c=h.vectorToPoint(t.eye,i,o);return c?a?(a.position=c,a.heading=t.heading,a.tilt=t.tilt,a.fov=r,a):new n(c,t.heading,t.tilt,r):null}function X(e){return e&&e.resolve&&e.reject}function K(e,t){var r=e.basemapTerrain&&e.basemapTerrain.tilingScheme;return r?r.levelAtScale(t):void N.error("#scaleToZoom()","Cannot compute zoom from scale without a tiling scheme")}function k(e,t){var r=e.basemapTerrain&&e.basemapTerrain.tilingScheme;return r?r.scaleAtLevel(t):void N.error("#zoomToScale()","Cannot compute scale from zoom without a tiling scheme")}function Y(e,t){return e.spatialReference?u.getResolutionForScale(t,e.spatialReference):void 0}function Z(e,t,r){var n=e.renderSpatialReference;t||(t=e.state.camera);var a,i,o=s.WGS84;return t instanceof T?(h.vectorToVector(t.center,n,re,o),a=re[1],i=t.distance):(a=t.position.latitude,h.pointToVector(t.position,te,n),h.pointToVector(r,re,n),i=c.vec3.distance(te,re)),R(e,i,a)}Object.defineProperty(t,"__esModule",{value:!0});var _,N=i.getLogger("esri.views.3d.support.cameraUtils"),B=39.37,Q=1,$=8,ee=5,te=c.vec3f64.create(),re=c.vec3f64.create(),ne=c.vec3f64.create(),ae={heading:0,tilt:0},ie=new l,oe=new g.Cyclical(-20037508.342788905,20037508.342788905);!function(e){e[e.LOCKED=0]="LOCKED",e[e.ADJUST=1]="ADJUST"}(_=t.OrientationMode||(t.OrientationMode={})),t.headingTiltToDirectionUp=x,t.externalToInternal=S,t.internalToExternal=C,t.scaleToDistance=w,t.distanceToScale=R,t.fromCenterScale=b,t.fromCenterDistance=D,t.directionToHeadingTilt=P,t.getObserverForPointAtDistance=O,t.fromExtent=I,t.toExtent=L;var ce=.7;t.observerToCamera=G,t.scaleToZoom=K,t.zoomToScale=k,t.scaleToResolution=Y,t.computeScale=Z});