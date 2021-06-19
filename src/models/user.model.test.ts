import { QueryIterator, ScanIterator } from '@aws/dynamodb-data-mapper'
import mapper from '../db/dynamoDbClient'
import User from './user.model'
import MapBoxService from '../services/mapbox'
import { jsonSuccessResponse } from '../mocks/mapBoxJsonResponse'

jest.mock('../db/dynamoDbClient')
jest.mock('../services/mapbox')

describe('User suit', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Create an user', () => {
    it('Create user successfully', async () => {
      //GIVEN
      const userExpected = {
        id: 12345,
        name: 'name',
        dob: '2007-02-03',
        address: 'Tv 4 # 54-56',
        description: 'test user',
        imageUrl: 'www.testuser.com',
        createdAt: '2021-05-10',
        updateAt: '2021-05-10',
      }
      const user = new User(
        'name',
        new Date(2007, 2, 3),
        'Tv 4 # 54-56',
        'test user',
        'www.testuser.com'
      )
      //WHEN
      mapper.put = jest.fn(() => Promise.resolve(userExpected))
      //THEN
      const userSaved = await user.save()
      expect(userSaved).not.toBe(null)
      expect(userSaved).toBe(userExpected)
    })
  })
  describe('Udpate an user', () => {
    it('Update user successfully', async () => {
      //GIVEN
      const nameUpdated = 'nameUpdated'

      const userExpected = new User(
        nameUpdated,
        new Date(2007, 2, 3),
        'Tv 4 # 54-56',
        'test user',
        'www.testuser.com'
      )
      userExpected.id = '12345'

      //WHEN
      mapper.get = jest.fn(() => Promise.resolve(userExpected))
      mapper.put = jest.fn(() => Promise.resolve(userExpected))
      //THEN

      const userUpdated = await User.update('12345', nameUpdated)
      expect(userUpdated).not.toBe(null)
      expect(userUpdated.name).toBe(nameUpdated)
    })

    it('Update user unsuccessfully', async () => {
      //GIVEN
      const nameUpdated = 'nameUpdated'

      const userExpected = new User(
        nameUpdated,
        new Date(2007, 2, 3),
        'Tv 4 # 54-56',
        'test user',
        'www.testuser.com'
      )
      userExpected.id = '12345'

      const USER_NOT_FOUND = 'Not able to find user: ' + userExpected.id

      let errExpected = {}
      //WHEN
      mapper.get = jest.fn(() => Promise.reject(userExpected.id))
      //THEN
      try {
        await User.update('12345', nameUpdated)
      } catch (err) {
        errExpected = err
      }
      expect(errExpected).toBe(USER_NOT_FOUND)
    })
  })
  describe('Delete an user', () => {
    it('Delete user successfully', async () => {
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
      mapper.delete = jest.fn(() => Promise.resolve(userExpected))
      //THEN

      const userDeleted = await User.delete('12345')
      expect(userDeleted).not.toBe(null)
      expect(userDeleted).toBe(userExpected)
    })
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
      mapper.get = jest.fn(() => Promise.resolve(userExpected))
      //THEN

      const userObtained = await User.find('12345')
      expect(userObtained).not.toBe(null)
      expect(userObtained).toBe(userExpected)
    })
    it('Find user by name successfully', async () => {
      //GIVEN
      const userExpected = new User(
        'name',
        new Date(2007, 2, 3),
        'Tv 4 # 54-56',
        'test user',
        'www.testuser.com'
      )
      userExpected.id = '12345'

      const pagesFunction = jest.fn(() => {
        return {
          next: () => {
            return { value: userExpected }
          },
          lastEvaluatedKey: { id: userExpected.id, name: userExpected.name },
        }
      })

      const queryIterator = {
        pages: pagesFunction,
        paginator: {
          paginator: {
            _count: 0,
            _scannedCount: 0,
            lastResolved: {},
            client: {
              config: {
                credentials: {
                  expired: false,
                  expireTime: null,
                  refreshCallbacks: [],
                  accessKeyId: 'key',
                },
                credentialProvider: {
                  providers: [null, null, null, null, null, null, null],
                  resolveCallbacks: [],
                },
                region: 'us-east-1',
                logger: null,
                apiVersions: {},
                apiVersion: null,
                endpoint: 'http://localhost:8000',
                httpOptions: { timeout: 120000 },
                maxRedirects: 10,
                paramValidation: true,
                sslEnabled: true,
                s3ForcePathStyle: false,
                s3BucketEndpoint: false,
                s3DisableBodySigning: true,
                s3UsEast1RegionalEndpoint: 'legacy',
                computeChecksums: true,
                convertResponseTypes: true,
                correctClockSkew: false,
                customUserAgent: ' dynamodb-data-mapper-js/0.4.0',
                dynamoDbCrc32: true,
                systemClockOffset: 0,
                signatureVersion: null,
                signatureCache: true,
                retryDelayOptions: {},
                useAccelerateEndpoint: false,
                clientSideMonitoring: false,
                endpointCacheSize: 1000,
                hostPrefixEnabled: true,
                stsRegionalEndpoints: 'legacy',
                accessKeyId: 'key',
                secretAccessKey: 'key',
              },
              endpoint: {
                protocol: 'http:',
                host: 'localhost:8000',
                port: 8000,
                hostname: 'localhost',
                pathname: '/',
                path: '/',
                href: 'http://localhost:8000/',
              },
              _events: { apiCallAttempt: [null], apiCall: [null] },
              _clientId: 1,
            },
            nextRequest: {
              TableName: 'users',
              IndexName: 'name_index',
              KeyConditionExpression: '#attr0 = :val1',
              ExpressionAttributeNames: { '#attr0': 'name' },
              ExpressionAttributeValues: { ':val1': { S: 'lindsay4' } },
            },
          },
          lastResolved: {},
          itemSchema: {
            id: { type: 'String', keyType: 'HASH' },
            name: { type: 'String' },
            dob: { type: 'Date' },
            address: { type: 'String' },
            description: { type: 'String' },
            createdAt: { type: 'Date' },
            updateAt: { type: 'Date' },
            imageUrl: { type: 'String' },
          },
        },
        _count: 0,
        lastResolved: {},
        pending: [],
      } as any as QueryIterator<User>

      //WHEN
      mapper.query = jest.fn(() => queryIterator)
      //THEN

      const userObtained = await User.findByName('12345')
      expect(userObtained).not.toBe(null)
      expect(userObtained.users).toBe(userExpected)
    })
  })
  describe('Find all user', () => {
    it('Get first 2 users successfully', async () => {
      //GIVEN
      const usersExpected: User[] = [
        new User('name', new Date(2007, 2, 3), 'Tv 4 # 54-56', 'test user', 'www.testuser.com'),
        new User('name2', new Date(2007, 2, 3), 'Tv 42 # 54-56', 'test user2', 'www.testuser2.com'),
      ]

      usersExpected[0].id = '12345'
      usersExpected[1].id = '54321'

      const pagesFunction = jest.fn(() => {
        return {
          next: () => {
            return { value: usersExpected }
          },
          lastEvaluatedKey: usersExpected[1],
        }
      })

      const scanIterator = {
        pages: pagesFunction,
        paginator: {
          paginator: {
            limit: 2,
            _count: 0,
            _scannedCount: 0,
            lastResolved: {},
            client: {
              config: {
                credentials: {
                  expired: false,
                  expireTime: null,
                  refreshCallbacks: [],
                  accessKeyId: 'key',
                },
                credentialProvider: {
                  providers: [null, null, null, null, null, null, null],
                  resolveCallbacks: [],
                },
                region: 'us-central-1',
                logger: null,
                apiVersions: {},
                apiVersion: null,
                endpoint: 'http://localhost:8000',
                httpOptions: { timeout: 120000 },
                maxRedirects: 10,
                paramValidation: true,
                sslEnabled: true,
                s3ForcePathStyle: false,
                s3BucketEndpoint: false,
                s3DisableBodySigning: true,
                s3UsEast1RegionalEndpoint: 'legacy',
                computeChecksums: true,
                convertResponseTypes: true,
                correctClockSkew: false,
                customUserAgent: ' dynamodb-data-mapper-js/0.4.0',
                dynamoDbCrc32: true,
                systemClockOffset: 0,
                signatureVersion: null,
                signatureCache: true,
                retryDelayOptions: {},
                useAccelerateEndpoint: false,
                clientSideMonitoring: false,
                endpointCacheSize: 1000,
                hostPrefixEnabled: true,
                stsRegionalEndpoints: 'legacy',
                accessKeyId: 'key',
                secretAccessKey: 'key',
              },
              endpoint: {
                protocol: 'http:',
                host: 'localhost:8000',
                port: 8000,
                hostname: 'localhost',
                pathname: '/',
                path: '/',
                href: 'http://localhost:8000/',
              },
              _events: { apiCallAttempt: [null], apiCall: [null] },
              _clientId: 1,
            },
            nextRequest: {
              TableName: 'users',
              Limit: 2,
              ExclusiveStartKey: { id: { S: 'af4f510f-abe3-4f0a-ae55-79f6c7dfda7a' } },
            },
          },
          lastResolved: {},
          itemSchema: {
            id: { type: 'String', keyType: 'HASH' },
            name: { type: 'String' },
            dob: { type: 'Date' },
            address: { type: 'String' },
            description: { type: 'String' },
            createdAt: { type: 'Date' },
            updateAt: { type: 'Date' },
            imageUrl: { type: 'String' },
          },
        },
        _count: 0,
        lastResolved: {},
        pending: [],
      } as any as ScanIterator<User>

      //WHEN
      mapper.scan = jest.fn(() => scanIterator)

      //THEN
      const respObtained = await User.getAll()
      expect(respObtained).not.toBe(null)
      const arrUserExpected = respObtained.users as any as User[]
      expect(arrUserExpected.length).toBe(2)
      expect(respObtained.users).toBe(usersExpected)
    })

    it('Get next 2 users successfully', async () => {
      //GIVEN
      const usersExpected = [
        new User('name', new Date(2007, 2, 3), 'Tv 4 # 54-56', 'test user', 'www.testuser.com'),
        new User('name2', new Date(2007, 2, 3), 'Tv 42 # 54-56', 'test user2', 'www.testuser2.com'),
      ]

      usersExpected[0].id = '12345'
      usersExpected[1].id = '54321'

      const pagesFunction = jest.fn(() => {
        return {
          next: () => {
            return { value: usersExpected }
          },
          lastEvaluatedKey: usersExpected[1],
        }
      })

      const scanIterator = {
        pages: pagesFunction,
        paginator: {
          paginator: {
            limit: 2,
            _count: 0,
            _scannedCount: 0,
            lastResolved: {},
            client: {
              config: {
                credentials: {
                  expired: false,
                  expireTime: null,
                  refreshCallbacks: [],
                  accessKeyId: 'key',
                },
                credentialProvider: {
                  providers: [null, null, null, null, null, null, null],
                  resolveCallbacks: [],
                },
                region: 'us-central-1',
                logger: null,
                apiVersions: {},
                apiVersion: null,
                endpoint: 'http://localhost:8000',
                httpOptions: { timeout: 120000 },
                maxRedirects: 10,
                paramValidation: true,
                sslEnabled: true,
                s3ForcePathStyle: false,
                s3BucketEndpoint: false,
                s3DisableBodySigning: true,
                s3UsEast1RegionalEndpoint: 'legacy',
                computeChecksums: true,
                convertResponseTypes: true,
                correctClockSkew: false,
                customUserAgent: ' dynamodb-data-mapper-js/0.4.0',
                dynamoDbCrc32: true,
                systemClockOffset: 0,
                signatureVersion: null,
                signatureCache: true,
                retryDelayOptions: {},
                useAccelerateEndpoint: false,
                clientSideMonitoring: false,
                endpointCacheSize: 1000,
                hostPrefixEnabled: true,
                stsRegionalEndpoints: 'legacy',
                accessKeyId: 'key',
                secretAccessKey: 'key',
              },
              endpoint: {
                protocol: 'http:',
                host: 'localhost:8000',
                port: 8000,
                hostname: 'localhost',
                pathname: '/',
                path: '/',
                href: 'http://localhost:8000/',
              },
              _events: { apiCallAttempt: [null], apiCall: [null] },
              _clientId: 1,
            },
            nextRequest: {
              TableName: 'users',
              Limit: 2,
              ExclusiveStartKey: { id: { S: 'af4f510f-abe3-4f0a-ae55-79f6c7dfda7a' } },
            },
          },
          lastResolved: {},
          itemSchema: {
            id: { type: 'String', keyType: 'HASH' },
            name: { type: 'String' },
            dob: { type: 'Date' },
            address: { type: 'String' },
            description: { type: 'String' },
            createdAt: { type: 'Date' },
            updateAt: { type: 'Date' },
            imageUrl: { type: 'String' },
          },
        },
        _count: 0,
        lastResolved: {},
        pending: [],
      } as any as ScanIterator<User>

      //WHEN
      mapper.scan = jest.fn(() => scanIterator)

      //THEN
      const respObtained = await User.getAll('54321')
      expect(respObtained).not.toBe(null)
      const arrUserExpected = respObtained.users as any as User[]
      expect(arrUserExpected.length).toBe(2)
    })
  })
  describe('Get address coordinates', () => {
    it('Get address coordinates successfully', async () => {
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
      mapper.get = jest.fn(() => Promise.resolve(userExpected))
      MapBoxService.getCoordinateFromAddress = jest.fn(() => Promise.resolve(jsonSuccessResponse))
      //THEN

      const coordinatesObtained = await User.getCoordinateFromAddress('12345')
      expect(coordinatesObtained).not.toBe(null)
    })
    it('Fail get address coordinates, empty address', async () => {
      //GIVEN
      const userExpected = new User(
        'name',
        new Date(2007, 2, 3),
        undefined,
        'test user',
        'www.testuser.com'
      )
      userExpected.id = '12345'

      //WHEN
      mapper.get = jest.fn(() => Promise.resolve(userExpected))
            
      //THEN

      let coordinatesObtained
      let exception
      try {
        coordinatesObtained = await User.getCoordinateFromAddress('12345')
      } catch (err) {
        exception = err
      }
      expect(exception).toBe('User dont registered an address')
      expect(coordinatesObtained).toBe(undefined)
    })
  })
})
