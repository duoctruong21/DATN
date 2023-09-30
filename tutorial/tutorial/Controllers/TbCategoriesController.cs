using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tutorial.Models.EF;

namespace tutorial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbCategoriesController : ControllerBase
    {
        private readonly TutorialContext _context;

        public TbCategoriesController(TutorialContext context)
        {
            _context = context;
        }

        // GET: api/TbCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbCategory>>> GetTbCategories()
        {
          if (_context.TbCategories == null)
          {
              return NotFound();
          }
            return await _context.TbCategories.ToListAsync();
        }

        // GET: api/TbCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbCategory>> GetTbCategory(int id)
        {
          if (_context.TbCategories == null)
          {
              return NotFound();
          }
            var tbCategory = await _context.TbCategories.FindAsync(id);

            if (tbCategory == null)
            {
                return NotFound();
            }

            return tbCategory;
        }

        // PUT: api/TbCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbCategory(int id, TbCategory tbCategory)
        {
            if (id != tbCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(tbCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbCategoryExists(id))
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

        // POST: api/TbCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TbCategory>> PostTbCategory(TbCategory tbCategory)
        {
          if (_context.TbCategories == null)
          {
              return Problem("Entity set 'TutorialContext.TbCategories'  is null.");
          }
            _context.TbCategories.Add(tbCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTbCategory", new { id = tbCategory.Id }, tbCategory);
        }

        // DELETE: api/TbCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbCategory(int id)
        {
            if (_context.TbCategories == null)
            {
                return NotFound();
            }
            var tbCategory = await _context.TbCategories.FindAsync(id);
            if (tbCategory == null)
            {
                return NotFound();
            }

            _context.TbCategories.Remove(tbCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TbCategoryExists(int id)
        {
            return (_context.TbCategories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
