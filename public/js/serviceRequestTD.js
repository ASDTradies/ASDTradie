 async function getServiceRequests(){
    return await fetch('http://localhost:3000/requestService')
    .then((response) => response.json())
    .then((data) => data);
}


document.addEventListener('DOMContentLoaded', async () =>{
    let serviceRequestList = document.querySelector('.serviceRequestList');
    serviceRequestList.innerHTML = '';
    let serviceRequests = await getServiceRequests();
    let i =1;
    serviceRequests.forEach((request) =>{
       
        let requestHTML = `
        <tr>
        <th scope="row">${i++} <input type="hidden" class="serviceRequestId" value="${request.id}"></th>
        <td>${request.date} <input type="hidden" class="serviceId" value="${request.serviceId}"> </td>
        <td>${request.stage}</td>
        <td>${request.hoursWorked}</td>
        <td>${request.priceByHour}</td>
        <td>
            <a type="button" href="" class="btn btn-link approvalProcessBtn approveBtn">Approve/Reject</a>
            <a href="/serviceRequestDP?id=${request.id}" class="btn btn-link mt-2">View Details</a>
        </td>
      </tr>`;
      serviceRequestList.insertAdjacentHTML('beforeend', requestHTML);
    })
}) 