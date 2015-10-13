$( document ).ready(function() {
  $.fancybox.open('#data');
//alert("Thanks for stopping by!\n\n**IMPORTANT**\nPlease update to Gw2MappingLink-v1.2\n\nRecent Changes:\n1. Fixed bug where no POIs were showing in Bloodtide Coast and Blazeridge Steppes \n2.Added support for basic WVW \n3. Added options to view map points while not connected to linker \n4. Added adjustable refresh rate(requires new updater)\n\n\nLike what I've done? Send me a tip @ Retardeted.9315 \n\nContact: retardeted@gmail.com" );
	});
document.getElementById("showWaypoints").checked = true;
document.getElementById("showHearts").checked = true;
document.getElementById("showSkills").checked = true;
document.getElementById("showVistas").checked = true;
document.getElementById("showPOI").checked = true;

//Global vars
var playerMarker = null;
var cameraMarker = null;
var footprintMarker = null;
var markerGroup;
var footprintGroup;
var mapName = null;
var linkAddress = "localhost"; //Work in progress
var multiplier = 1;
var centerCount = 0;
var interval;
var matchID;
var serverID;
var server;
var southWest;
var northEast;
var map;
var newNodeGroup;
var newNodes = new Array();	
var regionGroup = new L.layerGroup();
var zoneGroup = new L.layerGroup();
var sectorGroup = new L.layerGroup();
var eventGroupFive = new L.layerGroup();
var eventGroupSix = new L.layerGroup();
var eventGroupSeven = new L.layerGroup();
var layerGroup = null;	
var nodeGroup;			  

//function intervals and run once
interval = setInterval("updatePosition()",document.getElementById("refreshRate").value);
//showSectors();

$( ".refreshRate" ).change(function() {
	clearInterval(interval);
	interval = setInterval("updatePosition()",document.getElementById("refreshRate").value);
});
	

//Map related code/functions

//initializing map
map = L.map("map", {
	minZoom: 3,
	maxZoom: 7,
	crs: L.CRS.Simple,
	zoomControl: false,
	contextmenu: true,
	contextmenuItems: [
		{text: 'Add Node:', disabled: true},
		{text: 'Orichalcum', icon: 'images/orichalcum.png', callback: orichalcum},
		{text: 'Omnomberries', icon: 'images/omnomberries.png', callback: omnomberries},
		{text: 'Ancient Wood Log', icon: 'images/ancientwoodlog.png', callback: ancientwoodlog},
		{text: 'Raspberry', icon: 'images/raspberry.png', callback: raspberry},
		{text: 'Snow Truffle', icon: 'images/snowtruffle.png', callback: snowtruffle},
		{text: 'Orrian Truffle', icon: 'images/orriantruffle.png', callback: orriantruffle}
	]
}).setView([-121.5, 131.5], 3);

L.Marker.include(L.Mixin.ContextMenu);
southWest = unproject([0, 32768]);
northEast = unproject([32768, 0]);	
map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

tiles = L.tileLayer("https://tiles.guildwars2.com/1/1/{z}/{x}/{y}.jpg", {
	minZoom: 3,
	maxZoom: 7,
	bounds: [southWest,northEast],
	continuousWorld: true
});
tiles.addTo(map);
map.attributionControl.setPrefix('');
L.control.attribution ({
	prefix: "<a href='https://www.guildwars2.com/en/legal/guild-wars-2-content-terms-of-use/'>&#169; 2014 ArenaNet, Inc.</a>",
	position: 'bottomright',
}).addTo(map);

var osm2 = new L.TileLayer("https://tiles.guildwars2.com/1/1/{z}/{x}/{y}.jpg", {minZoom: 1, maxZoom: 3});
var miniMap = new L.Control.MiniMap(osm2, {toggleDisplay: true, width: 250,	height: 250}).addTo(map);

var sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'left',
			autoPan: true
        });
        map.addControl(sidebar);
//add points to map based on pixel coordinates
function unproject(coord) {
	return map.unproject(coord, map.getMaxZoom());
	
}	

