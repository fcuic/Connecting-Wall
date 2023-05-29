export interface Wall{
    wallID:string,
    wallName:string,
    dateCreated:string,
    dateUpdated:string,
    userID:string,
    // groupAConnection:GroupConnection,
    // groupBConnection:GroupConnection,
    // groupCConnection:GroupConnection,
    // groupDConnection:GroupConnection,
    groupConnections : GroupConnection[]
    // groupATerms:GroupTerm[],
    // groupBTerms:GroupTerm[],
    // groupCTerms:GroupTerm[],
    // groupDTerms:GroupTerm[]
}
export interface GroupConnection{
    connectionId:string,
    connectionName:string,
    connectionGroup : string,
    terms : Term
}
export interface Term{
    termID:string,
    termName:string,
    groupConnectionId : string
}