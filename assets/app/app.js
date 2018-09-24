var giphy = ["Iron Man", "Captain America", "Doctor Strange", "Thor", "Spiderman"];
function displayMarvel() {

    var marvel = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + marvel + "&api_key=l4iAli7gESZ6f4rQ7sblfPH6hEHgf4wH&limit=10&rating=g";
    
    // queryURL += giphy;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#marvel-view").empty();
        // $("#marvel-view").text(JSON.stringify(response));
        for (i = 0; i< response.data.length; i++) {
            var src = response.data[i].images.fixed_height.url;
            var a = $("<img>");
            a.attr("src", src);
            console.log(src);
            $("#marvel-view").append(a);

 
        }
        
       
    });

}
// var qString = prompt("term");


function giphyButton() {
    $("#marvel").empty();
    for (i = 0; i < giphy.length; i++) {
        man = $("<button>");
        man.addClass("giphy");
        man.attr("data-name", giphy[i]);
        man.text(giphy[i]);
        $("#marvel").append(man);
        

    }
}


$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    var gph = $("#giphy-input").val().trim();
    giphy.push(gph);
    console.log(giphy);

    giphyButton();
});

$(document).on("click", ".giphy", displayMarvel);

giphyButton();