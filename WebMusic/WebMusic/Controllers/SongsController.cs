using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebMusic.Common;
using WebMusic.Models.EF;
using WebMusic.Models;
using WebMusic.Models.Data;

namespace WebMusic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly MusicWebContext _context;
        private readonly UploadFile uploadFile;

        public SongsController(MusicWebContext context)
        {
            _context = context;
            uploadFile = new UploadFile();
        }

        // GET: api/Songs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Song>>> GetSongs()
        {
            if (_context.Songs == null)
            {
                return NotFound();
            }

            return await _context.Songs.ToListAsync();
        }

        // GET: api/Songs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong(int id)
        {
            if (_context.Songs == null)
            {
                return NotFound();
            }
            var song = await _context.Songs.FindAsync(id);

            if (song == null)
            {
                return NotFound();
            }

            return song;
        }

        // PUT: api/Songs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSong(int id, [FromForm] Songs song)
        {
            if (id != song.Id)
            {
                return BadRequest();
            }
            var item = await _context.Songs.FindAsync(id);
            _context.Entry(song).State = EntityState.Modified;
            if (song.FileImg != null)
            {
                item!.Fileimg = await uploadFile.UploadImageAsync(song.FileImg);
            }
            if (song.FileMp3 != null)
            {
                item!.Filesong = await uploadFile.UploadImageAsync(song.FileMp3);
            }
            if (item!.CreatedDate == null)
            {
                item!.CreatedDate = DateTime.Now;
            }
            item!.ModifiedDate = DateTime.Now;
            item!.SongName = song.SongName;
            item!.SongDescription = song.SongDescription;
            item!.Alias = item.SongName != null ? FormatAlias.RemoveDiacritics(item.SongName) : "";
            item.LyricSong = song.LyricSong;
            item.IdAlbum = song.IdAlbum;
            item.IdSinger = song.IdSinger;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SongExists(id))
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

        // POST: api/Songs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Song>> PostSong([FromForm] Songs song)
        {
            if (_context.Songs == null)
            {
                return Problem("Entity set 'MusicWebContext.Songs'  is null.");
            }
            var item = new Song();
            if (song.FileImg != null)
            {
                item.Fileimg = await uploadFile.UploadImageAsync(song.FileImg);
            }
            if (song.FileMp3 != null)
            {
                item.Filesong = await uploadFile.UploadImageAsync(song.FileMp3);
            }
            item.CreatedDate = DateTime.Now;
            item.ModifiedDate = DateTime.Now;
            item.SongName = song.SongName;
            item.SongDescription = song.SongDescription;
            item.Alias = item.SongName != null ? FormatAlias.RemoveDiacritics(item.SongName) : "";
            item.LyricSong = song.LyricSong;
            item.IdAlbum = song.IdAlbum;
            item.IdSinger = song.IdSinger;

            _context.Songs.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSong", new { id = item.Id }, item);
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(int id)
        {
            if (_context.Songs == null)
            {
                return NotFound();
            }
            var song = await _context.Songs.FindAsync(id);
            if (song == null)
            {
                return NotFound();
            }

            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("/playsong/{id}")]
        public async Task<IActionResult> playsong(int id)
        {
            if (_context.Songs == null)
            {
                return NotFound();
            }
            var song = await _context.Songs.FindAsync(id);

            SongItem item= new SongItem();
            item.songName = song.SongName;
            item.fileImg = song.Fileimg;
            item.singerName = _context.Singers.Find(song.IdSinger).SingerName;
            var album = song.IdAlbum != null ? _context.Albums.Find(song.IdAlbum).AlbumName:"";
            item.albumName =  album;


            if (song == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        private bool SongExists(int id)
        {
            return (_context.Songs?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
