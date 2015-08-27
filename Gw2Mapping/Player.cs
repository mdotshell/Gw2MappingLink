using System;

namespace Gw2MappingLink
{
    class Player
    {
        // TODO: Should be in util.
        const float InchesToMeter = 39.37010F;

        // Player's view angles.
        public double camRotationX { get; private set; }
        public double camRotationY { get; private set; }
        public double rotationX { get; private set; }
        public double rotationY { get; private set; }
        
        // Player's position.
        public float x { get; private set; }
        public float y { get; private set; }
        public float z { get; private set; }

        public string identity { get; private set; } // Player's name.
        public int worldID { get; private set; } // The world identification number where the player is in
        public int mapID { get; private set; } // The map identification number where the player is in.

        public void parse(MumbleLink mumbleLink)
        {
            unsafe
            {
                fixed (MumbleLink.MemoryMap* _data = &mumbleLink.data)
                {
                    this.x = (float)(_data->fAvatarPosition[0]) * InchesToMeter;
                    this.y = (float)(_data->fAvatarPosition[1]) * InchesToMeter;
                    this.z = (float)(_data->fAvatarPosition[2]) * InchesToMeter;
                    this.camRotationX = (double)(_data->fCameraFront[0]);
                    this.camRotationY = (double)(_data->fCameraFront[2]);
                    this.rotationX = (double)(_data->fAvatarFront[0]);
                    this.rotationY = (double)(_data->fAvatarFront[2]);
                    this.mapID = (int)_data->context[28] + ((int)_data->context[29] * 256);
                    this.worldID = (int)_data->context[36] + ((int)_data->context[37] * 256);
                }
            }
        }
    }
}
