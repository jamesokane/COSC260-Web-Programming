// jQuery onLoad function
$(function () {
    quizForm();
});


// Checks if the selected answer is correct, if it is increase correct score by 1,
// otherwise increase incorrect score by 1.
function quizAnswer(count, questions, answer) {
    $.ajax({
        type: "GET",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php/" + "search?q=" + questions.questions[count] + "&a=" + answer,
        dataType: "json",
        success: function(response) {
            // If the response if true increase correct score by 1
            if (response.correct === true) {
                correct_count = $("#correct span").text();
                $("#correct span").text(parseInt(correct_count) + 1);
            } else {
                // If the response if false increase incorrect score by 1
                incorrect_count = $("#incorrect span").text();
                $("#incorrect span").text(parseInt(incorrect_count) + 1);
            }
        },
        // If the ajax call is unsuccessful log the error information to the console.
        error: function(data){
            console.log(data.error);
        }
    });
}

// Retrive and show the information for each question
function quizData(count, len, questions) {
    $.ajax({
        type: "GET",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php/" + "search?q=" + questions.questions[count],
        dataType: "json",
        success: function (data) {
            $('input[name=answer]').prop('checked',false);
            $("#quiz_question").text(data.text);
            $("label[for='answer_a']").text(data.choices.A);
            $("label[for='answer_b']").text(data.choices.B);
            $("label[for='answer_c']").text(data.choices.C);
            $("label[for='answer_d']").text(data.choices.D);
        },
        // If the ajax call is unsuccessful log the error information to the console.
        error: function(data){
            console.log(data.error);
        }
    });
}


// Retrives information for group of questions and loops through each question
function quizForm() {
    // Set the Score section to show 0 for each item
    $("#attempted").append($('<span>').text(0));
    $("#correct").append($('<span>').text(0));
    $("#incorrect").append($('<span>').text(0));

    $.ajax({
        type: "GET",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        dataType: "json",
        success: function (questions) {
            // Set variables for count: track number of questions completed; and
            // len: number of questions to complete
            var count = 0;
            var len = questions.questions.length;
            // Show the first question information
            quizData(count, len, questions);
            $("#quiz").submit(function (e) {
                e.preventDefault();
                // Check the question count is still less than the total number of questions
                if (count < len) {
                    // Set the selected checkbox to the variable answer
                    var answer = $('input[name=answer]:checked', '#quiz').val();
                    // If no checkbox has been selected request the user to select something
                    if (answer === undefined) {
                        alert("Please choice an answer from the list");
                    } else {
                        quizAnswer(count, questions, answer);
                        // Increment count value and update the score section
                        count++;
                        $("#attempted span").text(count);
                        // If there are more questions remaining than show the next question
                        if (count < len) {
                            quizData(count, len, questions);
                        } else {
                            // Otherwise if there are no more questions show a message that the
                            // quiz is complete.
                            var correct_count = $("#correct span").text();
                            $("#user_message ul").append($('<li>').text("Quiz Complete"));
                            $("#user_message ul").append($('<li>').text("Your final score was " + correct_count + " out of " + len));
                            $("#user_message").removeClass('invisible');
                            $("#user_message").removeClass('error');
                        }
                    }
                }
            });
        },
        // If the ajax call is unsuccessful log the error information to the console.
        error: function(data){
            console.log(data.error);
        }
    });
}
