using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Newtonsoft.Json;
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

        /// <summary>
        /// 토큰 발행 후 메타 데이터의 정보가 있는 'tokenURI'를 연결하고 'recipient'에게 전달 
        /// </summary>
        [HttpPost("mint")]
        public async Task<IActionResult> MintNFT(Mint mint)
        {
            try
            {
                var transactionHash = await _service.MintNFT(mint.Recipient, mint.TokenURI);
                return Ok(new ResponseDTO { Message = "Success", Value = transactionHash });

            }
            catch (Exception e)
            {
                ObjectResult res = new ObjectResult(e.ToString());
                return res;
            }
        }

        /// <summary>
        /// 'to'에게 특정 'tokenId'를 지닌 토큰을 전달
        /// </summary>
        [HttpPost("transfer")]
        public async Task<IActionResult> TransferNFT(Transfer transfer)
        {
            try
            {
                var transactionHash = await _service.TransferFromRequestAsync(transfer.From, transfer.To, transfer.TokenId);
                return Ok(new ResponseDTO { Message = "Transfer Success", Value = transactionHash });
            }
            catch (Exception e)
            {
                ObjectResult res = new ObjectResult(e.ToString());
                return res;
            }
        }

        /// <summary>
        /// 'address'의 유저의 이더 잔고 확인
        /// </summary>
        [HttpGet("users/{address}/balance")]
        public async Task<IActionResult> GetBalance(string address)
        {
            try
            {
                var balance = await _service.GetBalance(address);
                return Ok(new ResponseDTO { Message = "Get Balance Success", Value = balance });
            }
            catch (Exception e)
            {
                ObjectResult res = new ObjectResult(e.ToString());
                res.StatusCode = 500;
                return res;
            }
        }

        /// <summary>
        /// 'address'의 유저가 보유한 token의 Id 리스트 확인
        /// </summary>
        [HttpGet("users/{address}/items")]
        public async Task<IActionResult> GetTokensOfOwner(string address)
        {
            try
            {
                var tokens = await _service.TokensOfOwnerRequestAsync(address);
                List<ulong> result = new List<ulong>();
                // List<BigInteger>를 List<string>으로 변환
                foreach (BigInteger token in tokens.Tokens)
                {
                    result.Add((ulong)token);
                }
                return Ok(new ResponseDTO { Message = "Success", Value = result });
            }
            catch (Exception e)
            {
                ObjectResult res = new ObjectResult(e.ToString());
                res.StatusCode = 500;
                return res;
            }
        }


        /// <summary>
        /// 로그인 후 쿠키에 사용자 정보 저장
        /// </summary>
        [HttpPost("auth/login")]
        public IActionResult Login(AuthRequest authRequest)
        {
            var accountFilePath = Directory.GetCurrentDirectory();
            // 운영체제별 파일 경로 설정 
            var accountFile = accountFilePath + Path.DirectorySeparatorChar + "accounts.json";
            try
            {
                if (System.IO.File.Exists(accountFile))
                {
                    StreamReader r = new StreamReader(accountFile);
                    string accountsJson = r.ReadToEnd();
                    // account 리스트 생성
                    List<AuthAccount> accounts = JsonConvert.DeserializeObject<List<AuthAccount>>(accountsJson);
                    foreach (var account in accounts)
                    {
                        // 로그인 성공 후 클라이언트 측 쿠키에 사용자 정보 저장
                        if (authRequest.Address == account.Address && authRequest.Password == account.Password)
                        {
                            HttpContext.Response.Cookies.Append("Address", account.Address);
                            HttpContext.Response.Cookies.Append("PrivateKey", account.PrivateKey);
                            return Ok(new ResponseDTO { Message = "Login Success", Value = authRequest.Address });
                        }
                    }
                }
                else
                {
                    ObjectResult res = new ObjectResult(new ResponseDTO { Message = "Login Failed", Value = authRequest.Address });
                    res.StatusCode = 401;
                    return res;
                }
                return NotFound();
            } catch (Exception e)
            {
                ObjectResult res = new ObjectResult(e.ToString());
                res.StatusCode = 500;
                return res;
            }
        }

        [HttpGet("auth/check")]
        public IActionResult CheckLogin()
        {
            try
            {
                var address = HttpContext.Request.Cookies["Address"];
                if (address != null)
                {
                    return Ok(new ResponseDTO { Message = "Check Login Success", Value = address });
                }
                else
                {
                    ObjectResult res = new ObjectResult(new ResponseDTO { Message = "Check Login Failed", Value = address });
                    res.StatusCode = 401;
                    return res;
                }
            } catch (Exception e)
            {
                ObjectResult res = new ObjectResult(e.ToString());
                res.StatusCode = 500;
                return res;
            }
        }
    }
}