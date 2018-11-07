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

// Use a random image
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
        console.log("Timer --> " + counter);
      }
    }, 1000);

 // End the game screen
    setTimeout(function() {
      $(".endGame").addClass("active");
      $(".game").removeClass("active");
    }, 10000);
  });

   // Play again
  $("#playAgain").on("click", function() {
    pushToTable();
    $(".endGame").removeClass("active");
  });

  function pushToTable() {
    var userScore = $("#score").text();
    var scoresTable = [];
    scoresTable.push(userScore);
    console.log(scoresTable);
  }
});
