{
    let id =1;
    let commentsList = document.querySelector('.commentsList tbody');
    async function getComments(){
        return await fetch('/comments')
        .then((res) => res.json()).then((data) =>data)
    }


    document.addEventListener('DOMContentLoaded', async(req,res) =>{
    let comments = await getComments();
    commentsList.innerHTML= '';
    comments.forEach(comment =>{
        let commentHTML = `
        <tr>
        <th >${id++} <input type="hidden" class="id" value ="${comment.id}" /></th>
        <td>${comment.serviceRequestId}</td>
        <td>${comment.name}</td>
        <td>${comment.comment}</td>
        <td><button type="button" class="btn btn-link deleteBtn p-0">X</button></td>
        </tr>`;
        commentsList.insertAdjacentHTML('beforeend', commentHTML);
    })
    })

    // reviewList.addEventListener('click',  function(e){
    //     if(e.target.classList.contains('deleteBtn')){
    //         let newID = e.target.parentNode.parentNode.querySelector('.id').value;
    //          fetch('/reviews/'+newID, {
    //             method: 'DELETE'
    //         }).then((res) => res.text()).then(() => window.history.go())
    //     }
    // })


}