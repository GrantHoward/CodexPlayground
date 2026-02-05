var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS for Angular app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Codex API v1");
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithTags("Weather");

// Sample items API
var items = new List<Item>
{
    new Item(1, "Sample Item 1", "This is a sample item"),
    new Item(2, "Sample Item 2", "Another sample item")
};

app.MapGet("/api/items", () => items)
    .WithName("GetItems")
    .WithTags("Items")
    .Produces<List<Item>>(StatusCodes.Status200OK);

app.MapGet("/api/items/{id}", (int id) =>
{
    var item = items.FirstOrDefault(i => i.Id == id);
    return item is not null ? Results.Ok(item) : Results.NotFound();
})
.WithName("GetItemById")
.WithTags("Items")
.Produces<Item>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

app.MapPost("/api/items", (Item item) =>
{
    items.Add(item);
    return Results.Created($"/api/items/{item.Id}", item);
})
.WithName("CreateItem")
.WithTags("Items")
.Produces<Item>(StatusCodes.Status201Created);

app.MapPut("/api/items/{id}", (int id, Item updatedItem) =>
{
    var item = items.FirstOrDefault(i => i.Id == id);
    if (item is null) return Results.NotFound();
    
    items.Remove(item);
    items.Add(updatedItem);
    return Results.Ok(updatedItem);
})
.WithName("UpdateItem")
.WithTags("Items")
.Produces<Item>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

app.MapDelete("/api/items/{id}", (int id) =>
{
    var item = items.FirstOrDefault(i => i.Id == id);
    if (item is null) return Results.NotFound();
    
    items.Remove(item);
    return Results.NoContent();
})
.WithName("DeleteItem")
.WithTags("Items")
.Produces(StatusCodes.Status204NoContent)
.Produces(StatusCodes.Status404NotFound);

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

record Item(int Id, string Name, string Description);
