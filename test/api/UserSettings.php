<?php
define("SETTINGSFILE", "../user_settings.xml", true);



class UserSettings
{
    public function __construct($name)
    {
        $this->UserName=$name;
        $this->readSettings($name);
    }
    function asJson()
    {
        $json = '{"userName": "'.strval($this->UserName).'",';
        $json = $json.'"lockMoveArticle": '.$this->booltostr($this->LockMoveArticle).',';
        $json = $json.'"autoSaveArticle": '.$this->booltostr($this->AutoSaveArticle).',';
        $json = $json.'"autoSaveArticleFrequency": '.strval($this->AutoSaveArticleFrequency).',';
        $json = $json.'"autoSaveArticleBeforeLogOut": '.$this->booltostr($this->AutoSaveArticleBeforeLogOut).',';
        $json = $json.'"autoSaveArticleBeforeLogOutTime": '.strval($this->AutoSaveArticleBeforeLogOutTime).'}';
        return $json;
    }
    function setFromJson($json)
    {
       //Set from flat json object
       // Remove braces
       $json = str_replace('{', '', $json);
       $json = str_replace('}', '', $json);
       //Get array of items
       $settings = explode(",", $json);
       foreach ($settings as $setting)
       {    
            //Separate name value pairs
            $name_values = explode(":", $setting);
            $name = str_replace('"', '', $name_values[0]);
            $value = str_replace('"', '', $name_values[1]);
            switch ($name) {
                case "lockMoveArticle":
                    $this->SetLockMoveArticle($this->boolval($value));
                    break;
                case "autoSaveArticle":
                     $this->SetAutoSaveArticle($this->boolval($value));
                    break;
                case "autoSaveArticleFrequency":
                    $this->SetAutoSaveArticleFrequency(intval($value));
                    break;
                case "autoSaveArticleBeforeLogOut":
                    $this->SetAutoSaveArticleBeforeLogOut($this->boolval($value));
                    break;
                case "autoSaveArticleBeforeLogOutTime":
                    $this->SetAutoSaveArticleBeforeLogOutTime(intval($value));
                    break;
            }
       }
    }
    function GetUserName()
    {
        return $this->Username;
    }
    function GetLockMoveArticle()
    {
        return $this->LockMoveArticle;
    }
    function GetAutoSaveArticle()
    {
        return $this->AutoSaveArticle;
    }
    function GetAutoSaveArticleFrequency()
    {
        return $this->AutoSaveArticleFrequency;
    }
    function GetAutoSaveArticleBeforeLogOut()
    {
        return $this->AutoSaveArticleBeforeLogOut;
    }
    function GetAutoSaveArticleBeforeLogOutTime()
    {
        return $this->AutoSaveArticleBeforeLogOutTime;
    }
    function SetUserName($Username)
    {
        $this->Username = $Username;
    }
    function SetLockMoveArticle($LockMoveArticle)
    {
        $this->LockMoveArticle = $LockMoveArticle;
    }
    function SetAutoSaveArticle($AutoSaveArticle)
    {
        $this->AutoSaveArticle = $AutoSaveArticle;
    }
    function SetAutoSaveArticleFrequency($AutoSaveArticleFrequency)
    {
        $this->AutoSaveArticleFrequency = $AutoSaveArticleFrequency;
    }
    function SetAutoSaveArticleBeforeLogOut($AutoSaveArticleBeforeLogOut)
    {
        $this->AutoSaveArticleBeforeLogOut = $AutoSaveArticleBeforeLogOut;
    }
    function SetAutoSaveArticleBeforeLogOutTime($AutoSaveArticleBeforeLogOutTime)
    {
        $this->AutoSaveArticleBeforeLogOutTime = $AutoSaveArticleBeforeLogOutTime;
    }
    function saveSettings()
    {
        $doc = new DOMDocument();
        $doc->load(SETTINGSFILE);
        $xpath = new DOMXPath($doc);
        //Delete old record
        $userlist=$xpath->query("/users/user[@UserName='".$this->UserName."']");
        if($userlist->length==1)
        {
            $doc->documentElement->removeChild($userlist->item(0));
        }
        //Create new record
		$userlist=$xpath->query("/users");
        $element = $doc->createElement("user");
        $element->setAttribute("UserName",$this->UserName);
        $element->setAttribute("LockMoveArticle",$this->booltostr($this->LockMoveArticle));
        $element->setAttribute("AutoSaveArticle",$this->booltostr($this->AutoSaveArticle));
        $element->setAttribute("AutoSaveArticleFrequency",$this->AutoSaveArticleFrequency);
        $element->setAttribute("AutoSaveArticleBeforeLogOut",$this->booltostr($this->AutoSaveArticleBeforeLogOut));
        $element->setAttribute("AutoSaveArticleBeforeLogOutTime",$this->AutoSaveArticleBeforeLogOutTime);

        $userlist->item(0)->appendChild($element);
        $doc->save(SETTINGSFILE);
    }
    private function readSettings($name)
    {
        $okay=FALSE;
       
        $doc = new DOMDocument();
        $doc->load(SETTINGSFILE);
	    $xpath = new DOMXPath($doc);

        $userlist=$xpath->query("/users/user[@UserName='".$name."']");
        //Can't find just use defaults
        if($userlist->length!=1) return;
        //Found so store current values
        $this->LockMoveArticle=$this->boolval($xpath->query("@LockMoveArticle",$userlist->item(0))->item(0)->nodeValue);
        $this->AutoSaveArticle=$this->boolval($xpath->query("@AutoSaveArticle",$userlist->item(0))->item(0)->nodeValue);
        $this->AutoSaveArticleFrequency=intval($xpath->query("@AutoSaveArticleFrequency",$userlist->item(0))->item(0)->nodeValue);
        $this->AutoSaveArticleBeforeLogOut=$this->boolval($xpath->query("@AutoSaveArticleBeforeLogOut",$userlist->item(0))->item(0)->nodeValue);
        $this->AutoSaveArticleBeforeLogOutTime=intval($xpath->query("@AutoSaveArticleBeforeLogOutTime",$userlist->item(0))->item(0)->nodeValue);
        
    }
    private function boolval($boolStr)
    {   
        $boolStr = str_replace(' ', '', $boolStr);
        $bool_val = ($boolStr === 'true') ? true: false;
        return $bool_val;
    }
    private function booltostr($bool)
    {
        $bool_val = $bool ? 'true' : 'false';
        return $bool_val;
    }
    private $UserName = "";
    private $LockMoveArticle = true;
    private $AutoSaveArticle = false ;
    private $AutoSaveArticleFrequency = 60 ;
    private $AutoSaveArticleBeforeLogOut = true ;
    private $AutoSaveArticleBeforeLogOutTime = 240 ;
}

?>
