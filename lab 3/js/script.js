var fetchedImgs = [];
var imgsToDraw = [];
var imgsReady = false;
var imgsRecieved = 0;
var textReady = false;
var textToDraw = null;
var lines = [];

var IMG_WIDTH = 200, IMG_HEIGHT = 200;
var CANVAS_WIDTH = 400, CANVAS_HEIGHT = 400;

var body = document.getElementsByTagName("body")[0];

var canvas = document.createElement("canvas");
canvas.setAttribute("width", "" + CANVAS_WIDTH);
canvas.setAttribute("height", "" + CANVAS_HEIGHT);
body.appendChild(canvas);


var br = document.createElement("br");
body.appendChild(br);

var generateText = document.createElement("p");
generateText.innerText = "Generate";
var generateButton = document.createElement("button");
generateButton.setAttribute("onclick", "generatePic()");
generateButton.setAttribute("style", "margin-right: 15px");
generateButton.appendChild(generateText);
body.appendChild(generateButton);

var saveText = document.createElement("p");
saveText.innerText = "Save";
var saveButton = document.createElement("button");
saveButton.appendChild(saveText);
var saveButtonContainer = document.createElement("a");
saveButtonContainer.setAttribute("id", "img-download");
saveButtonContainer.setAttribute("download", "quote.png");

saveButtonContainer.appendChild(saveButton);
body.appendChild(saveButtonContainer);


var ctx = canvas.getContext("2d");

function randomInt() {
    return Math.floor(Math.random() * (100000 - 200000 + 1));
}

function insertText() {
    if (imgsReady && textReady) {
        var space = 10;
        var letterHeight = parseInt("10px", 0);
        var countLines = lines.length;
        var start = CANVAS_HEIGHT / 2 - (letterHeight + space) * countLines / 2;
        ctx.fillStyle = "white";
        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], CANVAS_WIDTH / 2,
                start + ((i + 1) * (letterHeight + space)));
        }
        saveButtonContainer.href = canvas.toDataURL("image/png");
    }
}

function clearText(rawText) {
    var newElem = document.createElement('div');
    newElem.innerHTML = rawText;
    return newElem.textContent;
}

function splitText() {
    var text = JSON.parse(textToDraw)[0].content;
    var bareText = clearText(text);

    var padding = 10;
    var words = bareText.split(" ");
    var currentLine = words[0];
    ctx.textAlign = "center";
    ctx.font = "20px Helvetica";
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
    textReady = true;
}

function fetchText(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.responseText);
            } else {
                textToDraw = xhr.responseText;
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
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 4; i++) {
        ctx.globalAlpha = 0.65;
        ctx.drawImage(imgsToDraw[i], i % 2 * IMG_WIDTH, Math.floor((i + 1) / 3) * IMG_HEIGHT, IMG_WIDTH, IMG_HEIGHT);
    }
    ctx.globalAlpha = 1.0;
    imgsReady = true;
    insertText();
}

function fetchImgs() {
    imgsRecieved++;
    var newImg = new Image();
    newImg.setAttribute("crossOrigin", "Anonymous");
    newImg.src = "https://source.unsplash.com/collection/" + randomInt();

    newImg.onerror = function() {
        console.log("failed to fetch an image");
        fetchImgs();
    };
    newImg.onload = function() {
        fetchedImgs.push(newImg);
        if (fetchedImgs.length < 4) {
            fetchImgs();
        }
        else {
            imgsToDraw = fetchedImgs;
            drawImgs();
        }
    };
}

function generatePic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    imgsToDraw = [];
    fetchedImgs = [];
    imgsReady = false;
    imgsRecieved = 0;
    textReady = false;
    textToDraw = null;
    lines = [];
    fetchImgs();
    fetchText(splitText);
}

generatePic();
