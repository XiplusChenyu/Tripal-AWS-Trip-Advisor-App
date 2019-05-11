/**
 * This js is used for Cognito user auth and get user information
 */

const identity_pool_id = "us-east-1:4adb0b09-ad94-4423-ba16-a1a3750d8e45";

const aws_region = 'us-east-1';
user_id = null;


try {
    id_token = location.toString().split('id_token=')[1].split('&access_token=')[0];
    access_token = location.toString().split('&access_token=')[1].split('&')[0];
}

catch (e) {
    id_token = 'UNK';
}

AWS.config.region = aws_region; // Region

if (AWS.config.credentials) {
    AWS.config.credentials.clearCachedId();
}
 // clear old one and create new credential

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identity_pool_id,
    Logins: {
        'cognito-idp.us-east-1.amazonaws.com/us-east-1_l3NXswyeG': id_token
    }
});

AWS.config.credentials.refresh((error) => {
    if (error) {
        console.error(error);
        console.log('Fail to log!');
    } else {
        console.log('Successfully logged!');
        let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        let params = {
            AccessToken: access_token /* required */
        };
        cognitoidentityserviceprovider.getUser(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        });


    }
});

function wishListRouter(){
    // use this function to redirect from chat page to wish page
    let redirectUrl = `https://s3.amazonaws.com/tripal-web-holder/wishlist.html?id_token=${id_token}&access_token=${access_token}&end`
    return window.location.replace(redirectUrl)
}

function chatRouter(){
    // use this function to redirect from chat page to wish page
    let redirectUrl = `https://s3.amazonaws.com/tripal-web-holder/chat.html?id_token=${id_token}&access_token=${access_token}&end`
    return window.location.replace(redirectUrl)
}




// var apigClient = null;
//
//
// // Make the call to obtain credentials
// AWS.config.credentials.get(function(){
//
//     // Credentials will be available when this function is called.
//     try {
//         token = AWS.config.credentials.accessKeyId;
//
//         apigClient = apigClientFactory.newClient({
//             accessKey: AWS.config.credentials.accessKeyId,
//             secretKey: AWS.config.credentials.secretAccessKey,
//             sessionToken: AWS.config.credentials.sessionToken
//         });
//     }
//     catch(e) {
//         console.log('token exchange failed');
//     }
//
// });





// this function getCredentials with auto code
// var gainCredentials = function (auth_code) {
//
//     console.log(auth_code);
//
//     return new Promise((resolve, reject) => {
//         // https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
//         let postContent = {
//             url: `${cognito_domain_url}/oauth2/token`,
//
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             data: {
//                 grant_type: 'authorization_code',
//                 client_id: client_id,
//                 redirect_uri: redirect_uri,
//                 code: auth_code
//             }
//         };
//
//         // post to terminal node
//         $.ajax(postContent).done((response)=>{
//             if (!response.id_token){
//                 reject(response);
//                 console.log(JSON.stringify(response));
//             }
//
//             AWS.config.credentials.clearCachedId(); // clear old one and create new credential
//             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//                 IdentityPoolId: identity_pool_id,
//                 Logins: {
//                     [`cognito-idp.${aws_region}.amazonaws.com/${user_pool_id}`]: response.id_token
//                 }
//             });
//
//             AWS.config.credentials.refresh((error) => {
//                 if(error) {
//                     reject(error);
//                 } else {
//                     console.log('successfully logged in');
//                     resolve(AWS.config.credentials); // promise return
//                 }
//             });
//         });
//     });
// };
//
// gainCredentials(token).then((credentials) =>{
//     apigClient = apigClientFactory.newClient({
//         accessKey: AWS.config.credentials.accessKeyId,
//         secretKey: AWS.config.credentials.secretAccessKey,
//         sessionToken: AWS.config.credentials.sessionToken
//     });
// }).catch((e)=>{
//     console.log('token exchange failed');
// });