//OnClick
map.on("click", onMapClick);
function onMapClick(e) {
	sidebar.toggle();
}

//Showing location text based on zoom level
map.on('zoomend', function() {
	if(map.getZoom() === 3){
		map.removeLayer(sectorGroup);
		map.addLayer(regionGroup);
		map.removeLayer(zoneGroup);
		map.removeLayer(eventGroupFive);
		map.removeLayer(eventGroupSix);
		map.removeLayer(eventGroupSeven);
		}
	if(map.getZoom() === 4){
		map.removeLayer(sectorGroup);
		map.removeLayer(regionGroup);
		map.addLayer(zoneGroup);
		map.removeLayer(eventGroupFive);
		map.removeLayer(eventGroupSix);
		map.removeLayer(eventGroupSeven);
	}
	if(map.getZoom() === 5){
		map.removeLayer(sectorGroup);
		map.addLayer(zoneGroup);
		map.addLayer(eventGroupFive);
		map.removeLayer(eventGroupSix);
		map.removeLayer(eventGroupSeven);
	}
	if(map.getZoom() === 6){
		map.addLayer(sectorGroup);
		map.removeLayer(zoneGroup);
		map.removeLayer(eventGroupFive);
		map.addLayer(eventGroupSix);
		map.removeLayer(eventGroupSeven);
	}
	if(map.getZoom() === 7){
		map.addLayer(sectorGroup);
		map.removeLayer(zoneGroup);
		map.removeLayer(eventGroupFive);
		map.removeLayer(eventGroupSix);
		map.addLayer(eventGroupSeven);
	}
	
	
});


//////////MAIN FUNCTIONS////////////

//right-click menu functions
function orichalcum (e) {
	var server = document.getElementById('serverSelect').options[document.getElementById('serverSelect').selectedIndex].value;
	post("orichalcum",e.latlng.lat,e.latlng.lng,server);
	newNodes.push(L.marker(([e.latlng.lat, e.latlng.lng]), { icon: new orichalcumIcon(), title: "Orichalcum" }).addTo(map));
	newNodeGroup = L.layerGroup(newNodes);
	newNodeGroup.addTo(map);
  }
function omnomberries (e) {
	var server = document.getElementById('serverSelect').options[document.getElementById('serverSelect').selectedIndex].value;
	post("omnomberries",e.latlng.lat,e.latlng.lng,server);
	newNodes.push(L.marker(([e.latlng.lat, e.latlng.lng]), { icon: new omnomberriesIcon(), title: "Omnomberries" }).addTo(map));
	newNodeGroup = L.layerGroup(newNodes);
	newNodeGroup.addTo(map);
  }  
function ancientwoodlog (e) {
	var server = document.getElementById('serverSelect').options[document.getElementById('serverSelect').selectedIndex].value;
	post("ancientwoodlog",e.latlng.lat,e.latlng.lng,server);
	newNodes.push(L.marker(([e.latlng.lat, e.latlng.lng]), { icon: new ancientwoodlogIcon(), title: "Ancient Wood Log" }).addTo(map));
	newNodeGroup = L.layerGroup(newNodes);
	newNodeGroup.addTo(map);
  } 
function raspberry (e) {
	var server = document.getElementById('serverSelect').options[document.getElementById('serverSelect').selectedIndex].value;
	post("raspberry",e.latlng.lat,e.latlng.lng,server);
	newNodes.push(L.marker(([e.latlng.lat, e.latlng.lng]), { icon: new raspberryIcon(), title: "Raspberry" }).addTo(map));
	newNodeGroup = L.layerGroup(newNodes);
	newNodeGroup.addTo(map);
  }  
function snowtruffle (e) {
	var server = document.getElementById('serverSelect').options[document.getElementById('serverSelect').selectedIndex].value;
	post("snowtruffle",e.latlng.lat,e.latlng.lng,server);
	newNodes.push(L.marker(([e.latlng.lat, e.latlng.lng]), { icon: new snowtruffleIcon(), title: "Snow Truffle" }).addTo(map));
	newNodeGroup = L.layerGroup(newNodes);
	newNodeGroup.addTo(map);
  }
