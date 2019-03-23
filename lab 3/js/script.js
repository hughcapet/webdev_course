var imgs = [];
var IMG_WIDTH = 200, IMG_HEIGHT = 200;
var CANVAS_WIDTH = 400, CANVAS_HEIGHT = 400;


var body = document.getElementsByTagName("body")[0];

var canvas = document.createElement("canvas");
canvas.setAttribute("width", "" + CANVAS_WIDTH);
canvas.setAttribute("height", "" + CANVAS_HEIGHT);
body.appendChild(canvas);

var ctx = canvas.getContext("2d");

function randomInt() {
    return Math.floor(Math.random() * (Number.MAX_VALUE - Number.MIN_VALUE + 1)) + Number.MIN_VALUE;
}


function fetchText() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.responseText);
            } else {
                var text = JSON.parse(xhr.responseText)[0].content;
                var newElem = document.createElement('div');
                newElem.innerHTML = text;
                document.body.appendChild(newElem);
            }
        }
    };

    xhr.open('GET',
        "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&generation="
        + randomInt(),
        true);
    xhr.send();
}


function fetchImgs() {
    for (var i = 0; i < 4; i++) {
        imgs[i] = new Image();
        imgs[i].src = "https://source.unsplash.com/random/200x200?random=" + randomInt();
        imgs[i].onload = function () {
            console.log("Success");
        }
    }
}

function drawImgs() {
    for (var i = 0; i < 4; i++) {
        imgs[i].onload = (function (e) { return function(){
            ctx.drawImage(imgs[e], e % 2 * IMG_WIDTH, Math.floor((e + 1) / 3) * IMG_HEIGHT, IMG_WIDTH, IMG_HEIGHT);
        }
        })(i);
        console.log(i % 2, Math.floor((i + 1) / 3))
    }
}

function generatePic() {
    fetchImgs();
    fetchText();
    drawImgs();
}

generatePic();
