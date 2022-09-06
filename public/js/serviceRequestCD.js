async function getServiceRequests(){
    return await fetch('http://localhost:3000/requestService')
    .then((response) => response.json())
    .then((data) => data);
}


document.addEventListener('DOMContentLoaded', async () =>{
    let serviceRequestList = document.querySelector('.serviceRequestList');
    serviceRequestList.innerHTML = '';
    let serviceRequests = await getServiceRequests();
    serviceRequests.forEach((request) =>{
        let requestHTML = `
        <tr>
        <th scope="row">${request.id}</th>
        <td>${request.serviceId}</td>
        <td>${request.stage}</td>
        <td>
        <button type="button" class="btn btn-link">View Details</button>
        </td>
      </tr>`;
      serviceRequestList.insertAdjacentHTML('beforeend', requestHTML);
    })
}) 