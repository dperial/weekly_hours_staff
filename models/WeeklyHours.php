<?php

class WeeklyHours {
    // DB stuff
    private $conn;
    private $table_one = 'history';
    private $table_two = 'history_changed_fields';

    // history Properties
    public $id;
    public $staffId;
    public $validFrom;
    public $changeDate;
    public $oldValue;
    public $changeName;

    // constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get history
    public function read() {
        // Create Query
        /* $query = 'SELECT
                
                h.id,
                h.staffId,
                h.validFrom,
                h.changeName,
                hcf.newValue as newValue
            FROM ' . $this->table_one . ' h , ' . $this->table_two . ' hcf
            WHERE
                hcf.fieldName = "weeklyHours" AND hcf.historyId = h.id
            ORDER BY
                h.id DESC '; */
        $query = 'SELECT 
                hcf.newValue as newValue,
                hcf.oldValue as oldValue,
                h.id,
                h.staffId,
                h.validFrom,
                h.changeDate,
                h.changeName
            FROM ' . $this->table_one . ' h 
            LEFT JOIN  ' . $this->table_two . ' hcf ON hcf.historyId = h.id
            WHERE
                hcf.fieldName = "weeklyHours" AND hcf.historyId = h.id 
            ORDER BY h.changeDate DESC ';
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

}