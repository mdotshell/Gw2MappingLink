<!DOCTYPE html>
<html>
    <head>
        <title>Gw2Connection.com - Pve</title>
        <link rel="stylesheet" href="css/leaflet.css" />
		<link rel="stylesheet" href="css/style.css" />
		<link rel="stylesheet" href="css/leaflet.contextmenu.css" />
		<link rel="stylesheet" href="css/jquery.fancybox.css" />
		<link rel="stylesheet" href="css/Control.MiniMap.css" />
		<link rel="stylesheet" href="css/L.Control.Sidebar.css" />
		<link rel="stylesheet" href="css/leaflet.label.css" />
		<script src="js/jquery.min.js"></script>
        <script src="js/leaflet.js"></script>
		<script src="js/icons.js"></script>	
		<script src="js/jquery.fancybox.pack.js"></script>
		<script src="js/jquery.fancybox.js"></script>
		<script src="js/Control.MiniMap.js" type="text/javascript"></script>
		<script src="js/L.Control.Sidebar.js"></script>
    </head>
		
<body>
<div id="sidebar">
    <h1>Options:</h1>
	<b>Select Your Server:</b><br>
			<select id="serverSelect" style="width: 150px;" onchange="getMatchID(this.options[this.selectedIndex].value);">
				<option value=""></option>
				<option value="`2204`">Abaddon's Mouth [DE]  
				<option value="`1001`">Anvil Rock  
				<option value="`2105`">Arborstone [FR]</option>
				<option value="`2103`">Augury Rock [FR]</option>  
				<option value="`2013`">Aurora Glade  
				<option value="`2301`">Baruch Bay [SP]</option>  
				<option value="`1019`">Blackgate</option>  
				<option value="`2004`">Blacktide</option>  
				<option value="`1002`">Borlis Pass</option>
				<option value="`1014`">Crystal Desert</option>  
				<option value="`1012`">Darkhaven</option>  
				<option value="`2002`">Desolation</option>
				<option value="`1023`">Devona's Rest</option>  
				<option value="`1021`">Dragonbrand</option>  
				<option value="`2205`">Drakkar Lake [DE]</option>  
				<option value="`2207`">Dzagonur [DE]</option>  
				<option value="`1010`">Ehmry Bay</option>  
				<option value="`2203`">Elona Reach [DE]</option>  
				<option value="`1024`">Eredon Terrace</option>  
				<option value="`2007`">Far Shiverpeaks</option>  
				<option value="`1020`">Ferguson's Crossing</option>  
				<option value="`2001`">Fissure of Woe</option>  
				<option value="`1009`">Fort Aspenwood</option>  
				<option value="`2102`">Fort Ranik [FR]</option>  
				<option value="`2003`">Gandara</option>  
				<option value="`1007`">Gate of Madness</option>  
				<option value="`2014`">Gunnar's Hold</option>  
				<option value="`1004`">Henge of Denravi</option>  
				<option value="`1015`">Isle of Janthir</option>  
				<option value="`1008`">Jade Quarry</option>  
				<option value="`2101`">Jade Sea [FR]</option> 
				<option value="`1022`">Kaineng</option>  
				<option value="`2201`">Kodash [DE]</option>  
				<option value="`1005`">Maguuma</option>  
				<option value="`2206`">Miller's Sound [DE]</option>  
				<option value="`1018`">Northern Shiverpeaks</option>  
				<option value="`2012`">Piken Square</option>  
				<option value="`2005`">Ring of Fire</option>  
				<option value="`2202`">Riverside [DE]</option>  
				<option value="`2009`">Ruins of Surmia</option>  
				<option value="`1013`">Sanctum of Rall</option>  
				<option value="`1016`">Sea of Sorrows</option>  
				<option value="`2010`">Seafarer's Rest</option>  
				<option value="`1006`">Sorrow's Furnace</option>  
				<option value="`1011`">Stormbluff Isle</option>  
				<option value="`1017`">Tarnished Coast</option>  
				<option value="`2006`">Underworld</option>  
				<option value="`2011`">Vabbi</option>  
				<option value="`2104`">Vizunah Square [FR]</option>  
				<option value="`2008`">Whiteside Ridge</option>  
				<option value="`1003`">Yak's Bend</option> 

			</select>
