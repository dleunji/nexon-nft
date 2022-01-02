using System;
using System.Numerics;
using System.Threading.Tasks;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using NexonNFTLibrary.Models;

namespace NexonNFTLibrary.Interfaces
{
    public interface INexonNFTContractService
    {
        public string ContractAddress { get; set; }

        Task<string> MintNFT(string recipient, string tokenURI);
        Task<string> TransferFromRequestAsync(string from, string to, BigInteger tokenId);
        Task<BigInteger> GetBalance(string address);
        Task<TokenOfOwnerOutputDTO> TokensOfOwnerRequestAsync(string address);
    }
}
