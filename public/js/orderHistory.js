async function getOrderHistory(){
    return await fetch('http://localhost:3000/orderHistory')
    .then((response) => response.json())
    .then((data) => data);
}


document.addEventListener('DOMContentLoaded', async () =>{
    let orderHistoryList = document.querySelector('.orderHistoryList');
    orderHistoryList.innerHTML = '';
    let orderHistory = await getOrderHistory();
    let i =1;
    orderHistory.forEach((customerHistory) =>{
       
        let requestHTML = `
        <tr>
        <th scope="row">${i++} <input type="hidden" class="serviceRequestId" value="${customerHistory.id}"></th>
        <td>${customerHistory.date} <input type="hidden" class="serviceId" value="${customerHistory.serviceId}"> </td>
        <td>${customerHistory.stage}</td>
        <td>
            <button type="button" class="btn btn-link approveBtn">Approve</button>
            <p class="hidden approvedMsg"> Request Approved</p>
            <button type="button" class="btn btn-link mt-2 rejectBtn">Reject</button>
            <p class="hidden rejectMsg"> Request Rejected</p>
            <a href="/serviceRequestDP?id=${customerHistory.id}" class="btn btn-link mt-2">View Details</a>
        </td>
      </tr>`;
      customerHistoryList.insertAdjacentHTML('beforeend', requestHTML);
    })
}) 