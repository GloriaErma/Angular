using ApiTodo.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using System.Linq;

namespace ApiTodo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // GECS X ERROR de bloqueo po CORS policy: 
            // NO "Access-Control-Allow-Origin" header is present on the request resource
            services.AddCors(options =>
           {
               options.AddPolicy("PolicyGECS",
                   builder => 
                   { 
                       builder.WithOrigins("http://localhost:4200",
                                           "http://localhost:4500"); 
                   });
               options.AddPolicy("PostPolicy",
                  builder =>
                  {
                      builder.WithOrigins("http://localhost:4200",
                                          "http://localhost:4500")
                      .WithMethods("POST", "DELETE", "GET");
                  });
               options.AddPolicy("OtherPolicy",
                  builder =>
                  {
                      builder.WithOrigins("http://example.com")
                                        .AllowAnyOrigin()
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                  });
               options.AddPolicy("AllowOrigin",
                   builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
           });
            /////////////////////////////////////////
            /// adiciona GECS PATCH  .AddNewtonsoftJson();
            IMvcBuilder mvcBuilder = services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());

            /// cambia X otra con opciones
            ///services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddControllersWithViews(options =>
            {
                options.InputFormatters.Insert(0, GetJsonPatchInputFormatter());
            });

            // GECS: INYECTAR conexión DB ApiDB, autenticación Windows, coneccione a que falle
            // estas options se inyectan al constructor class MyDBContext : DbContext en Models
            var connection = @"Server=DESKTOP-MRNH4V2; DataBase=ApiDB; Trusted_Connection=True; ConnectRetryCount=0";
            services.AddDbContext<MyDBContext>(options => options.UseSqlServer(connection));
        }

        private static NewtonsoftJsonPatchInputFormatter GetJsonPatchInputFormatter()
        {
            var builder = new ServiceCollection()
                .AddLogging()
                .AddMvc()
                .AddNewtonsoftJson()
                .Services.BuildServiceProvider();

            return builder
                .GetRequiredService<IOptions<MvcOptions>>()
                .Value
                .InputFormatters
                .OfType<NewtonsoftJsonPatchInputFormatter>()
                .First();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            // GECS X ERROR de bloqueo po CORS policy: 
            // NO "Access-Control-Allow-Origin" header is present on the request resource
            //app.UseCors(x => x
            //    .AllowAnyOrigin()
            //    .AllowAnyMethod()
            //    .AllowAnyHeader());
            /////////////////////////////////////////
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            // GECS X ERROR de bloqueo po CORS policy: 
            // NO "Access-Control-Allow-Origin" header is present on the request resource
            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
