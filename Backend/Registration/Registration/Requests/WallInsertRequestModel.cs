using System.Collections.Generic;

namespace Registration.Requests
{
    public class WallInsertRequestModel
    {
        public string WallName { get; set; }
        public string UserId { get; set; }
        public string GroupAConnectionName { get; set; }
        public string GroupBConnectionName { get; set; }
        public string GroupCConnectionName { get; set; }
        public string GroupDConnectionName { get; set; }
        public List<string> GroupATerms { get; set; }
        public List<string> GroupBTerms { get; set; }
        public List<string> GroupCTerms { get; set; }
        public List<string> GroupDTerms { get; set; }
    }
}
