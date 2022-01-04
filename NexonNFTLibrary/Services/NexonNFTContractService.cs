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
        public string ContractAddress { get; set; }
        public string InfuraUrl { get; set; } = "https://ropsten.infura.io/v3/0ea20af2d59441e4896df69099e252c2"
;        /// <summary>
         /// 생성자
         /// </summary>
        public NexonNFTContractService(string contractAddress)
        {
            ContractAddress = contractAddress;
        }

        /// <summary>
        /// 토큰 발행 
        /// </summary>
        public Task<string> MintNFT(string recipient, string tokenURI)
        {
            var privateKey = "0x5350d65309d8558309aebc46554478e86ee58fa96191390c78b068e5fd5086da";
            var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
            var web3 = new Web3(account, InfuraUrl);
            var ContractHandler = web3.Eth.GetContractHandler(ContractAddress);
            var mintFunction = new MintFunction
            {
                Recipient = recipient,
                TokenURI = tokenURI
            };
            return ContractHandler.SendRequestAsync(mintFunction);
        }

        /// <summary>
        /// from 에서 to로 특정 tokenId를 지닌 NFT 전달
        /// </summary>
        public Task<string> TransferFromRequestAsync(string from, string to, BigInteger tokenId)
        {
            var privateKey = "0x5350d65309d8558309aebc46554478e86ee58fa96191390c78b068e5fd5086da";
            var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
            var web3 = new Web3(account, InfuraUrl);
            var ContractHandler = web3.Eth.GetContractHandler(ContractAddress);
            var transferFromFunction = new TransferFromFunction
            {
                From = from,
                To = to,
                TokenId = tokenId
            };

            return ContractHandler.SendRequestAsync(transferFromFunction);
        }

        public async Task<BigInteger> GetBalance(string address)
        {
            var web3 = new Web3(InfuraUrl);
            var balance = await web3.Eth.GetBalance.SendRequestAsync(address);
            return balance.Value;
        }

        public Task<TokenOfOwnerOutputDTO> TokensOfOwnerRequestAsync(string address)
        {
            var privateKey = "0x5350d65309d8558309aebc46554478e86ee58fa96191390c78b068e5fd5086da";
            var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
            var web3 = new Web3(account, InfuraUrl);
            var ContractHandler = web3.Eth.GetContractHandler(ContractAddress);
            var tokenOfOwnerFunction = new TokenOfOwnerFunction
            {
                Owner = address
            };
            return ContractHandler.QueryDeserializingToObjectAsync<TokenOfOwnerFunction, TokenOfOwnerOutputDTO>(tokenOfOwnerFunction);
        }

        public Task<string> TokenURI(BigInteger tokenId)
        {
            var privateKey = "0x5350d65309d8558309aebc46554478e86ee58fa96191390c78b068e5fd5086da";
            var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
            var web3 = new Web3(account, InfuraUrl);
            var ContractHandler = web3.Eth.GetContractHandler(ContractAddress);
            var tokenURIFunction = new TokenURIFunction
            {
                TokenId = tokenId
            };
            return ContractHandler.QueryAsync<TokenURIFunction, string>(tokenURIFunction);
        }
    }
}
