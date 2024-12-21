<?php
// Database connection settings
$servername = "sql12.freemysqlhosting.net";
$username = "sql12753342";
$password = "dmPhWMtPwB";
$dbname = "sql12753342";

// Create a connection using MySQLi
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve and sanitize user inputs
    $fullName = htmlspecialchars($_POST['full_name']);
    $email = htmlspecialchars($_POST['email']);
    $address = htmlspecialchars($_POST['address']);

    // Validate inputs
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
        exit;
    }

    if (empty($fullName) || empty($address)) {
        echo json_encode(['status' => 'error', 'message' => 'Full name and address are required.']);
        exit;
    }

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO users (full_name, email, address) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $fullName, $email, $address); // "sss" indicates three string parameters

    // Execute the statement and check for success
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Form submitted successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error: ' . $stmt->error]);
    }

    // Close the prepared statement
    $stmt->close();
} else {
    // Handle invalid request methods
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

// Close the database connection
$conn->close();
?>
