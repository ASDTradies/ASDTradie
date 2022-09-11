const form = document.getElementById("register-form");
form.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const password = document.getElementById('password').value;
    const profileType = checkType();
    
    await fetch('http://localhost:3000/registerUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            profileType
        })
    })
    .then((res) => res.json())
}

function checkType(){
    return document.getElementById('profileType').checked ? 'T' : 'C';
}