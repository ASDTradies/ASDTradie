let serviceList = document.querySelector('.serviceList');
let updateServiceTab = document.querySelector('#v-pills-updateService-tab');
let serviceTitleEdit =  document.querySelector('#serviceTitleEdit');
let descriptionEdit =  document.querySelector('#descriptionEdit');
let longDescriptionEdit =  document.querySelector('#longDescriptionEdit');
let serviceIdInputFieldEdit =  document.querySelector('.serviceIdInputFieldEdit');
let updateServiceForm = document.querySelector('.updateServiceForm');


updateServiceTab.classList.add('hidden');
serviceList.addEventListener('click', async (e) =>{
    if(e.target.classList.contains('updateServiceBtn')){
        let id = e.target.parentNode.parentNode.querySelector('.serviceId').value;
        let service = await getService(id);
       // console.log(service);
        serviceTitleEdit.value = service.serviceTitle;
        descriptionEdit.value = service.description;
        longDescriptionEdit.value = service.longDescription;
        serviceIdInputFieldEdit.value= service.id;
        updateServiceTab.click();
    }
});
updateServiceForm.addEventListener('submit' , async (e) =>{
    e.preventDefault();
    let id = e.target.querySelector('.serviceIdInputFieldEdit').value;
   // console.log(id);
     await fetch('http://localhost:3000/service/'+ id , {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            serviceTitle: serviceTitleEdit.value,
            description:descriptionEdit.value,
            longDescription: longDescriptionEdit.value
        }
     )}).then((res) =>res.text()).then((data) =>window.history.go());

})

async function getService(id){
    return await fetch('http://localhost:3000/service/' +id)
    .then((res) => res.json())
    .then((data) => data);

}