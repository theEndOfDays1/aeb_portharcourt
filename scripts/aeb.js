window.addEventListener('scroll', ()=> {
     document.querySelector('.heading').classList.toggle('window-scroll',  window.scrollY > 0)
});
if(window.matchMedia('(max-width: 768px)').matches){
     document.title = 'Home'
}