<?php
session_start();  
if(!isset($_SESSION["sess_user"])){  
    header("location:login.php");  
return; }	
include 'connection.php';

if (!isset($_GET['id']) || empty($_GET['id']) || !is_numeric($_GET['id'])) {
    $errors[] = 'You must select a product in order to see its details!';
} else {
    $productId = $_GET['id'];

    /*
     * Get the product details.
     */
    $sql = 'SELECT * 
            FROM products 
            WHERE id = ? 
            LIMIT 1';

    $statement = $con->prepare($sql);

    $statement->bind_param('i', $productId);

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

    if (!$products) {
        $errors[] = 'No product found.';
    } else {
        $product = $products[0];

        $productName = $product['name'];
		$productPrice= $product['price'];
	}


$productSaved = FALSE;

if (isset($_POST['submit'])) {
    /*
     * Read posted values.
     */
    $productName = isset($_POST['name']) ? $_POST['name'] : '';
    $productPrice = isset($_POST['price']) ? $_POST['price'] : 0;
    $productCategory = 1;

    /*
     * Validate posted values.
     */
    if (empty($productName)) {
        $errors[] = 'Please provide a product name.';
    }

    if ($productPrice == 0 || !(is_numeric($productPrice))) {
        $errors[] = 'Please provide the price.';
    }

    /*
     * Save product .
     */
    if (!isset($errors)) {
        /*
         * The SQL statement to be prepared. Notice the so-called markers, 
         * e.g. the "?" signs. They will be replaced later with the 
         * corresponding values when using mysqli_stmt::bind_param.
         * 
         * @link http://php.net/manual/en/mysqli.prepare.php
         */
        $sql = 'UPDATE products SET
                    name=?,
                    price=?,
					category_id=?
					WHERE id=?';

        /*
         * Prepare the SQL statement for execution - ONLY ONCE.
         * 
         * @link http://php.net/manual/en/mysqli.prepare.php
         */
        $statement = $con->prepare($sql);

        /*
         * Bind variables for the parameter markers (?) in the 
         * SQL statement that was passed to prepare(). The first 
         * argument of bind_param() is a string that contains one 
         * or more characters which specify the types for the 
         * corresponding bind variables.
         * 
         * @link http://php.net/manual/en/mysqli-stmt.bind-param.php
         */
        $statement->bind_param('sdii', $productName, $productPrice, $productCategory, $productId);

        /*
         * Execute the prepared SQL statement.
         * When executed any parameter markers which exist will 
         * automatically be replaced with the appropriate data.
         * 
         * @link http://php.net/manual/en/mysqli-stmt.execute.php
         */
        $statement->execute();

 

        /*
         * Close the prepared statement. It also deallocates the statement handle.
         * If the statement has pending or unread results, it cancels them 
         * so that the next query can be executed.
         * 
         * @link http://php.net/manual/en/mysqli-stmt.close.php
         */
        $statement->close();


        /*
         * Close the previously opened database connection.
         * 
         * @link http://php.net/manual/en/mysqli.close.php
         */
        $con->close();

        $productSaved = TRUE;
		
		 

	}
    }
}
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
		<link rel="stylesheet" type="text/css" href="home.css">
    <link rel="stylesheet" type="text/css" href="navbar.css">
    <link rel="stylesheet" type="text/css" href="tumbnail.css">
    <link rel="stylesheet" type="text/css" href="text_home.css">
    
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
	<script src="judete.js"></script>
	<div id="grad1"></div>

        <title>Product details</title>

        <script src="https://code.jquery.com/jquery-3.2.1.min.js" type="text/javascript"></script>
        <style type="text/css">
            body {
                padding: 30px;
            }

            .product-details tr td {
                padding: 5px;
            }

            .product-details .label {
                font-weight: 700;
            }

            .product-images {
                margin-top: 30px;
            }

            .product-images tr td {
                padding: 10px;
                font-weight: 700;
                background-color: #eee;
            }

            .product-images .label {
                color: #fff;
                font-weight: 700;
                background-color: #8daf15;
            }

            .product-images img {
                max-width: 400px;
                display: inline-block;
                float: left;
            }
        </style>
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
            <h2>Product details</h2>

            <?php
            if (isset($errors)) {
                echo implode('<br/>', $errors);
                exit();
            }
            ?>
			<form action="" method="POST"> 
            <table class="product-details">
                <tr>
                    <td class="label">Name</td>
                    <td><input name="name" type="text" value="<?php echo $productName; ?>"></td>
                </tr>
                <tr>
                    <td class="label">Price</td>
                    <td><input name="price" type="text" value="<?php echo $productPrice; ?>"></td>
                </tr>
				
            </table>
			<input type="submit" value="Save" name="submit" />  
			</form> 
			<?php
            if ($productSaved) {
                ?>
                <a href="getProducts.php">
                    Click me to see products 
                </a>
                <?php
            }
            ?>

            
           
        </div>

    </body>
</html>
