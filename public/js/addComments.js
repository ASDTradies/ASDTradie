let commentForm = document.querySelector('.commentForm');
let serviceRequestID = document.querySelector('#serviceRequestId')
let nameL = document.querySelector('#name');
let comments = document.querySelector('#comment');

commentForm.addEventListener('submit', function(e){
    e.preventDefault();
    console.log('clicked');
    fetch('/comments', {
        method: 'POST',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            serviceRequestId: '0000',
            name: nameL.value,
            comments: comments.value,
        })
       
    }).then((res) => res.text()).then(() => console.log('saved'));
})