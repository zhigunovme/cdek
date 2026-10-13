'use strict';
// Preserve archived questions and local navigation, without the CMS plugin.
document.querySelectorAll('.ays-questions-container form').forEach(form=>{
 const steps=[...form.querySelectorAll(':scope > .step')];let index=0;
 function show(i){index=Math.max(0,Math.min(i,steps.length-1));steps.forEach((s,j)=>{s.style.display=j===index?'block':'none';s.classList.toggle('active-step',j===index);});}
 form.addEventListener('click',e=>{if(e.target.closest('.ays_next')){e.preventDefault();show(index+1);}if(e.target.closest('.ays_previous')){e.preventDefault();show(index-1);}if(e.target.closest('.ays_finish')){e.preventDefault();finish();}});
 function finish(){let notice=form.querySelector('[role="status"]');if(!notice){notice=document.createElement('p');notice.setAttribute('role','status');form.append(notice);}notice.textContent='Ответы не отправлены: сервер обработки заявок не подключён. Свяжитесь с менеджером по контактам на сайте.';}
 form.addEventListener('submit',e=>{e.preventDefault();finish();});if(steps.length)show(0);
});
