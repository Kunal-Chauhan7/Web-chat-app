function shuffle(array) {
    let currentIndex = array.length,
    randomIndex;
while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex],
    array[currentIndex],
    ];
}
return array;
}

let arr =   [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 
            'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
            's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', 
            '7', '8', '9', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', 
            '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', 
            '{', '|', '}', '~'];

let onrignal_char = [' ','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
                    'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
                    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2',
                    '3', '4', '5', '6', '7', '8', '9', '!','"', '#', '$', '%','&', "'", 
                    '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?',
                    '@', '[', ']', '^', '_', '`', '{', '|', '}', '~'];

shuffle(arr);






const socket = io();


function playSound(){
    var audio = new Audio("/ring.mp3");
    audio.play();
}

let username;
let textarea = document.querySelector('#text_area');
let messagearea = document.querySelector('.message__area');
do {
    username = prompt("Please Enter Your name !");
} while (!username);

textarea.addEventListener('keyup',(e)=>{
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user: username,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    socket.emit('message',msg);
    scrolltobottom();
    playSound();
}
function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let classname = type;
    mainDiv.classList.add(classname , 'message');
    let input = msg.message;

    let cipher_list = [];
    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        let index = onrignal_char.indexOf(element);
        let chaar =  arr[index];
        cipher_list.push(chaar);
    }   
    let cipher_text = cipher_list.toString().split(",").join('')
    let markup = `
    <h4> ${msg.user}</h4>
    <span class = "Secret_code" id="spanny">${cipher_text}</span>
    `
    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);
    let normal_list = [];
    for (let i = 0; i < cipher_text.length; i++) {
        const element = cipher_text[i];
        let index = arr.indexOf(element);
        let chaar =  onrignal_char[index];
        normal_list.push(chaar);
    }
    let decrypted_message = normal_list.toString().split(",").join('');
    let secretclass = document.querySelector('.Secret_code');
    let spantags = document.getElementById('spanny');
    spantags.addEventListener('mouseenter',function(){
        secretclass.innerHTML = decrypted_message;
    });
    spantags.addEventListener('mouseleave',function(){
        secretclass.innerHTML = cipher_text;
    });
}

socket.on('send_message_to_other',(msg)=>{
    appendMessage(msg,'incoming');
    scrolltobottom();
})

function scrolltobottom(){
    messagearea.scrollTop = messagearea.scrollHeight;
}
