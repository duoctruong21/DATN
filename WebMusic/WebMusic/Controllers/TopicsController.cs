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
    public class TopicsController : ControllerBase
    {
        private readonly MusicWebContext _context;
        private readonly UploadFile uploadFile;


        public TopicsController(MusicWebContext context)
        {
            _context = context;
            uploadFile = new UploadFile();
        }

        // GET: api/Topics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopics()
        {
            if (_context.Topics == null)
            {
                return NotFound();
            }
            return await _context.Topics.Take(10).ToListAsync();
        }

        // GET: api/Topics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Topic>> GetTopic(int id)
        {
            if (_context.Topics == null)
            {
                return NotFound();
            }
            var topic = await _context.Topics.FindAsync(id);

            if (topic == null)
            {
                return NotFound();
            }

            return topic;
        }


        // PUT: api/Topics/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTopic(int id, [FromForm] Topics topic)
        {
            if (id != topic.Id)
            {
                return BadRequest();
            }
            var item = await _context.Topics.FindAsync(id);
            _context.Entry(topic).State = EntityState.Modified;
            if (topic.FileImg != null)
            {
                _ = UploadFile.Uploadfile(topic.FileImg);
                item!.TopicImg = await uploadFile.UploadImageAsync(topic.FileImg);

            }
            item!.TopicName = topic.TopicName;
            item!.TopicDescription = topic.TopicDescription;
            item!.ModifiedDate = DateTime.Now;
            item!.Alias = item.TopicName != null ? FormatAlias.RemoveDiacritics(item.TopicName) : "";
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(id))
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

        // POST: api/Topics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Topic>> PostTopic([FromForm] Topics topic)
        {
            if (_context.Topics == null)
            {
                return Problem("Entity set 'MusicWebContext.Topics'  is null.");
            }
            var item = new Topic();
            if (topic.FileImg != null)
            {
                _ = UploadFile.Uploadfile(topic.FileImg);
                item.TopicImg = await uploadFile.UploadImageAsync(topic.FileImg);

            }
            item!.TopicName = topic.TopicName;
            item!.TopicDescription = topic.TopicDescription;
            item!.ModifiedDate = DateTime.Now;
            item!.Alias = item.TopicName != null ? FormatAlias.RemoveDiacritics(item.TopicName) : "";
            _context.Topics.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTopic", new { id = item.Id }, item);
        }

        // DELETE: api/Topics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopic(int id)
        {
            if (_context.Topics == null)
            {
                return NotFound();
            }
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null)
            {
                return NotFound();
            }

            _context.Topics.Remove(topic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TopicExists(int id)
        {
            return (_context.Topics?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
