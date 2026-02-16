using System.ComponentModel.DataAnnotations;

namespace Test.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

    }
}
