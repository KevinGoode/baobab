
<?php
 include_once 'SimpleSessionManager.php';
 $man = new SimpleSessionManager();

if($man->IsUserLoggedIn(true))
{
    $man->Logout();
}

?>
