(window.webpackJsonpfrontend2=window.webpackJsonpfrontend2||[]).push([[0],{160:function(e,t,a){e.exports=a(311)},169:function(e,t,a){},170:function(e,t,a){},302:function(e,t,a){},311:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),l=a(7),c=a.n(l),u=a(67),m=a(47),s=a(45),i=(a(169),a(31)),b=a(316),p=a(315),d=a(156),f=a(11),g=a(319),E=a(320),O=a(96),h=(a(170),{customers:[{customerNumber:1},{customerNumber:2},{customerNumber:3},{customerNumber:33,phoneNumber:89821251216,deliveryCost:"2,50",name:"\u0414\u043c\u0438\u0442\u0440\u0438\u0439",street:"\u0423\u043b\u0438\u0447\u043d\u0430\u044f",houseNumber:"16",plz:"123456",city:"\u041c\u043e\u0441\u043a\u0432\u0430"},{customerNumber:333}]}),y="ADD_TO_FORM_DATA",j="UPDATE_ALL_FIELDS",v="CLEAR_ALL_FIELDS",N={ru:{authTitle:"\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f",organizationNumber:"\u041d\u043e\u043c\u0435\u0440 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438",username:"\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",password:"\u041f\u0430\u0440\u043e\u043b\u044c",autoLogin:"\u0417\u0430\u043f\u043e\u043c\u043d\u0438\u0442\u044c \u043c\u0435\u043d\u044f",login:"\u0412\u043e\u0439\u0442\u0438",tableOrders:"Tischbestellungen",selfPickUp:"Selbstabholer",sales:"Hausverkauf",phoneMonitor:"Telefon monitor",customerNumber:"\u041d\u043e\u043c\u0435\u0440 \u043a\u043b\u0438\u0435\u043d\u0442\u0430",phoneNumber:"\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",name:"\u0418\u043c\u044f",street:"\u0423\u043b\u0438\u0446\u0430",houseNumber:"\u041d\u043e\u043c\u0435\u0440 \u0434\u043e\u043c\u0430",plz:"\u041f\u043e\u0447\u0442\u043e\u0432\u044b\u0439 \u0438\u043d\u0434\u0435\u043a\u0441",city:"\u0413\u043e\u0440\u043e\u0434",clientComment:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u043a\u043b\u0438\u0435\u043d\u0442\u0430",deliveryCost:"\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438",clear:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c",goToOrder:"\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437",logout:"\u0412\u044b\u0439\u0442\u0438",callForm:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430",allOrders:"\u0412\u0441\u0435 \u0437\u0430\u043a\u0430\u0437\u044b",cookingMonitor:"\u041c\u043e\u043d\u0438\u0442\u043e\u0440 \u043a\u0443\u0445\u043d\u0438",carMonitor:"\u041c\u043e\u043d\u0438\u0442\u043e\u0440 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438",report:"\u041e\u0442\u0447\u0435\u0442",settings:"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438",help:"\u041f\u043e\u043c\u043e\u0449\u044c"},de:{authTitle:"Restaurant-Login",organizationNumber:"Kundennumer",username:"Benutzername",password:"Passwort",autoLogin:"Automatisch Anmelden",login:"Login",tableOrders:"Tischbestellungen",selfPickUp:"Selbstabholer",sales:"Hausverkauf",phoneMonitor:"Telefon monitor",customerNumber:"Kundennummer",phoneNumber:"Telefonnumer",name:"Name",street:"Strasse",houseNumber:"Hausnummer",plz:"PLZ",city:"Stadt",clientComment:"Bemerkung",deliveryCost:"Anfahrtskosten",clear:"L\xf6schen",goToOrder:"Bestellung",logout:"Logout",callForm:"Lieferdienst",allOrders:"Alle Bestellungen",cookingMonitor:"Kuchen monitor",carMonitor:"Fahrer monitor",report:"Berichten",settings:"Einstellungen",help:"Hilfe"}},D="/pizzaprocloud-ui",w=b.a.Title,S=Object(s.b)(function(e){return{lang:e.languages.lang,code:e.user.code,userRole:e.user.role}},function(e){return{addUser:function(t,a){e(function(e,t){return{type:"ADD_USER",role:e,code:t}}(t,a))}}})(p.a.create({name:"normal_login"})(Object(m.e)(function(e){var t=e.form,a=e.history,n=e.lang,l=e.addUser,c=e.code,u=e.userRole,m=Object(r.useState)(""),s=Object(i.a)(m,2),b=s[0],h=s[1],y=Object(r.useState)(N[n]),j=Object(i.a)(y,2),v=j[0],S=j[1];Object(r.useEffect)(function(){return t.setFieldsValue({code:c})},[]),Object(r.useEffect)(function(){u&&a.push("".concat(D,"/menu"))},[u]),Object(r.useEffect)(function(){S(N[n])},[n]);var C=t.getFieldDecorator;return o.a.createElement("div",{id:"components-form-demo-normal-login"},o.a.createElement(p.a,{onSubmit:function(e){e.preventDefault(),t.validateFields(function(e,n){var r,o,c=(r=n.username,o=n.password,"test"===r&&"test"===o?{role:"admin"}:null);!e&&c?(l(c.role,t.getFieldsValue().code),a.push("".concat(D,"/menu"))):c||h("\u0412\u044b \u043d\u0435\u0432\u0435\u0440\u043d\u043e \u0432\u0432\u0435\u043b\u0438 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c")})},className:"login-form",autoComplete:"off"},o.a.createElement(w,{level:4,style:{textAlign:"center"}},v.authTitle),o.a.createElement(p.a.Item,null,C("code",{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0434"},{pattern:/[0-9]+/,message:"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"}]})(o.a.createElement(d.a,{autoFocus:!0,autoComplete:"off",prefix:o.a.createElement(f.a,{type:"number",style:{color:"rgba(0,0,0,.25)"}}),placeholder:v.organizationNumber}))),o.a.createElement(p.a.Item,null,C("username",{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"}]})(o.a.createElement(d.a,{autoComplete:"off",prefix:o.a.createElement(f.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:v.username}))),o.a.createElement(p.a.Item,null,C("password",{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"}]})(o.a.createElement(d.a,{autoComplete:"off",prefix:o.a.createElement(f.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:v.password}))),o.a.createElement(p.a.Item,null,C("remember",{valuePropName:"checked",initialValue:!0})(o.a.createElement(g.a,null,v.autoLogin)),b&&o.a.createElement("div",null,o.a.createElement(E.a,{type:"error",message:b})),o.a.createElement(O.a,{type:"primary",htmlType:"submit",className:"login-form-button"},v.login))))}))),C=a(313),k=a(317),x=a(318),A=a(312),L=(a(302),a(15)),F=a(124),T=a(314),I=a(321),_={customerNumber:"customerNumber",phoneNumber:"phoneNumber",name:"name",street:"street",houseNumber:"houseNumber",plz:"plz",city:"city",clientComment:"clientComment",deliveryCost:"deliveryCost"},z=["0,00","0,50","1,00","1,50","2,00","2,50","3,00"];function P(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function U(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?P(a,!0).forEach(function(t){Object(L.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):P(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var R,K=(n={},Object(L.a)(n,_.customerNumber,""),Object(L.a)(n,_.phoneNumber,""),Object(L.a)(n,_.customerNumber,""),Object(L.a)(n,_.phoneNumber,""),Object(L.a)(n,_.name,""),Object(L.a)(n,_.street,""),Object(L.a)(n,_.houseNumber,""),Object(L.a)(n,_.plz,""),Object(L.a)(n,_.city,""),Object(L.a)(n,_.clientComment,""),Object(L.a)(n,_.deliveryCost,z[0]),n);function M(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var q=F.a.Option,B={labelCol:{xs:{span:24},sm:{span:12},lg:{span:12},xl:{span:12}},wrapperCol:{xs:{span:24},sm:{span:12},lg:{span:12},xl:{span:12}}},G={ADD_TO_DATA_SOURCE:"ADD_TO_DATA_SOURCE"};function H(e,t){switch(t.type){case G.ADD_TO_DATA_SOURCE:return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?M(a,!0).forEach(function(t){Object(L.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):M(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},e,Object(L.a)({},t.dataSourceName,t.dataSourceData))}}var V=function(e,t){return{type:G.ADD_TO_DATA_SOURCE,dataSourceName:e,dataSourceData:t}},J=(R={},Object(L.a)(R,_.customerNumber,[]),Object(L.a)(R,_.phoneNumber,[]),Object(L.a)(R,_.customerNumber,[]),Object(L.a)(R,_.phoneNumber,[]),Object(L.a)(R,_.name,[]),Object(L.a)(R,_.street,[]),Object(L.a)(R,_.houseNumber,[]),Object(L.a)(R,_.plz,[]),Object(L.a)(R,_.city,[]),Object(L.a)(R,_.clientComment,[]),Object(L.a)(R,_.deliveryCost,[]),R),W=p.a.create({name:"delivery_form"})(Object(s.b)(function(e){return{formDataState:e.formDataState}},function(e,t){return{addDataToFormData:function(t,a){e({type:y,fieldName:t,fieldValue:a})},updateFieldsOfFormData:function(t){e(function(e){return{type:j,newState:e}}(t))},clearFields:function(){e({type:v})}}})(Object(m.e)(function(e){var t=e.langMap,a=e.formDataState,n=e.addDataToFormData,l=e.clearFields,c=e.updateFieldsOfFormData,u=e.form,m=u.getFieldDecorator,s=u.setFieldsValue,b=u.getFieldsValue,f=e.form,g=e.history,E=Object(r.useReducer)(H,J),y=Object(i.a)(E,2),j=y[0],v=y[1],N=Object(r.useReducer)(H,J),w=Object(i.a)(N,2),S=w[0],C=w[1];Object(r.useEffect)(function(){return window.addEventListener("keydown",R),function(){return window.removeEventListener("keydown",R)}},[]),Object(r.useEffect)(function(){(function(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var a=0,n=Object.entries(e);a<n.length;a++){var r=n[a],o=Object(i.a)(r,2),l=o[0],c=o[1];if(t[l]!==c)return!1}return!0})(b(),a)||s(a)},[a,s,b]);var k=Object(r.useCallback)(function(e,t){n(e,t)},[n]),x=Object(r.useCallback)(function(e,t){if(c(b()),j[t].length)C(V(t,j[t].filter(function(t){return t&&t.startsWith(e)})));else{var a=h.customers.map(function(e){var a=e[t];return a&&a.toString()});v(V(t,a)),C(V(t,a.filter(function(t){return t&&t.startsWith(e)})))}},[c,b,j,v,C]),L=Object(r.useCallback)(function(){f.validateFields(function(e){e||g.push("".concat(D,"/finish"))})},[f,g]),P=Object(r.useCallback)(function(){s(K),l()},[s,l]),U=Object(r.useCallback)(function(e){e.preventDefault(),L()},[L]),R=Object(r.useCallback)(function(e){"Escape"===e.key?P():"F2"===e.key&&L()},[P,L]),M=Object(r.useCallback)(function(e,t){var a,n,r=(a=e,n=t,h.customers.find(function(e){return e[a]==n}));r&&(s(r),c(r))},[s,c]);return o.a.createElement("div",null,o.a.createElement(p.a,Object.assign({onSubmit:U,onKeyDown:R},B),o.a.createElement(T.a,{style:{width:"60%",maxWidth:"500px"}},o.a.createElement(p.a.Item,{label:t.customerNumber},m(_.customerNumber,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043a\u043b\u0438\u0435\u043d\u0442\u0430"},{pattern:/[0-9]+/,message:"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"}]})(o.a.createElement(I.a,{dataSource:S[_.customerNumber],onSearch:function(e){return x(e,_.customerNumber)},onSelect:function(e){return M(_.customerNumber,e)}},o.a.createElement(d.a,{onKeyDown:R,maxLength:6,id:_.customerNumber})))),o.a.createElement(p.a.Item,{label:t.phoneNumber},m(_.phoneNumber,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u043a\u043b\u0438\u0435\u043d\u0442\u0430"},{pattern:/[0-9]+/,message:"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"}]})(o.a.createElement(I.a,{dataSource:S[_.phoneNumber],onSearch:function(e){return x(e,_.phoneNumber)},onSelect:function(e){return M(_.phoneNumber,e)}},o.a.createElement(d.a,{onKeyDown:R,autoFocus:!0,maxLength:15,id:_.phoneNumber})))),o.a.createElement(p.a.Item,{label:t.name},m(_.name,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u043a\u043b\u0438\u0435\u043d\u0442\u0430"}]})(o.a.createElement(I.a,{dataSource:S[_.name],onSearch:function(e){return x(e,_.name)},onSelect:function(e){return M(_.name,e)}},o.a.createElement(d.a,{onKeyDown:R,maxLength:30,id:_.name})))),o.a.createElement(p.a.Item,{label:t.city},m(_.city,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0433\u043e\u0440\u043e\u0434\u0430"}]})(o.a.createElement(d.a,{onKeyDown:R,maxLength:25,id:_.city}))),o.a.createElement(p.a.Item,{label:t.street},m(_.street,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0443\u043b\u0438\u0446\u044b"}]})(o.a.createElement(d.a,{onKeyDown:R,maxLength:30,id:_.street}))),o.a.createElement(p.a.Item,{label:t.houseNumber},m(_.houseNumber,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0434\u043e\u043c\u0430"}]})(o.a.createElement(d.a,{onKeyDown:R,maxLength:6,id:_.houseNumber}))),o.a.createElement(p.a.Item,{label:t.plz},m(_.plz,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0447\u0442\u043e\u0432\u044b\u0439 \u0438\u043d\u0434\u0435\u043a\u0441"}]})(o.a.createElement(d.a,{onKeyDown:R,maxLength:6,id:_.plz}))),o.a.createElement(p.a.Item,{label:t.clientComment},m(_.clientComment)(o.a.createElement(d.a,{onKeyDown:R,maxLength:35,id:_.clientComment}))),o.a.createElement(p.a.Item,{label:t.deliveryCost},m(_.deliveryCost)(o.a.createElement(F.a,{onChange:function(e){return k(_.deliveryCost,e)},id:_.deliveryCost},z.map(function(e){return o.a.createElement(q,{key:e,value:e},e)}))))),o.a.createElement(A.a,null),o.a.createElement("div",{style:{display:"flex",flexFlow:"row nowrap",justifyContent:"space-between"}},o.a.createElement(O.a,{type:"danger",size:"large",onClick:P},t.clear," / ESC"),o.a.createElement(p.a.Item,null,o.a.createElement(O.a,{htmlType:"submit",type:"primary",size:"large"},t.goToOrder," / F2")))))}))),Z=C.a.Header,Q=C.a.Content,X=C.a.Sider,Y=b.a.Text,$=Object(s.b)(function(e){return{formDataState:e.formDataState,lang:e.languages.lang,userRole:e.user.role}},function(e){return{logoutFromUser:function(){e({type:"LOGOUT_USER"})},changeLang:function(t){e(function(e){return{type:"CHANGE_LANGUAGE",lang:e}}(t))}}})(Object(m.e)(function(e){var t=e.lang,a=e.userRole,n=e.logoutFromUser,l=e.changeLang,c=e.history,u=Object(r.useState)(N[t]),m=Object(i.a)(u,2),s=m[0],b=m[1],p=Object(r.useState)(!1),d=Object(i.a)(p,2),g=d[0],E=d[1];Object(r.useEffect)(function(){b(N[t])},[t,b]),Object(r.useEffect)(function(){b(N[t])},[t]);var h=Object(r.useCallback)(function(e){n(),c.push("".concat(D,"/"))},[n,c]),y=Object(r.useCallback)(function(e){var t=e.target.value;l(t)},[l]),j=Object(r.useCallback)(function(e){E(e)},[E]);return o.a.createElement(C.a,{style:{minHeight:"100vh"}},o.a.createElement(X,{collapsible:!0,onCollapse:j,theme:"light",style:{overflow:"auto",height:"100vh",left:0}},o.a.createElement("div",{className:"menu"},o.a.createElement(k.a,{style:{height:"100vh"},defaultSelectedKeys:["2"],mode:"inline"},o.a.createElement(k.a.Item,{disabled:!0},o.a.createElement(f.a,{type:"tag"}),!g&&o.a.createElement(x.a.Group,{value:t,onChange:y},o.a.createElement(x.a.Button,{value:"ru"},"ru"),o.a.createElement(x.a.Button,{value:"de"},"de"))),o.a.createElement(k.a.Item,{key:"1",onClick:h},o.a.createElement(f.a,{type:"logout"}),o.a.createElement("span",null,s.logout)),o.a.createElement(k.a.Item,{key:"2"},o.a.createElement(f.a,{type:"phone"}),o.a.createElement("span",null,s.callForm)),o.a.createElement(k.a.Item,{key:"3"},o.a.createElement(f.a,{type:"shopping-cart"}),o.a.createElement("span",null,s.allOrders)),o.a.createElement(k.a.Item,{key:"4"},o.a.createElement(f.a,{type:"dashboard"}),o.a.createElement("span",null,s.cookingMonitor)),o.a.createElement(k.a.Item,{key:"5"},o.a.createElement(f.a,{type:"car"}),o.a.createElement("span",null,s.carMonitor)),o.a.createElement(k.a.Item,{key:"6"},o.a.createElement(f.a,{type:"bar-chart"}),o.a.createElement("span",null,s.report)),o.a.createElement(k.a.Item,{key:"7"},o.a.createElement(f.a,{type:"setting"}),o.a.createElement("span",null,s.settings)),o.a.createElement(k.a.Item,{key:"8"},o.a.createElement(f.a,{type:"question-circle"}),o.a.createElement("span",null,s.help))),o.a.createElement(Y,{style:{textAlign:"center",paddingBottom:"20px",borderRight:"1px solid #e8e8e8"}},a))),o.a.createElement(C.a,null,o.a.createElement(Z,{style:{background:"#fff",marginTop:"24px",height:"auto",display:"flex",flexFlow:"row nowrap",justifyContent:"space-around"}},o.a.createElement(O.a,{type:"dashed",size:"large"},s.tableOrders),o.a.createElement(O.a,{type:"dashed",size:"large"},s.selfPickUp),o.a.createElement(O.a,{type:"dashed",size:"large"},s.sales),o.a.createElement(O.a,{type:"dashed",size:"large"},s.phoneMonitor)),o.a.createElement(A.a,null),o.a.createElement(Q,{style:{margin:"0 16px",background:"inherit"}},o.a.createElement(W,{langMap:s}))))})),ee=a(61),te=Object(ee.b)({languages:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{lang:"ru"},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_LANGUAGE":return{lang:t.lang};default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{role:"",code:""},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_USER":var a=t.role,n=t.code;return{role:a,code:n};case"LOGOUT_USER":return U({},e,{role:""});default:return e}},formDataState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return U({},e,Object(L.a)({},t.fieldName,t.fieldValue));case j:for(var a=U({},e),n=0,r=Object.entries(t.newState);n<r.length;n++){var o=r[n],l=Object(i.a)(o,2),c=l[0],u=l[1];a[c]=u}return a;case v:return U({},K);default:return e}}}),ae=JSON.parse(localStorage.getItem("pizza-redux")),ne=ae?Object(ee.c)(te,ae):Object(ee.c)(te);ne.subscribe(function(){return localStorage.setItem("pizza-redux",JSON.stringify(ne.getState()))});var re=ne;console.log("production"),c.a.render(o.a.createElement(u.a,null,o.a.createElement(s.a,{store:re},o.a.createElement(m.a,{path:"".concat(D,"/menu"),component:$}),o.a.createElement(m.a,{path:"".concat(D,"/index.html"),exact:!0,component:S}),o.a.createElement(m.a,{path:"".concat(D,"/"),exact:!0,component:S}),o.a.createElement(m.a,{path:"".concat(D,"/finish"),render:function(){return o.a.createElement("div",null,"DONE")}}))),document.getElementById("root"))}},[[160,1,2]]]);
//# sourceMappingURL=main.2d68162d.chunk.js.map