<?php

// Set the appropriate HTTP header and provide the message in the response body in JSON format
function send_error($code, $message) {
    global $responses;
    header($_SERVER["SERVER_PROTOCOL"] . " " . $code . " - " . $responses[$code] . ": " . $message);
    $results["error"] = $code . " - " . $responses[$code] . ": " . $message;
    print(json_encode($results));
}


header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');


$responses = [
    400 => "Bad Request",
    404 => "Not Found",
    405 => "Method Not Allowed",
    500 => "Internal server error"
];


// Check if the server request method is not POST 
if ($_SERVER["REQUEST_METHOD"] !== "POST"){
    return(send_error(405, "The request method must be POST"));
} 
   

// Check if required fields have been set
if(!isset($_POST["name"]) || !isset($_POST["age"]) || !isset($_POST["email"]) ){
    return(send_error(500, "Please ensure that all fields have been included"));
} 


// Validate name information
// Check if name is empty (including blank spaces), or if it is undefined
if(empty(trim($_POST["name"])) || $_POST["name"] === "undefined" ){
    return(send_error(400, "You must enter a name"));
} else {
    $user_name = $_POST["name"];
    // Check if name is between 2 and 100 characters long
    if (strlen($user_name) < 2 || strlen($user_name) > 100){
    return(send_error(400, "Your name must contain between 2 & 100 characters"));
    }
    //Check if name contains characters a-z(uper and lower case), -(hyphen),
    // or '(apostrophe)
    elseif (!preg_match("/^[a-zA-Z '-]+$/",$user_name)) {
        return(send_error(400, "Your name can only contain the following characters, 'a' to 'z' or 'A' to 'Z', apostrophe or hyphen"));
    }
}


// Validate age information
// Check if age is empty (including blank spaces), or if it is undefined
if(empty(trim($_POST["age"])) || $_POST["age"] === "undefined" ){
    return(send_error(400, "You must enter an age"));
} else {
    $user_age = $_POST["age"];
    // check if age contains only integers
    if (!preg_match("/^[0-9]*$/",$user_age)) {
        return(send_error(400, "Your age can only contain integer values"));
    }
    // Check if age is an integer value between 13-130
    elseif ($user_age < 13 || $user_age > 130){
        return(send_error(400, "Your age must be between 13 and 130 years to register"));
    }
}


// validate email information 
// Check if email is empty (including blank spaces), or if it is undefined
if(empty(trim($_POST["email"])) || $_POST["email"] === "undefined" ){
    return(send_error(400, "You must enter an email address"));
} else {
    $user_email = $_POST["email"];
    //Check if email contains valid characters 
    if (!preg_match("/^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)+[\w]+$/",$user_email)) {
        return(send_error(400, "You must enter a valid email address, example@email.com"));
    }
}


// if phone information is provided check if it is valid
if(isset($_POST["phone"])){
    // Check if email is empty (including blank spaces), or if it is undefined
    if(empty(trim($_POST["phone"])) || $_POST["phone"] === "undefined" ){
        return(send_error(400, "You must enter an phone number"));
    } else {
        $user_phone = $_POST["phone"];
        // check that the phone number only contains numbers
        if (!preg_match("/^[0-9]*$/",$user_phone)) {
            return(send_error(400, "The phone number must only contain numbers"));
        }
        // check that phone number is exactly 10 characters long
        elseif (strlen($user_phone) !== 10){
            return(send_error(400, "The phone number must be 10 characters long"));
        }
        //Check that the phone number starts with 04
        elseif (!preg_match("/^04/",$user_phone)) {
            return(send_error(400, "The phone number must start with 04"));
        }
    }
}

// If there are no error messages than create a random User ID
// and return it to the user
$results["user_id"] = rand(10000, 99999);
$user_id = $results["user_id"];
print(json_encode($results));

// Include Class file for Database
include 'class/Database.php';

?>