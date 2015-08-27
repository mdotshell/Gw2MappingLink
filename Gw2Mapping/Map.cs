using System;
using System.Net;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Gw2MappingLink
{
    class Map
    {
        // TODO: Move this out of map?
        private class Coordinate
        {
            public string posX { get; set; }
            public string posY { get; set; }
            public string camRotation { get; set; }
            public string playerRotation { get; set; }
            public string mapName { get; set; }
            public string worldID { get; set; }
        }

        public int currentID { get; private set; }
        public string currentName { get; private set; }
        public int mLeft { get; private set; }
        public int mTop { get; private set; }
        public int mWidth { get; private set; }
        public int mHeight { get; private set; }
        public int cLeft { get; private set; }
        public int cTop { get; private set; }
        public int cWidth { get; private set; }
        public int cHeight { get; private set; }
        public float playerPosX { get; set; }
        public float playerPosY { get; set; }
        public int worldID { get; set; }
        private Coordinate coordinate { get; set; }

        public Map()
        {
            this.currentID = 0;
            this.currentName = string.Empty;
        }

        /// <summary>
        /// Get the map data from Guild Wars 2 API.
        /// </summary>
        /// <param name="mapID">The ID of the map to retrieve.</param>
        public void GetData(int currentMapID)
        {
            this.currentID = currentMapID;

            if (this.currentID == 0) return;

            string mapID = this.currentID.ToString();

            //Get JSON data from gw2 map API
            WebClient c = new WebClient();
            var data = c.DownloadString("https://api.guildwars2.com/v1/maps.json?map_id=" + mapID);                   
            JObject o = JObject.Parse(data);
            dynamic mapData = JsonConvert.DeserializeObject(data);

            //Gets X,Y coordinates for map_rect and continent_rect
            this.mLeft = mapData.maps[mapID].map_rect[0][0];
            this.mTop = mapData.maps[mapID].map_rect[0][1];
            this.mWidth = mapData.maps[mapID].map_rect[1][0] - mapData.maps[mapID].map_rect[0][0];
            this.mHeight = mapData.maps[mapID].map_rect[1][1] - mapData.maps[mapID].map_rect[0][1];
            this.cLeft = mapData.maps[mapID].continent_rect[0][0];
            this.cTop = mapData.maps[mapID].continent_rect[0][1];
            this.cWidth = mapData.maps[mapID].continent_rect[1][0] - mapData.maps[mapID].continent_rect[0][0];
            this.cHeight = mapData.maps[mapID].continent_rect[1][1] - mapData.maps[mapID].continent_rect[0][1];
            this.currentName = mapData.maps[mapID].map_name;
        }

        public string ToJson()
        {
            if (this.currentID == 0)
            {
                return string.Empty;
            }
            else
            {
                return JsonConvert.SerializeObject(this.coordinate);
            }
        }

        public void UpdateCoordinate(double camDegrees, double playerDegrees)
        {
            Coordinate coord = new Coordinate();
            coord.posX = this.playerPosX.ToString();
            coord.posY = this.playerPosY.ToString();
            coord.camRotation = camDegrees.ToString();
            coord.playerRotation = playerDegrees.ToString();
            coord.mapName = this.currentName.ToString();
            coord.worldID = this.worldID.ToString();

            this.coordinate = coord;
        }
    }
}
