<?php

$serverName = $_GET["serverName"];
$con=mysqli_connect("dbusername","root","dbpass","gathering_nodes");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$result = mysqli_query($con,"SELECT * FROM ".$serverName."");
while($row = mysqli_fetch_array($result))
  {
	if($row['incorrect'] < 2){
		echo "L.marker(([".$row['coordinateX'].",".$row['coordinateY']."]), {contextmenu: true, contextmenuItems:[{text: 'Report Incorrect Node', index: 0,callback: function(){reportIncorrect('".$row['id']."');}},{separator: true, index: 1},{separator: true, index: 2}], icon: new ".$row['node_type']."Icon, title: '".$row['node_type']."'})|";
	}
  }
 mysqli_close($con);
?>
