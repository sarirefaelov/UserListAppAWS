using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using TestSara.Models;

namespace TestSara.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
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
        public IEnumerable<User> Get()
        {
            return Users;
        }

        // GET: api/users/5
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var user = Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public IHttpActionResult Post([FromBody] User newUser)
        {
            if (newUser == null)
                return BadRequest("User is null");

            // If no users exist, start from 1
            newUser.Id = Users.Any() ? Users.Max(u => u.Id) + 1 : 1;
            Users.Add(newUser);
            return Ok(newUser); // Return the new user
        }

        // PUT: api/users/5
        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody] User updatedUser)
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
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var user = Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound();

            Users.Remove(user);
            return Ok();
        }
    }
}