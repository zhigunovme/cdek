'use strict';
// Set this to a working standalone delivery API; no CMS is required.
const deliveryApi = window.deliveryApi || '';
const form = document.querySelector('#calc');
if (form) {
 const status = document.createElement('p');
 status.setAttribute('role', 'status');
 status.style.cssText='margin:16px 0;line-height:1.5';
 form.append(status);
 let rowNumber=1;
 form.querySelector('.add-block').addEventListener('click',()=>{
  const row=form.querySelector('.params-rep').cloneNode(true);
  row.querySelectorAll('input').forEach(input=>{const old=input.id;input.id=old.replace(/-\d+$/,'')+'-'+rowNumber;input.value='';row.querySelector(`label[for="${old}"]`)?.setAttribute('for',input.id);});
  rowNumber++;form.querySelector('.rep-blocks').append(row);
 });
 form.addEventListener('click',e=>{const button=e.target.closest('.remove-row');if(button&&form.querySelectorAll('.params-rep').length>1){e.preventDefault();button.closest('.params-rep').remove();}});
 const unavailable='Расчёт временно недоступен: сервер калькулятора не подключён. Уточните стоимость у менеджера по телефону, указанному на сайте.';
 async function request(params){const r=await fetch(deliveryApi,{method:'POST',body:params,signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('HTTP '+r.status);return r.json();}
 for(const field of form.querySelectorAll('#from,#to')){
  const list=document.createElement('datalist');list.id=field.id+'-cities';field.after(list);field.setAttribute('list',list.id);
  let timer,sequence=0,cities=[];
  field.addEventListener('input',()=>{clearTimeout(timer);const current=++sequence;form.elements['hidden-'+field.name].value='';if(!deliveryApi){status.textContent=unavailable;return;}if(field.value.length<3)return;
   timer=setTimeout(async()=>{try{const data=await request(new URLSearchParams({action:'find_city',q:field.value}));if(current!==sequence)return;cities=data.geonames||[];list.replaceChildren(...cities.map(city=>{const o=document.createElement('option');o.value=city.name;return o;}));}catch{if(current===sequence)status.textContent='Не удалось загрузить города. Попробуйте ещё раз.';}},300);
  });
  field.addEventListener('change',()=>{const city=cities.find(c=>c.name===field.value);form.elements['hidden-'+field.name].value=city?.id||'';});
 }
 form.addEventListener('submit',async e=>{e.preventDefault();if(!deliveryApi){status.textContent=unavailable;return;}if(!form.elements['hidden-from'].value||!form.elements['hidden-to'].value){status.textContent='Выберите оба города из списка.';return;}
 const dimensions=[...form.querySelectorAll('.params-rep input')];if(dimensions.some(i=>!Number.isFinite(Number(i.value.replace(',','.')))||Number(i.value.replace(',','.'))<=0)){status.textContent='Укажите положительные числа для веса и размеров.';return;}
 const button=form.querySelector('[type="submit"]');button.disabled=true;status.textContent='Рассчитываем стоимость…';document.querySelector('.table-result').style.display='none';
 try{const params=new URLSearchParams(new FormData(form));params.set('action','sdek_calc');const response=await request(params);if(response.success!==true||!response.data)throw Error('No result');let count=0;
 for(const type of ['tariffs','tariffs-shop'])document.querySelectorAll('.'+type+' tr:not(:first-child)').forEach(r=>r.remove());
 for(const [type,tariffs] of Object.entries(response.data)){const table=document.querySelector(type==='im'?'.tariffs-shop table':'.tariffs table');for(const entry of Object.values(tariffs)){if(entry.status===false||entry.errors||!entry.result)continue;const result=entry.result;const row=table.insertRow();for(const value of [result.title,result.price,result.deliveryPeriodMin===result.deliveryPeriodMax?result.deliveryPeriodMin:`${result.deliveryPeriodMin} – ${result.deliveryPeriodMax}`])row.insertCell().textContent=String(value);count++;}}
 document.querySelector('.table-result').style.display=count?'block':'none';status.textContent=count?'Расчёт готов.':'Для выбранного маршрута тарифы не найдены.';
 }catch{status.textContent='Не удалось получить расчёт. Попробуйте позже или свяжитесь с менеджером.';}finally{button.disabled=false;}
 });
}
