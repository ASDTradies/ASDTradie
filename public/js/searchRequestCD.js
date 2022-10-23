// getting the HTML elements
let searchServiceRequest = document.querySelector('#searchServiceRequest');
let searchRequestHTML = document.querySelector('.searchRequestQuery');

// get the serviceRequest that have query in their title or description
searchServiceRequest.addEventListener('click',async function(){
    console.log('button clicked');
    // getting the query
    let searchRequestQuery = searchRequestHTML.value;
    console.log(searchRequestQuery);
    // sending the get request to get the service request that have the query in their title or description
    let serviceRequest = await fetch(`http://localhost:3000/searchRequestCD?searchRequestQuery=${searchRequestQuery}`)
    .then((response) => response.json())
    .then((data) => data);
    // getting the HTML element to display the service request
    let serviceRequestList = document.querySelector('.serviceRequestList');
    serviceRequestList.innerHTML = '';
    let i = 1;
    console.log('service request arre  ' + serviceRequest);
    // displaying the service request
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

// button to go back to all services
document.addEventListener('click', async (e) =>{
    if(e.target.classList.contains('backToAllServicesRequest')){
    //refresg the page
    location.reload();
    }
})
    
