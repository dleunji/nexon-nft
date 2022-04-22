using System;
using System.Numerics;
using System.Threading.Tasks;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using NexonNFTLibrary.Interfaces;
using NexonNFTLibrary.Models;

namespace NexonNFTLibrary.Services
{
    public class NexonNFTContractService : INexonNFTContractService
    {
        // 스마트 컨트랙트 주소
        public string ContractAddress { get; set; } = "0x975ccf95aBf2395143298f6f0C246232716FEc26";
        private string InfuraUrl { get; set; } =  "YOUR_INFURA_URL";
        /// <summary>
         /// 생성자
         /// </summary>
        public NexonNFTContractService() { }

        /// <summary>
        /// 토큰 발행 
        /// </summary>
        public Task<string> MintNFT(string privateKey, string recipient, string tokenURI)
        {
            var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
            var web3 = new Web3(account, InfuraUrl);
            var contractHandler = web3.Eth.GetContractHandler(ContractAddress);
            var mintFunction = new MintFunction
            {
                Recipient = recipient,
                TokenURI = tokenURI
            };
            return contractHandler.SendRequestAsync(mintFunction);
        }

        /// <summary>
        /// from 에서 to로 특정 tokenId를 지닌 NFT 전달
        /// </summary>
        public Task<string> TransferFromRequestAsync(string privateKey, string from, string to, BigInteger tokenId)
        {
            var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
            var web3 = new Web3(account, InfuraUrl);
            var contractHandler = web3.Eth.GetContractHandler(ContractAddress);
            var transferFromFunction = new TransferFromFunction
            {
                From = from,
                To = to,
                TokenId = tokenId
            };

            return contractHandler.SendRequestAsync(transferFromFunction);
        }

        /// <summary>
        /// 특정 지갑 주소가 보유한 Nexon NFT 토큰 ID 목록 반환
        /// </summary>
        public Task<TokenOfOwnerOutputDTO> TokensOfOwnerRequestAsync(string privateKey, string address)
        {
            var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
            var web3 = new Web3(account, InfuraUrl);
            var contractHandler = web3.Eth.GetContractHandler(ContractAddress);
            var tokenOfOwnerFunction = new TokenOfOwnerFunction
            {
                Owner = address
            };
            return contractHandler.QueryDeserializingToObjectAsync<TokenOfOwnerFunction, TokenOfOwnerOutputDTO>(tokenOfOwnerFunction);
        }

        /// <summary>
        /// 특정 토큰에 연결된 JSON URI 반환
        /// </summary>
        public Task<string> TokenURI(string privateKey, BigInteger tokenId)
        {
            var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
            var web3 = new Web3(account, InfuraUrl);
            var contractHandler = web3.Eth.GetContractHandler(ContractAddress);
            var tokenUriFunction = new TokenURIFunction
            {
                TokenId = tokenId
            };
            return contractHandler.QueryAsync<TokenURIFunction, string>(tokenUriFunction);
        }
        
        /// <summary>
        /// 특정 지갑 주소의 이더 잔액 반환
        /// </summary>
        public async Task<BigInteger> GetBalance(string address)
        {
            var web3 = new Web3(InfuraUrl);
            var balance = await web3.Eth.GetBalance.SendRequestAsync(address);
            return balance.Value;
        }
    }
}
