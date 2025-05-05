using System.ComponentModel.DataAnnotations;

namespace NotesApi.Models
{
    public class NoteSaveDto
    {
        public int? Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        public string Content { get; set; }
    }
}