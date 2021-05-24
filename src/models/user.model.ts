import {
  DynamoDbSchema,
  DynamoDbTable,
  QueryOptions,
  ScanOptions,
  ScanPaginator,
} from '@aws/dynamodb-data-mapper'
import mapper from '../db/dynamoDbClient'
import { v4 as uuid } from 'uuid'
import MapBoxService from '../services/mapbox'

const USER_NOT_FOUND = 'Not able to find user: '
const USER_NOT_SAVED = 'Not able to save user: '
const USER_NOT_DELETED = 'Not able to delete user: '
const USER_NOT_ADDRESS = 'User dont registered an address'

class User {
  id: string | undefined
  name: string | undefined
  dob: Date | undefined
  address: string | undefined
  description: string | undefined
  createdAt: Date | undefined
  updateAt: Date | undefined
  imageUrl: string | undefined

  constructor(
    name?: string,
    dob?: Date,
    address?: string,
    description?: string,
    imageUrl?: string
  ) {
    const currentDate: Date = new Date()
    this.id = uuid()
    this.name = name
    this.dob = dob
    this.address = address
    this.description = description
    this.createdAt = currentDate
    this.updateAt = currentDate
    this.imageUrl = imageUrl
  }
  save(): Promise<this> {
    return mapper.put(this).catch((err) => Promise.reject(USER_NOT_SAVED + err))
  }

  static update(
    id: string,
    name?: string,
    dob?: Date,
    address?: string,
    description?: string,
    imageUrl?: string
  ): Promise<User> {
    return this.find(id).then((user) => {
      // user.name = name !== undefined ? name : user.name
      user.name = name !== undefined ? name : user.name
      user.dob = dob !== undefined ? dob : user.dob
      user.address = address !== undefined ? address : user.address
      user.description = description !== undefined ? description : user.description
      user.imageUrl = imageUrl !== undefined ? imageUrl : user.imageUrl
      user.updateAt = new Date()
      return user.save()
    })
  }
  static delete(id: string): Promise<User | undefined> {
    const tempUser: User = new User()
    tempUser.id = id
    return mapper.delete(tempUser).catch((err) => Promise.reject(USER_NOT_DELETED + err))
  }

  static find(id: string): Promise<User> {
    const tempUser: User = new User()
    tempUser.id = id
    return mapper.get(tempUser).catch((err) => Promise.reject(USER_NOT_FOUND + err))
  }
  static async findByName(name: string, last?: any, size = 2): Promise<PaginatedUsersCompose> {
    const options: QueryOptions = {
      limit: size,
      indexName: 'name_index',
    }

    if (last) {
      options.startKey = { id: last.id, name: last.name }
    }

    const paginator = await mapper.query(User, { name }, options).pages()

    const page = await (await paginator.next()).value

    return {
      lastEvaluatedUser: paginator.lastEvaluatedKey
        ? { id: paginator.lastEvaluatedKey.id, name: paginator.lastEvaluatedKey.name }
        : undefined,
      users: page,
    }
  }
  static async getAll(last?: string, size = 2): Promise<PaginatedUsersId> {
    const options: ScanOptions = {
      limit: size,
    }
    if (last) {
      options.startKey = { id: last }
    }

    const paginator: ScanPaginator<User> = await mapper.scan(User, options).pages()
    const page: IteratorResult<User[], any> = await (await paginator.next()).value

    return {
      lastEvaluatedId: paginator.lastEvaluatedKey ? paginator.lastEvaluatedKey.id : undefined,
      users: page,
    }
  }

  static async getCoordinateFromAddress(id: string): Promise<string> {
    return this.find(id).then((user) => {
      if (user.address) {
        return MapBoxService.getCoordinateFromAddress(user.address)
      } else {
        return Promise.reject(USER_NOT_ADDRESS)
      }
    })
  }
}

Object.defineProperties(User.prototype, {
  [DynamoDbTable]: { value: 'users' },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: 'String',
        keyType: 'HASH',
      },
      name: {
        type: 'String',
      },
      dob: {
        type: 'Date',
      },
      address: {
        type: 'String',
      },
      description: {
        type: 'String',
      },
      createdAt: {
        type: 'Date',
      },
      updateAt: {
        type: 'Date',
      },
      imageUrl: {
        type: 'String',
      },
    },
  },
})

export default User
