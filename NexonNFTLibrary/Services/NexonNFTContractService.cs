using System;
using System.Numerics;
using System.Threading.Tasks;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using NexonNFTLibrary.Interfaces;
using NexonNFTLibrary.Models;

namespace NexonNFTLibrary.Services
{
    public class NexonNFTContractService : INexonNFTContractService
    {
        //public Web3 Web3 { get; set; }
        //public ContractHandler ContractHandler { get; set; }

        /// <summary>
        /// 생성자
        /// </summary>
        /// <param name="web3"></param>
        /// <param name="contractAddress"></param>
        //public NexonNFTContractService(Web3 web3, string contractAddress)
        //{
        //    Web3 = web3;
        //    ContractHandler = web3.Eth.GetContractHandler(contractAddress);
        //}

        /// <summary>
        /// 토큰 발행 
        /// </summary>
        /// <param name="recipient"></param>
        /// <param name="tokenURI"></param>
        /// <returns></returns>
        public Task<string> MintNFT(string recipient, string tokenURI)
        {
            var account = new Account("0x5350d65309d8558309aebc46554478e86ee58fa96191390c78b068e5fd5086da", Nethereum.Signer.Chain.Ropsten);
            var infuraUrl = "https://ropsten.infura.io/v3/0ea20af2d59441e4896df69099e252c2";
            var web3 = new Web3(account, infuraUrl);
            var contractAddress = "0x975ccf95aBf2395143298f6f0C246232716FEc26";
            var ContractHandler = web3.Eth.GetContractHandler(contractAddress);
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
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="tokenId"></param>
        /// <returns></returns>
        public Task<string> TransferFromRequestAsync(string from, string to, BigInteger tokenId)
        {
            var account = new Account("0x5350d65309d8558309aebc46554478e86ee58fa96191390c78b068e5fd5086da", Nethereum.Signer.Chain.Ropsten);
            var infuraUrl = "https://ropsten.infura.io/v3/0ea20af2d59441e4896df69099e252c2";
            var web3 = new Web3(account, infuraUrl);
            var contractAddress = "0x975ccf95aBf2395143298f6f0C246232716FEc26";
            var ContractHandler = web3.Eth.GetContractHandler(contractAddress);
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
            var infuraUrl = "https://ropsten.infura.io/v3/0ea20af2d59441e4896df69099e252c2";
            var web3 = new Web3(infuraUrl);
            var balance = await web3.Eth.GetBalance.SendRequestAsync(address);
            return balance.Value;
        }

        public Task<TokenOfOwnerOutputDTO> TokensOfOwnerRequestAsync(string address)
        {
            var account = new Account("0x5350d65309d8558309aebc46554478e86ee58fa96191390c78b068e5fd5086da", Nethereum.Signer.Chain.Ropsten);
            var infuraUrl = "https://ropsten.infura.io/v3/0ea20af2d59441e4896df69099e252c2";
            var web3 = new Web3(account, infuraUrl);
            var contractAddress = "0x975ccf95aBf2395143298f6f0C246232716FEc26";
            var ContractHandler = web3.Eth.GetContractHandler(contractAddress);
            var tokenOfOwnerFunction = new TokenOfOwnerFunction
            {
                Owner = address
            };
            return ContractHandler.QueryDeserializingToObjectAsync<TokenOfOwnerFunction, TokenOfOwnerOutputDTO>(tokenOfOwnerFunction);
        }
    }
}
