const typeDefs: any = `

scalar Date

type Query {
    findUser(id: ID!): User
    findUsersByName(data: FindUsersByNameInput): PaginatedUsersCompose
    getUsers(lastEvaluatedId: ID, pageSize: Int): PaginatedUsers
    getAddressCoordinates(id: ID!): String!
}

type User{
    id: ID!
    name: String!
    dob: String!
    address: String!
    description : String!
    imageUrl: String!
    createdAt: Date!
    updateAt : Date!
}

input FindUsersByNameInput{
    name: String!
    lastEvaluatedUser: LastEvaluatedUserInput
    pageSize: Int
}
input LastEvaluatedUserInput{
    id: ID
    name: String
}

type UserCompose{
    id: ID
    name: String
}

type PaginatedUsersCompose{
    users: [User]
    lastEvaluatedUser: UserCompose
}

type PaginatedUsers {
    users: [User]
    lastEvaluatedId: ID
}

type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(data: UpdateUserInput!): User
    deleteUser(id: ID!): User
}

input CreateUserInput{
    name: String!
    dob: String!
    address: String!
    description: String!
    imageUrl: String!
}

input UpdateUserInput{
    id: ID!
    name: String
    dob: String
    address: String
    description : String
    imageUrl: String
}`

export default typeDefs
