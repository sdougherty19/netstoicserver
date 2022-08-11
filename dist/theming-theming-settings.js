/*! For license information please see theming-theming-settings.js.LICENSE.txt */
!function(){"use strict";var n,e={84624:function(n,e,i){var r=i(20144),a=i(79753),o=i(16453),s=i(4820),c=i(67776),l=i.n(c),d=i(7826),u={name:"ItemPreview",components:{CheckboxRadioSwitch:i.n(d)()},props:{enforced:{type:Boolean,default:!1},selected:{type:Boolean,default:!1},theme:{type:Object,required:!0},type:{type:String,default:""},unique:{type:Boolean,default:!1}},computed:{switchType:function(){return this.unique?"switch":"radio"},name:function(){return this.unique?null:this.type},img:function(){return(0,a.generateFilePath)("theming","img",this.theme.id+".jpg")},checked:{get:function(){return this.selected},set:function(n){console.debug("Selecting theme",this.theme,n),this.unique?this.$emit("change",{enabled:!0===n,id:this.theme.id}):this.$emit("change",{enabled:!0,id:this.theme.id})}}},methods:{onToggle:function(){"radio"!==this.switchType?this.checked=!this.checked:this.checked=!0}}},h=i(93379),m=i.n(h),p=i(7795),A=i.n(p),f=i(90569),g=i.n(f),v=i(3565),C=i.n(v),b=i(19216),w=i.n(b),_=i(44589),y=i.n(_),x=i(40042),k={};k.styleTagTransform=y(),k.setAttributes=C(),k.insert=g().bind(null,"head"),k.domAPI=A(),k.insertStyleElement=w(),m()(x.Z,k),x.Z&&x.Z.locals&&x.Z.locals;var T=i(51900),B=(0,T.Z)(u,(function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"theming__preview",class:"theming__preview--"+n.theme.id},[t("div",{staticClass:"theming__preview-image",style:{backgroundImage:"url("+n.img+")"},on:{click:n.onToggle}}),n._v(" "),t("div",{staticClass:"theming__preview-description"},[t("h3",[n._v(n._s(n.theme.title))]),n._v(" "),t("p",[n._v(n._s(n.theme.description))]),n._v(" "),n.enforced?t("span",{staticClass:"theming__preview-warning",attrs:{role:"note"}},[n._v("\n\t\t\t"+n._s(n.t("theming","Theme selection is enforced"))+"\n\t\t")]):n._e(),n._v(" "),t("CheckboxRadioSwitch",{staticClass:"theming__preview-toggle",attrs:{checked:n.checked,disabled:n.enforced,name:n.name,type:n.switchType},on:{"update:checked":function(e){n.checked=e}}},[n._v("\n\t\t\t"+n._s(n.theme.enableLabel)+"\n\t\t")])],1)])}),[],!1,null,"15aca3e8",null).exports;function E(n,e,t,i,r,a,o){try{var s=n[a](o),c=s.value}catch(n){return void t(n)}s.done?e(c):Promise.resolve(c).then(i,r)}var I=(0,o.loadState)("theming","themes",[]),O=(0,o.loadState)("theming","enforceTheme","");console.debug("Available themes",I);var P={name:"UserThemes",components:{ItemPreview:B,SettingsSection:l()},data:function(){return{availableThemes:I,enforceTheme:O}},computed:{themes:function(){return this.availableThemes.filter((function(n){return 1===n.type}))},fonts:function(){return this.availableThemes.filter((function(n){return 2===n.type}))},selectedTheme:function(){return this.themes.find((function(n){return!0===n.enabled}))||this.themes[0]},description:function(){return t("theming","Universal access is very important to us. We follow web standards and check to make everything usable also without mouse, and assistive software such as screenreaders. We aim to be compliant with the {guidelines}Web Content Accessibility Guidelines{linkend} 2.1 on AA level, with the high contrast theme even on AAA level.").replace("{guidelines}",this.guidelinesLink).replace("{linkend}","</a>")},guidelinesLink:function(){return'<a target="_blank" href="https://www.w3.org/WAI/standards-guidelines/wcag/" rel="noreferrer nofollow">'},descriptionDetail:function(){return t("theming","If you find any issues, do not hesitate to report them on {issuetracker}our issue tracker{linkend}. And if you want to get involved, come join {designteam}our design team{linkend}!").replace("{issuetracker}",this.issuetrackerLink).replace("{designteam}",this.designteamLink).replace(/\{linkend\}/g,"</a>")},issuetrackerLink:function(){return'<a target="_blank" href="https://github.com/nextcloud/server/issues/" rel="noreferrer nofollow">'},designteamLink:function(){return'<a target="_blank" href="https://nextcloud.com/design" rel="noreferrer nofollow">'}},methods:{changeTheme:function(n){var e=n.enabled,t=n.id;this.themes.forEach((function(n){n.id===t&&e?n.enabled=!0:n.enabled=!1})),this.updateBodyAttributes(),this.selectItem(e,t)},changeFont:function(n){var e=n.enabled,t=n.id;this.fonts.forEach((function(n){n.id===t&&e?n.enabled=!0:n.enabled=!1})),this.updateBodyAttributes(),this.selectItem(e,t)},updateBodyAttributes:function(){var n=this.themes.filter((function(n){return!0===n.enabled})).map((function(n){return n.id}));this.themes.forEach((function(n){document.body.toggleAttribute("data-theme-".concat(n.id),n.enabled)})),document.body.setAttribute("data-themes",n.join(","))},selectItem:function(n,e){return(i=regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(i.prev=0,!n){i.next=6;break}return i.next=4,(0,s.default)({url:(0,a.generateOcsUrl)("apps/theming/api/v1/theme/{themeId}/enable",{themeId:e}),method:"PUT"});case 4:i.next=8;break;case 6:return i.next=8,(0,s.default)({url:(0,a.generateOcsUrl)("apps/theming/api/v1/theme/{themeId}",{themeId:e}),method:"DELETE"});case 8:i.next=14;break;case 10:i.prev=10,i.t0=i.catch(0),console.error(i.t0,i.t0.response),OC.Notification.showTemporary(t("theming",i.t0.response.data.ocs.meta.message+". Unable to apply the setting."));case 14:case"end":return i.stop()}}),i,null,[[0,10]])})),function(){var n=this,e=arguments;return new Promise((function(t,r){var a=i.apply(n,e);function o(n){E(a,t,r,o,s,"next",n)}function s(n){E(a,t,r,o,s,"throw",n)}o(void 0)}))})();var i}}},S=P,j=i(16814),q={};q.styleTagTransform=y(),q.setAttributes=C(),q.insert=g().bind(null,"head"),q.domAPI=A(),q.insertStyleElement=w(),m()(j.Z,q),j.Z&&j.Z.locals&&j.Z.locals;var Z=(0,T.Z)(S,(function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("SettingsSection",{staticClass:"theming",attrs:{title:n.t("themes","Appearance and accessibility")}},[t("p",{domProps:{innerHTML:n._s(n.description)}}),n._v(" "),t("p",{domProps:{innerHTML:n._s(n.descriptionDetail)}}),n._v(" "),t("div",{staticClass:"theming__preview-list"},n._l(n.themes,(function(e){return t("ItemPreview",{key:e.id,attrs:{enforced:e.id===n.enforceTheme,selected:n.selectedTheme.id===e.id,theme:e,unique:1===n.themes.length,type:"theme"},on:{change:n.changeTheme}})})),1),n._v(" "),t("div",{staticClass:"theming__preview-list"},n._l(n.fonts,(function(e){return t("ItemPreview",{key:e.id,attrs:{selected:e.enabled,theme:e,unique:1===n.fonts.length,type:"font"},on:{change:n.changeFont}})})),1)])}),[],!1,null,"6339bca7",null).exports;r.default.prototype.OC=OC,r.default.prototype.t=t,(new(r.default.extend(Z))).$mount("#theming")},16814:function(n,e,t){var i=t(87537),r=t.n(i),a=t(23645),o=t.n(a)()(r());o.push([n.id,".theming p[data-v-6339bca7]{max-width:800px}.theming[data-v-6339bca7] a{font-weight:bold}.theming[data-v-6339bca7] a:hover,.theming[data-v-6339bca7] a:focus{text-decoration:underline}.theming__preview-list[data-v-6339bca7]{--gap: 30px;display:grid;margin-top:var(--gap);column-gap:var(--gap);row-gap:var(--gap);grid-template-columns:1fr 1fr}@media(max-width: 1440px){.theming__preview-list[data-v-6339bca7]{display:flex;flex-direction:column}}","",{version:3,sources:["webpack://./apps/theming/src/UserThemes.vue"],names:[],mappings:"AAsKC,4BACC,eAAA,CAID,4BACC,gBAAA,CAEA,oEAEC,yBAAA,CAIF,wCACC,WAAA,CAEA,YAAA,CACA,qBAAA,CACA,qBAAA,CACA,kBAAA,CACA,6BAAA,CAIF,0BACC,wCACC,YAAA,CACA,qBAAA,CAAA",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.theming {\n\t// Limit width of settings sections for readability\n\tp {\n\t\tmax-width: 800px;\n\t}\n\n\t// Proper highlight for links and focus feedback\n\t&::v-deep a {\n\t\tfont-weight: bold;\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\ttext-decoration: underline;\n\t\t}\n\t}\n\n\t&__preview-list {\n\t\t--gap: 30px;\n\n\t\tdisplay: grid;\n\t\tmargin-top: var(--gap);\n\t\tcolumn-gap: var(--gap);\n\t\trow-gap: var(--gap);\n\t\tgrid-template-columns: 1fr 1fr;\n\t}\n}\n\n@media (max-width: 1440px) {\n\t.theming__preview-list {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t}\n}\n\n"],sourceRoot:""}]),e.Z=o},40042:function(n,e,t){var i=t(87537),r=t.n(i),a=t(23645),o=t.n(a)()(r());o.push([n.id,".theming__preview[data-v-15aca3e8]{--ratio: 16;position:relative;display:flex;justify-content:flex-start;max-width:800px}.theming__preview[data-v-15aca3e8],.theming__preview *[data-v-15aca3e8]{user-select:none}.theming__preview-image[data-v-15aca3e8]{flex-basis:calc(16px*var(--ratio));flex-shrink:0;height:calc(10px*var(--ratio));margin-right:var(--gap);cursor:pointer;border-radius:var(--border-radius);background-repeat:no-repeat;background-position:top left;background-size:cover}.theming__preview-description[data-v-15aca3e8]{display:flex;flex-direction:column}.theming__preview-description label[data-v-15aca3e8]{padding:12px 0}.theming__preview--default[data-v-15aca3e8]{grid-column:span 2}.theming__preview-warning[data-v-15aca3e8]{color:var(--color-warning)}@media(max-width: 682.6666666667px){.theming__preview[data-v-15aca3e8]{flex-direction:column}.theming__preview-image[data-v-15aca3e8]{margin:0}}","",{version:3,sources:["webpack://./apps/theming/src/components/ItemPreview.vue"],names:[],mappings:"AAiGA,mCAEC,WAAA,CAEA,iBAAA,CACA,YAAA,CACA,0BAAA,CACA,eAAA,CAEA,wEAEC,gBAAA,CAGD,yCACC,kCAAA,CACA,aAAA,CACA,8BAAA,CACA,uBAAA,CACA,cAAA,CACA,kCAAA,CACA,2BAAA,CACA,4BAAA,CACA,qBAAA,CAGD,+CACC,YAAA,CACA,qBAAA,CAEA,qDACC,cAAA,CAIF,4CACC,kBAAA,CAGD,2CACC,0BAAA,CAIF,oCACC,mCACC,qBAAA,CAEA,yCACC,QAAA,CAAA",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.theming__preview {\n\t// We make previews on 16/10 screens\n\t--ratio: 16;\n\n\tposition: relative;\n\tdisplay: flex;\n\tjustify-content: flex-start;\n\tmax-width: 800px;\n\n\t&,\n\t* {\n\t\tuser-select: none;\n\t}\n\n\t&-image {\n\t\tflex-basis: calc(16px * var(--ratio));\n\t\tflex-shrink: 0;\n\t\theight: calc(10px * var(--ratio));\n\t\tmargin-right: var(--gap);\n\t\tcursor: pointer;\n\t\tborder-radius: var(--border-radius);\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-position: top left;\n\t\tbackground-size: cover;\n\t}\n\n\t&-description {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\n\t\tlabel {\n\t\t\tpadding: 12px 0;\n\t\t}\n\t}\n\n\t&--default {\n\t\tgrid-column: span 2;\n\t}\n\n\t&-warning {\n\t\tcolor: var(--color-warning);\n\t}\n}\n\n@media (max-width: (1024px / 1.5)) {\n\t.theming__preview {\n\t\tflex-direction: column;\n\n\t\t&-image {\n\t\t\tmargin: 0;\n\t\t}\n\t}\n}\n\n"],sourceRoot:""}]),e.Z=o}},i={};function r(n){var t=i[n];if(void 0!==t)return t.exports;var a=i[n]={id:n,loaded:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=e,r.amdD=function(){throw new Error("define cannot be used indirect")},r.amdO={},n=[],r.O=function(e,t,i,a){if(!t){var o=1/0;for(d=0;d<n.length;d++){t=n[d][0],i=n[d][1],a=n[d][2];for(var s=!0,c=0;c<t.length;c++)(!1&a||o>=a)&&Object.keys(r.O).every((function(n){return r.O[n](t[c])}))?t.splice(c--,1):(s=!1,a<o&&(o=a));if(s){n.splice(d--,1);var l=i();void 0!==l&&(e=l)}}return e}a=a||0;for(var d=n.length;d>0&&n[d-1][2]>a;d--)n[d]=n[d-1];n[d]=[t,i,a]},r.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(e,{a:e}),e},r.d=function(n,e){for(var t in e)r.o(e,t)&&!r.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.nmd=function(n){return n.paths=[],n.children||(n.children=[]),n},r.j=6755,function(){r.b=document.baseURI||self.location.href;var n={6755:0};r.O.j=function(e){return 0===n[e]};var e=function(e,t){var i,a,o=t[0],s=t[1],c=t[2],l=0;if(o.some((function(e){return 0!==n[e]}))){for(i in s)r.o(s,i)&&(r.m[i]=s[i]);if(c)var d=c(r)}for(e&&e(t);l<o.length;l++)a=o[l],r.o(n,a)&&n[a]&&n[a][0](),n[a]=0;return r.O(d)},t=self.webpackChunknextcloud=self.webpackChunknextcloud||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))}(),r.nc=void 0;var a=r.O(void 0,[7874],(function(){return r(84624)}));a=r.O(a)}();
//# sourceMappingURL=theming-theming-settings.js.map?v=8e248cadd21f02fa6070