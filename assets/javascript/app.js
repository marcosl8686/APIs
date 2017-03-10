$(document).ready(function() {


    var topics = ["One Punch man", "hold my beer", "funny cats", "funny dogs", "video games"];
    //ImageIconCrt will create image icons from selected element from the Array.
    //will also create and UL for the selected element and make a li for each result of the object from giphy API.
    function imageIconCrt(iconSelected, obj) {
        var imgContainer = $("<div id='slideShow' class='container-fluid'>");
        var imgDiv = $("<ul class='slide'>").attr("data-url", obj.url);
        for (var i = 0; i < 10; i++) {
            var imageGif = $("<img class='icon'>");
            var imgUl = $("<li class='slider'>");
            var iconText = $("<div class='iconText'>");
            imageGif.attr("src", iconSelected.data[i].images.fixed_width_still.url);
            $("#gifButtons").append(imgContainer);
            imgContainer.append(imgDiv);
            imgDiv.append(imgUl);
            imgUl.append(imageGif);
        }
    }
    // will print the name of the gif searched. needs debugging
    // function iconNameCtr(iconName) {
    //     var iconText = $("<div class='iconText'>");
    //     iconText.html(iconName);
    //     $("#gifNames").append(iconText);
    //
    // }
    //will render through the array and use ajax function to get information from giphy API.
    function topicsRender() {
        for (var i = 0; i < topics.length; i++){
            // iconNameCtr(topics[i]);
            var gifSelected = topics[i];
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSelected + "&api_key=dc6zaTOxFJmzC&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                var objSelected = this;
                imageIconCrt(response, objSelected);
            })
        }
    }
    function pausePlay() {
            var state = $(this).attr("data-state");
            console.log(state);
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
    }

    function displayContent() {
        $("#gifSelected").empty();
        var gifSelected = $(this).attr("data-url");
        var queryURL = gifSelected;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var newDiv = $("<div>");
                var still = results[i].images.fixed_height_still.url;
                var animate = results[i].images.fixed_height.url;
                var imgSelected = $("<img class='play' data-state='still'>").attr({"src": still, "data-still": still, "data-animate": animate });
                var p = $("<p>");
                $("p").text(results[i].rating);
                newDiv.append(p);
                newDiv.append(imgSelected);
                $("#gifSelected").append(newDiv);
            }
        });
    }
    function submitAddGif(event) {
        $("#gifButtons").empty();
        $("#gifNames").empty();
        event.preventDefault();
        var searchedIcon = $("#userInput").val();
        topics.push(searchedIcon);
        topicsRender();
    }
    $(document).on("click", "#gifSearch",submitAddGif);
    $(document).on("click", ".slide", displayContent);
    $(document).on("click", ".play", pausePlay);
    topicsRender();

})


