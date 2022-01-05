/*! For license information please see files_sharing-additionalScripts.js.LICENSE.txt */
!function(){var e,a={20339:function(e,a,r){"use strict";var i=r(95573),n=r.n(i),s=r(64492);s.extend(OC.Files.Client,{PROPERTY_SHARE_TYPES:"{"+OC.Files.Client.NS_OWNCLOUD+"}share-types",PROPERTY_OWNER_ID:"{"+OC.Files.Client.NS_OWNCLOUD+"}owner-id",PROPERTY_OWNER_DISPLAY_NAME:"{"+OC.Files.Client.NS_OWNCLOUD+"}owner-display-name"}),OCA.Sharing||(OCA.Sharing={}),OCA.Sharing.Util={_REMOTE_OWNER_REGEXP:new RegExp("^(([^@]*)@(([^@^/\\s]*)@)?)((https://)?[^[\\s/]*)([/](.*))?$"),attach:function(e){if(OC.Share&&"trashbin"!==e.id&&"files.public"!==e.id){var a=e.fileActions,r=e._createRow;e._createRow=function(e){var t=r.apply(this,arguments),i=OCA.Sharing.Util.getSharePermissions(e);return 0===e.permissions&&(delete a.actions.all.Comment,delete a.actions.all.Details,delete a.actions.all.Goto),t.attr("data-share-permissions",i),e.shareOwner&&(t.attr("data-share-owner",e.shareOwner),t.attr("data-share-owner-id",e.shareOwnerId),"shared-root"===e.mountType&&t.attr("data-permissions",e.permissions|OC.PERMISSION_UPDATE)),e.recipientData&&!s.isEmpty(e.recipientData)&&t.attr("data-share-recipient-data",JSON.stringify(e.recipientData)),e.shareTypes&&t.attr("data-share-types",e.shareTypes.join(",")),t};var i=e.elementToFile;e.elementToFile=function(e){var a=i.apply(this,arguments);if(a.sharePermissions=e.attr("data-share-permissions")||void 0,a.shareOwner=e.attr("data-share-owner")||void 0,a.shareOwnerId=e.attr("data-share-owner-id")||void 0,e.attr("data-share-types")&&(a.shareTypes=e.attr("data-share-types").split(",")),e.attr("data-expiration")){var r=parseInt(e.attr("data-expiration"));a.shares=[],a.shares.push({expiration:r})}return a};var n=e._getWebdavProperties;e._getWebdavProperties=function(){var e=n.apply(this,arguments);return e.push(OC.Files.Client.PROPERTY_OWNER_ID),e.push(OC.Files.Client.PROPERTY_OWNER_DISPLAY_NAME),e.push(OC.Files.Client.PROPERTY_SHARE_TYPES),e},e.filesClient.addFileInfoParser((function(e){var a={},r=e.propStat[0].properties,t=r[OC.Files.Client.PROPERTY_PERMISSIONS];t&&t.indexOf("S")>=0&&(a.shareOwner=r[OC.Files.Client.PROPERTY_OWNER_DISPLAY_NAME],a.shareOwnerId=r[OC.Files.Client.PROPERTY_OWNER_ID]);var i=r[OC.Files.Client.PROPERTY_SHARE_TYPES];return i&&(a.shareTypes=s.chain(i).filter((function(e){return e.namespaceURI===OC.Files.Client.NS_OWNCLOUD&&"share-type"===e.nodeName.split(":")[1]})).map((function(e){return parseInt(e.textContent||e.text,10)})).value()),a})),e.$el.on("fileActionsReady",(function(e){var a=e.$files;s.each(a,(function(e){var a=$(e),r=a.attr("data-share-types")||"",t=a.attr("data-share-owner");if(r||t){var i=!1,n=!1;s.each(r.split(",")||[],(function(e){(e=parseInt(e,10))===OC.Share.SHARE_TYPE_LINK||e===OC.Share.SHARE_TYPE_EMAIL?i=!0:(e===OC.Share.SHARE_TYPE_USER||e===OC.Share.SHARE_TYPE_GROUP||e===OC.Share.SHARE_TYPE_REMOTE||e===OC.Share.SHARE_TYPE_REMOTE_GROUP||e===OC.Share.SHARE_TYPE_CIRCLE||e===OC.Share.SHARE_TYPE_ROOM||e===OC.Share.SHARE_TYPE_DECK)&&(n=!0)})),OCA.Sharing.Util._updateFileActionIcon(a,n,i)}}))})),e.$el.on("changeDirectory",(function(){OCA.Sharing.sharesLoaded=!1})),a.registerAction({name:"Share",displayName:function(e){if(e&&e.$file){var a=parseInt(e.$file.data("share-types"),10),r=e.$file.data("share-owner-id");if(a>=0||r)return t("files_sharing","Shared")}return t("files_sharing","Share")},altText:t("files_sharing","Share"),mime:"all",order:-150,permissions:OC.PERMISSION_ALL,iconClass:function(e,a){var r=parseInt(a.$file.data("share-types"),10);return r===OC.Share.SHARE_TYPE_EMAIL||r===OC.Share.SHARE_TYPE_LINK?"icon-public":"icon-shared"},icon:function(e,a){var r=a.$file.data("share-owner-id");if(r)return OC.generateUrl("/avatar/".concat(r,"/32"))},type:OCA.Files.FileActions.TYPE_INLINE,actionHandler:function(a,r){if(e._detailsView){var t=parseInt(r.$file.data("share-permissions"),10);(isNaN(t)||t>0)&&e.showDetailsView(a,"sharing")}},render:function(e,r,t){return 0!=(parseInt(t.$file.data("permissions"),10)&OC.PERMISSION_SHARE)||t.$file.attr("data-share-owner")?a._defaultRenderAction.call(a,e,r,t):null}});var o=new OCA.Sharing.ShareBreadCrumbView;e.registerBreadCrumbDetailView(o)}},_updateFileListDataAttributes:function(e,a,r){if("files"!==e.id)if(s.pluck(r.get("shares"),"share_with_displayname").length){var t=s.mapObject(r.get("shares"),(function(e){return{shareWith:e.share_with,shareWithDisplayName:e.share_with_displayname}}));a.attr("data-share-recipient-data",JSON.stringify(t))}else a.removeAttr("data-share-recipient-data")},_updateFileActionIcon:function(e,a,r){return!!(a||r||e.attr("data-share-recipient-data")||e.attr("data-share-owner"))&&(OCA.Sharing.Util._markFileAsShared(e,!0,r),!0)},_markFileAsShared:function(e,a,r){var i,n,s,o,l=e.find('.fileactions .action[data-action="Share"]'),d=e.data("type"),h=l.find(".icon"),c=e.attr("data-share-owner-id"),p=e.attr("data-share-owner"),u=e.attr("data-mounttype"),f="icon-shared";l.removeClass("shared-style"),"dir"===d&&(a||r||c)?(o=void 0!==u&&"shared-root"!==u&&"shared"!==u?OC.MimeType.getIconUrl("dir-"+u):r?OC.MimeType.getIconUrl("dir-public"):OC.MimeType.getIconUrl("dir-shared"),e.find(".filename .thumbnail").css("background-image","url("+o+")"),e.attr("data-icon",o)):"dir"===d&&("true"===e.attr("data-e2eencrypted")?(o=OC.MimeType.getIconUrl("dir-encrypted"),e.attr("data-icon",o)):u&&0===u.indexOf("external")?(o=OC.MimeType.getIconUrl("dir-external"),e.attr("data-icon",o)):(o=OC.MimeType.getIconUrl("dir"),e.removeAttr("data-icon")),e.find(".filename .thumbnail").css("background-image","url("+o+")")),a||c?(n=e.data("share-recipient-data"),l.addClass("shared-style"),s="<span>"+t("files_sharing","Shared")+"</span>",c?(i=t("files_sharing","Shared by"),s=OCA.Sharing.Util._formatRemoteShare(c,p,i)):n&&(s=OCA.Sharing.Util._formatShareList(n)),l.html(s).prepend(h),(c||n)&&(l.find(".avatar").each((function(){$(this).avatar($(this).data("username"),32)})),l.find("span[title]").tooltip({placement:"top"}))):l.html('<span class="hidden-visually">'+t("files_sharing","Shared")+"</span>").prepend(h),r&&(f="icon-public"),h.removeClass("icon-shared icon-public").addClass(f)},_formatRemoteShare:function(e,a,r){var t=OCA.Sharing.Util._REMOTE_OWNER_REGEXP.exec(e);if(!t||!t[7])return'<span class="avatar" data-username="'+n()(e)+'" title="'+r+" "+n()(a)+'"></span><span class="hidden-visually">'+r+" "+n()(a)+"</span> ";var i=t[2],s=t[4],o=t[5],l=t[6],d=t[8]?t[7]:"",h=r+" "+i;s&&(h+="@"+s),o&&(h+="@"+o.replace(l,"")+d);var c='<span class="remoteAddress" title="'+n()(h)+'">';return c+='<span class="username">'+n()(i)+"</span>",s&&(c+='<span class="userDomain">@'+n()(s)+"</span>"),c+"</span> "},_formatShareList:function(e){var a=this;return(e=s.toArray(e)).sort((function(e,a){return e.shareWithDisplayName.localeCompare(a.shareWithDisplayName)})),$.map(e,(function(e){return a._formatRemoteShare(e.shareWith,e.shareWithDisplayName,t("files_sharing","Shared with"))}))},markFileAsShared:function(e,a,r){var i,n,s,o,l=e.find('.fileactions .action[data-action="Share"]'),d=e.data("type"),h=l.find(".icon"),c=e.attr("data-share-owner-id"),p=e.attr("data-share-owner"),u=e.attr("data-mounttype"),f="icon-shared";l.removeClass("shared-style"),"dir"===d&&(a||r||c)?(o=void 0!==u&&"shared-root"!==u&&"shared"!==u?OC.MimeType.getIconUrl("dir-"+u):r?OC.MimeType.getIconUrl("dir-public"):OC.MimeType.getIconUrl("dir-shared"),e.find(".filename .thumbnail").css("background-image","url("+o+")"),e.attr("data-icon",o)):"dir"===d&&("true"===e.attr("data-e2eencrypted")?(o=OC.MimeType.getIconUrl("dir-encrypted"),e.attr("data-icon",o)):u&&0===u.indexOf("external")?(o=OC.MimeType.getIconUrl("dir-external"),e.attr("data-icon",o)):(o=OC.MimeType.getIconUrl("dir"),e.removeAttr("data-icon")),e.find(".filename .thumbnail").css("background-image","url("+o+")")),a||c?(n=e.data("share-recipient-data"),l.addClass("shared-style"),s="<span>"+t("files_sharing","Shared")+"</span>",c?(i=t("files_sharing","Shared by"),s=this._formatRemoteShare(c,p,i)):n&&(s=this._formatShareList(n)),l.html(s).prepend(h),(c||n)&&(l.find(".avatar").each((function(){$(this).avatar($(this).data("username"),32)})),l.find("span[title]").tooltip({placement:"top"}))):l.html('<span class="hidden-visually">'+t("files_sharing","Shared")+"</span>").prepend(h),r&&(f="icon-public"),h.removeClass("icon-shared icon-public").addClass(f)},getSharePermissions:function(e){return e.sharePermissions}},OC.Plugins.register("OCA.Files.FileList",OCA.Sharing.Util),r(34970);var o=r(93379),l=r.n(o),d=r(89216);l()(d.Z,{insert:"head",singleton:!1}),d.Z.locals,r(18730),r.nc=btoa(OC.requestToken),window.OCA.Sharing=OCA.Sharing},18730:function(e,a,r){r.nc=btoa(OC.requestToken),window.OCP.Collaboration.registerType("file",{action:function(){return new Promise((function(e,a){OC.dialogs.filepicker(t("files_sharing","Link to a file"),(function(r){OC.Files.getClient().getFileInfo(r).then((function(a,r){e(r.id)})).fail((function(){a(new Error("Cannot get fileinfo"))}))}),!1,null,!1,OC.dialogs.FILEPICKER_TYPE_CHOOSE,"",{allowDirectoryChooser:!0})}))},typeString:t("files_sharing","Link to a file"),typeIconClass:"icon-files-dark"})},34970:function(){!function(){"use strict";var e=OC.Backbone.View.extend({tagName:"span",events:{click:"_onClick"},_dirInfo:void 0,render:function(e){if(this._dirInfo=e.dirInfo||null,null===this._dirInfo||"/"===this._dirInfo.path&&""===this._dirInfo.name)this.$el.removeClass("shared icon-public icon-shared"),this.$el.hide();else{var a=e.dirInfo&&e.dirInfo.shareTypes&&e.dirInfo.shareTypes.length>0;this.$el.removeClass("shared icon-public icon-shared"),a?(this.$el.addClass("shared"),-1!==e.dirInfo.shareTypes.indexOf(OC.Share.SHARE_TYPE_LINK)?this.$el.addClass("icon-public"):this.$el.addClass("icon-shared")):this.$el.addClass("icon-shared"),this.$el.show(),this.delegateEvents()}return this},_onClick:function(e){e.preventDefault(),e.stopPropagation();var a=new OCA.Files.FileInfoModel(this._dirInfo),r=this;a.on("change",(function(){r.render({dirInfo:r._dirInfo})}));var t=a.attributes.path+"/"+a.attributes.name;OCA.Files.Sidebar.open(t),OCA.Files.Sidebar.setActiveTab("sharing")}});OCA.Sharing.ShareBreadCrumbView=e}()},89216:function(e,a,r){"use strict";var t=r(94015),i=r.n(t),n=r(23645),s=r.n(n)()(i());s.push([e.id,"div.crumb span.icon-shared,div.crumb span.icon-public{display:inline-block;cursor:pointer;opacity:.2;margin-right:6px}div.crumb span.icon-shared.shared,div.crumb span.icon-public.shared{opacity:.7}","",{version:3,sources:["webpack://./apps/files_sharing/src/style/sharebreadcrumb.scss"],names:[],mappings:"AAsBA,sDAEC,oBAAA,CACA,cAAA,CACA,UAAA,CACA,gBAAA,CAGD,oEAEC,UAAA",sourcesContent:["/**\n * @copyright 2016 Christoph Wurst <christoph@winzerhof-wurst.at>\n *\n * @author 2016 Christoph Wurst <christoph@winzerhof-wurst.at>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program.  If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\ndiv.crumb span.icon-shared,\ndiv.crumb span.icon-public {\n\tdisplay: inline-block;\n\tcursor: pointer;\n\topacity: 0.2;\n\tmargin-right: 6px;\n}\n\ndiv.crumb span.icon-shared.shared,\ndiv.crumb span.icon-public.shared {\n\topacity: 0.7;\n}\n"],sourceRoot:""}]),a.Z=s}},r={};function i(e){var t=r[e];if(void 0!==t)return t.exports;var n=r[e]={id:e,loaded:!1,exports:{}};return a[e].call(n.exports,n,n.exports,i),n.loaded=!0,n.exports}i.m=a,i.amdD=function(){throw new Error("define cannot be used indirect")},i.amdO={},e=[],i.O=function(a,r,t,n){if(!r){var s=1/0;for(h=0;h<e.length;h++){r=e[h][0],t=e[h][1],n=e[h][2];for(var o=!0,l=0;l<r.length;l++)(!1&n||s>=n)&&Object.keys(i.O).every((function(e){return i.O[e](r[l])}))?r.splice(l--,1):(o=!1,n<s&&(s=n));if(o){e.splice(h--,1);var d=t();void 0!==d&&(a=d)}}return a}n=n||0;for(var h=e.length;h>0&&e[h-1][2]>n;h--)e[h]=e[h-1];e[h]=[r,t,n]},i.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(a,{a:a}),a},i.d=function(e,a){for(var r in a)i.o(a,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},i.j=200,function(){var e={200:0,438:0};i.O.j=function(a){return 0===e[a]};var a=function(a,r){var t,n,s=r[0],o=r[1],l=r[2],d=0;for(t in o)i.o(o,t)&&(i.m[t]=o[t]);if(l)var h=l(i);for(a&&a(r);d<s.length;d++)n=s[d],i.o(e,n)&&e[n]&&e[n][0](),e[s[d]]=0;return i.O(h)},r=self.webpackChunknextcloud=self.webpackChunknextcloud||[];r.forEach(a.bind(null,0)),r.push=a.bind(null,r.push.bind(r))}();var n=i.O(void 0,[874],(function(){return i(20339)}));n=i.O(n)}();
//# sourceMappingURL=files_sharing-additionalScripts.js.map?v=8c0668322ad11efa7b2f