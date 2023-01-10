const { express } = require('express')
const {getMapper} = require('../src/repository/mapper')
const ds = require('../src/repository/datasource')
const userRepository = require('../src/repository/userRepository')

describe('testuser', () => {

    //create
    test('create a user with snsId', async () => {
        //given
        const mockUser = {
            serviceId: null,
            userId : "your_rainbow__",
            firstName: "민지",
            lastName: "김",
            snsId : "2616915419",
            provider: "KAKAO",
            gender: 0,
        }

        //validate
        try{
            await userRepository.createUser(mockUser)
        } catch(error){
            await userRepository.deleteAll()
            throw(error)
        }

        //test retrieve
        try{
            const foundUser = await userRepository.findUserSNS(mockUser.snsId, mockUser.provider)
            console.log(foundUser)
            expect(foundUser.userId).toEqual(mockUser.userId)
            expect(foundUser.firstName).toEqual(mockUser.firstName)
            expect(foundUser.lastName).toEqual(mockUser.lastName)
        } catch(error){
            throw(error)
        } finally {
            await userRepository.deleteAll()
        }

        
    })


    afterAll(()=>{
        userRepository.close() //closes all connections in pool
    })
})

