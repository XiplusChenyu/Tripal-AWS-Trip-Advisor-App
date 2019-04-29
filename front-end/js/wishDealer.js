test_people_id = "test";

function addNewTrip() {
    let place = $('#place').val();
    let idea = $('#place_idea').val();
    let date = new Date($('#date').val());
    let currentDate = new Date();
    if (currentDate.getTime() > date.getTime()) {
        alert("The plan date is before today!");
        $("#closeAdd").trigger("click");
    }
    else if (date.toLocaleDateString() === "Invalid Date" || place === "") {
        alert("Miss required field");
        $("#closeAdd").trigger("click");

    }
    else {
        let doc = {
            "peopleID": test_people_id,
            "place": place,
            "idea": idea,
            "timeStamp": currentDate.toLocaleDateString(),
            "planDate": date.toLocaleDateString()
        };
        console.log(doc);
        alert("add!");
        $("#closeAdd").trigger("click");

        // Todo: add json to DynamoDB
    }
}