export interface Wall{
    wallID:string
    wallName:string
    dateCreated:string
    dateUpdated:string
    userID:string
    groupAConnections:GroupConnection
    groupBConnections:GroupConnection[]
    groupCConnections:GroupConnection[]
    groupDConnections:GroupConnection[]
    groupATerms:GroupTerm[]
    groupBTerms:GroupTerm[]
    groupCTerms:GroupTerm[]
    groupDTerms:GroupTerm[]
}
export interface GroupConnection{
    connectionId:string
    connectionName:string
}
export interface GroupTerm{
    termID:string
    termName:string
}