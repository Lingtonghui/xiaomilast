<?php

header('Content-type:text/html;charset="utf-8"');

// var_dump($_POST); 200 ok  404 not found



//定义一个统一的返回格式

$responseData =array("code" =>0,"message" =>"");


//现将通过post提交的数据全部取出来
// var_dump($_POST);


$username =$_POST['username'];
// var_dump($username);
$password=$_POST['password'];
$telephone=$_POST['telephone'];
$confirmPassword=$_POST['confirmPassword'];
$verification=$_POST['verification'];
// $createTime=$_POST['createTime'];


//对提价过来的数据进行验证

if(!$username){
    $responseData["code"]=1;
    $responseData["message"]="用户名不能为空";
    
    
    //将数据按照统一的格式返回
    echo json_encode($responseData);
    exit;

}

if(!$password){
    $responseData["code"]=2;
    $responseData["message"]="密码不能为空";
    
    
    //将数据按照统一的格式返回
    echo json_encode($responseData);
    exit;

}

if(!$telephone){
    $responseData["code"]=3;
    $responseData["message"]="手机号不能为空";
    
    
    //将数据按照统一的格式返回
    echo json_encode($responseData);
    exit;

}

if( $password != $confirmPassword){
    $responseData["code"]=4;
    $responseData["message"]="两次密码不一致";
    
    
    //将数据按照统一的格式返回
    echo json_encode($responseData);
    exit;

}


if(!$verification){
    $responseData["code"]=5;
    $responseData["message"]="验证码不能为空";
    
    
    //将数据按照统一的格式返回
    echo json_encode($responseData);
    exit;

}

//链接数据库,判断用户名是否注册过

// function connect($host=DB_HOST,$user=DB_USER,$password=DB_PASSWORD,$database=DB_DATABASE,$port=DB_PORT){
// 	$link=@mysqli_connect($host, $user, $password, $database, $port);
// 	if(mysqli_connect_errno()){
// 		exit(mysqli_connect_error());
// 	}
// 	mysqli_set_charset($link,'utf8');
// 	return $link;
// }

// date_default_timezone_set('Asia/Shanghai');//设置时区
// session_start();
// header('Content-type:text/html;charset=utf-8');
// define('DB_HOST','localhost');
// define('DB_USER','root');
// define('DB_PASSWORD','root');
// define('DB_DATABASE','xiaomiUsers');
// define('DB_PORT',3306);
// //我们的项目（程序），在服务器上的绝对路径
// define('SA_PATH',dirname(dirname(__FILE__)));
// //我们的项目在web根目录下面的位置（哪个目录里面）
// define('SUB_URL',str_replace($_SERVER['DOCUMENT_ROOT'],'',str_replace('\\','/',SA_PATH)).'/');



$link=mysqli_connect("127.0.0.1","root","root");

//判断数据库是否连接成功
if(!$link){
    $responseData["code"]=6;
    $responseData["message"]="数据库连接失败";
    
    
    //将数据按照统一的格式返回
    echo json_encode($responseData);
    exit;
}

mysqli_set_charset($link,"utf-8");

mysqli_select_db($link,"xiaomi");


//准备sql语句验证之前是否验证过

$sql1 ="SELECT  * FROM users WHERE username='{$username}' ";

// var_dump($sql1);
//发送sql语句


//插入了两次    为什么

$res=mysqli_query($link,$sql1);

// var_dump($res);

$row=mysqli_fetch_assoc($res);
// var_dump($row);

// if(!$row){
//     $responseData["code"]=7;
//     $responseData["message"]="用户名重名";
    
    
//     //将数据按照统一的格式返回
//     echo json_encode($responseData);
//     exit;
    

//         $sql2 ="insert into users(username,password,telephone) VALUES('{$username}','{$password}','{$telephone}')";
//         // var_dump($sql2);

//         $res2=mysqli_query($link,$sql2);


//         if(!$res2){
//             $responseData["code"]=8;
//             $responseData["message"]="insert false";
            
            
//             //将数据按照统一的格式返回
//             echo json_encode($responseData);
//             exit;
//         }
        
//         $responseData["message"]="insert ok";
//         echo json_encode($responseData);

//  }



if(!$row){
    /*
        密码要加密
    */

    //准备sql语句进行注册
    $sql2 ="insert into users(username,password,telephone) VALUES('{$username}','{$password}','{$telephone}')";
   
    $res2=mysqli_query($link,$sql2);
    if($res2){
        $responseData['message'] = "注册成功";
        echo json_encode($responseData);
    }else{
        $responseData['code'] = 9;
        $responseData['message'] = "注册失败";
        echo json_encode($responseData);
    }
}

//  
//注册

//密码要加密





// if(!$res2){                                      
//     $responseData["code"]=8;
//     $responseData["message"]="insert false";
    
    
//     //将数据按照统一的格式返回                      
//     echo json_encode($responseData);
//     exit;
// }

// $responseData["message"]="insert ok";
// echo json_encode($responseData);




function skip($url,$pic,$message){
$html=<<<A
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta http-equiv="refresh" content="3;URL={$url}" />
<title>正在跳转中</title>
<link rel="stylesheet" type="text/css" href="style/remind.css" />
</head>
<body>
<div class="notice"><span class="pic {$pic}"></span> {$message} <a href="{$url}">3秒后自动跳转中!</a></div>
</body>
</html>
A;
echo $html;
exit();
}

if(mysqli_affected_rows($link)==1){
    setcookie('users[name]',$username);
    setcookie('users[pw]',sha1(md5($password)));
    skip('../login.html','ok','注册成功！');
}else{
    skip('../login.html','eror','注册失败,请重试！');
}




mysqli_close($link);
?>