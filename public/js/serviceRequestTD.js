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
        <th scope="row">${request.id} <input type="hidden" class="serviceRequestId" value="${request.id}"></th>
        <td>${request.serviceId} <input type="hidden" class="serviceId" value="${request.serviceId}"> </td>
        <td>${request.stage}</td>
        <td>
            <button type="button" class="btn btn-link approveBtn">Approve</button>
            <p class="hidden approvedMsg"> Request Approved</p>
            <button type="button" class="btn btn-link mt-2 rejectBtn">Reject</button>
            <p class="hidden rejectMsg"> Request Rejected</p>
            <button type="button" class="btn btn-link mt-2">View Details</button>
        </td>
      </tr>`;
      serviceRequestList.insertAdjacentHTML('beforeend', requestHTML);
    })
}) 