// current_user is defined in userDealer
function addNewTrip() {
    let place = $('#place').val();
    let idea = $('#place_idea').val();
    let date = new Date($('#date').val());

    let currentDate = new Date();
    let textid = current_user.user_id + currentDate.getTime();

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
            "textId": textid,
            "peopleID": current_user.user_id,
            "place": place,
            "idea": idea,
            "timeStamp": currentDate.toLocaleDateString(),
            "planDate": date.toLocaleDateString()
        };
        console.log(doc);
        $("#closeAdd").trigger("click");
        $('#waiter').removeClass('hide');
        apigClient.postwishlistPost({}, doc, {}).then((res)=>{
            console.log(res);
            console.log('post a new plan');
            appendTrip(doc);
            $('#waiter').addClass('hide');
        }).catch((e)=>{
            console.log('fail to add a new plan');
            console.log(e);
        })

    }
}

function deletePlan(textId) {
    console.log(textId);
    console.log(`delete id ${textId}`);
    // Todo: delete text from DB
    let para={
        textID: `${textId}`,
        peopleID: 'fake',
    };
    $('#waiter').removeClass('hide');
    apigClient.wishlistTextIDTextIDGet(para, {}, {}).then((res)=>{
        console.log(res);
        console.log('delete plan');
        $(`#${textId}`).addClass('hide');
        $('#waiter').addClass('hide');
    }).catch((e)=>{
        console.log('fail to delete new plan');
        console.log(e);
    })
}

function appendTrip(jsonResponse){
    let currentDate = new Date();
    let planDate = new Date(jsonResponse['planDate']);
    if (currentDate.getTime() > planDate.getTime()){
        // When the
        $("#sampleHistory").addClass('hide');
        let $template = $(`  
                <li class="list-group-item" id=${jsonResponse['textId']}>
                    <div class="d-flex w-100 justify-content-between">
                        <button onclick="deletePlan('${jsonResponse['textId']}')" class="btn btn-danger">delete</button>
                        <p class="mb-1 historyIdeaTitle btn">${jsonResponse['place']}</p>
                        <span class="historyIdeaTime btn">${jsonResponse['planDate']}</span>
                    </div>

                </li>`);
        $("#history").append($template);
    }
    else{
        $('#samplePlan').addClass('hide');
        let $template = $(` 
                    <li class="list-group-item" id=${jsonResponse['textId']}>
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1 cardTitle ideaTitle ">${jsonResponse['place']}</h5>
                            <small class="ideaTime">${jsonResponse['planDate']}</small>
                        </div>
                        <details class="mb-1 ideaDisplay">
                        ${jsonResponse['idea']}
                        </details>
                        <button onclick="deletePlan('${jsonResponse['textId']}')" class="btn btn-danger deletePlan">delete</button>
                    </li>`);
        $("#wishList").append($template);

    }
}

function getAllPlans(peopleID){
    console.log(`get plans for people ${peopleID}`);
    // todo: query appendTrip here to add all items in the page
    let para={
        peopleID: peopleID,
        textID: 'fake',
    };
    apigClient.wishlistPeopleIDPeopleIDGet(para, {}, {}).then((res)=>{
        console.log(res);
        let items = res['data'];
        for (let j = 0; j < items.length; j++){
            let current_res = items[j];
            appendTrip(current_res);
        }
        $('#waiter').addClass('hide');
        $('#waiter').removeAttr('style');


    }).catch((e)=>{
        console.log('failed to obtain people info');
        console.log(e);
    })
}

function sendMessage(){
    let phone = prompt(`please enter you phone number, ${current_user.user_name}`);
    console.log(phone);

}

wishPage = true;

// test1 =
//     {
//         "textId": "75dfa73a-edd9-4f0b-845b-ac668095e8cwerwgwerg51558828800000New",
//         "peopleID": "75dfa73a-edd9-4f0b-845b-ac668095e8c52312",
//         "place": "New Test 1",
//         "idea": "New Test Containt",
//         "planDate": "5/25/2019",
//         "timeStamp": "5/11/2019"};
//
// test2 =
//     {textId: "75dfa73a-edd9-4f0b-845b-ac668095e8c51sdfsdf558828800000New",
//         peopleID: "75dfa73a-edd9-4f0b-845b-ac668095e8c5",
//         place: "Old",
//         idea: "Old",
//         planDate: "5/10/2019",
//         timeStamp: "5/10/2019"};
