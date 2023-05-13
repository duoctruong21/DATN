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
using YoutubeSearch;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Util.Store;

namespace WebMusic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentsController : ControllerBase
    {
        
        private readonly MusicWebContext _context;
        private readonly IWebHostEnvironment _env;

        public ComponentsController(MusicWebContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
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

        [HttpGet("/singer/{alias}")]
        public async Task<ActionResult<IEnumerable<Singer>>> GetAllSongBySingerAlias(string alias)
        {
            var item = await _context.Singers.FirstOrDefaultAsync(x => x.Alias.Contains(alias));
            if(item != null)
            {
                return Ok(item);
            }
            return BadRequest();
        }
        [HttpGet("/song/{alias}")]
        public async Task<ActionResult<IEnumerable<SongItem>>> GetAllSongByAlias(string alias)
        {
            var item =  _context.Songs.Where(x => x.Alias.Contains(alias));
            if (item != null)
            {
                List<SongItem> items = await (
                from song in item
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
            return BadRequest();
        }
        [HttpGet("/album/{alias}")]
        public async Task<ActionResult<IEnumerable<Album>>> GetAllAlbumByAlias(string alias)
        {
            var item = await _context.Albums.FirstOrDefaultAsync(x => x.Alias!.Contains(alias));
            if (item != null)
            {
                return Ok(item);
            }
            return BadRequest();
        }
        [HttpGet("/songbyalbum/{id}")]
        public async Task<ActionResult<IEnumerable<SongItem>>> GetAllSongByAliasAlbum(int id)
        {
            var item = _context.Albums.Where(x => x.Id == id);
            if (item != null)
            {
                List<SongItem> items = await (
                from album in item
                join song in _context.Songs on album.Id equals song.IdAlbum
                join singer in _context.Singers on song.IdSinger equals singer.Id
                select new SongItem
                {
                    songName = song.SongName,
                    singerName = singer.SingerName,
                    albumName = album.AlbumName,
                    fileImg = song.Fileimg,
                    linksong = song.Alias,
                    linkalbum = album.Alias,
                    linksinger = singer.Alias,
                    idAlbum = song.IdAlbum,
                    idSinger = song.IdSinger,
                    idSong = song.Id,
                    mp3 = song.Filesong
                }).ToListAsync();
                return items;
            }
            return BadRequest();
        }
        [HttpGet("/ranked-song")]
        public async Task<ActionResult<IEnumerable<SongItem>>> rankedSong()
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

        [HttpGet("/list-hot-song")]
        public async Task<ActionResult<IEnumerable<SongItem>>> ListHotSong()
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

        // search using api youtobe
        [HttpGet("/search/{content}")]
        public async Task<IEnumerable<musicFormYoutube>> getDataInYtb(string content)
        {
            try
            {
                /*UserCredential credential;
                var path = Path.Combine(_env.WebRootPath, "js", "client_secret_455567548019-0hnnvrmbjckfluridivcg97id3rsgfrm.apps.googleusercontent.com.json");
                using (var stream = new FileStream(path, FileMode.Open, FileAccess.Read))
                {
                    credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                        GoogleClientSecrets.Load(stream).Secrets,
                        // This OAuth 2.0 access scope allows for full read/write access to the
                        // authenticated user"s account.
                        new[] { YouTubeService.Scope.Youtube },
                        "user",
                        CancellationToken.None,
                        new FileDataStore(this.GetType().ToString())
                    );
                }

                var youtubeService = new YouTubeService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = this.GetType().ToString()
                });

                // Gọi API YouTube để tìm kiếm video với từ khóa.
                var searchRequest = youtubeService.Search.List("snippet");
                searchRequest.Q = content;
                searchRequest.MaxResults = 10; // Giới hạn số kết quả tìm kiếm.
                searchRequest.Type = "video"; // Chỉ tìm kiếm video.
                var searchResponse = searchRequest.Execute();

                List<musicFormYoutube> list = new List<musicFormYoutube>();
                foreach (var item in searchResponse.Items)
                {
                    musicFormYoutube audio = new musicFormYoutube();
                    audio.Title = item.Snippet.Title;
                    audio.Author = item.Snippet.ChannelTitle;
                    audio.Audio = "https://www.youtube.com/watch?v=" + item.Id.VideoId;
                    audio.Image = item.Snippet.Thumbnails.Default__.Url;
                    list.Add(audio);
                }
                return list;*/
                YouTubeService youtubeService = new YouTubeService(new BaseClientService.Initializer()
                {
                    ApiKey = "AIzaSyBoeF-xcs-6pfAvr0lid6k_COqAWZLP52A",
                    ApplicationName = "apiyoutubeformusicweb"
                });

                // Gọi API YouTube để tìm kiếm video với từ khóa.
                var searchRequest = youtubeService.Search.List("snippet");
                searchRequest.Q = content;
                searchRequest.MaxResults = 10; // Giới hạn số kết quả tìm kiếm.
                searchRequest.Type = "audio"; // Chỉ tìm kiếm video.
                var searchResponse = searchRequest.Execute();

                // Lấy thông tin của các video từ kết quả tìm kiếm.
                List<musicFormYoutube> list = new List<musicFormYoutube>();
                foreach (var item in searchResponse.Items)
                {
                    musicFormYoutube audio = new musicFormYoutube();
                    audio.Title = item.Snippet.Title;
                    audio.Author = item.Snippet.ChannelTitle;
                    audio.Audio = "https://music.youtube.com/watch?v=" + item.Id.VideoId;
                    audio.Image = item.Snippet.Thumbnails.Default__.Url;
                    list.Add(audio);
                }

                return list;
            }
            catch
            {
                return null;
            }
        }

        

    }
}
