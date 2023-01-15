import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form =document.querySelector('form')
const chatContainer=document.querySelector('#chat_container')

let loadInterval;

const loader=(ele)=> {
  ele.textContent=''

  loadInterval = setInterval(()=>{
    ele.textContent += '.';

    if(ele.textContent==='....'){
      ele.textContent=''
    }
  },300)
}

function typeText(ele,text){
  let index=0

  let interval=setInterval(()=>{
    if(index<text.length){
      ele.innerHTML += text.charAt(index)
      index++
    } else{
      clearInterval(interval)
    }
  },20)
}

function generateUniqueId(){
  const timeStamp=Date.now()
  const randomNum=Math.random()
  const hexaDecimal=randomNum.toString(16)

  return `id-${timeStamp}-${hexaDecimal}`
}


function chatStripe(isAi,val,uniqueID){
  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div class="profile">
          <img 
            src="${isAi ?bot : user}"
            alt="${isAi ?'bot' : 'user'}"
          />
        </div>
        <div class="message" id=${uniqueID}>
          ${val}        
        </div>
      </div>
    </div>
    `
  )
}


const handleSubmit=async (e)=>{
  e.preventDefault()

  const data=new FormData(form)

  //user Chat console
  chatContainer.innerHTML += chatStripe(false,data.get('prompt'))

  form.reset()


  // Ai(bot) console

  const uniqueId=generateUniqueId();
  chatContainer.innerHTML += chatStripe(true," ",uniqueId)

  chatContainer.scrollTop = chatContainer.scrollHeight

  const msgDiv=document.getElementById(uniqueId)

  loader(msgDiv)

}

form.addEventListener('submit',handleSubmit)
form.addEventListener('keyup',(e)=>{
  if(e.keyCode===13){
    handleSubmit(e)
  }
})
