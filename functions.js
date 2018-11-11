$(window).on("load", function() {
  $(".preloader").fadeOut("slow");
});

$(function() {
  // I create an array to save the results of the game
  var scoreList = [];

  // I check all the src routes I used const because Im going to use this inside two functions
  const dice = $(".die")
    .map(function() {
      return $(this).attr("src");
    })
    .get();

  // Start the game screen
  $("#startButton").on("click", function() {
    // I call  the screen clicking the button to start the game
    $.fn.pagepiling.moveTo(2);

    // I change every src that contains the image of the drone with the box each five seconds
    var changeImage3s = setInterval(function() {
      // I used diferent random counters to avoid they change all images to the same image at the time
      var num1 = Math.floor(Math.random() * dice.length);
      var num2 = Math.floor(Math.random() * dice.length);
      var num3 = Math.floor(Math.random() * dice.length);
      $("#change-box1").attr("src", dice[num1]);
      $("#change-box2").attr("src", dice[num2]);
      $("#change-box3").attr("src", dice[num3]);
    }, 3000);

    var checkImage3s = setInterval(function() {
      var pic1 = $("#change-box1").attr("src");
      if (pic1 === "assets/img/bad-box.png") {
        $("#score").html(function(i, val) {
          return val * 1 - 1;
        });
        $("#less5-1").html("-1");
        $("#loose").trigger("play");
        setTimeout(function() {
          $("#less5-1").html(" ");
        }, 1000);
      }

      var pic2 = $("#change-box2").attr("src");
      if (pic2 === "assets/img/bad-box.png") {
        $("#score").html(function(i, val) {
          return val * 1 - 1;
        });
        $("#less5-2").html("-1");
        setTimeout(function() {
          $("#less5-2").html(" ");
          $("#loose").trigger("play");
        }, 1000);
      }
      var pic3 = $("#change-box3").attr("src");
      if (pic3 === "assets/img/bad-box.png") {
        $("#score").html(function(i, val) {
          return val * 1 - 1;
        });
        $("#less5-3").html("-1");
        setTimeout(function() {
          $("#less5-3").html(" ");
          $("#loose").trigger("play");
        }, 1000);
      }
    }, 2995);

    // I change the src routes randomly on click
    $(".die").click(function() {
      var num = Math.floor(Math.random() * dice.length);
      $(this).attr("src", dice[num]);
    });

    // I make the time counter changing the number every second for 60 seconds
    var counter = 60;
    var interval = setInterval(function() {
      counter--;
      if (counter < 0) {
        clearInterval(interval);
        $("#time").html("60"); // when time goes to 0 I put the 60 number in the counter again
        $("#time").removeClass("danger");
        return;
      } else {
        $("#time").text(counter);
      }

      if (counter < 10) {
        $("#time").addClass("danger");
        $("#timesound").trigger("play");
      }
    }, 1000);

    // After 60 seconds of the duration of the game
    setTimeout(function() {
      // I stop the set intervals for the change images
      clearInterval(changeImage3s);
      clearInterval(checkImage3s);

      // Game is finish so I quit the screen removing the .game class
      $.fn.pagepiling.moveTo(3);

      // I Show the last screen with the Results

      // I create a function to save every #score number of every game played in the browser session into the scoreList array I created before
      function scoreTable() {
        scoreList.splice(0, 0, score);
        console.log(scoreList);
      }

      // I take the number in the #score and put it in the #finalScore on the final screen
      var score = $("#score").html();
      $("#finalScore").append(score);

      // I Show the last 5 numbers in the array in the score table
      scoreTable();
      $("#score1").append(scoreList[0]);
      $("#score2").append(scoreList[1]);
      $("#score3").append(scoreList[2]);
      $("#score4").append(scoreList[3]);
      $("#score5").append(scoreList[4]);

      // I check on the array for the max number
      var maxScore = Math.max.apply(Math, scoreList);
      // and show it in the #maxScore
      $("#maxScore").append(maxScore);

      $(
        "#finalScore, #maxScore, #score1, #score2, #score3, #score4, #score5"
      ).each(function() {
        $("#scorecount").trigger("play");
        $(this)
          .prop("Counter", 0)
          .animate(
            {
              Counter: $(this).text()
            },
            {
              duration: 4000,
              easing: "swing",
              step: function(now) {
                $(this).text(Math.ceil(now));
              }
            }
          );
      });

      // I show different messages depending of the results of score of the game
      if (score <= 0) {
        $("#resultMessage").html("You Lost, try again");
      } else if (score >= maxScore) {
        $("#resultMessage").html("Congratulations you made a new record");
      } else if (score < maxScore) {
        $("#resultMessage").html("Good job, you are improving your skills");
      }
    }, 61000);
  });

  // When click the box images add or substract 5 points in the #score depending of the words that cointains the src of the image
  var i = 0;
  // On click I ckeck what src image I have
  $("#change-box1").click(function() {
   
    if (this.src.indexOf("bad") != -1) {
      $("#add5-1").html("+1");
      $(".numberScore").addClass("succed");
      $("#change-box1").addClass("hitted");
      $("#win").trigger("play");
      setTimeout(function() {
        $("#add5-1").html(" ");
        $("#change-box1").removeClass("hitted");
        $(".numberScore").removeClass("succed");
      }, 300);

      $("#score").html(function(i, val) {
        return val * 1 + 1;
      });
    } else if (this.src.indexOf("good") != -1) {
      $("#less5-1").html("-5");
      $(".numberScore").addClass("danger");
      $("#change-box1").addClass("hitted");
      $("#loose").trigger("play");
      setTimeout(function() {
        $("#less5-1").html(" ");
        $(".numberScore").removeClass("danger");
        $("#change-box1").removeClass("hitted");
      }, 300);

      $("#score").html(function(i, val) {
        return val * 1 - 5;
      });
    }
  });

  $("#change-box2").click(function() {
   
    if (this.src.indexOf("bad") != -1) {
      $("#add5-2").html("+1");
      $(".numberScore").addClass("succed");
      $("#change-box2").addClass("hitted");
      $("#win").trigger("play");
      setTimeout(function() {
        $("#add5-2").html(" ");
        $(".numberScore").removeClass("succed");
        $("#change-box2").removeClass("hitted");
      }, 300);

      $("#score").html(function(i, val) {
        return val * 1 + 1;
      }); 
    } else if (this.src.indexOf("good") != -1) {
      $("#less5-2").html("-5");
      $(".numberScore").addClass("danger");
      $("#change-box2").addClass("hitted");
      $("#loose").trigger("play");
      setTimeout(function() {
        $("#less5-2").html(" ");
        $(".numberScore").removeClass("danger");
        $("#change-box2").removeClass("hitted");
      }, 300);

      $("#score").html(function(i, val) {
        return val * 1 - 5;
      });
    }
  });

  $("#change-box3").click(function() {
   
    if (this.src.indexOf("bad") != -1) {
      $("#add5-3").html("+1");
      $(".numberScore").addClass("succed");
      $("#change-box3").addClass("hitted");
      $("#win").trigger("play");
      setTimeout(function() {
        $("#add5-3").html(" ");
        $(".numberScore").removeClass("succed");
        $("#change-box3").removeClass("hitted");
      }, 300);

      $("#score").html(function(i, val) {
        return val * 1 + 1;
      }); // If the name contains "good" word I substract 5 points in the #score
    } else if (this.src.indexOf("good") != -1) {
      $("#less5-3").html("-5");
      $(".numberScore").addClass("danger");
      $("#change-box3").addClass("hitted");
      $("#loose").trigger("play");
      setTimeout(function() {
        $("#less5-3").html(" ");
        $(".numberScore").removeClass("danger");
        $("#change-box3").removeClass("hitted");
      }, 300);

      $("#score").html(function(i, val) {
        return val * 1 - 5;
      });
    }
  });

  $("#score").on("change", function() {
    $(".numberScore").addClass("scale");
    setTimeout(function() {
      $(".numberScore").removeClass("scale");
    }, 1000);
  });

  // Play again
  $("#playAgain").on("click", function() {
    $.fn.pagepiling.moveTo(1);
    onReset: self => {},
      // I clean all the numbers for the previous game and close the .engGame to return to the first screen
      $("#score").html("0");
    $("#score1").html(" ");
    $("#score2").html(" ");
    $("#score3").html(" ");
    $("#score4").html(" ");
    $("#score5").html(" ");
    $("#finalScore").html(" ");
    $("#maxScore").html(" ");
    $("#resultMessage").html(" ");
  });

  setTimeout(function() {
    $(".messageGame").addClass("activeMessageGame");
    setTimeout(function() {
      $(".messageGame").removeClass("activeMessageGame", 500);
    }, 10000);
  }, 5000);

  // I´m using a library to manage the screen transitions
  $("#pagepiling").pagepiling({
    direction: "horizontal"
  });
  $.fn.pagepiling.setAllowScrolling(false);
  $.fn.pagepiling.setKeyboardScrolling(false);

  // I´m using a library to make the human typing effect
  var typed = new Typed("#typed", {
    typeSpeed: 50,
    // Waits 1000ms after typing
    strings: [
      "Hi, ^1000 is John ^1000 today the drones went crazy and they are damaging the boxes,^1000 you need to stop them... ^1000 SHOOT NOW!!! "
    ]
  });

  $("#startButton").on("click", function() {
    $("#audioGame").trigger("play");
  });

  $("#playAgain").on("click", function() {
    $("#audioGame").trigger("pause");
    $("#audioGame").prop("currentTime", 0);
  });

  $("#audioGame").prop("volume", 0.1);
  $("#timesound").prop("volume", 0.1);
  $("#scorecount").prop("volume", 0.1);
});
