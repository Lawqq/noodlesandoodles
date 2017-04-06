<html>

	<?php
	
		$db = pg_connect('host=ec2-79-125-2-69.eu-west-1.compute.amazonaws.com dbname=d2kinq08o8r8ve user=rhbrmmhwuanmal password=28e52e8303889adaad68bfd46e617d5f70e75d8fde01662b5f1c0c0867d78b26');
		
		if(!$db){
			echo "Error : Unable to open database\n";
		} else {
			echo "Opened database successfully\n";
		}

		   $sql =<<<EOF
      SELECT * from gamestatedata;
EOF;

   $ret = pg_query($db, $sql);
   if(!$ret){
      echo pg_last_error($db);
      exit;
   } 
   while($row = pg_fetch_row($ret)){
      echo "username = ". $row[0] . "\n";
      echo "agerange = ". $row[1] ."\n";
      echo "workshop = ". $row[2] ."\n";
      echo "gamedata =  ".$row[4] ."\n\n";
   }
   echo "Operation done successfully\n";
   pg_close($db);


	?>

</html>