var searchStrings = ["Iron Man", "Captain America", "Doctor Strange", "Thor", "Spiderman"];

function displayImages() {

    var marvel = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + marvel + "&api_key=l4iAli7gESZ6f4rQ7sblfPH6hEHgf4wH&limit=10&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        rating = response.data[0].rating;
        title = response.data[0].title;

        $("#marvel-view").empty();
        for (i = 0; i < response.data.length; i++) {
            var src = response.data[i].images.fixed_height_still.url;
            var animate = response.data[i].images.fixed_height.url;
            var a = $("<img>");
            a.addClass("image");
            a.attr("src", src);
            a.attr("data-other", animate);
            console.log(src);
            $("#marvel-view").append(a);
            var v = $("<p>").text("Rating: " + rating);
            $("#marvel-view").append(v);
            var z = $("<p>").text("Name: " + title);
            $("#marvel-view").append(z);

        }


    });

}

function swapImages() {
    var src = $(this).attr("src");
    var newSrc = $(this).attr("data-other");
    $(this).attr("src", newSrc);
    $(this).attr("data-other", src);
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

renderButtons();

