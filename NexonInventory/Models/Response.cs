using System;
namespace NexonInventory.Models
{
    public class Response
    {
        //public string Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Message { get; set; }
        public string Hash { get; set; }
        public int Code { get; set; }
    }
}
