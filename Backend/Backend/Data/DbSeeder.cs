using Backend.Models;
using Bogus;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            Console.WriteLine("---> Seeder start");

            // Avoid double seeding
            if (!context.Vehicles.Any() && !context.Drivers.Any() && !context.Incidents.Any())
            //if (true)
            {
                var rng = new Random();

                // Drivers
                var driverFaker = new Faker<Driver>("nl_BE")
                    .RuleFor(d => d.FirstName, f => f.Name.FirstName())
                    .RuleFor(d => d.LastName, f => f.Name.LastName())
                    .RuleFor(d => d.Email, (f, d) => f.Internet.Email(d.FirstName, d.LastName))
                    .RuleFor(d => d.Phone, f => f.Phone.PhoneNumber("04## ### ###"))
                    .RuleFor(d => d.Status, f => f.PickRandom("Available", "Driving", "OnLeave"))
                    .RuleFor(d => d.Address, f => f.Address.StreetAddress())
                    .RuleFor(d => d.PostalCode, f => f.Address.ZipCode("####"))
                    .RuleFor(d => d.City, f => f.Address.City());

                var drivers = driverFaker.Generate(3403);
                context.Drivers.AddRange(drivers);
                context.SaveChanges();
                Console.WriteLine("✅ Drivers added");

                // Vehicles
                var brands = new[] { "Volvo", "Mercedes", "DAF", "Scania", "MAN", "Iveco" };
                var models = new[] { "FH16", "Actros", "XF", "R500", "TGX", "S-Way" };
                var statuses = new[] { "Available", "InUse", "Maintenance", "Unavailable", "Driving" };
                var types = new[] { "Truck", "Van", "Car" };

                var vehicleFaker = new Faker<Vehicle>()
                    .RuleFor(v => v.LicensePlate, f => $"1-{f.Random.String2(3, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")}-{f.Random.Number(100, 999)}")
                    .RuleFor(v => v.Brand, f => f.PickRandom(brands))
                    .RuleFor(v => v.Model, f => f.PickRandom(models))
                    .RuleFor(v => v.Type, f => f.PickRandom(types))
                    .RuleFor(v => v.Status, f => f.PickRandom(statuses))
                    .RuleFor(v => v.CurrentDriverId, f => f.Random.Bool(0.8f) ? f.PickRandom(drivers).Id : null);

                var vehicles = vehicleFaker.Generate(2117);
                context.Vehicles.AddRange(vehicles);
                context.SaveChanges();
                Console.WriteLine("✅ Vehicles added");

                // Incidents
                var incidentTypes = new[] { "Technisch", "Schade", "Administratief" };
                var incidentStatuses = new[] { "Open", "Closed", "InBehandeling" };

                var incidentFaker = new Faker<Incident>()
                    .RuleFor(i => i.VehicleId, f => f.PickRandom(vehicles).Id)
                    .RuleFor(i => i.DriverId, f => f.Random.Bool(0.7f) ? f.PickRandom(drivers).Id : null)
                    .RuleFor(i => i.Title, f => f.Hacker.Verb() + " fout")
                    .RuleFor(i => i.Description, f => f.Lorem.Sentence())
                    .RuleFor(i => i.Type, f => f.PickRandom(incidentTypes))
                    .RuleFor(i => i.Status, f => f.PickRandom(incidentStatuses))
                    .RuleFor(i => i.DateReported, f => f.Date.Between(DateTime.UtcNow.AddMonths(-3), DateTime.UtcNow));

                var incidents = incidentFaker.Generate(5062);
                context.Incidents.AddRange(incidents);
                context.SaveChanges();
                Console.WriteLine("✅ Incidents added");
            }
        }

    }
}