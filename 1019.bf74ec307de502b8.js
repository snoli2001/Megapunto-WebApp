"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[1019],{54044:(b,y,o)=>{o.r(y),o.d(y,{HistoryModule:()=>g});var E=o(4521),p=o(47423),_=o(4834),S=o(25245),M=o(92181),C=o(85899),A=o(84847),T=o(32075),V=o(21244),D=o(22927),x=o(77579),l=o(82722),t=o(5e3),e=o(76859),i=o(94880);let h=(()=>{class s{constructor(n,f){this._fuseNavigationService=n,this._fuseMediaWatcherService=f,this._unsubscribeAll=new x.x}ngOnInit(){this._fuseMediaWatcherService.onMediaChange$.pipe((0,l.R)(this._unsubscribeAll)).subscribe(({matchingAliases:n})=>{this.isScreenSmall=!n.includes("md")})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}trackByFn(n,f){return f.id||n}toggleNavigation(n){const f=this._fuseNavigationService.getComponent(n);f&&this.isScreenSmall&&f.toggle()}}return s.\u0275fac=function(n){return new(n||s)(t.Y36(e.Jf),t.Y36(i.T))},s.\u0275cmp=t.Xpm({type:s,selectors:[["history"]],decls:4,vars:1,consts:[[1,"flex","flex-col","flex-auto","w-full",2,"background-color","#7c66f7"],[1,"flex-col","flex-auto","bg-card","relative",2,"border-top-left-radius","3rem !important","border-bottom-left-radius","3rem !important"],["mat-icon-button","",1,"absolute","md:hidden","top-8","left-8",3,"click"],[3,"svgIcon"]],template:function(n,f){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.NdJ("click",function(){return f.toggleNavigation("mainNavigation")}),t._UZ(3,"mat-icon",3),t.qZA(),t.qZA(),t.qZA()),2&n&&(t.xp6(3),t.Q6J("svgIcon","heroicons_outline:menu"))},directives:[p.lW,S.Hw],encapsulation:2,changeDetection:0}),s})();var c=o(61135),r=o(18505),m=o(40520);let u=(()=>{class s{constructor(n){this._httpClient=n,this._data=new c.X(null)}get data$(){return this._data.asObservable()}getData(){return this._httpClient.get("api/dashboards/finance").pipe((0,r.b)(n=>{this._data.next(n)}))}}return s.\u0275fac=function(n){return new(n||s)(t.LFG(m.eN))},s.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();const d=[{path:"",component:h,resolve:{data:(()=>{class s{constructor(n){this._financeService=n}resolve(n,f){return this._financeService.getData()}}return s.\u0275fac=function(n){return new(n||s)(t.LFG(u))},s.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}];let g=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[E.Bz.forChild(d),p.ot,_.t,S.Ps,M.Tx,C.Cv,A.JX,T.p0,V.X,D.m]]}),s})()},20449:(b,y,o)=>{o.d(y,{o2:()=>_,Ov:()=>T,A8:()=>D,yy:()=>C,eX:()=>A,k:()=>x,Z9:()=>S});var E=o(77579),p=o(5e3);class _{}function S(l){return l&&"function"==typeof l.connect}class C{applyChanges(t,e,i,h,c){t.forEachOperation((r,m,u)=>{let a,d;if(null==r.previousIndex){const g=i(r,m,u);a=e.createEmbeddedView(g.templateRef,g.context,g.index),d=1}else null==u?(e.remove(m),d=3):(a=e.get(m),e.move(a,u),d=2);c&&c({context:null==a?void 0:a.context,operation:d,record:r})})}detach(){}}class A{constructor(){this.viewCacheSize=20,this._viewCache=[]}applyChanges(t,e,i,h,c){t.forEachOperation((r,m,u)=>{let a,d;null==r.previousIndex?(a=this._insertView(()=>i(r,m,u),u,e,h(r)),d=a?1:0):null==u?(this._detachAndCacheView(m,e),d=3):(a=this._moveView(m,u,e,h(r)),d=2),c&&c({context:null==a?void 0:a.context,operation:d,record:r})})}detach(){for(const t of this._viewCache)t.destroy();this._viewCache=[]}_insertView(t,e,i,h){const c=this._insertViewFromCache(e,i);if(c)return void(c.context.$implicit=h);const r=t();return i.createEmbeddedView(r.templateRef,r.context,r.index)}_detachAndCacheView(t,e){const i=e.detach(t);this._maybeCacheView(i,e)}_moveView(t,e,i,h){const c=i.get(t);return i.move(c,e),c.context.$implicit=h,c}_maybeCacheView(t,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(t);else{const i=e.indexOf(t);-1===i?t.destroy():e.remove(i)}}_insertViewFromCache(t,e){const i=this._viewCache.pop();return i&&e.insert(i,t),i||null}}class T{constructor(t=!1,e,i=!0){this._multiple=t,this._emitChanges=i,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new E.x,e&&e.length&&(t?e.forEach(h=>this._markSelected(h)):this._markSelected(e[0]),this._selectedToEmit.length=0)}get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}select(...t){this._verifyValueAssignment(t),t.forEach(e=>this._markSelected(e)),this._emitChangeEvent()}deselect(...t){this._verifyValueAssignment(t),t.forEach(e=>this._unmarkSelected(e)),this._emitChangeEvent()}toggle(t){this.isSelected(t)?this.deselect(t):this.select(t)}clear(){this._unmarkAll(),this._emitChangeEvent()}isSelected(t){return this._selection.has(t)}isEmpty(){return 0===this._selection.size}hasValue(){return!this.isEmpty()}sort(t){this._multiple&&this.selected&&this._selected.sort(t)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(t){this.isSelected(t)||(this._multiple||this._unmarkAll(),this._selection.add(t),this._emitChanges&&this._selectedToEmit.push(t))}_unmarkSelected(t){this.isSelected(t)&&(this._selection.delete(t),this._emitChanges&&this._deselectedToEmit.push(t))}_unmarkAll(){this.isEmpty()||this._selection.forEach(t=>this._unmarkSelected(t))}_verifyValueAssignment(t){}}let D=(()=>{class l{constructor(){this._listeners=[]}notify(e,i){for(let h of this._listeners)h(e,i)}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(i=>e!==i)}}ngOnDestroy(){this._listeners=[]}}return l.\u0275fac=function(e){return new(e||l)},l.\u0275prov=p.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})();const x=new p.OlP("_ViewRepeater")}}]);