namespace Backend.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string LicensePlate { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }

        public int? CurrentDriverId { get; set; }
        public Driver? CurrentDriver { get; set; }
    }
}
