var legends = ["Lebron James", "Michael Jordan", "Kobe Bryant", "Larry Bird", "Allen Iverson", "kareem Abdul-Jabbar", "Shaq"];
var giftReturn = 10;
function renderButton() {

    $("#search-button").empty();

    for (i = 0; i < legends.length; i++) {

        var legendsB = $("<button>")

        legendsB.addClass("legends");
        legendsB.attr("data-name", legends[i]);
        legendsB.text(legends[i]);
        $("#search-button").append(legendsB);
    }
}


function displayLegend() {
    console.log("legendz")
    var singerz = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + legends + "&api_key=s8kOv73tIVIy3Q7DejVKXpOJwn5ypE9D&limit=25";


    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {
            var results = response.data;
            console.log(response);
            for (let j = 0; j < results.length; j++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div class ='item'>");
                    var rating = results[j].rating;
                    var para = $("<p>").text("Rating: " + rating);
                    var legendImage = $("<img>");
                    var stillImage = results[j].images.fixed_height_still.url;
                    var animatedImage = results[j].images.fixed_height.url;
                    legendImage.attr("src", stillImage);
                    legendImage.attr("data-state", "still");
                    legendImage.attr("data-animate", animatedImage);
                    legendImage.attr("data-still", stillImage);
                    legendImage.addClass("gif");
                    gifDiv.prepend(para);
                    gifDiv.prepend(legendImage);
                    $("#legendsGifs").prepend(gifDiv);
                }
            }
        })
}

$("#legendsGifs").on("click", ".gif", function () {
    var state = $(this).attr("data-state")
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    
})


$("#addLegend").on("click", function (event) {

    event.preventDefault();

    var legendStuff = $("#legends-input").val().trim();

    legends.push(legendStuff);

    renderButton();
})


$("#search-button").on("click", ".legends", displayLegend);

renderButton();