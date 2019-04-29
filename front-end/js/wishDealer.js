function addNewTrip(callback) {
    let place = $('#place').val();
    let idea = $('#place_idea').val();
    let date = new Date($('#date').val());
    let currentDate = new Date();
    if(currentDate.getTime() > date.getTime()){
        alert("The plan date is before today!");
        $("#closeAdd").trigger("click");
    }
    else if (date.toLocaleDateString()==="Invalid Date" || place===""){
        alert("Miss required field");
        $("#closeAdd").trigger("click");

    }
    else {
        let doc = {
            "place": place,
            "idea": idea,
            "timeStamp": currentDate.toLocaleDateString(),
            "planDate": date.toLocaleDateString()
        };
        console.log(doc);
        alert("add!");

        // Todo: add json to DynamoDB
    }

    callback();
}

function addToDB() {
    $("#closeAdd").trigger("click");
}