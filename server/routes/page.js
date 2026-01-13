import router from "express";
import * as PageController from "../controllers/pageController.js"

const pageRouter = router()

//get all pages 
pageRouter.get('/pages',PageController.getAllPages)

//delete a page 
pageRouter.delete('/page/:pageId',PageController.deletePage)

//update a page 
pageRouter.put('/page/:pageId',PageController.updatePage)

//create a page 
pageRouter.post('/page/create',PageController.createPage)

export default pageRouter

