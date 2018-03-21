
<?php
/*

STEPS TO INSTALL AND CONFIGURE Authenicator on Ubuntu

1.) Need mkpasswd to be installed (On ubuntu sudo apt-get install whois)
2.) sudo chmod a+r /etc/shadow
*/
class Authenticator
{
    public function __construct()
    {

    }
    public function Authenticate($user, $pass)
    {
        // run shell command to output shadow file, and extract line for $user
        // then spit the shadow line by $ or : to get component parts
        // store in $shad as array
        $shad =  preg_split("/[$:]/",`cat /etc/shadow | grep "^$user\:"`);
        // use mkpasswd command to generate shadow line passing $pass and $shad[3] (salt)
        // split the result into component parts
        $mkps = preg_split("/[$:]/",trim(`mkpasswd -m sha-512 $pass $shad[3]`));
        // compare the shadow file hashed password with generated hashed password and return
        return ($shad[4] == $mkps[3]);
    }
}

?>
 
