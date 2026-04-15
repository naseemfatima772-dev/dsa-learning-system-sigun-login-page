<?php
// SHOW ERRORS (sirf testing ke liye)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// DATABASE CONNECTION
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "myproject";   // 👈 DATABASE KA NAAM

$conn = new mysqli($servername, $username, $password, $dbname);

// CHECK CONNECTION
if ($conn->connect_error) {
    die("Database connection failed");
}

// HANDLE FORM
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name   = trim($_POST['name']);
    $email  = trim($_POST['email']);
    $cnic   = trim($_POST['cnic']);
    $mobile = trim($_POST['mobile']);
    $dob    = trim($_POST['dob']);
    $pass   = $_POST['password'];

    // BASIC VALIDATION
    if (
        empty($name) || empty($email) || empty($cnic) ||
        empty($mobile) || empty($dob) || empty($pass)
    ) {
        die("All fields are required");
    }

    // PASSWORD HASH
    $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

    // INSERT DATA
    $stmt = $conn->prepare(
        "INSERT INTO register (name, email, cnic, mobile, dob, password)
         VALUES (?, ?, ?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "ssssss",
        $name,
        $email,
        $cnic,
        $mobile,
        $dob,
        $hashedPassword
    );

    if ($stmt->execute()) {
        header("Location: index.html"); // LOGIN PAGE
        exit();
    } else {
        echo "Signup failed";
    }

    $stmt->close();
    $conn->close();
}
?>