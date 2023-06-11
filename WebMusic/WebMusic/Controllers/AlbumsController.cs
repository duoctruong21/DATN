using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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

    public class AlbumsController : ControllerBase
    {
        private readonly MusicWebContext _context;
        private readonly UploadFile uploadFile;


        public AlbumsController(MusicWebContext context)
        {
            _context = context;
            uploadFile = new UploadFile();

        }

        // GET: api/Albums
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Album>>> GetAlbums()
        {
            if (_context.Albums == null)
            {
                return NotFound();
            }
            return await _context.Albums.ToListAsync();
        }

        [HttpGet("/albumTop6")]
        public async Task<ActionResult<IEnumerable<Album>>> GetAlbumsTop5()
        {
            if (_context.Albums == null)
            {
                return NotFound();
            }
            return await _context.Albums.Take(6).ToListAsync();
        }

        // GET: api/Albums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetAlbum(int id)
        {
            if (_context.Albums == null)
            {
                return NotFound();
            }
            var album = await _context.Albums.FindAsync(id);

            if (album == null)
            {
                return NotFound();
            }

            return album;
        }

        // PUT: api/Albums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbum(int id, [FromForm] Albums album)
        {
            if (id != album.Id)
            {
                return BadRequest();
            }
            var item = await _context.Albums.FindAsync(id);
            _context.Entry(album).State = EntityState.Modified;
            if (album.FileImg != null)
            {
                item!.AlbumImg = await uploadFile.UploadImageAsync(album.FileImg);
            }
            if (item!.CreatedDate == null)
            {
                item!.CreatedDate = DateTime.Now;
            }
            item!.AlbumName = album.AlbumName;
            item!.AlbumDescription = album.AlbumDescription;
            item!.ModifiedDate = DateTime.Now;
            item!.Alias = item.AlbumName != null ? FormatAlias.RemoveDiacritics(album.AlbumName!) : "";
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumExists(id))
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

        // POST: api/Albums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Album>> PostAlbum([FromForm] Albums album)
        {
            if (_context.Albums == null)
            {
                return Problem("Entity set 'MusicWebContext.Albums'  is null.");
            }
            var item = new Album();
            if (album.FileImg != null)
            {
                item.AlbumImg = await uploadFile.UploadImageAsync(album.FileImg);
            }
            item.CreatedDate = DateTime.Now;
            item.ModifiedDate = DateTime.Now;
            item!.AlbumName = album.AlbumName;
            item!.AlbumDescription = album.AlbumDescription;
            item!.Alias = item.AlbumName != null ? FormatAlias.RemoveDiacritics(item.AlbumName!) : "";
            _context.Albums.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlbum", new { id = item.Id }, item);
        }

        // DELETE: api/Albums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            if (_context.Albums == null)
            {
                return NotFound();
            }
            var album = await _context.Albums.FindAsync(id);
            if (album == null)
            {
                return NotFound();
            }
            var items = _context.Songs.Where(x => x.IdAlbum == id);
            foreach (var item in items)
            {
                if (item.IdAlbum == id)
                {
                    item.IdAlbum = null;
                    _context.Songs.Update(item);
                }

            }
            _context.SaveChanges();
            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlbumExists(int id)
        {
            return (_context.Albums?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
