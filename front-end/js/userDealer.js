/**
 * This js is used for Cognito user auth and get user information
 */

const identity_pool_id = "us-east-1:4adb0b09-ad94-4423-ba16-a1a3750d8e45";
const aws_region = 'us-east-1';

current_user = {
    user_id: 'unk',
    user_name: 'unk',
};

wishPage = false;

try {
    id_token = location.toString().split('id_token=')[1].split('&access_token=')[0];
    access_token = location.toString().split('&access_token=')[1].split('&')[0];
} catch (e) {
    id_token = 'UNK';
    access_token= 'UNK';
}

AWS.config.region = aws_region; // Region

if (AWS.config.credentials) {
    AWS.config.credentials.clearCachedId();
}
 // clear old one and create new credential

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identity_pool_id,
    Logins: {
        'cognito-idp.us-east-1.amazonaws.com/us-east-1_l3NXswyeG': id_token,
    }
});

AWS.config.credentials.refresh((error) => {
    if (error) {
        console.error(error);
        alert("Your login is expired, please relogin to use our app");
        window.location.replace('https://s3.amazonaws.com/tripal-web-holder/index.html');
        console.log('Fail to log!');
    } else {
        console.log('Successfully logged!');
        let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        let params = {
            AccessToken: access_token /* required */
        };
        cognitoidentityserviceprovider.getUser(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                alert("Your login is expired, please relogin to use our app");
                window.location.replace('https://s3.amazonaws.com/tripal-web-holder/index.html');
            }
            // an error occurred
            else {
                current_user.user_id = data['UserAttributes'][0]['Value'];
                current_user.user_name = `${data['UserAttributes'][2]['Value']} ${data['UserAttributes'][3]['Value']}`;
                console.log(current_user);
                // Make the call to obtain credentials
                AWS.config.credentials.get(function(){

                    // Credentials will be available when this function is called.
                    try {
                        apigClient = apigClientFactory.newClient({
                            accessKey: AWS.config.credentials.accessKeyId,
                            secretKey: AWS.config.credentials.secretAccessKey,
                            sessionToken: AWS.config.credentials.sessionToken
                        });
                        console.log('create apiClient');
                    }
                    catch(e) {
                        console.log('token exchange failed');
                    }
                    if (wishPage){
                        getAllPlans(current_user.user_id);
                    }

                });
            }
            // successful response
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

$(function () {
    $('[data-toggle="popover"]').popover()
});