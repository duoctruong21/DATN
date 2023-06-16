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
using Azure;
using System.Net.Http;
using HtmlAgilityPack;
using System.Text.Json;
using System.Text;
using System.IO.Compression;
using Microsoft.AspNetCore.Html;
using AngleSharp.Browser.Dom;
using OpenQA.Selenium;

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
                }).OrderByDescending(x => x.idSong).Take(5).ToListAsync();
                return items;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("/singer/{alias}")]
        public async Task<ActionResult<IEnumerable<SingerInfo>>> GetAllSongBySingerAlias(string alias)
        {
            var item = await _context.Singers.FirstOrDefaultAsync(x => x.Alias.Contains(alias));
            if (item != null)
            {
                var items = await (from singer in _context.Singers
                                   join song in _context.Songs on singer.Id equals song.IdSinger
                                   join album in _context.Albums on song.IdAlbum equals album.Id into albumItem
                                   from albums in albumItem.DefaultIfEmpty()
                                   where singer.Id == item.Id
                                   select new SingerInfo
                                   {
                                       albumName = albums.AlbumName,
                                       songName = song.SongName,
                                       singerName = singer.SingerName,
                                       linkalbum = albums.Alias,
                                       linksinger = singer.Alias,
                                       linksong = song.Alias,
                                       fileImg = song.Fileimg,
                                       mp3 = song.Filesong,
                                       idSong = song.Id,
                                       fileImgSinger = singer.Fileimg,
                                       descriptions = singer.SingerDescription
                                   }).ToListAsync();
                return Ok(items);
            }
            return BadRequest();
        }
        [HttpGet("/song/{alias}")]
        public async Task<ActionResult<IEnumerable<SongItem>>> GetAllSongByAlias(string alias)
        {
            var item = _context.Songs.Where(x => x.Alias.Contains(alias)).Take(1);
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
                    mp3 = song.Filesong,
                    count = song.ListenCount,
                    date = song.RecentListendate
                 
                }).OrderByDescending(x=>x.date).OrderByDescending(x => x.count).Take(100).ToListAsync();
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
                List<SongBySinger> items = await (from song in songs
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
        public async Task<IEnumerable<SongItem>> getDataInYtb(string content)
        {
            var search = FormatAlias.ConvertToEnglish(content);
            List<SongItem> items = await (from song in _context.Songs
                                          join singer in _context.Singers on song.IdSinger equals singer.Id
                                          join album in _context.Albums on song.IdAlbum equals album.Id into albumItem
                                          from albums in albumItem.DefaultIfEmpty()
                                          where (song.SongName!.Contains(search) == true || singer.SingerName!.Contains(search) == true)
                                          select new SongItem
                                          {
                                              songName = song.SongName,
                                              singerName = singer.SingerName,
                                              linksong = song.Alias,
                                              linkalbum = albums.Alias,
                                              linksinger = singer.Alias,
                                              albumName = albums.AlbumName,
                                              fileImg = song.Fileimg,
                                              mp3 = song.Filesong
                                          }).ToListAsync();
            if (items != null)
            {
                return items;
            }
            else
            {
                return null;
            }

        }

        [HttpGet("/getDataFromWeb")]
        public async Task<IActionResult> GetMusicData()
        {
            HttpClient httpClient = new HttpClient();
            // Add or modify headers



            // Send GET request to the website and retrieve the HTML content
            HttpResponseMessage response = await httpClient.GetAsync("https://zingmp3.vn/");

            string jsonResponse = await response.Content.ReadAsStringAsync();
            var musicData = JsonSerializer.Deserialize<string>(jsonResponse);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();

                // Load the HTML content into HtmlDocument

                if (response.Content.Headers.ContentEncoding.Contains("gzip"))
                {
                    using (var gzipStream = new GZipStream(await response.Content.ReadAsStreamAsync(), CompressionMode.Decompress))
                    using (var reader = new StreamReader(gzipStream, Encoding.UTF8))
                    {
                        string uncompressedContent = await reader.ReadToEndAsync();
                        HtmlDocument htmlDocument = new HtmlDocument();
                        htmlDocument.LoadHtml(uncompressedContent);
                        return Ok(uncompressedContent);

                        HtmlNode containerNode = htmlDocument.DocumentNode.SelectSingleNode("//div[contains(@class, 'container')]");

                        if (containerNode != null)
                        {
                            // Access or manipulate the containerNode here
                            string containerContent = containerNode.InnerHtml;
                            return Ok(containerContent);
                        }


                    }
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("/searchusingapiytb/{content}")]
        public async Task<IEnumerable<SongItem>> getmusicapi(string content)
        {
            try
            {
                YouTubeService youtubeService = new YouTubeService(new BaseClientService.Initializer()
                {
                    ApiKey = "AIzaSyBoeF-xcs-6pfAvr0lid6k_COqAWZLP52A",
                    ApplicationName = "apiyoutubeformusicweb"
                });

                // Gọi API YouTube để tìm kiếm video với từ khóa.
                var searchRequest = youtubeService.Search.List("snippet");
                searchRequest.Q = content;
                searchRequest.MaxResults = 10; // Giới hạn số kết quả tìm kiếm.
                searchRequest.Type = "video"; // Chỉ tìm kiếm video.
                var searchResponse = searchRequest.Execute();

                // Lấy thông tin của các video từ kết quả tìm kiếm.
                List<SongItem> list = new List<SongItem>();
                foreach (var item in searchResponse.Items)
                {
                    SongItem audio = new SongItem();
                    audio.songName = item.Snippet.Title;
                    audio.singerName = item.Snippet.ChannelTitle;
                    string url = "https://music.youtube.com/watch?v=" + item.Id.VideoId;
                    //audio.mp3 = await ApiYoutube.ConvertYouTubeLinkToMp3("https://www.youtube.com/watch?v=udOHhRnc3Kg&ab_channel=CloudMood");
                    audio.fileImg = item.Snippet.Thumbnails.Default__.Url;
                    audio.fileImgSinger = item.Snippet.Thumbnails.Default__.Url;
                    list.Add(audio);

                    /*var itemsingers = _context.Singers.Where(x => x.SingerName!.Equals(audio.singerName)).ToList();
                    if (itemsingers.Count < 1)
                    {
                        var singer = new Singer();
                        singer.SingerName = audio.singerName;
                        singer.Fileimg = audio.fileImgSinger;
                        _context.Singers.Add(singer);
                        _context.SaveChanges();
                    }


                    var items = _context.Songs.Where(x => x.Filesong!.Equals(audio.mp3)).ToList();

                    if (items.Count < 1)
                    {
                        var song = new Song();
                        song.SongName = audio.songName;
                        song.Filesong = audio.mp3;
                        song.Fileimg = audio.fileImg;
                        var idsinger = _context.Singers.FirstOrDefault(x => x.SingerName!.Equals(audio.singerName));
                        if (idsinger != null)
                        {
                            song.IdSinger = idsinger.Id;
                            _context.Songs.Add(song);
                        }
                    }*/

                }
                _context.SaveChanges();

                return list;
            }
            catch
            {
                return null;
            }
        }

        [HttpGet("/recommend/{content}")]
        public async Task<IActionResult> reconmend(string content)
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
                }).OrderByDescending(x => x.idSong).ToListAsync();
            var songs = _context.Songs.FirstOrDefault(x=>x.Alias.Contains(content));
            var singers = _context.Singers.Find(songs.IdSinger);
            SongItem songplaying = new SongItem();
            songplaying.songName = songs.SongName;
            songplaying.mp3 = songs.Filesong;
            songplaying.linksong = songs.Alias;
            songplaying.idSinger = songs.IdSinger;
            songplaying.singerName = _context.Singers.Find(songs.IdSinger).SingerName;
            songplaying.fileImg = songs.Fileimg;
            songplaying.idSong = songs.Id;
            List<int> list = await recommnend.recommendSystem(songs.Alias, items);
            List<SongItem> listsongrecomment = new List<SongItem>();
            listsongrecomment.Add(songplaying);
            for (int i = 0; i < 10; i++)
            {
                var item = _context.Songs.FirstOrDefault(x => x.Id == list[i]);
                if (item != null && songs.Id != item.Id)
                {
                    SongItem songitem = new SongItem();
                    songitem.songName = item!.SongName;
                    songitem.mp3 = item.Filesong;
                    songitem.linksong = item.Alias;
                    songitem.idSinger = item.IdSinger;
                    songitem.singerName = _context.Singers.Find(item.IdSinger).SingerName;
                    songitem.fileImg = item.Fileimg;
                    songitem.idSong = item.Id;
                    songitem.linksinger = _context.Singers.Find(item.IdSinger).Alias;
                    listsongrecomment.Add(songitem);
                }

            }



            return Ok(listsongrecomment);
        }

        [HttpPost("/updatecountsong/{id}")]
        public async Task<IActionResult> updatesong (int id)
        {
            var checkSong = _context.Songs.FirstOrDefault(x => x.Id == id);
            // cập nhật lượt nghe
            var recentlisten = _context.Songs.FirstOrDefault(x => x.Id == id);
            checkSong.RecentListendate = DateTime.Now;
            checkSong.ListenCount = recentlisten != null ? recentlisten.ListenCount + 1 : 1;
            _context.Songs.Update(checkSong);
            _context.SaveChanges();
            return Ok();
        }

       /* [HttpGet("/recommenduser/{id}")]
        public async Task<IActionResult> recommenduser(int id)
        {
            var items = _context.Histories.Where(x => x.Iduser == id).OrderByDescending(x=>x.Listendate).OrderByDescending(x=>x.Countlisten).Take(3).ToList();
            List<SongItem> listSong = await (
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
                }).OrderByDescending(x => x.idSong).ToListAsync();
            List<SongItem> listsongrecomment = new List<SongItem>();
            foreach (var item in items)
            {
                var alias = _context.Songs.FirstOrDefault(x=>x.Id == item.Idsong);
                List<int> list = await recommnend.recommendSystem(alias.Alias, listSong);
                for (int i = 0; i < 2; i++)
                {
                    var song = _context.Songs.FirstOrDefault(x => x.Id == list[i]);
                    if (song != null)
                    {
                        SongItem songitem = new SongItem();
                        songitem.songName = song!.SongName;
                        songitem.mp3 = song.Filesong;
                        songitem.linksong = song.Alias;
                        songitem.idSinger = song.IdSinger;
                        songitem.singerName = _context.Singers.Find(song.IdSinger).SingerName;
                        songitem.fileImg = song.Fileimg;
                        songitem.idSong = song.Id;
                        songitem.linksinger = _context.Singers.Find(song.IdSinger).Alias;
                        listsongrecomment.Add(songitem);
                    }

                }
            }
            return Ok(listsongrecomment);
        }

        [HttpGet("/recommendtopsong")]
        public async Task<IActionResult> recommendtopsong()
        {
            var items = _context.Songs.OrderByDescending(x => x.RecentListendate).OrderByDescending(x => x.ListenCount).Take(3).ToList();
            List<SongItem> listSong = await (
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
                }).OrderByDescending(x => x.idSong).ToListAsync();
            List<SongItem> listsongrecomment = new List<SongItem>();
            foreach (var item in items)
            {
                List<int> list = await recommnend.recommendSystem(item.Alias, listSong);
                for (int i = 0; i < 2; i++)
                {
                    var song = _context.Songs.FirstOrDefault(x => x.Id == list[i]);
                    if (song != null)
                    {
                        SongItem songitem = new SongItem();
                        songitem.songName = song!.SongName;
                        songitem.mp3 = song.Filesong;
                        songitem.linksong = song.Alias;
                        songitem.idSinger = song.IdSinger;
                        songitem.singerName = _context.Singers.Find(song.IdSinger).SingerName;
                        songitem.fileImg = song.Fileimg;
                        songitem.idSong = song.Id;
                        songitem.linksinger = _context.Singers.Find(song.IdSinger).Alias;
                        listsongrecomment.Add(songitem);
                    }

                }
            }
            return Ok(listsongrecomment);
        }*/
    }
}
