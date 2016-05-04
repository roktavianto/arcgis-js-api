// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/4.0/esri/copyright.txt for details.

define(["dojo/_base/lang","../../core/Accessor","../../core/lang","../../core/urlUtils","../../core/promiseUtils","../../request","../../geometry/Extent","../../geometry/SpatialReference","./PixelBlock","./rasterFormats/LercCodec","./rasterFormats/JpgPlus","./rasterFormats/Png","./rasterFormats/Raw"],function(e,t,r,a,i,n,o,s,d,l,h,p,c){var u=t.createSubclass({declaredClass:"esri.layers.support.Raster",validPixelTypes:["u1","u2","u4","u8","u16","u32","s8","s16","s32","f32"],validFormats:["lerc","jpeg","jpg","jpgpng","png","png8","png24","png32","bip","bsq"],classMetadata:{properties:{parsedUrl:{readOnly:!0,dependsOn:["url"]},url:{}}},_parsedUrlGetter:function(){return this.url?a.urlToObject(this.url):null},url:null,read:function(t){if(!t.imageServiceParameters||!t.nBands)return i.reject(new Error("Insufficient parameters to read data"));var a=r.clone(t.imageServiceParameters),o=t.nBands,s=t.pixelType||"f32";return this.validPixelTypes.indexOf(s.toUpperCase())<=-1&&(a.pixelType="f32"),a.format=a.format||"lerc",this.validFormats.indexOf(a.format.toLowerCase())<=-1&&(a.format="lerc"),this._prepareGetImageParameters(a),n(this.parsedUrl.path+"/exportImage",{responseType:"array-buffer",query:e.mixin(a,{f:"image"})}).then(function(e){var t=e.data;if(!this._isDataValid(t)){var r=new Error(String.fromCharCode.apply(null,new Uint8Array(t)));return i.reject(r)}var n=a.format.toUpperCase();"BSQ"!==n&&"BIP"!==n&&(n=this._getFormat(t));try{if(this.validFormats.indexOf(n.toLowerCase())>-1){var d=this._decodePixelBlock(t,{width:a.width,height:a.height,planes:o,pixelType:s,noDataValue:a.noData,format:n});return{pixelData:{pixelBlock:d,extent:a.extent},params:a}}return i.reject(new Error("Cannot decode the pixelBlock. Unsupported Format: "+n))}catch(l){return i.reject(l)}}.bind(this))},_prepareGetImageParameters:function(t){if(t.size&&t.bbox){var r=t.size.split(",");if(t.width=parseFloat(r[0]),t.height=parseFloat(r[1]),!t.extent){var a=t.bbox.split(",");t.extent=new o(parseFloat(a[0]),parseFloat(a[1]),parseFloat(a[2]),parseFloat(a[3]),new s(t.bboxSR))}}else{if(!t.width||Math.floor(t.width)!==t.width||!t.height||Math.floor(t.height)!==t.height)throw new Error("Incorrect Image Dimensions");if(!t.extent||"esri.geometry.Extent"!==t.extent.declaredClass)throw new Error("Incorrect extent");var i=t.extent,n=i.spatialReference.wkid||JSON.stringify(i.spatialReference.toJSON());delete t._ts,e.mixin(t,{bbox:i.xmin+","+i.ymin+","+i.xmax+","+i.ymax,imageSR:n,bboxSR:n,size:t.width+","+t.height},t.disableClientCaching?{_ts:Date.now()}:{})}},_adjustExtent:function(e,t,r){var a=e.ymax-e.ymin,i=e.xmax-e.xmin;return r>=t?(a=i*t/r,e.ymax=e.ymin+a):(i=a*r/t,e.xmax=e.xmin+i),e},_getFormat:function(e){var t=new Uint8Array(e,0,10),r="";return 255===t[0]&&216===t[1]?r="JPEG":137===t[0]&&80===t[1]&&78===t[2]&&71===t[3]?r="PNG":67===t[0]&&110===t[1]&&116===t[2]&&90===t[3]&&73===t[4]&&109===t[5]&&97===t[6]&&103===t[7]&&101===t[8]&&32===t[9]?r="LERC":String.fromCharCode.apply(null,t).toLowerCase().indexOf("error")>-1&&(r="ERROR"),r},_isDataValid:function(e){var t=new Uint8Array(e,0,10);return String.fromCharCode.apply(null,t).toLowerCase().indexOf("error")>-1?!1:!0},_calculateBandStatistics:function(e){var t,r=1/0,a=-1/0,i=e.length,n=0;for(t=0;i>t;t++)n=e[t],r=r>n?n:r,a=n>a?n:a;return{minValue:r,maxValue:a}},_verifyResult:function(e,t){return e&&e.height===t.height&&e.width===t.width?!0:!1},_getPixelTypeAndNoData:function(e){var t,r=e.noDataValue,a=e.pixelType;return"u1"===a||"u2"===a||"u4"===a||"u8"===a?(a="u8",r=Math.pow(2,8)-1,t=Uint8Array):"u16"===a?(r=r||Math.pow(2,16)-1,t=Uint16Array):"u32"===a?(r=r||Math.pow(2,32)-1,t=Uint32Array):"s8"===a?(r=r||0-Math.pow(2,7),t=Int8Array):"s16"===a?(r=r||0-Math.pow(2,15),t=Int16Array):"s32"===a?(r=r||0-Math.pow(2,31),t=Int32Array):t=Float32Array,{pixelType:a,pixelDataType:t,noDataValue:r}},_decodePixelBlock:function(e,t){if(!e||!t)throw new Error("Cannot decode the pixelBlock. Invalid parameters provided for decoding.");if(!t.height||Math.floor(t.height)!==t.height)throw new Error("Cannot decode the pixelBlock. Height is not provided.");if(!t.width||Math.floor(t.width)!==t.width)throw new Error("Cannot decode the pixelBlock. Width is not provided.");var r=this._decodeLerc;switch(t.format.toUpperCase()){case"JPEG":r=this._decodeJpeg;break;case"PNG":r=this._decodePng;break;case"BSQ":r=this._decodeBsq;break;case"BIP":r=this._decodeBip}r=r.bind(this);var a,i,n=r(e,t),o=n.statistics||[];if(o.length<=0)for(a=0;a<n.pixels.length;a++)i=n.pixels[a],o.push(this._calculateBandStatistics(i));var s=new d({width:t.width,height:t.height,pixels:n.pixels,pixelType:t.pixelType,mask:n.mask,statistics:o});return s},_decodeJpeg:function(e,t){if(!h)throw new Error("The jpeg decoder module is not loaded.");var r=new h,a=r.decode(e);if(!this._verifyResult(a,t))throw new Error("Error in decoding the image. The decoded image dimensions are incorrect.");return t.width=a.width,t.height=a.height,t.pixelType="U8",a},_decodePng:function(e,t){if(!p)throw new Error("The png decoder module is not loaded.");var r=new Uint8Array(e),a=new p(r),i=new Uint8Array(t.width*t.height*4);a.copyToImageData(i,a.decodePixels());var n,o=0,s=0,d=new Uint8Array(t.width*t.height);for(o=0;o<t.width*t.height;o++)d[o]=i[4*o+3];var l={pixels:[],mask:d};for(o=0;3>o;o++){for(n=new Uint8Array(t.width*t.height),s=0;s<t.width*t.height;s++)n[s]=i[4*s+o];l.pixels.push(n)}return t.pixelType="U8",l},_decodeBsq:function(e,t){if(!c)throw new Error("The bsq decoder module is not loaded.");var r=this._getPixelTypeAndNoData(t),a=c.decodeBSQ(e,{bandCount:t.planes,width:t.width,height:t.height,pixelType:r.pixelDataType,noDataValue:r.noDataValue});return a},_decodeBip:function(e,t){if(!c)throw new Error("The bsq decoder module is not loaded.");var r=this._getPixelTypeAndNoData(t),a=c.decodeBIP(e,{bandCount:t.planes,width:t.width,height:t.height,pixelType:r.pixelDataType,noDataValue:r.noDataValue});return a},_decodeLerc:function(e,t){{var r=this._getPixelTypeAndNoData(t);r.noDataValue}t.pixelType=r.pixelType;for(var a,i=0,n=0,o=e.byteLength-10,s={pixels:[],statistics:[]};o>n;){var d=l.decode(e,{inputOffset:n,encodedMaskData:a,returnMask:0===i?!0:!1,returnEncodedMask:0===i?!0:!1,returnFileInfo:!0,pixelType:r.pixelDataType,noDataValue:r.noDataValue});if(n=d.fileInfo.eofOffset,0===i&&(a=d.encodedMaskData,s.mask=d.maskData),i++,!this._verifyResult(d,t))throw new Error("Error in decoding the image. The decoded image dimensions are incorrect.");s.pixels.push(d.pixelData),s.statistics.push({minValue:d.minValue,maxValue:d.maxValue,noDataValue:d.noDataValue})}return s}});return u});