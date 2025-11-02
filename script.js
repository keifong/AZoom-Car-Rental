document.addEventListener("DOMContentLoaded", () => {

    // just to reset data
    window.resetAll = function(event) {
        event.preventDefault();
        localStorage.clear();
        alert("localStorage has been cleared");
    }

    // ----------------- Navigation -----------------
    window.toRegister = function(event) {
        event.preventDefault();
        window.location.href = "register.html";
    }

    window.toLogin = function(event) {
        event.preventDefault();
        window.location.href = "index.html";
    }

    window.toHome = function(event) {
        event.preventDefault();
        window.location.href = "home.html";
    }

    // ----------------- Car brand selection -----------------
    const chosenCar = localStorage.getItem("chosen_carBrand");
    const carBrand = {
        "0": document.getElementById("KIADiv"),
        "1": document.getElementById("BYDDiv"),
        "2": document.getElementById("TeslaDiv")
    };

    if (chosenCar && carBrand[chosenCar]) {
        carBrand[chosenCar].style.display = "block";
    }
    localStorage.removeItem("chosen_carBrand");

    window.toRent = function(event, number) {
        event.preventDefault();
        localStorage.setItem("chosen_carBrand", number);
        window.location.href = "rent.html";
    }

    // ----------------- Registration -----------------
    // first ill make an empty array
    // this array will be an array of user objects
    // for login logic, ill cycle through all user objects and match the input data to the array of user objects

    const registrationForm = document.getElementById("formReg");
    if (registrationForm) {
        const userTypeDiv = document.getElementById("userTypeDiv");
        const carImage = document.getElementById("carMountain");
        const userTypeInput = document.getElementById("userType");

        // UI setting from user type selection page to form
        window.loadReg = function(event, u_type) {
            event.preventDefault();

            if (u_type === 0) userTypeInput.value = "Customer";
            else if (u_type === 1) userTypeInput.value = "Employee";

            if (userTypeDiv) userTypeDiv.style.display = "none";
            if (registrationForm) registrationForm.style.display = "block";
            if (carImage) carImage.style.display = "flex";
        }

        // registration form
        registrationForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // form inputs
            const userEmail = document.getElementById("inEmail").value;
            const userPass = document.getElementById("inPassword").value;
            const userType = userTypeInput.value;

            //populating the userArray
            const storedUserArray = JSON.parse(localStorage.getItem("userArray")) || [];
            storedUserArray.push({
                uType: userType, 
                uEmail: userEmail, 
                uPass: userPass,
            })

            // storing the new storedUserArray
            localStorage.setItem("userArray", JSON.stringify(storedUserArray));

            alert("Registration successful!");
            window.location.href = "index.html";
        });
    }

            

    // ----------------- Login -----------------
    const loginForm = document.getElementById("myForm");
    if (loginForm) {
        // form inputs
        const inEmailInput = document.getElementById("inEmail");
        const inPasswordInput = document.getElementById("inPassword");
        const errMsg = document.getElementById("spanErrorMsg");

        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // const storedUserType = localStorage.getItem("user_type");
            // const storedEmail = localStorage.getItem("user_email");
            // const storedPass = localStorage.getItem("user_pass");
            const storedUserArray = JSON.parse(localStorage.getItem("userArray")) || [];
            let loginExist = false;

            storedUserArray.forEach((user) => {
                if (user.uType === "Customer" && user.uEmail === inEmailInput.value && user.uPass === inPasswordInput.value) {
                    loginExist = true;
                    localStorage.setItem("loggedInCust", user.uEmail);
                    errMsg.innerHTML = "Successful Login";
                    window.location.href = "home.html";
                }
                else if (user.uType === "Employee" && user.uEmail === inEmailInput.value && user.uPass === inPasswordInput.value) {
                    loginExist = true;
                    errMsg.innerHTML = "Successful Login";
                    window.location.href = "employee_home.html";
                }
            });

            if (loginExist == false) {
                errMsg.innerHTML = "Wrong Info or User does not exist";
            }

        });
    }

    // -----------------------------------
    const carModels = [
        "KIA EV9",
        "KIA Carens Clavis EV",
        "KIA EV6",
        "BYD Atto Ex 3",
        "BYD E Max 7",
        "BYD Seal",
        "Tesla Model 9",
        "Tesla Cybertruck",
        "Tesla Model X"
    ]

    const carPrices = [
        "50",
        "40",
        "30",
        "50",
        "40",
        "30",
        "50",
        "40",
        "30"
    ]

    // car reservation
    window.reserve = function(event,number) {
        event.preventDefault();
        if (!localStorage.getItem("car_model")) {
            localStorage.setItem("car_model", carModels[number]);
            localStorage.setItem("sCarPrice", carPrices[number]);
        }
        else {
            alert("You are currently reserving another car");
            return;
        }
        localStorage.setItem("reservation_S", "Reserved");
        localStorage.setItem("displayColLoc", "1");
        // need to update employee page as well

        localStorage.setItem("mColVis", 1);

        window.location.href = "home.html";
    }

    // for the notification board
    const storedEmail = localStorage.getItem("loggedInCust");
    const selectedCar = localStorage.getItem("car_model")
    const resStatus = localStorage.getItem("reservation_S");
    const user_E = document.getElementById("email_display");

    if (user_E) { // only run if the element exists on this page
        if (storedEmail) {
            user_E.textContent = "Welcome, " + storedEmail + "!";
        } else {
            user_E.textContent = "Not logged in";
        }
    }

    const notiB_currCar = document.getElementById("currentCar");
    const notiB_resStatus = document.getElementById("res_status_display");

    if (notiB_currCar && notiB_resStatus) {
        notiB_currCar.textContent = selectedCar;
        notiB_resStatus.textContent = resStatus;
    }

    // Make collection section visible or hide based on saved values
    const makeColVisible = localStorage.getItem("mColVis");
    const selectedLoc = localStorage.getItem("colLoc");
    const myCol = document.getElementById("col");
    const colLoc_display = document.getElementById("colLoc_display");

    const resStat_display = document.getElementById("res_status_display");

    if (myCol && colLoc_display) {
        if (selectedLoc) {
            // If already selected a branch, show the saved location
            colLoc_display.style.display = "block";
            colLoc_display.textContent = "Collecting at " + selectedLoc;
            myCol.style.display = "none"; // Hide buttons
        } 
        else if (makeColVisible == 1) {
            // If they still need to choose a location, show the buttons
            myCol.style.display = "block";
            colLoc_display.style.display = "none";
        } 
        else {
            // Default state
            myCol.style.display = "none";
            colLoc_display.style.display = "none";
        }

        if (resStat_display.textContent == "Renting" ||resStat_display.textContent == "Returned" ) {
            colLoc_display.style.display = "none";
        }
    }

    // collection location
    window.chooseLoc = function (event, number) {
        event.preventDefault();
        const colLoc_display = document.getElementById("colLoc_display");
        const col = document.getElementById('col');

        if (number == 1) {
            localStorage.setItem("colLoc", "Branch 1");
            colLoc_display.textContent = "Collecting at Branch 1";
        } 
        else if (number == 2) {
            localStorage.setItem("colLoc", "Branch 2");
            colLoc_display.textContent = "Collecting at Branch 2";
        }

        // Update UI
        colLoc_display.style.display = "block";
        col.style.display = "none";
    };



    const isChargeSent = localStorage.getItem("chargeSent");
    const numDamages = localStorage.getItem("dFound");
    const tPrice = localStorage.getItem("sCarPrice")
    const chargeSheet = document.getElementById("n_chargeSheet");
    const n_dFound = document.getElementById("n_damagesFound");
    const n_totalp = document.getElementById("n_tPriceToPay");
    if (isChargeSent == 1) {
        chargeSheet.style.display = "block";
        n_dFound.textContent = "Damages Found: " + numDamages;
        n_totalp.textContent = "Total Price: " +tPrice;
    }

    
    window.pay = function(event) {
        event.preventDefault();

        // Hide the charge sheet
        const chargeSheet = document.getElementById("n_chargeSheet");
        chargeSheet.style.display = "none";

        // Reset reservation data in localStorage
        localStorage.removeItem("car_model");      // remove current car
        localStorage.removeItem("sCarPrice");      // remove price
        localStorage.setItem("reservation_S", "Not Renting");  // reset status
        localStorage.setItem("chargeSent", "0");   // reset charge flag
        localStorage.removeItem("dFound");         // reset damages
        localStorage.removeItem("mColVis");        // reset location UI visibility
        localStorage.removeItem("colLoc");         // ✅ remove selected branch

        // Reset the notification board on customer page
        const notiB_currCar = document.getElementById("currentCar");
        if (notiB_currCar) notiB_currCar.textContent = "No car rented";

        const notiB_resStatus = document.getElementById("res_status_display");
        if (notiB_resStatus) notiB_resStatus.textContent = "Not Renting";

        // ✅ Hide the collection location display
        const colLoc_display = document.getElementById("colLoc_display");
        if (colLoc_display) colLoc_display.style.display = "none";

        alert("Successful Payment! Thank you for renting with AZoom");
    }


   


    // ------------------------------

    window.disappear = function(event) {
        event.preventDefault();

        const csDiv = document.getElementById("cs_BG") ;
        csDiv.style.display = "none";
    }

    // making testRow
    const testRowDiv = document.createElement("div");
    testRowDiv.className = "testRow";
    const hEmail = document.createElement("h4");
    hEmail.id ="hEmail";
    hEmail.textContent = "Customer Email: " + localStorage.getItem("loggedInCust");
    const hStatus = document.createElement("h4");
    hStatus.id = "hStatus";
    hStatus.textContent = "Booking Status: " + localStorage.getItem("reservation_S");

    const hasCollected = document.createElement("h4");
    hasCollected.id = "hasCollected";
    hasCollected.textContent = "Has Collected?: Collecting at " + localStorage.getItem("colLoc");

    //cust collected car button
    const custCollectedButton = document.createElement("button");
    custCollectedButton.textContent = "Collected";
    custCollectedButton.setAttribute("onclick", "setCollected(event)");

    // charge Button
    const chargeButton = document.createElement("button");
    chargeButton.textContent = "Charge";
    chargeButton.setAttribute("onclick", "charge(event)");

    testRowDiv.appendChild(hEmail);
    testRowDiv.appendChild(hStatus);
    testRowDiv.appendChild(hasCollected);
    testRowDiv.appendChild(custCollectedButton);
    testRowDiv.appendChild(chargeButton);

    // adding test row in custDiv
    const custDiv = document.getElementById("custDiv");
    if (custDiv && localStorage.getItem("car_model")) {
        custDiv.appendChild(testRowDiv);
    }


    //-----------------------
    // car collected 
    // window.setCollected = function(event) {
    //     event.preventDefault();

    //     const hasCollected = document.getElementById("hasCollected");
    //     hasCollected.textContent = "Has Collected?: Yes";

    //     // const hStatus = document.getElementById("hStatus");
    //     // hStatus.textContent = ""
    //     localStorage.setItem("reservation_S", "Renting");
    // }
    const collectedStatus = localStorage.getItem("hCollected");
    if (hasCollected) {
        const hasCollected = document.getElementById("hasCollected");
        if (collectedStatus == "Yes") {
            hasCollected.textContent = "Has Collected?: Yes";
        }
    }
    

    window.setCollected = function(event) {
        event.preventDefault();

        // Save to localStorage
        localStorage.setItem("reservation_S", "Renting");
        localStorage.setItem("hCollected", "Yes");

        // Update Employee Page immediately
        const hasCollected = document.getElementById("hasCollected");
        const hStatus = document.getElementById("hStatus");

        if (hasCollected) {
            hasCollected.textContent = "Has Collected?: Yes";
        }
        if (hStatus) {
            hStatus.textContent = "Booking Status: Renting"; // ✅ update employee screen instantly
        }

        // Update Home Page (if open in another tab/page)
        const homeStatus = document.getElementById("res_status_display");
        if (homeStatus) {
            homeStatus.textContent = "Renting";
        }

        // Hide collection location on home page
        const colLoc_display = document.getElementById("colLoc_display");
        if (colLoc_display) colLoc_display.style.display = "none";
    };



    // making charge sheet
    window.charge = function(event) {
        event.preventDefault();

        const chargeDiv = document.getElementById("cs_BG");
        chargeDiv.style.display = "block"

        const csEmail = document.getElementById("cs_email");
        const csCarRented = document.getElementById("cs_carRented");
        const tPriceToPay = document.getElementById("tPriceToPay");

        csEmail.textContent = "Customer: " + localStorage.getItem("loggedInCust");
        csCarRented.textContent = "Car Model: " + localStorage.getItem("car_model");

        const price = localStorage.getItem("sCarPrice") || "0";
        tPriceToPay.textContent = "Total Price: $" + price;
    }


    window.addDamages = function(event) {
        event.preventDefault();

        let price = Number(localStorage.getItem("sCarPrice")) || 0;
        price += 10;
        localStorage.setItem("sCarPrice", price);

        const tPriceToPay = document.getElementById("tPriceToPay");
        tPriceToPay.textContent = "Total Price: $" + price;

        const dFound = document.getElementById("damagesFound");
        let count = Number(dFound.textContent) || 0;
        count += 1;
        if (count == null) {
            count = 0;
        }
        dFound.textContent = count;

        // Correct localStorage usage
        localStorage.setItem("dFound", count);
    }

    // ---------------------------

    window.sendCharge = function(event) {
        event.preventDefault();

        localStorage.setItem("reservation_S", "Returned");
        const bStatus = document.getElementById("hStatus");
        bStatus.textContent = "Booking Status: " + localStorage.getItem("reservation_S");
        
        const chargeSheet = document.getElementById("cs_BG");
        chargeSheet.style.display = "none";

        localStorage.setItem("chargeSent", "1");
    }

    


});


