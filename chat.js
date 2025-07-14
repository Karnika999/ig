const chat = document.getElementById('chatWindow');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typing = document.getElementById('typingIndicator');
const notif = document.getElementById('notifSound');
const user = localStorage.getItem('user');
let other = user==='Naman' ? 'Pranav' : 'Naman';

document.getElementById('chatTitle').innerText=other;
document.getElementById('chatCaption').innerText = other==='Pranav' ? 'frontend web dev type' : 'py developer type';
typing.innerText=other+' is typing...';

let messages = [];
let typingTimeout;

function render() {
  chat.innerHTML = '';
  messages.forEach(m => {
    const div = document.createElement('div');
    div.className = 'message ' + (m.from===user ? 'me' : 'other');
    if(m.reply) {
      const replyDiv = document.createElement('div');
      replyDiv.className='reply-preview';
      replyDiv.innerText='Replied to: '+m.reply;
      div.appendChild(replyDiv);
    }
    div.innerHTML += m.text + `<div class="timestamp">${m.time}</div>` +
      (m.from===user ? `<div class="delivered">${m.status}</div>` : '');
    div.onclick=()=>startReply(m.text);
    chat.appendChild(div);
  });
  chat.scrollTop = chat.scrollHeight;
}

function startReply(text) {
  input.value='↪ '+text+' ';
  input.focus();
}

function send() {
  let txt = input.value.trim();
  if(!txt) return;
  let reply=null;
  if(txt.startsWith('↪')) {
    let parts=txt.split(' ');
    reply=parts[1];
    txt=parts.slice(2).join(' ');
  }
  const msg={ text:txt, from:user, time:new Date().toLocaleTimeString().slice(0,5), status:'Delivered', reply };
  messages.push(msg);
  save();
  input.value='';
  typing.style.display='none';
  render();
  setTimeout(()=>receive(),1000); // simulate reply
}

function receive(){
  const msg={ text:'Auto reply!', from:other, time:new Date().toLocaleTimeString().slice(0,5) };
  messages.push(msg);
  notif.play();
  render();
}

input.addEventListener('input',()=>{
  typing.style.display='block';
  clearTimeout(typingTimeout);
  typingTimeout=setTimeout(()=>typing.style.display='none',1000);
});

sendBtn.onclick=send;
document.getElementById('clearBtn').onclick=()=>{
  messages=[]; save(); render();
}

function save(){ localStorage.setItem('chat-messages',JSON.stringify(messages)); }
function load(){ messages=JSON.parse(localStorage.getItem('chat-messages')||'[]'); }
load(); render();
