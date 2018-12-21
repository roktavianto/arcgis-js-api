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

define(["require","exports","../../../../core/compilerUtils","../../../../core/Logger","../../../../core/ObjectStack","../../../../core/libs/gl-matrix-2/gl-matrix","../mathUtils","../stack","./lineSegment","./plane","./ray","./vector"],function(e,t,n,i,r,a,o,s,c,v,g,l){function u(e){return void 0===e&&(e=t.UP),{plane:v.create(e.plane),origin:a.vec3f64.clone(e.origin),basis1:a.vec3f64.clone(e.basis1),basis2:a.vec3f64.clone(e.basis2)}}function d(e,t,n){var i=z.get();return i.origin=e,i.basis1=t,i.basis2=n,i.plane=v.fromVectorsAndPoint(n,t,e,v.wrap(0,0,0,0)),i}function f(e,t){return void 0===t&&(t=u()),b(e.origin,e.basis1,e.basis2,t)}function b(e,t,n,i){return void 0===i&&(i=u()),a.vec3.copy(i.origin,e),a.vec3.copy(i.basis1,t),a.vec3.copy(i.basis2,n),v.fromVectorsAndPoint(n,t,e,i.plane),_(i,"fromValues()"),i}function p(e,t,n){e!==n&&f(e,n);var i=a.vec3.scale(s.sv3d.get(),e.plane,t);return a.vec3.add(n.origin,n.origin,i),n.plane[3]-=t,n}function m(e,t,n){return h(t,n),p(n,O(e,e.origin),n),n}function h(e,t){void 0===t&&(t=u());var n=(e[2]-e[0])/2,i=(e[3]-e[1])/2;return a.vec3.set(t.origin,e[0]+n,e[1]+i,0),a.vec3.set(t.basis1,n,0,0),a.vec3.set(t.basis2,0,i,0),v.fromValues(0,0,1,0,t.plane),t}function P(e,t,n){return!!v.intersectRay(e.plane,t,n)&&C(e,n)}function I(e,t,n){if(P(e,t,n))return n;var i=y(e,t,s.sv3d.get());return a.vec3.add(n,t.origin,a.vec3.scale(s.sv3d.get(),t.direction,a.vec3.distance(t.origin,i)/a.vec3.length(t.direction))),n}function y(e,t,n){var i=Y.get();q(e,t,i,Y.get());for(var r=Number.POSITIVE_INFINITY,c=0,g=G;c<g.length;c++){var l=g[c],u=F(e,l,B.get()),d=s.sv3d.get();if(v.intersectLineSegment(i,u,d)){var f=o.directionFromTo(s.sv3d.get(),t.origin,d),b=Math.abs(o.acos(a.vec3.dot(t.direction,f)));b<r&&(r=b,a.vec3.copy(n,d))}}return r===Number.POSITIVE_INFINITY?S(e,t,n):n}function S(e,t,n){if(P(e,t,n))return n;var i=Y.get(),r=Y.get();q(e,t,i,r);for(var o=Number.POSITIVE_INFINITY,c=0,l=G;c<l.length;c++){var u=l[c],d=F(e,u,B.get()),f=s.sv3d.get();if(v.intersectLineSegmentClamp(i,d,f)){var b=g.distance2(t,f);if(!v.isPointInside(r,f))continue;b<o&&(o=b,a.vec3.copy(n,f))}}return V(e,t.origin)<o&&a.vec3.copy(n,t.origin),n}function M(e,t,n){var i=v.projectPoint(e.plane,t,s.sv3d.get()),r=c.projectPointClamp(E(e,e.basis1),i,-1,1,s.sv3d.get()),o=c.projectPointClamp(E(e,e.basis2),i,-1,1,s.sv3d.get());return a.vec3.subtract(n,a.vec3.add(s.sv3d.get(),r,o),e.origin),n}function j(e,t,n){var i=e.origin,r=e.basis1,o=e.basis2,c=a.vec3.subtract(s.sv3d.get(),t,i),v=l.projectPointSignedLength(r,c)/a.vec3.length(r),g=l.projectPointSignedLength(o,c)/a.vec3.length(o),u=l.projectPointSignedLength(e.plane,c);return a.vec3.set(n,v,g,u)}function V(e,t){var n=j(e,t,s.sv3d.get()),i=e.basis1,r=e.basis2,o=a.vec3.length(i),c=a.vec3.length(r),v=Math.max(Math.abs(n[0])-o,0),g=Math.max(Math.abs(n[1])-c,0),l=n[2];return v*v+g*g+l*l}function N(e,t){return Math.sqrt(V(e,t))}function w(e,t){for(var n=Number.NEGATIVE_INFINITY,i=0,r=G;i<r.length;i++){var a=r[i],o=F(e,a,B.get()),s=c.distance2(o,t);s>n&&(n=s)}return Math.sqrt(n)}function A(e,t){return v.isPointInside(e.plane,t)&&C(e,t)}function L(e,t,n,i){return x(e,n,i)}function O(e,t){var n=-e.plane[3];return l.projectPointSignedLength(e.plane,t)-n}function T(e,t,n,i){var r=O(e,t),o=a.vec3.scale(s.sv3d.get(),e.plane,n-r);return a.vec3.add(i,t,o),i}function k(e,t,n){return e!==n&&f(e,n),a.mat4.invert(D,t),a.mat4.transpose(D,D),a.vec3.transformMat4(n.basis1,e.basis1,D),a.vec3.transformMat4(n.basis2,e.basis2,D),a.vec3.transformMat4(n.plane,e.plane,D),a.vec3.transformMat4(n.origin,e.origin,t),v.setOffsetFromPoint(n.plane,n.origin,n.plane),n}function x(e,t,i){switch(t){case 0:a.vec3.copy(i,e.basis1),a.vec3.normalize(i,i);break;case 1:a.vec3.copy(i,e.basis2),a.vec3.normalize(i,i);break;case 2:a.vec3.copy(i,e.plane);break;default:n.neverReached(t)}return i}function C(e,t){var n=a.vec3.subtract(s.sv3d.get(),t,e.origin),i=a.vec3.squaredLength(e.basis1),r=a.vec3.squaredLength(e.basis2),o=a.vec3.dot(e.basis1,n),c=a.vec3.dot(e.basis2,n);return-o-i<0&&o-i<0&&-c-r<0&&c-r<0}function E(e,t){var n=B.get();return a.vec3.copy(n.origin,e.origin),a.vec3.copy(n.vector,t),n}function F(e,t,n){var i=e.basis1,r=e.basis2,o=e.origin,c=a.vec3.scale(s.sv3d.get(),i,t.origin[0]),v=a.vec3.scale(s.sv3d.get(),r,t.origin[1]);a.vec3.add(n.origin,c,v),a.vec3.add(n.origin,n.origin,o);var g=a.vec3.scale(s.sv3d.get(),i,t.direction[0]),l=a.vec3.scale(s.sv3d.get(),r,t.direction[1]);return a.vec3.scale(n.vector,a.vec3.add(g,g,l),2),n}function _(e,t){Math.abs(a.vec3.dot(e.basis1,e.basis2)/(a.vec3.length(e.basis1)*a.vec3.length(e.basis2)))>1e-6&&R.warn(t,"Provided basis vectors are not perpendicular"),Math.abs(a.vec3.dot(e.basis1,e.plane))>1e-6&&R.warn(t,"Basis vectors and plane normal are not perpendicular"),Math.abs(-a.vec3.dot(e.plane,e.origin)-e.plane[3])>1e-6&&R.warn(t,"Plane offset is not consistent with plane origin")}function q(e,t,n,i){var r=e.plane;v.fromVectorsAndPoint(r,t.direction,t.origin,n),v.fromVectorsAndPoint(n,r,t.origin,i)}Object.defineProperty(t,"__esModule",{value:!0});var R=i.getLogger("esri.views.3d.support.geometryUtils.boundedPlane"),U=function(){function e(){this.plane=v.create(),this.origin=a.vec3f64.create(),this.basis1=a.vec3f64.create(),this.basis2=a.vec3f64.create()}return e}();t.BoundedPlaneClass=U,t.create=u,t.wrap=d,t.copy=f,t.fromValues=b,t.elevate=p,t.setExtent=m,t.fromAABoundingRect=h,t.intersectRay=P,t.intersectRayClosestSilhouette=I,t.closestPointOnSilhouette=y,t.closestPoint=S,t.projectPoint=M,t.projectPointLocal=j,t.distance2=V,t.distance=N,t.distanceToSilhouette=w,t.extrusionContainsPoint=A,t.axisAt=L,t.altitudeAt=O,t.setAltitudeAt=T,t.transform=k,t.UP={plane:v.create(),origin:a.vec3f64.fromValues(0,0,0),basis1:a.vec3f64.fromValues(1,0,0),basis2:a.vec3f64.fromValues(0,1,0)};var Y=new r.ObjectStack(v.create),B=new r.ObjectStack(c.create),z=new r.ObjectStack(function(){return{origin:null,basis1:null,basis2:null,plane:null}}),G=[{origin:[-1,-1],direction:[1,0]},{origin:[1,-1],direction:[0,1]},{origin:[1,1],direction:[-1,0]},{origin:[-1,1],direction:[0,-1]}],D=a.mat4f64.create()});