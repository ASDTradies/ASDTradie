
async function getServices(){
    return await fetch('http://localhost:3000/service')
    .then((response) => response.json())
    .then((data) => data);
}

document.addEventListener('DOMContentLoaded' ,async function(){
    let services = await getServices();
    let serviceTiles = document.querySelector('.servicesTile-list');
    serviceTiles.innerHTML = '';
    // if(Array.isArray(services)){
    //     console.log('service is an array');
    // }else{
    //     console.log('service is not an array');
    // }
    services.forEach((service) =>{
        let serviceHTML = `
        <div class="card col-4" >
        <img class="card-img-top" src="${service.imageURL}" alt="${service.serviceTitle}">
        <input type="hidden" value="${service.id}" class="serviceId">
        <div class="card-body">
          <h5 class="card-title">${service.serviceTitle}</h5>
          <p class="card-text">${service.description}</p>
          <button class="btn btn-primary reqService">Request Service</button>
          <p class="hidden reqServiceConfirmationMsg">Service already requested</p>
            <a href="service.html" class="btn btn-primary">View Details</a>
        </div>
      </div>
        `;
        serviceTiles.insertAdjacentHTML('beforeend',serviceHTML );

    })
})