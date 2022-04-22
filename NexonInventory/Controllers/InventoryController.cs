using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nethereum.Web3;
using NexonInventory.Models;
using NexonNFTLibrary.Interfaces;
using NexonNFTLibrary.Models;

namespace NexonInventory.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly ILogger<InventoryController> _logger;
        private readonly INexonNFTContractService _service;

        public InventoryController(ILogger<InventoryController> logger, INexonNFTContractService service )
        {
            _logger = logger;
            _service = service;
        }

        /// <summary>
        /// 토큰 발행 후 메타 데이터의 정보가 있는 'tokenURI'를 연결하고 'recipient'에게 전달
        /// </summary>
        [HttpPost("mint")]
        public async Task<IActionResult> MintNFT(MintRequest mintRequest)
        {
            var privateKey = "PRIVATE_KEY";
            try
            {
                var transactionHash = await _service.MintNFT(privateKey, mintRequest.Recipient, mintRequest.TokenURI);
                return Ok(new Response { Code = 200, Message = "mint success", Hash = transactionHash });

            }
            catch (Exception e)
            {
                var res = new ObjectResult(new Response { Code = 501, Message = e.ToString() })
                {
                    StatusCode = 500
                };
                return res;
            }
        }

        /// <summary>
        /// 'to'에게 특정 'tokenId'를 지닌 토큰을 전달
        /// </summary>
        [HttpPost("transfer")]
        public async Task<IActionResult> TransferNFT(TransferRequest transferRequest)
        {
            var privateKey = "PRIVATE_KEY";
            try
            {
                var transactionHash = await _service.TransferFromRequestAsync(privateKey, transferRequest.From, 
                    transferRequest.To, transferRequest.TokenId);
                return Ok(new Response { Code=201, Message = "transfer success", Hash = transactionHash });
            }
            catch (Exception e)
            {
                var res = new ObjectResult(new Response { Code = 502, Message = e.ToString() })
                {
                    StatusCode = 500
                };
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
                // convert wei to ether 
                var ether = Web3.Convert.FromWei(balance);
                return Ok(new BalanceResponse { Message = "get balance success", Balance = ether });
            }
            catch (Exception e)
            {
                var res = new ObjectResult(new Response{Code = 503, Message = e.ToString()})
                {
                    StatusCode = 500
                };
                return res;
            }
        }

        /// <summary>
        /// 'address'의 유저가 보유한 token의 Id 리스트 확인
        /// </summary>
        [HttpGet("users/{address}/tokens")]
        public async Task<IActionResult> GetTokensOfOwner(string address)
        {
            var privateKey = "PRIVATE_KEY";
            TokenOfOwnerOutputDTO tokens;
            try
            {
                tokens = await _service.TokensOfOwnerRequestAsync(privateKey, address);
            }
            catch (Exception e)
            {
                var res = new ObjectResult(new Response{Code = 504, Message = e.ToString()})
                { 
                    StatusCode = 500
                };
                return res;
            }
            // List<BigInteger>를 List<string>으로 변환
            // token은 최대 32바이트(uint256)
            var result = tokens.Tokens.Select(token => token.ToString()).ToList();
            return Ok(new TokenListResponse { Message = "get tokenList success", TokenList = result });
        }

        //
        // /// <summary>
        // /// 로그인 후 쿠키에 사용자 정보 저장
        // /// </summary>
        // [HttpPost("auth/login")]
        // public IActionResult Login(AuthRequest authRequest)
        // {
        //     var accountFilePath = Directory.GetCurrentDirectory();
        //     // 운영체제별 파일 경로 설정
        //     var accountFile = accountFilePath + Path.DirectorySeparatorChar + "accounts.json";
        //     try
        //     {
        //         // 이미 쿠키에 저장된 계정 존재
        //         if (HttpContext.Request.Cookies["address"] != null)
        //         {
        //             // 로그인 시도하는 계정으로 이미 로그인 상태였으면 이미 로그인 되었음을 알린다.
        //             if (HttpContext.Request.Cookies["address"] == authRequest.Address)
        //             {
        //                 return Ok(new ResponseDTO { Message = "Already Logged In", Value = authRequest.Address });
        //             }
        //
        //             // 로그인 시도하는 계정과 현재 로그인된 계정이 다른 경우는 409 Conflict 에러와 자동 로그아웃 처리(쿠키 삭제)
        //             if (HttpContext.Request.Cookies["address"] != authRequest.Address)
        //             {
        //                 ObjectResult res = new ObjectResult(new ResponseDTO { Message = "Logged In With Other Account", Value = authRequest.Address });
        //                 res.StatusCode = 409;
        //                 Logout();
        //                 return res;
        //             }
        //         }
        //
        //         if (System.IO.File.Exists(accountFile))
        //         {
        //             StreamReader r = new StreamReader(accountFile);
        //             string accountsJson = r.ReadToEnd();
        //             // account 리스트 생성
        //             List<AuthAccount> accounts = JsonConvert.DeserializeObject<List<AuthAccount>>(accountsJson);
        //             foreach (var account in accounts)
        //             {
        //
        //                 // 로그인 성공 후 클라이언트 측 쿠키에 사용자 정보 저장
        //                 if (authRequest.Address == account.Address && authRequest.Password == account.Password)
        //                 {
        //                     HttpContext.Response.Cookies.Append("address", account.Address);
        //                     HttpContext.Response.Cookies.Append("privateKey", account.PrivateKey);
        //                     // value로 사용자의 주소 리턴
        //                     return Ok(new ResponseDTO { Message = "Login Success", Value = authRequest.Address });
        //                 }
        //             }
        //         }
        //         else
        //         {
        //             // 로그인 실패
        //             ObjectResult res = new ObjectResult(new ResponseDTO { Message = "Login Failed", Value = authRequest.Address });
        //             res.StatusCode = 401;
        //             return res;
        //         }
        //         return NotFound();
        //     }
        //     catch (Exception e)
        //     {
        //         ObjectResult res = new ObjectResult(e.ToString());
        //         res.StatusCode = 500;
        //         return res;
        //     }
        // }
        //
        // /// <summary>
        // /// 로그인 여부 확인
        // /// </summary>
        // [HttpGet("auth/check")]
        // public IActionResult CheckLogin()
        // {
        //     try
        //     {
        //         var address = HttpContext.Request.Cookies["address"];
        //         if (address != null)
        //         {
        //             return Ok(new ResponseDTO { Message = "Check Login Success", Value = address });
        //         }
        //
        //         ObjectResult res = new ObjectResult(new ResponseDTO { Message = "Check Login Failed", Value = address });
        //         res.StatusCode = 401;
        //         return res;
        //     }
        //     catch (Exception e)
        //     {
        //         ObjectResult res = new ObjectResult(e.ToString());
        //         res.StatusCode = 500;
        //         return res;
        //     }
        // }
        //
        // [HttpPost("auth/logout")]
        // public IActionResult Logout()
        // {
        //     // 쿠키에 저장된 계정 삭제
        //     try
        //     {
        //         if (HttpContext.Request.Cookies["address"] != null)
        //         {
        //             HttpContext.Response.Cookies.Delete("address");
        //         }
        //         if (HttpContext.Request.Cookies["privateKey"] != null)
        //         {
        //             HttpContext.Response.Cookies.Delete("privateKey");
        //         }
        //         return Ok(new ResponseDTO { Message = "Logout Success", Value = "None" });
        //     }
        //     catch (Exception e)
        //     {
        //         ObjectResult res = new ObjectResult(e.ToString());
        //         res.StatusCode = 500;
        //         return res;
        //     }
        // }


        /// <summary>
        /// tokenId에 해당하는 tokenURI 확인
        /// </summary>
        [HttpGet("items/{tokenId}")]
        public async Task<IActionResult> tokenURI(ulong tokenId)
        {
            var privateKey = "PRIVATE_KEY";
            try
            {
                var tokenURI = await _service.TokenURI(privateKey, tokenId);
                return Ok(new TokenURIResponse { Message = "TokenURI Success", TokenURI = tokenURI });
            }
            catch (Exception e)
            {
                ObjectResult res = new ObjectResult(new Response { Code = 505, Message = e.ToString() });
                return res;
            }
        }
    }
}