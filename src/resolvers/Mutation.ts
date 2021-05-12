import User from '../models/user.model'


const NO_SUCH_USER_EXISTS = 'No such user exists'

const Mutation:any ={
    createUser(parent: any, args: any, ctx: any, info: any): Promise<User>{
        console.log(args)
        const user = new User(args.data.name,
            args.data.dob,
            args.data.address,
            args.data.description,
            args.data.imageUrl)
        return user.save()
    },
    updateUser(parent: any, args: any, ctx: any, info: any): Promise<User>{        
        return User.update(args.data.id, args.data.name,args.data.address,args.data.description,args.data.imageUrl)
    },
    async deleteUser(parent: any, args: any, ctx: any, info: any):Promise<User |undefined>{
        const user = await User.delete(args.id)
       if(user===undefined)
          throw new Error(NO_SUCH_USER_EXISTS)
        return Promise.resolve(user)
    }
}

export default Mutation