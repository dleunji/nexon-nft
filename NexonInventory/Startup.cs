using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using NexonNFTLibrary.Interfaces;
using NexonNFTLibrary.Services;

namespace NexonInventory
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
            // 추후 환경변수 처리
            //var privateKey = "0x5350d65309d8558309aebc46554478e86ee58fa96191390c78b068e5fd5086da";
            //var infuraUrl = "https://ropsten.infura.io/v3/0ea20af2d59441e4896df69099e252c2";
            //var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
            //var web3 = new Web3(account, infuraUrl);
            //var contractAddress = "0x346315199D9be81629269305e1c75f3de4D8087c";
            services.AddTransient<INexonNFTContractService, NexonNFTContractService>();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
