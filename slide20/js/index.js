window.onload = function() {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    var words; // Masked words
    var guess; // Guess
    var guesses = []; // Stored guesses
    var lives; // Lives
    var counter; // Count correct guesses

    // Get elements
    var lp = document.getElementById('health');
    var showLives = document.getElementById("mylives");
    var showClue = document.getElementById("clue");
    var holds = document.getElementsByClassName('hold');



    // create alphabet ul
    var buttons = function() {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }


    // Create guesses ul
    result = function() {
        wordHolders = document.getElementsByClassName('hold');
        corrects = []
        for (var i = 0; i < wordHolders.length; i++) {
            correct = document.createElement('ul');
            correct.setAttribute('id', 'my-word');
            for (var j = 0; j < words[i].length; j++) {
                guess = document.createElement('li');
                guess.setAttribute('class', 'guess');
                guess.innerHTML = "_";
                guesses.push(guess);
                wordHolders[i].appendChild(correct);
                correct.appendChild(guess);
            }
            corrects.push(correct)
        }
        
    }


    // Show lives
    comments = function() {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            showLives.innerHTML = "Game Over";
            for (var l of document.getElementById('alphabet').childNodes) {
                l.onclick = null;
            }
        }
        for (var i = 0; i < guesses.length; i++) {
            if (counter === guesses.length) {
                showLives.innerHTML = "You Win!";
                for (var l of document.getElementById('alphabet').childNodes) {
                    l.onclick = null;
                }
            }
        }
    }


    // Change lives
    var changeLP = function() {
        lp.src = './images/' + lives + '.png';
        console.log()
    }


    // OnClick Function
    check = function() {
        list.onclick = function() {
            var guess = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            var idx = 0;
            for (var i = 0; i < words.length; i++){
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
            if (k === -3) {
                lives -= 1;
                comments();
                changeLP();
            } else {
                comments();
            }
        }
    }


    // Play
    play = function() {

        words = ['nerves', 'autonomic', 'somatic'];
        hints = ['have special receptors for each sense', 'voluntary actions', 'involuntary actions']

        console.log(words);
        buttons();

        guesses = [];
        lives = 5;
        counter = 0;
        result();
        comments();
        
        lp.src = './images/5.png';
    }


    play();


    // Hint
    for (var hold of holds) {
        hold.onclick = function() {
            showClue.innerHTML = "Clue: " + hints[this.id];
            var lastActive = document.getElementsByClassName('activeHold');
            if (lastActive) {
                for (var actived of lastActive) {
                    actived.setAttribute("class", "hold");
                }
            }
            this.setAttribute("class", "activeHold");
        }
    }


    // Reset
    document.getElementById('reset').onclick = function() {
        for (var i = 0; i < corrects.length; i++) {
            corrects[i].parentNode.removeChild(corrects[i]);
        }
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        var lastActive = document.getElementsByClassName('activeHold');
            if (lastActive) {
                for (var actived of lastActive) {
                    actived.setAttribute("class", "hold");
                }
            }
        play();
    }
}