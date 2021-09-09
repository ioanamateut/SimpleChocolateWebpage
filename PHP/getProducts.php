<?php

session_start();  
if(!isset($_SESSION["sess_user"])){  
    header("location:login.php");  
return; }	
include 'connection.php';


    /*
     * Get the product details.
     */
    $sql = 'SELECT * 
            FROM products';
    $statement = $con->prepare($sql);


    $statement->execute();

    /*
     * Get the result set from the prepared statement.
     * 
     * NOTA BENE:
     * Available only with mysqlnd ("MySQL Native Driver")! If this 
     * is not installed, then uncomment "extension=php_mysqli_mysqlnd.dll" in 
     * PHP config file (php.ini) and restart web server (I assume Apache) and 
     * mysql service. Or use the following functions instead:
     * mysqli_stmt::store_result + mysqli_stmt::bind_result + mysqli_stmt::fetch.
     * 
     * @link http://php.net/manual/en/mysqli-stmt.get-result.php
     * @link https://stackoverflow.com/questions/8321096/call-to-undefined-method-mysqli-stmtget-result
     */
    $result = $statement->get_result();

    /*
     * Fetch data (all at once) and save it into an array.
     * 
     * @link http://php.net/manual/en/mysqli-result.fetch-all.php
     */
    $products = $result->fetch_all(MYSQLI_ASSOC);

    /*
     * Free the memory associated with the result. You should 
     * always free your result when it is not needed anymore.
     * 
     * @link http://php.net/manual/en/mysqli-result.free.php
     */
    $result->close();

    $statement->close();
?>

    


<!DOCTYPE html>
<html>
    <head>
	<style>
	#grad1 {
  height: 200px;
  background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
 } 
 </style>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
        <meta charset="UTF-8" />
        <!-- The above 3 meta tags must come first in the head -->

        <title><center>Products details</center></title>

        <script src="https://code.jquery.com/jquery-3.2.1.min.js" type="text/javascript"></script>
       
         <link rel="stylesheet" type="text/css" href="home.css">
    <link rel="stylesheet" type="text/css" href="navbar.css">
    <link rel="stylesheet" type="text/css" href="tumbnail.css">
    <link rel="stylesheet" type="text/css" href="text_home.css">
    
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
	<script src="judete.js"></script>
	<div id="grad1"></div>
    </head>
	<nav>
       <div class="logo">
        <figure class="hover-rotate">
            <img src="loulou.png" alt="logo" class="logo">
		</figure>
		
        </div>
        <label for="btn" class="icon">
            <span class="fa fa-bars"></span>
        </label>
        <input type="checkbox" id="btn">
        <ul>
            <li><a href="home_html5.html">Home</a></li>
            <li><a href="unghi.html">Unghii</a></li>
            <li>
                <label for="btn-1" class="show">Machiaj +</label>

                <a href="home_html5.html">Machiaj</a>
                <input type="checkbox" id="btn-1">

                <ul>
                    <li><a href="home_html5.html">Pentru Ochi</a></li>
                    <li><a href="home_html5.html">Pentru Buze</a></li>
                    <li><a href="home_html5.html">Pentru Ten</a></li>
                </ul>
            </li>
            <li><a href="home_html5.html">Cosmetice</a></li>
            <li><a href="par.html">Par</a></li>
            <li><a href="quiz.html">Quiz</a></li>
            <li><a href="login.html">LOGIN</a></li>
        </ul>

    </nav>
    <body>

        
		<div class="page-container">
            <h2><center>Product details</center></h2>
	    <?php
            if (isset($errors)) {
                echo implode('<br/>', $errors);
                exit();
            }
            ?>
            
			<p><center><a href="addProduct.php">Adauga Produs</a></center></p>			
			
            <table width="30%" border="1" cellspacing="0" cellpadding="3" margin:autoclass="product-details">
			<tr>
				<th>Nume</th>
				<th>Pret</th>
				<th></th>
				<th></th>
			</tr>
			<?php
				if (!$products) {
			?>	
			<tr>
			<td>No product found.</td>
			</tr>
			<?php
			  } else {
					foreach($products as $product){
						$productId= $product['id'];
						$productName = $product['name'];
						$productPrice = $product['price'];

			?>
                <tr>
                    <td><?php echo $productName; ?></td>
                    <td><?php echo $productPrice; ?></td>
					<td><a href='editProduct.php?id=<?php echo $productId; ?>'>Edit</a></td>
					<td><a href='deleteProduct.php?id=<?php echo $productId; ?>'>Delete</a></td>
                </tr>
				
			<?php
					}
			  }
			?>
         
            </table>
			

         
        </div>

    </body>
</html>
