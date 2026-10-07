const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = { window:{} };
vm.createContext(context);
for (const file of ['workflow-data.js','mas-data.js','mas-workflow.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
}
const workflow = context.window.workflowResearch;
const mas = context.window.masResearch;
assert.equal(workflow.methods.length,22);
assert.equal(mas.methods.length,37);
assert.equal(new Set(workflow.methods.map(m=>m.id)).size,22);
assert.equal(new Set(mas.methods.map(m=>m.id)).size,37);
assert.equal(workflow.methods.filter(m=>m.tier==='A').length,20);
assert.equal(workflow.methods.filter(m=>m.code).length,19);
const fields = ['one','variable','data','optimizer','timing','weights','mechanism','evidence','caveat'];
for (const m of workflow.methods) {
  assert(workflow.routes[m.route],m.id);
  assert(/^(202[3-6])-(0[1-9]|1[0-2])$/.test(m.first),m.id);
  assert(m.month>=1&&m.month<=12,m.id);
  assert(!/[\u0000-\u001f\u4e00-\u9fff]/.test(m.formula),'Damaged TeX: '+m.id);
  assert(m.authors&&m.title&&m.local,m.id);
  assert.equal(new URL(m.pdf).protocol,'https:');
  if(m.tier==='A')assert(/^(openreview\.net|proceedings\.iclr\.cc|proceedings\.mlr\.press|aclanthology\.org)$/.test(new URL(m.source).hostname),'Formal source: '+m.id);
  for(const language of ['zh','en'])for(const field of fields)assert(m[language][field]?.length,'Missing copy '+m.id+'/'+language+'/'+field);
  if(m.tier!=='C') {
    const shared=mas.methods.find(p=>p.id===m.id);
    assert.equal(shared.pdf,m.pdf);
    assert.equal(shared.venue,m.venue);
    assert.equal(shared.code,m.code);
  }
}
for(const [from,to,type] of workflow.edges){assert(workflow.methods.some(m=>m.id===from));assert(workflow.methods.some(m=>m.id===to));assert(type);}
assert(workflow.methods.find(m=>m.id==='flowmas').formula.includes('\\phi'));
assert(workflow.methods.find(m=>m.id==='gtd').formula.includes('\\widehat'));
assert.equal(mas.methods.find(m=>m.id==='metagpt').category,'workflow');
assert.equal(mas.methods.find(m=>m.id==='g-designer').venue,'ICML 2025');
assert.equal(mas.methods.find(m=>m.id==='radar').venue,'ICML 2026');
assert.equal(mas.questions[2].href,'./workflow.html#overview');
for(const file of ['index.html','system-design.html','workflow.html']) {
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert(html.includes('href="./workflow.html#overview"'),file);
}
console.log('Workflow catalog, shared MAS metadata, bilingual copy, source tiers, TeX strings, and module links passed.');
