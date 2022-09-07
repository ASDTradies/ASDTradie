{
    let createServiceForm = document.querySelector('.createServiceForm');
    let serviceTitle = document.querySelector('#serviceTitle');
    let description = document.querySelector('#description');
    let longDescription = document.querySelector('#longDescription');
    let imageURL = document.querySelector('#imageURL');


    let addServiceTab = document.querySelector('#v-pills-addService-tab');
    addServiceTab.classList.add('hidden');

    document.querySelector('.postServiceBtn').addEventListener('click', () =>{
        addServiceTab.click();
    })

    createServiceForm.addEventListener('submit', async function(e){
        e.preventDefault();
        await fetch('http://localhost:3000/service', {
            method: 'POST',
            headers :{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                serviceTitle: serviceTitle.value,
                description: description.value,
                longDescription: longDescription.value,
                imageURL: imageURL.value,
            }
        )}).then((response) => response.text()).then((data) => window.history.go())
    })
}