const form = document.getElementById("register-form");
form.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const password = checkPasswords();
    const profileType = checkType();
    const alert = document.getElementById('register-alert');
    if(password === ""){
        alert.innerHTML = 'The passwords are not identical!';
        const pwFields = document.querySelectorAll('#p1, #p2');
        pwFields.forEach(field => {
            field.value = '';
            field.classList.add('border-danger');
        });
        return;
    }
    
    const result = await fetch('http://localhost:3000/register', {
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
    if(result.status === 'ok'){
        console.log('User has been created!');
    } else {
        alert.innerHTML = 'This email is already in use!';
        form.reset();
        console.log(result.error); 
    }
}

function checkType(){
    return document.getElementById('profileType').checked ? 'T' : 'C';
}

function checkPasswords(){
    return document.getElementById('p1').value === document.getElementById('p2').value ? document.getElementById('p1').value : "";
}