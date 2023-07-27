<?
$db_server      = 'localhost';
$db_user_name   = 'moonjong2';
$db_user_pw     = 'anstjswhd0105#';
$db_name        = 'moonjong2';

$conn = mysqli_connect($db_server, $db_user_name, $db_user_pw , $db_name);
mysqli_set_charset($conn, "utf8");


$name = $_POST['name']; // 문자열
$email = $_POST['email']; // 문자열
$guests = $_POST['guests']; //숫자
$event = $_POST['event']; // 문지얄


$sql = "INSERT INTO wedding_table(이름, 이메일, 게스트, 이벤트) 
        VALUES ('$name', '$email', '$guests', '$event')";
mysqli_query($conn, $sql); // 저장 실행
?>