async function getWorkHistory(){
    return await fetch('http://localhost:3000/workHistory')
    .then((response) => response.json())
    .then((data) => data);
}


document.addEventListener('DOMContentLoaded', async () =>{
    let workHistoryList = document.querySelector('.workHistoryList');
    workHistoryList.innerHTML = '';
    let workHistory = await getWorkHistory();
    let i =1;
    workHistory.forEach((tradieHistory) =>{
       
        let requestHTML = `
        <tr>
        <th scope="row">${i++} <input type="hidden" class="serviceRequestId" value="${tradieHistory.id}"></th>
        <td>${tradieHistory.date} <input type="hidden" class="serviceId" value="${tradieHistory.serviceId}"> </td>
        <td>${tradieHistory.stage}</td>
        <td>
            <button type="button" class="btn btn-link approveBtn">Approve</button>
            <p class="hidden approvedMsg"> Request Approved</p>
            <button type="button" class="btn btn-link mt-2 rejectBtn">Reject</button>
            <p class="hidden rejectMsg"> Request Rejected</p>
            <a href="/serviceRequestDP?id=${tradieHistory.id}" class="btn btn-link mt-2">View Details</a>
        </td>
      </tr>`;
      workHistoryList.insertAdjacentHTML('beforeend', requestHTML);
    })
}) 