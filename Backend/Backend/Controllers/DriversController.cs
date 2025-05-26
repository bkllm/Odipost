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
    public class DriversController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DriversController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/drivers
        [HttpGet]
        public async Task<ActionResult<object>> GetDrivers(
            int page        = 1,
            int pageSize    = 20,
            string? status  = null,
            string? q       = null
        )
        {
            // Security
            const int maxPageSize = 50;
            pageSize = Math.Clamp(pageSize, 1, maxPageSize);
            if (page < 1) page = 1;

            // Base query
            var query = _context.Drivers.AsQueryable();

            // Filter
            if (!string.IsNullOrWhiteSpace(status))
                query = query.Where(d => d.Status == status);

            // Search Drivers name, email, phone, address, postalCode or city
            if (!string.IsNullOrWhiteSpace(q))
                query = query.Where(d =>
                    d.FirstName.Contains(q) ||
                    d.LastName.Contains(q) ||
                    d.Email.Contains(q) ||
                    d.Phone.Contains(q) ||
                    d.Address!.Contains(q) ||
                    d.PostalCode!.Contains(q) ||
                    d.City!.Contains(q)
                );

            // Pagination
            int totalCount      = await query.CountAsync();
            double totalPages   = (int)Math.Ceiling((double)totalCount / pageSize);

            var data = await query
                .OrderBy(d => d.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                totalPages,
                data
            });
        }


        // GET: api/drivers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);

            if (driver == null)
            {
                return NotFound();
            }

            return driver;
        }


        // ******************** KPI ******************** //

        // GET: api/drivers/kpi/overview
        [HttpGet("kpi/overview")]
        public async Task<ActionResult<object>> GetDriverKpis()
        {
            // Count available drivers
            var available   = await _context.Drivers.CountAsync(d => d.Status.ToLower() == "available");

            // Count driving drivers
            var driving     = await _context.Drivers.CountAsync(d => d.Status.ToLower() == "driving");

            return Ok(new
            {
                availableDriverCount = available,
                drivingDriverCount = driving
            });
        }

        // GET: api/drivers/kpi/stats
        [HttpGet("kpi/stats")]
        public async Task<IActionResult> GetDriverStats()
        {
            var total       = await _context.Drivers.CountAsync();
            var available   = await _context.Drivers.CountAsync(d => d.Status == "Available");
            var driving     = await _context.Drivers.CountAsync(d => d.Status == "Driving");
            var onLeave     = await _context.Drivers.CountAsync(d => d.Status == "OnLeave");

            return Ok(new
            {
                total,
                available,
                driving,
                onLeave
            });
        }
        private bool DriverExists(int id)
        {
            return _context.Drivers.Any(e => e.Id == id);
        }
    }
}
