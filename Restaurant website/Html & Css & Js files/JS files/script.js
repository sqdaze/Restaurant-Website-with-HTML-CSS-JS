/*============== Header ==============*/
/*--- Navbar ---*/
const barsButton = document.querySelector("Header .navbar nav i.fa-bars");
const RemoveButton = document.querySelector("Header .navbar nav ul i.fa-x");
const backdrop = document.querySelector("Header .navbar nav .backdrop");
const navbarUlList = document.querySelector("Header .navbar nav ul");
const navbarUllistLis = document.querySelectorAll("Header .navbar nav ul li");


//Show and Hide Ul List Function
const showAndHideUlList = ()=>{
    barsButton.addEventListener("click", ()=>{
        backdrop.style.display = "block";
        navbarUlList.style.right = "0";

        document.querySelector("body").style.overflow = "hidden";

        navbarUllistLis.forEach(item=>{
            item.addEventListener("click", ()=>{
                backdrop.style.display = "none";
                navbarUlList.style.right = "-1000px";
                document.querySelector("body").style.overflow = "auto";
            })
        })
    })

    RemoveButton.addEventListener("click", ()=>{
        backdrop.style.display = "none";
        navbarUlList.style.right = "-1000px";
        document.querySelector("body").style.overflow = "auto";
    })

    backdrop.addEventListener("click", ()=>{
        backdrop.style.display = "none";
        navbarUlList.style.right = "-1000px";
        document.querySelector("body").style.overflow = "auto";
    })
}
if(barsButton != null){showAndHideUlList()};





/*============== Main ==============*/
/*--- Contact Section ---*/
const fullNameInput = document.querySelector("section.contact .container .contactFormPart form #fullNameInput");
const emailInput = document.querySelector("section.contact .container .contactFormPart form #emailInput");
const messageInput = document.querySelector("section.contact .container .contactFormPart form #messageInput");
const contactSendBtn = document.querySelector("section.contact .container .contactFormPart form button");

//Contact Form Validation
function contactFormValidation(){
    //Full Name Input Validation
    const NameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let isFullNameInputValid = false;
    fullNameInput.addEventListener("input", (e)=>{
        if(e.target.value.length < 3 || !NameRegex.test(e.target.value)){
            e.target.classList.add("error");
            isFullNameInputValid = false;
        }
        else{
            e.target.classList.remove("error");
            isFullNameInputValid = true;
        }
    })

    //Email Input Validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let isEmailInputValid = false;
    emailInput.addEventListener("input", (e)=>{
        if(!emailRegex.test(e.target.value)){
            e.target.classList.add("error");
            isEmailInputValid = false;
        }
        else{
            e.target.classList.remove("error");
            isEmailInputValid = true;
        }
    })

    //Message Input Validation
    let isMessageInputValid = false;
    messageInput.addEventListener("input", (e)=>{
        if(e.target.value.trim() == ""){
            e.target.classList.add("error");
            isMessageInputValid = false;
        }
        else{
            e.target.classList.remove("error");
            isMessageInputValid = true;
        }
    })

    //Enable and Disable Contact Form Send Button
    const contactFormInputs = [];
    contactFormInputs.push(fullNameInput);
    contactFormInputs.push(emailInput);
    contactFormInputs.push(messageInput);

    for(let i = 0; i < contactFormInputs.length; i++){
        contactFormInputs[i].addEventListener("input", ()=>{
            if(
                isFullNameInputValid == true
                &&isEmailInputValid == true
                &&isMessageInputValid == true
            )
            {
                contactSendBtn.style.opacity = "1";
                contactSendBtn.style.pointerEvents = "all";
            }
            else{
                contactSendBtn.style.opacity = ".5";
                contactSendBtn.style.pointerEvents = "none";
            }
        })
    }
}
if(contactSendBtn != null){contactFormValidation()};

/*----- Footer -----*/
//Copyright Year
const copyrightYear = document.querySelector("footer .copyrightYear");
if(copyrightYear != null){
    copyrightYear.innerHTML = new Date().getFullYear();
}





