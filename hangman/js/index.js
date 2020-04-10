window.onload = function() {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    var categories; // Array of topics
    var chosenCategory; // Selected category
    var getHint; // Word getHint
    var word; // Selected word
    var guess; // Guess
    var guesses = []; // Stored guesses
    var lives; // Lives
    var counter; // Count correct guesses
    var space; // Number of spaces in word '-'

    // Get elements
    var showLives = document.getElementById("mylives");
    var showCategory = document.getElementById("scategory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");



    // create alphabet ul
    var buttons = function() {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            // innerHTML 属性设置或返回表格行的开始和结束标签之间的 HTML
            list.innerHTML = alphabet[i];
            // 匿名函数，在后面 
            check();
            // appendChild(Node)这个方法一般是在指定元素节点的最后一个子节点之后添加节点
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }


    // Select Category
    var selectCat = function() {
        if (chosenCategory === categories[0]) {
            categoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
        } else if (chosenCategory === categories[1]) {
            categoryName.innerHTML = "The Chosen Category Is Films";
        } else if (chosenCategory === categories[2]) {
            categoryName.innerHTML = "The Chosen Category Is Cities";
        }
    }

    // Create guesses ul
    result = function() {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');
        // setAttribute() 方法添加指定的属性，并为其赋指定的值。
        // 如果这个指定的属性已存在，则仅设置/更改值。
        correct.setAttribute('id', 'my-word');

        for (var i = 0; i < word.length; i++) {
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            // ===：用来检测两个操作数是否严格相等, 不允许类型转换
            if (word[i] === "-") {
                // 有的词语中间有连字符
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }

            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // Show lives
    comments = function() {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            showLives.innerHTML = "Game Over";
        }
        for (var i = 0; i < guesses.length; i++) {
            if (counter + space === guesses.length) {
                showLives.innerHTML = "You Win!";
            }
        }
    }

    // Animate man
    var animate = function() {
        var drawMe = lives;
        // 调用相应的火柴人绘画方程
        drawArray[drawMe]();
    }


    // Hangman
    canvas = function() {

        myStickman = document.getElementById("stickman");
        // getContext() 方法返回一个用于在画布上绘图的环境
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    head = function() {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        // beginPath() 方法开始一条路径，或重置当前的路径。
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    frame1 = function() {
        draw(0, 150, 150, 150);
    };

    frame2 = function() {
        draw(10, 0, 10, 600);
    };

    frame3 = function() {
        draw(0, 5, 70, 5);
    };

    frame4 = function() {
        draw(60, 5, 60, 15);
    };

    torso = function() {
        draw(60, 36, 60, 70);
    };

    rightArm = function() {
        draw(60, 46, 100, 50);
    };

    leftArm = function() {
        draw(60, 46, 20, 50);
    };

    rightLeg = function() {
        draw(60, 70, 100, 100);
    };

    leftLeg = function() {
        draw(60, 70, 20, 100);
    };

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


    // OnClick Function
    check = function() {
        list.onclick = function() {
            var guess = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    guesses[i].innerHTML = guess;
                    counter += 1;
                }
            }
            // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
            // 如果要检索的字符串值没有出现，则该方法返回 -1
            var j = (word.indexOf(guess));
            if (j === -1) {
                lives -= 1;
                // 匿名函数，show lives
                comments();
                animate();
            } else {
                comments();
            }
        }
    }


    // Play
    play = function() {
        categories = [
            ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
            ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
            ["manchester", "milan", "madrid", "amsterdam", "prague"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        // "/ /"这个是固定写法，"\s"是转移符号用zd以匹配任何空白字符，包括空格、制表符、换页符等等，
        // "g"表示全局匹配将替换所有匹配的子串，如果不加"g"当匹配到第一个后就结束了。
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        guesses = [];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCat();
        canvas();
    }

    play();

    // Hint
    hint.onclick = function() {

        hints = [
            ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
            ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
            ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
        ];

        var categoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue: - " + hints[categoryIndex][hintIndex];
    };

    // Reset

    document.getElementById('reset').onclick = function() {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
    }
}