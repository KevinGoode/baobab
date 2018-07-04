
<?php
 include_once 'SimpleSessionManager.php';
 $man = new SimpleSessionManager();

if($man->IsUserLoggedIn(false))
{
    $man->Logout();
}

?>
