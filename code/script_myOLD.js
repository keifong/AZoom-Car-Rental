document.addEventListener("DOMContentLoaded", () => {
    // • Customer reserves car – via the AZoom Car Rental website using a credit card
// • Customer rents car at the AZoom Car Rental office
// • Customer returns car at a designed car park
// • Employee of AZoom Car Rental inspects the returned car – to ensure no damages
// • Customer pays final bill – cost of rental and including any damages found

// localStorage.setItem('keyName', 'valueString');


// nav start
function toRegister(event) {
    event.preventDefault();
    window.location.href ="register.html"
}

function toLogin(event) {
    event.preventDefault();
    window.location.href ="login.html"
}

function toHome(event) {
    event.preventDefault();
    window.location.href = "home.html";
    console.log("Home!")
}

function toRent(event, number) {
    event.preventDefault();
    localStorage.setItem("chosen_carBrand", number);
    window.location.href = "rent.html";
}

// nav end

// choosing of car brand
window.addEventListener("load", () => {
    const chosenCar = localStorage.getItem("chosen_carBrand");

    const cars = {
        "0": document.getElementById("KIADiv"),
        "1": document.getElementById("BYDDiv"),
        "2": document.getElementById("TeslaDiv")
    };

    if (chosenCar in cars) {
        cars[chosenCar].style.display = "block";
    }

    localStorage.removeItem("chosenCar");
});

// end of choosing of car brand

function reg(event, u_type) {
    event.preventDefault();
    console.log("Customer button pressed");

    const custAndEmp = document.getElementById("userTypeDiv");
    const regForm = document.getElementById("formReg");
    const carImage = document.getElementById("carMountain");
    const userType = document.getElementById("userType");

    if (u_type==0) {
        userType.value = "Customer"
    }
    else if (u_type==1) {
        userType.value = "Employee"
    }
    
    custAndEmp.style.display = "none"; 
    regForm.style.display = "block";
    carImage.style.display = "flex";  
}





const registrationForm = document.getElementById("formReg");

registrationForm.addEventListener("submit", (event)=> {
    event.preventDefault();

    const user_type = document.getElementById("userType")
    const userEmail = document.getElementById("inEmail");
    const userPass = document.getElementById("inPassword");

    localStorage.setItem("user_type", user_type.value);
    localStorage.setItem('user_email', userEmail.value);
    localStorage.setItem('user_pass', userPass.value);

    window.location.href = "login.html"
})

const loginForm = document.getElementById("login_formDiv");

loginForm.addEventListener("submit", (event)=> {
    event.preventDefault();

    const in_email = document.getElementById("inEmail");
    const in_pass = document.getElementById("inPassword");
    const errMsg = document.getElementById("spanErrorMsg");

    const ls_email = localStorage.getItem('user_email');
    const ls_pass = localStorage.getItem('user_pass');

    if (in_email.value == ls_email && in_pass.value == ls_pass) {
        errMsg.innerHTML = "Succesful Login"
    }
    else {
        errMsg.innerHTML = "Failed Login"
    }
    
})

});