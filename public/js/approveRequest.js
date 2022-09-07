let serviceRequestList = document.querySelector('.serviceRequestList');
serviceRequestList.addEventListener('click', async (e) =>{
    if(e.target.classList.contains('approveBtn')){
        let id = e.target.parentNode.parentNode.querySelector('.serviceRequestId').value;
        let serviceId = e.target.parentNode.parentNode.querySelector('.serviceId').value;
        e.target.parentNode.parentNode.querySelector('.approvedMsg').classList.remove('hidden');
        await fetch('http://localhost:3000/requestService/' +id ,{
            method: 'PUT', 
            headers:{
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                stage: 'Approved',
                serviceId: serviceId
            })
        }).then((res) => res.text()).then((data) => console.log(data));
        e.target.parentNode.parentNode.querySelector('.approvedMsg').classList.remove('hidden');
        e.target.parentNode.parentNode.querySelector('.approveBtn').classList.add('hidden');
        e.target.parentNode.parentNode.querySelector('.rejectBtn').classList.remove('hidden');
        e.target.parentNode.parentNode.querySelector('.rejectMsg').classList.add('hidden');

    }
})