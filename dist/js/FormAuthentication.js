
    // console.log("ok")
    // 把表单验证写成对象
    var formValiad={

        // 检测用户名
        checkUserName:function(){
            var userSpan=document.getElementById("username-span");
            var username=document.getElementById("username");
            // if(username.value.length < 6 || username.value.length > 18){
            //     userSpan.innerHTML = "❗️长度应为6~18个字符";
            // }
            var pattern=/^\w{6,18}$/;
            if(username.value.length==0){
                userSpan.innerHTML = "❗️用户名不能为空";
                userSpan.className="error";
                return false;
            }
            if(!pattern.test(username.value)){
                userSpan.innerHTML = "❗️用户名不合法";
                userSpan.className="error";
                return false
            }else{
                userSpan.innerHTML = "🆗用户名合法";
                userSpan.className="success";
                return true;
            }
        },

        // 检测密码
        checkPassword:function(){
            var userPassword=document.getElementById("password-span");
            var password=document.getElementById("password");
            // if(username.value.length < 6 || username.value.length > 18){
            //     userSpan.innerHTML = "❗️长度应为6~18个字符";
            // }
            var pattern=/^\w{6,}$/;
            if(password.value.length==0){
                userPassword.innerHTML = "❗️密码不能为空";
                userPassword.className="error";
                return false;
            }
            if(!pattern.test(password.value)){
                userPassword.innerHTML = "❗️密码不合法";
                userPassword.className="error";
                return false
            }else{
                userPassword.innerHTML = "🆗密码合法";
                userPassword.className="success";
                return true;
            }
        },

        // 检测确认密码
        checkConfirmPassword:function(){
            var userConfirmPassword=document.getElementById("confirmPassword-span");
            var ConfirmPassword=document.getElementById("confirmPassword");
            var password=document.getElementById("password");
            var pattern=/^\w{6,}$/;
            if(ConfirmPassword.value.length==0){
                userConfirmPassword.innerHTML = "❗️密码不能为空";
                userConfirmPassword.className="error";
                return false;
            }
            if(!pattern.test(ConfirmPassword.value)){
                userConfirmPassword.innerHTML = "❗️密码不合法";
                userConfirmPassword.className="error";
                return false
            }else if(password.value!=ConfirmPassword.value){
                userConfirmPassword.innerHTML = "❗️两次密码不一致";
                userConfirmPassword.className="error";
                return false
            }else{
                userConfirmPassword.innerHTML = "🆗密码合法";
                userConfirmPassword.className="success";
                return true;
            }
        },

        // 检测手机号
        checkPhone:function(){
            var userTelephone=document.getElementById("telephone-span");
            var telephone=document.getElementById("telephone");
            // if(username.value.length < 6 || username.value.length > 18){
            //     userSpan.innerHTML = "❗️长度应为6~18个字符";
            // }
            var pattern=/^1[3456789]\d{9}$/;
            if(telephone.value.length==0){
                userTelephone.innerHTML = "❗️手机号不能为空";
                userTelephone.className="error";
                return false;
            }
            if(!pattern.test(telephone.value)){
                userTelephone.innerHTML = "❗️手机号不合法";
                userTelephone.className="error";
                return false
            }else{
                userTelephone.innerHTML = "🆗手机号合法";
                userTelephone.className="success";
                return true;
            }
        },
        // 整个表单提交时的验证
        checkForm:function(){
            var checkUserName=this.checkUserName();
            var checkPassword=this.checkPassword();
            var checkConfirmPassword=this.checkConfirmPassword();
            var checkPhone=this.checkPhone();
            return checkUserName && checkPassword && checkConfirmPassword && checkPhone;
        },
        
        
        // 整个表单重置的验证
        resetForm:function(){
            var userSpan=document.getElementById("username-span");
            var userTelephone=document.getElementById("telephone-span");
            var userConfirmPassword=document.getElementById("confirmPassword-span");
            var userPassword=document.getElementById("password-span");
            userSpan.className=userTelephone.className=userConfirmPassword.className=userPassword.className="";
            userSpan.innerHTML = "*请输入6~18个不含非法字符的用户名";
            userPassword.innerHTML="*请输入长度不少于6位数的密码";
            userTelephone.innerHTML="*请输入有效正确的手机号";
            userConfirmPassword.innerHTML="";
        }
    }


    
