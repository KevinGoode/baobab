
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
    $settings = new UserSettings($man->GetUserName());
    echo  '{"User":"'.$man->GetUserName().'", "expires": '.$man->GetExpires().', "settings": '.$settings->asJson().'}';
}
?>
