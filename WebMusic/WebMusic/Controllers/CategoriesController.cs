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
    public class CategoriesController : ControllerBase
    {
        private readonly MusicWebContext _context;
        private readonly UploadFile uploadFile;

        public CategoriesController(MusicWebContext context)
        {
            _context = context;
            uploadFile = new UploadFile();
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}/{FileImg}")]
        public async Task<IActionResult> PutCategory([FromRoute] int id, [FromForm] Category category, [FromRoute] IFormFile FileImg)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;
            if (FileImg != null)
            {
                category.CategoryImg = await uploadFile.UploadImageAsync(FileImg);
            }
            if (category.CreatedDate == null)
            {
                category.CreatedDate = DateTime.Now;
            }
            category.ModifiedDate = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostCategory([FromForm] Item item)
        {
            if (_context.Categories == null)
            {
                return Problem("Entity set 'MusicWebContext.Categories'  is null.");
            }
            var checkCategory = _context.Categories.FirstOrDefault(x=>x.Id == item.id);
            if(checkCategory == null)
            {
                var check = _context.Categories.FirstOrDefault(x => x.Alias.Contains(FormatAlias.RemoveDiacritics(item.name!)));
                var category = new Category();
                int count = 1;

                if (check == null)
                {
                    category!.Alias = item.name != null ? FormatAlias.RemoveDiacritics(item.name!) : "";
                }
                else
                {
                    foreach (var checkAlias in _context.Categories)
                    {
                        string checkname = item.name! + " " + count.ToString();
                        if (checkAlias.Alias.Contains(FormatAlias.RemoveDiacritics(checkname)))
                        {
                            count++;
                        }
                    }
                    category!.Alias = item.name != null ? FormatAlias.RemoveDiacritics(item.name! + " " + count.ToString()) : "";
                }
                if (item.img != null)
                {
                    category.CategoryImg = await uploadFile.UploadImageAsync(item.img);
                }
                else
                {
                    category.CategoryImg = "https://cdn-icons-png.flaticon.com/512/3460/3460797.png";
                }
                category.CategoryName = item.name;
                category.CreatedDate = DateTime.Now;
                category.ModifiedDate = DateTime.Now;

                _context.Categories.Add(category);
            }
            else
            {
                var check = _context.Categories.FirstOrDefault(x => x.Alias.Contains(FormatAlias.RemoveDiacritics(item.name!)));
                int count = 1;

                if (check == null)
                {
                    checkCategory!.Alias = item.name != null ? FormatAlias.RemoveDiacritics(item.name!) : "";
                }
                else
                {
                    foreach (var checkAlias in _context.Categories)
                    {
                        string checkname = item.name! + " " + count.ToString();
                        if (checkAlias.Alias.Contains(FormatAlias.RemoveDiacritics(checkname)))
                        {
                            count++;
                        }
                    }
                    checkCategory!.Alias = item.name != null ? FormatAlias.RemoveDiacritics(item.name! + " " + count.ToString()) : "";
                }
                if (item.img != null)
                {
                    checkCategory.CategoryImg = await uploadFile.UploadImageAsync(item.img);
                }
                else
                {
                    checkCategory.CategoryImg = "https://cdn-icons-png.flaticon.com/512/3460/3460797.png";
                }
                checkCategory.CategoryName = item.name;
                checkCategory.ModifiedDate = DateTime.Now;

                _context.Categories.Update(checkCategory);
            }
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("/addsongincategory")]
        public async Task<ActionResult> addsongbycategory( AddSongbyCategory category)
        {
            if(category != null)
            {

                Albumuser albumuser = new Albumuser();

                for(int i =0; i < category.list.Count; i++)
                {
                    // lấy bài hát và album

                }
            }
            return Ok(category);
        }

        private bool CategoryExists(int id)
        {
            return (_context.Categories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
