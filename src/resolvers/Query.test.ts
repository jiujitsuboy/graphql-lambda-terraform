import User from '../models/user.model'
import Query from './Query'
import { jsonSuccessResponse } from '../mocks/mapBoxJsonResponse'

jest.mock('../models/user.model')

describe('User suit', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Find an user', () => {
    it('Find user by Id successfully', async () => {
      //GIVEN
      const userExpected = new User(
        'name',
        new Date(2007, 2, 3),
        'Tv 4 # 54-56',
        'test user',
        'www.testuser.com'
      )
      userExpected.id = '12345'

      //WHEN
      User.find = jest.fn(() => Promise.resolve(userExpected))

      //THEN
      const userFound = await Query.findUser(
        null,
        {
          id: '12345',
        },
        null,
        null
      )
      expect(userFound).not.toBe(null)
      expect(userFound).toBe(userExpected)
    })
    it('Find user by Name successfully', async () => {
      //GIVEN
      const userExpected = new User(
        'name',
        new Date(2007, 2, 3),
        'Tv 4 # 54-56',
        'test user',
        'www.testuser.com'
      )
      userExpected.id = '12345'

      const responseExpected = {
        lastEvaluatedUser: { id: userExpected.id, name: userExpected.name },
        users: { value: [userExpected], done: true },
      }

      //WHEN
      User.findByName = jest.fn(() => Promise.resolve(responseExpected))

      //THEN
      const userFound = await Query.findUsersByName(
        null,
        {
          data: {
            name: 'name',
          },
        },
        null,
        null
      )
      expect(userFound).not.toBe(null)
      expect(userFound).toBe(responseExpected)
    })
  })
  describe('Find all user', () => {
    it('Get first 2 users successfully', async () => {
      //GIVEN
      const usersExpected = [
        new User('name', new Date(2007, 2, 3), 'Tv 4 # 54-56', 'test user', 'www.testuser.com'),
        new User('name2', new Date(2007, 2, 3), 'Tv 42 # 54-56', 'test user2', 'www.testuser2.com'),
      ]

      usersExpected[0].id = '12345'
      usersExpected[1].id = '54321'

      const responseExpected = {
        lastEvaluatedId: usersExpected[1].id,
        users: { value: usersExpected, done: true },
      }

      //WHEN
      User.getAll = jest.fn(() => Promise.resolve(responseExpected))

      //THEN
      const usersFound = await Query.getUsers(null, {}, null, null)
      expect(usersFound).not.toBe(null)
      expect(usersFound).toBe(responseExpected)
    })
  })
  describe('Get address coordinates', () => {
    it('Get address coordinates successfully', async () => {
      //GIVEN
      const jsonExpected = jsonSuccessResponse
      //WHEN
      User.getCoordinateFromAddress = jest.fn(() => Promise.resolve(jsonExpected))
      //THEN

      const jsonReceived = await Query.getAddressCoordinates(
        null,
        {
          id: '12345',
        },
        null,
        null
      )
      expect(jsonReceived).not.toBe(null)
      expect(jsonReceived).toBe(JSON.stringify(jsonExpected))
    })
  })
})
