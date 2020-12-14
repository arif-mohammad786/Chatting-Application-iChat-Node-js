
const socket=io("http://localhost:8000");

const form=document.getElementById("form");
const messageinput=document.getElementById("inputstyle");
const messagecontainer=document.getElementById("message-container");

const append=(message,position)=>{
    const messageelement=document.createElement("div");
    messageelement.innerText=message;
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=messageinput.value;
    append(`You: ${msg}`,'right');
    socket.emit('send',msg);
    console.log(msg);
    messageinput.value='';
})

const name=prompt("Enter your Name");

socket.emit("new-user-joined",name);

socket.on("user-joined",(name)=>{
    append(`${name} joined chat`,'right');
})

socket.on("receive",(data)=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on("left-group",(name)=>{
    append(`${name}: left the group`,'left');
})