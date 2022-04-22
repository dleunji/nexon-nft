using System;
using System.Collections;
using System.Collections.Generic;

namespace NexonInventory.Models
{
    public class TokenListResponse
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Message { get; set; }
        public List<string> TokenList { get; set; }
    }
}