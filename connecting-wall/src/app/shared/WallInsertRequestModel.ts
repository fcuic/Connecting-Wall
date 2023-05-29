export interface WallInsertRequestModel {
    wallName: string;
    userId: string;
    groupAConnectionName: string;
    groupBConnectionName: string;
    groupCConnectionName: string;
    groupDConnectionName: string;
    groupATerms: string[];
    groupBTerms: string[];
    groupCTerms: string[];
    groupDTerms: string[];
}