"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[234],{4234:(O,m,n)=>{n.r(m),n.d(m,{AuthResetPasswordModule:()=>B});var p=n(4521),l=n(7423),d=n(7322),f=n(5245),h=n(7531),g=n(773),_=n(6236),A=n(7775),P=n(4466),u=n(3075),Z=n(8288);class y{static isEmptyInputValue(o){return null==o||0===o.length}static mustMatch(o,s){return r=>{const c=r.get(o),a=r.get(s);if(!c||!a||(a.hasError("mustMatch")&&(delete a.errors.mustMatch,a.updateValueAndValidity()),this.isEmptyInputValue(a.value)||c.value===a.value))return null;const i={mustMatch:!0};return a.setErrors(i),i}}}var w=n(1816),t=n(5e3),v=n(8951),C=n(2340),x=n(520);let F=(()=>{class e{constructor(s,r){this._httpClient=s,this._authService=r}updatePassword(s,r,c){const a=(0,w.Z)(this._authService.user);return this._httpClient.post(`${C.N.API_URL}/Comercio_Bancario/upd_pass`,{vc_nro_dispositivo:s,nu_id_comercio:a.nu_id_comercio,vc_contrasena_anterior:r,vc_contrasena_nueva:c,vc_tran_usua_modi:a.vc_nombre_comercio})}}return e.\u0275fac=function(s){return new(s||e)(t.LFG(x.eN),t.LFG(v.e))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var I=n(9808),T=n(2494);const J=["resetPasswordNgForm"];function R(e,o){if(1&e&&(t.TgZ(0,"fuse-alert",26),t._uU(1),t.qZA()),2&e){const s=t.oxw();t.Q6J("appearance","outline")("showIcon",!1)("type",s.alert.type)("@shake","error"===s.alert.type),t.xp6(1),t.hij(" ",s.alert.message," ")}}function N(e,o){1&e&&t._UZ(0,"mat-icon",27),2&e&&t.Q6J("svgIcon","heroicons_solid:eye")}function U(e,o){1&e&&t._UZ(0,"mat-icon",27),2&e&&t.Q6J("svgIcon","heroicons_solid:eye-off")}function Q(e,o){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Ingrese la contrase\xf1a actual "),t.qZA())}function M(e,o){1&e&&t._UZ(0,"mat-icon",27),2&e&&t.Q6J("svgIcon","heroicons_solid:eye")}function Y(e,o){1&e&&t._UZ(0,"mat-icon",27),2&e&&t.Q6J("svgIcon","heroicons_solid:eye-off")}function b(e,o){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Ingrese la contrase\xf1a nueva "),t.qZA())}function q(e,o){1&e&&t._UZ(0,"mat-icon",27),2&e&&t.Q6J("svgIcon","heroicons_solid:eye")}function S(e,o){1&e&&t._UZ(0,"mat-icon",27),2&e&&t.Q6J("svgIcon","heroicons_solid:eye-off")}function E(e,o){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Ingrese la confirmaci\xf3n de la contrase\xf1a nueva "),t.qZA())}function j(e,o){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," La contrase\xf1a y la confirmaci\xf3n no coinciden "),t.qZA())}function k(e,o){1&e&&(t.TgZ(0,"span"),t._uU(1," Actualizar contrase\xf1a "),t.qZA())}function L(e,o){1&e&&t._UZ(0,"mat-progress-spinner",28),2&e&&t.Q6J("diameter",24)("mode","indeterminate")}const z=[{path:"",component:(()=>{class e{constructor(s,r,c,a){this._authService=s,this._formBuilder=r,this._updatePasswordService=c,this.router=a,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.initUpdatePasswordForm()}initUpdatePasswordForm(){const s=(0,w.Z)(this._authService.user);console.log(s),this.updatePasswordForm=this._formBuilder.group({vc_contrasena_anterior:["",u.kI.required],passwordConfirm:["",[u.kI.required]],vc_contrasena_nueva:["",u.kI.required],vc_nro_dispositivo:[s.vc_nro_dispositivo,[u.kI.required,u.kI.minLength(9),u.kI.maxLength(9)]]},{validators:y.mustMatch("vc_contrasena_nueva","passwordConfirm")})}resetPassword(){this.updatePasswordForm.invalid?console.log(this.updatePasswordForm):(this.updatePasswordForm.disable(),this.showAlert=!1,this._updatePasswordService.updatePassword(this.updatePasswordForm.get("vc_nro_dispositivo").value,this.updatePasswordForm.get("vc_contrasena_anterior").value,this.updatePasswordForm.get("vc_contrasena_nueva").value).subscribe(s=>{"1"===s.nu_tran_stdo&&(this.alert={type:"success",message:s.tx_tran_mnsg},this.updatePasswordForm.enable(),this.initUpdatePasswordForm(),this.showAlert=!0,this.signIn()),"0"===s.nu_tran_stdo&&(this.alert={type:"error",message:s.tx_tran_mnsg},this.updatePasswordForm.enable(),this.initUpdatePasswordForm(),this.showAlert=!0)},s=>{this.alert={type:"error",message:s.tx_tran_mnsg},this.updatePasswordForm.enable(),this.initUpdatePasswordForm(),this.showAlert=!0}))}signIn(){this._authService.signOut(),this.router.navigate(["sign-in"])}goToHome(){this.router.navigate(["dashboards/home"])}}return e.\u0275fac=function(s){return new(s||e)(t.Y36(v.e),t.Y36(u.qu),t.Y36(F),t.Y36(p.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["auth-reset-password"]],viewQuery:function(s,r){if(1&s&&t.Gf(J,5),2&s){let c;t.iGM(c=t.CRH())&&(r.resetPasswordNgForm=c.first)}},decls:42,vars:19,consts:[[1,"bg-card","flex","items-center","justify-center","sm:bg-primary","p-0","sm:py-18","sm:px-9","md:px-36","md:py-20","flex-auto","w-full"],[1,"rounded-2xl","bg-card","items-center","md:items-start","sm:justify-center","md:justify-start","p-4","md:p-14","lg:p-20","w-2/3"],[1,"grid","grid-cols-1","w-full","sm:w-auto"],[1,"block"],[1,"flex","items-center","justify-between"],[1,"flex","items-center","text-primary","cursor-pointer",3,"click"],["svgIcon","heroicons_outline:chevron-left"],[1,"flex","items-center"],["src","assets/images/logo/mipmap-xhdpi/ic_launcher.png",1,"w-12"],[1,"ml-1.5","hidden","sm:inline-block","font-bold","text-xl","tracking-wide"],[1,"max-w-100","sm:w-60","md:w-90","mx-auto","md:items-center","justify-center"],[1,"mt-8","text-2xl","font-extrabold","tracking-tight","leading-tight"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],[1,"w-full"],["id","currentPassword","matInput","","type","password","placeholder","Contrase\xf1a actual",3,"formControlName"],["currentPasswordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],[4,"ngIf"],["type","password","id","newPassword","matInput","","placeholder","Contrase\xf1a nueva",3,"formControlName"],["newPasswordField",""],["type","password","id","passwordConfirm","matInput","","placeholder","Confirmaci\xf3n de contrase\xf1a nueva",3,"formControlName"],["confirmPasswordField",""],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-6",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(s,r){if(1&s){const c=t.EpF();t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"div",4),t.TgZ(5,"a",5),t.NdJ("click",function(){return r.signIn()}),t._UZ(6,"mat-icon",6),t._uU(7," Ir a inicio de sesi\xf3n "),t.qZA(),t.TgZ(8,"div",7),t._UZ(9,"img",8),t.TgZ(10,"span",9),t._uU(11,"megapunto"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(12,"div",10),t.TgZ(13,"div",11),t._uU(14," Actualizar contrase\xf1a "),t.qZA(),t.YNc(15,R,2,5,"fuse-alert",12),t.TgZ(16,"form",13),t.TgZ(17,"mat-form-field",14),t._UZ(18,"input",15,16),t.TgZ(20,"button",17),t.NdJ("click",function(){t.CHM(c);const i=t.MAs(19);return i.type="password"===i.type?"text":"password"}),t.YNc(21,N,1,1,"mat-icon",18),t.YNc(22,U,1,1,"mat-icon",18),t.qZA(),t.YNc(23,Q,2,0,"mat-error",19),t.qZA(),t.TgZ(24,"mat-form-field",14),t._UZ(25,"input",20,21),t.TgZ(27,"button",17),t.NdJ("click",function(){t.CHM(c);const i=t.MAs(26);return i.type="password"===i.type?"text":"password"}),t.YNc(28,M,1,1,"mat-icon",18),t.YNc(29,Y,1,1,"mat-icon",18),t.qZA(),t.YNc(30,b,2,0,"mat-error",19),t.qZA(),t.TgZ(31,"mat-form-field",14),t._UZ(32,"input",22,23),t.TgZ(34,"button",17),t.NdJ("click",function(){t.CHM(c);const i=t.MAs(33);return i.type="password"===i.type?"text":"password"}),t.YNc(35,q,1,1,"mat-icon",18),t.YNc(36,S,1,1,"mat-icon",18),t.qZA(),t.YNc(37,E,2,0,"mat-error",19),t.YNc(38,j,2,0,"mat-error",19),t.qZA(),t.TgZ(39,"button",24),t.NdJ("click",function(){return r.resetPassword()}),t.YNc(40,k,2,0,"span",19),t.YNc(41,L,1,2,"mat-progress-spinner",25),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&s){const c=t.MAs(19),a=t.MAs(26),i=t.MAs(33);t.xp6(15),t.Q6J("ngIf",r.showAlert),t.xp6(1),t.Q6J("formGroup",r.updatePasswordForm),t.xp6(2),t.Q6J("formControlName","vc_contrasena_anterior"),t.xp6(3),t.Q6J("ngIf","password"===c.type),t.xp6(1),t.Q6J("ngIf","text"===c.type),t.xp6(1),t.Q6J("ngIf",r.updatePasswordForm.get("vc_contrasena_anterior").hasError("required")),t.xp6(2),t.Q6J("formControlName","vc_contrasena_nueva"),t.xp6(3),t.Q6J("ngIf","password"===a.type),t.xp6(1),t.Q6J("ngIf","text"===a.type),t.xp6(1),t.Q6J("ngIf",r.updatePasswordForm.get("vc_contrasena_nueva").hasError("required")),t.xp6(2),t.Q6J("formControlName","passwordConfirm"),t.xp6(3),t.Q6J("ngIf","password"===i.type),t.xp6(1),t.Q6J("ngIf","text"===i.type),t.xp6(1),t.Q6J("ngIf",r.updatePasswordForm.get("passwordConfirm").hasError("required")),t.xp6(1),t.Q6J("ngIf",r.updatePasswordForm.get("passwordConfirm").hasError("mustMatch")),t.xp6(1),t.Q6J("color","primary")("disabled",r.updatePasswordForm.disabled),t.xp6(1),t.Q6J("ngIf",!r.updatePasswordForm.disabled),t.xp6(1),t.Q6J("ngIf",r.updatePasswordForm.disabled)}},directives:[f.Hw,I.O5,u._Y,u.JL,u.sg,d.KE,h.Nt,u.Fj,u.JJ,u.u,l.lW,d.R9,T.W,d.TO,g.Ou],encapsulation:2,data:{animation:Z.L}}),e})()}];var H=n(4603);let B=(()=>{class e{}return e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[p.Bz.forChild(z),l.ot,d.lN,f.Ps,h.c,g.Cq,_.J,A.fC,P.m,H.A]]}),e})()}}]);