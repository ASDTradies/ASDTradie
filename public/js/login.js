/***
 * Author: Danielle Alota
 * 
 */

 let loginCustomer = document.getElementById("loginCustomerBtn");
 let loginTradie = document.getElementById("loginTradieBtn");
 let loginTitle = document.getElementById("loginTitle");
 let loginBtns = document.getElementById("login-buttons-container");
 let loginForm = document.getElementById("loginForm");
 let backBtn = document.getElementById("backBtn");
 let loginBtn = document.getElementById("loginBtn");
 
 const form = document.getElementById("login-form");
 form.addEventListener('submit', loginUser);
 
 async function loginUser(event){
     event.preventDefault();
     const email = document.getElementById("email").value;
     const password = document.getElementById("password").value;
 
     const result = await fetch('/login', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             email,
             password
         })
     })
     .then((res) => res.json())
     if(result.status === 'ok'){
        loginTitle.innerHTML = 'All good!';
         console.log('Token received', result.data)
         console.log('User is logged in!');
     } else {
        loginTitle.innerHTML = 'Invalid email or password!';
        console.log(result.error); 
     }
 }
 
 // DOM manipulations
 loginCustomer.onclick = async function(){
     // console.log("customer logging in");
     loginTitle.innerHTML = "Login as customer";
     loginForm.classList.remove("visually-hidden");
     loginBtns.classList.add("visually-hidden");
     backBtn.classList.remove("visually-hidden");
 }
 
 loginTradie.onclick = function(){
     // console.log("tradie logging in");
     loginTitle.innerHTML = "Login as tradie";
     loginForm.classList.remove("visually-hidden");
     loginBtns.classList.add("visually-hidden");
     backBtn.classList.remove("visually-hidden");
 }
 
 backBtn.onclick = function(){
     backBtn.classList.add("visually-hidden");
     loginForm.classList.add("visually-hidden");
     loginBtns.classList.remove("visually-hidden");
     loginTitle.innerHTML = "Login";
 } 