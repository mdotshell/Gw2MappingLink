using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Threading;
using System.Net;
using System.IO;

namespace Gw2MappingLink
{
    public partial class Main : Form
    {
        private static Player player = new Player();
        private static MumbleLink mumbleLink = new MumbleLink();
        private static Map map = new Map();

        private static HttpListener clientServer = new HttpListener();

        private System.Threading.Timer timerGetPlayerData;

        public delegate void DelegateUpdateUIMethod();
        public DelegateUpdateUIMethod updateUIMethod;

        public Main()
        {
            InitializeComponent();
        }

        private void Main_Load(object sender, EventArgs e)
        {
            updateUIMethod = new DelegateUpdateUIMethod(UpdateUI);

            TimerCallback timerGetPlayerDataDelegate = new TimerCallback(GetPlayerData);
            timerGetPlayerData = new System.Threading.Timer(timerGetPlayerDataDelegate, null, 0, Timeout.Infinite); // Call the timer once.

            // Accepts only 1 connection. For multi-thread refer to: http://stackoverflow.com/questions/4672010/multi-threading-with-net-httplistener.
            clientServer.Prefixes.Add("http://localhost:1337/");
            clientServer.Start();
            clientServer.BeginGetContext(new AsyncCallback(ClientServerGetContext), clientServer);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("http://mshelley.net/gw2");
        }

        private void GetPlayerData(object stateObject)
        {
            mumbleLink.parse();
            player.parse(mumbleLink);

            if (player.mapID != 0 && player.mapID != map.currentID)
            {
                map.GetData(player.mapID);
            }

            // Update UI thread.
            try
            {
                Invoke(updateUIMethod);
            }
            catch (ObjectDisposedException)
            {
                // Absorb it.
            }

            timerGetPlayerData.Change(50, Timeout.Infinite); // Restart timer and call it once.
        }

        private void UpdateUI()
        {
            // TODO: If map.id == 0, show waiting for data.

            //Creates the relative percent of the map for player X,Y
            float mapPctZero = ((player.x) - map.mLeft) / map.mWidth;
            float mapPctOne = ((player.z) - map.mTop) / map.mHeight;

            map.playerPosX = (map.cLeft + (map.cWidth * mapPctZero));
            map.playerPosY = ((map.cTop + map.cHeight) - (map.cHeight * mapPctOne));
            map.worldID = player.worldID;
            //Gets final continent coordinates for player position                   
            xLabel.Text = "X: " + map.playerPosX.ToString();
            yLabel.Text = "Y: " + map.playerPosY.ToString();

            double camRadians = Math.Atan2(player.camRotationY, player.camRotationX);
            double camDegrees = (camRadians * (180 / Math.PI)) + 180 ;
            double playerRadians = Math.Atan2(player.rotationY, player.rotationX);
            double playerDegrees = (playerRadians * (180 / Math.PI)) + 180;

            rotationLabel.Text = "Rotation: " + camDegrees.ToString();
            mapLabel.Text = "Map: " + map.currentName;
            map.UpdateCoordinate(camDegrees, playerDegrees);
        }

        private static void ClientServerGetContext(IAsyncResult result)
        {
            HttpListenerContext context = clientServer.EndGetContext(result);
            HttpListenerResponse response = context.Response;
            response.AppendHeader("Access-Control-Allow-Origin", "*");

            string page = map.ToJson();

            byte[] buffer = Encoding.UTF8.GetBytes(page);
            response.ContentLength64 = buffer.Length;
            Stream st = response.OutputStream;
            st.Write(buffer, 0, buffer.Length);

            context.Response.Close();

            // Start accepting a new connection.
            clientServer.BeginGetContext(new AsyncCallback(ClientServerGetContext), clientServer);
        }
    }
}
