let navAccSettings = document.getElementById("nav-acc-settings");
let navChangePassword = document.getElementById("nav-change-pw");
let navDeactivateAcc = document.getElementById("nav-deactivate-acc");
let tabTitle = document.getElementById("tabTitle");

//I know this looks terirble. I swear I'll make this pretty in R1/R2

navAccSettings.onclick = function(){
    tabTitle.innerHTML = "Account Settings"
    let formToShow = document.getElementById("account-settings");
    formToShow.classList.remove("visually-hidden");
    document.getElementById("change-password").classList.add("visually-hidden");
    document.getElementById("deactivate-account").classList.add("visually-hidden");
}

navChangePassword.onclick = function(){
    tabTitle.innerHTML = "Change Password"
    let formToShow = document.getElementById("change-password");
    formToShow.classList.remove("visually-hidden");
    document.getElementById("account-settings").classList.add("visually-hidden");
    document.getElementById("deactivate-account").classList.add("visually-hidden");
}

navDeactivateAcc.onclick = function(){
    tabTitle.innerHTML = "Deactivate Account"
    let formToShow = document.getElementById("deactivate-account");
    formToShow.classList.remove("visually-hidden");
    document.getElementById("change-password").classList.add("visually-hidden");
    document.getElementById("account-settings").classList.add("visually-hidden");
}
