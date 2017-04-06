<html>

	<?php

		$username;	//TODO Needs Data from elsewhere in system
		$agerange;	//TODO Needs Data from elsewhere in system
		$workshop; 	//TODO Needs Data from elsewhere in system
		$gamedata = $_POST['puzzle_randomised'];

	
		$db = pg_connect('host=ec2-79-125-2-69.eu-west-1.compute.amazonaws.com dbname=d2kinq08o8r8ve user=rhbrmmhwuanmal password=28e52e8303889adaad68bfd46e617d5f70e75d8fde01662b5f1c0c0867d78b26');
		
		if(!$db){
			echo "Error : Unable to open database\n";
		} else {
			echo "Opened database successfully\n";
		}

		$sql =<<<EOF
      INSERT INTO gamestatedata (username, agerange, workshop, gamedata)
      VALUES ();

EOF;

   $ret = pg_query($db, $sql);
   if(!$ret){
      echo pg_last_error($db);
   } else {
      echo "Records created successfully\n";
   }
   pg_close($db);
?>

	?>

</html>