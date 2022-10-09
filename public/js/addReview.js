let reviewForm = document.querySelector('.reviewForm');
let serviceRequestID = document.querySelector('#serID')
let name = document.querySelector('#name');
let review = document.querySelector('#review');



reviewForm.addEventListener('submit', function(e){
    e.preventDefault();
    fetch('/reviews-model', {
        method: 'POST',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            serviceRequestId: serID.value,
            reviewName:reviewName.value,
            review: review.value,     
        })
    }).then((res) => res.text()).then(() => window.history.go());
})