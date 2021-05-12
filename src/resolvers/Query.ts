import User from '../models/user.model'

const Query:any ={
    async findUser(parent: any, args: any, ctx: any, info: any): Promise<User> {
        const user = await User.find(args.id)
        return user 
    },
    async getUsers(parent: any, args: any, ctx: any, info: any): Promise<PaginatedUsers>{
       const users =  await User.getAll(args.lastEvaluatedId,args.pageSize)         
       return users
    },
    async getAddressCoordinates(parent: any, args: any, ctx: any, info: any): Promise<String>{
       const json =  await User.getCoordinateFromAddress(args.id)
       return JSON.stringify(json)
    }
} 

export default Query