/*! For license information please see comments-comments.js.LICENSE.txt */
!function(){var e,o={4921:function(){OCA.Comments.ActivityTabViewPlugin={prepareModelForDisplay:function(e,n,t){if("comments"===e.get("app")&&"comments"===e.get("type")&&"ActivityTabView"===t&&(n.addClass("comment"),e.get("message")&&this._isLong(e.get("message")))){n.addClass("collapsed");var o=$("<div>").addClass("message-overlay");n.find(".activitymessage").after(o),n.on("click",this._onClickCollapsedComment)}},_onClickCollapsedComment:function(e){var n=$(e.target);n.is(".comment")||(n=n.closest(".comment")),n.removeClass("collapsed")},_isLong:function(e){return e.length>250||(e.match(/\n/g)||[]).length>1}},OC.Plugins.register("OCA.Activity.RenderingPlugins",OCA.Comments.ActivityTabViewPlugin)},75387:function(){OCA.Comments||(OCA.Comments={})},52098:function(e,n,t){"use strict";t(75387),t(4543),t(57702),t(4921),window.OCA.Comments=OCA.Comments},57702:function(e,o,i){var r=i(64492);r.extend(OC.Files.Client,{PROPERTY_COMMENTS_UNREAD:"{"+OC.Files.Client.NS_OWNCLOUD+"}comments-unread"}),OCA.Comments=r.extend({},OCA.Comments),OCA.Comments||(OCA.Comments={}),OCA.Comments.FilesPlugin={ignoreLists:["trashbin","files.public"],_formatCommentCount:function(e){return OCA.Comments.Templates.filesplugin({count:e,countMessage:n("comments","%n unread comment","%n unread comments",e),iconUrl:OC.imagePath("core","actions/comment")})},attach:function(e){var o=this;if(!(this.ignoreLists.indexOf(e.id)>=0)){var i=e._getWebdavProperties;e._getWebdavProperties=function(){var e=i.apply(this,arguments);return e.push(OC.Files.Client.PROPERTY_COMMENTS_UNREAD),e},e.filesClient.addFileInfoParser((function(e){var n={},t=e.propStat[0].properties[OC.Files.Client.PROPERTY_COMMENTS_UNREAD];return r.isUndefined(t)||""===t||(n.commentsUnread=parseInt(t,10)),n})),e.$el.addClass("has-comments");var a=e._createRow;e._createRow=function(e){var n=a.apply(this,arguments);return e.commentsUnread&&n.attr("data-comments-unread",e.commentsUnread),n},e.fileActions.registerAction({name:"Comment",displayName:function(e){if(e&&e.$file){var o=parseInt(e.$file.data("comments-unread"),10);if(o>=0)return n("comments","1 new comment","{unread} new comments",o,{unread:o})}return t("comments","Comment")},mime:"all",order:-140,iconClass:"icon-comment",permissions:OC.PERMISSION_READ,type:OCA.Files.FileActions.TYPE_INLINE,render:function(e,n,t){var i=t.$file.data("comments-unread");if(i){var r=$(o._formatCommentCount(i));return t.$file.find("a.name>span.fileactions").append(r),r}return""},actionHandler:function(e,n){n.$file.find(".action-comment").tooltip("hide"),OCA.Files.Sidebar.setActiveTab("comments"),OCA.Files.Sidebar.open(n.dir+"/"+e)}});var s=e.elementToFile;e.elementToFile=function(e){var n=s.apply(this,arguments),t=e.data("comments-unread");return t&&(n.commentsUnread=t),n}}}},OC.Plugins.register("OCA.Files.FileList",OCA.Comments.FilesPlugin)},4543:function(){function e(n){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(n)}var n;n=Handlebars.template,(OCA.Comments.Templates=OCA.Comments.Templates||{}).filesplugin=n({compiler:[8,">= 4.3.0"],main:function(n,t,o,i,r){var a,s=null!=t?t:n.nullContext||{},l=n.hooks.helperMissing,c="function",m=n.escapeExpression,u=n.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return'<a class="action action-comment permanent" title="'+m(e(a=null!=(a=u(o,"countMessage")||(null!=t?u(t,"countMessage"):t))?a:l)===c?a.call(s,{name:"countMessage",hash:{},data:r,loc:{start:{line:1,column:50},end:{line:1,column:66}}}):a)+'" href="#">\n\t<img class="svg" src="'+m(e(a=null!=(a=u(o,"iconUrl")||(null!=t?u(t,"iconUrl"):t))?a:l)===c?a.call(s,{name:"iconUrl",hash:{},data:r,loc:{start:{line:2,column:23},end:{line:2,column:34}}}):a)+'"/>\n</a>\n'},useData:!0})}},i={};function r(e){var n=i[e];if(void 0!==n)return n.exports;var t=i[e]={id:e,loaded:!1,exports:{}};return o[e].call(t.exports,t,t.exports,r),t.loaded=!0,t.exports}r.m=o,r.amdD=function(){throw new Error("define cannot be used indirect")},r.amdO={},e=[],r.O=function(n,t,o,i){if(!t){var a=1/0;for(m=0;m<e.length;m++){t=e[m][0],o=e[m][1],i=e[m][2];for(var s=!0,l=0;l<t.length;l++)(!1&i||a>=i)&&Object.keys(r.O).every((function(e){return r.O[e](t[l])}))?t.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(m--,1);var c=o();void 0!==c&&(n=c)}}return n}i=i||0;for(var m=e.length;m>0&&e[m-1][2]>i;m--)e[m]=e[m-1];e[m]=[t,o,i]},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,{a:n}),n},r.d=function(e,n){for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},r.j=258,function(){var e={258:0};r.O.j=function(n){return 0===e[n]};var n=function(n,t){var o,i,a=t[0],s=t[1],l=t[2],c=0;for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(l)var m=l(r);for(n&&n(t);c<a.length;c++)i=a[c],r.o(e,i)&&e[i]&&e[i][0](),e[a[c]]=0;return r.O(m)},t=self.webpackChunknextcloud=self.webpackChunknextcloud||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}();var a=r.O(void 0,[874],(function(){return r(52098)}));a=r.O(a)}();
//# sourceMappingURL=comments-comments.js.map?v=f0e300b9119c18b2ed96