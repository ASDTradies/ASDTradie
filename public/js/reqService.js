let servicesTileList = document.querySelector('.servicesTile-list');
// getting the services from the database
servicesTileList.addEventListener('click', async function(e){
    // ensuring if the click was done on the button
    if(e.target.classList.contains('reqService')){
        let serviceId = e.target.parentNode.parentNode.querySelector('.serviceId').value;
        // sending the post request to add service request
        await fetch('http://localhost:3000/requestService' , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                serviceId: serviceId,
                stage: 'Processing',
                hoursWorked : 0,
                priceByHour : 0
            }
        )})
        .then((res) => res.text())
        .then((data) => console.log(data));
         let reqServiceConfirmationMsg = e.target.parentNode.parentNode.querySelector('.reqServiceConfirmationMsg');
         reqServiceConfirmationMsg.classList.remove('hidden');
         let reqService = e.target.parentNode.parentNode.querySelector('.reqService');
         reqService.classList.add('hidden');
    }
})



//user cancel request 
// servicesTileList.addEventListener('click', async function(e){
//     if(e.target.classList.contains('cancelReqService')){
//         let serviceId = e.target.parentNode.parentNode.querySelector('.serviceId').value;
//         await fetch('http://localhost:3000/requestService/cancel' , {
//             method: 'PUT',
//             header: {
//                 'Content-Type' : 'application/json'
//             },
//             body : JSON.stringify({
//                 serviceId: serviceId.value,
//                 stage: 'service requested cancelled'
//             }
//         )})
//         .then((res) => res.text())
//         .then((data) => console.log(data));
//         let cancelReqService = e.target.parentNode.parentNode.querySelector('.cancelReqService');
//         cancelReqService.classList.remove('hidden');
//         let reqService = e.target.parentNode.parentNode.querySelector('.reqService');
//         reqService.classList.add('hidden');

        
//     }
// })