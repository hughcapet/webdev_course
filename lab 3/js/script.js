var example = document.getElementById("example"),
    ctx = example.getContext('2d');

ctx.fillRect(0, 0, example.width, example.height);

function fetchImg() {
    var img = new Image();

    img.src = "https://source.unsplash.com/random/300x400?random=" + Math.random();
    document.body.appendChild(img);

    img.onerror = function() {
        alert("Image fetching failed");
    };

    img.onload = function () {
        console.log("Success");
    };


}

function fetchFourImgs() {
    var fetched = 0;

    for (var i = 0; i < 4; i++) {
        if (fetched < 4) {
            fetchImg();
        }
    }
}

fetchFourImgs();