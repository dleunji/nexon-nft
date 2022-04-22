using System;

namespace NexonInventory.Models
{
    public class BalanceResponse
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Message { get; set; }
        public decimal Balance { get; set; }
    }
}