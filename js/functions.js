$(function() {
  // Add or quit 5 points in the score depending of the src of the image
  var i = 0;
  $(".die").click(function() {
    if (this.src.indexOf("bad") != -1) {
      $("#score").html(function(i, val) {
        return val * 1 + 5;
      });
    } else if (this.src.indexOf("good") != -1) {
      $("#score").html(function(i, val) {
        return val * 1 - 5;
      });
    }
  });

  // Change the dron image on click
  var dice = $(".die")
    .map(function() {
      return $(this).attr("src");
    })
    .get();

  // put a random image on click
  $(".die").click(function() {
    var num = Math.floor(Math.random() * dice.length);
    $(this).attr("src", dice[num]);
  });

  // Start the game screen for 60 seconds
  $("#startButton").on("click", function() {
    $(".game").addClass("active");
    var counter = 10;
    var interval = setInterval(function() {
      counter--;
      if (counter < 0) {
        clearInterval(interval);
        $("#time").html("10");
        return;
      } else {
        $("#time").text(counter);
      }
    }, 1000);

    // End the game time screen
    setTimeout(function() {

      var score = $("#score").html();
      $("#finalScore").append(score);

     
      function scoreTable() {
        scoreList.push(score);
        console.log(scoreList);
      }

      scoreTable();
      $(".endGame").addClass("active");
      $(".game").removeClass("active");
    }, 10000);
  });

  var scoreList = [];

  // Play again
  $("#playAgain").on("click", function() {
    $(".endGame").removeClass("active");
  });

 
});
