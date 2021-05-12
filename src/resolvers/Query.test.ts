import User from '../models/user.model'
import Query from './Query'

jest.mock('../models/user.model')

describe('User suit', () => {

    beforeEach(() => {
    })
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Find an user', () => {
        it('Find user successfully', async () => {

            //GIVEN
            const userExpected = new User('name',
                new Date(2007, 2, 3),
                'Tv 4 # 54-56',
                'test user',
                'www.testuser.com')
            userExpected.id = '12345'

            //WHEN
            User.find = jest.fn(() => Promise.resolve(userExpected))

            //THEN
            const userFound = await Query.findUser(null, {
                id: '12345'}, null, null)
            expect(userFound).not.toBe(null)
            expect(userFound).toBe(userExpected)
        })
    })
    describe('Find all user', () => {
        it('Get first 2 users successfully', async () => {
            //GIVEN
            const usersExpected = [new User(
                'name',
                new Date(2007, 2, 3),
                'Tv 4 # 54-56',
                'test user',
                'www.testuser.com'
              ), new User(
                'name2',
                new Date(2007, 2, 3),
                'Tv 42 # 54-56',
                'test user2',
                'www.testuser2.com'
              )]
        
              usersExpected[0].id = '12345'
              usersExpected[1].id = '54321'

              const responseExpected = {
                lastEvaluatedId: usersExpected[1].id,
                users: usersExpected,
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
            const jsonExpected = `{
                type: 'FeatureCollection',
                query: [ 'tv', '4', '54-56' ],
                features: [
                  {
                    id: 'address.3708098663640670',
                    type: 'Feature',
                    place_type: [Array],
                    relevance: 0.935,
                    properties: [Object],
                    text: 'Silver Road',
                    place_name: '54-56 Silver Road, Wooster, Ohio 44691, United States',
                    matching_text: 'Tr 4',
                    matching_place_name: '54-56 Tr 4, Wooster, Ohio 44691, United States',
                    center: [Array],
                    geometry: [Object],
                    address: '54-56',
                    context: [Array]
                  },
                  {
                    id: 'address.4517320401225876',
                    type: 'Feature',
                    place_type: [Array],
                    relevance: 0.935,
                    properties: [Object],
                    text: 'Gauley Turnpike',
                    place_name: '54-56 Gauley Turnpike, Heaters, West Virginia 26621, United States',
                    matching_text: 'WV 4',
                    matching_place_name: '54-56 WV 4, Heaters, West Virginia 26621, United States',
                    center: [Array],
                    geometry: [Object],
                    address: '54-56',
                    context: [Array]
                  },
                  {
                    id: 'address.8594117789416912',
                    type: 'Feature',
                    place_type: [Array],
                    relevance: 0.935,
                    properties: [Object],
                    text: 'Elk River Road North',
                    place_name: '54-56 Elk River Road North, Clendenin, West Virginia 25164, United States',
                    matching_text: 'WV 4',
                    matching_place_name: '54-56 WV 4, Clendenin, West Virginia 25164, United States',
                    center: [Array],
                    geometry: [Object],
                    address: '54-56',
                    context: [Array]
                  },
                  {
                    id: 'address.7989656604971726',
                    type: 'Feature',
                    place_type: [Array],
                    relevance: 0.935,
                    properties: [Object],
                    text: 'Elk River Road North',
                    place_name: '54-56 Elk River Road North, Clendenin, West Virginia 25045, United States',
                    matching_text: 'WV 4',
                    matching_place_name: '54-56 WV 4, Clendenin, West Virginia 25045, United States',
                    center: [Array],
                    geometry: [Object],
                    address: '54-56',
                    context: [Array]
                  },
                  {
                    id: 'address.1415144885780018',
                    type: 'Feature',
                    place_type: [Array],
                    relevance: 0.935,
                    properties: [Object],
                    text: 'Camper Road',
                    place_name: '54-56 Camper Road, Genoa, Ohio 43430, United States',
                    matching_text: 'Tr 4',
                    matching_place_name: '54-56 Tr 4, Genoa, Ohio 43430, United States',
                    center: [Array],
                    geometry: [Object],
                    address: '54-56',
                    context: [Array]
                  }
                ],
                attribution: 'NOTICE: © 2021 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.'
              }`

            //WHEN
            User.getCoordinateFromAddress = jest.fn(() => Promise.resolve(jsonExpected))
            //THEN

            const jsonReceived = await Query.getAddressCoordinates(null, {
                id: '12345'}, null, null)
            expect(jsonReceived).not.toBe(null)
            expect(jsonReceived).toBe(JSON.stringify(jsonExpected))
        })
    })
})