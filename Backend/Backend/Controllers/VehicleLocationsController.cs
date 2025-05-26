using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleLocationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VehicleLocationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/vehicleLocations/simulate/all
        [HttpGet("simulate/all")]
        public async Task<ActionResult<IEnumerable<object>>> SimulateAllVehicles()
        {
            var now = DateTime.UtcNow;
            var seconds = (int)(now - now.Date).TotalSeconds;

            var paths = new Dictionary<int, List<(double lat, double lng)>>()
            {
                // Trucks
                [1962]  = new() { (50.879137, 4.262952), (50.879602, 4.260349), (50.880094, 4.257276), (50.880960, 4.251539), (50.881464, 4.246745) },
                [1930]  = new() { (50.854637, 4.273755), (50.855989, 4.273157), (50.857065, 4.272605), (50.858568, 4.271973), (50.860722, 4.271264) },
                [1783]  = new() { (50.895342, 4.403097), (50.893740, 4.402058), (50.891458, 4.399903), (50.889880, 4.397710), (50.888617, 4.395631) },

                // Vans
                [1731]  = new() { (50.864950, 4.318932), (50.863387, 4.317485), (50.862053, 4.315699), (50.863124, 4.313773), (50.864042, 4.312648) },
                [2001]  = new() { (50.900582, 4.320724), (50.901355, 4.317289), (50.900725, 4.315666), (50.900225, 4.314193), (50.899677, 4.314609) },
                [1789]  = new() { (50.866248, 4.266229), (50.866095, 4.263527), (50.865989, 4.260378), (50.865965, 4.258273), (50.865883, 4.254434) },

                // Cars
                [1719]  = new() { (50.813348, 4.359843), (50.812640, 4.361658), (50.812827, 4.363472), (50.813348, 4.366970), (50.812827, 4.368190) },
                [1951]  = new() { (50.864612, 4.322006), (50.863433, 4.325174), (50.862553, 4.324160), (50.862113, 4.322450), (50.861074, 4.323020) },
                [1971]  = new() { (50.827952, 4.436456), (50.828709, 4.434880), (50.829662, 4.433948), (50.830419, 4.434525), (50.830993, 4.435258) },
                [258]   = new() { (50.871518, 4.467446), (50.872414, 4.466767), (50.873546, 4.465914), (50.876368, 4.463930), (50.878985, 4.463966) }
            };

            var vehicleIds = paths.Keys.ToList();

            var vehicles = await _context.Vehicles
                .Where(v => vehicleIds.Contains(v.Id))
                .Select(v => new
                {
                    v.Id,
                    v.LicensePlate,
                    v.Brand,
                    v.Type,
                    DriverName = v.CurrentDriver != null
                    ? v.CurrentDriver.FirstName + " " + v.CurrentDriver.LastName
                    : "Unassigned"
                })
                .ToDictionaryAsync(v => v.Id);

            var data = paths.Select(kv =>
            {
                var vehicleId   = kv.Key;
                var path        = kv.Value;
                var index       = (seconds / 3) % path.Count;
                var point       = path[index];

                var v = vehicles[vehicleId];

                return new
                {
                    vehicleId = v.Id,
                    v.LicensePlate,
                    v.Brand,
                    v.Type,
                    v.DriverName,
                    latitude    = point.lat,
                    longitude   = point.lng,
                    timestamp   = now
                };
            });

            return Ok(data);
        }


        // GET: api/vehicleLocations/simulate/4
        [HttpGet("simulate/{vehicleId}")]
        public async Task<ActionResult<object>> SimulateLiveLocation(int vehicleId)
        {
            var vehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (vehicle == null) return NotFound("Vehicle not found");

            // Simulate
            List<(double lat, double lng)> path = vehicle.Type switch
            {
                "Truck" => new()
                {
                    // R0 Dilbeek
                    (50.854637, 4.273755),
                    (50.855989, 4.273157),
                    (50.857065, 4.272605),
                    (50.858568, 4.271973),
                    (50.860722, 4.271264),
                },
                "Car" => new()
                {
                    (50.8500, 4.3600),
                    (50.8495, 4.3560),
                    (50.8485, 4.3530),
                    (50.8492, 4.3585),
                    (50.8500, 4.3600),
                },
                "Van" => new()
                {
                    (50.9075, 4.3110),
                    (50.9050, 4.3300),
                    (50.9000, 4.3500),
                    (50.8900, 4.3300),
                    (50.9075, 4.3110),
                },
                _ => new()
                {
                    (50.848999, 4.356788),
                }
            };

            // Calc time
            var now = DateTime.UtcNow;
            var seconds = (int)(now - now.Date).TotalSeconds;
            var index = (seconds / 3) % path.Count;
            var point = path[index];

            return Ok(new
            {
                data = new
                {
                    vehicleId,
                    latitude    = point.lat,
                    longitude   = point.lng,
                    timestamp   = now
                }
            });
        }
    }
}
