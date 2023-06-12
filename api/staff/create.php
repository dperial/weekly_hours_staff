<?php

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Staff.php';

// Instanciate DB connection
$database = new Database();
$db = $database->connect();

// Instanciate Staff object, because we want to call our read method to acces the data insiede the DB
$staff = new Staff($db);

// Get the raw posted data
$data =json_decode(file_get_contents("php://input"));

$staff->firstName = $data->firstName;
$staff->lastName = $data->lastName;
$staff->startDate = $data->startDate;
$staff->endDate = $data->endDate;
$staff->weeklyHours = $data->weeklyHours;
$staff->birthday = $data->birthday;
$staff->birthName = $data->birthName;
$staff->gender = $data->gender;
$staff->insertedBy = $data->insertedBy;
$staff->endReason = $data->endReason;
$staff->birthPlace = $data->birthPlace;
$staff->insertDate = $data->insertDate;
$staff->updatedBy = $data->updatedBy;
$staff->updateDate = $data->updateDate;
$staff->steuerId = $data->steuerId;
 //$staff->staffId = $data->staffId;
// Create staff
if ($staff->create()) {
    $staffId = $db->lastInsertId();
    echo json_encode(
        array('success' => true, 'message' => 'Staff Member Created', 'staffId' => $staffId)
    );
} else {
    echo json_encode(
        array('message' => 'Staff Member Not Created')
);}
