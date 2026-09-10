import * as THREE from 'three';
import {createCameraRig} from './camera-orbit-follow.js';
import {createStudioRig} from './lighting-studio.js';
import {createRenderLoop} from './render-loop.js';
import {applyEmbed,applyPlate} from './page-chrome.js';
import {installViewer} from './viewer-contract.js';
import {NIGHT_VIEWS,createNightLighting} from './breadth/src/night-lighting.js';

const $=selector=>document.querySelector(selector);
let controlSync=[],lastStats='';

function disposeGroup(group){
 const geometries=new Set(),materials=new Set(),textures=new Set(),skeletons=new Set();
 group?.traverse(object=>{if(object.geometry)geometries.add(object.geometry);if(object.skeleton)skeletons.add(object.skeleton);for(const material of [object.material].flat().filter(Boolean)){materials.add(material);for(const value of Object.values(material))if(value?.isTexture)textures.add(value);}});
 skeletons.forEach(skeleton=>skeleton.dispose?.());textures.forEach(texture=>texture.dispose());materials.forEach(material=>material.dispose());geometries.forEach(geometry=>geometry.dispose());group?.removeFromParent();
}

function setCopy(meta,model){
 document.documentElement.style.setProperty('--accent',meta.accent||'#78b9b2');
 document.title=`${meta.title||model.title} — 3Dviz Pro Max`;
 $('#kicker').textContent=meta.kicker||meta.category||'INTERACTIVE 3D STUDY';
 $('#title').textContent=meta.title||model.title;
 $('#description').textContent=meta.description||model.description||'';
 $('#model-note').textContent=model.note||model.description||meta.description||'An authored interactive study.';
 $('#craft-note').textContent=model.craft||meta.craft||'';
 const sources=$('#sources');sources.replaceChildren();
 for(const source of model.sources||meta.sources||[]){const link=document.createElement('a');link.href=source.url;link.textContent=source.title;link.target='_blank';link.rel='noopener noreferrer';sources.append(link);}
 $('#about').hidden=!model.note&&!model.description&&!meta.description&&!model.craft&&!(model.sources||meta.sources)?.length;
}

function addStudyControls(model,invalidate){
 const panel=$('#subject-controls');panel.replaceChildren();controlSync=[];
 for(const control of model.controls||[]){const row=document.createElement('div');row.className='control-row';
  if(control.type==='button'){const button=document.createElement('button');button.type='button';button.className='action';const sync=()=>button.textContent=control.getLabel?.()??control.label;button.onclick=()=>{control.set?.();model.update?.(0);syncAll(model);invalidate();};sync();controlSync.push(sync);row.append(button);}
  else{const label=document.createElement('label'),heading=document.createElement('span'),output=document.createElement('output');heading.textContent=control.label;label.append(heading,output);const input=document.createElement(control.type==='select'?'select':'input');
   input.setAttribute('aria-label',control.label);if(control.type==='select')for(const choice of control.options||[]){const option=document.createElement('option');option.value=choice.value;option.textContent=choice.label;input.append(option);}else{input.type='range';input.min=control.min;input.max=control.max;input.step=control.step??.01;}
   const sync=()=>{const value=control.get?.()??control.value??control.min;input.value=value;output.textContent=control.type==='select'?'':typeof value==='number'?Number(value.toFixed(3)).toString():value;};
   input.addEventListener(control.type==='select'?'change':'input',()=>{control.set(control.type==='select'?input.value:Number(input.value));model.update?.(0);syncAll(model);invalidate();});sync();controlSync.push(sync);label.append(input);row.append(label);
  }panel.append(row);
 }
}

function paintStats(model){const panel=$('#readouts'),stats=(model.stats?.()||[]).slice(0,4),key=JSON.stringify(stats);if(key===lastStats)return;lastStats=key;panel.replaceChildren();for(const stat of stats){const item=document.createElement('div'),label=document.createElement('span'),value=document.createElement('strong');label.textContent=stat.label;value.textContent=stat.value;item.append(label,value);panel.append(item);}panel.hidden=!stats.length;}
function syncAll(model){controlSync.forEach(sync=>sync());paintStats(model);}

function gradientSky(zenith='#0d0f12',horizon='#1c2026'){
 const source=Object.assign(document.createElement('canvas'),{width:1,height:256}),context=source.getContext('2d'),gradient=context.createLinearGradient(0,0,0,256);gradient.addColorStop(0,zenith);gradient.addColorStop(1,horizon);context.fillStyle=gradient;context.fillRect(0,0,1,256);const texture=new THREE.CanvasTexture(source);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}

