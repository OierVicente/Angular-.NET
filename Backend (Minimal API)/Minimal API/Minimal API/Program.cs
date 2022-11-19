using Microsoft.IdentityModel.Tokens;
using Minimal_API.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


//CORS
builder.Services.AddCors(options =>
{
        options.AddPolicy(name: "MyCors", builder =>
        {
            builder.WithOrigins("https://localhost:4200");
            builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

/* app.MapGet("/apiExterna", async () =>
{
    HttpClient client = new HttpClient();
    var response = await client.GetAsync("https://jsonplaceholder.typicode.com/todos");
    response.EnsureSuccessStatusCode();
    string responseBody = await response.Content.ReadAsStringAsync();

    return responseBody;
}
);*/

//Login
app.MapPost("/login", async (Usuarios usuario, DataContext db) => {

    Response response = new Response();
    var q = await db.Usuarios.SingleOrDefaultAsync(u => u.nombre == usuario.nombre && u.password == usuario.password);

    if (q is not null)
    {
        response.status = 200;
        response.response = "Login correcto";
        return Results.Ok(response);
    }
    else
    {
        response.status = 404;
        response.response = "Usuario o contraseña incorrectos";
        return Results.NotFound(response);
    }
});

//Todos los usuarios
app.MapGet("/usuarios", async (DataContext db) =>{
    var usuarios = await db.Usuarios.ToListAsync();
    return Results.Ok(usuarios);
});

// Por un ID
app.MapGet("/usuarios/{id}", async (int id, DataContext db) => {
    /*await db.Usuarios.FindAsync(id)
    is Usuarios usuario
    ? Results.Ok(usuario)
    : Results.NotFound());*/
    var usuario = await db.Usuarios.FindAsync(id);
    return Results.Ok(usuario);

});

//CREATE usuario
app.MapPost("/usuarios", async (Usuarios usuario, DataContext db) =>
{
    db.Usuarios.Add(usuario);
    await db.SaveChangesAsync();

    return Results.Created($"/usuarios/{usuario.Id}", usuario);
});

//UPDATE usuario
app.MapPut("/usuarios/{id}", async (int id, Usuarios inputUsuario, DataContext db) =>
{
    var usuario = await db.Usuarios.FindAsync(id);

    if(usuario is null) return Results.NotFound();

    usuario.nombre = inputUsuario.nombre;
    usuario.password = inputUsuario.password;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

//DELETE usuario
app.MapDelete("/usuarios/{id}", async (int id, DataContext db) =>
{
    if(await db.Usuarios.FindAsync(id) is Usuarios usuario)
    {
        db.Usuarios.Remove(usuario);
        await db.SaveChangesAsync();
        return Results.Ok(usuario);
    }

    return Results.NotFound();
});

app.UseCors("MyCors");

app.Run();

/*internal record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}*/