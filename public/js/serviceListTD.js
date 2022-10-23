// function to get all the services
async function getServices(){
    // get all the services
    return await fetch('http://localhost:3000/service')
    .then((response) => response.json()) // getting the response as json
    .then((data) => data); // getting the data
}

// function to display the services
document.addEventListener('DOMContentLoaded' ,async function(){
    let services = await getServices();
    // getting the HTML element to display the services
    let serviceList = document.querySelector('.serviceList');
    serviceList.innerHTML = '';
    let id = 1;
    // displaying the services in the HTML element by looping through the services
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