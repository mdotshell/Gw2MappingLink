<?php
$id = $_POST[id];
$serverName = $_POST[server];

$con=mysqli_connect("","","","gathering_nodes");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
$result = mysqli_query($con,"SELECT * FROM ".$serverName."");
while($row = mysqli_fetch_array($result))
	{
		if($row['id'] == $id){
			$incorrectValue = $row['incorrect'] + 1;
			$sql = "UPDATE ".$serverName." SET incorrect='".$incorrectValue."' WHERE id='".$id."'";
			if (!mysqli_query($con,$sql)){
				die('Error: ' . mysqli_error($con));
			}
			//echo $incorrectValue;
		}	
	}
 mysqli_close($con);

?>