/*========== Order Page ==========*/
/*----- Chose Dishes && Chosed Dishes -----*/
const choseDishesContainer = document.querySelector("body.orderBody .choseDishesAndChosedDishesContainer");
const foodsAndDrinksListsContainerUls = document.querySelectorAll("body.orderBody .choseDishesAndChosedDishesContainer .choseDishes .foodsAndDrinksListsContainer ul");
const foodsAndDrinksListsContainer = document.querySelectorAll("body.orderBody .choseDishesAndChosedDishesContainer .choseDishes .foodsAndDrinksListsContainer ul li");
const spanText = document.querySelectorAll("body.orderBody .choseDishesAndChosedDishesContainer .choseDishes .foodsAndDrinksListsContainer ul li span");
const addBtn = document.querySelectorAll("body.orderBody .choseDishesAndChosedDishesContainer .choseDishes .foodsAndDrinksListsContainer ul li i");

const chosedDishesUl = document.querySelector("body.orderBody .chosedDishes div ul");

let chosedDishesLisSpanTextForPrintingArray1 = [];

//Add and Delete Dishes Function
const AddAndDeleteDishes = () => {
    //Clear All Function
    function clearAllFunction(){
        const clearAllBtnDiv = document.querySelector("body.orderBody .choseDishesAndChosedDishesContainer .chosedDishes div.chosedDishesContent ul .clearAllBtnDiv");
        const clearAllBtn = document.querySelector("body.orderBody .choseDishesAndChosedDishesContainer .chosedDishes div.chosedDishesContent ul .clearAllBtn");
        clearAllBtn.addEventListener("click", ()=>{
            clearAllBtnDiv.style.display = "none";
            chosedDishesUl.querySelectorAll("li").forEach(li=>{
                li.remove();
            })
            chosedDishesLisSpanTextForPrintingArray1 = [];
            localStorage.clear();
            const noteH1 = document.querySelector("body.orderBody .chosedDishes div ul h1");
            noteH1.style.display = "block";
            const chosedDishesNextButton = document.querySelector("body.orderBody .choseDishesAndChosedDishesContainer .chosedDishes div.chosedDishesContent button");
            chosedDishesNextButton.style.opacity = ".5";
            chosedDishesNextButton.style.pointerEvents = "none";
        })
    }

    //Add Stored Chosed Dishes to Chosed Dishes Ul List
    const stored = localStorage.getItem("storedChosedDishes");
    if(stored){
        chosedDishesUl.innerHTML = stored;
        const chosedDishesNextButton = document.querySelector("body.orderBody .choseDishesAndChosedDishesContainer .chosedDishes div.chosedDishesContent button");
        chosedDishesNextButton.style.opacity = "1";
        chosedDishesNextButton.style.pointerEvents = "all";
        const noteH1 = document.querySelector("body.orderBody .chosedDishes div ul h1");
        noteH1.style.display = "none";
        chosedDishesUl.querySelectorAll("li").forEach(li=>{
            chosedDishesLisSpanTextForPrintingArray1.push(li.querySelector("span").innerHTML)
        })
        deleteChosedItem();
        clearAllFunction();
    }

    addBtn.forEach(btn=>{
        btn.addEventListener("click",(e)=>{
            if(chosedDishesLisSpanTextForPrintingArray1 != []){
                chosedDishesNextButton.style.opacity = "1";
                chosedDishesNextButton.style.pointerEvents = "all";
                const noteH1 = document.querySelector("body.orderBody .chosedDishes div ul h1");
                noteH1.style.display = "none";

                //Clear All Button
                const clearAllBtnDiv = document.querySelector("body.orderBody .choseDishesAndChosedDishesContainer .chosedDishes div.chosedDishesContent ul .clearAllBtnDiv");
                clearAllBtnDiv.style.display = "block";
            }

            foodsAndDrinksListsContainer.forEach(li=>{
                if(li.lastChild == e.target){
                    let chosedDishesNamesAndPrice = li.querySelector("span").innerHTML;

                    if(!chosedDishesLisSpanTextForPrintingArray1.includes(chosedDishesNamesAndPrice)){
                        chosedDishesLisSpanTextForPrintingArray1.push(chosedDishesNamesAndPrice);
                        chosedDishesUl.innerHTML += `<li><span class="dishesNames">${chosedDishesNamesAndPrice}</span> <span class="dishesNumbersSpan">x<input type="number" name="DishesNumber" class="dishesNumbers" min=${1} max=${30} value="1"></span><i class="fa-solid fa-x"></i></li>`;
                        localStorage.setItem("storedChosedDishes", chosedDishesUl.innerHTML)
                        StoreDishesNumberValue();
                        clearAllFunction();
                    };
                }
            })

            deleteChosedItem();
        })
    })
    
    //Delete Chosed Items Function
    function deleteChosedItem(){
        const chosedDisheDeleteButton = document.querySelectorAll("body.orderBody .choseDishesAndChosedDishesContainer .chosedDishes div.chosedDishesContent ul li i");
        chosedDisheDeleteButton.forEach(deleteBtn => {
            deleteBtn.addEventListener("click", (e)=>{
                chosedDishesUl.querySelectorAll("li").forEach(li=>{
                    if(li.lastChild == e.target){
                        const chosedDishName = li.firstChild.innerHTML;

                        if(chosedDishesLisSpanTextForPrintingArray1.includes(chosedDishName)){
                            chosedDishesLisSpanTextForPrintingArray1 =
                            chosedDishesLisSpanTextForPrintingArray1.filter(item => item != chosedDishName);
                            li.remove();
                        }
                    }
                })
                if(chosedDishesLisSpanTextForPrintingArray1.length == 0){
                    chosedDishesNextButton.style.opacity = ".5";
                    chosedDishesNextButton.style.pointerEvents = "none";
                    const clearAllBtnDiv = document.querySelector("body.orderBody .choseDishesAndChosedDishesContainer .chosedDishes div.chosedDishesContent ul .clearAllBtnDiv");
                    clearAllBtnDiv.style.display = "none";
                    const noteH1 = document.querySelector("body.orderBody .chosedDishes div ul h1");
                    noteH1.style.display = "block";
                    localStorage.clear();
                }
                else{
                    localStorage.setItem("storedChosedDishes", chosedDishesUl.innerHTML)
                }
            })
        })
    }

    //Store Dishes Number Value Function
    function StoreDishesNumberValue(){
        chosedDishesUl.querySelectorAll("li").forEach(li=>{
            li.querySelector("input").addEventListener("change", (e)=>{
                if(e.target.value >= 1 || e.target.value <= 30){
                    e.target.setAttribute("value", e.target.value);
                    localStorage.setItem("storedChosedDishes", chosedDishesUl.innerHTML);
                }

                if(e.target.value < 1 || e.target.value > 30){
                    e.target.setAttribute("value", 1);
                    e.target.value = 1;
                    localStorage.setItem("storedChosedDishes", chosedDishesUl.innerHTML);
                }
            })
        })
    }
    StoreDishesNumberValue();
}
if(choseDishesContainer && chosedDishesUl != null){AddAndDeleteDishes()}

