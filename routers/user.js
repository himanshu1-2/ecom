const express = require('express')
const User = require('../model/user')
const auth= require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
//const {welcomeEmail}=require('../emails/accont')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {

 
  await user.save()
//welcomeEmail(user.email,user.name)

 const token= await user.generateToken()      
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)

    }
})


router.post('/users/login', async (req, res) => {
    const user = await User.findByCredtional(req.body.email,req.body.password)
     const token= await user.generateToken()
    try {
       
     res.send({user,token})

    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


const upload = multer({
   

fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload a Word document'))
        }

        cb(undefined, true)
    }

})
router.post('/user/me/upload', auth,upload.single('avatar'),async (req, res) => {
    
   req.user.avatar = req.file.buffer
    await req.user.save()

  res.send()

},(error,req,res,next)=>{
   res.status(400).send({error:error.message})

})


router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


router.get('/users/me',  auth ,async (req, res) => {
    res.send(req.user)
})







router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })


updates.forEach((update)=>req.user[update]=req.body[update])
await req.user.save()

       
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth,async (req, res) => {
    try {
  await req.user.remove()
  res.send(req.user)          
}

      
    catch (e) {
     res.status(500).send()   
    }
})

module.exports = router
