using System;
namespace NexonInventory.Models
{
    public class TransferRequest
    {
        public string From { get; set; }

        public string To { get; set; }

        public int TokenId { get; set; }
        
        public string PrivateKey { get; set; }
    }
}