/*----- Informations Form -----*/
const chosedDishesNextButton = document.querySelector("body.orderBody .choseDishesAndChosedDishesContainer .chosedDishes div.chosedDishesContent button");
const informationsForm = document.querySelector("body.orderBody .informationsForm");
const informationsFormBackButton = document.querySelector("body.orderBody .informationsForm .informationsFormContainer .backBtn")

//Hide Chose Dishes and Show Informations Form when Chosed Dishes Next Button is Clicked
function hideChoseDishesAndShowinformationsForm(){
    chosedDishesNextButton.addEventListener("click", ()=>{
        document.querySelector("body.orderBody .choseDishesAndChosedDishes").style.display = "none";
        informationsForm.style.display = "block";
    })
}
if(chosedDishesNextButton != null){hideChoseDishesAndShowinformationsForm()};

//Informations Form Back Button
if(informationsFormBackButton != null){
    informationsFormBackButton.addEventListener("click", ()=>{
        informationsForm.style.display = "none";
        document.querySelector("body.orderBody .choseDishesAndChosedDishes").style.display = "flex";
    })
}

//Informations Form Inputs Validation
const informationsFormFirstNameInput = document.querySelector(".informationsForm .informationsFormContainer form #firstName");
const informationsFormLastNameInput = document.querySelector(".informationsForm .informationsFormContainer form #lastName");
const informationsFormCountryInput = document.querySelector(".informationsForm .informationsFormContainer form #country");
const informationsFormCityInput = document.querySelector(".informationsForm .informationsFormContainer form #city");
const informationsFormZipInput = document.querySelector(".informationsForm .informationsFormContainer form #zip");
const informationsFormAddress1Input = document.querySelector(".informationsForm .informationsFormContainer form #address1");
const informationsFormAddress2Input = document.querySelector(".informationsForm .informationsFormContainer form #address2");
const informationsFormEmailInput = document.querySelector(".informationsForm .informationsFormContainer form #email");
const informationsFormPhoneNumberInput = document.querySelector(".informationsForm .informationsFormContainer form #phoneNumber");
const informationsFormNextButton = document.querySelector(".informationsForm .informationsFormContainer form .buttons button");

