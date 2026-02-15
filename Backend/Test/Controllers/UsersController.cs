using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Test.Model;

namespace TestSara.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        // Mock Users list
        private static List<User> Users = new List<User>
        {
            new User { Id = 1, Name = "Sara" },
            new User { Id = 2, Name = "David" },
            new User { Id = 3, Name = "Maya" }
        };

        // GET: api/users
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(Users);
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public ActionResult<User> CreateUser([FromBody] User newUser)
        {
            if (newUser == null)
                return BadRequest("User is null");

            newUser.Id = Users.Any() ? Users.Max(u => u.Id) + 1 : 1;
            Users.Add(newUser);
            return Ok(newUser);
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public ActionResult<User> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (updatedUser == null)
                return BadRequest("User is null");

            var user = Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound();

            user.Name = updatedUser.Name;
            return Ok(user);
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound();

            Users.Remove(user);
            return Ok();
        }
    }
}
