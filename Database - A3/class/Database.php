<?php

class Database implements JsonSerializable {

    public $user_id;
    public $user_name;
    public $user_age;
    public $user_email;
    public $user_phone;
    
    public function __construct ($user_id, $user_name, $user_age, $user_email, $user_phone) {
        $this->id = $user_id;
        $this->name = $user_name;
        $this->age = $user_age;
        $this->email = $user_email;
        $this->phone = $user_phone;
    }
    
    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'age' => $this->age,
            'email' => $this->email,
            'phone' => $this->phone,
        ];
    }
}

//Create new instance of Database class 
$user_databse = new Database($user_id, $user_name, $user_age, $user_email, $user_phone);
$user_databse_json = json_encode($user_databse);

// Open database.txt file and write json data to it
$database_file = fopen("database.txt", "w") or exit("Unable to open the database file.");
fwrite($database_file, $user_databse_json);
fclose($database_file);

?>