let informationFormInputsArray = [];
    informationFormInputsArray.push(informationsFormFirstNameInput);
    informationFormInputsArray.push(informationsFormLastNameInput);
    informationFormInputsArray.push(informationsFormCountryInput);
    informationFormInputsArray.push(informationsFormCityInput);
    informationFormInputsArray.push(informationsFormZipInput);
    informationFormInputsArray.push(informationsFormAddress1Input);
    informationFormInputsArray.push(informationsFormEmailInput);
    informationFormInputsArray.push(informationsFormPhoneNumberInput);
    informationFormInputsArray.push(informationsFormNextButton);

function informationsFormValidation(){
    //First Name Input Validation
    const NameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let isFirstNameValid;
    informationsFormFirstNameInput.addEventListener("input",(e)=>{
        if(!NameRegex.test(e.target.value) || e.target.value.trim().length < 3){
            e.target.classList.add("error");
            isFirstNameValid = false;
        }
        else{
            e.target.classList.remove("error");
            isFirstNameValid = true;
        }
    })

    //Last Name Input Validation
    let isLastNameValid;
    informationsFormLastNameInput.addEventListener("input",(e)=>{
        if(!NameRegex.test(e.target.value) || e.target.value.trim().length < 3){
            e.target.classList.add("error");
            isLastNameValid = false;
        }
        else{
            e.target.classList.remove("error");
            isLastNameValid = true;
        }
    })

    //Country Input Validation
    let isCountryValid;
    informationsFormCountryInput.addEventListener("input",(e)=>{
        if(e.target.value.trim().length < 3){
            e.target.classList.add("error");
            isCountryValid = false;
        }
        else{
            e.target.classList.remove("error");
            isCountryValid = true;
        }
    })

    //City Input Validation
    let isCityValid;
    informationsFormCityInput.addEventListener("input",(e)=>{
        if(e.target.value.trim().length < 3){
            e.target.classList.add("error");
            isCityValid = false;
        }
        else{
            e.target.classList.remove("error");
            isCityValid = true;
        }
    })

    //Address1 Input Validation
    let isAddress1Valid;
    informationsFormAddress1Input.addEventListener("input",(e)=>{
        if(e.target.value.trim().length < 3){
            e.target.classList.add("error");
            isAddress1Valid = false;
        }
        else{
            e.target.classList.remove("error");
            isAddress1Valid = true;
        }
    })

    //ZIP Input Validation
    let isZipValid;
    const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    informationsFormZipInput.addEventListener("input", (e)=>{
        if(!zipRegex.test(e.target.value)){
            e.target.classList.add("error");
            isZipValid = false;
        }
        else{
            e.target.classList.remove("error");
            isZipValid = true;
        }
    })

    //E-mail Input Validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let isEmailValid;
    informationsFormEmailInput.addEventListener("input", (e)=>{
        if(!emailRegex.test(e.target.value)){
            e.target.classList.add("error");
            isEmailValid = false;
        }
        else{
            e.target.classList.remove("error");
            isEmailValid = true;
        }
    })

    //Phone Number Input Validation
    const phoneNumberRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?\d{7,10}$/;
    let isPhoneNumberValid;
    informationsFormPhoneNumberInput.addEventListener("input", (e)=>{
        if(!phoneNumberRegex.test(e.target.value)){
            e.target.classList.add("error");
            isPhoneNumberValid = false;
        }
        else{
            e.target.classList.remove("error");
            isPhoneNumberValid = true;
        }
    })

    //Enable and Disable Informations Form Next Button
    for(let i = 0; i < informationFormInputsArray.length; i++){
        informationFormInputsArray[i].addEventListener("input", ()=>{
            if(
                isFirstNameValid === true
                && isLastNameValid === true
                && isCityValid === true
                && isCountryValid === true
                && isAddress1Valid === true
                && isZipValid === true
                && isEmailValid === true
                && isPhoneNumberValid === true
            )
            {
                informationsFormNextButton.style.opacity = "1";
                informationsFormNextButton.style.pointerEvents = "all";
            }
            else{
                informationsFormNextButton.style.opacity = ".5";
                informationsFormNextButton.style.pointerEvents = "none";
            }
        })
    }
}
if(informationsForm != null){informationsFormValidation()};

