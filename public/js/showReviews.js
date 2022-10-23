{
    let id =1;
    let reviewList = document.querySelector('.review-list tbody');
    async function getReviews(){
        return await fetch('/reviews')
        .then((res) => res.json()).then((data) =>data)
    }


    document.addEventListener('DOMContentLoaded', async(req,res) =>{
    let reviews = await getReviews();
    reviewList.innerHTML= '';
    reviews.forEach(review =>{
        let reviewHTML = `
        <tr>
        <th >${id++} <input type="hidden" class="id" value ="${review.id}" /></th>
        <td>${review.serviceRequestId}</td>
        <td>${review.reviewName}</td>
        <td>${review.review}</td>
        <td><button type="button" class="btn btn-link deleteBtn p-0">X</button>
        </td>
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