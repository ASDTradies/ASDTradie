
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
        <th scope="row">${id++} <input type="hidden" value="${service.id}" class="serviceId"/> </th>
        <td>${service.serviceTitle}</td>
        <td>${service.description}</td>
        <td> <a href="./serviceDetailsPage.html" class="btn btn-link">View Details</a></td>
        <td> <button class="btn btn-link updateServiceBtn">Edit</button></td>
    </tr>`
        serviceList.insertAdjacentHTML('beforeend',serviceListHTML );

    })
})