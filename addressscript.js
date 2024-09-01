


const queryParams = new URLSearchParams(window.location.search);

const fullName = queryParams.get('fullName');

const form = document.getElementById('addressForm');

const hiddenname = document.createElement('input');
hiddenname.type = 'hidden';
hiddenname.name = 'name';
hiddenname.value = fullName;
form.appendChild(hiddenname);


const email = queryParams.get('email');


const hiddenemail = document.createElement('input');
hiddenemail.type = 'hidden';
hiddenemail.name = 'email';
hiddenemail.value = email;
form.appendChild(hiddenemail);

document.getElementById('username').innerText = `Welcome, ${fullName}`;



document.getElementById('addressForm').addEventListener('submit', function (event) {


  window.location.href = 'verifyotp.html';



});


document.getElementById('addressForm').action = 'verifyotp.html';


