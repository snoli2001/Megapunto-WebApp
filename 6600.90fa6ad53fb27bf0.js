"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[6600],{86600:(ae,h,s)=>{s.r(h),s.d(h,{AuthSignUpModule:()=>ie,MY_FORMATS:()=>b});var _=s(4521),d=s(47423),I=s(77446),m=s(67322),u=s(25245),f=s(98833),c=s(20773),x=s(85804),U=s(77775),N=s(22927),i=s(93075),v=s(28288),e=s(5e3),F=s(88951),g=s(69808),T=s(74107),Z=s(90508),l=s(86856),C=s(98214);function y(o,n){if(1&o&&(e.TgZ(0,"fuse-alert",27),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.Q6J("appearance","outline")("showIcon",!1)("type",t.alert.type)("@shake","error"===t.alert.type),e.xp6(1),e.hij(" ",t.alert.message,"\n")}}function J(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese su nombre "),e.qZA())}function q(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese su correo electr\xf3nico "),e.qZA())}function Q(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese un correo electr\xf3nico v\xe1lido "),e.qZA())}function Y(o,n){1&o&&e._UZ(0,"mat-icon",28),2&o&&e.Q6J("svgIcon","heroicons_solid:eye")}function S(o,n){1&o&&e._UZ(0,"mat-icon",28),2&o&&e.Q6J("svgIcon","heroicons_solid:eye-off")}function w(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese n\xfamero de celular "),e.qZA())}function M(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el tipo de documento "),e.qZA())}function B(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese el n\xfamero de documento "),e.qZA())}function P(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione su fecha de nacimiento "),e.qZA())}function E(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el giro de su negocio "),e.qZA())}function D(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese el tipo de comprobante "),e.qZA())}function G(o,n){1&o&&(e.TgZ(0,"span"),e._uU(1," Siguiente "),e.qZA())}function j(o,n){1&o&&e._UZ(0,"mat-progress-spinner",29),2&o&&e.Q6J("diameter",24)("mode","indeterminate")}let L=(()=>{class o{constructor(t){this.rootFormGroup=t,this.alert={type:"success",message:""},this.showAlert=!1,this.today=new Date}ngOnInit(){this.personalInformationForm=this.rootFormGroup.control}nextStep(){this.personalInformationForm.controls.personalInformation.valid&&this.personalInformationForm.get("step").setValue(2)}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(i.sg))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-personal-information"]],decls:54,vars:30,consts:[[1,"mt-8","text-2xl","font-extrabold","tracking-tight","leading-tight"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],["formGroupName","personalInformation"],[1,"w-full"],["id","name","matInput","","placeholder","Nombre",3,"formControlName"],[4,"ngIf"],["id","email","matInput","","placeholder","Correo electr\xf3nico",3,"formControlName"],["id","password","matInput","","type","password","placeholder","Contrase\xf1a",3,"formControlName"],["passwordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],["id","cellphone","matInput","","placeholder","N\xfamero de celular",3,"formControlName"],["id","telephone","matInput","","placeholder","Tel\xe9fono fijo",3,"formControlName"],[1,"grid","grid-cols-1","md:grid-cols-2"],[1,"md:mr-1"],["id","documentType","placeholder","Documento",3,"formControlName"],[1,"md:ml-2"],["id","documentNumber","matInput","","placeholder","Nro de documento",3,"formControlName"],["id","birthDate","matInput","","placeholder","Fecha de nacimiento",3,"formControlName","matDatepicker","max"],["matSuffix","",3,"for"],["picker",""],["id","businessLine","placeholder","Giro de tu negocio",3,"formControlName"],["id","billType","placeholder","Tipo de comprobante",3,"formControlName"],[1,"flex","justify-end"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","md:w-1/3","mt-6",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(t,r){if(1&t){const a=e.EpF();e.TgZ(0,"div",0),e._uU(1," Datos para afiliarme\n"),e.qZA(),e.YNc(2,y,2,5,"fuse-alert",1),e.TgZ(3,"form",2),e.TgZ(4,"div",3),e.TgZ(5,"mat-form-field",4),e._UZ(6,"input",5),e.YNc(7,J,2,0,"mat-error",6),e.qZA(),e.TgZ(8,"mat-form-field",4),e._UZ(9,"input",7),e.YNc(10,q,2,0,"mat-error",6),e.YNc(11,Q,2,0,"mat-error",6),e.qZA(),e.TgZ(12,"mat-form-field",4),e._UZ(13,"input",8,9),e.TgZ(15,"button",10),e.NdJ("click",function(){e.CHM(a);const A=e.MAs(14);return A.type="password"===A.type?"text":"password"}),e.YNc(16,Y,1,1,"mat-icon",11),e.YNc(17,S,1,1,"mat-icon",11),e.qZA(),e.TgZ(18,"mat-error"),e._uU(19," Ingrese su contrase\xf1a "),e.qZA(),e.qZA(),e.TgZ(20,"mat-form-field",4),e._UZ(21,"input",12),e.YNc(22,w,2,0,"mat-error",6),e.qZA(),e.TgZ(23,"mat-form-field",4),e._UZ(24,"input",13),e.qZA(),e.TgZ(25,"div",14),e.TgZ(26,"mat-form-field",15),e.TgZ(27,"mat-select",16),e.TgZ(28,"mat-option"),e._uU(29,"---"),e.qZA(),e.qZA(),e.YNc(30,M,2,0,"mat-error",6),e.qZA(),e.TgZ(31,"mat-form-field",17),e._UZ(32,"input",18),e.YNc(33,B,2,0,"mat-error",6),e.qZA(),e.qZA(),e.TgZ(34,"mat-form-field",4),e._UZ(35,"input",19),e._UZ(36,"mat-datepicker-toggle",20),e._UZ(37,"mat-datepicker",null,21),e.YNc(39,P,2,0,"mat-error",6),e.qZA(),e.TgZ(40,"mat-form-field",4),e.TgZ(41,"mat-select",22),e.TgZ(42,"mat-option"),e._uU(43,"---"),e.qZA(),e.qZA(),e.YNc(44,E,2,0,"mat-error",6),e.qZA(),e.TgZ(45,"mat-form-field",4),e.TgZ(46,"mat-select",23),e.TgZ(47,"mat-option"),e._uU(48,"---"),e.qZA(),e.qZA(),e.YNc(49,D,2,0,"mat-error",6),e.qZA(),e.TgZ(50,"div",24),e.TgZ(51,"button",25),e.NdJ("click",function(){return r.nextStep()}),e.YNc(52,G,2,0,"span",6),e.YNc(53,j,1,2,"mat-progress-spinner",26),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&t){const a=e.MAs(14),p=e.MAs(38);e.xp6(2),e.Q6J("ngIf",r.showAlert),e.xp6(1),e.Q6J("formGroup",r.personalInformationForm),e.xp6(3),e.Q6J("formControlName","name"),e.xp6(1),e.Q6J("ngIf",r.personalInformationForm.get("personalInformation").get("name").hasError("required")),e.xp6(2),e.Q6J("formControlName","email"),e.xp6(1),e.Q6J("ngIf",r.personalInformationForm.get("personalInformation").get("email").hasError("required")),e.xp6(1),e.Q6J("ngIf",r.personalInformationForm.get("personalInformation").get("email").hasError("email")),e.xp6(2),e.Q6J("formControlName","password"),e.xp6(3),e.Q6J("ngIf","password"===a.type),e.xp6(1),e.Q6J("ngIf","text"===a.type),e.xp6(4),e.Q6J("formControlName","cellphone"),e.xp6(1),e.Q6J("ngIf",r.personalInformationForm.get("personalInformation").get("cellphone").hasError("required")),e.xp6(2),e.Q6J("formControlName","telephone"),e.xp6(3),e.Q6J("formControlName","documentType"),e.xp6(3),e.Q6J("ngIf",r.personalInformationForm.get("personalInformation").get("documentType").hasError("required")),e.xp6(2),e.Q6J("formControlName","documentNumber"),e.xp6(1),e.Q6J("ngIf",r.personalInformationForm.get("personalInformation").get("documentNumber").hasError("required")),e.xp6(2),e.Q6J("formControlName","birthDate")("matDatepicker",p)("max",r.today),e.xp6(1),e.Q6J("for",p),e.xp6(3),e.Q6J("ngIf",r.personalInformationForm.get("personalInformation").get("birthDate").hasError("required")),e.xp6(2),e.Q6J("formControlName","businessLine"),e.xp6(3),e.Q6J("ngIf",r.personalInformationForm.get("personalInformation").get("businessLine").hasError("required")),e.xp6(2),e.Q6J("formControlName","billType"),e.xp6(3),e.Q6J("ngIf",r.personalInformationForm.get("personalInformation").get("billType").hasError("required")),e.xp6(2),e.Q6J("color","primary")("disabled",r.personalInformationForm.disabled),e.xp6(1),e.Q6J("ngIf",!r.personalInformationForm.disabled),e.xp6(1),e.Q6J("ngIf",r.personalInformationForm.disabled)}},directives:[g.O5,i._Y,i.JL,i.sg,i.x0,m.KE,f.Nt,i.Fj,i.JJ,i.u,d.lW,m.R9,m.TO,T.gD,Z.ey,l.hl,l.nW,l.Mq,C.W,u.Hw,c.Ou],styles:[""]}),o})();function k(o,n){if(1&o&&(e.TgZ(0,"fuse-alert",21),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.Q6J("appearance","outline")("showIcon",!1)("type",t.alert.type)("@shake","error"===t.alert.type),e.xp6(1),e.hij(" ",t.alert.message,"\n")}}function O(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese su direcci\xf3n "),e.qZA())}function R(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el centro poblado "),e.qZA())}function W(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el departamento "),e.qZA())}function H(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione la provincia "),e.qZA())}function V(o,n){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el distrito "),e.qZA())}function z(o,n){1&o&&(e.TgZ(0,"span"),e._uU(1," Anterior "),e.qZA())}function X(o,n){1&o&&e._UZ(0,"mat-progress-spinner",22),2&o&&e.Q6J("diameter",24)("mode","indeterminate")}function K(o,n){1&o&&(e.TgZ(0,"span"),e._uU(1," Afiliarme "),e.qZA())}function $(o,n){1&o&&e._UZ(0,"mat-progress-spinner",22),2&o&&e.Q6J("diameter",24)("mode","indeterminate")}let ee=(()=>{class o{constructor(t){this.rootFormGroup=t,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.businessAddressForm=this.rootFormGroup.control}prevStep(){this.businessAddressForm.get("step").setValue(1)}nextStep(){this.businessAddressForm.controls.businessAddress.valid&&console.log("afilarme")}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(i.sg))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-business-address"]],decls:36,vars:22,consts:[[1,"mt-8","text-2xl","font-extrabold","tracking-tight","leading-tight"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],["formGroupName","businessAddress"],[1,"w-full","mb-2"],[1,"w-full"],["id","address","matInput","","placeholder","Direcci\xf3n",3,"formControlName"],[4,"ngIf"],[1,"grid","grid-cols-1","md:grid-cols-2"],[1,"md:mr-1"],["id","village","matInput","","placeholder","Centro poblado",3,"formControlName"],[1,"md:ml-2"],["id","region","matInput","","placeholder","Departamento",3,"formControlName"],["id","city","matInput","","placeholder","Provincia",3,"formControlName"],["id","district","matInput","","placeholder","Distrito",3,"formControlName"],[1,"inline-flex","items-end","justify-between","w-full","mt-1.5"],[3,"color","formControlName"],[1,"underline"],[1,"flex","justify-between"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","md:w-1/3","mt-6",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[3,"diameter","mode"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0),e._uU(1," Agregar direcci\xf3n del comercio\n"),e.qZA(),e.YNc(2,k,2,5,"fuse-alert",1),e.TgZ(3,"form",2),e.TgZ(4,"div",3),e.TgZ(5,"div",4),e.TgZ(6,"span"),e._uU(7,"Ubica tu direcci\xf3n en el mapa con el pin"),e.qZA(),e.qZA(),e.TgZ(8,"mat-form-field",5),e._UZ(9,"input",6),e.YNc(10,O,2,0,"mat-error",7),e.qZA(),e.TgZ(11,"div",8),e.TgZ(12,"mat-form-field",9),e._UZ(13,"input",10),e.YNc(14,R,2,0,"mat-error",7),e.qZA(),e.TgZ(15,"mat-form-field",11),e._UZ(16,"input",12),e.YNc(17,W,2,0,"mat-error",7),e.qZA(),e.qZA(),e.TgZ(18,"div",8),e.TgZ(19,"mat-form-field",9),e._UZ(20,"input",13),e.YNc(21,H,2,0,"mat-error",7),e.qZA(),e.TgZ(22,"mat-form-field",11),e._UZ(23,"input",14),e.YNc(24,V,2,0,"mat-error",7),e.qZA(),e.qZA(),e.TgZ(25,"div",15),e.TgZ(26,"mat-checkbox",16),e.TgZ(27,"a",17),e._uU(28," Acepto los t\xe9rminos y condiciones "),e.qZA(),e.qZA(),e.qZA(),e.TgZ(29,"div",18),e.TgZ(30,"button",19),e.NdJ("click",function(){return r.prevStep()}),e.YNc(31,z,2,0,"span",7),e.YNc(32,X,1,2,"mat-progress-spinner",20),e.qZA(),e.TgZ(33,"button",19),e.NdJ("click",function(){return r.nextStep()}),e.YNc(34,K,2,0,"span",7),e.YNc(35,$,1,2,"mat-progress-spinner",20),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(2),e.Q6J("ngIf",r.showAlert),e.xp6(1),e.Q6J("formGroup",r.businessAddressForm),e.xp6(6),e.Q6J("formControlName","address"),e.xp6(1),e.Q6J("ngIf",r.businessAddressForm.get("businessAddress").get("address").hasError("required")),e.xp6(3),e.Q6J("formControlName","village"),e.xp6(1),e.Q6J("ngIf",r.businessAddressForm.get("businessAddress").get("village").hasError("required")),e.xp6(2),e.Q6J("formControlName","region"),e.xp6(1),e.Q6J("ngIf",r.businessAddressForm.get("businessAddress").get("region").hasError("required")),e.xp6(3),e.Q6J("formControlName","city"),e.xp6(1),e.Q6J("ngIf",r.businessAddressForm.get("businessAddress").get("city").hasError("required")),e.xp6(2),e.Q6J("formControlName","district"),e.xp6(1),e.Q6J("ngIf",r.businessAddressForm.get("businessAddress").get("district").hasError("required")),e.xp6(2),e.Q6J("color","primary")("formControlName","agreements"),e.xp6(4),e.Q6J("color","secondary")("disabled",r.businessAddressForm.disabled),e.xp6(1),e.Q6J("ngIf",!r.businessAddressForm.disabled),e.xp6(1),e.Q6J("ngIf",r.businessAddressForm.disabled),e.xp6(1),e.Q6J("color","primary")("disabled",r.businessAddressForm.disabled),e.xp6(1),e.Q6J("ngIf",!r.businessAddressForm.disabled),e.xp6(1),e.Q6J("ngIf",r.businessAddressForm.disabled))},directives:[g.O5,i._Y,i.JL,i.sg,i.x0,m.KE,f.Nt,i.Fj,i.JJ,i.u,I.oG,d.lW,C.W,m.TO,c.Ou],styles:[""]}),o})();const oe=["signUpNgForm"];function re(o,n){1&o&&e._UZ(0,"app-personal-information")}function ne(o,n){1&o&&e._UZ(0,"app-business-address")}const te=[{path:"",component:(()=>{class o{constructor(t,r,a){this._authService=t,this._formBuilder=r,this._router=a,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.signUpForm=this._formBuilder.group({personalInformation:this._formBuilder.group({name:[""],email:["",[,i.kI.email]],password:[""],cellphone:[""],telephone:[""],documentType:[""],documentNumber:[""],birthDate:[""],businessLine:[""],billType:[""]}),businessAddress:this._formBuilder.group({address:[""],village:[""],region:[""],city:[""],district:[""],agreements:[""]}),step:[1]})}signUp(){this.signUpForm.invalid||(this.signUpForm.disable(),this.showAlert=!1,this._authService.signUp(this.signUpForm.value).subscribe(t=>{this._router.navigateByUrl("/confirmation-required")},t=>{this.signUpForm.enable(),this.signUpNgForm.resetForm(),this.alert={type:"error",message:"Something went wrong, please try again."},this.showAlert=!0}))}signIn(){this._router.navigate(["sign-in"])}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(F.e),e.Y36(i.qu),e.Y36(_.F0))},o.\u0275cmp=e.Xpm({type:o,selectors:[["auth-sign-up"]],viewQuery:function(t,r){if(1&t&&e.Gf(oe,5),2&t){let a;e.iGM(a=e.CRH())&&(r.signUpNgForm=a.first)}},decls:16,vars:3,consts:[[1,"bg-card","flex","items-center","justify-center","sm:bg-primary","p-0","sm:py-18","sm:px-9","md:px-36","md:py-20","flex-auto","w-full"],[1,"rounded-2xl","bg-card","items-center","md:items-start","sm:justify-center","md:justify-start","p-4","md:p-14","lg:p-20","w-2/3"],[1,"grid","grid-cols-1","w-full","sm:w-auto"],[1,"block"],[1,"flex","items-center","justify-between"],[1,"flex","items-center","text-primary","cursor-pointer",3,"click"],["svgIcon","heroicons_outline:chevron-left"],[1,"flex","items-center"],["src","assets/images/logo/mipmap-xhdpi/ic_launcher.png",1,"w-12"],[1,"ml-1.5","hidden","sm:inline-block","font-bold","text-xl","tracking-wide"],[1,"max-w-100","sm:w-60","md:w-90","mx-auto","md:items-center","justify-center"],[3,"formGroup"],[4,"ngIf"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"div",3),e.TgZ(4,"div",4),e.TgZ(5,"a",5),e.NdJ("click",function(){return r.signIn()}),e._UZ(6,"mat-icon",6),e._uU(7," Ir a inicio de sesi\xf3n "),e.qZA(),e.TgZ(8,"div",7),e._UZ(9,"img",8),e.TgZ(10,"span",9),e._uU(11,"megapunto"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(12,"div",10),e.TgZ(13,"form",11),e.YNc(14,re,1,0,"app-personal-information",12),e.YNc(15,ne,1,0,"app-business-address",12),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(13),e.Q6J("formGroup",r.signUpForm),e.xp6(1),e.Q6J("ngIf",1===r.signUpForm.get("step").value),e.xp6(1),e.Q6J("ngIf",2===r.signUpForm.get("step").value))},directives:[u.Hw,i._Y,i.JL,i.sg,g.O5,L,ee],encapsulation:2,data:{animation:v.L}}),o})()}];var se=s(53170);const b={parse:{dateInput:"DD/MM/YYYY"},display:{dateInput:"DD/MM/YYYY",monthYearLabel:"MMMM YYYY",dateA11yLabel:"LL",monthYearA11yLabel:"MM YYYY"}};let ie=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({providers:[{provide:Z.sG,useValue:b},{provide:Z.Ad,useValue:"es-ES"}],imports:[[_.Bz.forChild(te),d.ot,I.p9,m.lN,u.Ps,f.c,T.LD,l.FA,se.Yd,c.Cq,x.J,U.fC,N.m]]}),o})()}}]);