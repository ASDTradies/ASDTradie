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
        <td class="d-flex">
         <a href="/serviceDP?id=${service.id}" class="btn btn-link">View Details</a>
        <button class="btn btn-link updateServiceBtn">Edit</button></td>
        
    </tr>`
        serviceList.insertAdjacentHTML('beforeend',serviceListHTML );

    })
})