//Hide Informations Form and Show Payment Form when Informations Form next Button is Clicked
const paymentForm = document.querySelector("body.orderBody .paymentForm");
function hideInformationsFormAndShowPaymentForm(){
    informationsFormNextButton.addEventListener("click", ()=>{
        informationsForm.style.display = "none";
        paymentForm.style.display = "block";
    })
}
if(informationsFormNextButton != null){hideInformationsFormAndShowPaymentForm()};





/*========== Payment Form ==========*/
//Inputs Validation
const paymentFormFirstNameInput = document.querySelector(".paymentForm #firstNameInput");
const paymentFormLastNameInput = document.querySelector(".paymentForm #lastNameInput");
const paymentFormCardNumberInput = document.querySelector(".paymentForm #cardNumber");
const paymentFormExpiryDateInput = document.querySelector(".paymentForm #expiryDate");
const paymentFormCVVInput = document.querySelector(".paymentForm #cvv");
const paymentFormOrderButton = document.querySelector(".paymentForm #orderButton");

let paymentFormInputsArray = [];
    paymentFormInputsArray.push(paymentFormFirstNameInput);
    paymentFormInputsArray.push(paymentFormLastNameInput);
    paymentFormInputsArray.push(paymentFormCardNumberInput);
    paymentFormInputsArray.push(paymentFormExpiryDateInput);
    paymentFormInputsArray.push(paymentFormCVVInput);


//Payment Form Back Button
const paymentFormBackButton = document.querySelector(".paymentForm span.backBtn");
if(paymentFormBackButton != null){
    paymentFormBackButton.addEventListener("click",()=>{
        paymentForm.style.display = "none";
        informationsForm.style.display = "block";
    })
}

