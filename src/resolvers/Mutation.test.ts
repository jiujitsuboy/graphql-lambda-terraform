import User from '../models/user.model'
import Mutation from './Mutation'

jest.mock('../models/user.model')

describe('User suit', () => {

    beforeEach(() => {
    })
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Create an user', () => {
        it('Create user successfully', async () => {

            //GIVEN
            const userExpected = new User('name',
                new Date(2007, 2, 3),
                'Tv 4 # 54-56',
                'test user',
                'www.testuser.com')
            userExpected.id = '12345'

            //WHEN
            User.prototype.save = jest.fn(() => Promise.resolve(userExpected))

            //THEN
            const userCreated = await Mutation.createUser(null, {data:{
                name: 'name',
                dob: new Date(2007, 2, 3),
                address: 'Tv 4 # 54-56',
                description: 'test user',
                imageUrl: 'www.testuser.com'
            }}, null, null)
            expect(userCreated).not.toBe(null)
            expect(userCreated).toBe(userExpected)
        })
    })
    describe('Udpate an user', () => {
        it('Update user successfully', async () => {
            //GIVEN
            const userExpected = new User('name',
                new Date(2007, 2, 3),
                'Tv 4 # 54-56',
                'test user',
                'www.testuser.com')
            userExpected.id = '12345'

            //WHEN
            User.update = jest.fn(() => Promise.resolve(userExpected))

            //THEN
            const userUpdated = await Mutation.updateUser(null, {data:{
                id: '12345',
                name: 'name',
                dob: new Date(2007, 2, 3),
                address: 'Tv 4 # 54-56',
                description: 'test user',
                imageUrl: 'www.testuser.com'
            }}, null, null)
            expect(userUpdated).not.toBe(null)
            expect(userUpdated).toBe(userExpected)
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
            User.delete = jest.fn(() => Promise.resolve(userExpected))
            //THEN

            const userDeleted = await Mutation.deleteUser(null, {
                id: '12345'}, null, null)
            expect(userDeleted).not.toBe(null)
            expect(userDeleted).toBe(userExpected)
        })
        it('Delete user unsuccessfully', async () => {
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
            User.delete = jest.fn(() => Promise.resolve(undefined))
            //THEN
            let userDeleted    
            try {
                userDeleted = await Mutation.deleteUser(null, {
                    id: '12345'}, null, null)
            } catch (error) {
                userDeleted = error.message
            }
           
            expect(userDeleted).toBe('No such user exists')
        })
    })
})