using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minimal_API.Models
{
    public class Usuarios
    {
        public int Id { get; set; }
        public string nombre { get; set; }
        public string password { get; set; }
    }
}
