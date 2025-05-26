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
    public class IncidentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IncidentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/incidents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Incident>>> GetIncidents(
            [FromQuery] int?    vehicleId,
            [FromQuery] int?    driverId,
            [FromQuery] int     page = 1
        )
        {
            const int pageSize = 20;

            var query = _context.Incidents
                .Include(i => i.Vehicle)
                .Include(i => i.Driver)
                .AsQueryable();

            if (vehicleId.HasValue)
                query = query.Where(i => i.VehicleId == vehicleId.Value);

            if (driverId.HasValue)
                query = query.Where(i => i.DriverId == driverId.Value);

            var result = await query
                .OrderByDescending(i => i.DateReported)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(result);
        }

        // GET: api/incidents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Incident>> GetIncident(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);

            if (incident == null)
            {
                return NotFound();
            }

            return incident;
        }


        // ******************** KPI ******************** //

        // GET: api/incidents/kpi/overview
        [HttpGet("kpi/overview")]
        public async Task<ActionResult<object>> GetIncidentKpis()
        {
            var now         =   DateTime.UtcNow;
            var firstDay    =   new DateTime(now.Year, now.Month, 1);
            var start       =   firstDay;
            var end         =   firstDay.AddMonths(1);

            // Open incidents
            var open = await _context.Incidents.CountAsync(i => i.Status.ToLower() == "open");

            // Incidents this month
            var thisMonth = await _context.Incidents.CountAsync(i => i.DateReported >= start && i.DateReported < end);

            return Ok(new
            {
                openIncidentCount = open,
                incidentsThisMonth = thisMonth
            });
        }

        private bool IncidentExists(int id)
        {
            return _context.Incidents.Any(e => e.Id == id);
        }
    }
}
