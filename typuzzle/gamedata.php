<html>

	<?php
	
		$db = pg_connect('host=ec2-79-125-2-69.eu-west-1.compute.amazonaws.com dbname=d2kinq08o8r8ve user=rhbrmmhwuanmal password=28e52e8303889adaad68bfd46e617d5f70e75d8fde01662b5f1c0c0867d78b26');
		
		if(!$db){
			echo "Error : Unable to open database\n";
		} else {
			echo "Opened database successfully\n";
		}
		
		 
	
		$sql =<<EOF
			CREATE TABLE IF NOT EXISTS gamestatedata
			(
				username INT PRIMARY KEY     NOT NULL,
				agerange            INT     NOT NULL,
				workshop			TEXT    NOT NULL,
				gamedata			TEXT	NOT NULL
			);		   
		  
			EOF;
		
			$ret = pg_query($db, $sql);
				if(!$ret){
					echo pg_last_error($db);
				} else {
					echo "Table created successfully\n";
				}
				pg_close($db);
		
	
	?>

</html>