function orriantruffle (e) {
	var server = document.getElementById('serverSelect').options[document.getElementById('serverSelect').selectedIndex].value;
	post("orriantruffle",e.latlng.lat,e.latlng.lng,server);
	newNodes.push(L.marker(([e.latlng.lat, e.latlng.lng]), { icon: new orriantruffleIcon(), title: "Orrian Truffle" }).addTo(map));
	newNodeGroup = L.layerGroup(newNodes);
	newNodeGroup.addTo(map);
  }	
  
 //Adding points from API
 function addMarkers(mapName) {	
	if(layerGroup != null){
		layerGroup.clearLayers();
	}
	
	$.getJSON("https://api.guildwars2.com/v1/map_floor.json?continent_id=1&floor=2", function (data) {
		var points = new Array();			
		var region, gameMap, i, il, poi, j, jl, skill, k, kl, l,ll, heart;            
		for (region in data.regions) {
			region = data.regions[region];
			for (gameMap in region.maps) {
				var mapNum = gameMap;
				gameMap = region.maps[gameMap];
				if(gameMap.name == mapName){
					for (i = 0, il = gameMap.points_of_interest.length; i < il; i++) {
						poi = gameMap.points_of_interest[i];
						if (poi.type == "waypoint") {
							if($('input[name=showWaypoints]').is(':checked')){
								var wpIcon = new waypointIcon();
								waypoint = L.marker(unproject([poi.coord[0]* multiplier,poi.coord[1]* multiplier]), {
								title: poi.name + " (" + poi.coord + ")", icon: wpIcon
								});
								points.push(waypoint);
							}
						}
						
						else if (poi.type == "vista") {
							if($('input[name=showVistas]').is(':checked')){
								var vistaIcon = new vistaPointIcon();
								var vista = L.marker(unproject([poi.coord[0]* multiplier,poi.coord[1]* multiplier]), {
								title: poi.name + " (" + poi.coord + ")", icon: vistaIcon
								});
								points.push(vista);
							}
						}			

						else if (poi.type == "landmark") {
							if($('input[name=showPOI]').is(':checked')){
								var poiIcon = new pointOfInterestIcon();
								var	pointOfIntrest = L.marker(unproject([poi.coord[0]* multiplier,poi.coord[1]* multiplier]), {
								title: poi.name + " (" + poi.coord + ")", icon: poiIcon
							});
								points.push(pointOfIntrest);
							}
						}
					}
											
					for (j = 0, jl = gameMap.skill_challenges.length; j < jl; j++) {
						if($('input[name=showSkills]').is(':checked')){
							skill = gameMap.skill_challenges[j];
							var skillIcon = new skillChallengeIcon();
							var	skillChallenge = L.marker(unproject([skill.coord[0]* multiplier,skill.coord[1]* multiplier]), {
							title: "Skill Challenge", icon: skillIcon
						});
							points.push(skillChallenge);
						}
					}
					
					for (k = 0, kl = gameMap.tasks.length; k < kl; k++) {
						if($('input[name=showHearts]').is(':checked')){
							heart = gameMap.tasks[k];
							var heartIcon = new heartQuestIcon();
							var heartQuest = L.marker(unproject([heart.coord[0]* multiplier,heart.coord[1]* multiplier]), {
							title: "Heart Quest", icon: heartIcon
						});
							points.push(heartQuest);
						}
					}
				}	
			}
		}
	layerGroup = L.layerGroup(points);
	layerGroup.addTo(map);
	});	
	
}

