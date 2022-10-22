let approveServiceTab = document.querySelector('#v-pills-approveService-tab');
approveServiceTab.classList.add('hidden');
let appOnFormBtn = document.querySelector('.appOnFormBtn');
let rejOnFormBtn = document.querySelector('.rejOnFormBtn');
let priceByHour = document.querySelector('#priceByHour');
let hoursWorked = document.querySelector('#hoursWorked');


let serviceRequestList = document.querySelector('.serviceRequestList');
serviceRequestList.addEventListener('click', async (e) =>{
    if(e.target.classList.contains('approveBtn')){
        e.preventDefault();
        let id = e.target.parentNode.parentNode.querySelector('.serviceRequestId').value;
        let serviceId = e.target.parentNode.parentNode.querySelector('.serviceId').value;
        approveServiceTab.click();
        //if approve button is clicked

        appOnFormBtn.addEventListener('click', async (e) =>{
            e.preventDefault();
            await fetch('http://localhost:3000/requestService/' +id ,{
                method: 'PUT', 
                headers:{
                    'Content-Type' : 'application/json'
                }, 
            body: JSON.stringify({
                stage: 'Approved',
                serviceId: serviceId,
                hoursWorked : hoursWorked.value,
                priceByHour : priceByHour.value
            })
            }).then((res) => res.text()).then((data) => console.log('service is approved'));
            location.reload();
        });


        rejOnFormBtn.addEventListener('click', async (e) =>{
            e.preventDefault();
            await fetch('http://localhost:3000/requestService/' +id ,{
                method: 'PUT', 
                headers:{
                    'Content-Type' : 'application/json'
                }, 
            body: JSON.stringify({
                stage: 'Rejected',
                serviceId: serviceId,
                hoursWorked : 0,
                priceByHour : 0
            })
            }).then((res) => res.text()).then((data) => console.log('service is rejected'));
            location.reload();
        });
       
       
        
       
        // e.target.parentNode.parentNode.querySelector('.approvedMsg').classList.remove('hidden');
        // e.target.parentNode.parentNode.querySelector('.approveBtn').classList.add('hidden');
        // e.target.parentNode.parentNode.querySelector('.rejectBtn').classList.remove('hidden');
        // e.target.parentNode.parentNode.querySelector('.rejectMsg').classList.add('hidden');

    }
})