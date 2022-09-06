
async function getServices(){
    return await fetch('http://localhost:3000/service')
    .then((response) => response.json())
    .then((data) => data);
}

document.addEventListener('DOMContentLoaded' ,async function(){
    let services = await getServices();
    let serviceList = document.querySelector('.serviceList');
    serviceList.innerHTML = '';
    let id = 1;
    services.forEach((service) =>{
        let serviceListHTML = `
        <tr>
        <th scope="row" id="${service.id}">${id++}</th>
        <td>${service.serviceTitle}</td>
        <td>${service.description}</td>
        <td> <a href="./serviceDetailsPage.html" class="btn btn-link">View Details</a></td>
        <td> <a href="./updateService.html" class="btn btn-link">Edit</a></td>
    </tr>`
        serviceList.insertAdjacentHTML('beforeend',serviceListHTML );

    })
})