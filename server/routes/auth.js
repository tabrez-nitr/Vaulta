import router from "express"
import { register , login } from "../controllers/authController"


const authRouter = router()
//register route 
authRouter.post("/register",register)

//login route
authRouter.post("/login",login)

export default authRouter



