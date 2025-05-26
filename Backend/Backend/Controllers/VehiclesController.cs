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
    public class VehiclesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VehiclesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/vehicles
        [HttpGet]
        public async Task<ActionResult<object>> GetVehicles(
            [FromQuery] string? q,
            [FromQuery] string? status,
            [FromQuery] string? type,
            [FromQuery] string? brand,
            [FromQuery] int     page = 1,
            [FromQuery] int     pageSize = 20
        )
        {
            // Security
            const int maxPageSize = 50;
            pageSize = Math.Clamp(pageSize, 1, maxPageSize);
            if (page < 1) page = 1;

            // Base query
            var query = _context.Vehicles
                .Include(v => v.CurrentDriver)
                .AsQueryable();

            // Search ID, Licenseplate or Drivers name
            if (!string.IsNullOrWhiteSpace(q))
            {
                var qLower = q.ToLower();
                query = query.Where(v =>
                    v.LicensePlate.ToLower().Contains(qLower) ||
                    v.Id.ToString().Contains(qLower) ||
                    (v.CurrentDriver != null && (
                        v.CurrentDriver.FirstName.ToLower().Contains(qLower) ||
                        v.CurrentDriver.LastName.ToLower().Contains(qLower)
                    ))
                );
            }

            // Filters
            if (!string.IsNullOrEmpty(status))
                query = query.Where(v => v.Status == status);

            if (!string.IsNullOrEmpty(type))
                query = query.Where(v => v.Type == type);

            if (!string.IsNullOrEmpty(brand))
                query = query.Where(v => v.Brand == brand);

            // Pagination
            int totalCount      = await query.CountAsync();
            double totalPages   = (int)Math.Ceiling((double)totalCount / pageSize);

            var data = await query
                .OrderBy(v => v.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                totalPages,
                data
            });
        }

        // GET: api/vehicles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }


        // ******************** KPI ******************** //

        // GET: api/vehicles/kpi/overview
        [HttpGet("kpi/overview")]
        public async Task<ActionResult<object>> GetVehicleKpis()
        {
            // Count vehicles in use
            var inUse       = await _context.Vehicles.CountAsync(v => v.Status.ToLower() == "inuse");

            // Count available vehicles in use
            var available   = await _context.Vehicles.CountAsync(v => v.Status.ToLower() == "available");

            return Ok(new
            {
                inUseVehicleCount = inUse,
                availableVehicleCount = available
            });
        }

        // GET: api/vehicles/kpi/stats
        [HttpGet("kpi/stats")]
        public async Task<ActionResult<object>> GetVehicleStats()
        {
            var total       = await _context.Vehicles.CountAsync();
            var available   = await _context.Vehicles.CountAsync(v => v.Status == "Available");
            var inUse       = await _context.Vehicles.CountAsync(v => v.Status == "InUse");
            var maintenance = await _context.Vehicles.CountAsync(v => v.Status == "Maintenance");
            var unavailable = await _context.Vehicles.CountAsync(v => v.Status == "Unavailable");

            return Ok(new
            {
                total,
                available,
                inUse,
                maintenance,
                unavailable
            });
        }

        // GET: api/vehicles/kpi/active-per-day
        [HttpGet("kpi/active-per-day")]
        public ActionResult<IEnumerable<object>> GetFakeActiveVehiclesPerDay()
        {
            var now         = DateTime.UtcNow.Date;
            var startDate   = now.AddDays(-6);
            var random      = new Random();

            var data = Enumerable.Range(0, 7)
                .Select(i => new
                {
                    date    = startDate.AddDays(i).ToString("yyyy-MM-dd"),
                    count   = random.Next(100, 500)
                })
                .ToList();

            return Ok(data);
        }


        private bool VehicleExists(int id)
        {
            return _context.Vehicles.Any(e => e.Id == id);
        }
    }
}