//Updating player position from Gw2MappingLink
function updatePosition() {	
	$.getJSON("http://localhost:1337/",  function (jsonData) {
		var markers = new Array();
		var footprints = new Array();
		if (jsonData.mapName !== mapName){
			addMarkers(jsonData.mapName);
			mapName = jsonData.mapName;
		}
		if (markerGroup != null) {
		   markerGroup.clearLayers();
		}
		
		var pX = jsonData.posX;
		var pY = jsonData.posY;
		var posX = parseFloat(pX.replace(',', '.'));
		var posY = parseFloat(pY.replace(',', '.'));
		
		var pR = jsonData.playerRotation;
		var cR = jsonData.camRotation;
		var playerRotation = parseFloat(pR.replace(',', '.'));
		var cameraRotation = parseFloat(cR.replace(',', '.'));
		
		playerMarker = L.marker(unproject([posX * multiplier, posY * multiplier]), { icon: new playerIcon(), title: "test" });
		cameraMarker = L.marker(unproject([posX * multiplier, posY * multiplier]), { icon: new cameraIcon(), title: "test" });
		footprintMarker = L.marker(unproject([posX * multiplier, posY * multiplier]), { icon: new footprintIcon(), title: "test" });
		
		markers.push(playerMarker);
		markers.push(cameraMarker);		
		footprints.push(footprintMarker);
		
		markerGroup = L.layerGroup(markers);
		footprintGroup = L.layerGroup(footprints);

		markerGroup.addTo(map);
		if($('input[name=playerFootprints]').is(':checked')){
			footprintGroup.addTo(map);
			footprintMarker._icon.style[L.DomUtil.TRANSFORM] += ' rotate(-'+playerRotation+'deg)';
		}
		
		playerMarker._icon.style[L.DomUtil.TRANSFORM] += ' rotate(-'+playerRotation+'deg)';
		cameraMarker._icon.style[L.DomUtil.TRANSFORM] += ' rotate(-'+cameraRotation+'deg)';
		
		if($('input[name=trackPlayer]').is(':checked') && centerCount >= 10){
			map.panTo(unproject([posX * multiplier, posY * multiplier]));
			centerCount = 0;
		}
			
	});
	centerCount +=1;
}
	
//Adding Markers Based on Checkboxes
function markerOptions() {	
	$.getJSON("http://localhost:1337/",  function (jsonData) {
		var markers = new Array();
			addMarkers(jsonData.mapName);
			mapName = jsonData.mapName;
	})
}

//Getting Sector and area names from API for use with zoom level
showSectors();
function showSectors() {
	$.getJSON("https://api.guildwars2.com/v1/map_floor.json?continent_id=1&floor=2", function (data) {
		var points = new Array();			
		var region, gameMap, i, il, poi, j, jl, skill, k, kl, l,ll, heart;            
		for (region in data.regions) {
			region = data.regions[region];
			for (regionName in region){
				regionName = region[regionName];
				for(mapName in regionName){
					mapName = regionName[mapName];
					console.log(mapName);
				}
			}
			regionGroup.addLayer(L.marker(unproject([region.label_coord[0]+1650,region.label_coord[1]+1000]), {icon: L.divIcon({className: 'region-icon',html: region.name,iconSize: [300, 150]}), title: "timer"}));
			for (gameMap in region.maps) {
				var mapNum = gameMap;
				gameMap = region.maps[gameMap];
				for (l = 0, ll = gameMap.sectors.length; l < ll; l++) {
							var sectorName = "<b>"+gameMap.sectors[l].name+"</b>";
							//console.log(gameMap.sectors[l].name +" is at coordinate ["+gameMap.sectors[l].coord[0]+","+gameMap.sectors[l].coord[1]+"]");
							sectorGroup.addLayer(L.marker(unproject([gameMap.sectors[l].coord[0],gameMap.sectors[l].coord[1]]), {icon: L.divIcon({className: 'sector-icon',html: sectorName,iconSize: [150, 15]}), title: "timer"}));
							//sectorGroup.addTo(map);
							
				}
			}
		}
	});
	map.addLayer(regionGroup);
	zoneGroup.addLayer(L.marker(([-100.375,91.1785]), {icon: L.divIcon({className: 'zone-icon',html: "Queensdale",iconSize: [110, 35]}), title: "Queensdale"}));
	zoneGroup.addLayer(L.marker(([-118.1875,89]), {icon: L.divIcon({className: 'zone-icon',html: "Kessex Hills",iconSize: [150, 35]}), title: "Kessex Hills"}));
	zoneGroup.addLayer(L.marker(([-85.0625,121.125]), {icon: L.divIcon({className: 'zone-icon',html: "Hirathi Hinterlands",iconSize: [300, 35]}), title: "Hirathi Hinterlands"}));
	zoneGroup.addLayer(L.marker(([-103.75,123.1875]), {icon: L.divIcon({className: 'zone-icon',html: "Gendarran Fields",iconSize: [250, 35]}), title: "Gendarran Fields"}));
	zoneGroup.addLayer(L.marker(([-118.40625,128.84375]), {icon: L.divIcon({className: 'zone-icon',html: "Lion's Arch",iconSize: [150, 35]}), title: "Lion's Arch"}));
	zoneGroup.addLayer(L.marker(([-136.65625,129.5625]), {icon: L.divIcon({className: 'zone-icon',html: "Bloodtide Coast",iconSize: [75, 35]}), title: "Bloodtide Coast"}));
	zoneGroup.addLayer(L.marker(([-139.125,81]), {icon: L.divIcon({className: 'zone-icon',html: "Caledon Forrest",iconSize: [75, 35]}), title: "Caledon Forrest"}));
	zoneGroup.addLayer(L.marker(([-145.25,65.5625]), {icon: L.divIcon({className: 'zone-icon',html: "Metrica Province",iconSize: [75, 35]}), title: "Metrica Province"}));
	zoneGroup.addLayer(L.marker(([-123.3125,60.8125]), {icon: L.divIcon({className: 'zone-icon',html: "Brisban Wildlands",iconSize: [75, 35]}), title: "Brisban Wildlands"}));
	
}	

