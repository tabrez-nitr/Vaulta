import router from "express";
import * as PageController from "../controllers/pageController.js"

const pageRouter = router()

//get all pages 
pageRouter.get('/all',PageController.getAllPages)

//delete a page 
pageRouter.delete('/:pageId',PageController.deletePage)

//update a page 
pageRouter.put('/:pageId',PageController.updatePage)

//create a page 
pageRouter.post('/create',PageController.createPage)

export default pageRouter

