using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebMusic.Models.Data;
using WebMusic.Models.EF;

namespace WebMusic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserWebMusicsController : ControllerBase
    {
        private readonly MusicWebContext _context;

        private readonly IConfiguration configuration;
        public UserWebMusicsController(MusicWebContext context, IConfiguration configuration)
        {
            _context = context;
            this.configuration = configuration;
        }

        
        [HttpPost("/login/{userName}/{passWord}")]
        public async Task<IActionResult> Login(string userName, string passWord)
        {
            var items =await _context.UserWebMusics.FirstOrDefaultAsync( x=>x.Gmail.Contains(userName));
            if(items != null) { 
                if(passWord == items.Password)
                {
                    var authenClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Email, userName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };
                    var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
                    var token = new JwtSecurityToken(
                        issuer: configuration["JWT:ValidIssuer"],
                        audience: configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddMinutes(20),
                        claims: authenClaims,
                        signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha512Signature)
                        );
                    var item = new UserMusic();
                    //item.token = new JwtSecurityTokenHandler().WriteToken(token);
                    item.token = items.Id.ToString();
                    item.name = items.LastName + " " + items.FirstName;
                    item.email = items.Gmail;
                    return Ok(item);
                }
            }
            return BadRequest();
        }

        // GET: api/UserWebMusics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserWebMusic>>> GetUserWebMusics()
        {
          if (_context.UserWebMusics == null)
          {
              return NotFound();
          }
            return await _context.UserWebMusics.ToListAsync();
        }

        // GET: api/UserWebMusics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserWebMusic>> GetUserWebMusic(int id)
        {
          if (_context.UserWebMusics == null)
          {
              return NotFound();
          }
            var userWebMusic = await _context.UserWebMusics.FindAsync(id);

            if (userWebMusic == null)
            {
                return NotFound();
            }

            return userWebMusic;
        }

        // PUT: api/UserWebMusics/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserWebMusic(int id, UserWebMusic userWebMusic)
        {
            if (id != userWebMusic.Id)
            {
                return BadRequest();
            }

            _context.Entry(userWebMusic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserWebMusicExists(id))
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

        // POST: api/UserWebMusics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserWebMusic>> PostUserWebMusic(UserWebMusic userWebMusic)
        {
          if (_context.UserWebMusics == null)
          {
              return Problem("Entity set 'MusicWebContext.UserWebMusics'  is null.");
          }

            var user = _context.UserWebMusics.FirstOrDefault(x => x.Gmail.Contains(userWebMusic.Gmail));
            if (user == null)
            {
                _context.UserWebMusics.Add(userWebMusic);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetUserWebMusic", new { id = userWebMusic.Id }, userWebMusic);
            }
            else
            {
                return BadRequest();
            }

            
        }

        // DELETE: api/UserWebMusics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserWebMusic(int id)
        {
            if (_context.UserWebMusics == null)
            {
                return NotFound();
            }
            var userWebMusic = await _context.UserWebMusics.FindAsync(id);
            if (userWebMusic == null)
            {
                return NotFound();
            }

            _context.UserWebMusics.Remove(userWebMusic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserWebMusicExists(int id)
        {
            return (_context.UserWebMusics?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
