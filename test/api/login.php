
<?php
 include_once 'SimpleSessionManager.php';
 $man = new SimpleSessionManager();
 $loggedin=FALSE;

if($man->IsUserLoggedIn(true))
{
    $loggedin=TRUE;
}
else if($man->CredentialsPassed())
{
    if($man->IsValidUser())
    {
        $man->LogUserIn();
        $loggedin=TRUE;
    }
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
