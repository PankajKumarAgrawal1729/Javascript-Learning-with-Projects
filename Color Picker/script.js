 let body = document.querySelector("body");
 let btns = document.querySelectorAll(".box");
 let resetBtn = document.getElementById("resetBtn");

btns.forEach((btn)=>{
    btn.addEventListener('click', (ev)=>{
        body.style.backgroundColor = ev.currentTarget.id;
    })
});

resetBtn.addEventListener("click", () => {
    body.style.backgroundColor = "white";
})