//Dynamic Events

var eventsArray = new Array();
function getDynamicEvents(serverID){
	eventsArray = []
	$.getJSON("https://api.guildwars2.com/v1/events.json?world_id="+serverID, function (data) {
		var event;
		for (event in data.events){
			event = data.events[event];
			if(event.state == "Active"){
				eventsArray[event.event_id] = new Object;
				eventsArray[event.event_id].eventID = event.event_id;
				eventsArray[event.event_id].mapID = event.map_id;
			}
		}
		getEventMapNames();
	});
}

function getEventMapNames(){
	$.getJSON("https://api.guildwars2.com/v1/map_names.json", function (data) {
		for(var id in data){
			id = data[id];
			for(var i in eventsArray){
				if(eventsArray[i].mapID == id.id){
					eventsArray[i].mapName = id.name;
				}
			}
		}
		getEventMapInfo();
	});
}

function getEventMapInfo(){
	$.getJSON("https://api.guildwars2.com/v1/maps.json", function (data) {
		for(var maps in data.maps){
			maps = data.maps[maps];
			for(var i in eventsArray){
				if(eventsArray[i].mapName == maps.map_name){
					eventsArray[i].mLeft = maps.map_rect[0][0];
					eventsArray[i].mTop = maps.map_rect[0][1];
					eventsArray[i].mWidth = maps.map_rect[1][0] - maps.map_rect[0][0];
					eventsArray[i].mHeight = maps.map_rect[1][1] - maps.map_rect[0][1];
					eventsArray[i].cLeft = maps.continent_rect[0][0];
					eventsArray[i].cTop = maps.continent_rect[0][1];
					eventsArray[i].cWidth = maps.continent_rect[1][0] - maps.continent_rect[0][0];
					eventsArray[i].cHeight = maps.continent_rect[1][1] - maps.continent_rect[0][1];	
				}
			}
		}
	getEventInfo();	
	});	
}

