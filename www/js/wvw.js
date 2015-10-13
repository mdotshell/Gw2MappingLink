$( document ).ready(function() {
  $.fancybox.open('#data');
//alert("Thanks for stopping by!\n\n**IMPORTANT**\nPlease update to Gw2MappingLink-v1.2\n\nRecent Changes:\n1. Fixed bug where no POIs were showing in Bloodtide Coast and Blazeridge Steppes \n2.Added support for basic WVW \n3. Added options to view map points while not connected to linker \n4. Added adjustable refresh rate(requires new updater)\n\n\nLike what I've done? Send me a tip @ Retardeted.9315 \n\nContact: retardeted@gmail.com" );
	});

//Global vars
var playerMarker = null;
var cameraMarker = null;
var footprintMarker = null;
var markerGroup;
var footprintGroup;
var mapName = null;
var currentContinent = 1; //continent as used for WvW
var multiplier = 2; //WvW coordinates must be multiplied be 2 to be accurate, while PVE is accurate already. Could update Linker to publish this instead of relying on JS
var continent = 2;
var linkAddress = "localhost"; //Work in progress
var centerCount = 0;
var interval;
var matchID;
var worldID;
var layerGroup = null;	
var map;
var southWest, northEast;
var redWorldId,blueWorldId,greenWorldId;
var RedTeamName,BlueTeamName,GreenTeamName;  
var previousOwner = "Red"; 
var IDS = new Array();
var IDSLayerGroup = new Array();
var IDSGroup = new Array();
var timers = new Array();
var timeLayerGroup = new Array();
var regionGroupThree = new L.layerGroup(), regionGroupFour = new L.layerGroup();
var oGroupFour = new L.layerGroup(), oGroupFive = new L.layerGroup(), oGroupSix = new L.layerGroup();
var timeGroupFour = new L.layerGroup(), timeGroupFive = new L.layerGroup(), timeGroupSix = new L.layerGroup();

interval = setInterval("updatePosition()",document.getElementById("refreshRate").value);


//update refresh rate on form change
$( ".refreshRate" ).change(function() {
	clearInterval(interval);
	interval = setInterval("updatePosition()",document.getElementById("refreshRate").value);
});
		


/////MAP/////
 function unproject(coord) {
            return map.unproject(coord, map.getMaxZoom());
			
}
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
}).setView([-197.25,165.125], 3);

southWest = unproject([0, 32768]);
northEast = unproject([32768, 0]);

map.setMaxBounds(new L.LatLngBounds(southWest, northEast));
tiles = L.tileLayer("https://tiles.guildwars2.com/2/1/{z}/{x}/{y}.jpg", {
	minZoom: 3,
	maxZoom: 6,
	continuousWorld: true
});
tiles.addTo(map);

map.attributionControl.setPrefix('');
L.control.attribution ({
	prefix: "<a href='https://www.guildwars2.com/en/legal/guild-wars-2-content-terms-of-use/'>&#169; 2014 ArenaNet, Inc.</a>",
	position: 'bottomright',
}).addTo(map);
		
var sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'left',
			autoPan: true
});
map.addControl(sidebar);		

map.on("click", onMapClick);
function onMapClick(e) {
	//sidebar.toggle();
	console.log(e.latlng);
}		

map.on('zoomend', function() {
	if(map.getZoom() === 3){
		map.addLayer(regionGroupThree);
		map.removeLayer(regionGroupFour);
		map.removeLayer(oGroupFour);
		map.removeLayer(oGroupFive);
		map.removeLayer(oGroupSix);
	}
	if(map.getZoom() === 4){
		map.addLayer(regionGroupFour);
		map.removeLayer(regionGroupThree);
		map.addLayer(oGroupFour);
		map.removeLayer(oGroupFive);
		map.removeLayer(oGroupSix);
	}
	if(map.getZoom() === 5){
		map.addLayer(oGroupFive);
		map.removeLayer(oGroupFour);
		map.removeLayer(oGroupSix);

	}
	if(map.getZoom() === 6){
		map.addLayer(oGroupSix);
		map.removeLayer(oGroupFive);
		map.removeLayer(oGroupFour);
	}
	if(map.getZoom() === 7){
		console.log(map.getZoom());

	}
	
	
});

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
	


