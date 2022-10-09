let reviewForm = document.querySelector('.reviewForm');
let serviceRequestID = document.querySelector('#serviceRequestId')
let name = document.querySelector('#name');
let review = document.querySelector('#review');

reviewForm.addEventListener('submit', function(e){
    e.preventDefault();
    fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            serviceRequestId:serviceRequestId.value,
            reviewName: reviewName.value,
            review: review.value,   
        })
    }).then((res) => res.text()).then(() => window.history.go());
})