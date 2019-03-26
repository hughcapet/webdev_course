var imgs = [];
var imgsReady = false;
var imgsRecieved = 0;
var textFetched = false;
var fetchedQuote = null;
var lines = [];

var IMG_WIDTH = 200, IMG_HEIGHT = 200;
var CANVAS_WIDTH = 400, CANVAS_HEIGHT = 400;

var body = document.getElementsByTagName("body")[0];

var canvas = document.createElement("canvas");
canvas.setAttribute("width", "" + CANVAS_WIDTH);
canvas.setAttribute("height", "" + CANVAS_HEIGHT);
body.appendChild(canvas);

var ctx = canvas.getContext("2d");

function randomInt() {
    return Math.floor(Math.random() * (100000 - 200000 + 1));
}

function insertText() {
    if (imgsReady && textFetched) {
        var space = 10;
        var letterHeight = parseInt("10px", 0);
        var countLines = lines.length;
        var start = CANVAS_HEIGHT / 2 - (letterHeight + space) * countLines / 2;
        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], CANVAS_WIDTH / 2,
                start + ((i + 1) * (letterHeight + space)));
        }
    }
}

function clearText(rawText) {
    var newElem = document.createElement('div');
    newElem.innerHTML = rawText;
    return newElem.textContent;
}

function splitText() {
    var text = JSON.parse(fetchedQuote)[0].content;
    var bareText = clearText(text);

    var padding = 10;
    var words = bareText.split(" ");
    var currentLine = words[0];
    ctx.textAlign = "center";
    ctx.font = "15px Helvetica";
    ctx.fillStyle = "white";
    for (var i = 1; i < words.length; i++) {
        var word = words[i];

        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < CANVAS_WIDTH - 2 * padding) {
            currentLine += " " + word;
        }
        else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    textFetched = true;
}

function fetchText(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.responseText);
            } else {
                fetchedQuote = xhr.responseText;
                callback();
            }
        }
    };

    xhr.open('GET',
        "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&generation="
        + randomInt(),
        true);
    xhr.send();
}

function drawImgs() {
    for (var i = 0; i < 4; i++){
        ctx.drawImage(imgs[i], i % 2 * IMG_WIDTH, Math.floor((i + 1) / 3) * IMG_HEIGHT, IMG_WIDTH, IMG_HEIGHT);
    }
    imgsReady = true;
    insertText();
}

function fetchImgs() {
    imgsRecieved++;
    imgs.push(new Image());
    imgs[imgsRecieved - 1].onerror = function() {
        console.log("failed to fetch an image");
        fetchImgs();
    };
    imgs[imgsRecieved - 1].onload = function() {
        if (imgs.length < 4) {
            fetchImgs();
        }
        else {
            drawImgs();
        }
    };
    imgs[imgsRecieved - 1].src = "https://source.unsplash.com/collection/" + randomInt();
}

function generatePic() {
    fetchImgs();
    fetchText(splitText);
}

generatePic();
