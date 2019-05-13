
$empty = $('<h5>Ops, there is a desert ....</h5>');

function toBotRequest(message, userID){
    let date = new Date();
    return {
        messages : [
            {
                type : "string",
                unstructured : {
                    id : userID,
                    text : message.toString(),
                    timestamp : date.getTime().toString()
                }
            }
        ]
    };
}

function attractHotel(response) {
    let type = response.body.Intent;
    let result_list = response.body[type];
    let return_message = response.body.message;
    let date = new Date();
    let model_id = 'hotel' + date.getTime();
    let $fathermodel = $(`<div class="modal fade" id=${model_id} tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Our Hotel Recommendations</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="${model_id}Close">
                                                <span style="color: whitesmoke"><i class="fa fa-window-close" aria-hidden="true"></i></span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="accordion" id='${model_id}addOn'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
    $('body').append($fathermodel);
    if (0===result_list.length){
        $(`#${model_id}addOn`).append($empty);
    }

    for (let i = 0; i < result_list.length; i++) {
        let currentHotel = result_list[i];
        let name = currentHotel.name;
        let price = currentHotel.price;
        let rating = currentHotel.rating;
        let hotel_distance = currentHotel.hotelDistance.distance + currentHotel.hotelDistance.distanceUnit;
        let hotel_address = `${currentHotel.address.lines[0]}, ${currentHotel.address.cityName}, ${currentHotel.address.stateCode}, ${currentHotel.address.countryCode}, ${currentHotel.address.postalCode}`;
        let contact = currentHotel.contact.phone;
        let kidAddOn = $(`
                            <div class="card">
                                <div class="card-header" id="heading${model_id + i}">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${model_id + i}" aria-expanded="true" aria-controls="collapse${model_id + i}">
                                            ${name} 
                                        </button>
                                    </h2>
                                </div>
                            
                                <div id="collapse${model_id + i}" class="collapse" aria-labelledby="heading${model_id + i}" data-parent="${model_id}addOn">
                                    <div class="card-body">
                                    <p><i class='fa fa-building'></i> Address: ${hotel_address} (distance ${hotel_distance})</p>
                                    <p><i class='fa fa-dollar-sign'></i>Price: ${price}</p>
                                    <p><i class='fa fa-registered'></i> Rating: ${rating}</p>
                                    <p><i class='fa fa-phone'></i> Contact: ${contact}</p>
                                </div>
                            </div>`);

        $(`#${model_id}addOn`).append(kidAddOn);
    }
    return {
        return_message: return_message,
        model_id: model_id,
        message_type: 1,
    }
}

function attractFlight(response){
    let type = response.body.Intent;
    let result_list = response.body[type];
    let return_message = response.body.message;
    let date = new Date();
    let model_id = 'flight' + date.getTime();
    let $fathermodel = $(`<div class="modal fade" id=${model_id} tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Our Flight Recommendations</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="${model_id}Close">
                                                <span style="color: whitesmoke"><i class="fa fa-window-close" aria-hidden="true"></i></span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <ul class="list-group list-group-flush" id="${model_id}List" style="max-height: 600px; overflow: scroll">
                                              </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
    $('body').append($fathermodel);
    if (0===result_list.length){
        $(`#${model_id}addOn`).append($empty);
    }
    for (let i=0; i<result_list.length; i++) {
        let currentFlight = result_list[i];
        if (currentFlight.kayak_link){
            let kidAddOn = $(`<li class="list-group-item">
                                <a href="${currentFlight.kayak_link}" target="_Blank" class="btn btn_top external_btn">
                                <i class="fa fa-external-link" aria-hidden="true" style="font-size: large"></i> 
                                Click me to book tickets online!
                                </a></li>`);
            $(`#${model_id}List`).append(kidAddOn);
        }
        else
        {
            let carrier = currentFlight.carrier;
            let price = currentFlight.price;
            let departure_date = currentFlight.departure_date;
            let back_date = currentFlight.back_date;
            let kidAddOn = $(`<li class="list-group-item">${carrier} (${departure_date} -- ${back_date}) with <b>${price}$</b>.</li>`);
            $(`#${model_id}List`).append(kidAddOn);
        }
    }

    return {
        return_message: return_message,
        model_id: model_id,
        message_type: 1,
    }
}


