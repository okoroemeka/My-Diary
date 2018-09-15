/* User signup  */
const createNewUser = (e) => {
    e.preventDefault();
    const firstname = document.getElementById('sign-up-firstname').value;
    const lastname = document.getElementById('sign-up-lastname').value;
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;
    const confirmPassword = document.getElementById('sign-up-Confirmpassword').value;
    fetch('https://my-dairy-01.herokuapp.com/api/v1/auth/signup',{
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
    },
    body:JSON.stringify({firstname, lastname, email, password, confirmPassword})
})
.then(res => res.json())
.then((user) => {
    if (user.status === 'fail') {
        document.getElementById('response').innerHTML=
        `<h3 style="font-weight: lighter; color:blue; font-size:1rem,"> ${user.message} </h3>`;
    } else if(user.status === 'success'){
        document.getElementById('response').innerHTML=
        `<h3 style="font-weight: lighter; color:blue;"> signed up succesful, please proceed to login</h3>`;
        window.location = 'https://okoroemeka.github.io/My-Diary/UI/login.html';
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
document.getElementById('signup-page-button').addEventListener('click', createNewUser);

