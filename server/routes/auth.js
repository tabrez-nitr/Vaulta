import router from "express"
import { register , login , logout } from "../controllers/authController.js"


const authRouter = router()
//register route 
authRouter.post("/register",register)

//login route
authRouter.post("/login",login)

//logout 
authRouter.post("/logout",logout)

export default authRouter



