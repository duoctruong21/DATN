using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebMusic.Common;
using WebMusic.Models.EF;
using WebMusic.Models;
using WebMusic.Models.Data;
using System.Reflection.Metadata.Ecma335;
using Org.BouncyCastle.Utilities;
using NuGet.Protocol.Plugins;

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
        [HttpGet("/home")]
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
                    fileImg = song.Fileimg,
                    linksong = song.Alias,
                    linkalbum = albums.Alias,
                    linksinger = singer.Alias,
                    idAlbum = song.IdAlbum,
                    idSinger = song.IdSinger,
                    idSong = song.Id
                }).Take(5).ToListAsync();
                return items;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{alias}")]
        public async Task<ActionResult<IEnumerable<Singer>>> GetItemAll(string alias)
        {
            var item = await _context.Singers.FirstOrDefaultAsync(x => x.Alias.Contains(alias));
            if(item != null)
            {
                return Ok(item);
            }
            return BadRequest();
        }
        [HttpGet("/list-hot-song")]
        public async Task<ActionResult<IEnumerable<SongItem>>> GetItemAll()
        {
            try
            {
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
                    fileImg = song.Fileimg,
                    linksong = song.Alias,
                    linkalbum = albums.Alias,
                    linksinger = singer.Alias,
                    idAlbum = song.IdAlbum,
                    idSinger = song.IdSinger,
                    idSong = song.Id,
                    mp3 = song.Filesong
                }).ToListAsync();
                return items;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("/songbysinger/{id}")]
        public async Task<IEnumerable<SongBySinger>> GetSongBySinger(int id)
        {
            try
            {
                var songs = _context.Songs.Where(x => x.IdSinger == id);
                List<SongBySinger> items = await(from song in songs
                                  join album in _context.Albums on song.IdAlbum equals album.Id into albumItem
                                  from albums in albumItem.DefaultIfEmpty()
                                  select new SongBySinger
                                  {
                                      songName = song.SongName,
                                      aliasSong = song.Alias,
                                      aliasAlbum = albums.Alias,
                                      albumName = albums.AlbumName,
                                      imgalbum = albums.AlbumImg,
                                      imgSong = song.Fileimg,
                                      mp3 = song.Filesong
                                  }).ToListAsync();
                return items;
            }
            catch
            {
                return null;
            }
        }

    }
}
