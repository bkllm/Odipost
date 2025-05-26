using System.Text.Json.Serialization;
namespace Backend.Models
{
    public class VehicleLocation
    {
        public int Id { get; set; }

        public int VehicleId { get; set; }

        public Vehicle? Vehicle { get; set; }

        public required double Latitude { get; set; }
        public required double Longitude { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
