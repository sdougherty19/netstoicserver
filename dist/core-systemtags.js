/*! For license information please see core-systemtags.js.LICENSE.txt */
!function(){var e,n={16558:function(e,n,s){"use strict";var i=s(95573),l=s.n(i),o=s(64492);!function(e){e.SystemTags={getDescriptiveTag:function(e){if(o.isUndefined(e.name)&&!o.isUndefined(e.toJSON)&&(e=e.toJSON()),o.isUndefined(e.name))return $("<span>").addClass("non-existing-tag").text(t("core","Non-existing tag #{tag}",{tag:e}));var n,s=$("<span>");return s.append(l()(e.name)),e.userAssignable||(n=t("core","restricted")),e.userVisible||(n=t("core","invisible")),n&&s.append($("<em>").text(" ("+n+")")),s}}}(OC),s(53076);var a=s(79753),c=s(64492);!function(e){var t=e.Backbone.Collection.extend({sync:e.Backbone.davSync,usePUT:!0,_objectId:null,_objectType:"files",model:e.SystemTags.SystemTagModel,url:function(){return(0,a.generateRemoteUrl)("dav")+"/systemtags-relations/"+this._objectType+"/"+this._objectId},setObjectId:function(e){this._objectId=e},setObjectType:function(e){this._objectType=e},initialize:function(e,t){t=t||{},c.isUndefined(t.objectId)||(this._objectId=t.objectId),c.isUndefined(t.objectType)||(this._objectType=t.objectType)},getTagIds:function(){return this.map((function(e){return e.id}))}});e.SystemTags=e.SystemTags||{},e.SystemTags.SystemTagsMappingCollection=t}(OC),s(75026);var r=s(69318),u=s.n(r),d=s(25759),p=s.n(d),m=s(82188),h=s.n(m),g=s(64492);!function(e){var n=e.Backbone.View.extend({_rendered:!1,_newTag:null,_lastUsedTags:[],className:"systemTagsInputFieldContainer",template:function(e){return'<input class="systemTagsInputField" type="hidden" name="tags" value=""/>'},initialize:function(t){t=t||{},this._multiple=!!t.multiple,this._allowActions=g.isUndefined(t.allowActions)||!!t.allowActions,this._allowCreate=g.isUndefined(t.allowCreate)||!!t.allowCreate,this._isAdmin=!!t.isAdmin,g.isFunction(t.initSelection)&&(this._initSelection=t.initSelection),this.collection=t.collection||e.SystemTags.collection;var n=this;this.collection.on("change:name remove",(function(){g.defer(n._refreshSelection)})),g.defer(g.bind(this._getLastUsedTags,this)),g.bindAll(this,"_refreshSelection","_onClickRenameTag","_onClickDeleteTag","_onSelectTag","_onDeselectTag","_onSubmitRenameTag")},_getLastUsedTags:function(){var t=this;$.ajax({type:"GET",url:e.generateUrl("/apps/systemtags/lastused"),success:function(e){t._lastUsedTags=e}})},_refreshSelection:function(){this.$tagsField.select2("val",this.$tagsField.val())},_onClickRenameTag:function(e){var n=$(e.target).closest(".systemtags-item"),s=n.attr("data-id"),i=this.collection.get(s).get("name"),l=$(p()({cid:this.cid,name:i,deleteTooltip:t("core","Delete"),renameLabel:t("core","Rename"),isAdmin:this._isAdmin}));return n.find(".label").after(l),n.find(".label, .systemtags-actions").addClass("hidden"),n.closest(".select2-result").addClass("has-form"),l.find("[title]").tooltip({placement:"bottom",container:"body"}),l.find("input").focus().selectRange(0,i.length),!1},_onSubmitRenameTag:function(e){e.preventDefault();var t=$(e.target),n=t.closest(".systemtags-item"),s=n.attr("data-id"),i=this.collection.get(s),l=$(e.target).find("input").val().trim();l&&l!==i.get("name")&&(i.save({name:l}),n.find(".label").text(l)),n.find(".label, .systemtags-actions").removeClass("hidden"),t.remove(),n.closest(".select2-result").removeClass("has-form")},_onClickDeleteTag:function(e){var t=$(e.target).closest(".systemtags-item"),n=t.attr("data-id");return this.collection.get(n).destroy(),$(e.target).tooltip("hide"),t.closest(".select2-result").remove(),!1},_addToSelect2Selection:function(e){var t=this.$tagsField.select2("data");t.push(e),this.$tagsField.select2("data",t)},_onSelectTag:function(e){var t,n=this;if(e.object&&e.object.isNew)return t=this.collection.create({name:e.object.name.trim(),userVisible:!0,userAssignable:!0,canAssign:!0},{success:function(e){n._addToSelect2Selection(e.toJSON()),n._lastUsedTags.unshift(e.id),n.trigger("select",e)},error:function(t,s){409===s.status&&(n.collection.reset(),n.collection.fetch({success:function(t){var s=t.where({name:e.object.name.trim(),userVisible:!0,userAssignable:!0});s.length&&(s=s[0],n._addToSelect2Selection(s.toJSON()),n.trigger("select",s))}}))}}),this.$tagsField.select2("close"),e.preventDefault(),!1;t=this.collection.get(e.object.id),this._lastUsedTags.unshift(t.id),this._newTag=null,this.trigger("select",t)},_onDeselectTag:function(e){this.trigger("deselect",e.choice.id)},_queryTagsAutocomplete:function(e){var t=this;this.collection.fetch({success:function(n){var s=n.filterByName(e.term.trim());t._isAdmin||(s=g.filter(s,(function(e){return e.get("canAssign")}))),e.callback({results:g.invoke(s,"toJSON")})}})},_preventDefault:function(e){e.stopPropagation()},_formatDropDownResult:function(n){return u()(g.extend({renameTooltip:t("core","Rename"),allowActions:this._allowActions,tagMarkup:this._isAdmin?e.SystemTags.getDescriptiveTag(n)[0].innerHTML:null,isAdmin:this._isAdmin},n))},_formatSelection:function(t){return h()(g.extend({tagMarkup:this._isAdmin?e.SystemTags.getDescriptiveTag(t)[0].innerHTML:null,isAdmin:this._isAdmin},t))},_createSearchChoice:function(e){if(e=e.trim(),!this.collection.filter((function(t){return t.get("name")===e})).length)return this._newTag?this._newTag.name=e:this._newTag={id:-1,name:e,userAssignable:!0,userVisible:!0,canAssign:!0,isNew:!0},this._newTag},_initSelection:function(e,t){var n=this,s=$(e).val().split(",");function i(e){var t=e.toJSON();return n._isAdmin||t.canAssign||(t.locked=!0),t}this.collection.fetch({success:function(){t(function(e){var t=n.collection.filter((function(t){return e.indexOf(t.id)>=0&&(n._isAdmin||t.get("userVisible"))}));return g.map(t,i)}(s))}})},render:function(){var n=this;this.$el.html(this.template()),this.$el.find("[title]").tooltip({placement:"bottom"}),this.$tagsField=this.$el.find("[name=tags]"),this.$tagsField.select2({placeholder:t("core","Collaborative tags"),containerCssClass:"systemtags-select2-container",dropdownCssClass:"systemtags-select2-dropdown",closeOnSelect:!1,allowClear:!1,multiple:this._multiple,toggleSelect:this._multiple,query:g.bind(this._queryTagsAutocomplete,this),id:function(e){return e.id},initSelection:g.bind(this._initSelection,this),formatResult:g.bind(this._formatDropDownResult,this),formatSelection:g.bind(this._formatSelection,this),createSearchChoice:this._allowCreate?g.bind(this._createSearchChoice,this):void 0,sortResults:function(t){var s=g.pluck(n.$tagsField.select2("data"),"id");return t.sort((function(t,i){var l=s.indexOf(t.id)>=0,o=s.indexOf(i.id)>=0;if(l===o){var a=n._lastUsedTags.indexOf(t.id),c=n._lastUsedTags.indexOf(i.id);return a!==c?-1===c?-1:-1===a?1:a<c?-1:1:e.Util.naturalSortCompare(t.name,i.name)}return l&&!o?-1:1})),t},formatNoMatches:function(){return t("core","No tags found")}}).on("select2-selecting",this._onSelectTag).on("select2-removing",this._onDeselectTag);var s=this.$tagsField.select2("dropdown");s.on("mouseup",".rename",this._onClickRenameTag),s.on("mouseup",".delete",this._onClickDeleteTag),s.on("mouseup",".select2-result-selectable.has-form",this._preventDefault),s.on("submit",".systemtags-rename-form",this._onSubmitRenameTag),this.delegateEvents()},remove:function(){this.$tagsField&&this.$tagsField.select2("destroy")},getValues:function(){this.$tagsField.select2("val")},setValues:function(e){this.$tagsField.select2("val",e)},setData:function(e){this.$tagsField.select2("data",e)}});e.SystemTags=e.SystemTags||{},e.SystemTags.SystemTagsInputField=n}(OC);var f=s(93379),A=s.n(f),y=s(9529);A()(y.Z,{insert:"head",singleton:!1}),y.Z.locals},53076:function(e,t,n){var s=n(64492);!function(e){s.extend(e.Files.Client,{PROPERTY_FILEID:"{"+e.Files.Client.NS_OWNCLOUD+"}id",PROPERTY_CAN_ASSIGN:"{"+e.Files.Client.NS_OWNCLOUD+"}can-assign",PROPERTY_DISPLAYNAME:"{"+e.Files.Client.NS_OWNCLOUD+"}display-name",PROPERTY_USERVISIBLE:"{"+e.Files.Client.NS_OWNCLOUD+"}user-visible",PROPERTY_USERASSIGNABLE:"{"+e.Files.Client.NS_OWNCLOUD+"}user-assignable"});var t=e.Backbone.Model.extend({sync:e.Backbone.davSync,defaults:{userVisible:!0,userAssignable:!0,canAssign:!0},davProperties:{id:e.Files.Client.PROPERTY_FILEID,name:e.Files.Client.PROPERTY_DISPLAYNAME,userVisible:e.Files.Client.PROPERTY_USERVISIBLE,userAssignable:e.Files.Client.PROPERTY_USERASSIGNABLE,canAssign:e.Files.Client.PROPERTY_CAN_ASSIGN},parse:function(e){return{id:e.id,name:e.name,userVisible:!0===e.userVisible||"true"===e.userVisible,userAssignable:!0===e.userAssignable||"true"===e.userAssignable,canAssign:!0===e.canAssign||"true"===e.canAssign}}});e.SystemTags=e.SystemTags||{},e.SystemTags.SystemTagModel=t}(OC)},75026:function(e,t,n){var s=n(64492);!function(e){var t=e.Backbone.Collection.extend({sync:e.Backbone.davSync,model:e.SystemTags.SystemTagModel,url:function(){return e.linkToRemote("dav")+"/systemtags/"},filterByName:function(e){return this.filter((function(t){return function(e,t){return e.get("name").substr(0,t.length).toLowerCase()===t.toLowerCase()}(t,e)}))},reset:function(){return this.fetched=!1,e.Backbone.Collection.prototype.reset.apply(this,arguments)},fetch:function(t){var n=this;if(t=t||{},this.fetched||t.force)return t.success&&t.success(this,null,t),this.trigger("sync",this,null,t),Promise.resolve();var i=t.success;return(t=s.extend({},t)).success=function(){if(n.fetched=!0,i)return i.apply(this,arguments)},e.Backbone.Collection.prototype.fetch.call(this,t)}});e.SystemTags=e.SystemTags||{},e.SystemTags.SystemTagsCollection=t,e.SystemTags.collection=new e.SystemTags.SystemTagsCollection}(OC)},9529:function(e,t,n){"use strict";var s=n(94015),i=n.n(s),l=n(23645),o=n.n(l)()(i());o.push([e.id,".systemtags-select2-dropdown .select2-result-label .checkmark{visibility:hidden;margin-left:-5px;margin-right:5px;padding:4px}.systemtags-select2-dropdown .select2-result-label .new-item .systemtags-actions{display:none}.systemtags-select2-dropdown .select2-selected .select2-result-label .checkmark{visibility:visible}.systemtags-select2-dropdown .select2-result-label .icon{display:inline-block;opacity:.5}.systemtags-select2-dropdown .select2-result-label .icon.rename{padding:4px}.systemtags-select2-dropdown .systemtags-actions{position:absolute;right:5px}.systemtags-select2-dropdown .systemtags-rename-form{display:inline-block;width:calc(100% - 20px);top:-6px;position:relative}.systemtags-select2-dropdown .systemtags-rename-form input{display:inline-block;height:30px;width:calc(100% - 40px)}.systemtags-select2-dropdown .label{width:85%;display:inline-block;overflow:hidden;text-overflow:ellipsis}.systemtags-select2-dropdown .label.hidden{display:none}.systemtags-select2-dropdown span{line-height:25px}.systemtags-select2-dropdown .systemtags-item{display:inline-block;height:25px;width:100%}.systemtags-select2-dropdown .select2-result-label{height:25px}.systemTagsInfoView,.systemtags-select2-container{width:100%}.systemTagsInfoView .select2-choices,.systemtags-select2-container .select2-choices{flex-wrap:nowrap !important;max-height:44px}.systemTagsInfoView .select2-choices .select2-search-choice.select2-locked .label,.systemtags-select2-container .select2-choices .select2-search-choice.select2-locked .label{opacity:.5}#select2-drop.systemtags-select2-dropdown .select2-results li.select2-result{padding:5px}","",{version:3,sources:["webpack://./core/css/systemtags.scss"],names:[],mappings:"AAcE,8DACC,iBAAA,CACA,gBAAA,CACA,gBAAA,CACA,WAAA,CAED,iFACC,YAAA,CAGF,gFACC,kBAAA,CAED,yDACC,oBAAA,CACA,UAAA,CACA,gEACC,WAAA,CAGF,iDACC,iBAAA,CACA,SAAA,CAED,qDACC,oBAAA,CACA,uBAAA,CACA,QAAA,CACA,iBAAA,CACA,2DACC,oBAAA,CACA,WAAA,CACA,uBAAA,CAGF,oCACC,SAAA,CACA,oBAAA,CACA,eAAA,CACA,sBAAA,CACA,2CACC,YAAA,CAGF,kCACC,gBAAA,CAED,8CACC,oBAAA,CACA,WAAA,CACA,UAAA,CAED,mDACC,WAAA,CAIF,kDAEC,UAAA,CAEA,oFACC,2BAAA,CACA,eAAA,CAGD,8KACC,UAAA,CAIF,6EACC,WAAA",sourcesContent:["/**\n * @copyright Copyright (c) 2016, John Molakvoæ <skjnldsv@protonmail.com>\n * @copyright Copyright (c) 2016, Robin Appelman <robin@icewind.nl>\n * @copyright Copyright (c) 2016, Jan-Christoph Borchardt <hey@jancborchardt.net>\n * @copyright Copyright (c) 2016, Vincent Petry <pvince81@owncloud.com>\n * @copyright Copyright (c) 2016, Erik Pellikka <erik@pellikka.org>\n * @copyright Copyright (c) 2015, Vincent Petry <pvince81@owncloud.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n */\n\n.systemtags-select2-dropdown {\n\t.select2-result-label {\n\t\t.checkmark {\n\t\t\tvisibility: hidden;\n\t\t\tmargin-left: -5px;\n\t\t\tmargin-right: 5px;\n\t\t\tpadding: 4px;\n\t\t}\n\t\t.new-item .systemtags-actions {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\t.select2-selected .select2-result-label .checkmark {\n\t\tvisibility: visible;\n\t}\n\t.select2-result-label .icon {\n\t\tdisplay: inline-block;\n\t\topacity: .5;\n\t\t&.rename {\n\t\t\tpadding: 4px;\n\t\t}\n\t}\n\t.systemtags-actions {\n\t\tposition: absolute;\n\t\tright: 5px;\n\t}\n\t.systemtags-rename-form {\n\t\tdisplay: inline-block;\n\t\twidth: calc(100% - 20px);\n\t\ttop: -6px;\n\t\tposition: relative;\n\t\tinput {\n\t\t\tdisplay: inline-block;\n\t\t\theight: 30px;\n\t\t\twidth: calc(100% - 40px);\n\t\t}\n\t}\n\t.label {\n\t\twidth: 85%;\n\t\tdisplay: inline-block;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\t&.hidden {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\tspan {\n\t\tline-height: 25px;\n\t}\n\t.systemtags-item {\n\t\tdisplay: inline-block;\n\t\theight: 25px;\n\t\twidth: 100%;\n\t}\n\t.select2-result-label {\n\t\theight: 25px;\n\t}\n}\n\n.systemTagsInfoView,\n.systemtags-select2-container {\n\twidth: 100%;\n\n\t.select2-choices {\n\t\tflex-wrap: nowrap !important;\n\t\tmax-height: 44px;\n\t}\n\n\t.select2-choices .select2-search-choice.select2-locked .label {\n\t\topacity: 0.5;\n\t}\n}\n\n#select2-drop.systemtags-select2-dropdown .select2-results li.select2-result {\n\tpadding: 5px;\n}\n"],sourceRoot:""}]),t.Z=o},69318:function(e,t,n){var s=n(40202);e.exports=(s.default||s).template({1:function(e,t,n,s,i){return" new-item"},3:function(e,t,n,s,i){var l,o,a=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'\t\t<span class="label">'+(null!=(l="function"==typeof(o=null!=(o=a(n,"tagMarkup")||(null!=t?a(t,"tagMarkup"):t))?o:e.hooks.helperMissing)?o.call(null!=t?t:e.nullContext||{},{name:"tagMarkup",hash:{},data:i,loc:{start:{line:4,column:22},end:{line:4,column:37}}}):o)?l:"")+"</span>\n"},5:function(e,t,n,s,i){var l,o=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'\t\t<span class="label">'+e.escapeExpression("function"==typeof(l=null!=(l=o(n,"name")||(null!=t?o(t,"name"):t))?l:e.hooks.helperMissing)?l.call(null!=t?t:e.nullContext||{},{name:"name",hash:{},data:i,loc:{start:{line:6,column:22},end:{line:6,column:30}}}):l)+"</span>\n"},7:function(e,t,n,s,i){var l,o=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'\t\t<span class="systemtags-actions">\n\t\t\t<a href="#" class="rename icon icon-rename" title="'+e.escapeExpression("function"==typeof(l=null!=(l=o(n,"renameTooltip")||(null!=t?o(t,"renameTooltip"):t))?l:e.hooks.helperMissing)?l.call(null!=t?t:e.nullContext||{},{name:"renameTooltip",hash:{},data:i,loc:{start:{line:10,column:54},end:{line:10,column:71}}}):l)+'"></a>\n\t\t</span>\n'},compiler:[8,">= 4.3.0"],main:function(e,t,n,s,i){var l,o,a,c=null!=t?t:e.nullContext||{},r=e.hooks.helperMissing,u="function",d=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]},p='<span class="systemtags-item'+(null!=(l=d(n,"if").call(c,null!=t?d(t,"isNew"):t,{name:"if",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i,loc:{start:{line:1,column:28},end:{line:1,column:57}}}))?l:"")+'" data-id="'+e.escapeExpression(typeof(o=null!=(o=d(n,"id")||(null!=t?d(t,"id"):t))?o:r)===u?o.call(c,{name:"id",hash:{},data:i,loc:{start:{line:1,column:68},end:{line:1,column:74}}}):o)+'">\n<span class="checkmark icon icon-checkmark"></span>\n'+(null!=(l=d(n,"if").call(c,null!=t?d(t,"isAdmin"):t,{name:"if",hash:{},fn:e.program(3,i,0),inverse:e.program(5,i,0),data:i,loc:{start:{line:3,column:1},end:{line:7,column:8}}}))?l:"");return o=null!=(o=d(n,"allowActions")||(null!=t?d(t,"allowActions"):t))?o:r,a={name:"allowActions",hash:{},fn:e.program(7,i,0),inverse:e.noop,data:i,loc:{start:{line:8,column:1},end:{line:12,column:18}}},l=typeof o===u?o.call(c,a):o,d(n,"allowActions")||(l=e.hooks.blockHelperMissing.call(t,l,a)),null!=l&&(p+=l),p+"</span>\n"},useData:!0})},25759:function(e,t,n){var s=n(40202);e.exports=(s.default||s).template({1:function(e,t,n,s,i){var l,o=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'\t\t<a href="#" class="delete icon icon-delete" title="'+e.escapeExpression("function"==typeof(l=null!=(l=o(n,"deleteTooltip")||(null!=t?o(t,"deleteTooltip"):t))?l:e.hooks.helperMissing)?l.call(null!=t?t:e.nullContext||{},{name:"deleteTooltip",hash:{},data:i,loc:{start:{line:5,column:53},end:{line:5,column:70}}}):l)+'"></a>\n'},compiler:[8,">= 4.3.0"],main:function(e,t,n,s,i){var l,o,a=null!=t?t:e.nullContext||{},c=e.hooks.helperMissing,r="function",u=e.escapeExpression,d=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'<form class="systemtags-rename-form">\n\t <label class="hidden-visually" for="'+u(typeof(o=null!=(o=d(n,"cid")||(null!=t?d(t,"cid"):t))?o:c)===r?o.call(a,{name:"cid",hash:{},data:i,loc:{start:{line:2,column:38},end:{line:2,column:45}}}):o)+'-rename-input">'+u(typeof(o=null!=(o=d(n,"renameLabel")||(null!=t?d(t,"renameLabel"):t))?o:c)===r?o.call(a,{name:"renameLabel",hash:{},data:i,loc:{start:{line:2,column:60},end:{line:2,column:75}}}):o)+'</label>\n\t<input id="'+u(typeof(o=null!=(o=d(n,"cid")||(null!=t?d(t,"cid"):t))?o:c)===r?o.call(a,{name:"cid",hash:{},data:i,loc:{start:{line:3,column:12},end:{line:3,column:19}}}):o)+'-rename-input" type="text" value="'+u(typeof(o=null!=(o=d(n,"name")||(null!=t?d(t,"name"):t))?o:c)===r?o.call(a,{name:"name",hash:{},data:i,loc:{start:{line:3,column:53},end:{line:3,column:61}}}):o)+'">\n'+(null!=(l=d(n,"if").call(a,null!=t?d(t,"isAdmin"):t,{name:"if",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i,loc:{start:{line:4,column:1},end:{line:6,column:8}}}))?l:"")+"</form>\n"},useData:!0})},82188:function(e,t,n){var s=n(40202);e.exports=(s.default||s).template({1:function(e,t,n,s,i){var l,o,a=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'\t<span class="label">'+(null!=(l="function"==typeof(o=null!=(o=a(n,"tagMarkup")||(null!=t?a(t,"tagMarkup"):t))?o:e.hooks.helperMissing)?o.call(null!=t?t:e.nullContext||{},{name:"tagMarkup",hash:{},data:i,loc:{start:{line:2,column:21},end:{line:2,column:36}}}):o)?l:"")+"</span>\n"},3:function(e,t,n,s,i){var l,o=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'\t<span class="label">'+e.escapeExpression("function"==typeof(l=null!=(l=o(n,"name")||(null!=t?o(t,"name"):t))?l:e.hooks.helperMissing)?l.call(null!=t?t:e.nullContext||{},{name:"name",hash:{},data:i,loc:{start:{line:4,column:21},end:{line:4,column:29}}}):l)+"</span>\n"},compiler:[8,">= 4.3.0"],main:function(e,t,n,s,i){var l,o=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return null!=(l=o(n,"if").call(null!=t?t:e.nullContext||{},null!=t?o(t,"isAdmin"):t,{name:"if",hash:{},fn:e.program(1,i,0),inverse:e.program(3,i,0),data:i,loc:{start:{line:1,column:0},end:{line:5,column:7}}}))?l:""},useData:!0})}},s={};function i(e){var t=s[e];if(void 0!==t)return t.exports;var l=s[e]={id:e,loaded:!1,exports:{}};return n[e].call(l.exports,l,l.exports,i),l.loaded=!0,l.exports}i.m=n,i.amdD=function(){throw new Error("define cannot be used indirect")},i.amdO={},e=[],i.O=function(t,n,s,l){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],s=e[u][1],l=e[u][2];for(var a=!0,c=0;c<n.length;c++)(!1&l||o>=l)&&Object.keys(i.O).every((function(e){return i.O[e](n[c])}))?n.splice(c--,1):(a=!1,l<o&&(o=l));if(a){e.splice(u--,1);var r=s();void 0!==r&&(t=r)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[n,s,l]},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,{a:t}),t},i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},i.j=686,function(){var e={686:0};i.O.j=function(t){return 0===e[t]};var t=function(t,n){var s,l,o=n[0],a=n[1],c=n[2],r=0;for(s in a)i.o(a,s)&&(i.m[s]=a[s]);if(c)var u=c(i);for(t&&t(n);r<o.length;r++)l=o[r],i.o(e,l)&&e[l]&&e[l][0](),e[o[r]]=0;return i.O(u)},n=self.webpackChunknextcloud=self.webpackChunknextcloud||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var l=i.O(void 0,[874],(function(){return i(16558)}));l=i.O(l)}();
//# sourceMappingURL=core-systemtags.js.map?v=d474b22ab1381dabad84