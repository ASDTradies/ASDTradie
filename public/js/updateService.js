let serviceList = document.querySelector('.serviceList');
let updateServiceTab = document.querySelector('#v-pills-updateService-tab');
let serviceTitle =  document.querySelector('#serviceTitle');
let description =  document.querySelector('#description');
let longDescription =  document.querySelector('#longDescription');
let serviceIdInputField =  document.querySelector('.serviceIdInputField');
let updateServiceForm = document.querySelector('.updateServiceForm');


updateServiceTab.classList.add('hidden');
serviceList.addEventListener('click', async (e) =>{
    if(e.target.classList.contains('updateServiceBtn')){
        let id = e.target.parentNode.parentNode.querySelector('.serviceId').value;
        let service = await getService(id);
       // console.log(service);
        serviceTitle.value = service.serviceTitle;
        description.value = service.description;
        longDescription.value = service.longDescription;
        serviceIdInputField.value= service.id;
        updateServiceTab.click();
    }
});
updateServiceForm.addEventListener('submit' , async (e) =>{
    e.preventDefault();
    let id = e.target.querySelector('.serviceIdInputField').value;
   // console.log(id);
     await fetch('http://localhost:3000/service/'+ id , {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            serviceTitle: serviceTitle.value,
            description:description.value,
            longDescription: longDescription.value
        }
     )}).then((res) =>res.text()).then((data) =>window.history.go());

})

async function getService(id){
    return await fetch('http://localhost:3000/service/' +id)
    .then((res) => res.json())
    .then((data) => data);

}