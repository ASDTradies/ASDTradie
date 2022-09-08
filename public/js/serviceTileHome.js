
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
    for(let i = 0; i < 3; i++){
      let serviceHTML = `
      <div class="card col-4" >
      <img class="card-img-top" src="${services[i].imageURL}" alt="${services[i].serviceTitle}">
      <input type="hidden" value="${services[i].id}" class="serviceId">
      <div class="card-body">
        <h5 class="card-title">${services[i].serviceTitle}</h5>
        <p class="card-text">${services[i].description}</p>
        <button class="btn btn-link reqService">Request Service</button>
        <p class="hidden reqServiceConfirmationMsg">Service already requested</p>
          <a href="/serviceDP?id=${services[i].id}" class="btn btn-link">View Details</a>
      </div>
    </div>
      `;
      serviceTiles.insertAdjacentHTML('beforeend',serviceHTML );

    }
    services.forEach((service) =>{
       

    })
})