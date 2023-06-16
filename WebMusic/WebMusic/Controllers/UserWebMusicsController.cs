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
using WebMusic.Models;
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

        [HttpPost("/historied")]
        public async Task<ActionResult<History>> posthistory([FromForm] histories history)
        {
            if (_context.Histories == null)
            {
                return Problem("Entity set 'MusicWebContext.Histories'  is null.");
            }
            var checkHistory = _context.Histories.FirstOrDefault(x => x.Idsong == history.Idsong);
            if(checkHistory != null)
            {
                checkHistory.Idsong = history.Idsong;
                checkHistory.Listendate = DateTime.Now;
                var countsong = _context.Histories.FirstOrDefault(x => x.Idsong == history.Idsong);
                checkHistory.Countlisten = countsong != null ? countsong.Countlisten + 1 : 1;
                _context.Histories.Update(checkHistory);

                

            }
            else
            {
                History item = new History();
                item.Idsong = history.Idsong;
                item.Iduser = history.Iduser;
                item.Listendate = DateTime.Now;
                var countsong = _context.Histories.FirstOrDefault(x => x.Idsong == history.Idsong);
                item.Countlisten = countsong != null ? countsong.Countlisten + 1 : 1;
                _context.Histories.Add(item);

            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHistory", new {  }, history);
        }

        [HttpGet("/history/{id}")]
        public async Task<IActionResult> history(int id)
        {
            var items = _context.Histories.Where(x=>x.Iduser == id);
            
            if(items != null)
            {
                List<SongItem> listsonghistory = (
                from songhistory in items
                join song in _context.Songs on songhistory.Idsong equals song.Id
                join singer in _context.Singers on song.IdSinger equals singer.Id
                join album in _context.Albums on song.IdAlbum equals album.Id into albumItem
                from albums in albumItem.DefaultIfEmpty()
                select new SongItem
                {
                    songName = song.SongName,
                    singerName = singer.SingerName,
                    albumName = albums.AlbumName,
                    fileImg = song.Fileimg,
                    linksong = song.Alias,
                    linkalbum = albums.Alias,
                    linksinger = singer.Alias,
                    idAlbum = song.IdAlbum,
                    idSinger = song.IdSinger,
                    idSong = song.Id,
                    mp3 = song.Filesong,
                    id = songhistory.Id,
                    date = (songhistory.Listendate != null ? songhistory.Listendate : null)
                }).OrderByDescending(x => x.date).ToList() ;
                return Ok(listsonghistory);
            }
            return BadRequest();
        }

        [HttpGet("/albumuser/{alias}/{id}")]
        public async Task<IActionResult> albumuser(string alias,int id)
        {
            var items = _context.Albums.Where(x => x.Iduser == id);
            if (items != null)
            {
                List<SongItem> listsonghistory = (
                from songhistory in items where songhistory.Alias == alias
                join songAlbum in _context.Albumusers on songhistory.Id equals songAlbum.Idalbum
                join song in _context.Songs on songAlbum.Idsong equals song.Id
                join singer in _context.Singers on song.IdSinger equals singer.Id
                join album in _context.Albums on song.IdAlbum equals album.Id into albumItem
                from albums in albumItem.DefaultIfEmpty()
                select new SongItem
                {
                    songName = song.SongName,
                    singerName = singer.SingerName,
                    albumName = albums.AlbumName,
                    fileImg = song.Fileimg,
                    linksong = song.Alias,
                    linkalbum = albums.Alias,
                    linksinger = singer.Alias,
                    idAlbum = song.IdAlbum,
                    idSinger = song.IdSinger,
                    idSong = song.Id,
                    mp3 = song.Filesong,
                    id = songAlbum.Id
                }).Distinct().ToList();
                return Ok(listsonghistory.OrderByDescending(x=>x.id));
            }
            return BadRequest();
        }

        [HttpGet("/albumusername/{id}")]
        public async Task<IActionResult> albumusername(int id)
        {
            var items = _context.Albums.Where(x => x.Iduser == id).ToList();
            if (items != null)
            {
                List<SongItem> listsonghistory = new List<SongItem>();
                foreach(var item in items)
                {
                    var alumsong = _context.Albumusers.Where(x => x.Idalbum == item.Id).Distinct().ToList();
                    SongItem song = new SongItem();
                    song.albumUserName = item.AlbumName;
                    song.idAlbum = item.Id;
                    song.fileImg = item.AlbumImg;
                    song.linkalbum = item.Alias;
                    song.count = alumsong != null ? alumsong.Select(x => x.Idsong).Distinct().Count() : 0;
                    listsonghistory.Add(song);

                }
                return Ok(listsonghistory);
            }
            return BadRequest();
        }

        private bool UserWebMusicExists(int id)
        {
            return (_context.UserWebMusics?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
