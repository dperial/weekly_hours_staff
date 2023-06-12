<?php

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Staff.php';

// Instanciate DB connection
$database = new Database();
$db = $database->connect();

// Instanciate Staff object, because we want to call our read method to acces the data insiede the DB
$staff = new Staff($db);

// Staff query
$result = $staff->read();

// Get row count
$numMember = $result->rowCount();

// Check if any staff member
if($numMember > 0) {
    // Staff array
    $staff_arr = array();
    // $staff_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $staff_item = array(
            'staffId' => $staffId,
            'firstName' => $firstname,
            'lastName' => $lastname,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'weeklyHours' => $weeklyHours,
            'updateDate' => $updateDate
        );

        // Push to "data"
        array_push($staff_arr, $staff_item);
    }

    // Turn to JSON & output
    echo json_encode($staff_arr);
} else {
    // No staff Member
    echo json_encode(
        array('message' => 'No Staff Member Found')
    );
}
