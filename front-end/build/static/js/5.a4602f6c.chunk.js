(this["webpackJsonpmern-ecommerce"]=this["webpackJsonpmern-ecommerce"]||[]).push([[5],{58:function(e,a,t){"use strict";t.r(a);var n=t(18),s=t.n(n),i=t(19),r=t(2),c=t(14),o=t(0),l=t(28),d=t(20),u=t(15),p=t(29),m=t(13),b=t(1);a.default=function(){var e=Object(o.useContext)(m.a),a=[{id:"email",data:{type:"text",placeholder:"Email",validityRules:Object(c.a)({},u.a,"Please enter in a valid email")}},{id:"password",data:{type:"password",placeholder:"Password",validityRules:Object(c.a)({},u.d,"Please enter in your password")}}],t=Object(d.a)(),n=Object(r.a)(t,4),j=n[0],h=n[1],f=(n[2],n[3]),v=function(){var a=Object(i.a)(s.a.mark((function a(){var t,n,i,r,c,o;return s.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,f("/api/login","POST",JSON.stringify({email:x.inputs.email.value,password:x.inputs.password.value}),{"Content-Type":"application/json"});case 3:t=a.sent,n=t.user,i=n.id,r=n.username,c=n.isAdmin,o=n.token,e.login({id:i,username:r,isAdmin:c},o),t.isAdmin&&e.setIsAdmin(!0),k(),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(0),k(["password"]);case 13:case"end":return a.stop()}}),a,null,[[0,10]])})));return function(){return a.apply(this,arguments)}}(),O=Object(l.a)(a,{isValid:!1},v),w=Object(r.a)(O,4),x=w[0],y=w[1],g=w[2],k=w[3];return Object(b.jsx)("div",{className:"flex justify-center",children:Object(b.jsx)(p.a,{className:"w-[32rem]",btnText:"Login",isLoading:j,error:h,formState:x,submitHandler:g,changeHandler:y,inputs:a,children:Object(b.jsx)("h2",{className:"text-3xl font-light mb-4",children:"Log into your account"})})})}}}]);
//# sourceMappingURL=5.a4602f6c.chunk.js.map