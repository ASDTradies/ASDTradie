let searchServiceRequest = document.querySelector('#searchServiceRequest');
let searchRequestHTML = document.querySelector('.searchRequestQuery');

// get the serviceRequest that have query in their title or description
searchServiceRequest.addEventListener('click',async function(){
    console.log('button clicked');

    let searchRequestQuery = searchRequestHTML.value;
    console.log(searchRequestQuery);
    let serviceRequest = await fetch(`http://localhost:3000/searchRequest?searchRequestQuery=${searchRequestQuery}`)
    .then((response) => response.json())
    .then((data) => data);
    let serviceRequestList = document.querySelector('.serviceRequestList');
    serviceRequestList.innerHTML = '';
    let i = 1;
    console.log('service request arre  ' + serviceRequest);
    serviceRequest.forEach((request) =>{
        let serviceRequestListHTML = `
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
      </tr>`
        serviceRequestList.insertAdjacentHTML('beforeend',serviceRequestListHTML );

    })
    // button to go back to all services
    let backButton = `<button class="btn btn-link backToAllServicesRequest" >Back to all services</button>`;
    serviceRequestList.insertAdjacentHTML('beforeend',backButton);
}
)


document.addEventListener('click', async (e) =>{
    if(e.target.classList.contains('backToAllServicesRequest')){
    //refresg the page
    location.reload();
    }
})
    
