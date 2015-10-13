<!DOCTYPE html>
<html>
    <head>
        <title>Guild Wars 2 Mapping Link</title>
        <link rel="stylesheet" href="css/leaflet.css" />
		<link rel="stylesheet" href="css/style.css" />
		<link rel="stylesheet" href="css/leaflet.contextmenu.css" />
		<link rel="stylesheet" href="css/jquery.fancybox.css" />
		<script src="js/jquery.min.js"></script>
        <script src="js/leaflet.js"></script>
		<script src="js/icons.js"></script>	
		<script src="js/jquery.fancybox.pack.js"></script>
		<script src="js/jquery.fancybox.js"></script>
    </head>
		
<body>

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
	<script src="js/pve.js" type="text/javascript"></script>	
</div>
<div style="display:none">
	<div id="data">
	<center>
			<b>Select Your Server:</b><br>
			<select id="serverSelect" style="width: 150px;" onchange="showServer(this.options[this.selectedIndex].value);">
				<option value=""></option>
				<option value="abaddons_mouth">Abaddon's Mouth [DE]  
				<option value="anvil_rock">Anvil Rock  
				<option value="arborstone">Arborstone [FR]</option>
				<option value="augury_rock">Augury Rock [FR]</option>  
				<option value="aurora_glade">Aurora Glade  
				<option value="baruch_bay">Baruch Bay [SP]</option>  
				<option value="blackgate">Blackgate</option>  
				<option value="blacktide">Blacktide</option>  
				<option value="borlis_pass">Borlis Pass</option>
				<option value="crystal_desert">Crystal Desert</option>  
				<option value="darkhaven">Darkhaven</option>  
				<option value="desolation">Desolation</option>
				<option value="devonas_rest">Devona's Rest</option>  
				<option value="dragonbrand">Dragonbrand</option>  
				<option value="drakkar_lake">Drakkar Lake [DE]</option>  
				<option value="dzagonur">Dzagonur [DE]</option>  
				<option value="ehmry_bay">Ehmry Bay</option>  
				<option value="elona_reach">Elona Reach [DE]</option>  
				<option value="eredon_terrace">Eredon Terrace</option>  
				<option value="far_shiverpeaks">Far Shiverpeaks</option>  
				<option value="fergusons_crosing">Ferguson's Crossing</option>  
				<option value="fissure_of_woe">Fissure of Woe</option>  
				<option value="fort_aspenwood">Fort Aspenwood</option>  
				<option value="fort_ranik">Fort Ranik [FR]</option>  
				<option value="gandara">Gandara</option>  
				<option value="gate_of_madness">Gate of Madness</option>  
				<option value="gummars_hold">Gunnar's Hold</option>  
				<option value="henge_of_denravi">Henge of Denravi</option>  
				<option value="isle_of_janthir">Isle of Janthir</option>  
				<option value="jade_quarry">Jade Quarry</option>  
				<option value="jade_sea">Jade Sea [FR]</option> 
				<option value="kaineng">Kaineng</option>  
				<option value="kodash">Kodash [DE]</option>  
				<option value="maguuma">Maguuma</option>  
				<option value="millers_sound">Miller's Sound [DE]</option>  
				<option value="northern_shiverpeaks">Northern Shiverpeaks</option>  
				<option value="piken_square">Piken Square</option>  
				<option value="ring_of_fire">Ring of Fire</option>  
				<option value="riverside">Riverside [DE]</option>  
				<option value="ruins_of_surmia">Ruins of Surmia</option>  
				<option value="sancutm_of_rall">Sanctum of Rall</option>  
				<option value="sea_of_sorrows">Sea of Sorrows</option>  
				<option value="seafarers_rest">Seafarer's Rest</option>  
				<option value="sorrows_furnace">Sorrow's Furnace</option>  
				<option value="stormbluff_isle">Stormbluff Isle</option>  
				<option value="tarnished_coast">Tarnished Coast</option>  
				<option value="underworld">Underworld</option>  
				<option value="vabbi">Vabbi</option>  
				<option value="vizunah_square">Vizunah Square [FR]</option>  
				<option value="whiteside_ridge">Whiteside Ridge</option>  
				<option value="yaks_bend">Yak's Bend</option> 

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
