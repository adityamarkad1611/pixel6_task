
//coonecting to html element to verify data from input feild
const form = document.getElementById('loanForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const panInput = document.getElementById('pan');
const loanAmountInput = document.getElementById('loanAmount');
const amountInWordsSpan = document.getElementById('amountInWords');
const estimatedEmiSpan = document.getElementById('estimatedEmi');
const tenure = document.getElementById('tenure').value;

// Validation regex form of fullname and pan 
const fullNamePattern = /^[A-Za-z]{4,}(?:\s[A-Za-z]{4,})+$/;
const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// Event listeners on value in entered bascially defined function who check the values from input
fullNameInput.addEventListener('input', validateFullName);
emailInput.addEventListener('input', validateEmail);
panInput.addEventListener('input', validatePan);
loanAmountInput.addEventListener('input', handleLoanAmountInput);


form.addEventListener('submit', (event) => {
    if (!validateFullName() || !validateEmail() || !validatePan() || !validateLoanAmount()) {
        event.preventDefault();
        alert('Please correct the errors before submitting.');
    } else {
        // Pass form data to the next page

        const fullName = fullNameInput.value;
        const email = emailInput.value;
        const loanAmount = loanAmountInput.value;

        localStorage.setItem("myCat", fullName);
        
        // Redirect to OTP page with form values in query parameters
        window.location.href = 'address.html';
    }
});

//validating full name
function validateFullName() {
    const fullName = fullNameInput.value;
    const isValid = fullNamePattern.test(fullName);
    document.getElementById('fullNameError').textContent = isValid ? '' : 'Invalid full name.';
    return isValid;
}

//validating email id 
function validateEmail() {
    const email = emailInput.value;
    //email is valid if it consist of @ in it
    const isValid = email.includes('@');
    document.getElementById('emailError').textContent = isValid ? '' : 'Invalid email address.';
    return isValid;
}

//validating pan number
function validatePan() {
    const pan = panInput.value;
    const isValid = panPattern.test(pan);
    document.getElementById('panError').textContent = isValid ? '' : 'Invalid PAN format.';
    return isValid;
}



function handleLoanAmountInput() {
    const loanAmount = loanAmountInput.value;
    if (loanAmount.match(/^\d+$/)) {
        const amountInWords = convertNumberToWords(Number(loanAmount));
        amountInWordsSpan.textContent = amountInWords ? `${amountInWords} Rs.` : '';

        const emi = calculateEMI(loanAmount, 8.5, tenure);
        estimatedEmiSpan.textContent = emi ? `₹${emi.toFixed(2)}` : '';
    } else {
        amountInWordsSpan.textContent = '';
        estimatedEmiSpan.textContent = '';
    }
}


//function to convert number or amount to words
function convertNumberToWords(amount) {
    const units = ["", "Thousand", "Lakh", "Crore"];
    const words = [];
    let unitIndex = 0;

    function getNumberToWords(num) {
        const belowTwenty = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        if (num < 20) return belowTwenty[num];
        if (num < 100) return tens[Math.floor(num / 10) - 2] + (num % 10 ? ' ' + belowTwenty[num % 10] : '');
        if (num < 1000) return belowTwenty[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + getNumberToWords(num % 100) : '');
        return '';
    }

    while (amount > 0) {
        let chunk = amount % 1000;
        if (chunk) {
            words.push(getNumberToWords(chunk) + ' ' + units[unitIndex]);
        }
        amount = Math.floor(amount / 1000);
        unitIndex++;
    }

    return words.reverse().join(' ').trim();
}

// function to calulate default 12 percent intersest rate 
function calculateEMI(principal, annualInterestRate, years) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;
    const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    return emi;
}
if (tenure === '') {
    document.getElementById('tenureError').innerText = 'Please select a tenure.';
    isValid = false;
} else {
    document.getElementById('tenureError').innerText = '';
}

document.getElementById('loanForm').action = 'address.html';


