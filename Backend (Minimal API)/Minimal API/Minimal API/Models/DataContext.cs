global using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

namespace Minimal_API.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            //NO LO HACE

            /*var listaRoles = new List<Roles> {
                new Roles { nombre = "Admin" },
                new Roles { nombre = "Default"}
            };
            this.Roles.AddRange(listaRoles);
            this.SaveChanges();

            var listaUsuarios = new List<Usuarios> {
                new Usuarios { nombre = "Pedro", password = "123", rol = listaRoles[0]  },
                new Usuarios { nombre = "Oier", password = "123", rol = listaRoles[0]   },
                new Usuarios { nombre = "Ramon", password = "123", rol = listaRoles[0]  },
                new Usuarios { nombre = "Ander", password = "123", rol = listaRoles[0]  }
            };
            this.Roles.AddRange(listaRoles);
            this.SaveChanges();*/

        }

        public DbSet<Usuarios> Usuarios => Set<Usuarios>();
    }
}
