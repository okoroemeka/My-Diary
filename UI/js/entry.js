const createPost = (e) => {
    e.preventDefault();
    const title = document.getElementById('diary-title').value;
    const subject = document.getElementById('diary-subject').value;
    const body = document.getElementById('text-area').value;
    fetch('https://my-dairy-01.herokuapp.com/api/v1/entries',{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
        },
        body:JSON.stringify({ title, subject, body })
    })
    .then(res => res.json())
    .then((entry) => {
        if (entry.status === 'success') {
            document.querySelector('body').innerHTML= `<h3 style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%;)">${entry.status}</h3>`;
        }else if(entry.message === 'Please login'){
            window.location = 'https://okoroemeka.github.io/My-Diary/UI/login.html';
        } else {
            document.querySelector('body').innerHTML = `<h3 style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%;)">${entry.status}</h3>`;
        }
    })
    .catch((err) => {
        document.querySelector('body').value = `<h3 style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%;)">${entry.status}</h3>`;
    })
}
document.getElementById('add-button').addEventListener('click', createPost);
console.log('connected entry.js');