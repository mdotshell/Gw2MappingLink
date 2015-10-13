<?php

$nt = $_POST[node_type];
$cx = $_POST[coordinateX];
$cy = $_POST[coordinateY];
$server = $_POST[server];
$id = $_POST[id];

$con=mysqli_connect("location","username","password","gathering_nodes");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="INSERT INTO ".$server." (id, node_type, coordinateX, coordinateY, incorrect) VALUES('".$id."','".$nt."','".$cx."','".$cy."','0')";
if (!mysqli_query($con,$sql)){
	$sol= "CREATE TABLE ".$server."(id CHAR(30),node_type CHAR(30),coordinateX CHAR(30),coordinateY CHAR(30),incorrect CHAR(30))";
	if (!mysqli_query($con,$sol)){
		die('Error: ' . mysqli_error($con));
	}
	
	$sql="INSERT INTO ".$server." (id, node_type, coordinateX, coordinateY, incorrect) VALUES('".$id."','".$nt."','".$cx."','".$cy."','0')";
	if (!mysqli_query($con,$sql)){
		die('Error: ' . mysqli_error($con));
	}
}
mysqli_close($con);
?>
