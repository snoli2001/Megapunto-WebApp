"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[551],{4551:(B,g,i)=>{i.r(g),i.d(g,{HistoryModule:()=>$,MY_FORMATS:()=>T});var A=i(4521),f=i(7423),p=i(4834),v=i(5245),y=i(2181),Y=i(5899),b=i(4847),D=i(4999),C=i(1244),S=i(2927),H=i(7579),Z=i(2722),s=i(3075),M=i(5439),l=i.n(M),t=i(5e3),F=i(9122),N=i(4880),U=i(1816),J=i(2340),I=i(520),q=i(8951);let j=(()=>{class n{constructor(e,o){this._httpClient=e,this._authService=o}getHistoryInfo(e,o){const r=(0,U.Z)(this._authService.user);return this._httpClient.post(`${J.N.API_URL}/Transacciones_App/sel_comercio`,{nu_id_negocio:r.nu_id_negocio,nu_id_comercio_app:r.nu_id_comercio_app,dt_fec_inicio:e,dt_fec_final:o})}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(I.eN),t.LFG(q.e))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var m=i(7322),c=i(6856),u=i(9808);function L(n,a){if(1&n&&(t.TgZ(0,"div",18),t.TgZ(1,"div",26),t.TgZ(2,"div",27),t.TgZ(3,"span",28),t._uU(4),t.qZA(),t.qZA(),t.TgZ(5,"div",29),t.TgZ(6,"span"),t._uU(7),t.qZA(),t.qZA(),t.qZA(),t.TgZ(8,"div",30),t.TgZ(9,"div"),t.TgZ(10,"span",31),t._uU(11,"Comisi\xf3n:"),t.qZA(),t.TgZ(12,"span",28),t._uU(13),t.ALo(14,"number"),t.qZA(),t.qZA(),t.TgZ(15,"span",32),t._uU(16),t.ALo(17,"number"),t.qZA(),t.qZA(),t._UZ(18,"mat-divider"),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(4),t.hij(" ",e.vc_desc_grupo_producto," "),t.xp6(3),t.Oqu(e.dt_fecha),t.xp6(6),t.hij(" S/ ",t.xi3(14,4,e.nu_valor_comision,"1.2-2")," "),t.xp6(3),t.hij(" S/ ",t.xi3(17,7,e.nu_precio,"1.2-2")," ")}}function R(n,a){if(1&n&&(t.TgZ(0,"div",18),t.TgZ(1,"div",33),t.TgZ(2,"div",27),t.TgZ(3,"span",28),t._uU(4),t.qZA(),t.qZA(),t.TgZ(5,"span",29),t._uU(6),t.qZA(),t.qZA(),t.TgZ(7,"div",34),t.TgZ(8,"span",31),t._uU(9,"Empresa:"),t.qZA(),t.TgZ(10,"span",28),t._uU(11),t.qZA(),t.qZA(),t.TgZ(12,"div",35),t.TgZ(13,"span",31),t._uU(14,"Monto:"),t.qZA(),t.TgZ(15,"span",28),t._uU(16),t.qZA(),t.qZA(),t._UZ(17,"mat-divider"),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(4),t.hij(" ",e.vc_desc_producto," "),t.xp6(2),t.Oqu(e.dt_fecha),t.xp6(5),t.hij(" ",e.vc_desc_grupo_producto," "),t.xp6(5),t.hij(" S/ ",e.nu_precio," ")}}function E(n,a){if(1&n&&(t.TgZ(0,"div",24),t.YNc(1,L,19,10,"div",25),t.YNc(2,R,18,4,"div",25),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.Q6J("ngIf","Recargas"===e.vc_desc_grupo),t.xp6(1),t.Q6J("ngIf","Recargas"!==e.vc_desc_grupo)}}function O(n,a){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,E,3,2,"div",23),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.transactions)}}function Q(n,a){1&n&&(t.TgZ(0,"div",36),t.TgZ(1,"span",37),t._uU(2," No se encontraron registros para la fecha indicada "),t.qZA(),t.qZA())}const w=[{path:"",component:(()=>{class n{constructor(e,o,r){this._fuseNavigationService=e,this._fuseMediaWatcherService=o,this.historyService=r,this.range=new s.cw({trxStartDate:new s.NI,trxEndDate:new s.NI}),this.transactions=[],this._unsubscribeAll=new H.x,this.myFilter=d=>(d||l()())<l()()}ngOnInit(){this._fuseMediaWatcherService.onMediaChange$.pipe((0,Z.R)(this._unsubscribeAll)).subscribe(({matchingAliases:e})=>{this.isScreenSmall=!e.includes("md")}),this.resetDates()}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}trackByFn(e,o){return o.id||e}toggleNavigation(e){const o=this._fuseNavigationService.getComponent(e);o&&this.isScreenSmall&&o.toggle()}getTransactions(){this.historyService.getHistoryInfo(this.formatDate(this.range.get("trxStartDate").value),this.formatDate(this.range.get("trxStartDate").value)).pipe((0,Z.R)(this._unsubscribeAll)).subscribe(e=>this.transactions=e)}selectFirstDate(e){const o=l()(e).add(7,"days");this.maxDate=o}selectEndDate(){this.range.get("trxEndDate").value&&this.getTransactions()}formatDate(e){return l()(e).format("YYYY-MM-DD")}resetDates(){this.range.get("trxStartDate").setValue(l()()),this.range.get("trxEndDate").setValue(l()()),this.maxDate=l()(new Date),this.getTransactions()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(F.Jf),t.Y36(N.T),t.Y36(j))},n.\u0275cmp=t.Xpm({type:n,selectors:[["history"]],decls:26,vars:8,consts:[[1,"flex","flex-col","flex-auto","w-full",2,"background-color","#7c66f7"],[1,"flex-col","flex-auto","bg-card","relative","p-5","md:p-10",2,"border-top-left-radius","3rem !important","border-bottom-left-radius","3rem !important"],[1,"p-5","md:p-0"],["mat-icon-button","",1,"absolute","md:hidden","top-8","left-8",3,"click"],[3,"svgIcon"],[1,"ml-10","-mt-1.5","md:ml-0","md:mt-0","text-3xl","font-bold"],[1,"grid","grid-cols-1","md:grid-cols-2","my-4"],[1,"min-h-40"],[1,"flex","items-center","justify-between"],[1,"text-lg","font-bold"],[1,"flex","items-center","border-2","border-[#7c66f7]","p-1","w-full","sm:w-80","md:w-full","lg:w-80"],[1,"custom","w-full"],[3,"formGroup","rangePicker","dateFilter","max"],["matStartDate","","formControlName","trxStartDate","placeholder","Fecha Inicio",3,"dateChange"],["matEndDate","","formControlName","trxEndDate","placeholder","Fecha Final",3,"dateChange"],["matSuffix","",3,"for"],["maxRange","7"],["picker",""],[1,"mb-4"],["mat-raised-button","","color","primary",1,"mt-2","w-full","sm:w-60","sm:ml-4","md:w-full","md:ml-0",3,"click"],[1,"border-2","rounded-lg","p-2.5","sm:p-5"],[4,"ngIf"],["class","flex justify-center",4,"ngIf"],["class","my-4",4,"ngFor","ngForOf"],[1,"my-4"],["class","mb-4",4,"ngIf"],[1,"flex","justify-between","mb-1"],[1,"text-[#7c66f7]"],[1,"font-semibold"],[1,"text-sm"],[1,"flex","justify-between","mb-4"],[1,"mr-1"],[1,"font-semibold","text-xl"],[1,"flex","justify-between","mb-1.5"],[1,"block","mb-1.5"],[1,"block","mb-4"],[1,"flex","justify-center"],[1,"font-semibold","text-lg"]],template:function(e,o){if(1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"button",3),t.NdJ("click",function(){return o.toggleNavigation("mainNavigation")}),t._UZ(4,"mat-icon",4),t.qZA(),t.TgZ(5,"div",5),t._uU(6," Historial "),t.qZA(),t.TgZ(7,"div",6),t.TgZ(8,"div",7),t.TgZ(9,"div",8),t.TgZ(10,"span",9),t._uU(11,"Operaciones de mis clientes"),t.qZA(),t.TgZ(12,"div",10),t.TgZ(13,"mat-form-field",11),t.TgZ(14,"mat-date-range-input",12),t.TgZ(15,"input",13),t.NdJ("dateChange",function(d){return o.selectFirstDate(d.value)}),t.qZA(),t.TgZ(16,"input",14),t.NdJ("dateChange",function(){return o.selectEndDate()}),t.qZA(),t.qZA(),t._UZ(17,"mat-datepicker-toggle",15),t._UZ(18,"mat-date-range-picker",16,17),t.qZA(),t.qZA(),t.qZA(),t.TgZ(20,"div",18),t.TgZ(21,"button",19),t.NdJ("click",function(){return o.resetDates()}),t._uU(22," Reiniciar Fechas "),t.qZA(),t.qZA(),t.TgZ(23,"div",20),t.YNc(24,O,2,1,"div",21),t.YNc(25,Q,3,0,"div",22),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e){const r=t.MAs(19);t.xp6(4),t.Q6J("svgIcon","heroicons_outline:menu"),t.xp6(10),t.Q6J("formGroup",o.range)("rangePicker",r)("dateFilter",o.myFilter)("max",o.maxDate),t.xp6(3),t.Q6J("for",r),t.xp6(7),t.Q6J("ngIf",o.transactions.length>0),t.xp6(1),t.Q6J("ngIf",o.transactions.length<1)}},directives:[f.lW,v.Hw,m.KE,c.wx,s.JL,s.sg,c.zY,s.Fj,s.JJ,s.u,c.By,c.nW,m.R9,c._g,u.O5,u.sg,p.d],pipes:[u.JJ],styles:[".custom.mat-form-field.mat-form-field-appearance-fill .mat-form-field-wrapper{margin-bottom:0!important}.custom.mat-form-field.mat-form-field-appearance-fill .mat-form-field-wrapper .mat-form-field-flex{background-color:#fcfbff!important;border-width:0!important}\n"],encapsulation:2,changeDetection:0}),n})()}];var G=i(3170),h=i(508);const T={parse:{dateInput:"DD/MM/YYYY"},display:{dateInput:"DD/MM/YYYY",monthYearLabel:"MMMM YYYY",dateA11yLabel:"LL",monthYearA11yLabel:"MM YYYY"}};let $=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[{provide:h.sG,useValue:T},{provide:h.Ad,useValue:"es-ES"}],imports:[[A.Bz.forChild(w),S.m,f.ot,p.t,v.Ps,y.Tx,Y.Cv,b.JX,D.p0,C.X,m.lN,c.FA,G.Yd]]}),n})()}}]);