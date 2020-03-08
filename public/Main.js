var btn =document.querySelectorAll('.btn');

for(let i=0;i<btn.length;i++){
  btn[i].addEventListener('mouseover',function()
  {
    btn[i].style.color = '#46A3FF';
    btn[i].style.borderBottomColor='#46A3FF';}
    ,true);
}
for(let l=0;l<btn.length;l++) {
  btn[l].addEventListener('mouseout',function () {
    btn[l].style.color = '';
    btn[l].style.borderBottomColor='';
  },true);
}

function redirect(n) {
  window.location.href=n;
}


