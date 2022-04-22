using System;
namespace NexonInventory.Models
{
    public class MintRequest
    {
        public string PrivateKey { get; set; }
        public string Recipient { get; set; }
        public string TokenURI { get; set; }
    }
}
