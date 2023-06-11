using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebMusic.Common;
using WebMusic.Models.Data;
using WebMusic.Models.EF;

namespace WebMusic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SingersController : ControllerBase
    {
        private readonly MusicWebContext _context;
        private readonly UploadFile uploadFile;

        public SingersController(MusicWebContext context)
        {
            _context = context;
            uploadFile = new UploadFile();
        }

        // GET: api/Singers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Singer>>> GetSingers()
        {
            if (_context.Singers == null)
            {
                return NotFound();
            }
            return await _context.Singers.ToListAsync();
        }

        // GET: api/Singers
        [HttpGet("/singerTop5")]
        public async Task<ActionResult<IEnumerable<Singer>>> GetSingersTop5()
        {
            if (_context.Singers == null)
            {
                return NotFound();
            }
            return await _context.Singers.Take(5).ToListAsync();
        }

        // GET: api/Singers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Singer>> GetSinger(int id)
        {
            if (_context.Singers == null)
            {
                return NotFound();
            }
            var singer = await _context.Singers.FindAsync(id);

            if (singer == null)
            {
                return NotFound();
            }

            return singer;
        }

        // PUT: api/Singers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSinger(int id, [FromForm] Singers singer)
        {
            if (id != singer.Id)
            {
                return BadRequest();
            }
            var item = _context.Singers.Find(id);
            _context.Entry(item).State = EntityState.Modified;
            if (singer.FileImg != null)
            {
                item.Fileimg = await uploadFile.UploadImageAsync(singer.FileImg);
            }
            if (item.CreatedDate == null)
            {
                item.CreatedDate = DateTime.Now;
            }
            item.SingerName = singer.SingerName;
            item.SingerDescription = singer.SingerDescription;
            item.ModifiedDate = DateTime.Now;
            item.Alias = item.SingerName != null ? FormatAlias.RemoveDiacritics(item.SingerName) : "";
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SingerExists(id))
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

        // POST: api/Singers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Singer>> PostSinger([FromForm] Singers singer)
        {
            if (_context.Singers == null)
            {
                return Problem("Entity set 'MusicWebContext.Singers'  is null.");
            }

            Singer item = new Singer();
            if (singer.FileImg != null)
            {
                item.Fileimg = await uploadFile.UploadImageAsync(singer.FileImg);
            }
            item.SingerName = singer.SingerName;
            item.SingerDescription = singer.SingerDescription;
            item.CreatedDate = DateTime.Now;
            item.ModifiedDate = DateTime.Now;
            item.Alias = item.SingerName != null ? FormatAlias.RemoveDiacritics(item.SingerName) : "";
            _context.Singers.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetSinger", new { id = item.Id }, item);
        }

        // DELETE: api/Singers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSinger(int id)
        {
            if (_context.Singers == null)
            {
                return NotFound();
            }
            var singer = await _context.Singers.FindAsync(id);
            if (singer == null)
            {
                return NotFound();
            }
            var songs = _context.Songs.Where(x => x.IdSinger == id);
            foreach (var song in songs)
            {
                if (song.IdSinger == id)
                {
                    song.IdSinger = null;
                    _context.Songs.Update(song);
                }
            }
            _context.SaveChanges();

            _context.Singers.Remove(singer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SingerExists(int id)
        {
            return (_context.Singers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
