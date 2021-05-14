import { DynamoDbSchema, DynamoDbTable } from '@aws/dynamodb-data-mapper'
import mapper from '../db/dynamoDbClient'
import { v4 as uuid } from 'uuid'
import { Number } from 'aws-sdk/clients/iot'
import MapBoxService from '../services/mapbox'

const USER_NOT_FOUND = 'Not able to find user: '
const USER_NOT_SAVED = 'Not able to save user: '
const USER_NOT_DELETED = 'Not able to delete user: '

class User {
  id: String | undefined
  name: String | undefined
  dob: Date | undefined
  address: String | undefined
  description: String | undefined
  createdAt: Date | undefined
  updateAt: Date | undefined
  imageUrl: String | undefined

  constructor(name?: String,
    dob?: Date,
    address?: String,
    description?: String,
    imageUrl?: String) {
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

  static update(id: String, name?: String,
    dob?: Date,
    address?: String,
    description?: String,
    imageUrl?: String): Promise<User> {

    return this.find(id).then((user) => {
      user.name = name !== undefined ? name : user.name
      user.dob = dob !== undefined ? dob : user.dob
      user.address = address !== undefined ? address : user.address
      user.description = description !== undefined ? description : user.description
      user.updateAt = new Date()
      return user.save()
    })

  }
  static delete(id: String): Promise<User | undefined> {
    const tempUser: User = new User();
    tempUser.id = id;
    return mapper.delete(tempUser).catch((err) => Promise.reject(USER_NOT_DELETED + err))
  }

  static find(id: String): Promise<User> {
    const tempUser: User = new User();
    tempUser.id = id;
    return mapper.get(tempUser).catch((err) =>Promise.reject(USER_NOT_FOUND + err))
  }
  static async findByName(name: String): Promise<User> {
    const iterator = await mapper.query(User, { name }, { indexName: 'name_index' })    
    return await (await iterator.next()).value
  }
  static async getAll(last?: String, size: Number = 2): Promise<PaginatedUsers> {

    const options: ScanOptions = {
      limit: size
    }
    if (last) {
      options.startKey = { id: last }
    }

    const paginator = await mapper.scan(User, options).pages()
    const page = await (await paginator.next()).value;

    return {
      lastEvaluatedId: paginator.lastEvaluatedKey ? paginator.lastEvaluatedKey.id : undefined,
      users: page,
    };
  }

  static async getCoordinateFromAddress(id: String): Promise<String> {

    return this.find(id).then((user) => {
      return MapBoxService.getCoordinateFromAddress(user.address)
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
});

export default User
