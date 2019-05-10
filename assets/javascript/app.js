// set uo the document so that it is ready for when it is called upon
// $(document).ready(function() {

//     console.log("working");
//     var topics = [];
// });
// // add in the connection to the API and the key to allow it to function within the parameters of the call
// function displayFitnessGifs() {

// 	var search= $(this).data("search");
// 	console.log();

// 	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=zjVgoI8NKBNje4CZBp1SB1AGl47tTgEG&limit=10";

// 	console.log(queryURL);}
// ***************************************************


$(document).ready(function() {
    console.log("working");
    //Array for searched topics to be added
    var topics = ["weights", "stretching", "yoga", "cardio"];
    
    function displayButtons() {
      $("#addedButtons").empty();
      for (var i = 0; i < topics.length; i++) {
        var a = $('<button class="btn searchBtn">');
        a.attr("data-search", topics[i]);
        a.text(topics[i]);
        $("#addedButtons").append(a);
      }
    };
    displayButtons();
        //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
      //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
    function displayFitnessGifs() {
    
        var x = $('#addGif').attr("value");

        console.log("variable x" + x );
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=zjVgoI8NKBNje4CZBp1SB1AGl47tTgEG&limit=10";
    
        console.log(queryURL);
    
        // set up to make gifs clickable- when clicked on initially, they animate, and clicked on again they go back to still
                 //   *************DONE*************
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                // learned this from the crystal collector video THANK GAWD
                for (var i = 0; i < results.length; i++) {
                
                var showDiv = $("<div class='col-md-3'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating:" + rating);
    
                showImage.attr("src", staticSrc);
                showImage.addClass("fitnessGifs niceBorder");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(showImage);
                showDiv.append(p);
                $("#loadedGifs").prepend(showDiv);
    
            }
        });
    }
    
      //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
        $("#searchNewGif").on("click", function() {
            // event.preventDefault();
            var  newFitness = $("#addGif").val().trim();
            topics.push(newFitness);
            console.log("topics" + topics);
            $("#addGif").val('');
            displayButtons();
          });
    
      
      
    //Function iterates through topics array to display button with array values in "addedButtons" section of HTML
    //*************DONE*************
      //   function displayButtons() {
      //   $("#addedButtons").empty();
      //   for (var i = 0; i < topics.length; i++) {
      //     var a = $('<button class="btn btn-outline-secondary">');
      //     a.attr("data-search", topics[i]);
      //     a.text(topics[i]);
      //     $("#addedButtons").append(a);
      //   }
      // };
      // // call Display Buttons
      // displayButtons();

    //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
    //*************DONE*************
        function pausePlayGifs() {
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        };




    
      //Click event on button with class of btn executes displayFitnessGifs function
      $(document).on("click", ".btn", displayFitnessGifs);
    
      //Click event on gifs with class of "fitness gifs" executes pausePlayGifs function
      $(document).on("click", ".fitnessGifs", pausePlayGifs);
    });