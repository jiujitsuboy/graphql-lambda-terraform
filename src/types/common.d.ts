type PaginatedUsersCompose = {
    lastEvaluatedUser: Partial<User>
    users: any//IteratorResult<User[], any>
}

type PaginatedUsersId = {
    lastEvaluatedId: Partial<User>
    users: any//IteratorResult<User[], any>
}