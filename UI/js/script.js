const firstname = document.getElementById('sign-up-firstname').value;
const lastname = document.getElementById('sign-up-lastname').value;
const email = document.getElementById('sign-up-email').value;
const password = document.getElementById('sign-up-password').value;
const confirmPassword = document.getElementById('sign-up-Confirmpassword').value;
const createNewUser = (e) => {
    fetch('https://my-dairy-01.herokuapp.com/api/v1/auth/signin',{
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
    },
    body:JSON.stringify({firstname, lastname,email,password,confirmPassword})
})
.then(res => res.json())
.then(user=> console.log(user))
.catch(err => console.log(err))
}

document.getElementById('sign-up-button').addEventListener('click', createNewUser);
console.log('connected');