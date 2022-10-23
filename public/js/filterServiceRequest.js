let approvedFilterBtn = document.querySelector(".approvedFilterBtn");
let rejectedFilterBtn = document.querySelector(".rejectedFilterBtn");

// filter service request by stage (approved or rejected)
approvedFilterBtn.addEventListener("click", function () {
    filterServiceRequest("Approved");
});

rejectedFilterBtn.addEventListener("click", function () {
    filterServiceRequest("Rejected");
});

// function to filter service request by stage
async function filterServiceRequest(stage) {
    let filteredServices = await fetch(`http://localhost:3000/filter?stage=${stage}`)
    .then((response) => response.json())
    .then((data) => data);
    let serviceRequestList = document.querySelector(".serviceRequestList");
    serviceRequestList.innerHTML = "";
    let i = 1;
    filteredServices.forEach((request) => {
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
      </tr>`;
        serviceRequestList.insertAdjacentHTML("beforeend", serviceRequestListHTML);
    });
    // button to go back to all services
    let backButton = `<button class="btn btn-link backToAllServicesRequest" >Back to all services</button>`;
    serviceRequestList.insertAdjacentHTML("beforeend", backButton);
}

// button to go back to all services
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("backToAllServicesRequest")) {
        //refresg the page
        location.reload();
    }
});


