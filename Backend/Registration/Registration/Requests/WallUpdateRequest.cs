using System.Collections.Generic;

namespace Registration.Requests
{
    public class WallUpdateRequest
    {
        public string WallID { get; set; }
        public string WallName { get; set; }
        public List<string> GroupATerms { get; set; }
        public string GroupAConnectionName { get; set; }
        public List<string> GroupBTerms { get; set; }
        public string GroupBConnectionName { get; set; }
        public List<string> GroupCTerms { get; set; }
        public string GroupCConnectionName { get; set; }
        public List<string> GroupDTerms { get; set; }
        public string GroupDConnectionName { get; set; }
    }
}
