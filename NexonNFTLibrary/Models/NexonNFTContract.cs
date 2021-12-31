using System;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace NexonNFTLibrary.Models
{
    /// <summary>
    /// NexonNFT Contract의 mintNFT function과 매핑 
    /// </summary>
    public partial class MintFunction : MintFunctionBase { }

    [Function("mintNFT")]
    public class MintFunctionBase : FunctionMessage
    {
        [Parameter("address", "recipient", 1)]
        public virtual string Recipient { get; set; }

        [Parameter("string", "tokenURI", 2)]
        public virtual string TokenURI { get; set; }
    }

    public partial class TransferFromFunction : TransferFromFunctionBase { }

    [Function("transferFrom")]
    public class TransferFromFunctionBase : FunctionMessage
    {
        [Parameter("address", "from", 1)]
        public virtual string From { get; set; }
        [Parameter("address", "to", 2)]
        public virtual string To { get; set; }
        [Parameter("uint256", "tokenId", 3)]
        public virtual BigInteger TokenId { get; set; }
    }


    public partial class TokenOfOwnerFunction : TokenOfOwnerFunctionBase { }

    [Function("tokensOfOwner")]
    public class TokenOfOwnerFunctionBase : FunctionMessage
    {
        [Parameter("address", "_owner", 1)]
        public virtual string Owner { get; set; }
    }

    [FunctionOutput]
    public class TokenOfOwnerOutputDTO : IFunctionOutputDTO
    {
        [Parameter("uint256[]", "tokens", 1)]
        public List<BigInteger> Tokens { get; set; }
    }
}