function addMarkers(mapName) {	
		if(layerGroup != null){
			layerGroup.clearLayers();
		}
		//placement of points of interest as pulled from the API
		$.getJSON("https://api.guildwars2.com/v1/map_floor.json?continent_id=2&floor=1", function (data) {
			var points = new Array();			
            var region, gameMap, i, il, poi, j, jl, skill, k, kl, heart;            
            for (region in data.regions) {
                region = data.regions[region];
                for (gameMap in region.maps) {
                    var mapNum = gameMap;
                    gameMap = region.maps[gameMap];
					if(gameMap.name == mapName)
					{
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
            }
		layerGroup = L.layerGroup(points);
		layerGroup.addTo(map);
        });	
		
}

function updatePosition() {	
	if(currentContinent != continent) {
		tiles.setUrl("https://tiles.guildwars2.com/2/1/{z}/{x}/{y}.jpg");
		currentContinent = continent;
	}
	$.getJSON("http://localhost:1337/",  function (jsonData) {
		var markers = new Array();
		var footprints = new Array();
		if(jsonData.mapName == " Borderlands" || jsonData.mapName == "Eternal Battlegrounds" || jsonData.mapName == "Edge of the Mists" || jsonData.mapName == "Obsidian Sanctum"){
			continent = 2;
			multiplier = 2;
		}
		else{
			continent = 1;
			multiplier = 1;
		}
		if (jsonData.mapName !== mapName){
			//console.log(mapName);
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
		
		//Player tracking. centerCount used to keep centering from happening too fast
		if($('input[name=trackPlayer]').is(':checked') && centerCount >= 10){
			map.panTo(unproject([posX * multiplier, posY * multiplier]));
			centerCount = 0;
		}
			
	});
	centerCount +=1;
}
		
	//Used only from GUI check boxes to create a marker's array based on what is selected	
function markerOptions() {	
		$.getJSON("http://localhost:1337/",  function (jsonData) {
			var markers = new Array();
			addMarkers(jsonData.mapName);
			mapName = jsonData.mapName;
		});
}
        
		
 //////WORLD VS WORLD SECTION//////	
 
function getMatchID(worldID) {
	$.fancybox.close('#data');
	worldID = worldID.replace("`","");
	worldID = worldID.replace("`","");
	$.getJSON("https://api.guildwars2.com/v1/wvw/matches.json", function (data) {
		for (match in data.wvw_matches) {
			match = data.wvw_matches[match];
			if(match.red_world_id == worldID || match.blue_world_id == worldID || match.green_world_id == worldID){
				matchID = match.wvw_match_id;
				redWorldId = match.red_world_id;
				blueWorldId = match.blue_world_id;
				greenWorldId = match.green_world_id;
				getTeamNames();
				setInterval("matchDetails('"+matchID+"')",2000);				
			}			
		}
	});
}

function getTeamNames(){
	$.getJSON("https://api.guildwars2.com/v1/world_names.json", function (data) {
		for( o in data){
			o = data[o];
			if (o.id == redWorldId){
				RedTeamName = o.name
			}
			if (o.id == blueWorldId){
				BlueTeamName = o.name
			}	
			if (o.id == greenWorldId){
				GreenTeamName = o.name
			}	
		}
		//green
		regionGroupThree.addLayer(L.marker(([-179.625+5,108.5]), {icon: L.divIcon({className: 'wvwzone-iconThree',html: "<center>"+GreenTeamName +"<br> Borderland</center>",iconSize: [300, 35]}), title: GreenTeamName +" Borderland"}));
		regionGroupFour.addLayer(L.marker(([-179.625+3,108.5]), {icon: L.divIcon({className: 'wvwzone-iconFour',html: "<center>"+GreenTeamName +"<br> Borderland</center>",iconSize: [300, 35]}), title: GreenTeamName +" Borderland"}));
		//red
		regionGroupThree.addLayer(L.marker(([-137.625 +3 ,167.375 -3]), {icon: L.divIcon({className: 'wvwzone-iconThree',html: "<center>"+RedTeamName +"<br> Borderland</center>",iconSize: [300, 35]}), title: RedTeamName +" Borderland"}));
		regionGroupFour.addLayer(L.marker(([-137.625 ,167.375 -3]), {icon: L.divIcon({className: 'wvwzone-iconFour',html: "<center>"+RedTeamName +"<br> Borderland</center>",iconSize: [300, 35]}), title: RedTeamName +" Borderland"}));
		//blue
		regionGroupThree.addLayer(L.marker(([-167+4,220.5]), {icon: L.divIcon({className: 'wvwzone-iconThree',html: "<center>"+BlueTeamName +"<br> Borderland</center>",iconSize: [300, 35]}), title: BlueTeamName +" Borderland"}));
		regionGroupFour.addLayer(L.marker(([-167,220.5]), {icon: L.divIcon({className: 'wvwzone-iconFour',html: "<center>"+BlueTeamName +"<br> Borderland</center>",iconSize: [300, 35]}), title: BlueTeamName +" Borderland"}));

		map.addLayer(regionGroupThree);
	
		
	});
}
			
function matchDetails(matchID){
	$.getJSON("https://api.guildwars2.com/v1/wvw/match_details.json?match_id="+matchID, function (wvwData) {
		var objectives = new Array();
		for (wvwMap in wvwData.maps){
			wvwMap = wvwData.maps[wvwMap];
			for (objective in wvwMap.objectives){
				objective = wvwMap.objectives[objective];
				if (typeof IDS[objective.id] == "undefined"){ //if variable in array not exists, create it.
					updateOwners(objective.id,objective.owner,"f"); //call function to create point
					IDS[objective.id] = objective.owner; //creates array variable with name of objective.id and value of objective.owner (IE: IDS33 = Green)
				}
				if(IDS[objective.id] != objective.owner){ //checks to see if they arent equal, if they aren't it updates the point and sets them back equal
					//createTimers(objective.id);
					updateOwners(objective.id,objective.owner,"t");	
					previousOwner = IDS[objective.id];
					IDS[objective.id] = objective.owner; //setting it back equal
					
				}					
			}				
		}
	});
	
}

function updateOwners(id,owner,tf){
	$.getJSON("wvwObjectives.json", function (wvwData) {
		var icon;
		if (wvwData[id].type == "camp"){
			icon = owner+"CampIcon()";
		}
		if (wvwData[id].type == "tower"){
			icon = owner+"TowerIcon()";
		}
		if (wvwData[id].type == "castle"){
			icon = owner+"CastleIcon()";
		}
		if (wvwData[id].type == "ruin"){
			icon = "RedCastleIcon()";
		}
		if (wvwData[id].type == "keep"){
		
			icon = owner+"CastleIcon()";
		}
		
		if (IDSLayerGroup[id] != null){
			IDSLayerGroup[id].clearLayers();
		}	
		if(tf == "t" && wvwData[id].type != "ruin"){
			createTimers(id)
		}
		console.log(eval(owner+"TeamName") + " has taken " + wvwData[id].name.en +" from " + eval(previousOwner+"TeamName"));
		previousOwner = owner;		
		IDSLayerGroup[id] = new L.layerGroup();
		IDSLayerGroup[id].addLayer(L.marker(unproject([wvwData[id].coords[0]*2,wvwData[id].coords[1]*2]), {icon: eval("new "+ icon), title: wvwData[id].name.en}));
		oGroupFour.addLayer(L.marker(unproject([wvwData[id].coords[0]*2,wvwData[id].coords[1]*2+150]), {icon: L.divIcon({className: 'oIconFour',html: "<center>"+wvwData[id].name.en+"</center>",iconSize: [300, 35]})}));
		oGroupFive.addLayer(L.marker(unproject([wvwData[id].coords[0]*2,wvwData[id].coords[1]*2+100]), {icon: L.divIcon({className: 'oIconFive',html: "<center>"+wvwData[id].name.en+"</center>",iconSize: [300, 35]})}));
		oGroupSix.addLayer(L.marker(unproject([wvwData[id].coords[0]*2,wvwData[id].coords[1]*2+50]), {icon: L.divIcon({className: 'oIconFive',html: "<center>"+wvwData[id].name.en+"</center>",iconSize: [300, 35]})}));
		IDSLayerGroup[id].addTo(map);			
	});
		
		
}
		
function createTimers(id){
	$.getJSON("wvwObjectives.json", function (wvwData) {	
		timers[id] = new Object;
		timers[id].time = 300;
		timers[id].coordX = wvwData[id].coords[0]*2;
		timers[id].coordY = wvwData[id].coords[1]*2;
		timers[id].id = wvwData[id];
	});
}

setInterval("updateTimers()",1000);
function updateTimers(){
	for(i in timers){
		if(timeLayerGroup[i] != null){
			timeLayerGroup[i].clearLayers();
		}
		if(timers[i] != null){
			var minutes = Math.floor(timers[i].time / 60);
			var seconds = timers[i].time - minutes * 60
			if (seconds < 10){
				seconds = "0"+seconds;
			}
			var time = minutes+":"+seconds;
			timeLayerGroup[i] = new L.layerGroup();
			timeLayerGroup[i].addLayer(L.marker(unproject([timers[i].coordX,timers[i].coordY-60]), {zIndexOffset: 1000, icon: L.divIcon({className: 'timeIcon',html: time,iconSize: [30, 15]}), title: "timer"}));
			timeLayerGroup[i].addTo(map);
			if(timers[i].time == "0"){
				timers[i] = null;
				timeLayerGroup[i].clearLayers();
			}
			if(timers[i].time != null){
				timers[i].time--;
			}
		}
		
	}	
}


		
		
		
		
		
		