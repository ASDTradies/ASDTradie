// function to get all the service requests
async function getServiceRequests(){
    // get all the service requests
    return await fetch('http://localhost:3000/requestService')
    .then((response) => response.json()) // getting the response as json
    .then((data) => data); // getting the data
}

// function to display the service requests on content load
document.addEventListener('DOMContentLoaded', async () =>{
    let i = 1;
    // getting the service request html tile
    let serviceRequestList = document.querySelector('.serviceRequestList');
    serviceRequestList.innerHTML = '';
    // getting the service requests from the database by calling the function
    let serviceRequests = await getServiceRequests();
    // displaying the service requests in the HTML element by looping through the service requests
    serviceRequests.forEach((request) =>{
        let requestHTML = `
        <tr>
        <th scope="row">${i++} <input type="hidden" class="serviceRequestId" value="${request.id}"></th>
        <td>${request.date}</td>
        <td>${request.hoursWorked}</td>
        <td>${request.priceByHour}</td>
        <td>${request.stage}</td>
        <td>
        <button type="button" class="btn btn-link addReviewBtn p-0">Add Review</button>
        <a href="/serviceRequestDP?id=${request.id}" class="btn btn-link mt-2">View Details</a>
        </td>
      </tr>`;
      // inserting the HTML into the HTML element
      serviceRequestList.insertAdjacentHTML('beforeend', requestHTML);
    })
}) 