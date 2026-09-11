import assert from 'node:assert/strict';
import test from 'node:test';
import {applyEmbed,applyPlate,embedMode,plateMode} from './page-chrome.js';

const stub=()=>({documentElement:{dataset:{}}});

test('plate=1 turns plate mode on',()=>{
 assert.equal(plateMode('?plate=1'),true);
 assert.equal(plateMode('plate=1'),true);
});

test('plate=0 and any other value leave plate mode off',()=>{
 assert.equal(plateMode('?plate=0'),false);
 assert.equal(plateMode('?plate=true'),false);
});

test('an absent flag leaves plate mode off',()=>{
 assert.equal(plateMode(''),false);
 assert.equal(plateMode(undefined),false);
 assert.equal(plateMode('?view=overview'),false);
});

test('plate mode survives other query parameters and marks the document once',()=>{
 const doc=stub();
 assert.equal(applyPlate(doc,'?plate=1&view=overview'),true);
 assert.equal(doc.documentElement.dataset.plate,'1');
 const plain=stub();
 assert.equal(applyPlate(plain,'?view=overview'),false);
 assert.equal(plain.documentElement.dataset.plate,undefined);
 assert.equal(applyPlate({},'?plate=1'),true);
});

test('embed=1 turns embed mode on',()=>{
 assert.equal(embedMode('?embed=1'),true);
 assert.equal(embedMode('embed=1'),true);
});

test('embed=0 and any other value leave embed mode off',()=>{
 assert.equal(embedMode('?embed=0'),false);
 assert.equal(embedMode('?embed=true'),false);
 assert.equal(embedMode('?plate=1'),false);
});

test('embed mode survives other query parameters and marks the document once',()=>{
 const doc=stub();
 assert.equal(applyEmbed(doc,'?embed=1&view=overview'),true);
 assert.equal(doc.documentElement.dataset.embed,'1');
 const plain=stub();
 assert.equal(applyEmbed(plain,'?view=overview'),false);
 assert.equal(plain.documentElement.dataset.embed,undefined);
 assert.equal(applyEmbed({},'?embed=1'),true);
});
