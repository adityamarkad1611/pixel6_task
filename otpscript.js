document.addEventListener('DOMContentLoaded', () => {

    const otpForm = document.getElementById('otpForm');
    const verificationMessage = document.getElementById('verificationMessage');
    const messageDiv = document.getElementById('message');
    const otpInput = document.getElementById('otp');

    let generatedOtp;

    //initial attempts are 0
    let attempts = 0;

    //creating function Generate a 4-digit random number
    function generateOtp() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    // Handle the form submission 
    otpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const enteredOtp = otpInput.value;

        if (enteredOtp === generatedOtp.toString()) {
            verificationMessage.style.color="green"
            verificationMessage.textContent = 'Validation Successful!';
            // verification successful redirect to Pixel6 home page
            setTimeout(() => {
                window.location.href = 'https://pixel6.co/'; 
            }, 2000);
        } else {
            attempts++;
            if (attempts >= 3) {
                verificationMessage.textContent = 'Validation Failed!';
                //limit to attemts failed so redirect to 404 page
                setTimeout(() => {
                    window.location.href = ''; 
                }, 2000);
            } else {
                otpInput.value = '';
                verificationMessage.textContent = 'Incorrect OTP. Please try again.';
            }
        }
    });

    // Extracting all query parameters from link
    const queryParams = new URLSearchParams(window.location.search);
    const fullName = queryParams.get('fullName');
    const email = queryParams.get('email');
    const loanAmount = queryParams.get('loanAmount');

    // Generate and log OTP using function which we have created before 
    generatedOtp = generateOtp();
    console.log('Generated OTP:', generatedOtp);

    // Display the message of email sent 
    messageDiv.innerHTML = `Dear ${fullName.split(' ')[0]},<br>
    Thank you for your inquiry. A 4 digit verification number has been sent to your email:<p style="color:blue"> ${email},<p> please enter it in the following box and submit for confirmation:`;
});

