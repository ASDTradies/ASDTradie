{   // Setting first row of ID as 1 within table
    let id =1;
    let commentsList = document.querySelector('.commentsList tbody');
    async function getComments(){
        return await fetch('/comments')
        .then((res) => res.json()).then((data) =>data)
    }

    //Listener to approve get comments method
    document.addEventListener('DOMContentLoaded', async(req,res) =>{
    let comments = await getComments();
    commentsList.innerHTML= '';
    comments.forEach(comment =>{
        ////Iterate trough each review and build a new row within table
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

    // Listener to wait for someone to click delete button on comments table
     commentsList.addEventListener('click',  function(e){
         if(e.target.classList.contains('deleteBtn')){
             let newID = e.target.parentNode.parentNode.querySelector('.id').value;
              fetch('/comments/'+newID, {
                method: 'DELETE'
            }).then((res) => res.text()).then(() => window.history.go())
        }
     })
     

}