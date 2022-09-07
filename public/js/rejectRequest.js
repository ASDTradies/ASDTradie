{
    let serviceRequestList = document.querySelector('.serviceRequestList');
serviceRequestList.addEventListener('click', async (e) =>{
    if(e.target.classList.contains('rejectBtn')){
        let id = e.target.parentNode.parentNode.querySelector('.serviceRequestId').value;
        let serviceId = e.target.parentNode.parentNode.querySelector('.serviceId').value;
        e.target.parentNode.parentNode.querySelector('.approvedMsg').classList.remove('hidden');
        await fetch('http://localhost:3000/requestService/' +id ,{
            method: 'PUT', 
            headers:{
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                stage: 'Rejected',
                serviceId: serviceId
            })
        }).then((res) => res.text()).then((data) => console.log(data));
        e.target.parentNode.parentNode.querySelector('.rejectMsg').classList.remove('hidden');
        e.target.parentNode.parentNode.querySelector('.rejectBtn').classList.add('hidden');
        e.target.parentNode.parentNode.querySelector('.approveBtn').classList.remove('hidden');
        e.target.parentNode.parentNode.querySelector('.approvedMsg').classList.add('hidden');
    }
})
}