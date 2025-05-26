using Backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AlertsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/alerts/daily
        [HttpGet("daily")]
        public ActionResult<IEnumerable<object>> GetDailyFakeAlerts()
        {
            var alerts = new List<object>
            {
                new
                {
                    message = "9 drivers absent today",
                    status = "error"
                },
                new
                {
                    message = "6 vehicles under maintenance today",
                    status = "warning"
                },
                new
                {
                    message = "4 new incidents reported this morning",
                    status = "info"
                }
            };

            return Ok(alerts);
        }
    }
}
