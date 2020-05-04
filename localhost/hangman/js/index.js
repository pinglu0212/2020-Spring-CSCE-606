window.onload = function () {
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  var words; // Masked words
  var guess; // Guess
  var guesses = []; // Stored guesses
  var lives; // Lives
  var counter; // Count correct guesses
  var words = [];
  var hints = [];
  var images = [];
  var holds = [];
  var corrects = [];
  var showImg = false;

  // Get elements
  var lp = document.getElementById("health");
  var showLives = document.getElementById("mylives");
  var showClue = document.getElementById("clue");
  var questionBlock = document.getElementById("question");

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById("buttons");
    letters = document.createElement("ul");

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };

  // Create guesses ul
  result = function () {
    var sentence = rawSentence.toLowerCase();
    var indices = {};
    for (var word of rawWords) {
      var idx = sentence.indexOf(word);
      while (idx !== -1) {
        indices[idx] = word;
        idx = sentence.indexOf(word, idx + 1);
      }
    }
    var orderedIndices = {};
    Object.keys(indices)
      .sort()
      .forEach(function (key) {
        orderedIndices[key] = indices[key];
      });
    words = Object.values(orderedIndices);
    copiedSentence = rawSentence.slice();
    for (var word of words) {
      hints.push(rawHints[word]['text hints']);
      images.push(rawHints[word]['img hints']);
      copiedSentence = copiedSentence.replace(new RegExp(word, "i"), "|TRIM|");
    }
    var sentencePieces = copiedSentence.split("|TRIM|");
    if (sentencePieces[0] !== "") {
      var element = document.createElement("span");
      element.setAttribute("class", "unmask");
      element.innerHTML = sentencePieces[0];
      questionBlock.appendChild(element);
    }
    for (var i = 0; i < words.length; i++) {
      var hold = document.createElement("div");
      hold.setAttribute("class", "hold");
      hold.setAttribute("id", i);
      var piece = document.createElement("span");
      piece.setAttribute("class", "unmask");
      piece.innerHTML = sentencePieces[i + 1];
      questionBlock.appendChild(hold);
      questionBlock.appendChild(piece);
    }
    holds = document.getElementsByClassName("hold");
    wordHolders = document.getElementsByClassName("hold");
     corrects = [];
    for (var i = 0; i < wordHolders.length; i++) {
      correct = document.createElement("ul");
      correct.setAttribute("id", "my-word");
      for (var j = 0; j < words[i].length; j++) {
        guess = document.createElement("li");
        guess.setAttribute("class", "guess");
        guess.innerHTML = "_";
        guesses.push(guess);
        wordHolders[i].appendChild(correct);
        correct.appendChild(guess);
      }
      corrects.push(correct);
    }
  };

  // Show lives
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
      for (var l of document.getElementById("alphabet").childNodes) {
        l.onclick = null;
      }
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter === guesses.length) {
        showLives.innerHTML = "You Win!";
        for (var l of document.getElementById("alphabet").childNodes) {
          l.onclick = null;
        }
      }
    }
  };

  // Change lives
  var changeLP = function () {
    health = document.getElementById('health-indicator');
    health.src = "./images/health-neuron-" + lives + ".png";
    var img = document.getElementById('hint-image');
    if (showImg) {
      var radius = lives > 0 ? (2 * (lives-1)) : 0;
      img.style.cssText = "filter: blur("+ radius + "px);";
    } else {
      img.src = "./images/health-number-" + lives + ".png";
    }
  };

  // OnClick Function
  check = function () {
    list.onclick = function () {
      var guess = this.innerHTML;
      this.setAttribute("class", "active");
      this.onclick = null;
      var idx = 0;
      for (var i = 0; i < words.length; i++) {
        for (var j = 0; j < words[i].length; j++) {
          if (words[i][j] === guess) {
            guesses[idx].innerHTML = guess;
            counter += 1;
          }
          idx++;
        }
      }
      var k = 0;
      for (var i = 0; i < words.length; i++) {
        k += words[i].indexOf(guess);
      }
      if (k === -words.length) {
        lives -= 1;
        comments();
        changeLP();
      } else {
        comments();
      }
    };
  };

  // Play
  play = function () {
    $.get("../configs", function (data) {
      // This may not work on dev server
      var files = [];
      var tags = data.match(/<a href="([^.][^"]+)"[^>]*>/gm);
      for (var tag of tags) {
        tag = tag.replace('<a href="', "");
        tag = tag.replace('">', "");
        files.push(tag);
      }
      var fileIdx = Math.floor(Math.random() * files.length);
      var file = "/configs/" + files[fileIdx];
      $.getJSON(file, function (json) {
        rawSentence = json["sentence"];
        rawWords = json["words"];
        rawHints = json["hints"];

        buttons();

        guesses = [];
        lives = 5;
        counter = 0;
        result();
        comments();

        var health = document.createElement('img');
        health.src = "./images/health-neuron-5.png";
        health.setAttribute('id', 'health-indicator');
        lp.appendChild(health);
        var imgBox = document.createElement('div');
        var img = document.createElement('img');
        img.src = "./images/health-number-5.png";
        imgBox.setAttribute('id', 'image');
        img.setAttribute('id', 'hint-image');
        lp.appendChild(imgBox);
        imgBox.appendChild(img);

        // Hint
        for (var hold of holds) {
          hold.onclick = function () {
            showClue.innerHTML = "Clue: " + hints[this.id];
            var img = document.getElementById('hint-image');
            if (images[this.id] !== 'None') {
              showImg = true;
              img.src = images[this.id];
              var radius = lives > 0 ? (2 * (lives-1)) : 0;
              img.style.cssText = "filter: blur("+ radius + "px);";
            } else {
              showImg = false;
              img.src = "./images/health-number-" + lives + ".png";
              img.style.cssText = "filter: blur(0px);";
            }
            var lastActive = document.getElementsByClassName("activeHold");
            if (lastActive) {
              for (var actived of lastActive) {
                actived.setAttribute("class", "hold");
              }
            }
            this.setAttribute("class", "activeHold");
          };
        }
      });
    });
  };

  play();

  // Reset
  document.getElementById("reset").onclick = function () {
    for (var i = 0; i < corrects.length; i++) {
      corrects[i].parentNode.removeChild(corrects[i]);
    }
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    var lastActive = document.getElementsByClassName("activeHold");
    if (lastActive) {
      for (var actived of lastActive) {
        actived.setAttribute("class", "hold");
      }
    }
    words = [];
    hints = [];
    images = [];
    showImg = false;
    questionBlock.innerHTML = "";
    lp.innerHTML = "";
    play();
  };
};
