"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[39],{6628:(A,D,d)=>{d.d(D,{H:()=>u});var C=d(2340),T=d(1816),w=d(5e3),x=d(520),p=d(8951);let u=(()=>{class _{constructor(b,y){this._httpClient=b,this._authService=y}getProfileInfo(){const b=(0,T.Z)(this._authService.user);return this._httpClient.post(`${C.N.API_URL}/Comercio_Bancario/get_info`,{nu_id_negocio:b.nu_id_negocio,nu_id_comercio:b.nu_id_comercio})}getDepositsInfo(b,y){const E=(0,T.Z)(this._authService.user).nu_id_negocio;return this._httpClient.post(`${C.N.API_URL}/Solicitud_Deposito/sel`,{nu_id_negocio:E,ch_destino:"MX",dt_fec_inicio:b,dt_fec_final:y})}}return _.\u0275fac=function(b){return new(b||_)(w.LFG(x.eN),w.LFG(p.e))},_.\u0275prov=w.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),_})()},2638:(A,D,d)=>{d.d(D,{SJ:()=>P});var C=d(925),T=d(495),w=d(9808),x=d(5e3),p=d(508);d(1777);let P=(()=>{class c{}return c.\u0275fac=function(n){return new(n||c)},c.\u0275mod=x.oAB({type:c}),c.\u0275inj=x.cJS({imports:[[w.ez,p.BQ,C.ud,T.ZD],T.ZD,p.BQ]}),c})()},3251:(A,D,d)=>{d.d(D,{Nh:()=>J});var C=d(5664),T=d(7144),w=d(7429),x=d(9808),p=d(5e3),u=d(508);d(1777),d(925);let J=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=p.oAB({type:r}),r.\u0275inj=p.cJS({imports:[[x.ez,u.BQ,w.eL,u.si,T.Q8,C.rt],u.BQ]}),r})()}}]);