</div>

<div style="float: left; margin-left: 5px;">
	<ul class="navigation">
		<a class="main" href="index.html">Home</a>
	</ul>
</div>	

<div style="float: left; margin-left: 5px;">
	<ul class="navigation">
		<a class="main" href="#">Show</a>
		<li><img src="images/wpNav.png"><input type="checkbox" id="showWaypoints" name="showWaypoints" onClick="markerOptions()"> Waypoint </li>
		<li><img src="images/heartNav.png"><input type="checkbox" id="showHearts" name="showHearts" onClick="markerOptions()"> Hearts</li>
		<li><img src="images/skillNav.png"><input type="checkbox" id="showSkills" name="showSkills" onClick="markerOptions()"> Skills</li>
		<li><img src="images/vistaNav.png"><input type="checkbox" id="showVistas" name="showVistas" onClick="markerOptions()"> Vistas</li>
		<li><img src="images/poiNav.png"><input type="checkbox" id="showPOI" name="showPOI" onClick="markerOptions()"> POI</li>

	</ul>
</div>

<div style="float: left; margin-left: 5px;">
	<ul class="navigation">
		<a class="main" href="#">Options</a>
		<li>Online Options:</li>
		<li><img src="images/trackNav.png"><input type="checkbox" name="trackPlayer" id="trackPlayer"> Auto-Center</li>
		<li><img src="images/footprintNav.png"><input type="checkbox" id="playerFootprints" name="playerFootprints"> Player Trail</li>
		<li><form>Refresh Rate in ms:<input type="text" name="refreshRate" class="refreshRate" id="refreshRate" value="50" style="width: 35px;"></form></li>
		<!--<li><a href="#" onClick="linkAddress = window.prompt('Use this to set the name of the computer that is running Gw2MappingLink','localhost');"><b>Link Location [ALPHA]</b></a></li>-->
		<li></li>
		<li>Offline Options:</li>
		<li>View Map:
			<select onchange="addMarkers(this.options[this.selectedIndex].value);">
				<option value="Lion's Arch (Enemy Controlled)">Lion's Arch</option>
				<option value="Straits of Devastation">Straits of Devastation</option>
				<option value="Gendarran Fields">Gendarran Fields</option>
				<option value="Sparkfly Fen">Sparkfly Fen</option>
				<option value="Snowden Drifts">Snowden Drifts</option>
				<option value="Queensdale">Queensdale</option>
				<option value="Brisban Wildlands">Brisban Wildlands</option>
				<option value="Kessex Hills">Kessex Hills</option>
				<option value="Blazeridge Steppes">Blazeridge Steppes</option>
				<option value="Cursed Shore">Cursed Shore</option>
				<option value="Caledon Forest">Caledon Forest</option>
				<option value="Plains of Ashford">Plains of Ashford</option>
				<option value="Bloodtide Coast">Bloodtide Coast</option>
				<option value="Fireheart Rise">Fireheart Rise</option>
				<option value="Frostgorge Sound">Frostgorge Sound</option>
				<option value="Wayfarer Foothills">Wayfarer Foothills</option>
				<option value="Southsun Cove">Southsun Cove</option>
				<option value="Lornar's Pass">Lornar's Pass</option>
				<option value="Fields of Ruin">Fields of Ruin</option>
				<option value="Dredgehaunt Cliffs">Dredgehaunt Cliffs</option>
				<option value="Timberline Falls">Timberline Falls</option>
				<option value="Metrica Province">Metrica Province</option>
				<option value="Diessa Plateau">Diessa Plateau</option>
				<option value="Harathi Hinterlands">Harathi Hinterlands</option>
				<option value="Mount Maelstrom">Mount Maelstrom</option>
				<option value="Iron Marches">Iron Marches</option>
				<option value="Malchor's Leap">Malchor's Leap</option>
				<option value="Tower of Nightmares">Tower of Nightmares</option>
			</select>
		</li>
		
	</ul>
</div>

<div style="float: left; margin-left: 5px;">
	<ul class="navigation">
		<a class="main" href="gw2mappinglink-v1.2.zip">Download v1.2</a>
	</ul>
