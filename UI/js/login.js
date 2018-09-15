/* User login */
const logInUser = (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    fetch('https://my-dairy-01.herokuapp.com/api/v1/auth/signin',{
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
    },
    body:JSON.stringify({ email, password })
})
.then(res => res.json())
.then((user) => {
    if (user.status === 'fail') {
        document.getElementById('response').innerHTML=
        `<h3 style="font-weight: lighter; color:blue; font-size:1rem,"> ${user.message} </h3>`;
    } else if(user.status === 'success'){
        window.location = 'https://okoroemeka.github.io/My-Diary/UI/diary-entry.html';
    }
    else{
        document.getElementById('response').innerHTML=
        `<h3 style="font-weight: lighter; color:blue;"> ${user.message} </h3>`;
    }
})
.catch((err) => {
    document.querySelector('html').innerHTML=
    `<h3 style="font-weight: lighter; color:black;"> Internal server error, please try again </h3>`;
 })
}
document.getElementById('logIn-page-button').addEventListener('click', logInUser);