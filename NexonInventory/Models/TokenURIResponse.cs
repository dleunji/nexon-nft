using System;

namespace NexonInventory.Models
{
    public class TokenURIResponse
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Message { get; set; }
        public string TokenURI { get; set; }
    }
}