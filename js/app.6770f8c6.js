(function(t){function e(e){for(var a,s,o=e[0],c=e[1],l=e[2],f=0,d=[];f<o.length;f++)s=o[f],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&d.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},i=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},1:function(t,e){},10:function(t,e){},11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},"17a0":function(t,e,n){"use strict";n("39c1")},2:function(t,e){},3:function(t,e){},"39c1":function(t,e,n){},4:function(t,e){},5:function(t,e){},"56d7":function(t,e,n){"use strict";n.r(e);var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-main",[a("v-container",{staticClass:"mt-10",attrs:{fluid:""}},[a("v-row",{staticClass:"mb-4",attrs:{justify:"center"}},[a("div",{staticClass:"text-center"},[a("img",{staticClass:"d-inline-block",attrs:{src:n("9834"),alt:"LetterBomb Icon"}}),a("h1",[t._v("Letterbomb Web")]),a("h3",[t._v("Clientside version of Letterbomb which is statically hosted")])])]),a("v-row",{staticClass:"mb-4",attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"10",md:"4",sm:"8"}},[a("mac-input",{on:{change:t.macChange,finished:t.macFinished}})],1)],1),a("v-row",{staticClass:"mb-2",attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"10",md:"4",sm:"8"}},[a("region-input",{on:{change:t.regionChange}})],1)],1),a("v-row",{staticClass:"mb-4",attrs:{justify:"center"}},[a("v-checkbox",{attrs:{label:"Bundle HackMii Installer"},model:{value:t.bundle,callback:function(e){t.bundle=e},expression:"bundle"}})],1),a("v-row",{attrs:{justify:"center"}},[a("v-btn",{ref:"downloadButton",attrs:{color:"primary",disabled:!t.downloadReady,elevation:"2",loading:t.loading},on:{click:t.downloadZip}},[t._v(" Download Zip ")])],1),t.status?a("v-row",{staticClass:"text-center mt-5",attrs:{justify:"center"}},[t._v(" "+t._s(t.status)+" ")]):t._e()],1)],1)],1)},i=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h4",{staticClass:"text-center"},[t._v("Wii Mac Address")]),t._l(6,(function(e){return n("span",[n("v-text-field",{ref:"fields",refInFor:!0,staticClass:"macsegment",attrs:{outlined:"","single-line":"",dense:"",maxlength:"2",size:"2","hide-details":""},on:{keydown:function(e){return t.keydown(e)},keyup:function(n){return t.keyup(n,e-1)},change:t.change},model:{value:t.mac[e-1].value,callback:function(n){t.$set(t.mac[e-1],"value",n)},expression:"mac[i - 1].value"}}),6!==e?n("span",[t._v(" - ")]):t._e()],1)})),t.error?n("v-alert",{staticClass:"mt-4",attrs:{type:"error"}},[t._v(t._s(t.error))]):t._e()],2)},o=[],c=n("ba3f"),l={name:"MacInput",data:()=>({mac:[{value:""},{value:""},{value:""},{value:""},{value:""},{value:""}],error:""}),computed:{macString(){return this.mac.map(t=>t.value).join("").toUpperCase()},valid(){return!this.error&&12===this.macString.length}},methods:{keydown(t){null===t.key.match(/[0-9a-fA-F]/)&&t.preventDefault()},keyup(t,e){2===this.mac[e].value.length&&(5===e?(this.$refs.fields[e].$refs.input.blur(),requestAnimationFrame(()=>{this.$emit("finished")})):(this.$refs.fields[e+1].$refs.input.focus(),this.mac[e+1].value=""))},change(){const t=this.mac.slice(0,3).map(t=>t.value).join("").toUpperCase();6===t.length&&-1===c.indexOf(t)?this.error="Invalid MAC address":this.error="",this.$emit("change",{valid:this.valid,value:this.macString})}},mounted(){this.$refs.fields[0].$refs.input.focus()}},u=l,f=(n("6d3c"),n("2877")),d=n("6544"),p=n.n(d),h=n("0798"),g=n("8654"),m=Object(f["a"])(u,s,o,!1,null,"544440d5",null),v=m.exports;p()(m,{VAlert:h["a"],VTextField:g["a"]});var b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h4",{staticClass:"text-center"},[t._v("Wii Region")]),n("v-radio-group",{staticClass:"center-radio-group mt-0",attrs:{row:"","hide-details":""},model:{value:t.region,callback:function(e){t.region=e},expression:"region"}},t._l(["U","E","J","K"],(function(t){return n("v-radio",{attrs:{label:"4.3"+t,value:t}})})),1)],1)},y=[],C={name:"RegionInput",data:()=>({region:null}),mounted(){const t=(new Date).getTimezoneOffset()/60;t>=-5&&t<=1?this.region="E":t>=4&&t<=11&&(this.region="U")},watch:{region(){this.$emit("change",this.region)}}},w=C,A=(n("17a0"),n("67b6")),B=n("43a6"),E=Object(f["a"])(w,b,y,!1,null,"59bbfc7c",null),_=E.exports;p()(E,{VRadio:A["a"],VRadioGroup:B["a"]});var S=n("3452"),x=n.n(S);function D(t){return t.reduce((t,e)=>t+("0"+e.toString(16)).slice(-2),"")}function j(t,e,n,a){a="undefined"!==typeof a?a:e.length;for(let r=0;r<a;r++)t[n+r]=e[r]}function k(t){let e=Math.floor(t/2**32);return[e,e<<8,e<<16,e<<24,t,t<<8,t<<16,t<<24].map(t=>t>>>24)}x.a.enc.u8array={stringify:function(t){for(var e=t.words,n=t.sigBytes,a=new Uint8Array(n),r=0;r<n;r++){var i=e[r>>>2]>>>24-r%4*8&255;a[r]=i}return a},parse:function(t){for(var e=t.length,n=[],a=0;a<e;a++)n[a>>>2]|=(255&t[a])<<24-a%4*8;return x.a.lib.WordArray.create(n,e)}};var F=function(t,e){const n=new Uint8Array(t),a=x.a.enc.Hex.parse(e),r=x.a.SHA1(a.concat(x.a.enc.Utf8.parse("uyy"))),i=x.a.enc.u8array.stringify(r);j(n,i.slice(0,8),8),j(n,Array.from("\0".repeat(20)),176);const s=new Date,o=new Date(2e3,0,1,0,0,0,0);s.setDate(s.getDate()-1);const c=Math.floor((s.getTime()-o.getTime())/1e3);j(n,k(c).slice(4),124),j(n,c.toString().padStart(10,"0").split("").map(t=>t.charCodeAt(0)),128);const l=x.a.HmacSHA1(x.a.enc.u8array.parse(n),x.a.enc.u8array.parse(i.slice(8))),u=x.a.enc.u8array.stringify(l);j(n,u,176);const f="private/wii/title/HAEA/"+D(i.slice(0,4)).toUpperCase()+"/"+D(i.slice(4,8)).toUpperCase()+"/"+s.getFullYear().toString().padStart(4,"0")+"/"+s.getMonth().toString().padStart(2,"0")+"/"+s.getDate().toString().padStart(2,"0")+"/"+s.getHours().toString().padStart(2,"0")+"/"+s.getMinutes().toString().padStart(2,"0")+"/HABA_#1/txt/"+c.toString(16).toUpperCase().padStart(8,"0")+".000";return{bytes:n,filePath:f}},O=n("c4e3"),$=n.n(O),M=n("21a6"),V=n.n(M),P={name:"App",components:{RegionInput:_,MacInput:v},data:()=>({bundle:!0,region:null,mac:null,macValid:!1,status:null}),computed:{downloadReady(){return null!==this.region&&this.macValid},loading(){return null!==this.status}},methods:{macChange({valid:t,value:e}){this.mac=e,this.macValid=t},macFinished(){this.$refs.downloadButton.$el.focus()},regionChange(t){this.region=t},async getTemplate(){return(await fetch(`template${this.region}.bin`)).arrayBuffer()},async getBundleZip(){return(await fetch("hackmii.zip")).blob()},async downloadZip(){this.status="Downloading template"+(this.bundle?" and HackMii bundle":"");const t=[this.getTemplate()];this.bundle&&t.push(this.getBundleZip());const[e,n]=await Promise.all(t);this.status="Populating template";const{bytes:a,filePath:r}=F(e,this.mac);this.status="Zipping letterbomb";const i=new $.a;i.file(r,a,{binary:!0}),this.bundle&&(this.status="Zipping bundle",await i.loadAsync(n)),this.status="Generating blob";const s=await i.generateAsync({type:"blob"});this.status="Saving zip",V.a.saveAs(s,"LetterBomb.zip"),this.status=null}}},U=P,H=(n("034f"),n("7496")),T=n("8336"),I=n("ac7c"),R=n("62ad"),Z=n("a523"),z=n("f6c4"),J=n("0fd9"),L=Object(f["a"])(U,r,i,!1,null,null,null),W=L.exports;p()(L,{VApp:H["a"],VBtn:T["a"],VCheckbox:I["a"],VCol:R["a"],VContainer:Z["a"],VMain:z["a"],VRow:J["a"]});var G=n("f309");a["a"].use(G["a"]);var q=new G["a"]({});a["a"].config.productionTip=!1,new a["a"]({vuetify:q,render:function(t){return t(W)}}).$mount("#app")},6:function(t,e){},"6d3c":function(t,e,n){"use strict";n("85b0")},7:function(t,e){},8:function(t,e){},"85b0":function(t,e,n){},"85ec":function(t,e,n){},9:function(t,e){},9834:function(t,e,n){t.exports=n.p+"img/letterbomb_icon.fdedfb7d.png"},ba3f:function(t){t.exports=JSON.parse('["0009BF","001656","0017AB","00191D","0019FD","001AE9","001B7A","001BEA","001CBE","001DBC","001E35","001EA9","001F32","001FC5","002147","0021BD","00224C","0022AA","0022D7","002331","0023CC","00241E","002444","0024F3","0025A0","002659","002709","0403D6","182A7B","2C10C1","34AF2C","40D28A","40F407","582F40","58BDA3","5C521E","606BFF","64B5C6","78A2A0","7CBB8A","8C56C5","8CCDE8","9458CB","98B6E9","9CE635","A438CC","A45C27","A4C0E1","B87826","B88AEC","B8AE6E","CC9E00","CCFB65","D86BF7","DC68EB","E00C7F","E0E751","E84ECE","ECC40D"]')}});
//# sourceMappingURL=app.6770f8c6.js.map