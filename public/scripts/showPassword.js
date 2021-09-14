const input= document.querySelector(".input.password input")

document.querySelector("img.passwordButton").addEventListener("click", (event)=>{
    input.type==="password" ? input.type="text" : input.type= "password"
})