const button = window.document.getElementById("button");
const buttonNumber = window.document.getElementById("number")
const input = window.document.querySelectorAll("input");
const label = window.document.querySelectorAll("label");
// import condition from '../index.js';
// import * as condition from '../index.js';
let split = [];
let Key;
let b = 0;
let c = 1;
buttonNumber.disabled = true;
button.disabled = true;
button.className = "tat";
buttonNumber.className = "tat";

input.forEach(element => {
    element.addEventListener("keyup", (e)=>{
        if(element.id == "0" || element.id == "3" || element.id == "4" || element.id == "5" || element.id == "6" || element.id == "7" || element.id == "8"){
            if(isNaN(element.value) || element.value == ""){
                button.disabled = true;
                button.className = "tat";
                buttonNumber.className = "tat";
                label[element.id].innerText = `${element.title} Digite um valor valido`;
                label[element.id].style.color = "red";
            }else{
                buttonNumber.disabled = false;
                buttonNumber.className = "tit";
                label[element.id].innerText = `${element.title}`;
                label[element.id].style.color = "#FFCC01";
            }
        }else if(element.id == "2"){
            Key = element.value;
            split = Key.split("");
            b = split.length;
            let a = 0;
            split.forEach(x=>{
                if(!isNaN(x)){
                    button.className = "tat";
                    buttonNumber.className = "tat";
                    button.disabled = true;
                    label[element.id].innerText = `${element.title} Digite um valor valido`;
                    label[element.id].style.color = "red";
                    a=0;
                }else if(isNaN(x)){
                    a++;
                    console.log(split, b, a);
                    if(a >= b){
                        label[element.id].innerText = `${element.title}`;
                        label[element.id].style.color = "#FFCC01";
                    }else{                
                        button.className = "tat";
                        buttonNumber.className = "tat";
                        button.disabled = true;
                        label[element.id].innerText = `${element.title} Digite um valor valido`;
                        label[element.id].style.color = "red";
                    }
                }
            })
            if(b == 0){
                button.className = "tat"
                buttonNumber.className = "tat";
                button.disabled = true;
                label[element.id].innerText = `${element.title} Digite um valor valido`
                label[element.id].style.color = "red";
                a=0;
            }
        }else if(element.id == "1"){
            if(element.value == ""){
                button.disabled = true;
                label[element.id].innerText = `${element.title} Digite um valor valido`
                label[element.id].style.color = "red";
                button.className = "tat"
                buttonNumber.className = "tat";
            }else{
                label[element.id].innerText = `${element.title}`
                label[element.id].style.color = "#FFCC01";
            }
        }

    })
        
});
addEventListener("mousemove", (e)=>{
    label.forEach(a=>{
        if(a.style.color == "rgb(255, 204, 1)"){
            //o RGB da cor #FFCC01 é (255, 204, 1) por isso vc n ve esse rgb nos styles que alterei, apenas substitui
            c++
        }else{
            c = 0;
        }
    })

    if(c >= 8){
        button.className = "tit"
        button.disabled = false;
    }else{
        button.disabled = true;
    }
})
buttonNumber.addEventListener("click", ()=>{
    buttonNumber.style.cursor = "wait"
    buttonNumber.className = "tit"
        setTimeout(()=>{
        buttonNumber.disabled = true;
    },1)
})


button.addEventListener("click", ()=>{
    alert("SUCESSO - POKEMON CADASTRADO !!!");
})
