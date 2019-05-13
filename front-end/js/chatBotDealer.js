/**
 * This file is used for message display and API query
 */

const customer = 'right';
const robot = 'left';

function EnterPress(e){ // detect key down
    let keyDown = e || window.event;
    if(keyDown.keyCode === 13){
        document.getElementById("send_message").click();
    }
}

function bookFlight() {
    $(".message_input").val('Book a flight for me');
    document.getElementById("send_message").click();
}


(function () {
    let Message;
    Message = function (arg) {
        this.text = arg.text;
        this.message_side = arg.message_side;
        this.message_type = arg.message_type;
        this.model_id = arg.model_id;
        this.draw = function (_this) {
            return function () {
                let $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text.split('%&%')[0]);
                $('.messages').append($message);
                // for destination info

                if(1 === _this.message_type){
                    $message.find('.text_btn').attr("data-toggle", "modal");
                    $message.find('.text_btn').attr("data-target", `#${_this.model_id}`);
                }
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    $(function () {
        let getMessageText, message_side, sendMessage, getReply;
        getMessageText = function () {
            let $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };

        sendMessage = function (text, sender, model_id=null, m_type=null) {
            let $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = sender;
            message = new Message({
                text: text,
                message_side: message_side,
                message_type: m_type,
                model_id: model_id,
            });
            message.draw();
            return $messages.animate(
                {
                    scrollTop: $messages.prop('scrollHeight')
                }, 300);
        };

        getReply = function(msg){
            if(current_user.user_id === 'unk'){
                sendMessage('You are illegal user! Please try to sign in first :)', robot);
                return
            }
            $('#waiter').removeClass('hide');
            let body = toBotRequest(msg, current_user.user_id);
            apigClient.chatbotPost({}, body, {}).then((res)=>{
                $('#waiter').addClass('hide');
                console.log(res);
                let data = getBotResponse(res);
                sendMessage(data.return_message, robot, data.model_id, data.message_type);
            }).catch((e)=>{
                // sendMessage(`Fail to get server response. Error ${e} `, robot);
                sendMessage('Fail to get server response... Please retry', robot);
            });
        };

        $('.send_message').click(function () {
            let customer_message = getMessageText();
            $('.message_input').removeAttr('type');
            sendMessage(customer_message, customer);
            getReply(customer_message);
        });
        sendMessage("Hey, I'm your travel assistant! " +
            "Where do you plan to go?", robot);
    });
}.call(this));


