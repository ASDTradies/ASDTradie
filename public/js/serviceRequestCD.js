async function getServiceRequests(){
    return await fetch('http://localhost:3000/requestService')
    .then((response) => response.json())
    .then((data) => data);
}


document.addEventListener('DOMContentLoaded', async () =>{
    let i = 1;
    let serviceRequestList = document.querySelector('.serviceRequestList');
    serviceRequestList.innerHTML = '';
    let serviceRequests = await getServiceRequests();
    serviceRequests.forEach((request) =>{
        let requestHTML = `
        <tr>
        <th scope="row">${i++}</th>
        <td>${request.date}</td>
        <td>${request.stage}</td>
        <td>${request.hoursWorked}</td>
        <td>${request.priceByHour}</td>
        <td>
        <a href="/serviceRequestDP?id=${request.id}" class="btn btn-link mt-2">View Details</a>
        </td>
      </tr>`;
      serviceRequestList.insertAdjacentHTML('beforeend', requestHTML);
    })
}) 