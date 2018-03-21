
<?php
 include_once 'SimpleSessionManager.php';
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
    echo  "User:".$man->GetUserName();
}
?>
