type PaginatedUsersCompose = {
  lastEvaluatedUser: Partial<User>
  users: IteratorResult<User[], any>
}

type PaginatedUsersId = {
  lastEvaluatedId: Partial<User>
  users: IteratorResult<User[], any>
}
