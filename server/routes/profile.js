import * as ProfileController from '../controllers/profileController.js'
import router from 'express'

const profileRouter = router()

profileRouter.put('/edit',ProfileController.editProfile)
profileRouter.get('/',ProfileController.getProfile)


export default profileRouter 


