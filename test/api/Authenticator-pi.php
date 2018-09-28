
<?php
/*
DOCUMENTATION IS AT http://svn.php.net/viewvc/pecl/pam/trunk/README?view=markup

STEPS TO INSTALL AND CONFIGURE PAM AUTHENTICATOR
1.) Install pear which is the extension manager for PHP:
yum install php-pear
2.) Install pam-devel from yum
yum install pam-devel
3.) Install php-devel from yum
yum install php-devel
4.) Install the PHP PAM extension
pecl install --alldeps PAM
--alldeps: Means automatically install all dependencies
5.)Modify the file /etc/php.ini and enter the following:
extension=pam.so
pam.servicename="php"
6.) Do the following to allow PAM php service:
7.)cd /etc/pam.d
ln -s login /etc/pam.d/php
8.) Restart apache:/etc/init.d/httpd restart
9.) sudo chmod a+r /etc/shadow (otherwise PAM will not work via browser BUT will from command line)
*/
class Authenticator
{
    public function __construct()
    {

    }
    public function Authenticate($uname, $pswd)
    {
        $okay=FALSE;
        $error="";
        if ( pam_auth( $uname, $pswd, $error ) )
        {
            $okay=TRUE;
        }
        echo $error;
        return $okay;
    }
}

?>
