 let body = document.querySelector("body");
 let btns = document.querySelectorAll(".box");

btns.forEach((btn)=>{
    btn.addEventListener('click', (ev)=>{
        body.style.backgroundColor = ev.currentTarget.id;
    })
})