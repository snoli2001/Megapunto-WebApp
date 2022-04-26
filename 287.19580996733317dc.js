"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[287],{4287:(Y,u,e)=>{e.r(u),e.d(u,{BalanceModule:()=>F});var d=e(8966),m=e(4521),c=e(7423),f=e(9832),g=e(4834),p=e(5245),v=e(2181),h=e(5899),Z=e(4847),b=e(4999),A=e(7238),T=e(1244),B=e(2927),t=e(5e3),r=e(9808);function x(a,l){1&a&&t._UZ(0,"object",5)}function C(a,l){1&a&&t._UZ(0,"object",6)}let U=(()=>{class a{constructor(n,o){this.data=n,this.matDialogRef=o}ngOnInit(){}close(){this.matDialogRef.close()}}return a.\u0275fac=function(n){return new(n||a)(t.Y36(d.WI),t.Y36(d.so))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-bank-guide-pdf-pop-up"]],decls:6,vars:3,consts:[[1,"m-10","flex","justify-center",3,"ngSwitch"],["data","assets/pdfs/MEGAPUNTO_BBVA.pdf","width","900px","height","700px","type","application/pdf",4,"ngSwitchCase"],["type","application/pdf","data","assets/pdfs/MEGAPUNTO_BCP.pdf","width","900px","height","700px",4,"ngSwitchCase"],[1,"flex","justify-center","w-full","my-5"],["mat-raised-button","",1,"text-white","bg-gray-500",3,"click"],["data",t.$Z9`assets/pdfs/MEGAPUNTO_BBVA.pdf`,"width","900px","height","700px","type","application/pdf"],["type","application/pdf","data",t.$Z9`assets/pdfs/MEGAPUNTO_BCP.pdf`,"width","900px","height","700px"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0),t.YNc(1,x,1,0,"object",1),t.YNc(2,C,1,0,"object",2),t.qZA(),t.TgZ(3,"div",3),t.TgZ(4,"button",4),t.NdJ("click",function(){return o.close()}),t._uU(5," Cerrar "),t.qZA(),t.qZA()),2&n&&(t.Q6J("ngSwitch",o.data),t.xp6(1),t.Q6J("ngSwitchCase","BBVA"),t.xp6(1),t.Q6J("ngSwitchCase","BCP"))},directives:[r.RF,r.n9,c.lW],styles:[""]}),a})();var i=e(3075),y=e(2722),P=e(4004),S=e(7579),N=e(9122),I=e(4880),q=e(9568);const G=[{path:"",component:(()=>{class a{constructor(n,o,s,J,D){this.fb=n,this._fuseNavigationService=o,this._fuseMediaWatcherService=s,this._balanceService=J,this._matDialog=D,this._unsubscribeAll=new S.x}ngOnInit(){this._fuseMediaWatcherService.onMediaChange$.pipe((0,y.R)(this._unsubscribeAll)).subscribe(({matchingAliases:n})=>{this.isScreenSmall=!n.includes("md")}),this.initData(),this.initBalanceForm()}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}initData(){this.balance$=this._balanceService.getBalance().pipe((0,P.U)(n=>n.nu_saldo))}trackByFn(n,o){return o.id||n}toggleNavigation(n){const o=this._fuseNavigationService.getComponent(n);o&&o.toggle()}openGuide(n){this._matDialog.open(U,{data:n})}initBalanceForm(){this.balanceForm=this.fb.group({nu_id_comercio:["",i.kI.required],nu_id_tipo_moneda:["1",i.kI.required],nu_id_cta_cte:["",i.kI.required],ch_destino:["MX",i.kI.required],vc_nro_operacion:["",i.kI.required],nu_importe:["",i.kI.required],dt_fec_operacion:["",i.kI.required],vc_cadena_imagen:["",i.kI.required]})}}return a.\u0275fac=function(n){return new(n||a)(t.Y36(i.qu),t.Y36(N.Jf),t.Y36(I.T),t.Y36(q.m),t.Y36(d.uw))},a.\u0275cmp=t.Xpm({type:a,selectors:[["balance"]],decls:40,vars:4,consts:[[1,"flex","flex-col","flex-auto","w-full",2,"background-color","#7c66f7"],[1,"flex-col","flex-auto","bg-card","relative","p-5","md:p-10",2,"border-top-left-radius","3rem !important","border-bottom-left-radius","3rem !important"],[1,"p-5","md:p-0"],["mat-icon-button","",1,"absolute","md:hidden","top-8","left-8",3,"click"],[3,"svgIcon"],[1,"ml-10","-mt-1.5","md:ml-0","md:mt-0","text-3xl","font-bold"],[1,"flex","flex-col","my-4","w-full","md:w-3/4"],[1,"min-h-40"],[1,"flex","items-center","mb-4"],[1,"text-lg","font-bold"],[1,"grid","grid-cols-1","sm:grid-cols-2","border-2","rounded-lg","p-2.5","sm:p-5"],[1,"flex","justify-center","items-center","px-3","py-1","border-2","shadow-sm","rounded-lg","w-full","sm:min-w-24","sm:max-w-60"],[1,"text-[#7c66f7]","font-bold","text-xl"],[1,"my-2","sm:mx-2"],[1,"block","font-semibold"],[1,"text-base","border-2","rounded-lg","min-h-40","mt-4","p-2.5","sm:p-5"],[1,"font-semibold","uppercase","tracking-wide"],[1,"w-1/6","border-[#7c66f7]","border-b-2","my-1"],[1,"mt-2","mb-4"],[1,"font-semibold"],[1,"flex","mt-5"],[1,"bg-blue-900","px-8","py-1","text-white","rounded","font-semibold","w-28",3,"click"],[1,"bg-blue-500","px-8","py-1","text-white","rounded","font-semibold","w-28","ml-5",3,"click"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"button",3),t.NdJ("click",function(){return o.toggleNavigation("mainNavigation")}),t._UZ(4,"mat-icon",4),t.qZA(),t.TgZ(5,"div",5),t._uU(6," Saldo "),t.qZA(),t.TgZ(7,"div",6),t.TgZ(8,"div",7),t.TgZ(9,"div",8),t.TgZ(10,"span",9),t._uU(11,"Tu saldo actual"),t.qZA(),t.qZA(),t.TgZ(12,"div",10),t.TgZ(13,"div",11),t.TgZ(14,"span",12),t._uU(15),t.ALo(16,"async"),t.qZA(),t.qZA(),t.TgZ(17,"div",13),t.TgZ(18,"span",14),t._uU(19,"\xdaltima fecha de tu recarga:"),t.qZA(),t.TgZ(20,"span"),t._uU(21,"30 de abril de 2020"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(22,"div",7),t.TgZ(23,"span",9),t._uU(24,"Informaci\xf3n de recargas"),t.qZA(),t.TgZ(25,"div",15),t.TgZ(26,"div",16),t._uU(27," \xbfQu\xe9 necesito para recargar mi saldo? "),t._UZ(28,"div",17),t.qZA(),t.TgZ(29,"div",18),t._uU(30," Tienes que depositar el monto que necesites a una de nuestra cuentas bancarias "),t.qZA(),t.TgZ(31,"div",19),t._uU(32," Nuestras cuentas bancarias "),t.qZA(),t.TgZ(33,"div"),t._uU(34,"Puede realizar el dep\xf3sito en la cuenta que elijas:"),t.qZA(),t.TgZ(35,"div",20),t.TgZ(36,"button",21),t.NdJ("click",function(){return o.openGuide("BCP")}),t._uU(37," BCP "),t.qZA(),t.TgZ(38,"button",22),t.NdJ("click",function(){return o.openGuide("BBVA")}),t._uU(39," BBVA "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n&&(t.xp6(4),t.Q6J("svgIcon","heroicons_outline:menu"),t.xp6(11),t.hij("S/ ",t.lcZ(16,2,o.balance$),""))},directives:[c.lW,p.Hw],pipes:[r.Ov],encapsulation:2,changeDetection:0}),a})()}];var j=e(7322),M=e(4107),k=e(7531);let F=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[m.Bz.forChild(G),c.ot,f.vV,g.t,p.Ps,v.Tx,h.Cv,Z.JX,b.p0,A.AV,T.X,B.m,j.lN,M.LD,k.c,d.Is]]}),a})()}}]);