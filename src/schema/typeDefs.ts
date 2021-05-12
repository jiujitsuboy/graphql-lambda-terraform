const typeDefs: any = `
type Query {
    findUser(id: ID!): User
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
    createdAt: String!
    updateAt : String!
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