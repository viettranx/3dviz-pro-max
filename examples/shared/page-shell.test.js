import assert from 'node:assert/strict';
import test from 'node:test';
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const examples=fileURLToPath(new URL('..',import.meta.url));
const loading='<div id="loading" role="status">Loading…</div>';
const skip=new Set(['shared','node_modules','public','dist','scripts']);

test('the shared page shell uses a single-line Loading… status',()=>{
 const page=readFileSync(path.join(examples,'shared/page.html'),'utf8');
 assert.equal(page.includes(loading),true);
 assert.equal(page.includes('Preparing the study'),false);
});

test('every study index.html uses the same loading copy',()=>{
 const withPage=readdirSync(examples,{withFileTypes:true})
  .filter((entry)=>entry.isDirectory()&&!skip.has(entry.name)&&existsSync(path.join(examples,entry.name,'index.html')))
  .map((entry)=>entry.name)
  .sort();
 assert.equal(withPage.length,37,`expected 37 studies, got ${withPage.length}: ${withPage.join(',')}`);
 for(const id of withPage){
  const html=readFileSync(path.join(examples,id,'index.html'),'utf8');
  assert.equal(html.includes(loading),true,id);
 }
});
