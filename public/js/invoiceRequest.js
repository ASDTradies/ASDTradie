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
    invoices.forEach((invoice) =>{
       
        let invoiceHTML = `
        <tr>
        <th scope="row">${i++} <input type="hidden" class="invoiceId" value="${invoice.invoiceId}"></th>
        <td>${invoice.date} <input type="hidden" class="serviceId" value="${invoice.requestId}"> </td>
        <td>${invoice.price}</td>
        <td>
            <button type="button" class="btn btn-link approveBtn">Approve</button>
            <p class="hidden approvedMsg"> Request Approved</p>
            <button type="button" class="btn btn-link mt-2 rejectBtn">Reject</button>
            <p class="hidden rejectMsg"> Request Rejected</p>
            <a href="/serviceRequestDP?id=${invoice.Invoiceid}" class="btn btn-link mt-2">View Details</a>
        </td>
      </tr>`;
      invoiceList.insertAdjacentHTML('beforeend', invoiceHTML);
    })
}) 