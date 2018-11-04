$(function(){
    //on click for adding a burger (post)
    $("#addBurger").on("click", function(event){
        event.preventDefault();
        //create a variable to hold the new burger as a value to the burger_name key
        var newBurger = {
            burger_name: $("#newBurger").val().trim() //.toCapitalCase();
        };
        console.log("new burger: " + JSON.stringify(newBurger), null, 2);
        
        //use post to send to database
        $.post("/api/burgers", newBurger, function(){
            //console.log("New Burger Added!");
            // reload the page to display the burger added
            location.reload();
        });

        //clear input field
    });

    //on click for updating a burger to devoured (put)
    $(".eatBurger").on("click", function(event){
        event.preventDefault();
        //create variables for the id of the burger of the button clicked
        var id = $(this).data("id");
        //create a varialbe to hold the data to send (true for devoured col)
        var burgerDevouredObj = {devoured: true};

        console.log("ID to update: " + id);
        console.log("burger devoured obj: " + JSON.stringify(burgerDevouredObj, null, 2));
        //PUT request to the DB (via the controller)
        $.ajax({
            url: "/api/burgers/" + id,
            method: "PUT",
            data: burgerDevouredObj
        }).then(function(){
            //reload the page with burger now on the right
            console.log("burger was devoured");
            location.reload();
        }); 
    });

});