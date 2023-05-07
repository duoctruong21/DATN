using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebMusic.Common;
using WebMusic.models.ef;
using WebMusic.Models;

namespace WebMusic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentsController : ControllerBase
    {
        
        private readonly MusicWebContext _context;

        public ComponentsController(MusicWebContext context)
        {
            _context = context;
        }
        //get item song
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SongItem>>> GetItem()
        {
            try {
                List<SongItem> items = await (
                from song in _context.Songs
                join singer in _context.Singers on song.IdSinger equals singer.Id 
                join album in _context.Albums on song.IdAlbum equals album.Id into albumItem
                from albums in albumItem.DefaultIfEmpty()
                select new SongItem
                {
                    songName = song.SongName,
                    singerName = singer.SingerName,
                    albumName = albums.AlbumName,
                    fileImg = song.Fileimg
                }).Take(5).ToListAsync();
                return items;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
