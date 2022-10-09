{
    let id =1;
    let reviewList = document.querySelector('.review-list tbody');
    async function getReviews(){
        return await fetch('http://localhost:3000/reviews')
        .then((res) => res.json()).then((data) =>data)
    }


    document.addEventListener('DOMContentLoaded', async(req,res) =>{
    let reviews = await getReviews();
    reviewList.innerHTML= '';
    reviews.forEach(review =>{
        let reviewHTML = `
        <tr>
        <th >${id++} <input type="hidden" class="id" value ="${review.id}" /></th>
        <td>${review.serID}</td>
        <td>${review.name}</td>
        <td>${review.review}</td>
        <td><button type="button" class="btn btn-link deleteBtn p-0">X</button></td>
        </tr>`
        reviewList.insertAdjacentHTML('beforeend', reviewHTML);
    })
    })

    reviewList.addEventListener('click',  function(e){
        if(e.target.classList.contains('deleteBtn')){
            let newID = e.target.parentNode.parentNode.querySelector('.id').value;
             fetch('/reviews/'+newID, {
                method: 'DELETE'
            }).then((res) => res.text()).then(() => window.history.go())
        }
    })


}




async function getServices(){
    return await fetch('http://localhost:3000/service')
    .then((response) => response.json())
    .then((data) => data);
}

document.addEventListener('DOMContentLoaded' ,async function(){
    let services = await getServices();
    let serviceList = document.querySelector('.serviceList');
    serviceList.innerHTML = '';
    let id = 1;
    services.forEach((service) =>{
        let serviceListHTML = `
        <tr>
        <th scope="row">${id++} <input type="hidden" value="${service.id}" class="serviceId"/> </th>
        <td>${service.serviceTitle}</td>
        <td>${service.description}</td>
        <td class="d-flex">
         <a href="/serviceDP?id=${service.id}" class="btn btn-link">View Details</a>
        <button class="btn btn-link updateServiceBtn">Edit</button></td>
        
    </tr>`
        serviceList.insertAdjacentHTML('beforeend',serviceListHTML );

    })
})