export async function mountScene({meta,createScene,kind='study',look='craft',nightName=null,views=null}){
 applyPlate(document,location.search);applyEmbed(document,location.search);
 window.__sceneReady=false;const canvas=$('#world'),viewport=$('#viewport');let renderer;
 try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:kind==='study'});}catch(error){$('#loading').hidden=true;$('#error').hidden=false;throw error;}
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setPixelRatio(Math.min(devicePixelRatio,kind==='study'?1.5:2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.localClippingEnabled=true;renderer.toneMapping=THREE.ACESFilmicToneMapping;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(kind==='study'?36:38,1,.01,200),studio=createStudioRig(scene,renderer,kind==='study'?{subject:[0,0,0],distance:7,environmentIntensity:.42,key:{color:'#fff0dd',intensity:10,width:5,height:6,elevationDeg:45,azimuthDeg:325},fill:{color:'#a4cadb',intensity:5,width:5,height:5,elevationDeg:12,azimuthDeg:65},rim:{color:'#d7f0f0',intensity:12,width:2,height:5,elevationDeg:35,azimuthDeg:165},contact:{color:'#d2e8ea',intensity:1.2,mapSize:1024,bias:-.0001,normalBias:.035,extent:8}}:{subject:[0,.14,0],distance:1.4});
 if(kind==='study')scene.add(new THREE.HemisphereLight('#bfd3e0','#25313b',.55));
 let background=gradientSky(kind==='study'?'#14242c':'#0d0f12',kind==='study'?'#243b43':'#1c2026');scene.background=background;
 const stage=[];if(kind==='study'){const base=new THREE.Mesh(new THREE.CylinderGeometry(3.65,3.8,.12,100),new THREE.MeshStandardMaterial({color:'#142329',roughness:.65,metalness:.25})),rim=new THREE.Mesh(new THREE.TorusGeometry(3.68,.009,6,160),new THREE.MeshStandardMaterial({color:'#7e9697',roughness:.3,metalness:.65}));base.position.y=-2.59;base.receiveShadow=true;rim.position.y=-2.52;rim.rotation.x=Math.PI/2;scene.add(base,rim);stage.push(base,rim);}
 let bootstrapDisposed=false;const disposeBootstrap=()=>{if(bootstrapDisposed)return;bootstrapDisposed=true;studio.dispose();for(const object of stage){object.geometry.dispose();object.material.dispose();}background?.dispose();renderer.dispose();};
 let model,nightRig,loop,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const invalidate=()=>loop?.invalidate();
 try{model=await createScene();scene.add(model.group);setCopy(nightName?{...meta,description:NIGHT_VIEWS[nightName].description}:meta,model);
  if(kind==='study'){stage.forEach(object=>object.visible=model.stage!==false);const light=model.lighting||{};renderer.toneMappingExposure=light.exposure??1.05;scene.environmentIntensity=light.environment??.42;studio.contact.intensity=light.contact??1.2;studio.key.color.set(light.keyColor??'#fff0dd');studio.fill.color.set(light.fillColor??'#a4cadb');studio.key.intensity=light.key??10;studio.fill.intensity=light.fill??5;studio.rim.intensity=light.rim??12;studio.rim.color.set(meta.accent||'#78b9b2');addStudyControls(model,invalidate);}
  else{renderer.toneMappingExposure=look==='studio'?1:.72;scene.environmentIntensity=look==='studio'?.15:.2;for(const name of ['key','fill','rim'])studio[name].intensity=studio.settings[name].intensity*(look==='studio'?1:.6);if(model.bind)model.bind($('#subject-controls'),invalidate);if(nightName){nightRig=createNightLighting(scene,renderer,studio);nightRig.activate(nightName,model);nightRig.bind($('#subject-controls'),invalidate);paused=true;}}
 }catch(error){console.error(error);$('#error').hidden=false;$('#error').textContent=`This study could not load. ${error.message}`;$('#loading').hidden=true;disposeBootstrap();return;}
 const sourceViews=views||model.views||{overview:{position:[.52,.34,.67],target:[0,.17,0]},detail:{position:[.34,.24,.46],target:[0,.17,0]}};
 const rig=createCameraRig({camera,canvas,views:sourceViews,invalidate,limits:kind==='study'?{minPolarDeg:5,maxPolarDeg:155,minDist:1,maxDist:35}:{minPolarDeg:8,maxPolarDeg:88,minDist:.08,maxDist:9}});
 const viewer=installViewer({camera,controls:rig.controls,views:sourceViews,setView:rig.setView,invalidate});
 const pause=$('#pause'),reset=$('#reset');function syncPause(){pause.textContent=paused?'Play motion':'Pause motion';pause.setAttribute('aria-pressed',String(paused));}syncPause();pause.onclick=()=>{paused=!paused;syncPause();invalidate();};
 reset.textContent=model.reset?'Reset study':'Reset view';$('#overview').onclick=()=>rig.setView('overview');$('#detail').onclick=()=>rig.setView('detail');reset.onclick=()=>{model.reset?.();model.update?.(0);syncAll(model);rig.reset();invalidate();};
 let syncElapsed=0;loop=createRenderLoop({fps:45,draw(dt){let moving=false;try{moving=model.update?.(paused?0:dt)??false;syncElapsed+=dt;if(syncElapsed>.16){syncAll(model);syncElapsed=0;}}catch(error){paused=true;syncPause();console.error(error);$('#error').hidden=false;$('#error').textContent='The model stopped after an error.';}const cameraChanged=rig.update(dt);renderer.render(scene,camera);viewer.markReady();return moving||cameraChanged||(!paused&&(model.needsAnimation?.()??false));}});
 new ResizeObserver(()=>{const{width,height}=viewport.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.zoom=Math.min(1,camera.aspect/1.35);camera.updateProjectionMatrix();invalidate();}).observe(viewport);
 let disposed=false;const cleanup=()=>{if(disposed)return;disposed=true;loop.dispose();rig.dispose();nightRig?.dispose();model.dispose?.();disposeGroup(model.group);disposeBootstrap();};
 document.addEventListener('visibilitychange',()=>loop.setActive(!document.hidden));addEventListener('pagehide',event=>{if(event.persisted){loop.setActive(false);return;}cleanup();});addEventListener('pageshow',event=>{if(event.persisted&&!disposed){loop.setActive(!document.hidden);invalidate();}});
 rig.reset();$('#loading').hidden=true;viewport.setAttribute('aria-busy','false');paintStats(model);loop.setActive(!document.hidden);
}