//Payment Form Validation
function paymentFormValidation(){
    //First name input validation
    const NameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let isFirstNameValid = true;
    paymentFormFirstNameInput.addEventListener("input",(e)=>{
        if(!NameRegex.test(e.target.value) || e.target.value.trim().length < 3){
            e.target.classList.add("error");
            isFirstNameValid = false;
        }
        else{
            e.target.classList.remove("error");
            isFirstNameValid = true;
        }
    })

    //Last Name Input Validation
    let isLastNameValid = true;
    paymentFormLastNameInput.addEventListener("input",(e)=>{
        if(!NameRegex.test(e.target.value) || e.target.value.trim().length < 3){
            e.target.classList.add("error");
            isLastNameValid = false;
        }
        else{
            e.target.classList.remove("error");
            isLastNameValid = true;
        }
    })

    //Card Number Input Validation
    let isCardNumberValid;
    const cardNumberRegex = /^\d{16}(?:[-\s]\d{15})?$/;
    paymentFormCardNumberInput.addEventListener("input",(e)=>{
        if(!cardNumberRegex.test(e.target.value)){
            e.target.classList.add("error");
            isCardNumberValid = false;
        }
        else{
            e.target.classList.remove("error");
            isCardNumberValid = true;
        }
    })

    //Expiry Date Input Validation
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    let isExpiryDateValid;
    paymentFormExpiryDateInput.addEventListener("input",(e)=>{
        if(!expiryDateRegex.test(e.target.value)){
            e.target.classList.add("error");
            isExpiryDateValid = false;
        }
        else{
            const [month, year] = e.target.value.split("/").map(Number);
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear() % 100;
            
            if(year > currentYear || (year === currentYear && month >= currentMonth)){
                e.target.classList.remove("error");
                isExpiryDateValid = true;
            }
            else{
                e.target.classList.add("error");
                isExpiryDateValid = false;
            }
        }
    })

    //CVV Input Validation
    let isCVVValid;
    const CVVRegex = /^\d{3}(?:[-\s]\d{2})?$|^\d{4}(?:[-\s]\d{2})?$/;
    paymentFormCVVInput.addEventListener("input",(e)=>{
        if(!CVVRegex.test(e.target.value || e.target.value.length > 4 == false)){
            e.target.classList.add("error");
            isCVVValid = false;
        }
        else{
            e.target.classList.remove("error");
            isCVVValid = true;
        }
    })

    //Enable and Disable Order Button
    for(let i = 0; i < paymentFormInputsArray.length; i++){
        paymentFormInputsArray[i].addEventListener("input", ()=>{
            if(
                isFirstNameValid === true
                && isLastNameValid === true
                && isCardNumberValid === true
                && isExpiryDateValid === true
                && isCVVValid === true
            )
            {
                paymentFormOrderButton.style.opacity = "1";
                paymentFormOrderButton.style.pointerEvents = "all";
            }
            else{
                paymentFormOrderButton.style.opacity = ".5";
                paymentFormOrderButton.style.pointerEvents = "none";
            }
        })
    }
}
if(paymentForm != null){paymentFormValidation()};

//Add Chosed Dishes Total and Calculate Total Price
const paymentFormTotalChosedDishesUl = document.querySelector(".paymentForm .totalPart .chosedDiches ul");
function addChosedDishesToTotalAndCalculateTotalPrice(){
    //Add Chosed Dishes to Total
    const stored = localStorage.getItem("storedChosedDishes")
    if(stored){
        paymentFormTotalChosedDishesUl.innerHTML = stored;
        paymentFormTotalChosedDishesUl.querySelectorAll(".clearAllBtn").forEach(clearAllBtn=>{
            clearAllBtn.remove();
        })
        paymentFormTotalChosedDishesUl.querySelectorAll("li input").forEach(input=>{
            input.setAttribute("readonly", "");
            input.setAttribute("type", "text")
        })
        paymentFormTotalChosedDishesUl.querySelectorAll("li i").forEach(i=>{
            i.remove();
        })
    }

    //Calculate Total Price
    let pricesArray = [];
        const dishesCountTotalElement = document.querySelector(".paymentForm .totalPart .label h1 span");
        chosedDishesUl.querySelectorAll("li").forEach(li=>{
            li.querySelectorAll(".chosedDishes div ul li span div.price").forEach(priceItem=>{
                let price1 = +priceItem.innerHTML;
                let price2 = price1 * li.querySelector("input").value;
                pricesArray.push(price2);
            })
        })
        let pricesTotal = pricesArray.reduce((x,y)=>{
            return x+y;
        },0)
        dishesCountTotalElement.innerHTML = `$${pricesTotal}`;
}
if(informationsFormNextButton != null){
    informationsFormNextButton.addEventListener("click",()=>{
        addChosedDishesToTotalAndCalculateTotalPrice();
        paymentFormFirstNameInput.value = informationsFormFirstNameInput.value
        paymentFormLastNameInput.value = informationsFormLastNameInput.value
    })
}

//Show Order was Sent Pop Up when Payment Form Order Button is Clicked
const OrderWasSentPopUp = document.querySelector("body.orderBody .OrderWasSentPopUp");

function showOrderWasSentPopUp(){
    paymentFormOrderButton.addEventListener("click", ()=>{
        paymentForm.style.display = "none";
        OrderWasSentPopUp.style.display = "flex";
    })
}
if(paymentFormOrderButton != null){showOrderWasSentPopUp()};