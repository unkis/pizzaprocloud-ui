(window.webpackJsonpfrontend2=window.webpackJsonpfrontend2||[]).push([[0],{189:function(e,t,r){e.exports=r(370)},198:function(e,t,r){},326:function(e,t,r){},328:function(e,t,r){},369:function(e,t,r){},370:function(e,t,r){"use strict";r.r(t);var a=r(26),n=r(0),c=r.n(n),i=r(8),o=r.n(i),l=r(55),u=r(70),s=r(34),d=(r(198),r(371)),m=r(140),p=r(10),f=r(107),b=r(17),O=r(52),E=r(375),y=r(56),g=r(372),h=r(374),_=r(377),T=r(185);function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}var N,j={customers:[{customerNumber:1},{customerNumber:2},{customerNumber:3},{customerNumber:33,phoneNumber:89821251216,deliveryCost:"2,50",name:"\u0414\u043c\u0438\u0442\u0440\u0438\u0439",street:"\u0423\u043b\u0438\u0447\u043d\u0430\u044f",houseNumber:"16",plz:"123456",city:"\u041c\u043e\u0441\u043a\u0432\u0430"},{customerNumber:333}],products:[{key:2,article:2,quantity:10,productName:"Test5",price:60,mwst:"19",children:[{key:21,parentArticle:2,article:21,productName:"Test6",price:60,mwst:"19"},{key:22,mwst:"19",parentArticle:2,article:22,productName:"Test7",price:60},{key:23,parentArticle:2,article:23,mwst:"19",productName:"Test8",price:60}]},{key:3,article:3,quantity:10,productName:"Test9",price:60,mwst:"19",children:[{key:31,parentArticle:3,article:31,productName:"Test10",price:60,mwst:"19"},{key:32,mwst:"19",parentArticle:3,article:32,productName:"Test11",price:60},{key:33,parentArticle:3,article:33,mwst:"19",productName:"Test12",price:60}]},{key:1,article:1,quantity:10,productName:"Test1 ghjkhbjnkvbnkm vhjk vbjnkmlgvbhjnkml yvgbhjnkm vytbnjk vbhnjkmltybuniml vbynu vytbunio",price:60,mwst:"7",children:[{key:12,parentArticle:1,article:12,productName:"Test3",price:60,mwst:"7"},{key:13,parentArticle:1,article:13,productName:"Test4",price:60,mwst:"7"},{key:11,parentArticle:1,article:11,productName:"Test2",price:60,mwst:"7"}]}]},D=function(e){return""===e?j.products.slice(0,10):(e=e.toLowerCase(),j.products.map(function(t){var r=t.article,a=t.productName,n=t.children.filter(function(t){var r=t.article,a=t.productName;return r.toString().toLowerCase().includes(e.toLowerCase())||a.toString().toLowerCase().includes(e.toLowerCase())});return 0!==n.length?function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(r,!0).forEach(function(t){Object(b.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},t,{children:n}):r.toString().toLowerCase().includes(e.toLowerCase())||a.toString().toLowerCase().includes(e.toLowerCase())?t:null}).filter(Boolean))},C=j,A={ru:{authTitle:"\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f",organizationNumber:"\u041d\u043e\u043c\u0435\u0440 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438",username:"\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",password:"\u041f\u0430\u0440\u043e\u043b\u044c",autoLogin:"\u0417\u0430\u043f\u043e\u043c\u043d\u0438\u0442\u044c \u043c\u0435\u043d\u044f",login:"\u0412\u043e\u0439\u0442\u0438",tableOrders:"Tischbestellungen",selfPickUp:"Selbstabholer",sales:"Hausverkauf",phoneMonitor:"Telefon monitor",customerNumber:"\u041d\u043e\u043c\u0435\u0440 \u043a\u043b\u0438\u0435\u043d\u0442\u0430",phoneNumber:"\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",name:"\u0418\u043c\u044f",street:"\u0423\u043b\u0438\u0446\u0430",houseNumber:"\u041d\u043e\u043c\u0435\u0440 \u0434\u043e\u043c\u0430",plz:"\u041f\u043e\u0447\u0442\u043e\u0432\u044b\u0439 \u0438\u043d\u0434\u0435\u043a\u0441",city:"\u0413\u043e\u0440\u043e\u0434",clientComment:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u043a\u043b\u0438\u0435\u043d\u0442\u0430",deliveryCost:"\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438",clear:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c",goToOrder:"\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437",logout:"\u0412\u044b\u0439\u0442\u0438",callForm:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430",allOrders:"\u0412\u0441\u0435 \u0437\u0430\u043a\u0430\u0437\u044b",cookingMonitor:"\u041c\u043e\u043d\u0438\u0442\u043e\u0440 \u043a\u0443\u0445\u043d\u0438",carMonitor:"\u041c\u043e\u043d\u0438\u0442\u043e\u0440 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438",report:"\u041e\u0442\u0447\u0435\u0442",settings:"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438",help:"\u041f\u043e\u043c\u043e\u0449\u044c",quantity:"\u041a\u043e\u043b-\u0432\u043e",article:"\u0410\u0440\u0442.",productName:"\u041d\u043e\u043c\u0435\u043d\u043a\u043b\u0430\u0442\u0443\u0440\u0430",price:"\u0426\u0435\u043d\u0430",back:"\u041d\u0430\u0437\u0430\u0434",freeDelivery:"\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u0430\u044f \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430",print:"\u041f\u0435\u0447\u0430\u0442\u044c"},de:{authTitle:"Restaurant-Login",organizationNumber:"Kundennumer",username:"Benutzername",password:"Passwort",autoLogin:"Automatisch Anmelden",login:"Login",tableOrders:"Tischbestellungen",selfPickUp:"Selbstabholer",sales:"Hausverkauf",phoneMonitor:"Telefon monitor",customerNumber:"Kundennummer",phoneNumber:"Telefonnumer",name:"Name",street:"Strasse",houseNumber:"Hausnummer",plz:"PLZ",city:"Stadt",clientComment:"Bemerkung",deliveryCost:"Anfahrtskosten",clear:"L\xf6schen",goToOrder:"Bestellung",logout:"Logout",callForm:"Lieferdienst",allOrders:"Alle Bestellungen",cookingMonitor:"Kuchen monitor",carMonitor:"Fahrer monitor",report:"Berichten",settings:"Einstellungen",help:"Hilfe",quantity:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e",article:"\u0410\u0440\u0442\u0438\u043a\u0443\u043b",productName:"\u041d\u043e\u043c\u0435\u043d\u043a\u043b\u0430\u0442\u0443\u0440\u0430",price:"\u0426\u0435\u043d\u0430",back:"Zuruck",freeDelivery:"Anfahrtkosten Frei",print:"Drucken"}},I={customerNumber:"customerNumber",phoneNumber:"phoneNumber",name:"name",street:"street",houseNumber:"houseNumber",plz:"plz",city:"city",clientComment:"clientComment",deliveryCost:"deliveryCost",article:"article",quantity:"quantity",productName:"productName",price:"price"},w=["0,00","0,50","1,00","1,50","2,00","2,50","3,00"],k=r(14),R="ADD_TO_FORM_DATA",x="UPDATE_ALL_FIELDS",S="CLEAR_ALL_FIELDS";!function(e){e[e.ADD_PRODUCT_TO_CART=0]="ADD_PRODUCT_TO_CART",e[e.ADD_ADDITION_TO_PRODUCT_IN_CART=1]="ADD_ADDITION_TO_PRODUCT_IN_CART",e[e.DELETE_PRODUCT_FROM_CART=2]="DELETE_PRODUCT_FROM_CART",e[e.DELETE_ADDITION_OF_PRODUCT_FROM_CART=3]="DELETE_ADDITION_OF_PRODUCT_FROM_CART",e[e.INCREMENT_QUANTITY_OF_PRODUCT_IN_CART=4]="INCREMENT_QUANTITY_OF_PRODUCT_IN_CART",e[e.DECREMENT_QUANTITY_OF_PRODUCT_IN_CART=5]="DECREMENT_QUANTITY_OF_PRODUCT_IN_CART",e[e.INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT=6]="INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT",e[e.DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT=7]="DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT"}(N||(N={}));var P,F=function(e,t){return{type:R,fieldName:e,fieldValue:t}};function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function L(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(r,!0).forEach(function(t){Object(b.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var M,q=(P={},Object(b.a)(P,I.customerNumber,""),Object(b.a)(P,I.phoneNumber,""),Object(b.a)(P,I.customerNumber,""),Object(b.a)(P,I.phoneNumber,""),Object(b.a)(P,I.name,""),Object(b.a)(P,I.street,""),Object(b.a)(P,I.houseNumber,""),Object(b.a)(P,I.plz,""),Object(b.a)(P,I.city,""),Object(b.a)(P,I.clientComment,""),Object(b.a)(P,I.deliveryCost,w[0]),P),z=[],K="/pizzaprocloud-ui";function Q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}var Y=d.a.Header,V=d.a.Content,B=O.a.Option,H={labelCol:{xs:{span:24},sm:{span:12},lg:{span:12},xl:{span:12}},wrapperCol:{xs:{span:24},sm:{span:12},lg:{span:12},xl:{span:12}}},G={ADD_TO_DATA_SOURCE:"ADD_TO_DATA_SOURCE"};function W(e,t){switch(t.type){case G.ADD_TO_DATA_SOURCE:return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Q(r,!0).forEach(function(t){Object(b.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Q(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},e,Object(b.a)({},t.dataSourceName,t.dataSourceData))}}var J=function(e,t){return{type:G.ADD_TO_DATA_SOURCE,dataSourceName:e,dataSourceData:t}},Z=(M={},Object(b.a)(M,I.customerNumber,[]),Object(b.a)(M,I.phoneNumber,[]),Object(b.a)(M,I.customerNumber,[]),Object(b.a)(M,I.phoneNumber,[]),Object(b.a)(M,I.name,[]),Object(b.a)(M,I.street,[]),Object(b.a)(M,I.houseNumber,[]),Object(b.a)(M,I.plz,[]),Object(b.a)(M,I.city,[]),Object(b.a)(M,I.clientComment,[]),Object(b.a)(M,I.deliveryCost,[]),M),X=E.a.create({name:"delivery_form"})(Object(s.b)(function(e){return{formDataState:e.formDataState,lang:e.languages.lang}},function(e,t){return{addDataToFormData:function(t,r){e(F(t,r))},updateFieldsOfFormData:function(t){e(function(e){return{type:x,newState:e}}(t))},clearFields:function(){e({type:S})}}})(Object(l.e)(function(e){var t=e.lang,r=e.formDataState,i=e.addDataToFormData,o=e.clearFields,l=e.updateFieldsOfFormData,u=e.form,s=u.getFieldDecorator,m=u.setFieldsValue,p=u.getFieldsValue,f=e.form,b=e.history,v=Object(n.useReducer)(W,Z),N=Object(a.a)(v,2),j=N[0],D=N[1],k=Object(n.useReducer)(W,Z),R=Object(a.a)(k,2),x=R[0],S=R[1],P=Object(n.useState)(A[t]),F=Object(a.a)(P,2),U=F[0],L=F[1],M=Object(n.useCallback)(function(e,t){i(e,t)},[i]),z=Object(n.useCallback)(function(e,t){if(l(p()),j[t].length)S(J(t,j[t].filter(function(t){return t&&t.startsWith(e)})));else{var r=C.customers.map(function(e){var r=e[t];return r&&r.toString()});D(J(t,r)),S(J(t,r.filter(function(t){return t&&t.startsWith(e)})))}},[l,p,j,D,S]),Q=Object(n.useCallback)(function(){f.validateFields(function(e){e||b.push("".concat(K,"/finish"))})},[f,b]),G=Object(n.useCallback)(function(){m(q),o()},[m,o]),X=Object(n.useCallback)(function(e){e.preventDefault(),Q()},[Q]),$=Object(n.useCallback)(function(e){"Escape"===e.key?G():"F2"===e.key&&Q()},[G,Q]),ee=Object(n.useCallback)(function(e,t){var r,a,n=(r=e,a=t,C.customers.find(function(e){return e[r]&&e[r].toString()===a}));n&&(m(n),l(n))},[m,l]);return Object(n.useEffect)(function(){L(A[t])},[t]),Object(n.useEffect)(function(){return window.addEventListener("keydown",$),function(){return window.removeEventListener("keydown",$)}},[$]),Object(n.useEffect)(function(){(function(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var r=0,n=Object.entries(e);r<n.length;r++){var c=n[r],i=Object(a.a)(c,2),o=i[0],l=i[1];if(t[o]!==l)return!1}return!0})(p(),r)||(console.log(r),m(r))},[r,m,p]),c.a.createElement(d.a,null,c.a.createElement(Y,{style:{background:"#fff",marginTop:"24px",height:"auto",display:"flex",flexFlow:"row nowrap",justifyContent:"space-around"}},c.a.createElement(y.a,{type:"dashed",size:"large"},U.tableOrders),c.a.createElement(y.a,{type:"dashed",size:"large"},U.selfPickUp),c.a.createElement(y.a,{type:"dashed",size:"large"},U.sales),c.a.createElement(y.a,{type:"dashed",size:"large"},U.phoneMonitor)),c.a.createElement(g.a,null),c.a.createElement(V,{style:{margin:"0 16px",background:"inherit"}},c.a.createElement("div",null,c.a.createElement(E.a,Object.assign({onSubmit:X,onKeyDown:$},H),c.a.createElement(h.a,{style:{width:"60%",maxWidth:"500px"}},c.a.createElement(E.a.Item,{label:U.customerNumber},s(I.customerNumber,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043a\u043b\u0438\u0435\u043d\u0442\u0430"},{pattern:/[0-9]+/,message:"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"}]})(c.a.createElement(_.a,{dataSource:x[I.customerNumber],onSearch:function(e){return z(e,I.customerNumber)},onSelect:function(e){return ee(I.customerNumber,e)}},c.a.createElement(T.a,{onKeyDown:$,maxLength:6,id:I.customerNumber})))),c.a.createElement(E.a.Item,{label:U.phoneNumber},s(I.phoneNumber,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u043a\u043b\u0438\u0435\u043d\u0442\u0430"},{pattern:/[0-9]+/,message:"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"}]})(c.a.createElement(_.a,{dataSource:x[I.phoneNumber],onSearch:function(e){return z(e,I.phoneNumber)},onSelect:function(e){return ee(I.phoneNumber,e)}},c.a.createElement(T.a,{onKeyDown:$,autoFocus:!0,maxLength:15,id:I.phoneNumber})))),c.a.createElement(E.a.Item,{label:U.name},s(I.name,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u043a\u043b\u0438\u0435\u043d\u0442\u0430"}]})(c.a.createElement(_.a,{dataSource:x[I.name],onSearch:function(e){return z(e,I.name)},onSelect:function(e){return ee(I.name,e)}},c.a.createElement(T.a,{onKeyDown:$,maxLength:30,id:I.name})))),c.a.createElement(E.a.Item,{label:U.city},s(I.city,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0433\u043e\u0440\u043e\u0434\u0430"}]})(c.a.createElement(T.a,{onKeyDown:$,maxLength:25,id:I.city}))),c.a.createElement(E.a.Item,{label:U.street},s(I.street,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0443\u043b\u0438\u0446\u044b"}]})(c.a.createElement(T.a,{onKeyDown:$,maxLength:30,id:I.street}))),c.a.createElement(E.a.Item,{label:U.houseNumber},s(I.houseNumber,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0434\u043e\u043c\u0430"},{pattern:/[0-9]+/,message:"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"}]})(c.a.createElement(T.a,{onKeyDown:$,maxLength:6,id:I.houseNumber}))),c.a.createElement(E.a.Item,{label:U.plz},s(I.plz,{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0447\u0442\u043e\u0432\u044b\u0439 \u0438\u043d\u0434\u0435\u043a\u0441"},{pattern:/[0-9]+/,message:"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"}]})(c.a.createElement(T.a,{onKeyDown:$,maxLength:6,id:I.plz}))),c.a.createElement(E.a.Item,{label:U.clientComment},s(I.clientComment)(c.a.createElement(T.a,{onKeyDown:$,maxLength:35,id:I.clientComment}))),c.a.createElement(E.a.Item,{label:U.deliveryCost},s(I.deliveryCost)(c.a.createElement(O.a,{onChange:function(e){return M(I.deliveryCost,e)},id:I.deliveryCost},w.map(function(e){return c.a.createElement(B,{key:e,value:e},e)}))))),c.a.createElement(g.a,null),c.a.createElement("div",{style:{display:"flex",flexFlow:"row nowrap",justifyContent:"space-between"}},c.a.createElement(y.a,{type:"danger",size:"large",onClick:G},U.clear," / ESC"),c.a.createElement(E.a.Item,null,c.a.createElement(y.a,{htmlType:"submit",type:"primary",size:"large"},U.goToOrder," / F2")))))))}))),$=r(376),ee=r(73),te=r(378),re=(r(326),$.a.Title),ae=Object(s.b)(function(e){return{lang:e.languages.lang,code:e.user.code,userRole:e.user.role}},function(e){return{addUser:function(t,r){e(function(e,t){return{type:"ADD_USER",role:e,code:t}}(t,r))}}})(E.a.create({name:"normal_login"})(Object(l.e)(function(e){var t=e.form,r=t.setFieldsValue,i=t.getFieldsValue,o=t.validateFields,l=t.getFieldDecorator,u=e.history,s=e.lang,d=e.addUser,m=e.code,f=e.userRole,b=Object(n.useState)(""),O=Object(a.a)(b,2),g=O[0],h=O[1],_=Object(n.useState)(A[s]),v=Object(a.a)(_,2),N=v[0],j=v[1];Object(n.useEffect)(function(){r({code:m})},[r,m]),Object(n.useEffect)(function(){f&&u.push("".concat(K,"/menu"))},[u,f]),Object(n.useEffect)(function(){j(A[s])},[s]);return c.a.createElement("div",{id:"components-form-demo-normal-login"},c.a.createElement(E.a,{onSubmit:function(e){e.preventDefault(),o(function(e,t){var r,a,n=(r=t.username,a=t.password,"test"===r&&"test"===a?{role:"admin"}:null);!e&&n?(d(n.role,i().code),u.push("".concat(K,"/menu"))):n||h("\u0412\u044b \u043d\u0435\u0432\u0435\u0440\u043d\u043e \u0432\u0432\u0435\u043b\u0438 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c")})},className:"login-form",autoComplete:"off"},c.a.createElement(re,{level:4,style:{textAlign:"center"}},N.authTitle),c.a.createElement(E.a.Item,null,l("code",{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0434"},{pattern:/[0-9]+/,message:"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"}]})(c.a.createElement(T.a,{autoFocus:!0,autoComplete:"off",prefix:c.a.createElement(p.a,{type:"number",style:{color:"rgba(0,0,0,.25)"}}),placeholder:N.organizationNumber}))),c.a.createElement(E.a.Item,null,l("username",{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"}]})(c.a.createElement(T.a,{autoComplete:"off",prefix:c.a.createElement(p.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:N.username}))),c.a.createElement(E.a.Item,null,l("password",{rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"}]})(c.a.createElement(T.a,{autoComplete:"off",prefix:c.a.createElement(p.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:N.password}))),c.a.createElement(E.a.Item,null,l("remember",{valuePropName:"checked",initialValue:!0})(c.a.createElement(ee.a,null,N.autoLogin)),g&&c.a.createElement("div",null,c.a.createElement(te.a,{type:"error",message:g})),c.a.createElement(y.a,{type:"primary",htmlType:"submit",className:"login-form-button"},N.login))))}))),ne=r(373),ce={labelCol:{xs:{span:24},sm:{span:12},lg:{span:12},xl:{span:12}},wrapperCol:{xs:{span:24},sm:{span:12},lg:{span:12},xl:{span:12}}},ie=E.a.create({name:"cart"})(Object(s.b)(function(e){return{cartProducts:e.cartProducts,formDataState:e.formDataState,lang:e.languages.lang}},function(e){return{addDataToFormData:function(t,r){e(F(t,r))}}})(function(e){var t=e.form,r=t.getFieldDecorator,a=t.setFieldsValue,i=e.addDataToFormData,o=e.formDataState,l=o.mwst_7,u=o.mwst_19,s=o.greichten,d=o.zutaten,m=o.deliveryCost,p=o.discount,f=o.total_price,b=Object(n.useCallback)(function(e){i("deliveryCost",e.target.value)},[i]),O=Object(n.useCallback)(function(e){i("discount",e.target.value)},[i]);return Object(n.useEffect)(function(){a({mwst_7:l,mwst_19:u,greichten:s,zutaten:d,deliveryCost:m,discount:p,total_price:f})},[l,u,s,d,m,p,f,a]),c.a.createElement(E.a,ce,c.a.createElement("div",{className:"cart__sum"},c.a.createElement("div",{className:"sum__item sum__item_flex-start"},c.a.createElement(E.a.Item,{label:"MWST 7"},r("mwst_7")(c.a.createElement(T.a,{placeholder:"MWST 7%",id:"mwst_7",disabled:!0,suffix:"\u20ac"}))),c.a.createElement(E.a.Item,{label:"MWST 19"},r("mwst_19")(c.a.createElement(T.a,{placeholder:"MWST 19%",id:"mwst_19",disabled:!0,suffix:"\u20ac"})))),c.a.createElement("div",{className:"sum__item"},c.a.createElement(E.a.Item,{label:"greichten"},r("greichten")(c.a.createElement(T.a,{placeholder:"GREICHTEN",id:"greichten",disabled:!0,suffix:"\u20ac"}))),c.a.createElement(E.a.Item,{label:"zutaten"},r("zutaten")(c.a.createElement(T.a,{placeholder:"ZUTATEN",id:"zutaten",disabled:!0,suffix:"\u20ac"}))),c.a.createElement(E.a.Item,{label:"anfahrtkosten"},r("deliveryCost")(c.a.createElement(T.a,{onChange:b,placeholder:"ANFAHRTKOSTEN",suffix:"\u20ac"}))),c.a.createElement(E.a.Item,{label:"rabatt"},r("discount")(c.a.createElement(T.a,{onChange:O,placeholder:"F11 / RABATT",suffix:"%"}))),c.a.createElement(E.a.Item,{label:"gesamt preis"},r("total_price")(c.a.createElement(T.a,{id:"total_price",placeholder:"GESAMT PREIS",disabled:!0,suffix:"\u20ac"}))))))})),oe=(r(328),function(e,t,r,a){console.log("".concat(e,"'s ").concat(t," phase")),console.log("Actual time: ".concat(r)),console.log("Base duration: ".concat(a))});var le={body:{row:function(e){var t=e.children.find(function(e){return e.props.record.selected});return c.a.createElement("tr",{className:"".concat(e.className," ").concat(t?"didolf":"")},e.children)}}},ue={y:"75vh"},se={y:"40vh"},de=function(){return null},me={fontSize:"20px"};var pe=Object(s.b)(function(e){return{cartProducts:e.cartProducts,formDataState:e.formDataState,lang:e.languages.lang}},function(e){return{addProduct:function(t,r,a,n){e(function(e,t,r,a){return{type:N.ADD_PRODUCT_TO_CART,article:e,productName:t,price:r,mwst:a}}(t,r,a,n))},addAddition:function(t,r,a,n,c){e(function(e,t,r,a,n){return{type:N.ADD_ADDITION_TO_PRODUCT_IN_CART,productArticle:e,additionArticle:t,additionName:r,additionPrice:a,additionMwst:n}}(t,r,a,n,c))},deleteProduct:function(t){e(function(e){return{type:N.DELETE_PRODUCT_FROM_CART,productArticle:e}}(t))},deleteAddition:function(t,r){e(function(e,t){return{type:N.DELETE_ADDITION_OF_PRODUCT_FROM_CART,productArticle:e,additionArticle:t}}(t,r))},incrementProduct:function(t){e(function(e){return{type:N.INCREMENT_QUANTITY_OF_PRODUCT_IN_CART,productArticle:e}}(t))},decrementProduct:function(t){e(function(e){return{type:N.DECREMENT_QUANTITY_OF_PRODUCT_IN_CART,productArticle:e}}(t))},incrementAddition:function(t,r){e(function(e,t){return{type:N.INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT,productArticle:e,additionArticle:t}}(t,r))},decrementAddition:function(t,r){e(function(e,t){return{type:N.DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT,productArticle:e,additionArticle:t}}(t,r))},addDataToFormData:function(t,r){e(F(t,r))}}})(Object(l.e)(function(e){var t=e.cartProducts,r=e.addDataToFormData,i=e.formDataState.discount,o=void 0===i?0:i,l=e.formDataState,u=e.lang,s=e.addProduct,d=e.addAddition,m=e.deleteProduct,f=e.deleteAddition,b=e.decrementAddition,O=e.decrementProduct,E=e.history,g=Object(n.useState)(A[u]),h=Object(a.a)(g,2),_=h[0],v=h[1],N=Object(n.useState)(D("")),j=Object(a.a)(N,2),C=j[0],I=j[1],w=Object(n.useState)(""),k=Object(a.a)(w,2),R=k[0],x=k[1],S=Object(n.useState)({additionIndex:void 0,productIndex:1}),P=Object(a.a)(S,2),F=P[0],U=P[1],L=Object(n.useCallback)(function(e){var t={productIndex:F.productIndex};if(void 0===F.additionIndex){var r=C.findIndex(function(e){return e.article===F.productIndex}),a=C[r].children;if("ArrowUp"===e.code){if(0!==r&&1!==C.length){var n=C[r-1],c=n.article,i=n.children;t.productIndex=c,i&&0!==i.length&&(t.additionIndex=i[i.length-1].article)}}else Array.isArray(a)&&0!==a.length?t.additionIndex=a[0].article:1!==C.length&&(t.productIndex=C[(r+1)%C.length].article)}else{var o=C.findIndex(function(e){return e.article===F.productIndex}),l=C[o].children;if(!l||!l.length)return void U(t);var u=l.findIndex(function(e){return e.article===F.additionIndex});"ArrowUp"===e.code?0!==u&&(t.additionIndex=l[u-1].article):u!==l.length-1?t.additionIndex=l[u+1].article:o!==C.length-1&&(t.productIndex=C[o+1].article)}U(t)},[C,F,U]),M=Object(n.useCallback)(function(){var e=F.productIndex,t=F.additionIndex;void 0!==t?b(e,t):O(e)},[F,b,O]),q=Object(n.useCallback)(function(){var e=F.productIndex,t=F.additionIndex,r=C.find(function(t){return t.article===e});if(r){var a=r.article,n=r.productName,c=r.price,i=r.children,o=r.mwst;if(void 0!==t){if(Array.isArray(i)){var l=i.find(function(e){return e.article===t});if(l){var u=l.article,m=l.productName,p=l.price,f=l.mwst;void 0!==u&&d(e,u,m,p,f)}}}else void 0!==a&&s(a,n,c,o)}},[C,F,d,s]),z=Object(n.useCallback)(function(e){"-"===e.target.value.slice(-1)?M():x(e.target.value)},[x,M]),Q=Object(n.useCallback)(function(e,t){return function(){if(t){var r=C.find(function(e){return e.article===t});if(r&&r.children){var a=r.children.find(function(t){return t.article===e});if(a){var n=a.productName,c=a.price,i=a.mwst;d(t,e,n,c,i)}}}else{var o=C.find(function(t){return t.article===e});if(o){var l=o.productName,u=o.price,m=o.mwst;s(e,l,u,m)}}}},[C,d,s]),Y=Object(n.useCallback)(function(e,t){return function(){t?b(t,e):O(e)}},[b,O]),V=Object(n.useCallback)(function(e,t){return function(){t?f(t,e):m(e)}},[f,m]),B=Object(n.useCallback)(function(){E.push("".concat(K,"/menu"))},[E]),H=Object(n.useCallback)(function(){return r("deliveryCost","0")},[r]),G=Object(n.useCallback)(function(e){var t=e.parentArticle,r=e.article;return c.a.createElement(p.a,{style:me,type:"minus-square",onClick:Y(r,t)})},[Y]),W=Object(n.useCallback)(function(e){var t=e.parentArticle,r=e.article;return c.a.createElement(p.a,{style:me,type:"plus-square",onClick:Q(r,t)})},[Q]),J=Object(n.useCallback)(function(e){var t=e.parentArticle,r=e.article;return c.a.createElement(p.a,{style:me,type:"close-square",onClick:V(r,t)})},[V]);Object(n.useEffect)(function(){I(D(R))},[R,I]);var Z=Object(n.useMemo)(function(){var e=C.sort(function(e,t){return e.article&&t.article?e.article-t.article:0});return e.forEach(function(e){e.articleView=e.article,Array.isArray(e.children)&&(e.children=e.children.sort(function(e,t){return e.productName.localeCompare(t.productName)}))}),U({productIndex:e[0].article||0,additionIndex:void 0}),e},[C]),X=Object(n.useMemo)(function(){return Z.map(function(e){return e.article===F.productIndex&&void 0===F.additionIndex?e.selected=!0:e.selected&&(e.selected=void 0),Array.isArray(e.children)&&e.children.forEach(function(t){F.productIndex===e.article&&F.additionIndex===t.article?t.selected=!0:!t.selected||F.additionIndex===t.article&&F.productIndex===e.article||(t.selected=void 0)}),e})},[Z,F]),$=Object(n.useCallback)(function(e){"F4"===e.code?B():"F5"===e.code?H():"ArrowUp"===e.code||"ArrowDown"===e.code?L(e):"+"===e.key||"Enter"===e.code?q():"-"===e.key&&M()},[B,H,L,q,M]);Object(n.useEffect)(function(){return window.addEventListener("keydown",$),function(){window.removeEventListener("keydown",$)}},[$]),Object(n.useEffect)(function(){v(A[u])},[u]);var ee=Object(n.useMemo)(function(){var e=0,r=0;return t.forEach(function(t){e+=t.price*t.quantity,Array.isArray(t.children)&&t.children.forEach(function(e){r+=e.price*e.quantity})}),{cartProductsProductsSum:e,cartProductsAdditionsSum:r}},[t]);Object(n.useEffect)(function(){var e=ee.cartProductsProductsSum,t=ee.cartProductsAdditionsSum;r("greichten",e.toString()),r("zutaten",t.toString()),r("mwst_7",(Math.round(.07*(e+t)*100)/100).toString()),r("mwst_19",(Math.round(.19*(e+t)*100)/100).toString())},[ee,r]),Object(n.useEffect)(function(){var e=ee.cartProductsProductsSum,t=ee.cartProductsAdditionsSum,a=((0|parseFloat(l.deliveryCost))+(100-(o>100?0:o))/100*(e+t)).toString();a!==l.total_price&&r("total_price",a)},[ee,o,l,r]);var te=Object(n.useMemo)(function(){return[{title:_.article,dataIndex:"articleView",key:"articleView"},{title:_.quantity,dataIndex:"quantity",key:"quantity"},{title:_.productName,dataIndex:"productName",width:"60%",key:"productName"},{title:_.price,dataIndex:"price",key:"price"},{key:"deleteFromCart",render:J},{key:"decrementFromCart",render:G},{key:"incrementToCart",render:W}]},[_,J,G,W]),re=Object(n.useMemo)(function(){return[{title:_.article,dataIndex:"articleView",key:"articleView"},{title:_.productName,dataIndex:"productName",key:"productName"},{title:_.price,dataIndex:"price",key:"price"},{key:"decrementFromCart",render:G},{key:"incrementToCart",render:W}]},[G,W,_]),ae=Object(n.useMemo)(function(){return t.map(function(e){return e.articleView=e.article,e.key=e.article&&e.article.toString()||"0",e.children&&(e.children=e.children.map(function(t){return t.key=e.article+":"+t.article,t.parentArticle=e.article,t})),e})},[t]),ce=Object(n.useMemo)(function(){return t.map(function(e){var t=e.article;return t?t.toString():"0"})},[t]),oe=Object(n.useMemo)(function(){return C.map(function(e){var t=e.article;return t||0})},[C]);return c.a.createElement("div",{className:"cart"},c.a.createElement("div",{className:"cart__tables"},c.a.createElement("div",{className:"cart__order-table"},c.a.createElement("div",{className:"cart__order"},c.a.createElement(T.a,{placeholder:"HINWEIS"}),c.a.createElement(ne.a,{expandIcon:de,pagination:!1,scroll:se,bordered:!0,expandedRowKeys:ce,defaultExpandAllRows:!0,columns:te,dataSource:ae})),c.a.createElement(ie,null)),c.a.createElement("div",{className:"cart__products-table"},c.a.createElement(T.a,{value:R,prefix:c.a.createElement(p.a,{type:"search"}),onChange:z,autoFocus:!0}),c.a.createElement(ne.a,{components:le,pagination:!1,scroll:ue,bordered:!0,expandIcon:de,expandedRowKeys:oe,defaultExpandAllRows:!0,columns:re,dataSource:X}))),c.a.createElement("div",{className:"cart__buttons"},c.a.createElement(y.a,{type:"danger",size:"large",onClick:B},_.back," / F4"),c.a.createElement(y.a,{type:"dashed",size:"large",onClick:H},_.freeDelivery," / F5"),c.a.createElement(y.a,{type:"primary",size:"large"},_.print," / F2")))})),fe=function(){return c.a.createElement(n.Profiler,{id:"test1",onRender:oe},c.a.createElement(pe,null))},be=r(75),Oe=Object(be.b)({languages:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{lang:"ru"},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_LANGUAGE":return{lang:t.lang};default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{role:"",code:""},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_USER":var r=t.role,a=t.code;return{role:r,code:a};case"LOGOUT_USER":return L({},e,{role:""});default:return e}},formDataState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case R:return L({},e,Object(b.a)({},t.fieldName,t.fieldValue));case x:for(var r=L({},e),n=0,c=Object.entries(t.newState);n<c.length;n++){var i=c[n],o=Object(a.a)(i,2),l=o[0],u=o[1];r[l]=u}return r;case S:return L({},q);default:return e}},cartProducts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N.ADD_PRODUCT_TO_CART:var r=t.article,a=t.productName,n=t.price,c=t.mwst,i=e.findIndex(function(e){return e.article===r});if(-1!==i){var o=e[i].quantity;return[].concat(Object(k.a)(e.slice(0,i)),[L({},e[i],{quantity:o+1})],Object(k.a)(e.slice(i+1)))}return[{article:r,productName:a,price:n,mwst:c,quantity:1}].concat(Object(k.a)(e));case N.ADD_ADDITION_TO_PRODUCT_IN_CART:var l=t.productArticle,u=t.additionArticle,s=t.additionName,d=t.additionPrice,m=t.additionMwst,p=e.findIndex(function(e){return e.article===l});if(-1!==p){var f=e[p].children;if(e[p]&&Array.isArray(f)){var b=f.findIndex(function(e){return e.article===u});if(-1!==b&&Array.isArray(e[p].children)){var O=f[b].quantity;return[].concat(Object(k.a)(e.slice(0,p)),[L({},e[p],{children:[].concat(Object(k.a)(f.slice(0,b)),[L({},f[b],{quantity:O+1})],Object(k.a)(f.slice(b+1)))})],Object(k.a)(e.slice(p+1)))}var E=e[p].children;return[].concat(Object(k.a)(e.slice(0,p)),void 0!==E?[L({},e[p],{children:[{article:u,productName:s,price:d,mwst:m,quantity:1}].concat(Object(k.a)(E))})]:[L({},e[p],{children:[{article:u,productName:s,price:d,mwst:m,quantity:1}]})],Object(k.a)(e.slice(p+1)))}return[].concat(Object(k.a)(e.slice(0,p)),[L({},e[p],{children:[{article:u,productName:s,price:d,mwst:m,quantity:1}]})],Object(k.a)(e.slice(p+1)))}return e;case N.DELETE_PRODUCT_FROM_CART:var y=t.productArticle;return e.filter(function(e){return e.article!==y});case N.DELETE_ADDITION_OF_PRODUCT_FROM_CART:var g=t.productArticle,h=t.additionArticle,_=e.findIndex(function(e){return e.article===g});if(-1!==_){var T=e[_].children;if(T)return[].concat(Object(k.a)(e.slice(0,_)),[L({},e[_],{children:T.filter(function(e){return e.article!==h})})],Object(k.a)(e.slice(_+1)))}return e;case N.INCREMENT_QUANTITY_OF_PRODUCT_IN_CART:var v=t.productArticle,j=e.findIndex(function(e){return e.article===v});return-1!==j?[].concat(Object(k.a)(e.slice(0,j)),[L({},e[j],{quantity:e[j].quantity+1})],Object(k.a)(e.slice(j+1))):e;case N.DECREMENT_QUANTITY_OF_PRODUCT_IN_CART:var D=t.productArticle,C=e.findIndex(function(e){return e.article===D});if(-1!==C){var A=e[C].quantity;return A>1?[].concat(Object(k.a)(e.slice(0,C)),[L({},e[C],{quantity:A-1})],Object(k.a)(e.slice(C+1))):[].concat(Object(k.a)(e.slice(0,C)),Object(k.a)(e.slice(C+1)))}return e;case N.INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT:var I=t.productArticle,w=t.additionArticle,R=e.findIndex(function(e){var t=e.article;return I===t});if(-1!==R){var x=e[R].children;if(x){var S=x.findIndex(function(e){return e.article===w});if(-1!==S){var P=x[S];return[].concat(Object(k.a)(e.slice(0,R)),[L({},e[R],{children:[].concat(Object(k.a)(x.slice(0,S)),[L({},P,{quantity:P.quantity+1})],Object(k.a)(x.slice(S+1)))})],Object(k.a)(e.slice(R+1)))}}}return e;case N.DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT:var F=t.productArticle,U=t.additionArticle,M=e.findIndex(function(e){var t=e.article;return F===t});if(-1!==M){var q=e[M].children;if(q){var K=q.findIndex(function(e){return e.article===U});if(-1!==K){var Q=q[K];return Q.quantity>1?(console.log("HERE"),[].concat(Object(k.a)(e.slice(0,M)),[L({},e[M],{children:[].concat(Object(k.a)(q.slice(0,K)),[L({},Q,{quantity:Q.quantity-1})],Object(k.a)(q.slice(K+1)))})],Object(k.a)(e.slice(M+1)))):[].concat(Object(k.a)(e.slice(0,M)),[L({},e[M],{children:[].concat(Object(k.a)(q.slice(0,K)),Object(k.a)(q.slice(K+1)))})],Object(k.a)(e.slice(M+1)))}}}return e;default:return e}}}),Ee=JSON.parse(localStorage.getItem("pizza-redux")),ye=Ee?Object(be.c)(Oe,Ee):Object(be.c)(Oe);ye.subscribe(function(){return localStorage.setItem("pizza-redux",JSON.stringify(ye.getState()))});var ge=ye;r(369);r.d(t,"AppWithConnect",function(){return Te});var he=d.a.Sider,_e=$.a.Text,Te=Object(s.b)(function(e){return{formDataState:e.formDataState,lang:e.languages.lang,userRole:e.user.role}},function(e){return{logoutFromUser:function(){e({type:"LOGOUT_USER"})},changeLang:function(t){e(function(e){return{type:"CHANGE_LANGUAGE",lang:e}}(t))}}})(Object(l.e)(function(e){var t=e.lang,r=e.userRole,i=e.logoutFromUser,o=e.changeLang,u=e.history,s=Object(n.useState)(A[t]),b=Object(a.a)(s,2),O=b[0],E=b[1],y=Object(n.useState)(!1),g=Object(a.a)(y,2),h=g[0],_=g[1];Object(n.useEffect)(function(){E(A[t])},[t,E]);var T=Object(n.useCallback)(function(e){i(),u.push("".concat(K,"/"))},[i,u]),v=Object(n.useCallback)(function(e){var t=e.target.value;o(t)},[o]),N=Object(n.useCallback)(function(e){_(e)},[_]);return c.a.createElement(d.a,{style:{minHeight:"100vh"}},window.location.pathname!=="".concat(K,"/")&&c.a.createElement(he,{collapsible:!0,onCollapse:N,theme:"light",style:{overflow:"auto",height:"100vh",left:0}},c.a.createElement("div",{className:"menu"},c.a.createElement(m.a,{style:{height:"100vh"},defaultSelectedKeys:["2"],mode:"inline"},c.a.createElement(m.a.Item,{disabled:!0},c.a.createElement(p.a,{type:"tag"}),!h&&c.a.createElement(f.a.Group,{value:t,onChange:v},c.a.createElement(f.a.Button,{value:"ru"},"ru"),c.a.createElement(f.a.Button,{value:"de"},"de"))),c.a.createElement(m.a.Item,{key:"1",onClick:T,className:"logout-button"},c.a.createElement(p.a,{type:"logout"}),c.a.createElement("span",null,O.logout)),c.a.createElement(m.a.Item,{key:"2"},c.a.createElement(p.a,{type:"phone"}),c.a.createElement("span",null,O.callForm)),c.a.createElement(m.a.Item,{key:"3"},c.a.createElement(p.a,{type:"shopping-cart"}),c.a.createElement("span",null,O.allOrders)),c.a.createElement(m.a.Item,{key:"4"},c.a.createElement(p.a,{type:"dashboard"}),c.a.createElement("span",null,O.cookingMonitor)),c.a.createElement(m.a.Item,{key:"5"},c.a.createElement(p.a,{type:"car"}),c.a.createElement("span",null,O.carMonitor)),c.a.createElement(m.a.Item,{key:"6"},c.a.createElement(p.a,{type:"bar-chart"}),c.a.createElement("span",null,O.report)),c.a.createElement(m.a.Item,{key:"7"},c.a.createElement(p.a,{type:"setting"}),c.a.createElement("span",null,O.settings)),c.a.createElement(m.a.Item,{key:"8"},c.a.createElement(p.a,{type:"question-circle"}),c.a.createElement("span",null,O.help))),c.a.createElement(_e,{style:{textAlign:"center",paddingBottom:"20px",borderRight:"1px solid #e8e8e8"}},r))),c.a.createElement(l.a,{path:"".concat(K,"/menu"),component:X}),c.a.createElement(l.a,{path:"".concat(K,"/index.html"),exact:!0,component:ae}),c.a.createElement(l.a,{path:"".concat(K,"/"),exact:!0,component:ae}),c.a.createElement(l.a,{path:"".concat(K,"/finish"),component:fe}))}));o.a.render(c.a.createElement(u.a,null,c.a.createElement(s.a,{store:ge},c.a.createElement(Te,null))),document.getElementById("root"))}},[[189,1,2]]]);
//# sourceMappingURL=main.a5cf4d1c.chunk.js.map