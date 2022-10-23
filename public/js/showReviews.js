{
    let id =1; // Setting first row of ID as 1 within table
    let reviewList = document.querySelector('.review-list tbody');
    async function getReviews(){   // CALLING ALL REVIEWS IN DATABASE
        return await fetch('/reviews')
        .then((res) => res.json()).then((data) =>data)
    }

    //Listener to approve get reviews method
    document.addEventListener('DOMContentLoaded', async(req,res) =>{
    let reviews = await getReviews();
    reviewList.innerHTML= '';
    reviews.forEach(review =>{
        //Iterate trough each review and build a new row within table
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
    // Listener to wait for someone to click delete button in table
    reviewList.addEventListener('click',  function(e){
        if(e.target.classList.contains('deleteBtn')){
            let newID = e.target.parentNode.parentNode.querySelector('.id').value; // Find same id in database and delete review
             fetch('/reviews/'+newID, {
                method: 'DELETE'
            }).then((res) => res.text()).then(() => window.history.go())
        }
    })


}