$(function() {
    $("#addBurger").on("click", function(event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#newBurger").val().trim()
        };
        
        $.post("/api/burgers", newBurger, function(){
            // reload the page to display the burger added
            location.reload();
        });

        $("#newBurger").val("");

        //testing 
        //console.log("New Burger Added!");
        // console.log("new burger: " + JSON.stringify(newBurger), null, 2);
    });

    //Update burger as devoured
    $(".eatBurger").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        var burgerDevouredObj = {devoured: true};

        console.log("ID to update: " + id);
        console.log("burger devoured obj: " + JSON.stringify(burgerDevouredObj, null, 2));
        //PUT request to the DB (via the controller)
        $.ajax({
            url: "/api/burgers/" + id,
            method: "PUT",
            data: burgerDevouredObj
        }).then(function(){
            console.log("burger was devoured");
            location.reload();
        }); 
    });
});