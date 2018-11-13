// jQuery onLoad function
$(function(){
    validateForm();
});


// Add error messages to the #errors element
function addError(message) {
    // Display the errors as list items.
    $("#user_message ul").append($('<li>').append(message));
    $("#user_message").addClass('error');
    $("#user_message").removeClass('invisible');
}


// Clear all messages from #user_message 
function clearErrors(){
    $("#user_message").empty();
    $("#user_message").addClass('invisible');
}


// Validate the form, returning true if valid, false otherwise
function validateForm() {
    $('#registration').submit(function(e) {
        e.preventDefault();
        clearErrors();

        var success = true;
        // Create an unordered list within the #user_message <div> so that
        // the errors messages can be appended as part od addError()
        $("#user_message").append($('<ul>'));

        // validate name input
        var name = $('#name').val();
        if (name.length === 0) {
            addError("You must enter a name.");
            success = false;
        } else if (!/^[a-zA-Z'-]+$/.test(name)) {
            addError('Your name can only contain the following chracters, "a" to "z" or "A" to "Z", apostrophe or hyphen');
            success = false;
        } else if  (name.length < 2 || name.length > 10) {
            addError("Your name must contain between 2 & 100 characters.");
            success = false;
        }


        // validate age input
        var age = $('#age').val();
        if (age.length === 0) {
            addError("You must enter an age.");
            success = false;
        } else if (!/^[0-9]*$/.test(age)) {
            addError('Your age can only contain integer values');
            success = false;
        } else if  (age < 13 || age > 130) {
            addError("Your age must be between 13 and 130 years to register.");
            success = false;
        }


        // validate email input
        var email = $('#email').val();
        if (email.length === 0) {
            addError("You must enter an email address.");
            success = false;
        } else if (!/^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)+[\w]+$/.test(email)) {
            addError('You must enter a valid email address, example@email.com.');
            success = false;
        }


        // validate phone input
        var phone = $('#phone').val();
        if (!/^[0-9]*$/.test(phone)) {
            addError('The phone number must only contain numbers.');
            success = false;
        } else if (phone.length !== 0 && phone.length !== 10) {
            addError("The phone number must be 10 characters long");
            success = false;
        } else if (phone.length !== 0 && !/^04/.test(phone)) {
            addError('The phone number must start with 04.');
            success = false;
        }


        // If all validations were successful, success = true, than send data via
        // an ajajx POST request to the server.
        if (success) {
            $.ajax({
                type: "POST",
                data: {name, age, email, phone},
                url: "http://turing.une.edu.au/~jbisho23/assignment2/register.php",
                dataType: "json",
                // If the ajax request is successful hide the registration and welcomes sections,
                // and show the quiz and score sections.
                success: function(data){
                    $("#user_id").text(data.user_id);
                    $("#registration").addClass('hidden');
                    $("#welcome").addClass('hidden');
                    $("#quiz").removeClass('hidden');
                    $("#score").removeClass('hidden');
                },
                // If the ajax request retuens an error log the error to the console
                error: function(data){
                    console.log(data.error);
                }
            });
        }
    });
}
