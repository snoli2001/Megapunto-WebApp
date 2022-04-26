"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[644],{4206:(k,N,m)=>{m.r(N),m.d(N,{AuthSignUpModule:()=>xe,MY_FORMATS:()=>E});var q=m(4521),I=m(7423),x=m(7446),v=m(7322),U=m(5245),C=m(7531),F=m(773),S=m(6236),D=m(7775),w=m(2927),s=m(3075),p=m(8288),e=m(5e3),a=m(8951),l=m(9808),h=m(4707),g=m(4474),d=m(4107),_=m(6856),Z=m(2494),u=m(508);function A(t,i){if(1&t&&(e.TgZ(0,"fuse-alert",36),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.Q6J("appearance","outline")("showIcon",!1)("type",n.alert.type)("@shake","error"===n.alert.type),e.xp6(1),e.hij(" ",n.alert.message,"\n")}}function b(t,i){if(1&t&&(e.TgZ(0,"mat-option",37),e._uU(1),e.qZA()),2&t){const n=i.$implicit;e.Q6J("value",n.nu_id_tipo_doc_identidad),e.xp6(1),e.hij(" ",n.vc_desc_tipo_doc_identidad," ")}}function Q(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el tipo de documento "),e.qZA())}function B(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese el n\xfamero de documento "),e.qZA())}function Y(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese su nombre "),e.qZA())}function O(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese su correo electr\xf3nico "),e.qZA())}function M(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese un correo electr\xf3nico v\xe1lido "),e.qZA())}function P(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione su fecha de nacimiento "),e.qZA())}function L(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese n\xfamero de celular "),e.qZA())}function V(t,i){1&t&&e._UZ(0,"mat-icon",38),2&t&&e.Q6J("svgIcon","heroicons_solid:eye")}function G(t,i){1&t&&e._UZ(0,"mat-icon",38),2&t&&e.Q6J("svgIcon","heroicons_solid:eye-off")}function $(t,i){1&t&&(e.TgZ(0,"span"),e._uU(1," Siguiente "),e.qZA())}function j(t,i){1&t&&e._UZ(0,"mat-progress-spinner",39),2&t&&e.Q6J("diameter",24)("mode","indeterminate")}let R=(()=>{class t{constructor(n,o){this.rootFormGroup=n,this._personalInformationService=o,this.idInputFrontFileName="documentFile",this.idInputBackFileName="documentFile2",this.alert={type:"success",message:""},this.documentFrontName="No file chosen",this.documentBackName="No file chosen",this.showAlert=!1,this.today=new Date}get documentType(){return this.personalInformationForm.controls.personalInformation.get("documentType")}get documentNumber(){return this.personalInformationForm.controls.personalInformation.get("documentNumber")}get name(){return this.personalInformationForm.controls.personalInformation.get("name")}get vc_cadena_imagen_dni_anverso(){return this.personalInformationForm.controls.personalInformation.get("vc_cadena_imagen_dni_anverso")}get vc_cadena_imagen_dni_reverso(){return this.personalInformationForm.controls.personalInformation.get("vc_cadena_imagen_dni_reverso")}onFrontDocumentFileSelected(n){n.target.files.length>0&&(this.documentFrontName=n.target.files[0].name,this.convertFile(n.target.files[0]).subscribe(o=>{this.vc_cadena_imagen_dni_anverso.setValue(o)}))}onBackDocumentFileSelected(n){n.target.files.length>0&&(this.documentBackName=n.target.files[0].name,this.convertFile(n.target.files[0]).subscribe(o=>{this.vc_cadena_imagen_dni_reverso.setValue(o)}))}convertFile(n){const o=new h.t(1),r=new FileReader;return r.readAsBinaryString(n),r.onload=c=>o.next(btoa(c.target.result.toString())),o}ngOnInit(){this.personalInformationForm=this.rootFormGroup.control,this.getDocumentIdSelection()}nextStep(){this.personalInformationForm.controls.personalInformation.valid&&this.personalInformationForm.get("step").setValue(2)}getNameByDNI(){this.documentType.valid&&this.documentNumber.valid?this._personalInformationService.getNameByDNI(this.documentNumber.value).subscribe(n=>{this.name.setValue(n)}):(this.documentType.markAllAsTouched(),this.documentNumber.markAllAsTouched())}getDocumentIdSelection(){this.documentIdTypes$=this._personalInformationService.getDocumentIdSelection()}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(s.sg),e.Y36(g.h))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-personal-information"]],inputs:{idInputFrontFileName:"idInputFrontFileName",idInputBackFileName:"idInputBackFileName"},decls:61,vars:34,consts:[[1,"mt-8","text-2xl","font-extrabold","tracking-tight","leading-tight"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8","w-full",3,"formGroup"],["formGroupName","personalInformation"],[1,"grid","grid-cols-1","md:grid-cols-3"],[1,"md:mr-1","w-full"],["id","documentType","placeholder","Documento",3,"formControlName"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"md:ml-2","flex","w-full","col-span-2"],[1,"w-3/4"],["id","documentNumber","matInput","","placeholder","Nro de documento",3,"formControlName"],["mat-icon-button","","color","primary","type","button",1,"ml-2",3,"click"],["svgIcon","heroicons_outline:search"],[1,"w-full"],["id","name","matInput","","placeholder","Nombre",3,"formControlName"],["id","email","matInput","","placeholder","Correo electr\xf3nico",3,"formControlName"],["id","birthDate","matInput","","placeholder","Fecha de nacimiento",3,"formControlName","matDatepicker","max"],["matSuffix","",3,"for"],["picker",""],[1,"mb-3","flex","items-center","mt-5","md:col-start-2","md:row-start-2"],[1,"w-4/5","px-3","py-1.5","text-base","font-normal","text-gray-700","bg-white","bg-clip-padding","border","border-solid","border-gray-300","rounded","transition","ease-in-out","cursor-pointer","m-0","flex","items-center","justify-center","focus:text-gray-700","focus:bg-white","focus:border-blue-600","focus:outline-none",3,"for"],["svgIcon","heroicons_outline:identification"],[1,"ml-2"],["id","file-chosen",1,"ml-1"],["type","file","accept","image/jpeg","placeholder","Parte delantera de su documento de identidad",1,"inputfile",3,"id","change"],["id","file-chosen-2",1,"ml-1"],["type","file","accept","image/jpeg","placeholder","Parte trasera de su documento de identidad",1,"inputfile",3,"id","change"],["id","cellphone","matInput","","placeholder","N\xfamero de celular",3,"formControlName"],["id","password","matInput","","type","password","placeholder","Contrase\xf1a",3,"formControlName"],["passwordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],[1,"flex","justify-end"],["mat-flat-button","","type","submit",1,"fuse-mat-button-large","w-full","md:w-1/3","mt-6",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[3,"value"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(n,o){if(1&n){const r=e.EpF();e.TgZ(0,"div",0),e._uU(1," Datos para afiliarme\n"),e.qZA(),e.YNc(2,A,2,5,"fuse-alert",1),e.TgZ(3,"form",2),e.TgZ(4,"div",3),e.TgZ(5,"div",4),e.TgZ(6,"mat-form-field",5),e.TgZ(7,"mat-select",6),e.YNc(8,b,2,2,"mat-option",7),e.ALo(9,"async"),e.qZA(),e.YNc(10,Q,2,0,"mat-error",8),e.qZA(),e.TgZ(11,"div",9),e.TgZ(12,"mat-form-field",10),e._UZ(13,"input",11),e.YNc(14,B,2,0,"mat-error",8),e.qZA(),e.TgZ(15,"button",12),e.NdJ("click",function(){return o.getNameByDNI()}),e._UZ(16,"mat-icon",13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(17,"mat-form-field",14),e._UZ(18,"input",15),e.YNc(19,Y,2,0,"mat-error",8),e.qZA(),e.TgZ(20,"mat-form-field",14),e._UZ(21,"input",16),e.YNc(22,O,2,0,"mat-error",8),e.YNc(23,M,2,0,"mat-error",8),e.qZA(),e.TgZ(24,"mat-form-field",14),e._UZ(25,"input",17),e._UZ(26,"mat-datepicker-toggle",18),e._UZ(27,"mat-datepicker",null,19),e.YNc(29,P,2,0,"mat-error",8),e.qZA(),e.TgZ(30,"div",20),e.TgZ(31,"label",21),e._UZ(32,"mat-icon",22),e.TgZ(33,"span",23),e._uU(34,"Parte delantera de su documento de identidad"),e.qZA(),e.qZA(),e.TgZ(35,"span",24),e._uU(36),e.qZA(),e.TgZ(37,"input",25),e.NdJ("change",function(f){return o.onFrontDocumentFileSelected(f)}),e.qZA(),e.qZA(),e.TgZ(38,"div",20),e.TgZ(39,"label",21),e._UZ(40,"mat-icon",22),e.TgZ(41,"span",23),e._uU(42,"Parte trasera de su documento de identidad"),e.qZA(),e.qZA(),e.TgZ(43,"span",26),e._uU(44),e.qZA(),e.TgZ(45,"input",27),e.NdJ("change",function(f){return o.onBackDocumentFileSelected(f)}),e.qZA(),e.qZA(),e.TgZ(46,"mat-form-field",14),e._UZ(47,"input",28),e.YNc(48,L,2,0,"mat-error",8),e.qZA(),e.TgZ(49,"mat-form-field",14),e._UZ(50,"input",29,30),e.TgZ(52,"button",31),e.NdJ("click",function(){e.CHM(r);const f=e.MAs(51);return f.type="password"===f.type?"text":"password"}),e.YNc(53,V,1,1,"mat-icon",32),e.YNc(54,G,1,1,"mat-icon",32),e.qZA(),e.TgZ(55,"mat-error"),e._uU(56," Ingrese su contrase\xf1a "),e.qZA(),e.qZA(),e.TgZ(57,"div",33),e.TgZ(58,"button",34),e.NdJ("click",function(){return o.nextStep()}),e.YNc(59,$,2,0,"span",8),e.YNc(60,j,1,2,"mat-progress-spinner",35),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&n){const r=e.MAs(28),c=e.MAs(51);e.xp6(2),e.Q6J("ngIf",o.showAlert),e.xp6(1),e.Q6J("formGroup",o.personalInformationForm),e.xp6(4),e.Q6J("formControlName","documentType"),e.xp6(1),e.Q6J("ngForOf",e.lcZ(9,32,o.documentIdTypes$)),e.xp6(2),e.Q6J("ngIf",o.personalInformationForm.get("personalInformation").get("documentType").hasError("required")),e.xp6(3),e.Q6J("formControlName","documentNumber"),e.xp6(1),e.Q6J("ngIf",o.personalInformationForm.get("personalInformation").get("documentNumber").hasError("required")),e.xp6(4),e.Q6J("formControlName","name"),e.xp6(1),e.Q6J("ngIf",o.personalInformationForm.get("personalInformation").get("name").hasError("required")),e.xp6(2),e.Q6J("formControlName","email"),e.xp6(1),e.Q6J("ngIf",o.personalInformationForm.get("personalInformation").get("email").hasError("required")),e.xp6(1),e.Q6J("ngIf",o.personalInformationForm.get("personalInformation").get("email").hasError("email")),e.xp6(2),e.Q6J("formControlName","birthDate")("matDatepicker",r)("max",o.today),e.xp6(1),e.Q6J("for",r),e.xp6(3),e.Q6J("ngIf",o.personalInformationForm.get("personalInformation").get("birthDate").hasError("required")),e.xp6(2),e.Q6J("for",o.idInputFrontFileName),e.xp6(5),e.Oqu(o.documentFrontName),e.xp6(1),e.Q6J("id",o.idInputFrontFileName),e.xp6(2),e.Q6J("for",o.idInputBackFileName),e.xp6(5),e.Oqu(o.documentBackName),e.xp6(1),e.Q6J("id",o.idInputBackFileName),e.xp6(2),e.Q6J("formControlName","cellphone"),e.xp6(1),e.Q6J("ngIf",o.personalInformationForm.get("personalInformation").get("cellphone").hasError("required")),e.xp6(2),e.Q6J("formControlName","password"),e.xp6(3),e.Q6J("ngIf","password"===c.type),e.xp6(1),e.Q6J("ngIf","text"===c.type),e.xp6(4),e.Q6J("color","primary")("disabled",o.personalInformationForm.disabled),e.xp6(1),e.Q6J("ngIf",!o.personalInformationForm.disabled),e.xp6(1),e.Q6J("ngIf",o.personalInformationForm.disabled)}},directives:[l.O5,s._Y,s.JL,s.sg,s.x0,v.KE,d.gD,s.JJ,s.u,l.sg,C.Nt,s.Fj,I.lW,U.Hw,_.hl,_.nW,v.R9,_.Mq,v.TO,Z.W,u.ey,F.Ou],pipes:[l.Ov],styles:[".inputfile[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}"]}),t})();function K(t,i){if(1&t&&(e.TgZ(0,"fuse-alert",27),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.Q6J("appearance","outline")("showIcon",!1)("type",n.alert.type)("@shake","error"===n.alert.type),e.xp6(1),e.hij(" ",n.alert.message,"\n")}}function z(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese el n\xfamero de documento "),e.qZA())}function W(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese la raz\xf3n social de su negocio "),e.qZA())}function X(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese el nombre comercial de su negocio "),e.qZA())}function H(t,i){if(1&t&&(e.TgZ(0,"mat-option",7),e._uU(1),e.qZA()),2&t){const n=i.$implicit;e.Q6J("value",n.nu_id_grupo_giro_negocio),e.xp6(1),e.Oqu(n.vc_desc_grupo_giro_negocio)}}function ee(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el giro de su negocio "),e.qZA())}function te(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese el tipo de comprobante "),e.qZA())}function ne(t,i){1&t&&(e.TgZ(0,"span"),e._uU(1," Siguiente "),e.qZA())}function oe(t,i){1&t&&e._UZ(0,"mat-progress-spinner",28),2&t&&e.Q6J("diameter",24)("mode","indeterminate")}let ie=(()=>{class t{constructor(n,o){this.rootFormGroup=n,this._personalInformationService=o,this.showAlert=!1}get ruc(){return this.businessDataForm.controls.businessData.get("ruc")}get businessName(){return this.businessDataForm.controls.businessData.get("businessName")}ngOnInit(){this.businessDataForm=this.rootFormGroup.control,this.getLineOfBusinessSelection()}getNameByRUC(){this.ruc.valid?this._personalInformationService.getBusinessNameByRUC(this.ruc.value).subscribe(n=>{this.businessName.setValue(n)}):this.ruc.markAllAsTouched()}prevStep(){this.businessDataForm.get("step").setValue(1)}nextStep(){this.businessDataForm.controls.businessData.valid&&this.businessDataForm.get("step").setValue(3)}getLineOfBusinessSelection(){this.lineOfBusinesses$=this._personalInformationService.getLineOfBusinessSelection()}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(s.sg),e.Y36(g.h))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-business-data"]],decls:43,vars:22,consts:[[1,"mt-8","text-2xl","font-extrabold","tracking-tight","leading-tight"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8","w-full",3,"formGroup"],["formGroupName","businessData"],[1,"grid","grid-cols-1","md:grid-cols-3"],[1,"md:mr-1","w-full"],["id","documentType","value","ruc",3,"disabled"],[3,"value"],[1,"md:ml-2","flex","w-full","col-span-2"],[1,"w-3/4"],["id","ruc","matInput","","placeholder","Nro de documento",3,"formControlName"],[4,"ngIf"],["mat-icon-button","","color","primary","type","button",1,"ml-2",3,"click"],["svgIcon","heroicons_outline:search"],[1,"w-full"],["id","name","matInput","","placeholder","Raz\xf3n Social",3,"formControlName"],["id","tradename","matInput","","placeholder","Nombre comercial",3,"formControlName"],["id","telephone","matInput","","placeholder","Tel\xe9fono",3,"formControlName"],["id","businessLine","placeholder","Giro de tu negocio",3,"formControlName"],[3,"value",4,"ngFor","ngForOf"],["id","billType","placeholder","Tipo de comprobante",3,"formControlName"],["value","FA"],["value","BV"],[1,"flex","justify-between"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","md:w-1/3","mt-6","border","border-indigo-600","bg-gray-300","text-white",3,"click"],["mat-flat-button","","type","submit",1,"fuse-mat-button-large","w-full","md:w-1/3","mt-6",3,"color","disabled","click"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[3,"diameter","mode"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e._uU(1," Datos para el negocio\n"),e.qZA(),e.YNc(2,K,2,5,"fuse-alert",1),e.TgZ(3,"form",2),e.TgZ(4,"div",3),e.TgZ(5,"div",4),e.TgZ(6,"mat-form-field",5),e.TgZ(7,"mat-select",6),e.TgZ(8,"mat-option",7),e._uU(9," RUC "),e.qZA(),e.qZA(),e.qZA(),e.TgZ(10,"div",8),e.TgZ(11,"mat-form-field",9),e._UZ(12,"input",10),e.YNc(13,z,2,0,"mat-error",11),e.qZA(),e.TgZ(14,"button",12),e.NdJ("click",function(){return o.getNameByRUC()}),e._UZ(15,"mat-icon",13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(16,"mat-form-field",14),e._UZ(17,"input",15),e.YNc(18,W,2,0,"mat-error",11),e.qZA(),e.TgZ(19,"mat-form-field",14),e._UZ(20,"input",16),e.YNc(21,X,2,0,"mat-error",11),e.qZA(),e.TgZ(22,"mat-form-field",14),e._UZ(23,"input",17),e.qZA(),e.TgZ(24,"mat-form-field",14),e.TgZ(25,"mat-select",18),e.YNc(26,H,2,2,"mat-option",19),e.ALo(27,"async"),e.qZA(),e.YNc(28,ee,2,0,"mat-error",11),e.qZA(),e.TgZ(29,"mat-form-field",14),e.TgZ(30,"mat-select",20),e.TgZ(31,"mat-option",21),e._uU(32,"Factura"),e.qZA(),e.TgZ(33,"mat-option",22),e._uU(34,"Boleta de venta"),e.qZA(),e.qZA(),e.YNc(35,te,2,0,"mat-error",11),e.qZA(),e.TgZ(36,"div",23),e.TgZ(37,"button",24),e.NdJ("click",function(){return o.prevStep()}),e.TgZ(38,"span"),e._uU(39," Anterior "),e.qZA(),e.qZA(),e.TgZ(40,"button",25),e.NdJ("click",function(){return o.nextStep()}),e.YNc(41,ne,2,0,"span",11),e.YNc(42,oe,1,2,"mat-progress-spinner",26),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&n&&(e.xp6(2),e.Q6J("ngIf",o.showAlert),e.xp6(1),e.Q6J("formGroup",o.businessDataForm),e.xp6(4),e.Q6J("disabled",!0),e.xp6(1),e.Q6J("value","ruc"),e.xp6(4),e.Q6J("formControlName","ruc"),e.xp6(1),e.Q6J("ngIf",o.businessDataForm.get("businessData").get("ruc").hasError("required")),e.xp6(4),e.Q6J("formControlName","businessName"),e.xp6(1),e.Q6J("ngIf",o.businessDataForm.get("businessData").get("businessName").hasError("required")),e.xp6(2),e.Q6J("formControlName","tradename"),e.xp6(1),e.Q6J("ngIf",o.businessDataForm.get("businessData").get("tradename").hasError("required")),e.xp6(2),e.Q6J("formControlName","telephone"),e.xp6(2),e.Q6J("formControlName","businessLine"),e.xp6(1),e.Q6J("ngForOf",e.lcZ(27,20,o.lineOfBusinesses$)),e.xp6(2),e.Q6J("ngIf",o.businessDataForm.get("businessData").get("businessLine").hasError("required")),e.xp6(2),e.Q6J("formControlName","billType"),e.xp6(5),e.Q6J("ngIf",o.businessDataForm.get("businessData").get("billType").hasError("required")),e.xp6(5),e.Q6J("color","primary")("disabled",o.businessDataForm.disabled),e.xp6(1),e.Q6J("ngIf",!o.businessDataForm.disabled),e.xp6(1),e.Q6J("ngIf",o.businessDataForm.disabled))},directives:[l.O5,s._Y,s.JL,s.sg,s.x0,v.KE,d.gD,u.ey,C.Nt,s.Fj,s.JJ,s.u,I.lW,U.Hw,l.sg,Z.W,v.TO,F.Ou],pipes:[l.Ov],styles:[""]}),t})();var re=function t(i,n){if(i===n)return!0;if(i&&n&&"object"==typeof i&&"object"==typeof n){if(i.constructor!==n.constructor)return!1;var o,r,c;if(Array.isArray(i)){if((o=i.length)!=n.length)return!1;for(r=o;0!=r--;)if(!t(i[r],n[r]))return!1;return!0}if(i.constructor===RegExp)return i.source===n.source&&i.flags===n.flags;if(i.valueOf!==Object.prototype.valueOf)return i.valueOf()===n.valueOf();if(i.toString!==Object.prototype.toString)return i.toString()===n.toString();if((o=(c=Object.keys(i)).length)!==Object.keys(n).length)return!1;for(r=o;0!=r--;)if(!Object.prototype.hasOwnProperty.call(n,c[r]))return!1;for(r=o;0!=r--;){var f=c[r];if(!t(i[f],n[f]))return!1}return!0}return i!=i&&n!=n};const J="__googleMapsScriptId";var T=(()=>{return(t=T||(T={}))[t.INITIALIZED=0]="INITIALIZED",t[t.LOADING=1]="LOADING",t[t.SUCCESS=2]="SUCCESS",t[t.FAILURE=3]="FAILURE",T;var t})();class y{constructor({apiKey:i,channel:n,client:o,id:r=J,libraries:c=[],language:f,region:Se,version:we,mapIds:De,nonce:Je,retries:Ee=3,url:ke="https://maps.googleapis.com/maps/api/js"}){if(this.CALLBACK="__googleMapsCallback",this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.version=we,this.apiKey=i,this.channel=n,this.client=o,this.id=r||J,this.libraries=c,this.language=f,this.region=Se,this.mapIds=De,this.nonce=Je,this.retries=Ee,this.url=ke,y.instance){if(!re(this.options,y.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(y.instance.options)}`);return y.instance}y.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url}}get status(){return this.errors.length?T.FAILURE:this.done?T.SUCCESS:this.loading?T.LOADING:T.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let i=this.url;return i+=`?callback=${this.CALLBACK}`,this.apiKey&&(i+=`&key=${this.apiKey}`),this.channel&&(i+=`&channel=${this.channel}`),this.client&&(i+=`&client=${this.client}`),this.libraries.length>0&&(i+=`&libraries=${this.libraries.join(",")}`),this.language&&(i+=`&language=${this.language}`),this.region&&(i+=`&region=${this.region}`),this.version&&(i+=`&v=${this.version}`),this.mapIds&&(i+=`&map_ids=${this.mapIds.join(",")}`),i}deleteScript(){const i=document.getElementById(this.id);i&&i.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((i,n)=>{this.loadCallback(o=>{o?n(o.error):i(window.google)})})}loadCallback(i){this.callbacks.push(i),this.execute()}setScript(){if(document.getElementById(this.id))return void this.callback();const i=this.createUrl(),n=document.createElement("script");n.id=this.id,n.type="text/javascript",n.src=i,n.onerror=this.loadErrorCallback.bind(this),n.defer=!0,n.async=!0,this.nonce&&(n.nonce=this.nonce),document.head.appendChild(n)}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(i){if(this.errors.push(i),this.errors.length<=this.retries){const n=this.errors.length*Math.pow(2,this.errors.length);console.log(`Failed to load Google Maps script, retrying in ${n} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},n)}else this.onerrorEvent=i,this.callback()}setCallback(){window.__googleMapsCallback=this.callback.bind(this)}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(i=>{i(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version)return console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),void this.callback();this.loading||(this.loading=!0,this.setCallback(),this.setScript())}}}var ae=m(7537);function le(t,i){if(1&t&&(e.TgZ(0,"fuse-alert",25),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.Q6J("appearance","outline")("showIcon",!1)("type",n.alert.type)("@shake","error"===n.alert.type),e.xp6(1),e.hij(" ",n.alert.message,"\n")}}function me(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Ingrese su direcci\xf3n "),e.qZA())}function ce(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el centro poblado "),e.qZA())}function ue(t,i){if(1&t&&(e.TgZ(0,"mat-option",26),e._uU(1),e.qZA()),2&t){const n=i.$implicit;e.Q6J("value",n.nu_id_departamento),e.xp6(1),e.Oqu(n.vc_desc_departamento)}}function de(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el departamento "),e.qZA())}function pe(t,i){if(1&t&&(e.TgZ(0,"mat-option",26),e._uU(1),e.qZA()),2&t){const n=i.$implicit;e.Q6J("value",n.nu_id_provincia),e.xp6(1),e.Oqu(n.vc_desc_provincia)}}function ge(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione la provincia "),e.qZA())}function fe(t,i){if(1&t&&(e.TgZ(0,"mat-option",26),e._uU(1),e.qZA()),2&t){const n=i.$implicit;e.Q6J("value",n.nu_id_distrito),e.xp6(1),e.Oqu(n.vc_desc_distrito)}}function he(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Seleccione el distrito "),e.qZA())}function _e(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Debe aceptar los t\xe9rminos y condiciones "),e.qZA())}function Ze(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Debe aceptar la pol\xedtica de privacidad de datos "),e.qZA())}function Ae(t,i){1&t&&(e.TgZ(0,"span"),e._uU(1," Anterior "),e.qZA())}function ve(t,i){1&t&&e._UZ(0,"mat-progress-spinner",27),2&t&&e.Q6J("diameter",24)("mode","indeterminate")}function Ie(t,i){1&t&&(e.TgZ(0,"span"),e._uU(1," Afiliarme "),e.qZA())}function be(t,i){1&t&&e._UZ(0,"mat-progress-spinner",27),2&t&&e.Q6J("diameter",24)("mode","indeterminate")}let Te=(()=>{class t{constructor(n,o,r){this.rootFormGroup=n,this._businessAddressService=o,this._personalInformationService=r,this.alert={type:"success",message:""},this.showAlert=!1}get region(){return this.signUpForm.controls.businessAddress.get("region")}get city(){return this.signUpForm.controls.businessAddress.get("city")}get district(){return this.signUpForm.controls.businessAddress.get("district")}get address(){return this.signUpForm.controls.businessAddress.get("address")}get agreementsError(){return this.signUpForm.controls.businessAddress.get("agreements").invalid&&this.signUpForm.controls.businessAddress.get("agreements").touched}get secondAgreementsError(){return this.signUpForm.controls.businessAddress.get("secondAgreements").invalid&&this.signUpForm.controls.businessAddress.get("secondAgreements").touched}ngOnInit(){this.getLocation(),this.signUpForm=this.rootFormGroup.control,this.getRegions(),this.getCityByRegion(),this.getDistrictByCity()}prevStep(){this.signUpForm.get("step").setValue(2)}nextStep(){this.signUpForm.controls.businessAddress.valid&&console.log("afilarme")}getRegions(){this.regions$=this._businessAddressService.getRegions()}getCities(n){this.cities$=this._businessAddressService.getCities(n),this.city.setValue(""),this.district.setValue("")}getCityByRegion(){this.region.valueChanges.subscribe(n=>{this.getCities(n)})}getDistrictByCity(){this.city.valueChanges.subscribe(n=>{this.getDistrict(this.region.value,n)})}getDistrict(n,o){this.districts$=this._businessAddressService.getDistricts(n,o),this.district.setValue("")}getLocation(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(n=>{this.latitude=n.coords.latitude,this.longitude=n.coords.longitude,new y({apiKey:"AIzaSyCNagAMyh4X7_h3y3D_i0iVAUu-duLc6RQ",version:"weekly"}).load().then(()=>{this.map=new google.maps.Map(document.getElementById("map"),{center:{lat:this.latitude,lng:this.longitude},zoom:17,mapId:"76743e0f9d3b8cfd"}),this.marker=new google.maps.Marker({map:this.map,icon:"https://maps.google.com/mapfiles/ms/micons/purple-dot.png"}),this.marker.setPosition({lat:this.latitude,lng:this.longitude}),this.marker.setMap(this.map),this.geocoder=new google.maps.Geocoder,this.map.addListener("click",r=>{this.geocode({location:r.latLng})})})})}geocode(n){this.clear(),this.geocoder.geocode(n).then(o=>{const{results:r}=o,c=`${r[0].address_components[1].long_name} ${r[0].address_components[0].long_name}, ${r[0].address_components[3].long_name}`;return console.log(r[0].geometry.location.lat()),console.log(r[0].geometry.location.lng()),this.latitude=r[0].geometry.location.lat(),this.longitude=r[0].geometry.location.lng(),this.map.setCenter(r[0].geometry.location),this.marker.setPosition(r[0].geometry.location),this.marker.setMap(this.map),this.address.setValue(c),r}).catch(o=>{alert("Geocode was not successful for the following reason: "+o)})}clear(){this.marker.setMap(null)}signUp(){this.signUpForm.markAllAsTouched();const n=this.signUpForm.controls.personalInformation,o=this.signUpForm.controls.businessData,r=this.signUpForm.controls.businessAddress;if(this.signUpForm.valid&&this.latitude&&this.longitude){const c={nu_id_tipo_doc_identidad:n.get("documentType").value,vc_nro_doc_identidad:n.get("documentNumber").value,vc_nombre_contacto:n.get("name").value,vc_email:n.get("email").value,vc_celular:n.get("cellphone").value,nu_dia:new Date(n.get("birthDate").value).getDay().toString(),nu_mes:new Date(n.get("birthDate").value).getMonth().toString(),nu_anio:new Date(n.get("birthDate").value).getFullYear().toString(),vc_cadena_imagen_dni_anverso:n.get("vc_cadena_imagen_dni_anverso").value,vc_cadena_imagen_dni_reverso:n.get("vc_cadena_imagen_dni_reverso").value,vc_ruc_comercio:o.get("ruc").value,vc_nombre_comercio:o.get("tradename").value,vc_razon_social_comercio:o.get("businessName").value,vc_telefono:o.get("telephone").value,nu_id_grupo_giro_negocio:o.get("businessLine").value,ch_tipo_documento:o.get("billType").value,nu_longitud:this.longitude.toString(),nu_latitud:this.latitude.toString(),vc_direccion:r.get("address").value,vc_centro_poblado:r.get("village").value,nu_id_departamento:r.get("region").value,nu_id_provincia:r.get("city").value,nu_id_distrito:r.get("district").value};this._personalInformationService.signUp(c).subscribe(f=>console.log(f))}}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(s.sg),e.Y36(ae.g),e.Y36(g.h))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-business-address"]],decls:49,vars:34,consts:[[1,"mt-8","text-2xl","font-extrabold","tracking-tight","leading-tight"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8","w-full",3,"formGroup"],["formGroupName","businessAddress",1,"w-full","flex","flex-col","justify-center"],["id","map",1,"h-90","w-full"],[1,"w-full","my-3"],[1,"w-full"],["id","address","matInput","","placeholder","Direcci\xf3n",3,"formControlName"],[4,"ngIf"],[1,"grid","grid-cols-1","md:grid-cols-2"],[1,"md:mr-1"],["id","village","matInput","","placeholder","Centro poblado",3,"formControlName"],[1,"md:ml-2"],["id","region","placeholder","Departamento",3,"formControlName"],[3,"value",4,"ngFor","ngForOf"],["id","city","matInput","","placeholder","Provincia",3,"formControlName"],["id","district","matInput","","placeholder","Distrito",3,"formControlName"],[1,"inline-flex","items-end","justify-between","w-full","mt-1.5"],[3,"color","formControlName"],["href","https://megapunto.pe/terminosycondiciones/","target","_blank",1,"underline"],["href","https://megapunto.pe/politicaprivacidad/","target","_blank",1,"underline"],[1,"flex","justify-between"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","md:w-1/3","mt-6","border","border-indigo-600","bg-gray-300","text-white",3,"disabled","click"],[3,"diameter","mode",4,"ngIf"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","md:w-1/3","mt-6",3,"color","disabled","click"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[3,"value"],[3,"diameter","mode"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e._uU(1," Agregar direcci\xf3n del comercio\n"),e.qZA(),e.YNc(2,le,2,5,"fuse-alert",1),e.TgZ(3,"form",2),e.TgZ(4,"div",3),e._UZ(5,"div",4),e.TgZ(6,"div",5),e.TgZ(7,"span"),e._uU(8,"Ubica tu direcci\xf3n en el mapa con el pin"),e.qZA(),e.qZA(),e.TgZ(9,"mat-form-field",6),e._UZ(10,"input",7),e.YNc(11,me,2,0,"mat-error",8),e.qZA(),e.TgZ(12,"div",9),e.TgZ(13,"mat-form-field",10),e._UZ(14,"input",11),e.YNc(15,ce,2,0,"mat-error",8),e.qZA(),e.TgZ(16,"mat-form-field",12),e.TgZ(17,"mat-select",13),e.YNc(18,ue,2,2,"mat-option",14),e.ALo(19,"async"),e.qZA(),e.YNc(20,de,2,0,"mat-error",8),e.qZA(),e.qZA(),e.TgZ(21,"div",9),e.TgZ(22,"mat-form-field",10),e.TgZ(23,"mat-select",15),e.YNc(24,pe,2,2,"mat-option",14),e.ALo(25,"async"),e.qZA(),e.YNc(26,ge,2,0,"mat-error",8),e.qZA(),e.TgZ(27,"mat-form-field",12),e.TgZ(28,"mat-select",16),e.YNc(29,fe,2,2,"mat-option",14),e.ALo(30,"async"),e.qZA(),e.YNc(31,he,2,0,"mat-error",8),e.qZA(),e.qZA(),e.TgZ(32,"div",17),e.TgZ(33,"mat-checkbox",18),e.TgZ(34,"a",19),e._uU(35," Acepto los t\xe9rminos y condiciones "),e.qZA(),e.qZA(),e.qZA(),e.YNc(36,_e,2,0,"mat-error",8),e.TgZ(37,"div",17),e.TgZ(38,"mat-checkbox",18),e.TgZ(39,"a",20),e._uU(40," Acepto la pol\xedtica de privacidad de datos "),e.qZA(),e.qZA(),e.qZA(),e.YNc(41,Ze,2,0,"mat-error",8),e.TgZ(42,"div",21),e.TgZ(43,"button",22),e.NdJ("click",function(){return o.prevStep()}),e.YNc(44,Ae,2,0,"span",8),e.YNc(45,ve,1,2,"mat-progress-spinner",23),e.qZA(),e.TgZ(46,"button",24),e.NdJ("click",function(){return o.signUp()}),e.YNc(47,Ie,2,0,"span",8),e.YNc(48,be,1,2,"mat-progress-spinner",23),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&n&&(e.xp6(2),e.Q6J("ngIf",o.showAlert),e.xp6(1),e.Q6J("formGroup",o.signUpForm),e.xp6(7),e.Q6J("formControlName","address"),e.xp6(1),e.Q6J("ngIf",o.signUpForm.get("businessAddress").get("address").hasError("required")),e.xp6(3),e.Q6J("formControlName","village"),e.xp6(1),e.Q6J("ngIf",o.signUpForm.get("businessAddress").get("village").hasError("required")),e.xp6(2),e.Q6J("formControlName","region"),e.xp6(1),e.Q6J("ngForOf",e.lcZ(19,28,o.regions$)),e.xp6(2),e.Q6J("ngIf",o.signUpForm.get("businessAddress").get("region").hasError("required")),e.xp6(3),e.Q6J("formControlName","city"),e.xp6(1),e.Q6J("ngForOf",e.lcZ(25,30,o.cities$)),e.xp6(2),e.Q6J("ngIf",o.signUpForm.get("businessAddress").get("city").hasError("required")),e.xp6(2),e.Q6J("formControlName","district"),e.xp6(1),e.Q6J("ngForOf",e.lcZ(30,32,o.districts$)),e.xp6(2),e.Q6J("ngIf",o.signUpForm.get("businessAddress").get("district").hasError("required")),e.xp6(2),e.Q6J("color","primary")("formControlName","agreements"),e.xp6(3),e.Q6J("ngIf",o.agreementsError),e.xp6(2),e.Q6J("color","primary")("formControlName","secondAgreements"),e.xp6(3),e.Q6J("ngIf",o.secondAgreementsError),e.xp6(2),e.Q6J("disabled",o.signUpForm.disabled),e.xp6(1),e.Q6J("ngIf",!o.signUpForm.disabled),e.xp6(1),e.Q6J("ngIf",o.signUpForm.disabled),e.xp6(1),e.Q6J("color","primary")("disabled",o.signUpForm.disabled),e.xp6(1),e.Q6J("ngIf",!o.signUpForm.disabled),e.xp6(1),e.Q6J("ngIf",o.signUpForm.disabled))},directives:[l.O5,s._Y,s.JL,s.sg,s.x0,v.KE,C.Nt,s.Fj,s.JJ,s.u,d.gD,l.sg,x.oG,I.lW,Z.W,v.TO,u.ey,F.Ou],pipes:[l.Ov],styles:[""]}),t})();const ye=["signUpNgForm"];function Ce(t,i){1&t&&e._UZ(0,"app-personal-information")}function Fe(t,i){1&t&&e._UZ(0,"app-business-data")}function Ue(t,i){1&t&&e._UZ(0,"app-business-address")}const Ne=[{path:"",component:(()=>{class t{constructor(n,o,r){this._authService=n,this._formBuilder=o,this._router=r,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.signUpForm=this._formBuilder.group({personalInformation:this._formBuilder.group({name:["",s.kI.required],email:["",[s.kI.required,s.kI.email]],password:["",s.kI.required],cellphone:["",s.kI.required],documentType:["",s.kI.required],documentNumber:["",s.kI.required],birthDate:["",s.kI.required],vc_cadena_imagen_dni_anverso:["",s.kI.required],vc_cadena_imagen_dni_reverso:["",s.kI.required]}),businessData:this._formBuilder.group({ruc:["",s.kI.required],businessName:["",s.kI.required],tradename:["",s.kI.required],telephone:["",s.kI.required],businessLine:["",s.kI.required],billType:["",s.kI.required]}),businessAddress:this._formBuilder.group({address:["",s.kI.required],village:["",s.kI.required],region:["",s.kI.required],city:["",s.kI.required],district:["",s.kI.required],agreements:["",s.kI.requiredTrue],secondAgreements:["",s.kI.requiredTrue]}),step:[1]})}signUp(){this.signUpForm.invalid||(this.signUpForm.disable(),this.showAlert=!1,this._authService.signUp(this.signUpForm.value).subscribe(n=>{this._router.navigateByUrl("/confirmation-required")},n=>{this.signUpForm.enable(),this.signUpNgForm.resetForm(),this.alert={type:"error",message:"Something went wrong, please try again."},this.showAlert=!0}))}signIn(){this._router.navigate(["sign-in"])}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(a.e),e.Y36(s.qu),e.Y36(q.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["auth-sign-up"]],viewQuery:function(n,o){if(1&n&&e.Gf(ye,5),2&n){let r;e.iGM(r=e.CRH())&&(o.signUpNgForm=r.first)}},decls:17,vars:4,consts:[[1,"bg-card","flex","items-center","justify-center","sm:bg-primary","p-0","sm:py-18","sm:px-9","md:px-36","md:py-20","flex-auto","w-full"],[1,"rounded-2xl","bg-card","items-center","md:items-start","sm:justify-center","md:justify-start","p-4","md:p-14","lg:p-20","w-2/3"],[1,"grid","grid-cols-1","w-full","sm:w-auto"],[1,"block"],[1,"flex","items-center","justify-between"],[1,"flex","items-center","text-primary","cursor-pointer",3,"click"],["svgIcon","heroicons_outline:chevron-left"],[1,"flex","items-center"],["src","assets/images/logo/mipmap-xhdpi/ic_launcher.png",1,"w-12"],[1,"ml-1.5","hidden","sm:inline-block","font-bold","text-xl","tracking-wide"],[1,"md:w-3/4","w-full","mx-auto","md:items-center","justify-center"],[1,"w-full",3,"formGroup"],[4,"ngIf"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"div",3),e.TgZ(4,"div",4),e.TgZ(5,"a",5),e.NdJ("click",function(){return o.signIn()}),e._UZ(6,"mat-icon",6),e._uU(7," Ir a inicio de sesi\xf3n "),e.qZA(),e.TgZ(8,"div",7),e._UZ(9,"img",8),e.TgZ(10,"span",9),e._uU(11,"megapunto"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(12,"div",10),e.TgZ(13,"form",11),e.YNc(14,Ce,1,0,"app-personal-information",12),e.YNc(15,Fe,1,0,"app-business-data",12),e.YNc(16,Ue,1,0,"app-business-address",12),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&n&&(e.xp6(13),e.Q6J("formGroup",o.signUpForm),e.xp6(1),e.Q6J("ngIf",1===o.signUpForm.get("step").value),e.xp6(1),e.Q6J("ngIf",2===o.signUpForm.get("step").value),e.xp6(1),e.Q6J("ngIf",3===o.signUpForm.get("step").value))},directives:[U.Hw,s._Y,s.JL,s.sg,l.O5,R,ie,Te],encapsulation:2,data:{animation:p.L}}),t})()}];var qe=m(3170);const E={parse:{dateInput:"DD/MM/YYYY"},display:{dateInput:"DD/MM/YYYY",monthYearLabel:"MMMM YYYY",dateA11yLabel:"LL",monthYearA11yLabel:"MM YYYY"}};let xe=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[{provide:u.sG,useValue:E},{provide:u.Ad,useValue:"es-ES"}],imports:[[q.Bz.forChild(Ne),I.ot,x.p9,v.lN,U.Ps,C.c,d.LD,_.FA,qe.Yd,F.Cq,S.J,D.fC,w.m]]}),t})()},449:(k,N,m)=>{m.d(N,{Ov:()=>S,A8:()=>w,yy:()=>C,eX:()=>F,k:()=>s,Z9:()=>v});var q=m(7579),I=m(5e3);function v(p){return p&&"function"==typeof p.connect}class C{applyChanges(e,a,l,h,g){e.forEachOperation((d,_,Z)=>{let u,A;if(null==d.previousIndex){const b=l(d,_,Z);u=a.createEmbeddedView(b.templateRef,b.context,b.index),A=1}else null==Z?(a.remove(_),A=3):(u=a.get(_),a.move(u,Z),A=2);g&&g({context:null==u?void 0:u.context,operation:A,record:d})})}detach(){}}class F{constructor(){this.viewCacheSize=20,this._viewCache=[]}applyChanges(e,a,l,h,g){e.forEachOperation((d,_,Z)=>{let u,A;null==d.previousIndex?(u=this._insertView(()=>l(d,_,Z),Z,a,h(d)),A=u?1:0):null==Z?(this._detachAndCacheView(_,a),A=3):(u=this._moveView(_,Z,a,h(d)),A=2),g&&g({context:null==u?void 0:u.context,operation:A,record:d})})}detach(){for(const e of this._viewCache)e.destroy();this._viewCache=[]}_insertView(e,a,l,h){const g=this._insertViewFromCache(a,l);if(g)return void(g.context.$implicit=h);const d=e();return l.createEmbeddedView(d.templateRef,d.context,d.index)}_detachAndCacheView(e,a){const l=a.detach(e);this._maybeCacheView(l,a)}_moveView(e,a,l,h){const g=l.get(e);return l.move(g,a),g.context.$implicit=h,g}_maybeCacheView(e,a){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(e);else{const l=a.indexOf(e);-1===l?e.destroy():a.remove(l)}}_insertViewFromCache(e,a){const l=this._viewCache.pop();return l&&a.insert(l,e),l||null}}class S{constructor(e=!1,a,l=!0){this._multiple=e,this._emitChanges=l,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new q.x,a&&a.length&&(e?a.forEach(h=>this._markSelected(h)):this._markSelected(a[0]),this._selectedToEmit.length=0)}get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}select(...e){this._verifyValueAssignment(e),e.forEach(a=>this._markSelected(a)),this._emitChangeEvent()}deselect(...e){this._verifyValueAssignment(e),e.forEach(a=>this._unmarkSelected(a)),this._emitChangeEvent()}toggle(e){this.isSelected(e)?this.deselect(e):this.select(e)}clear(){this._unmarkAll(),this._emitChangeEvent()}isSelected(e){return this._selection.has(e)}isEmpty(){return 0===this._selection.size}hasValue(){return!this.isEmpty()}sort(e){this._multiple&&this.selected&&this._selected.sort(e)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(e){this.isSelected(e)||(this._multiple||this._unmarkAll(),this._selection.add(e),this._emitChanges&&this._selectedToEmit.push(e))}_unmarkSelected(e){this.isSelected(e)&&(this._selection.delete(e),this._emitChanges&&this._deselectedToEmit.push(e))}_unmarkAll(){this.isEmpty()||this._selection.forEach(e=>this._unmarkSelected(e))}_verifyValueAssignment(e){}}let w=(()=>{class p{constructor(){this._listeners=[]}notify(a,l){for(let h of this._listeners)h(a,l)}listen(a){return this._listeners.push(a),()=>{this._listeners=this._listeners.filter(l=>a!==l)}}ngOnDestroy(){this._listeners=[]}}return p.\u0275fac=function(a){return new(a||p)},p.\u0275prov=I.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p})();const s=new I.OlP("_ViewRepeater")}}]);