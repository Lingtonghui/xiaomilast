//如何做到点击按钮把数据发到后台的操作


define(["jquery"],function($){
    
    function registerSend(){
        $("#register-button").click(function(){
            $.ajax({
                type: "post",
                url: "./php/register.php",
                data: {
                    telephone:$("#telephone").val(),
                    username:$("#username").val(),
                    password:$("#password").val(),
                    confirmPassword:$("#confirmPassword").val(),
                    verification:$("#verification").val(),
                    createTime:(new Date()).getTime()
                },
                success: function (result) {
                    console.log(result);
                },
                error:function(msg){
                    console.log(msg);
                }
            });
        })
    }
    

    return {
        registerSend:registerSend
    }
})