</div>

<div style="float: left; margin-left: 5px;">
	<ul class="navigation">
		<a class="main" onclick="document.getElementById('overlay').style.display='block';document.getElementById('fade').style.display='block'" href="javascript:void(0)">Comment</a>
	</ul>
</div>

<div id="overlay">
	<iframe src="comments.html" width="950px" height="500px" seamless="true"></iframe>
	<a onclick="document.getElementById('overlay').style.display='none';document.getElementById('fade').style.display='none'"href="javascript:void(0)"</a>
</div>

<script src="js/leaflet.contextmenu.js"></script>
<div id="map" name="map">
	<script src="js/wvw.js" type="text/javascript"></script>	
</div>

<div style="display:none">
	<div id="data">
	<center>
			<b>Select Your Server:</b><br>
			<select id="serverSelect" style="width: 150px;" onchange="getMatchID(this.options[this.selectedIndex].value);">
				<option value=""></option>
				<option value="`2204`">Abaddon's Mouth [DE]  
				<option value="`1001`">Anvil Rock  
				<option value="`2105`">Arborstone [FR]</option>
				<option value="`2103`">Augury Rock [FR]</option>  
				<option value="`2013`">Aurora Glade  
				<option value="`2301`">Baruch Bay [SP]</option>  
				<option value="`1019`">Blackgate</option>  
				<option value="`2004`">Blacktide</option>  
				<option value="`1002`">Borlis Pass</option>
				<option value="`1014`">Crystal Desert</option>  
				<option value="`1012`">Darkhaven</option>  
				<option value="`2002`">Desolation</option>
				<option value="`1023`">Devona's Rest</option>  
				<option value="`1021`">Dragonbrand</option>  
				<option value="`2205`">Drakkar Lake [DE]</option>  
				<option value="`2207`">Dzagonur [DE]</option>  
				<option value="`1010`">Ehmry Bay</option>  
				<option value="`2203`">Elona Reach [DE]</option>  
				<option value="`1024`">Eredon Terrace</option>  
				<option value="`2007`">Far Shiverpeaks</option>  
				<option value="`1020`">Ferguson's Crossing</option>  
				<option value="`2001`">Fissure of Woe</option>  
				<option value="`1009`">Fort Aspenwood</option>  
				<option value="`2102`">Fort Ranik [FR]</option>  
				<option value="`2003`">Gandara</option>  
				<option value="`1007`">Gate of Madness</option>  
				<option value="`2014`">Gunnar's Hold</option>  
				<option value="`1004`">Henge of Denravi</option>  
				<option value="`1015`">Isle of Janthir</option>  
				<option value="`1008`">Jade Quarry</option>  
				<option value="`2101`">Jade Sea [FR]</option> 
				<option value="`1022`">Kaineng</option>  
				<option value="`2201`">Kodash [DE]</option>  
				<option value="`1005`">Maguuma</option>  
				<option value="`2206`">Miller's Sound [DE]</option>  
				<option value="`1018`">Northern Shiverpeaks</option>  
				<option value="`2012`">Piken Square</option>  
				<option value="`2005`">Ring of Fire</option>  
				<option value="`2202`">Riverside [DE]</option>  
				<option value="`2009`">Ruins of Surmia</option>  
				<option value="`1013`">Sanctum of Rall</option>  
				<option value="`1016`">Sea of Sorrows</option>  
				<option value="`2010`">Seafarer's Rest</option>  
				<option value="`1006`">Sorrow's Furnace</option>  
				<option value="`1011`">Stormbluff Isle</option>  
				<option value="`1017`">Tarnished Coast</option>  
				<option value="`2006`">Underworld</option>  
				<option value="`2011`">Vabbi</option>  
				<option value="`2104`">Vizunah Square [FR]</option>  
				<option value="`2008`">Whiteside Ridge</option>  
				<option value="`1003`">Yak's Bend</option> 

			</select>
			</center>
			Hey thanks for stopping by! 
			<br>
			I've added gathering nodes in the latest update, <br>so to get started please select your server below!
			<br>
			<br>
			
	</div>
</div>
    </body>
</html>
