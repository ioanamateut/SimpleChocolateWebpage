<?php


include 'connection.php';

if (!isset($_GET['id']) || empty($_GET['id']) || !is_numeric($_GET['id'])) {
    $errors[] = 'You must select a product in order to delete!';
} else {
    $productId = $_GET['id'];

	mysqli_query($con, "DELETE FROM products WHERE id=$productId"); 
	header('location: getProducts.php');
}
?>