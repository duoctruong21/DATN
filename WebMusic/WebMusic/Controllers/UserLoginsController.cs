using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebMusic.Models.EF;

namespace WebMusic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginsController : ControllerBase
    {
        private readonly MusicWebContext _context;

        public UserLoginsController(MusicWebContext context)
        {
            _context = context;
        }

        // GET: api/UserLogins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserLogin>>> GetUserLogins()
        {
          if (_context.UserLogins == null)
          {
              return NotFound();
          }
            return await _context.UserLogins.ToListAsync();
        }

        // GET: api/UserLogins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserLogin>> GetUserLogin(string id)
        {
          if (_context.UserLogins == null)
          {
              return NotFound();
          }
            var userLogin = await _context.UserLogins.FindAsync(id);

            if (userLogin == null)
            {
                return NotFound();
            }

            return userLogin;
        }

        // PUT: api/UserLogins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserLogin(string id, UserLogin userLogin)
        {
            if (id != userLogin.LoginProvider)
            {
                return BadRequest();
            }

            _context.Entry(userLogin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLoginExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserLogins
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserLogin>> PostUserLogin(UserLogin userLogin)
        {
          if (_context.UserLogins == null)
          {
              return Problem("Entity set 'MusicWebContext.UserLogins'  is null.");
          }
            _context.UserLogins.Add(userLogin);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserLoginExists(userLogin.LoginProvider))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserLogin", new { id = userLogin.LoginProvider }, userLogin);
        }

        // DELETE: api/UserLogins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserLogin(string id)
        {
            if (_context.UserLogins == null)
            {
                return NotFound();
            }
            var userLogin = await _context.UserLogins.FindAsync(id);
            if (userLogin == null)
            {
                return NotFound();
            }

            _context.UserLogins.Remove(userLogin);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserLoginExists(string id)
        {
            return (_context.UserLogins?.Any(e => e.LoginProvider == id)).GetValueOrDefault();
        }
    }
}
