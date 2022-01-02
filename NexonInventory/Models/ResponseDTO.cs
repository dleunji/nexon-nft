using System;
namespace NexonInventory.Models
{
    public class ResponseDTO
    {
        //public string Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string Message { get; set; }
        public object Value { get; set; }
    }
}