function getEventInfo(){
	$.getJSON("https://api.guildwars2.com/v1/event_details.json", function (data) {	
		if(eventGroupFive !=null){
			eventGroupFive.clearLayers();
			eventGroupSix.clearLayers();
			eventGroupSeven.clearLayers();
		}
		for(var events in data.events){
			for(var i in eventsArray){
				if(eventsArray[i].eventID == events){
					events = data.events[events];
					eventsArray[i].mapPctZero = ((events.location.center[0]) - eventsArray[i].mLeft) / eventsArray[i].mWidth;
					eventsArray[i].mapPctOne = ((events.location.center[1]) - eventsArray[i].mTop) / eventsArray[i].mHeight;
					eventsArray[i].eventPosX = (eventsArray[i].cLeft + (eventsArray[i].cWidth * eventsArray[i].mapPctZero));
					eventsArray[i].eventPosY = ((eventsArray[i].cTop + eventsArray[i].cHeight) - (eventsArray[i].cHeight * eventsArray[i].mapPctOne));
					eventsArray[i].title = events.name;
					eventGroupFive.addLayer(L.marker(unproject([eventsArray[i].eventPosX,eventsArray[i].eventPosY]), {icon: new eventIconFive({iconSize:[50,50]}), title: eventsArray[i].title}));
					eventGroupSix.addLayer(L.marker(unproject([eventsArray[i].eventPosX,eventsArray[i].eventPosY]), {icon: new eventIconSix({iconSize:[75,75]}), title: eventsArray[i].title}));
					eventGroupSeven.addLayer(L.marker(unproject([eventsArray[i].eventPosX,eventsArray[i].eventPosY]), {icon: new eventIconSeven({iconSize:[150,150]}), title: eventsArray[i].title}));
				}
			}
		}
	});	
}

/////DATABASE FUNCTIONS/////

//Get gathering nodes based on server name from db
function showServer(serverName){
	serverID = serverName.replace("`","");
	serverID = serverID.replace("`","");
	getDynamicEvents(serverID);
	setInterval("getDynamicEvents("+serverID+")",5000);

	if (window.XMLHttpRequest){
	  xmlhttp=new XMLHttpRequest();
	}
	else{
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			if (newNodeGroup != null){
				newNodeGroup.clearLayers();
			}
			if (nodeGroup != null){
				nodeGroup.clearLayers();
				newNodes = [];
			}
			var nodes = new Array();
			//console.log(xmlhttp.responseText);
			var pointArray = xmlhttp.responseText.split("|");
				for(var i in pointArray){
					//console.log(pointArray[i]);
					if(typeof xmlhttp.responseText !== "undefined"){
						eval("nodes.push("+pointArray[i]+")");
						
					}	
				}
			nodeGroup = L.layerGroup(nodes);
			nodeGroup.addTo(map);
		}
	}
	xmlhttp.open("GET","getServerNodes.php?serverName="+serverName+"",true);
	xmlhttp.send();
	$.fancybox.close('#data');
}

//Report wrong node php post function
function reportIncorrect (id) {
	alert("Node has been reported, thank you!");
	nodeGroup.clearLayers();
	var server = document.getElementById('serverSelect').options[document.getElementById('serverSelect').selectedIndex].value;
	var hr = new XMLHttpRequest();
	var url = "reportNode.php";
	var vars = "id="+id+"&server="+server+"";
	hr.open("POST", url, true);
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	hr.onreadystatechange = function() {
		if(hr.readyState == 4 && hr.status == 200) {
			var return_data = hr.responseText;
		}	
	}	
	hr.send(vars);
	showServer(document.getElementById('serverSelect').options[document.getElementById('serverSelect').selectedIndex].value);
}

//Post new node to db
function post(nt,cx,cy,server){
	var hr = new XMLHttpRequest();
	var url = "addNode.php";
	var id = Math.floor((Math.random()*8999)+1000);
	var vars = "id="+id+"&node_type="+nt+"&coordinateX="+cx+"&coordinateY="+cy+"&server="+server;
	hr.open("POST", url, true);
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	hr.onreadystatechange = function() {
		if(hr.readyState == 4 && hr.status == 200) {
			var return_data = hr.responseText;
		}
	}
	hr.send(vars);
}
