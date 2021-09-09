<?php
	include 'connection.php';
	$productName = isset($_POST['name']) ? $_POST['name'] : '';
    $productPrice = isset($_POST['price']) ? $_POST['price'] : 0;
    $productCategory = 1;
	$sql = "INSERT INTO products (
                    name,
                    price,
                    category_id
              )
			  
	VALUES ('$productName','$productPrice','$productCategory')";
	if (mysqli_query($con, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($con);
?>
 