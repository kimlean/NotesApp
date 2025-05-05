using System.ComponentModel.DataAnnotations;

namespace NotesApi.Models
{
    public class NoteDto
    {
        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        public string Content { get; set; }
    }
}