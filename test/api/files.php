<?php
include_once 'SimpleSessionManager.php';
$DETAIL_VAR='detail';
$DIR_VAR='dir';
$RENAME_VAR='rename';
$ROOT_PATH = './content';
//$bad_http_request = 'Bad request';
//$request_method = 'GET';
//$id_encoded = base64_encode("RaspberryPi/TurnOnLED");
//$request_variables =  array($DETAIL_VAR => $id_encoded);
//request_variables =  array();
$bad_http_request = http_response_code(400);
$request_variables = $_REQUEST;
function getTimeStr($unixtime)
{
    $dt = new DateTime("@$unixtime", new DateTimeZone("UTC"));
    return $dt->format(DateTime::ISO8601);
}
function get_id($array_variables)
{
    global $DETAIL_VAR;
    $id = null;
    if(array_key_exists($DETAIL_VAR, $array_variables))
    {
        $id=base64_decode($array_variables[$DETAIL_VAR]);
    }
    return $id;
}
function get_boolean_variable($array_variables, $name)
{
    $id = false;
    if(array_key_exists($name, $array_variables))
    {
        $id=$array_variables[$name];
    }
    return $id;
}
function get_dir_contents($dir, &$results = array()){
    $files = scandir($dir);
    foreach($files as $key => $value){
        $path = $dir.DIRECTORY_SEPARATOR.$value;
        if(!is_dir($path)) {
            //Add file to current object
            array_push($results, get_single_file($path, false, false));
        } else if($value != "." && $value != "..") {
            //Add directory to current object
            $dir_item=get_single_file($path, true, false);
            array_push($results, $dir_item);
            //Add children of dir
            get_dir_contents($path, $dir_item->children);
        }
    }
}
function get_single_file($id, $is_dir, $read_file)
{
    $contents = '';
    $stat = stat($id);
    $access_time = $stat['atime'];
    if ($read_file)
    {
     $contents=file_get_contents($id);
     //Following 2 lines  not really required from user perspective but is useful from a debug point of view
     //file_get_contents does not update access time so we simply return current time as access time. However the
     //touch line updates access time in file system
     //Following Touch command updates access time but keeps modification time same
     //(Because we have executed this command change time=access time)
     $access_time = time();
     touch($id, $stat['mtime'] ,$access_time);
    }

    $object = (object) ['id'=> $id, 'name'=>end(explode('/',$id)),  'data' => $contents , 'isDir'=> $is_dir, 'lastUpdated' => getTimestr($stat['mtime']),
                        'lastReadAt' => getTimestr($access_time), 'sizeOnDisk' => $stat['size'], 'children'=> array()];
    return $object;
}
function get_all_files()
{
    global $ROOT_PATH;
    $array = array();
    $top_object = get_single_file($ROOT_PATH, true, false);
    get_dir_contents($ROOT_PATH, $top_object->children);
    return $top_object;
}

$id=get_id($request_variables);
$verb = $_SERVER['REQUEST_METHOD'];
if ( $verb == 'GET')
{
    if($id)
    {
    if (!file_exists($id)) return $bad_http_request;
    //Note json_encode escapes characters
    header("Access-Control-Allow-Origin: *");
    header("HTTP/1.1 200 OK");
    echo get_single_file($id, false, true)->data;
    }
    else
    {
    //Note json_encode escapes characters
    header("Access-Control-Allow-Origin: *");
    header("HTTP/1.1 200 OK");
    echo stripslashes(json_encode(get_all_files()));
    }
}else{
    //All edit operations need a file or directory name so return error if missing
    if (!$id) return $bad_http_request;
    //For all non GET calls, a user needs to be logged in
    $man = new SimpleSessionManager();
    if($man->IsUserLoggedIn(true))
    {
        if ($verb=='PUT')
        {
            if(is_dir($id))
            {
            }
            elseif(file_exists($id))
            {
                $rename=get_boolean_variable($request_variables, $RENAME_VAR);
                if($rename)
                {
                    $file_name= file_get_contents("php://input");
                    rename($id,$file_name);
                    header("HTTP/1.1 200 OK");
                }
                else
                {
                    $handle = fopen($id, "w");
                    $file_contents = file_get_contents("php://input");
                    header("HTTP/1.1 200 OK");
                    echo 'Received:**'.$file_contents.'**';
                    fwrite($handle,$file_contents);
                    fclose($handle);
                    
                }
            }
            else
            {
                return $bad_http_request;
            }
        }
        else if ($verb=='POST')
        {   
            if(!file_exists($id))
            {
                $dir=get_boolean_variable($request_variables, $DIR_VAR);
                if(!$dir)
                {
                    //Create file
                    $handle = fopen($id, "w+");
                    $file_contents = file_get_contents("php://input");
                    header("HTTP/1.1 200 OK");
                    echo 'Received:**'.$file_contents.'**';
                    fwrite($handle,$file_contents);
                    fclose($handle);                 
                }
                else
                {
                  //Create directory
                  mkdir($id);
                  header("HTTP/1.1 200 OK");
                }
            }
            else
            {  
                return $bad_http_request;
            }
        }
        else if ($verb=='DELETE')
        {
            if(is_dir($id))
            {
                system("rm -rf ".$id);
                header("HTTP/1.1 200 OK");
            }
            elseif(file_exists($id))
            {
                unlink($id);
                header("HTTP/1.1 200 OK");
            }
            else
            { 
                return $bad_http_request;
            }
        }
        else
        {  
            return $bad_http_request;
        }
    }
    else
    {
        $man->ReturnError();
    }
}
?>
