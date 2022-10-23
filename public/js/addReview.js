let reviewForm = document.querySelector('.reviewForm');
let reviewName = document.querySelector('#reviewName');
let review = document.querySelector('#review');
let reviewTabBtn = document.querySelector('#v-pills-addReviews-tab');
let serviceRequests = document.querySelector('.serviceRequests');
let id;
reviewTabBtn.classList.add('hidden');

serviceRequests.addEventListener('click', async(e) =>{
    if(e.target.classList.contains('addReviewBtn')){
        reviewTabBtn.click();
        id = e.target.parentNode.parentNode.querySelector('.serviceRequestId').value;
        console.log(id);
    }
})

reviewForm.addEventListener('submit', function(e){
    e.preventDefault();
    fetch('/reviews', {
        method: 'POST',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            serviceRequestId: id,
            reviewName: reviewName.value,
            review: review.value,   
        })
    }).then((res) => res.text()).then(() => window.history.go());
})