async function getInvoice(){
    return await fetch('http://localhost:3000/invoice')
    .then((response) => response.json())
    .then((data) => data);
}


document.addEventListener('DOMContentLoaded', async () =>{
    let invoiceList = document.querySelector('.invoiceList');
    invoiceList.innerHTML = '';
    let invoices = await getInvoice();
    let i =1;
    invoices.forEach((request) =>{
       
        let requestHTML = `
        <tr>
        <th scope="row">${i++} <input type="hidden" class="invoiceId" value="${request.id}"></th>
        <td>${request.date} <input type="hidden" class="serviceId" value="${request.serviceId}"> </td>
        <td>${request.stage}</td>
        <td>
            <button type="button" class="btn btn-link approveBtn">Approve</button>
            <p class="hidden approvedMsg"> Request Approved</p>
            <button type="button" class="btn btn-link mt-2 rejectBtn">Reject</button>
            <p class="hidden rejectMsg"> Request Rejected</p>
            <a href="/serviceRequestDP?id=${request.id}" class="btn btn-link mt-2">View Details</a>
        </td>
      </tr>`;
      serviceRequestList.insertAdjacentHTML('beforeend', requestHTML);
    })
}) 