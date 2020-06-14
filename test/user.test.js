const request = require('supertest')
const app = require('../src/app')
const User = require('../src/model/user')
const { userOneId, userOne, setupDatabase,cartItem } = require('./fixtures/data')

beforeEach(setupDatabase)

test('should signup user',async()=>{
const response=await request(app).post('/users').send({
    name: 'Andrew',
    email: 'andrew@example.com',
    password: 'MyPass777!'
}).expect(201)
const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Andrew',
            email: 'andrew@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')


})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})



test('Should fetch user cart', async () => {
    const response = await request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
   
})


test('Should fetch home screen', async () => {
    const response = await request(app)
        .get('/home')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
   
})







test('Should delete user cart', async () => {
    const response = await request(app)
        .delete('/removeall')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
   
})







