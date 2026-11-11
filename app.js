'use strict';
const $=id=>document.getElementById(id), tools=window.TOOLS||[];
const state={category:'',search:'',learning:'',cost:'',sort:'rank'};
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=s=>/^https?:\/\//i.test(s||'')?s:'#';
const badge=t=>`<span class="badge ${t.learning_curve==='Easy start'?'easy':''}">${esc(t.learning_curve)}</span><span class="badge">${esc(t.cost)}</span>`;
// Cover names follow the stable spreadsheet ID, not the display name.
const cover=t=>`<img class="tool-cover" src="covers/${encodeURIComponent(t.id)}.png" alt="" loading="lazy" decoding="async">`;
// Capture image errors (which do not bubble) and remove missing/broken covers.
document.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement && e.target.classList.contains('tool-cover'))e.target.remove()},true);
let opener=null;
function categories(){ $('categories').innerHTML=['',...new Set(tools.map(t=>t.category))].map((c,i)=>`<button data-category="${esc(c)}" class="${state.category===c?'active':''}" aria-pressed="${state.category===c}">${i===0?'◈ &nbsp; All tools':esc(c)}</button>`).join(''); }
function render(){
 const q=state.search.toLowerCase();const list=tools.filter(t=>(!state.category||t.category===state.category)&&(!state.learning||t.learning_curve===state.learning)&&(!state.cost||(state.cost==='free'?/free/i.test(t.cost):!/free/i.test(t.cost)))&&(!q||[t.name,t.description,t.best_for,t.category].join(' ').toLowerCase().includes(q)));
 const levels={'Easy start':0,'Some practice':1,'More learning':2,'Not assessed':3};
 list.sort((a,b)=>state.sort==='name'?a.name.localeCompare(b.name):state.sort==='ease'?(levels[a.learning_curve]-levels[b.learning_curve]||a.rank-b.rank):a.rank-b.rank);
 $('title').textContent=state.category||'All tools';$('count').textContent=`${list.length} tools`;
 $('grid').innerHTML=list.length?list.map(t=>`<button class="card" data-id="${esc(t.id)}" aria-label="View ${esc(t.name)} details">${cover(t)}<div class="cardtop"><span class="icon" aria-hidden="true">${esc(t.name.slice(0,2))}</span><div><h3>${esc(t.name)}</h3><span class="category">${esc(t.category)}</span></div></div><p>${esc(t.best_for||t.description)}</p><div class="badges">${badge(t)}</div><div class="cardbottom"><span>View tool</span><span aria-hidden="true">↗</span></div></button>`).join(''):'<div class="empty"><h3>No matching tools</h3><p>Try a different search or reset your filters.</p></div>';
}
function open(t,button){opener=button;const field=(title,value)=>`<h3>${title}</h3><p>${esc(value||'Not yet reviewed.')}</p>`;
 $('detailContent').innerHTML=`<p class="eyebrow">TOOL OVERVIEW</p>${cover(t)}<span class="icon">${esc(t.name.slice(0,2))}</span><h2 id="detailTitle">${esc(t.name)}</h2><p>${esc(t.category)}</p><div class="badges">${badge(t)}</div><p>${esc(t.description)}</p><a class="primary" href="${esc(url(t.website))}" target="_blank" rel="noopener noreferrer">Open ${esc(t.name)} ↗</a>${field('Best for',t.best_for)}${field('Getting started',t.learning_curve+' · '+({ 'Easy start':'Try one small project; little guidance is usually needed.','Some practice':'Follow a beginner tutorial and practise the core features.','More learning':'Start with a guided project to learn the specialist concepts.'}[t.learning_curve]||'Learning curve not assessed.'))}${field('Where it runs',t.platform)}<h3>Free vs paid</h3><div class="tier free"><h3>Free access</h3><p>${esc(t.free_features||'Not yet reviewed. Check the official plan.')}</p></div><div class="tier"><h3>Paid options</h3><p>${esc(t.paid_features||'Not yet reviewed. Check the official plan.')}</p></div>${field('Is free enough?',t.free_verdict)}${field('Things to know',t.limitations)}${t.pricing_url?`<p><a href="${esc(url(t.pricing_url))}" target="_blank" rel="noopener noreferrer">Check official plans ↗</a></p>`:''}${t.tutorial?`<p><a href="${esc(url(t.tutorial))}" target="_blank" rel="noopener noreferrer">Beginner tutorial ↗</a></p>`:''}<h3>Similar tools</h3><p>${tools.filter(x=>x.category===t.category&&x.id!==t.id).slice(0,3).map(x=>`<button class="quiet" data-related="${esc(x.id)}">${esc(x.name)} →</button>`).join('<br>')||'Explore the directory for more options.'}</p><hr><p>Plan information last checked: ${esc(t.last_checked||'Not recorded — verification pending')}. Learning curves are editorial guidance, not measured scores.</p>`;
 if(!$('detail').open)$('detail').showModal();$('detail').scrollTop=0;$('close').focus();
}
$('categories').onclick=e=>{const b=e.target.closest('[data-category]');if(b){state.category=b.dataset.category;categories();render()}};
$('grid').onclick=e=>{const b=e.target.closest('[data-id]');if(b)open(tools.find(t=>t.id===b.dataset.id),b)};
$('detailContent').onclick=e=>{const b=e.target.closest('[data-related]');if(b)open(tools.find(t=>t.id===b.dataset.related),opener)};
$('close').onclick=()=>$('detail').close();$('detail').addEventListener('close',()=>opener?.focus());
$('detail').addEventListener('click',e=>{if(e.target===$('detail')){const r=$('detail').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('detail').close()}});
for(const k of ['search','learning','cost','sort'])$(k).addEventListener(k==='search'?'input':'change',()=>{state[k]=$(k).value;render()});
$('reset').onclick=()=>{Object.assign(state,{category:'',search:'',learning:'',cost:'',sort:'rank'});for(const k of ['search','learning','cost','sort'])$(k).value=state[k];categories();render()};
categories();render();
