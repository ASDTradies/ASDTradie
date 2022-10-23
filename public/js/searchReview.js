{
// getting the HTML elements
let searchReview = document.querySelector('#searchReview');
let searchReviewHTML = document.querySelector('.searchReviewQuery');

// get the reviews that have query in their reviewName or review
searchReview.addEventListener('click',async function(){
    let searchReviewQuery = searchReviewHTML.value;
    console.log(searchReviewQuery);
    // sending the get request to get the reviews that have the query in their reviewName or review
    let review = await fetch(`http://localhost:3000/searchReview?searchReviewQuery=${searchReviewQuery}`)
    .then((response) => response.json())
    .then((data) => data);
    // getting the HTML element to display the reviews
    let reviewList = document.querySelector('.reviewList');
    reviewList.innerHTML = '';
    let i = 1;
    // displaying the reviews
    review.forEach((review) =>{
        let reviewListHTML = `
        <tr>
        <th scope="row">${i++} <input type="hidden" class="reviewId" value="${review.id}"></th>
        <td>${review.reviewName}</td>
        <td>${review.review}</td>
        <td>${review.rating}</td>
        <td>
            <a href="/reviewDP?id=${review.id}" class="btn btn-link mt-2">View Details</a>
        </td>
      </tr>`
        reviewList.insertAdjacentHTML('beforeend',reviewListHTML );

    })
    // button to go back to all reviews
    let backButton = `<button class="btn btn-link backToAllReviews" >Back to all reviews</button>`;
    reviewList.insertAdjacentHTML('beforeend',backButton);
}
)
// button to go back to all reviews
document.addEventListener('click', async (e) =>{
    if(e.target.classList.contains('backToAllReviews')){
    //refresg the page
    location.reload();
    }
})

}