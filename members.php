<!DOCTYPE html>

<html lang="en">


	<head>
		<title>Test of the History Database</title>
	</head>


<body>

<?php
	// Connect to database, and print error message if it fails
	try {
		$dbhandle = new PDO('mysql:host=dragon.kent.ac.uk; dbname=comp3230','comp3230', 'pa33word');
	} 
	catch (PDOException $e) {
		// The PDO constructor throws an exception if it fails
		die('Error Connecting to Database: ' . $e->getMessage());
	}
	
	// Run the SQL query, and print error message if it fails.
	$sql = 'SELECT * FROM member';
	
	$query = $dbhandle->prepare($sql);

	if ( $query->execute() === FALSE ) {
		die('Error Running Query: ' . implode($query->errorInfo(),' ')); 
	}
		
	// Put the results into an associative array
	$results = $query->fetchAll();
	
?>
	<h2>Details of all members</h2>

<?php		
	// Printing out the member details stored in the array
	foreach ($results as $row) {
		echo "\t<p>".$row['memberId'].": ".$row['name'].": ".$row['address'].": ".$row['phone'].": ".$row['age']."</p>\n";
	}	
?>		

</body>

</html> 

