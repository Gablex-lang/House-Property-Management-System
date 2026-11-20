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

if ($id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid property ID.']);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM properties WHERE id = ?");
$success = $stmt->execute([$id]);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Property deleted successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete property.']);
}
