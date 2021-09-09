<?php
//add product 
include 'connection.php';

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
     * Save product
     */
    if (!isset($errors)) {
        /*
         * The SQL statement to be prepared. Notice the so-called markers, 
         * e.g. the "?" signs. They will be replaced later with the 
         * corresponding values when using mysqli_stmt::bind_param.
         * 
         * @link http://php.net/manual/en/mysqli.prepare.php
         */
        $sql = 'INSERT INTO products (
                    name,
                    price,
                    category_id
                ) VALUES (
                    ?, ?, ?
                )';

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
        $statement->bind_param('sdi', $productName, $productPrice, $productCategory);

        /*
         * Execute the prepared SQL statement.
         * When executed any parameter markers which exist will 
         * automatically be replaced with the appropriate data.
         * 
         * @link http://php.net/manual/en/mysqli-stmt.execute.php
         */
        $statement->execute();

        // Read the id of the inserted product.
        $lastInsertId = $con->insert_id;

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
    

   <link rel="stylesheet" type="text/css" href="home.css">
    <link rel="stylesheet" type="text/css" href="navbar.css">
    <link rel="stylesheet" type="text/css" href="tumbnail.css">
    <link rel="stylesheet" type="text/css" href="text_home.css">
    
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
	<script src="judete.js"></script>
	<div id="grad1"></div>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
        <meta charset="UTF-8" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <!-- The above 3 meta tags must come first in the head -->

        <title>Save product details</title>

        <script src="https://code.jquery.com/jquery-3.2.1.min.js" type="text/javascript"></script>

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
	<script>
	//adaugare ajax
$(document).ready(function() {
	$('#butsave').on('click', function() {
		$("#butsave").attr("disabled", "disabled");
		var name = $('#name').val();
		var price = $('#price').val();
		var category = 1;
		
		if(name!="" && price!=""){
			$.ajax({
				url: "addProductAjax.php",
				type: "POST",
				data: {
					name: name,
					price: price,
					category:category				
				},
				cache: false,
				success: function(dataResult){
					var dataResult = JSON.parse(dataResult);
					if(dataResult.statusCode==200){
						$("#butsave").removeAttr("disabled");
						$("#success").show();
						$('#success').html('Data added successfully !'); 						
					}
					else if(dataResult.statusCode==201){
					   alert("Error occured !");
					}
					
				}
			});
		}
		else{
			alert('Please fill all the field !');
		}
	});
});
</script>
</body>
</html>

        <div class="form-container">
            <h2>Add a product</h2>

            <div class="messages">
                <?php
                if (isset($errors)) {
                    echo implode('<br/>', $errors);
                } elseif ($productSaved) {
                    echo 'The product details were successfully saved.';
                }
                ?>
            </div>
			<div class="alert alert-success alert-dismissible" id="success" style="display:none;">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
			</div>

            <form action="addProduct.php" method="post" enctype="multipart/form-data">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" value="<?php echo isset($productName) ? $productName : ''; ?>">

                <label for="quantity">Price</label>
                <input type="number" id="price" name="price" min="0" value="<?php echo isset($productPrice) ? $productPrice : '0'; ?>">

                <button type="submit" id="submit" name="submit" class="button">
                    Save
                </button>
				<input type="button" name="save" class="btn btn-primary" value="Save with ajax" id="butsave">
            </form>

            <?php
            if ($productSaved) {
                ?>
                <a href="getProducts.php" class="link-to-product-details">
                    Click me to see all products 
                </a>
                <?php
            }
            ?>
        </div>

    </body>
</html>