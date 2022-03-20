"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[3477],{33477:(qt,F,d)=>{d.r(F),d.d(F,{ScrumboardModule:()=>Jt});var _=d(4521),x=d(53737),v=d(47423),Q=d(77446),D=d(48966),V=d(90508),Z=d(86856),B=d(67322),C=d(25245),U=d(98833),S=d(92181),z=d(53170),$=d(85899),b=d(15439),j=d(22927),L=d(77579),A=d(82722),t=d(5e3),J=d(61135),u=d(54004),f=d(18505),g=d(95698),h=d(63900),q=d(62843),E=d(39646);class O{constructor(n){this.id=n.id||null,this.title=n.title,this.description=n.description||null,this.icon=n.icon||null,this.lastActivity=n.lastActivity||null,this.lists=[],this.labels=[],this.members=[],n.lists&&(this.lists=n.lists.map(e=>e instanceof y?e:new y(e))),n.labels&&(this.labels=n.labels.map(e=>e instanceof I?e:new I(e))),n.members&&(this.members=n.members.map(e=>e instanceof R?e:new R(e)))}}class y{constructor(n){this.id=n.id||null,this.boardId=n.boardId,this.position=n.position,this.title=n.title,this.cards=[],n.cards&&(this.cards=n.cards.map(e=>e instanceof k?e:new k(e)))}}class k{constructor(n){this.id=n.id||null,this.boardId=n.boardId,this.listId=n.listId,this.position=n.position,this.title=n.title,this.description=n.description||null,this.labels=[],this.dueDate=n.dueDate||null,n.labels&&(this.labels=n.labels.map(e=>e instanceof I?e:new I(e)))}}class R{constructor(n){this.id=n.id||null,this.name=n.name,this.avatar=n.avatar||null}}class I{constructor(n){this.id=n.id||null,this.boardId=n.boardId,this.title=n.title}}var G=d(40520);let T=(()=>{class i{constructor(e){this._httpClient=e,this._board=new J.X(null),this._boards=new J.X(null),this._card=new J.X(null)}get board$(){return this._board.asObservable()}get boards$(){return this._boards.asObservable()}get card$(){return this._card.asObservable()}getBoards(){return this._httpClient.get("api/apps/scrumboard/boards").pipe((0,u.U)(e=>e.map(r=>new O(r))),(0,f.b)(e=>this._boards.next(e)))}getBoard(e){return this._httpClient.get("api/apps/scrumboard/board",{params:{id:e}}).pipe((0,u.U)(r=>new O(r)),(0,f.b)(r=>this._board.next(r)))}createBoard(e){return this.boards$.pipe((0,g.q)(1),(0,h.w)(r=>this._httpClient.put("api/apps/scrumboard/board",{board:e}).pipe((0,u.U)(o=>(this._boards.next([...r,o]),o)))))}updateBoard(e,r){return this.boards$.pipe((0,g.q)(1),(0,h.w)(o=>this._httpClient.patch("api/apps/scrumboard/board",{id:e,board:r}).pipe((0,u.U)(s=>{const a=o.findIndex(c=>c.id===e);return o[a]=s,this._boards.next(o),s}))))}deleteBoard(e){return this.boards$.pipe((0,g.q)(1),(0,h.w)(r=>this._httpClient.delete("api/apps/scrumboard/board",{params:{id:e}}).pipe((0,u.U)(o=>{const s=r.findIndex(a=>a.id===e);return r.splice(s,1),this._boards.next(r),this._board.next(null),this._card.next(null),o}))))}createList(e){return this._httpClient.post("api/apps/scrumboard/board/list",{list:e}).pipe((0,u.U)(r=>new y(r)),(0,f.b)(r=>{const o=this._board.value;o.lists=[...o.lists,r],o.lists.sort((s,a)=>s.position-a.position),this._board.next(o)}))}updateList(e){return this._httpClient.patch("api/apps/scrumboard/board/list",{list:e}).pipe((0,u.U)(r=>new y(r)),(0,f.b)(r=>{const o=this._board.value,s=o.lists.findIndex(a=>a.id===e.id);o.lists[s]=r,o.lists.sort((a,c)=>a.position-c.position),this._board.next(o)}))}updateLists(e){return this._httpClient.patch("api/apps/scrumboard/board/lists",{lists:e}).pipe((0,u.U)(r=>r.map(o=>new y(o))),(0,f.b)(r=>{const o=this._board.value;r.forEach(s=>{const a=o.lists.findIndex(c=>c.id===s.id);o.lists[a]=s}),o.lists.sort((s,a)=>s.position-a.position),this._board.next(o)}))}deleteList(e){return this._httpClient.delete("api/apps/scrumboard/board/list",{params:{id:e}}).pipe((0,f.b)(r=>{const o=this._board.value,s=o.lists.findIndex(a=>a.id===e);o.lists.splice(s,1),o.lists.sort((a,c)=>a.position-c.position),this._board.next(o)}))}getCard(e){return this._board.pipe((0,g.q)(1),(0,u.U)(r=>{const o=r.lists.find(s=>s.cards.some(a=>a.id===e)).cards.find(s=>s.id===e);return this._card.next(o),o}),(0,h.w)(r=>r?(0,E.of)(r):(0,q._)("Could not found the card with id of "+e+"!")))}createCard(e){return this._httpClient.put("api/apps/scrumboard/board/card",{card:e}).pipe((0,u.U)(r=>new k(r)),(0,f.b)(r=>{const o=this._board.value;return o.lists.forEach((s,a,c)=>{s.id===r.listId&&c[a].cards.push(r)}),this._board.next(o),r}))}updateCard(e,r){return this.board$.pipe((0,g.q)(1),(0,h.w)(o=>this._httpClient.patch("api/apps/scrumboard/board/card",{id:e,card:r}).pipe((0,u.U)(s=>(o.lists.forEach(a=>{a.cards.forEach((c,p,w)=>{c.id===e&&(w[p]=s)})}),this._board.next(o),this._card.next(s),s)))))}updateCards(e){return this._httpClient.patch("api/apps/scrumboard/board/cards",{cards:e}).pipe((0,u.U)(r=>r.map(o=>new k(o))),(0,f.b)(r=>{const o=this._board.value;r.forEach(s=>{const a=o.lists.findIndex(p=>p.id===s.listId),c=o.lists[a].cards.findIndex(p=>p.id===s.id);o.lists[a].cards[c]=s,o.lists[a].cards.sort((p,w)=>p.position-w.position)}),this._board.next(o)}))}deleteCard(e){return this.board$.pipe((0,g.q)(1),(0,h.w)(r=>this._httpClient.delete("api/apps/scrumboard/board/card",{params:{id:e}}).pipe((0,u.U)(o=>(r.lists.forEach(s=>{s.cards.forEach((a,c,p)=>{a.id===e&&p.splice(c,1)})}),this._board.next(r),this._card.next(null),o)))))}updateCardPositions(e){}createLabel(e){return this.board$.pipe((0,g.q)(1),(0,h.w)(r=>this._httpClient.post("api/apps/scrumboard/board/label",{label:e}).pipe((0,u.U)(o=>(r.labels=[...r.labels,o],this._board.next(r),o)))))}updateLabel(e,r){return this.board$.pipe((0,g.q)(1),(0,h.w)(o=>this._httpClient.patch("api/apps/scrumboard/board/label",{id:e,label:r}).pipe((0,u.U)(s=>{const a=o.labels.findIndex(c=>c.id===e);return o.labels[a]=s,this._board.next(o),s}))))}deleteLabel(e){return this.board$.pipe((0,g.q)(1),(0,h.w)(r=>this._httpClient.delete("api/apps/scrumboard/board/label",{params:{id:e}}).pipe((0,u.U)(o=>{const s=r.labels.findIndex(a=>a.id===e);return r.labels.splice(s,1),o&&r.lists.forEach(a=>{a.cards.forEach(c=>{const p=c.labels.findIndex(w=>w.id===e);p>-1&&c.labels.splice(p,1)})}),this._board.next(r),o}))))}search(e){return this._httpClient.get("api/apps/scrumboard/board/search",{params:{query:e}})}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(G.eN))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var N=d(29071),m=d(69808);function H(i,n){if(1&i&&(t.ynx(0),t._UZ(1,"img",18),t.BQk()),2&i){const e=n.$implicit;t.xp6(1),t.Q6J("src",e.avatar,t.LSH)}}function K(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"div",19),t.TgZ(2,"div",20),t._uU(3),t.qZA(),t.qZA(),t.BQk()),2&i){const e=t.oxw(2).$implicit;t.xp6(3),t.hij(" +",e.members.slice(5).length," ")}}function P(i,n){if(1&i&&(t.ynx(0),t._UZ(1,"div",16),t.TgZ(2,"div",17),t.YNc(3,H,2,1,"ng-container",4),t.YNc(4,K,4,1,"ng-container",12),t.qZA(),t.BQk()),2&i){const e=t.oxw().$implicit,r=t.oxw();t.xp6(3),t.Q6J("ngForOf",e.members.slice(0,5))("ngForTrackBy",r.trackByFn),t.xp6(1),t.Q6J("ngIf",e.members.length>5)}}const X=function(i){return[i]};function W(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"a",7),t.TgZ(2,"div",8),t._UZ(3,"mat-icon",9),t.qZA(),t.TgZ(4,"div",10),t._uU(5),t.qZA(),t.TgZ(6,"div",11),t._uU(7),t.qZA(),t.YNc(8,P,5,3,"ng-container",12),t.TgZ(9,"div",13),t.TgZ(10,"div",14),t._uU(11,"Edited:"),t.qZA(),t.TgZ(12,"div",15),t._uU(13),t.qZA(),t.qZA(),t.qZA(),t.BQk()),2&i){const e=n.$implicit,r=t.oxw();t.xp6(1),t.Q6J("routerLink",t.VKq(6,X,e.id)),t.xp6(2),t.Q6J("svgIcon",e.icon),t.xp6(2),t.Oqu(e.title),t.xp6(2),t.Oqu(e.description),t.xp6(1),t.Q6J("ngIf",null==e.members?null:e.members.length),t.xp6(5),t.Oqu(r.formatDateAsRelative(e.lastActivity))}}let tt=(()=>{class i{constructor(e,r){this._changeDetectorRef=e,this._scrumboardService=r,this._unsubscribeAll=new L.x}ngOnInit(){this._scrumboardService.boards$.pipe((0,A.R)(this._unsubscribeAll)).subscribe(e=>{this.boards=e,this._changeDetectorRef.markForCheck()})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}formatDateAsRelative(e){return b(e,b.ISO_8601).fromNow()}trackByFn(e,r){return r.id||e}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(t.sBO),t.Y36(T))},i.\u0275cmp=t.Xpm({type:i,selectors:[["scrumboard-boards"]],decls:8,vars:3,consts:[["cdkScrollable","",1,"absolute","inset-0","flex","flex-col","min-w-0","overflow-y-auto"],[1,"flex","flex-col","flex-auto","items-center","p-6","sm:p-10"],[1,"mt-4","md:mt-24","text-3xl","md:text-6xl","font-extrabold","tracking-tight","leading-7","sm:leading-10"],[1,"grid","grid-cols-1","sm:grid-cols-2","lg:grid-cols-4","gap-4","mt-8","md:mt-16"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"flex","flex-col","items-center","justify-center","w-56","rounded-lg","cursor-pointer","border-2","border-gray-300","border-dashed","hover:bg-hover","transition-colors","duration-150","ease-in-out"],[1,"icon-size-12","text-hint",3,"svgIcon"],[1,"flex","flex-col","items-start","w-56","p-6","rounded-lg","shadow","bg-card","rounded-lg","hover:shadow-xl","transition-shadow","duration-150","ease-in-out",3,"routerLink"],[1,"flex","items-center","justify-center","p-4","rounded-full","bg-primary-50","text-primary-700","dark:bg-primary","dark:text-on-primary"],[1,"text-current",3,"svgIcon"],[1,"mt-5","text-lg","font-medium","leading-5"],[1,"mt-0.5","line-clamp-2","text-secondary"],[4,"ngIf"],[1,"flex","items-center","mt-4","text-md","font-md"],[1,"text-secondary"],[1,"ml-1"],[1,"w-12","h-1","mt-6","border-t-2"],[1,"flex","items-center","mt-6","-space-x-1.5"],["alt","Member avatar",1,"flex-0","w-8","h-8","rounded-full","ring","ring-offset-1","ring-bg-card","ring-offset-transparent","object-cover",3,"src"],[1,"flex","flex-0","items-center","justify-center","w-8","h-8","rounded-full","ring","ring-offset-1","ring-bg-card","ring-offset-transparent","bg-gray-200","text-gray-500"],[1,"text-md","font-semibold"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t._uU(3," Scrumboard Boards "),t.qZA(),t.TgZ(4,"div",3),t.YNc(5,W,14,8,"ng-container",4),t.TgZ(6,"div",5),t._UZ(7,"mat-icon",6),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(5),t.Q6J("ngForOf",r.boards)("ngForTrackBy",r.trackByFn),t.xp6(2),t.Q6J("svgIcon","heroicons_outline:plus"))},directives:[N.PQ,m.sg,C.Hw,_.yS,m.O5],encapsulation:2,changeDetection:0}),i})();var Y=d(70262);let et=(()=>{class i{constructor(e){this._scrumboardService=e}resolve(e,r){return this._scrumboardService.getBoards()}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(T))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})(),rt=(()=>{class i{constructor(e,r){this._router=e,this._scrumboardService=r}resolve(e,r){return this._scrumboardService.getBoard(e.paramMap.get("boardId")).pipe((0,Y.K)(o=>{console.error(o);const s=r.url.split("/").slice(0,-1).join("/");return this._router.navigateByUrl(s),(0,q._)(o)}))}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(_.F0),t.LFG(T))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})(),ot=(()=>{class i{constructor(e,r){this._router=e,this._scrumboardService=r}resolve(e,r){return this._scrumboardService.getCard(e.paramMap.get("cardId")).pipe((0,Y.K)(o=>{console.error(o);const s=r.url.split("/").slice(0,-1).join("/");return this._router.navigateByUrl(s),(0,q._)(o)}))}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(_.F0),t.LFG(T))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var l=d(93075),it=d(71683);const nt=["titleInput"],st=function(i){return{"opacity-0 pointer-events-none":i}},at=function(i){return{"opacity-0":i}};let dt=(()=>{class i{constructor(e,r){this._changeDetectorRef=e,this._formBuilder=r,this.buttonTitle="Add a list",this.saved=new t.vpe,this.formVisible=!1}ngOnInit(){this.form=this._formBuilder.group({title:[""]})}save(){const e=this.form.get("title").value;!e||""===e.trim()||(this.saved.next(e.trim()),this.form.get("title").setValue(""),this.formVisible=!1,this._changeDetectorRef.markForCheck())}toggleFormVisibility(){this.formVisible=!this.formVisible,this.formVisible&&this.titleInput.nativeElement.focus()}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(t.sBO),t.Y36(l.qu))},i.\u0275cmp=t.Xpm({type:i,selectors:[["scrumboard-board-add-list"]],viewQuery:function(e,r){if(1&e&&t.Gf(nt,5),2&e){let o;t.iGM(o=t.CRH())&&(r.titleInput=o.first)}},inputs:{buttonTitle:"buttonTitle"},outputs:{saved:"saved"},decls:14,vars:18,consts:[[1,"mt-11","w-64","py-2.5","px-2"],[1,"relative","flex","w-full","h-full","overflow-hidden","rounded-xl","bg-gray-200","dark:bg-gray-700"],["mat-button","","disableRipple","",1,"absolute","inset-0","justify-start","w-full","px-3","rounded-xl","bg-transparent",3,"ngClass","click"],[1,"icon-size-5",3,"svgIcon"],[1,"ml-2","text-secondary"],[1,"flex","flex-col","items-start","w-full","p-3",3,"ngClass","formGroup"],[1,"w-full","py-2","px-3","leading-5","rounded-md","shadow-sm","border","border-gray-300","bg-white","focus:border-primary","dark:border-gray-500","dark:focus:border-primary","dark:bg-black","dark:bg-opacity-5",3,"autocomplete","formControlName","placeholder","keydown.enter"],["titleInput",""],[1,"flex","items-center","mt-2"],["mat-flat-button","",1,"h-8","min-h-8",3,"color","type","click"],["mat-icon-button","",1,"ml-1","w-8","h-8","min-h-8",3,"type","click"],[1,"icon-size-4",3,"svgIcon"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.NdJ("click",function(){return r.toggleFormVisibility()}),t._UZ(3,"mat-icon",3),t.TgZ(4,"span",4),t._uU(5),t.qZA(),t.qZA(),t.TgZ(6,"form",5),t.TgZ(7,"input",6,7),t.NdJ("keydown.enter",function(){return r.save()}),t.qZA(),t.TgZ(9,"div",8),t.TgZ(10,"button",9),t.NdJ("click",function(){return r.save()}),t._uU(11," Add list "),t.qZA(),t.TgZ(12,"button",10),t.NdJ("click",function(){return r.toggleFormVisibility()}),t._UZ(13,"mat-icon",11),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.ekj("h-15",!r.formVisible),t.xp6(2),t.Q6J("ngClass",t.VKq(14,st,r.formVisible)),t.xp6(1),t.Q6J("svgIcon","heroicons_outline:plus-circle"),t.xp6(2),t.Oqu(r.buttonTitle),t.xp6(1),t.Q6J("ngClass",t.VKq(16,at,!r.formVisible))("formGroup",r.form),t.xp6(1),t.Q6J("autocomplete","off")("formControlName","title")("placeholder","Enter list title..."),t.xp6(3),t.Q6J("color","primary")("type","button"),t.xp6(2),t.Q6J("type","button"),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:x"))},directives:[v.lW,m.mk,C.Hw,l._Y,l.JL,l.sg,l.Fj,l.JJ,l.u],encapsulation:2,changeDetection:0}),i})();var M=d(74533);const ct=["titleInput"],lt=["titleAutosize"],ut=function(i){return{"opacity-0 pointer-events-none":i}},pt=function(i){return{"opacity-0":i}};let mt=(()=>{class i{constructor(e,r){this._changeDetectorRef=e,this._formBuilder=r,this.buttonTitle="Add a card",this.saved=new t.vpe,this.formVisible=!1}ngOnInit(){this.form=this._formBuilder.group({title:[""]})}save(){const e=this.form.get("title").value;!e||""===e.trim()||(this.saved.next(e.trim()),this.formVisible=!1,this.form.get("title").setValue(""),setTimeout(()=>{this.titleInput.nativeElement.value="",this.titleAutosize.reset()}),this._changeDetectorRef.markForCheck())}toggleFormVisibility(){this.formVisible=!this.formVisible,this.formVisible&&this.titleInput.nativeElement.focus()}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(t.sBO),t.Y36(l.qu))},i.\u0275cmp=t.Xpm({type:i,selectors:[["scrumboard-board-add-card"]],viewQuery:function(e,r){if(1&e&&(t.Gf(ct,5),t.Gf(lt,5)),2&e){let o;t.iGM(o=t.CRH())&&(r.titleInput=o.first),t.iGM(o=t.CRH())&&(r.titleAutosize=o.first)}},inputs:{buttonTitle:"buttonTitle"},outputs:{saved:"saved"},decls:17,vars:18,consts:[[1,"p-3","pt-0"],[1,"relative","flex","w-full","h-full","rounded-lg"],["mat-button","","disableRipple","",1,"absolute","inset-0","justify-start","w-full","px-5","rounded-lg",3,"ngClass","click"],[1,"icon-size-5",3,"svgIcon"],[1,"ml-2","text-secondary"],[1,"flex","flex-col","items-start","w-full",3,"ngClass","formGroup"],[1,"flex","w-full","p-5","rounded-lg","shadow","bg-card"],["cdkTextareaAutosize","",1,"w-full","text-lg","font-medium","leading-5",3,"spellcheck","formControlName","placeholder","keydown.enter"],["titleInput","","titleAutosize","cdkTextareaAutosize"],[1,"flex","items-center","mt-2"],["mat-flat-button","",1,"h-8","min-h-8",3,"color","type","click"],["mat-icon-button","",1,"ml-1","w-8","h-8","min-h-8",3,"type","click"],[1,"icon-size-4",3,"svgIcon"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.NdJ("click",function(){return r.toggleFormVisibility()}),t._UZ(3,"mat-icon",3),t.TgZ(4,"span",4),t._uU(5),t.qZA(),t.qZA(),t.TgZ(6,"form",5),t.TgZ(7,"div",6),t.TgZ(8,"textarea",7,8),t.NdJ("keydown.enter",function(){return r.save()}),t._uU(11,"                "),t.qZA(),t.qZA(),t.TgZ(12,"div",9),t.TgZ(13,"button",10),t.NdJ("click",function(){return r.save()}),t._uU(14," Add card "),t.qZA(),t.TgZ(15,"button",11),t.NdJ("click",function(){return r.toggleFormVisibility()}),t._UZ(16,"mat-icon",12),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.ekj("h-13",!r.formVisible),t.xp6(2),t.Q6J("ngClass",t.VKq(14,ut,r.formVisible)),t.xp6(1),t.Q6J("svgIcon","heroicons_outline:plus-circle"),t.xp6(2),t.Oqu(r.buttonTitle),t.xp6(1),t.Q6J("ngClass",t.VKq(16,pt,!r.formVisible))("formGroup",r.form),t.xp6(2),t.Q6J("spellcheck","off")("formControlName","title")("placeholder","Enter card title..."),t.xp6(5),t.Q6J("color","primary")("type","button"),t.xp6(2),t.Q6J("type","button"),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:x"))},directives:[v.lW,m.mk,C.Hw,l._Y,l.JL,l.sg,M.IC,l.Fj,l.JJ,l.u],encapsulation:2,changeDetection:0}),i})();function bt(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"div",30),t._UZ(2,"img",31),t.qZA(),t.BQk()),2&i){const e=t.oxw().$implicit;t.xp6(2),t.Q6J("src",e.coverImage,t.LSH)}}function ft(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"div",33),t._uU(2),t.qZA(),t.BQk()),2&i){const e=n.$implicit;t.xp6(2),t.hij(" ",e.title," ")}}function gt(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"div"),t.TgZ(2,"div",32),t.YNc(3,ft,3,1,"ng-container",11),t.qZA(),t.qZA(),t.BQk()),2&i){const e=t.oxw().$implicit,r=t.oxw(2);t.xp6(3),t.Q6J("ngForOf",e.labels)("ngForTrackBy",r.trackByFn)}}const ht=function(i){return{"text-red-600":i}};function _t(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"div",34),t._UZ(2,"mat-icon",35),t.TgZ(3,"div",20),t._uU(4),t.ALo(5,"date"),t.qZA(),t.qZA(),t.BQk()),2&i){const e=t.oxw().$implicit,r=t.oxw(2);t.xp6(1),t.Q6J("ngClass",t.VKq(6,ht,r.isOverdue(e.dueDate))),t.xp6(1),t.Q6J("svgIcon","heroicons_outline:clock"),t.xp6(2),t.hij(" ",t.xi3(5,3,e.dueDate,"longDate")," ")}}const xt=function(i){return["card",i]};function vt(i,n){if(1&i&&(t.ynx(0),t.TgZ(1,"a",27),t.YNc(2,bt,3,1,"ng-container",28),t.TgZ(3,"div",29),t._uU(4),t.qZA(),t.YNc(5,gt,4,2,"ng-container",28),t.YNc(6,_t,6,8,"ng-container",28),t.qZA(),t.BQk()),2&i){const e=n.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(5,xt,e.id)),t.xp6(1),t.Q6J("ngIf",e.coverImage),t.xp6(2),t.Oqu(e.title),t.xp6(1),t.Q6J("ngIf",e.labels.length),t.xp6(1),t.Q6J("ngIf",e.dueDate)}}function Zt(i,n){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"div",14),t.TgZ(2,"div",15),t.TgZ(3,"div",16),t.TgZ(4,"input",17,18),t.NdJ("focusout",function(o){const a=t.CHM(e).$implicit;return t.oxw().updateListTitle(o,a)})("keydown.enter",function(){return t.CHM(e),t.MAs(5).blur()}),t.qZA(),t.qZA(),t.TgZ(6,"div",19),t._uU(7),t.qZA(),t.TgZ(8,"div",20),t.TgZ(9,"button",21),t._UZ(10,"mat-icon",22),t.qZA(),t.TgZ(11,"mat-menu",null,23),t.TgZ(13,"button",24),t.NdJ("click",function(){t.CHM(e);const o=t.MAs(5);return t.oxw().renameList(o)}),t._UZ(14,"mat-icon",22),t._uU(15," Rename list "),t.qZA(),t.TgZ(16,"button",24),t.NdJ("click",function(){const s=t.CHM(e).$implicit;return t.oxw().deleteList(s.id)}),t._UZ(17,"mat-icon",22),t._uU(18," Delete list "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(19,"div",25),t.TgZ(20,"div",26),t.NdJ("cdkDropListDropped",function(o){return t.CHM(e),t.oxw().cardDropped(o)}),t.YNc(21,vt,7,7,"ng-container",11),t.qZA(),t.TgZ(22,"scrumboard-board-add-card",12),t.NdJ("saved",function(o){const a=t.CHM(e).$implicit;return t.oxw().addCard(a,o)}),t.qZA(),t.qZA(),t.qZA(),t.BQk()}if(2&i){const e=n.$implicit,r=t.MAs(12),o=t.oxw();t.xp6(1),t.Q6J("cdkDragLockAxis","x"),t.xp6(3),t.Q6J("spellcheck","false")("value",e.title),t.xp6(3),t.hij(" ",e.cards.length," "),t.xp6(2),t.Q6J("matMenuTriggerFor",r),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:dots-vertical"),t.xp6(4),t.Q6J("svgIcon","heroicons_solid:pencil-alt"),t.xp6(3),t.Q6J("svgIcon","heroicons_solid:trash"),t.xp6(3),t.Q6J("id",e.id)("cdkDropListData",e.cards),t.xp6(1),t.Q6J("ngForOf",e.cards)("ngForTrackBy",o.trackByFn),t.xp6(1),t.Q6J("buttonTitle",e.cards.length?"Add another card":"Add a card")}}const Ct=function(){return[".."]};let yt=(()=>{class i{constructor(e,r,o,s){this._changeDetectorRef=e,this._formBuilder=r,this._fuseConfirmationService=o,this._scrumboardService=s,this._positionStep=65536,this._maxListCount=200,this._maxPosition=500*this._positionStep,this._unsubscribeAll=new L.x}ngOnInit(){this.listTitleForm=this._formBuilder.group({title:[""]}),this._scrumboardService.board$.pipe((0,A.R)(this._unsubscribeAll)).subscribe(e=>{this.board=Object.assign({},e),this._changeDetectorRef.markForCheck()})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}renameList(e){setTimeout(()=>{e.focus()})}addList(e){if(this.board.lists.length>=this._maxListCount)return;const r=new y({boardId:this.board.id,position:this.board.lists.length?this.board.lists[this.board.lists.length-1].position+this._positionStep:this._positionStep,title:e});this._scrumboardService.createList(r).subscribe()}updateListTitle(e,r){const o=e.target,s=o.value;s&&""!==s.trim()?(r.title=o.value=s.trim(),this._scrumboardService.updateList(r).subscribe()):o.value=r.title}deleteList(e){this._fuseConfirmationService.open({title:"Delete list",message:"Are you sure you want to delete this list and its cards? This action cannot be undone!",actions:{confirm:{label:"Delete"}}}).afterClosed().subscribe(o=>{"confirmed"===o&&this._scrumboardService.deleteList(e).subscribe()})}addCard(e,r){const o=new k({boardId:this.board.id,listId:e.id,position:e.cards.length?e.cards[e.cards.length-1].position+this._positionStep:this._positionStep,title:r});this._scrumboardService.createCard(o).subscribe()}listDropped(e){(0,x.bA)(e.container.data,e.previousIndex,e.currentIndex);const r=this._calculatePositions(e);this._scrumboardService.updateLists(r).subscribe()}cardDropped(e){e.previousContainer===e.container?(0,x.bA)(e.container.data,e.previousIndex,e.currentIndex):((0,x.EA)(e.previousContainer.data,e.container.data,e.previousIndex,e.currentIndex),e.container.data[e.currentIndex].listId=e.container.id);const r=this._calculatePositions(e);this._scrumboardService.updateCards(r).subscribe()}isOverdue(e){return b(e,b.ISO_8601).isBefore(b(),"days")}trackByFn(e,r){return r.id||e}_calculatePositions(e){let r=e.container.data;const o=r[e.currentIndex],s=r[e.currentIndex-1]||null,a=r[e.currentIndex+1]||null;return o.position=s?a?(s.position+a.position)/2:s.position+this._positionStep:a?a.position/2:this._positionStep,!Number.isInteger(o.position)||o.position>=this._maxPosition?(r=r.map((c,p)=>(c.position=(p+1)*this._positionStep,c)),r):[o]}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(t.sBO),t.Y36(l.qu),t.Y36(it.R),t.Y36(T))},i.\u0275cmp=t.Xpm({type:i,selectors:[["scrumboard-board"]],decls:19,vars:10,consts:[[1,"absolute","inset-0","flex","flex-col","min-w-0","overflow-hidden"],[1,"flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","p-6","sm:py-8","sm:px-10","border-b","bg-card","dark:bg-transparent"],[1,"flex-1","min-w-0"],[1,"text-3xl","md:text-4xl","font-extrabold","tracking-tight","leading-7","sm:leading-10","truncate"],[1,"flex","shrink-0","items-center","mt-6","sm:mt-0","sm:ml-4"],["mat-stroked-button","",3,"routerLink"],[1,"icon-size-5","mr-2",3,"svgIcon"],["mat-stroked-button","",1,"ml-3"],["cdkScrollable","",1,"flex-auto","p-6","sm:p-8","sm:pt-4","overflow-y-auto"],["cdkDropList","",1,"flex",3,"cdkDropListData","cdkDropListOrientation","cdkDropListDropped"],["cdkDropListGroup","",1,"flex","items-start"],[4,"ngFor","ngForOf","ngForTrackBy"],[3,"buttonTitle","saved"],[1,"absolute","invisible","w-0","h-0","opacity-0","pointer-events-none"],["cdkDrag","",1,"flex-0","w-72","p-2","rounded-2xl","bg-default",3,"cdkDragLockAxis"],["cdkDragHandle","",1,"flex","items-center","justify-between"],[1,"flex","items-center","w-full","py-2","px-3","rounded-md","cursor-text","border","border-transparent","focus-within:bg-white","focus-within:shadow-sm","focus-within:border-primary","dark:focus-within:bg-gray-900"],[1,"w-full","font-medium","leading-5","bg-transparent",3,"spellcheck","value","focusout","keydown.enter"],["listTitleInput",""],[1,"flex","items-center","justify-center","min-w-6","ml-4","text-sm","font-semibold","leading-6","rounded-full","bg-gray-300","text-secondary","dark:bg-gray-700"],[1,"ml-1"],["mat-icon-button","",1,"w-8","h-8","min-h-8",3,"matMenuTriggerFor"],[1,"icon-size-5",3,"svgIcon"],["listMenu","matMenu"],["mat-menu-item","",3,"click"],[1,"mt-2","rounded-xl","bg-gray-400","bg-opacity-12","dark:bg-transparent","dark:border"],["cdkDropList","",1,"p-3","pb-0",3,"id","cdkDropListData","cdkDropListDropped"],["cdkDrag","",1,"flex","flex-col","items-start","mb-3","p-5","space-y-3","shadow","rounded-lg","overflow-hidden","bg-card",3,"routerLink"],[4,"ngIf"],[1,"text-lg","font-medium","leading-5"],[1,"-mx-5","-mt-5","mb-2"],[1,"w-full","object-cover",3,"src"],[1,"flex","flex-wrap","-mx-1","-mb-2"],[1,"mx-1","mb-2","py-0.5","px-3","rounded-full","text-sm","font-medium","text-gray-500","bg-gray-100","dark:text-gray-300","dark:bg-gray-700"],[1,"flex","items-center","rounded","text-sm","font-medium","leading-5","text-secondary",3,"ngClass"],[1,"icon-size-4","text-current",3,"svgIcon"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"h2",3),t._uU(4),t.qZA(),t.qZA(),t.TgZ(5,"div",4),t.TgZ(6,"a",5),t._UZ(7,"mat-icon",6),t._uU(8," Boards "),t.qZA(),t.TgZ(9,"button",7),t._UZ(10,"mat-icon",6),t._uU(11," Settings "),t.qZA(),t.qZA(),t.qZA(),t.TgZ(12,"div",8),t.TgZ(13,"div",9),t.NdJ("cdkDropListDropped",function(s){return r.listDropped(s)}),t.TgZ(14,"div",10),t.YNc(15,Zt,23,13,"ng-container",11),t.TgZ(16,"scrumboard-board-add-list",12),t.NdJ("saved",function(s){return r.addList(s)}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(17,"div",13),t._UZ(18,"router-outlet"),t.qZA()),2&e&&(t.xp6(4),t.hij(" ",r.board.title," "),t.xp6(2),t.Q6J("routerLink",t.DdM(9,Ct)),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:view-boards"),t.xp6(3),t.Q6J("svgIcon","heroicons_solid:cog"),t.xp6(3),t.Q6J("cdkDropListData",r.board.lists)("cdkDropListOrientation","horizontal"),t.xp6(2),t.Q6J("ngForOf",r.board.lists)("ngForTrackBy",r.trackByFn),t.xp6(1),t.Q6J("buttonTitle",r.board.lists.length?"Add another list":"Add a list"))},directives:[v.zs,_.yS,C.Hw,v.lW,N.PQ,x.Wj,x.Fd,m.sg,dt,_.lC,x.Zt,x.Bh,S.p6,S.VK,S.OP,mt,m.O5,m.mk],pipes:[m.uU],styles:[".cdk-drag-preview{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drop-list-dragging div:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}\n"],encapsulation:2,changeDetection:0}),i})();var Tt=d(78372),At=d(49858);const kt=["labelInput"];function wt(i,n){if(1&i&&(t.ynx(0),t._uU(1),t.ALo(2,"date"),t.BQk()),2&i){const e=t.oxw();t.xp6(1),t.Oqu(t.xi3(2,1,e.card.dueDate,"longDate"))}}function St(i,n){1&i&&(t.ynx(0),t._uU(1,"Not set"),t.BQk())}function It(i,n){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"mat-checkbox",26),t.NdJ("change",function(o){const a=t.CHM(e).$implicit;return t.oxw().toggleProductTag(a,o)}),t._uU(2),t.qZA(),t.BQk()}if(2&i){const e=n.$implicit,r=t.oxw();t.xp6(1),t.Q6J("color","primary")("checked",r.hasLabel(e)),t.xp6(1),t.hij(" ",e.title," ")}}const Dt=function(i,n,e){return{"text-gray-500 bg-gray-100 dark:text-gray-300 dark:bg-gray-700":i,"text-green-800 bg-green-200 dark:text-green-100 dark:bg-green-500":n,"text-red-800 bg-red-200 dark:text-red-100 dark:bg-red-500":e}};let Bt=(()=>{class i{constructor(e,r,o,s){this.matDialogRef=e,this._changeDetectorRef=r,this._formBuilder=o,this._scrumboardService=s,this._unsubscribeAll=new L.x}ngOnInit(){this._scrumboardService.board$.pipe((0,A.R)(this._unsubscribeAll)).subscribe(e=>{this.board=e,this.labels=this.filteredLabels=e.labels}),this._scrumboardService.card$.pipe((0,A.R)(this._unsubscribeAll)).subscribe(e=>{this.card=e}),this.cardForm=this._formBuilder.group({id:[""],title:["",l.kI.required],description:[""],labels:[[]],dueDate:[null]}),this.cardForm.setValue({id:this.card.id,title:this.card.title,description:this.card.description,labels:this.card.labels,dueDate:this.card.dueDate}),this.cardForm.valueChanges.pipe((0,f.b)(e=>{this.card=(0,At.Z)(this.card,e)}),(0,Tt.b)(300),(0,A.R)(this._unsubscribeAll)).subscribe(e=>{this._scrumboardService.updateCard(e.id,e).subscribe(),this._changeDetectorRef.markForCheck()})}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}hasLabel(e){return!!this.card.labels.find(r=>r.id===e.id)}filterLabels(e){const r=e.target.value.toLowerCase();this.filteredLabels=this.labels.filter(o=>o.title.toLowerCase().includes(r))}filterLabelsInputKeyDown(e){if("Enter"!==e.key||0===this.filteredLabels.length)return;const r=this.filteredLabels[0];this.card.labels.find(s=>s.id===r.id)?this.removeLabelFromCard(r):this.addLabelToCard(r)}toggleProductTag(e,r){r.checked?this.addLabelToCard(e):this.removeLabelFromCard(e)}addLabelToCard(e){this.card.labels.unshift(e),this.cardForm.get("labels").patchValue(this.card.labels),this._changeDetectorRef.markForCheck()}removeLabelFromCard(e){this.card.labels.splice(this.card.labels.findIndex(r=>r.id===e.id),1),this.cardForm.get("labels").patchValue(this.card.labels),this._changeDetectorRef.markForCheck()}isOverdue(e){return b(e,b.ISO_8601).isBefore(b(),"days")}trackByFn(e,r){return r.id||e}_readAsDataURL(e){return new Promise((r,o)=>{const s=new FileReader;s.onload=()=>{r(s.result)},s.onerror=a=>{o(a)},s.readAsDataURL(e)})}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(D.so),t.Y36(t.sBO),t.Y36(l.qu),t.Y36(T))},i.\u0275cmp=t.Xpm({type:i,selectors:[["scrumboard-card-details"]],viewQuery:function(e,r){if(1&e&&t.Gf(kt,5),2&e){let o;t.iGM(o=t.CRH())&&(r.labelInput=o.first)}},decls:44,vars:24,consts:[[1,"flex","flex-col","flex-auto","md:w-160","md:min-w-160","max-h-160","-m-6","overflow-y-auto"],[1,"flex","flex-0","items-center","justify-between","h-16","pr-3","sm:pr-5","pl-6","sm:pl-8","bg-primary","text-on-primary"],[1,"text-lg","font-medium"],["mat-icon-button","",3,"tabIndex","click"],[1,"text-current",3,"svgIcon"],[1,"flex","flex-col","flex-0","items-start","w-full","p-6","sm:p-8","space-y-6","overflow-y-auto",3,"formGroup"],[1,"fuse-mat-textarea","fuse-mat-no-subscript","w-full"],["matInput","","cdkTextareaAutosize","",3,"formControlName","rows","cdkAutosizeMinRows"],[1,"font-medium"],[1,"relative","flex","items-center","mt-1.5","px-4","leading-9","rounded-full","cursor-pointer",3,"ngClass","click"],[1,"icon-size-5","text-current",3,"svgIcon"],[1,"ml-2","text-md","font-medium"],[4,"ngIf"],[1,"fuse-mat-no-subscript","fuse-mat-dense","invisible","absolute","inset-0","-mt-2.5","opacity-0","pointer-events-none"],["matInput","",3,"formControlName","matDatepicker"],["dueDatePicker",""],["mat-button","","matDatepickerCancel","",3,"click"],["mat-flat-button","","matDatepickerApply","",3,"color"],[1,"w-full"],[1,"mt-1","rounded-md","border","border-gray-300","shadow-sm","overflow-hidden"],[1,"flex","items-center","my-2","mx-3"],[1,"flex","items-center","flex-auto","min-w-0"],[1,"icon-size-5",3,"svgIcon"],["type","text","placeholder","Enter label name",1,"min-w-0","ml-2","py-1","border-0",3,"maxLength","input","keydown"],[1,"max-h-40","leading-none","overflow-y-auto","border-t"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"flex","items-center","h-10","min-h-10","px-4",3,"color","checked","change"]],template:function(e,r){if(1&e){const o=t.EpF();t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t._uU(3,"Card"),t.qZA(),t.TgZ(4,"button",3),t.NdJ("click",function(){return r.matDialogRef.close()}),t._UZ(5,"mat-icon",4),t.qZA(),t.qZA(),t.TgZ(6,"form",5),t.TgZ(7,"mat-form-field",6),t.TgZ(8,"mat-label"),t._uU(9,"Title"),t.qZA(),t.TgZ(10,"textarea",7),t._uU(11,"            "),t.qZA(),t.qZA(),t.TgZ(12,"mat-form-field",6),t.TgZ(13,"mat-label"),t._uU(14,"Description"),t.qZA(),t.TgZ(15,"textarea",7),t._uU(16,"            "),t.qZA(),t.qZA(),t.TgZ(17,"div"),t.TgZ(18,"div",8),t._uU(19,"Due date"),t.qZA(),t.TgZ(20,"div",9),t.NdJ("click",function(){return t.CHM(o),t.MAs(28).open()}),t._UZ(21,"mat-icon",10),t.TgZ(22,"span",11),t.YNc(23,wt,3,4,"ng-container",12),t.YNc(24,St,2,0,"ng-container",12),t.qZA(),t.TgZ(25,"mat-form-field",13),t._UZ(26,"input",14),t.TgZ(27,"mat-datepicker",null,15),t.TgZ(29,"mat-datepicker-actions"),t.TgZ(30,"button",16),t.NdJ("click",function(){return r.cardForm.get("dueDate").setValue(null)}),t._uU(31," Clear "),t.qZA(),t.TgZ(32,"button",17),t._uU(33," Select "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(34,"div",18),t.TgZ(35,"div",8),t._uU(36,"Labels"),t.qZA(),t.TgZ(37,"div",19),t.TgZ(38,"div",20),t.TgZ(39,"div",21),t._UZ(40,"mat-icon",22),t.TgZ(41,"input",23),t.NdJ("input",function(a){return r.filterLabels(a)})("keydown",function(a){return r.filterLabelsInputKeyDown(a)}),t.qZA(),t.qZA(),t.qZA(),t.TgZ(42,"div",24),t.YNc(43,It,3,3,"ng-container",25),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&e){const o=t.MAs(28);t.xp6(4),t.Q6J("tabIndex",-1),t.xp6(1),t.Q6J("svgIcon","heroicons_outline:x"),t.xp6(1),t.Q6J("formGroup",r.cardForm),t.xp6(4),t.Q6J("formControlName","title")("rows",1)("cdkAutosizeMinRows",1),t.xp6(5),t.Q6J("formControlName","description")("rows",1)("cdkAutosizeMinRows",1),t.xp6(5),t.Q6J("ngClass",t.kEZ(20,Dt,!r.card.dueDate,r.card.dueDate&&!r.isOverdue(r.card.dueDate),r.card.dueDate&&r.isOverdue(r.card.dueDate))),t.xp6(1),t.Q6J("svgIcon","heroicons_solid:calendar"),t.xp6(2),t.Q6J("ngIf",r.card.dueDate),t.xp6(1),t.Q6J("ngIf",!r.card.dueDate),t.xp6(2),t.Q6J("formControlName","dueDate")("matDatepicker",o),t.xp6(6),t.Q6J("color","primary"),t.xp6(8),t.Q6J("svgIcon","heroicons_solid:search"),t.xp6(1),t.Q6J("maxLength",50),t.xp6(2),t.Q6J("ngForOf",r.filteredLabels)("ngForTrackBy",r.trackByFn)}},directives:[v.lW,C.Hw,l._Y,l.JL,l.sg,B.KE,B.hX,U.Nt,M.IC,l.Fj,l.JJ,l.u,m.mk,m.O5,Z.hl,Z.Mq,Z.M5,Z.dp,Z.DK,m.sg,Q.oG],pipes:[m.uU],encapsulation:2,changeDetection:0}),i})();const Lt=[{path:"",component:tt,resolve:{boards:et}},{path:":boardId",component:yt,resolve:{board:rt},children:[{path:"card/:cardId",component:(()=>{class i{constructor(e,r,o){this._activatedRoute=e,this._matDialog=r,this._router=o}ngOnInit(){this._matDialog.open(Bt,{autoFocus:!1}).afterClosed().subscribe(()=>{this._router.navigate(["./../.."],{relativeTo:this._activatedRoute})})}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(_.gz),t.Y36(D.uw),t.Y36(_.F0))},i.\u0275cmp=t.Xpm({type:i,selectors:[["scrumboard-card"]],decls:1,vars:0,template:function(e,r){1&e&&t._uU(0,"SCRUMBOARD -> BOARDS -> LIST -> CARD\n")},encapsulation:2,changeDetection:0}),i})(),resolve:{card:ot}}]}];let Jt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({providers:[{provide:V.sG,useValue:{parse:{dateInput:b.ISO_8601},display:{dateInput:"ll",monthYearLabel:"MMM YYYY",dateA11yLabel:"LL",monthYearA11yLabel:"MMMM YYYY"}}}],imports:[[_.Bz.forChild(Lt),x._t,v.ot,Q.p9,Z.FA,D.Is,B.lN,C.Ps,U.c,S.Tx,z.Yd,$.Cv,j.m]]}),i})()}}]);