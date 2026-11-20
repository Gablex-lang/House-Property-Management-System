<?php
require_once 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized. Please log in.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$id = (int)($data['id'] ?? 0);
$property_name = trim($data['property_name'] ?? '');
$property_type = trim($data['property_type'] ?? '');
$location = trim($data['location'] ?? '');
$price = $data['price'] ?? null;
$bedrooms = $data['bedrooms'] ?? null;
$bathrooms = $data['bathrooms'] ?? null;
$area = $data['area'] ?? null;
$status = $data['status'] ?? 'Available';
$description = trim($data['description'] ?? '');
$date_listed = $data['date_listed'] ?? date('Y-m-d');

if ($id <= 0 || $property_name === '' || $property_type === '' || $location === '' ||
    $price === null || $bedrooms === null || $bathrooms === null || $area === null) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

$allowed_status = ['Available', 'Reserved', 'Sold', 'Rented'];
if (!in_array($status, $allowed_status, true)) {
    $status = 'Available';
}

$stmt = $pdo->prepare("UPDATE properties SET
    property_name = ?, property_type = ?, location = ?, price = ?,
    bedrooms = ?, bathrooms = ?, area = ?, status = ?, description = ?, date_listed = ?
    WHERE id = ?");

$success = $stmt->execute([
    $property_name, $property_type, $location, $price,
    $bedrooms, $bathrooms, $area, $status, $description, $date_listed, $id
]);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Property updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update property.']);
}
