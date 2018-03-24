<?php
define("USERSFILE", "../users.xml", true);
include_once 'Authenticator.php';


class SimpleSessionManager
{
    public function __construct()
    {
        
    }

    function IsUserLoggedIn($reset)
    {
        $okay=FALSE;
        $currenttime=0;
        if (!array_key_exists('id', $_COOKIE)) return $okay;
        $cookie=$_COOKIE['id'];
        $client=$_SERVER["REMOTE_ADDR"];
        if((!$cookie) || (!$client)) return FALSE;

        $doc = new DOMDocument();
        $doc->load(USERSFILE);
	    $xpath = new DOMXPath($doc);

		$userlist=$xpath->query("/users/user[@id='".$cookie."']");
        if($userlist->length!=1) return FALSE;
        $ip=$xpath->query("@ip",$userlist->item(0));
        if($ip->length==1)
        {
            if($ip->item(0)->nodeValue == $client) 
            {
                $time=$xpath->query("@time",$userlist->item(0));
                if($time->length==1)
                {
                    $currenttime=time();
                    $okay=((intval($time->item(0)->nodeValue)+intval($this->SimpleSessionTimeout)) > $currenttime); //Stay alive for 30 mins
                }
            }
        }
        if($okay) 
        {
                //Update time
                if($reset==true)
                {
                    $time->item(0)->nodeValue= $currenttime;
                }
                //Get user name
                if(isset($_COOKIE['user']))$this->User=$_COOKIE['user'];
        }
        else
        {
                //Remove node
                $doc->documentElement->removeChild($userlist->item(0));
        }
        $doc->save(USERSFILE);
        $this->Cleanup();
        return $okay;
    }
    function IsValidUser( )
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
       if(!$_POST["id"]) return FALSE;
       $credentials=explode(":",$_POST["id"]);
       if(count($credentials) !=2) return FALSE;
       $a = new Authenticator;
       $okay= $a->Authenticate($credentials[0], $credentials[1]);
       $this->User=$credentials[0];
       return $okay;
    }
    function Cleanup()
    {
        $doc = new DOMDocument();
        $doc->load(USERSFILE);
	    $xpath = new DOMXPath($doc);
        $okay=FALSE;
		$userlist=$xpath->query("/users/user");


        if($userlist->length > 0)
        {
            $last=$userlist->length-1;
            for($i=$last;$i>=0;$i--)
            {
              

                $time=$xpath->query("@time",$userlist->item($i));
                if($time->length==1)
                {
                    $currenttime=time();
                    $okay=((intval($time->item(0)->nodeValue)+intval($this->SimpleSessionTimeout)) > $currenttime); 
                    if(!$okay) 
                    {
                        $doc->documentElement->removeChild($userlist->item($i));
                    }
                }
            }
        }
        $doc->save(USERSFILE);
    }
    function CredentialsPassed()
    {
       $_POST = json_decode(file_get_contents('php://input'), true);
       if(!$_POST["id"]) return FALSE;
       $credentials=explode(":",$_POST["id"]);
       return (count($credentials) ==2);   
    }
    function  GetUserName()
    {
        return $this->User;
    }
    function  ReturnError()
    {
        header("HTTP/1.0 401 Unauthorized");
        header("Content-type: text/html");
        echo  "User:unknown";
    }
    function LogUserIn()
    {
        //1.) Write cookie
        $id = rand();
        $ip=$_SERVER["REMOTE_ADDR"];
        $time=time();
        setcookie("id", $id);
        setcookie("ip", $ip);
        setcookie("user",$this->User);
        //2.) Save user to users file
        $doc = new DOMDocument();
        $doc->load(USERSFILE);
	    $xpath = new DOMXPath($doc);
		$userlist=$xpath->query("/users");
        $element = $doc->createElement("user");
        $element->setAttribute("id",$id);
        $element->setAttribute("ip",$ip);
        $element->setAttribute("user",$this->User);
        $element->setAttribute("time",$time);
        $userlist->item(0)->appendChild($element);
        $doc->save(USERSFILE);
    }
    function Logout()
    {
        $cookie=$_COOKIE['id'];   
        $doc = new DOMDocument();
        $doc->load(USERSFILE);
	    $xpath = new DOMXPath($doc);
		$userlist=$xpath->query("/users/user[@id='".$cookie."']");
        if($userlist->length==1)
        {
             //Remove node
             $doc->documentElement->removeChild($userlist->item(0));
        }
        $doc->save(USERSFILE);
        // Delete cookies set the expiration date to one hour ago
        setcookie ("id", "", time() - 3600);
        setcookie ("ip", "", time() - 3600);
        setcookie ("user", "", time() - 3600);
    }
    private $User="";
    private $SimpleSessionTimeout = 180 ; //3 minutes
}

?>
