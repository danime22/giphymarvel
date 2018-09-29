var searchStrings = ["Iron Man", "Captain America", "Doctor Strange", "Thor", "Spiderman"];
var favorites = [];

function displayImages() {

    var marvel = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + marvel + "&api_key=l4iAli7gESZ6f4rQ7sblfPH6hEHgf4wH&limit=10&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {



        $("#marvel-view").empty();
        for (i = 0; i < response.data.length; i++) {
            var src = response.data[i].images.fixed_height_still.url;
            var animate = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;
            var title = response.data[i].title;

            $("#marvel-view").append(getImageDiv(src, animate, rating, title));

            
        }

        $(".favorite").on("click", function () {
            $(this).css("background-color", "#EA3B3B");
            $(this).css("color", "white");
            $(this).text("Added");
            

            var newFav = {
                still: "",
                moving: ""
            }

            newFav.still = $(this).attr("data-still");
            newFav.moving = $(this).attr("data-moving");

            favorites.push(newFav);

            localStorage.setItem("favorites", JSON.stringify(favorites));


            displayFavorites();
        });


    });

}

function getImageDiv(still, animate, rating, title) {
    var div = $("<div>");
    div.addClass("divide");
    div.append(getImageTag(still, animate));
    div.append($("<p>").text("Rating: " + rating));
    div.append($("<p>").text("Name: " + title));
    div.append(getFavButton(still, animate));

    return div;
}

function getFavButton(still, animate) {
    var but = $("<button>");
    but.attr("data-still", still);
    but.attr("data-moving", animate);
    but.addClass("favorite");
    but.text("Add Favorite");

    return but;
}

function getImageTag(still, animate) {
    var a = $("<img>");
    a.addClass("image");
    a.attr("src", still);
    a.attr("data-other", animate);

    return a;
}

function displayFavorites() {
    favorites = JSON.parse(localStorage.getItem("favorites"));

    $("#favorite-view").empty();

    for (i = 0; i < favorites.length; i++) {
        var img = getImageTag(favorites[i].still, favorites[i].moving);

        $("#favorite-view").append(img);

    }

    if(favorites.length > 0){
        $("#favButton").show();
        $("span").show();
    }
}

function clearFavorites() {
    $("#favorite-view").empty();

    localStorage.setItem("favorites", JSON.stringify([]));
}


function swapImages() {

    var src = $(this).attr("src");
    var newSrc = $(this).attr("data-other");
    $(this).attr("src", newSrc);
    $(this).attr("data-other", src);

    console.log("swap " + src + "/" + newSrc);
}


function renderButtons() {
    $("#marvel").empty();
    for (i = 0; i < searchStrings.length; i++) {
        man = $("<button>");
        man.addClass("giphy");
        man.attr("data-name", searchStrings[i]);
        man.text(searchStrings[i]);
        $("#marvel").append(man);
    }
}


$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    var gph = $("#giphy-input").val().trim();
    $("#giphy-input").val("");
    searchStrings.push(gph);
    console.log(searchStrings);


    renderButtons();
});

$(document).on("click", ".giphy", displayImages);
$("body").on("click", ".image", swapImages);
$("body").on("click", "H1", clearFavorites);

renderButtons();
displayFavorites();

$("#favButton").on("click", function(){
    clearFavorites(); 

})


