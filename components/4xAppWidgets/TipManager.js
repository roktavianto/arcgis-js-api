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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","dojo/i18n!../../nls/common","dojo/i18n!./TipManager/nls/resources","../../core/accessorSupport/decorators","./Tip","../../widgets/Widget","./TipManager/TipManagerViewModel","../../widgets/support/widget"],function(e,t,i,n,o,r,s,a,p,l,d){"use strict";var c={base:"esri-tip-manager",invisible:"esri-tip-manager--invisible",widgetIcon:"esri-icon-lightbulb",tipManagerHeader:"esri-tip-manager__header",tipManagerHeading:"esri-tip-manager__heading",title:"esri-tip-manager__title",closeButton:"esri-tip-manager__close",tipManagerPagination:"esri-tip-manager__pagination",tipPaginationText:"esri-tip-manager__pagination-text",tipNextButton:"esri-tip-manager__next-button",tipPreviousButton:"esri-tip-manager__previous-button",tipContainer:"esri-tip-manager__tip-container",tipContainerAdvancing:"esri-tip-manager__tip-container--advancing",tipContainerRetreating:"esri-tip-manager__tip-container--retreating",esriWidget:"esri-widget",header:"esri-widget__header",heading:"esri-widget__heading",headerDismiss:"esri-widget__header-button",footer:"esri-widget__footer",pagination:"esri-widget__footer-pagination",paginationText:"esri-widget__footer-pagination-text",nextButton:"esri-widget__footer-pagination-next-button",previousButton:"esri-widget__footer-pagination-previous-button",iconClose:"esri-icon-close",iconLeft:"esri-icon-left",iconRight:"esri-icon-right",disabled:"esri-disabled",hidden:"esri-hidden"};return function(e){function t(t){var i=e.call(this)||this;return i._tipWidget=new a({dismissible:!1,compact:!1}),i.closeButtonEnabled=!0,i.iconClass=c.widgetIcon,i.label=r.widgetLabel,i.visible=!0,i.viewModel=new l,i}return i(t,e),t.prototype.next=function(){},t.prototype.previous=function(){},t.prototype.render=function(){var e,t=this.visible,i=(e={},e[c.invisible]=!t,e),n=t?this._renderTipManager():null;return d.tsx("div",{class:this.classes(c.base,c.esriWidget,i)},n)},t.prototype._renderTipManager=function(){var e=this._renderTipContainer();return[this._renderHeader(),e,this._renderPagination()]},t.prototype._renderHeader=function(){return d.tsx("header",{class:this.classes(c.header,c.tipManagerHeader)},d.tsx("h1",{class:this.classes(c.heading,c.tipManagerHeading)},this.title),this._renderCloseButton())},t.prototype._renderCloseButton=function(){return this.closeButtonEnabled?d.tsx("button",{key:"close-button",class:this.classes(c.closeButton,c.headerDismiss),bind:this,onclick:this._close,onkeydown:this._close,title:o.close,"aria-label":o.close},d.tsx("span",{"aria-hidden":"true",class:c.iconClose})):null},t.prototype._renderTipContainer=function(){var e,t=this.viewModel,i=t.paginationDirection,n=t.selectedTip,o=(e={},e[c.tipContainerAdvancing]="advancing"===i,e[c.tipContainerRetreating]="retreating"===i,e);return d.tsx("div",{key:n,class:this.classes(c.tipContainer,o)},this._renderTip())},t.prototype._renderPagination=function(){var e,t,i=this,n=i.tips,s=i.selectedTipIndex,a=(e={},e[c.iconLeft]=!0,e[c.iconRight]=!1,e),p=(t={},t[c.iconRight]=!0,t[c.iconLeft]=!1,t);return n.length>1?d.tsx("footer",{key:"pagination",class:c.footer},d.tsx("div",{class:this.classes(c.pagination,c.tipManagerPagination)},d.tsx("button",{class:this.classes(c.previousButton,c.tipPreviousButton),bind:this,onclick:this._previous,onkeydown:this._previous,title:o.pagination.previous,"aria-label":o.pagination.previous},d.tsx("span",{"aria-hidden":"true",classes:a})),d.tsx("span",{class:this.classes(c.paginationText,c.tipPaginationText)},r.tip," ",s+1,"/",n.length),d.tsx("button",{class:this.classes(c.nextButton,c.tipNextButton),bind:this,onclick:this._next,onkeydown:this._next,title:o.pagination.next,"aria-label":o.pagination.next},d.tsx("span",{"aria-hidden":"true",classes:p})))):d.tsx("footer",{key:"pagination",class:c.pagination})},t.prototype._renderTip=function(){var e=this,t=e._tipWidget,i=e.selectedTip;return t&&i?(t.tip=i,t.render()):null},t.prototype._close=function(){this.visible=!1},t.prototype._next=function(){this.viewModel.next()},t.prototype._previous=function(){this.viewModel.previous()},n([d.renderable(),s.property()],t.prototype,"closeButtonEnabled",void 0),n([s.property()],t.prototype,"iconClass",void 0),n([s.property()],t.prototype,"label",void 0),n([d.renderable(),s.aliasOf("viewModel.selectedTip")],t.prototype,"selectedTip",void 0),n([d.renderable(),s.aliasOf("viewModel.selectedTipIndex")],t.prototype,"selectedTipIndex",void 0),n([d.renderable(),s.aliasOf("viewModel.tips")],t.prototype,"tips",void 0),n([s.property(),d.renderable()],t.prototype,"title",void 0),n([s.property(),d.renderable()],t.prototype,"visible",void 0),n([s.property({type:l}),d.renderable(["viewModel.paginationDirection"])],t.prototype,"viewModel",void 0),n([s.aliasOf("viewModel.next")],t.prototype,"next",null),n([s.aliasOf("viewModel.previous")],t.prototype,"previous",null),n([d.accessibleHandler()],t.prototype,"_close",null),n([d.accessibleHandler()],t.prototype,"_next",null),n([d.accessibleHandler()],t.prototype,"_previous",null),t=n([s.subclass("esri.widgets.TipManager")],t)}(s.declared(p))});