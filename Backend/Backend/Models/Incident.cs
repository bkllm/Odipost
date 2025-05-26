namespace Backend.Models
{
    public class Incident
    {
        public int Id { get; set; }

        public int VehicleId { get; set; }
        public Vehicle? Vehicle { get; set; }

        public int? DriverId { get; set; }
        public Driver? Driver { get; set; }

        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Type { get; set; }
        public required DateTime DateReported { get; set; }
        public required string Status { get; set; }
    }
}
