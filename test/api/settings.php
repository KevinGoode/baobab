
<?php
 include_once 'SimpleSessionManager.php';
 include_once 'UserSettings.php';
 $man = new SimpleSessionManager();
 $loggedin=FALSE;
if($man->IsUserLoggedIn(false))
{
    $loggedin=TRUE;
}
if($loggedin!=TRUE)
{
    $man->ReturnError();
}
else
{
    $verb = $_SERVER['REQUEST_METHOD'];
   if ( $verb == 'PUT')
   {    
        $json= file_get_contents("php://input");
        $settings = new UserSettings($man->GetUserName());
        $settings->setFromJson($json);
        $settings->saveSettings();
   }
   else
   {
    $man->ReturnError();
   }
}
?>
