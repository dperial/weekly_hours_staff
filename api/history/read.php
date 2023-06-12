<?php

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/WeeklyHours.php';

// Instanciate DB connection
$database = new Database();
$db = $database->connect();

// Instanciate History object
$history = new WeeklyHours($db);

// History query
$result = $history->read();

// Get row count
$numHistory = $result->rowCount();

// Check if any history
if($numHistory > 0) {
    // History array
    $history_arr = array();
    

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $history_item = array(
            'newValue' => $newValue,
            'id' => $id,
            'staffId' => $staffId,
            'validFrom' => $validFrom,
            'changeDate' => $changeDate,
            'oldValue' => $oldValue,
            'changeName' => $changeName
        );

        // Push to "data"
        array_push($history_arr, $history_item);
    }

    // Turn to JSON & output
    echo json_encode($history_arr);
} else {
    // No history
    echo json_encode(
        array('message' => 'No History Found')
    );
}