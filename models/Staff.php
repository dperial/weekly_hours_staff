<?php

class Staff {

    // DB stuff
    private $conn;
    private $table = 'staff';

    // Staff Properties
    public $id;
    public $firstname;
    public $lastname;
    public $startDate;
    public $endDate;
    public $weeklyHours;
    public $staffId;
    public $updateDate;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get Staff
    public function read() {
        // Create Query
        $query = 'SELECT
                s.firstname,
                s.lastname,
                s.startDate,
                s.endDate,
                s.weeklyHours,
                s.staffId,
                s.updateDate
            FROM ' . $this->table . ' s
            ORDER BY
                s.updateDate DESC';
        // Prepare Statement
        try {
            //code...
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return $stmt;
        } catch (PDOException $e) {
            //Throw $e;
            echo 'Error: ' . $e->getMessage();

            return false;
        }
    }
    // Create Member Staff
    public function create() {
        // Create query
        $query = 'INSERT INTO ' . $this->table . '
            SET
                firstName = :firstName,
                lastName = :lastName,
                startDate = :startDate,
                endDate = :endDate,
                weeklyHours = :weeklyHours,
                birthday = :birthday,
                birthName = :birthName,
                gender = :gender,
                insertedBy = :insertedBy,
                endReason = :endReason,
                birthPlace = :birthPlace,
                insertDate = :insertDate,
                updatedBy = :updatedBy,
                updateDate = :updateDate,
                steuerId = :steuerId,
                staffId = :staffId';
        // Prepare Statement
        try {
            
            // Preapre Statement
            $stmt = $this->conn->prepare($query);
            // $id = $this->generateStaffId();
            // Clean data
            $this->firstname = htmlspecialchars(strip_tags($this->firstName));
            $this->lastName = htmlspecialchars(strip_tags($this->lastName));
            $this->startDate = htmlspecialchars(strip_tags($this->startDate));
            $this->endDate = htmlspecialchars(strip_tags($this->endDate));
            $this->weeklyHours = htmlspecialchars(strip_tags($this->weeklyHours));
            $this->birthday = htmlspecialchars(strip_tags($this->birthday));
            $this->birthName = htmlspecialchars(strip_tags($this->birthName));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->insertedBy = htmlspecialchars(strip_tags($this->insertedBy));
            $this->endReason = htmlspecialchars(strip_tags($this->endReason));
            $this->birthPlace = htmlspecialchars(strip_tags($this->birthPlace));
            $this->insertDate = htmlspecialchars(strip_tags($this->insertDate));
            $this->updatedBy = htmlspecialchars(strip_tags($this->updatedBy));
            $this->updateDate = htmlspecialchars(strip_tags($this->updateDate));
            $this->steuerId = htmlspecialchars(strip_tags($this->steuerId));
            $this->staffId =  htmlspecialchars(strip_tags($this->staffId));
            
            
            

            // Bind data
            $stmt->bindParam(':firstName', $this->firstName);
            $stmt->bindParam(':lastName', $this->lastName);
            $stmt->bindParam(':startDate', $this->startDate);
            $stmt->bindParam(':endDate', $this->endDate);
            $stmt->bindParam(':weeklyHours', $this->weeklyHours);
            $stmt->bindParam(':birthday', $this->birthday);
            $stmt->bindParam(':birthName', $this->birthName);
            $stmt->bindParam(':gender', $this->gender);
            $stmt->bindParam(':insertedBy', $this->insertedBy);
            $stmt->bindParam(':endReason', $this->endReason);
            $stmt->bindParam(':birthPlace', $this->birthPlace);
            $stmt->bindParam(':insertDate', $this->insertDate);
            $stmt->bindParam(':updatedBy', $this->updatedBy);
            $stmt->bindParam(':updateDate', $this->updateDate);
            $stmt->bindParam(':steuerId', $this->steuerId);
            $stmt->bindParam(':staffId', $this->generateStaffId());
            
            
            
            
            

            // Execute query
            if ($stmt->execute()) {
                return true;
            }

            // Print error if something goes wrong
            printf("Error: %s.\n", $stmt->error);
        } catch (PDOException $e) {
            //Throw $e;
            echo 'Error: ' . $e->getMessage();

            return false;
        }
        
    }
    public function generateStaffId() {
        $query = 'SELECT COUNT(*) as maxStaffId FROM ' . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $maxStaffId = $row['maxStaffId'];
        $maxStaffId = (int)$maxStaffId + 1;
        
        return $maxStaffId;
    }
}