function attractionDealer(response){
    let type = response.body.Intent;
    let result_list = response.body[type];
    let return_message = response.body.message;

    let date = new Date();
    let model_id = 'attaction' + date.getTime();
    let $fathermodel = $(`
                            <div class="modal fade" id=${model_id} tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Our Travel Recommendations</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="${model_id}Close">
                                                <span style="color: whitesmoke"><i class="fa fa-window-close" aria-hidden="true"></i></span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="accordion" id='${model_id}addOn'>
                                          
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
    $('body').append($fathermodel);
    if (0===result_list.length){
        $(`#${model_id}addOn`).append($empty);
    }

    for (let i=0; i<result_list.length; i++){
        let currentAttraction = result_list[i];
        let photo = currentAttraction.photo_url;
        let website = currentAttraction.website;
        let review = currentAttraction.typical_review[0];
        let name = currentAttraction.name;
        let address = currentAttraction.formatted_address;
        let rating = currentAttraction.rating;
        let location_lat = currentAttraction.geometry.location.lat;
        let location_lng = currentAttraction.geometry.location.lng;
        let kidAddOn = $(`
                            <div class="card">
                                <div class="card-header" id="heading${model_id + i}">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${model_id + i}" aria-expanded="true" aria-controls="collapse${model_id + i}">
                                            ${name} 
                                        </button>
                                    </h2>
                                </div>
                            
                                <div id="collapse${model_id + i}" class="collapse" aria-labelledby="heading${model_id + i}" data-parent="${model_id}addOn">
                                    <img class="card-img-top" src=${photo} alt="Card image cap">
                                    <div class="card-body" id="body${model_id + i}">
                                    <p><i class='fa fa-building'></i> Address: ${address}</p>
                                    <p><i class='fa fa-registered'></i> Rating: ${rating}</p>
                                    <details> 
                                    <summary>Review for ${name}</summary>
                                    ${review}
                                    </details>
                                                                        <br>
                                    <button type="button" class="btn btn-primary"
                                     onclick="findHotels('${name}', ${location_lat}, ${location_lng},'${model_id}Close')">Find Hotels
                                     </button>
                                     
                                     <button type="button" class="btn btn-secondary" onclick="nice(${location_lat},${location_lng},'${name}','${model_id}')"><i class="fa fa-map"></i> Map</button>
                                    </div>
                                </div>
                            </div>`);

        $(`#${model_id}addOn`).append(kidAddOn);
        if (website!=='no'){
            let weblink = $(`<a href="${website}" target="_Blank" class="btn btn-warning"><i class="fa fa-location-arrow"></i> Web</a>`);
            $(`#body${model_id + i}`).append(weblink);
        }
    }
    return {
        return_message: return_message,
        model_id: model_id,
        message_type: 1,
    }
}




function getBotResponse(response) {
    if(response.data.body.Intent==='Attraction')
    {
        return attractionDealer(response.data)
    }
    else if(response.data.body.Intent==='Flight'){
        return attractFlight(response.data)
    }
    else if(response.data.body.Intent==='Hotel'){
        return attractHotel(response.data)
    }
    else{
        let message = response.data.body.message;
        if(message.toLowerCase().search("date") !== -1){
            $('.message_input').attr('type','date');
        }
        return{
            return_message: message,
            model_id: null,
            message_type: 0
        }
    }
}


findHotels = function(name, location_lat, location_lng, model_id) {
    document.getElementById(model_id).click();
    $('.message_input').val(`Find Hotels around ${name}. %&%lat:${location_lat}, lng:${location_lng}`);
    console.log(`Find Hotels around ${name}. %&%lat:${location_lat}, lng:${location_lng}`);
    document.getElementById("send_message").click();
};



function nice(lat, lng, title, model_id) {
    document.getElementById(model_id).click(); // close th modal window

    googleMap = {
        map: null,
        initialize: function (lat, lng) {
            let myOptions = {
                zoom: 15,
                center: new google.maps.LatLng(lat, lng),
                mapTypeControl: true,
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
                navigationControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: this.map,
                title: `${title}`
            });
    },
};

    let $body =  $('body');
    let hidden_button = $(`<button class="btn btn-primary hide"  id='${model_id}MapShown' data-toggle="modal" data-target="#google_maps_api${model_id}">hidden</button>`)
    let mapWindow = $(`
                            <!--Use this model to show map-->
                            
                            <div class="modal fade" id="google_maps_api${model_id}" tabindex="-1" role="dialog"
                                 aria-labelledby="mapModalLabel${model_id}" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" id="mapModalLabel${model_id}"></h4>
                                        </div>
                                        <div class="modal-body">
                                            <div id="map_canvas" style="width: 100%; height: 450px"></div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Close Map Window</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `);

    $body.append(mapWindow); //create map on body
    $body.append(hidden_button);

    document.getElementById(`${model_id}MapShown`).click();

    $(`#google_maps_api${model_id}`).on("shown.bs.modal", function () {
        googleMap.initialize(lat, lng);
    }).on('hide.bs.modal', function () { //when close the model
        $(`#google_maps_api${model_id}`).remove();
        $(`#${model_id}MapShown`).remove();
    });
}



