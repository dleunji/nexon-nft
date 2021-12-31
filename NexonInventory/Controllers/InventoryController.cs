using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using NexonInventory.Models;
using NexonNFTLibrary.Interfaces;
using NexonNFTLibrary.Models;
using NexonNFTLibrary.Services;

namespace NexonInventory.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly ILogger<InventoryController> _logger;
        private readonly INexonNFTContractService _service;

        public InventoryController(ILogger<InventoryController> logger, INexonNFTContractService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpPost("mint")]
        public async Task<IActionResult> MintNFT(Mint mint)
        {
            try
            {
                var transactionHash = await _service.MintNFT(mint.Recipient, mint.TokenURI);
                return Ok(new OutputDTO{ HashCode = transactionHash });

            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return NotFound();
            }
        }

        [HttpPost("transfer")]
        public async Task<IActionResult> TransferNFT(Transfer transfer)
        {
            var transactionHash = await _service.TransferFromRequestAsync(transfer.From, transfer.To, transfer.TokenId);
            return Ok(transactionHash);
        }

        [HttpGet("users/{address}/balance")]
        public async Task<IActionResult> GetBalance(string address)
        {
            var balance = await _service.GetBalance(address);
            return Ok(((ulong)balance));
        }


        [HttpGet("users/{address}/items")]
        public async Task<IActionResult> GetTokensOfOwner(string address)
        {
            var tokens = await _service.TokensOfOwnerRequestAsync(address);
            List<ulong> result = new List<ulong>();
            // List<BigInteger>를 List<string>으로 변환
            foreach(BigInteger token in tokens.Tokens)
            {
                result.Add((ulong)token);
            }
            return Ok(result);
        }
    }
}