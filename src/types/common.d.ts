type ScanOptions = {
    limit: number
    startKey?: any
}

type PaginatedUsers = {
    lastEvaluatedId: Partial<User>
    users: any//IteratorResult<User[], any>
}