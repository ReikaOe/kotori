// 単語 
    var wordList = [
        //小鳥の種類だけでまずリリースする → のちにRAP仕様も追加でつくる
        //3つ目にそれぞれの鳥画像
        ["モズ", "mozu"], 
        ["シメ", "sime"],
        ["ウソ", "uso"],
        ["メジロ", "mejiro"], 
        ["メグロ", "meguro"],
        ["アオジ", "aoji"],
        ["アトリ", "atori"],
        ["イスカ", "isuka"],
        ["スズメ", "suzume"],
        ["ツバメ", "tubame"],
        ["ツグミ", "tugumi"],
        ["ヒバリ", "hibari"],
        ["セッカ", "sekka"],
        ["エナガ", "enaga"],
        ["マヒワ", "mahiwa"], 
        ["コガラ", "kogara"],
        ["ヒガラ", "higara"],
        ["コルリ", "koruri"],

        ["オオルリ", "ooruri"],
        ["アリスイ", "arisui"],
        ["アカヒゲ", "akahige"],
        ["カワセミ", "kawasemi"],
        ["ウグイス", "uguisu"],
        ["ムクドリ", "mukudori"],
        ["コマドリ", "komadori"],
        ["コチドリ", "kotidori"],
        ["アカゲラ", "akagera"],
        ["ホオアカ", "hooaka"],
        ["ホオジロ", "hoojiro"],
        ["ヤマガラ", "yamagara"],
        ["キビタキ", "kibitaki"],
        ["ノビタキ", "nobitaki"],
        ["タマシギ", "tamasigi"],
        ["ビンズイ", "binzui"],
        ["ヤブサメ", "yabusame"],

        ["シマエナガ", "simaenaga"],
        ["ベニマシコ", "benimasiko"],
        ["オオマシコ", "oomasiko"],
        ["イワツバメ", "iwatubame"], 
        ["キクイタダキ", "kikuitadaki"],
        ["ハクセキレイ", "hakusekirei"],
        ["ゴジュウカラ", "gojuukara"],
        ["シジュウカラ", "sijuukara"],
        ["ルリビタキ", "ruribitaki"],
        ["ジョウビタキ", "joubitaki"],
        ["コサメビタキ", "kosamebitaki"],

        ["セキセイインコ", "sekiseiinnko"],
        ["オカメインコ", "okameinnko"],
        ["クロガミインコ", "kurogamiinnko"],
        ["ヒメコンゴウインコ", "himekongouinnko"],
        ["コンゴウインコ", "kongouinnko"],
        ["キガシラムジボウシインコ", "kigasiramujibousiinnko"],
        ["シモフリインコ", "simofuriinnko"],
        ["ウロコメキシコインコ", "urokomekisikoinnko"],
        ["アカビタイボウシインコ", "akabitaibousiinnko"],
        ["ネズミガシラハネナガインコ", "nezumigasirahanenagainnko"],
        ["ワカケホンセイインコ", "wakakehonseiinnko"],
        ["メキシコアカボウシインコ", "mekisikoakabousiinnko"],
        ["ホオアオサメクサインコ", "hooaosamekusainnko"],
        ["ジャコウインコ", "jakouinnko"],
        ["アオボウシインコ", "aobousiinnko"],
        ["ルリゴシボタンインコ", "rurigosibotanninnko"],
        ["コザクラインコ", "kozakurainnko"],
        ["ボタンインコ", "botanninnko"],
        ["カルカヤインコ", "karukayainnko"]

    ];

// 時間制限
    var timeLimit = 30;
 
    var timer1;
    var wordStr;
    var wordChars;
    var charIndex;
    var messageArea;
    var gameArea;
    var wordArea;
    var typewordArea;
    var typeArea;
    var score;
    var timeLeft;
 
    window.onload = function (){
        messageArea  = document.getElementById("message");
        msg2         = document.getElementById("message2");
        subMsg       = document.getElementById("subMsg");
        gameArea     = document.getElementById("game");
        wordArea     = document.getElementById("word");
        typewordArea = document.getElementById("typeword");
        typeArea     = document.getElementById("type");
        startButton  = document.getElementById("start-button");
        retryButton  = document.getElementById("retry-button");
        retryButton.style.display = "none";
        gameArea.style.display = "none";
    }

        function onStartButtonClick(){
            messageArea.textContent = "れでぃ…";
            msg2.style.display = "none";
            subMsg.style.display = "none";
            // 開始まで(単位はミリ秒)
            setTimeout("startTyping()", 3000);
            // startButton.disabled = true;

            //diver Readyの間のerror処理
            wordChars = "";
            charIndex = 0;
            startButton.style.display = "none";
            retryButton.style.display = "none";
        }

         // 次の単語を表示
        function nextWord(){
            charIndex = 0;
            var random = Math.floor( Math.random() * wordList.length );
            // word = wordList[random];
            wordArea.textContent = wordList[random][0];
            typewordArea.textContent = wordList[random][1];
            typeArea.textContent = "";
            wordChars = wordList[random][1].toUpperCase().split('');
        }
         
        // 開始
        function startTyping(){
            score = 0;
            timeLeft = timeLimit;
            nextWord();
            countDown();
            timer1 = setInterval("countDown()", 1000);
            gameArea.style.display = "block";
        }

        // 残り時間を計測
        function countDown(){
            if(timeLeft <= 0) {
                stopTyping();
                return;
            }
            messageArea.textContent = "残り " + timeLeft + " 秒";
            timeLeft--;
        }
         
        // diver spaceキー連打対策 executedでtrue/false判定して一度きりのonStartButtonClick実行にしてる
        var executed = false;
        // キー押下時の処理
        document.onkeydown = function (e){
            var keyStr;
            if(e.keyCode == 32){
                if (!executed) {
                    executed = true;
                    // do something
                    onStartButtonClick();
                    console.log("onStartButtonClick");
                }
            }
            
            if(e.keyCode == 189){
                keyStr = "-";
            } else {
                keyStr = String.fromCharCode(e.keyCode);
            }
             
            if(wordChars[charIndex] == keyStr){
                charIndex++;
                typeArea.textContent = typeArea.textContent + keyStr;
                if(charIndex== wordChars.length){
                    score++;
                    nextWord();
                }
            }
        };
         
         
        // 終了
        function stopTyping(){
            clearInterval(timer1);
            wordChars = [];
            messageArea.textContent = score + "羽の ことり と出会った！";
            msg2.style.display = "block";

            if (score >= 15){
                msg2.textContent = "イロトリドリ！！";
            } else if (score >= 10){
                msg2.textContent = "もふもふもふもふ！";
            } else if (score === 0) {
                msg2.textContent = "穀物を用意して";
            } else {
                msg2.textContent = "彼らは遠目にこちらを見ている";
            }

            gameArea.style.display = "none";
            wordArea.textContent = "";
            typewordArea.textContent = "";
            typeArea.textContent = "";
            retryButton.style.display = "block";
            subMsg.style.display = "block";
            // startButton.disabled = false;
        }