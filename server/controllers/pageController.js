import Page from "../models/Page.js";
import Transactions from "../models/Transactions.js";


const createPage = async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id;
    console.log(userId)
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    console.log(title)
    try {
        const page = new Page({ title, userId })
        const savedPage = await page.save()
        console.log(savedPage)
        return res.status(201).json({ message: "Page Created Successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal Server error" })
    }
}

const getAllPages = async (req, res) => {
    console.log("getAllPages hit")
    const userId = req.user.id;
    const { pageId } = req.params;
    if (!userId)
        return res.status(404).json({ message: "Unauthorized" })
    try {
        const pages = await Page.find({ userId })
        if (!pages)
            return res.status(404).json({ message: "Page not found" })

        res.status(200).json({ message: "Page fetched successfully", pages })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
const updatePage = async (req, res) => {
    const { title } = req.body;
    const { pageId } = req.params;
    const userId = req.user._id;
    try {

        const updatedPage = await Page.findOneAndUpdate({ _id: pageId, userId },
            req.body,
            {
                new: true
            } // return updated page 
        )
        if (!updatedPage)
            return res.status(404).json({ message: "Page Not Found " })

        res.status(200).json({ message: "page updated successfully" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })

    }
}
const deletePage = async (req, res) => {

    const { pageId } = req.params;

    const userId = req.user.id;


    if (!userId)
        return res.status(401).json({ message: "Unauthorized" })

    try {
        const deletedPage = await Page.findOneAndDelete({ _id: pageId, userId })
        if (!deletedPage)
            return res.status(404).json({ message: "Page Not Found" })

        // delete all transaction of that page as well 
        const deletedTransactions = await Transactions.deleteMany({ pageId })
        if (!deletedTransactions)
            return res.status(404).json({ message: "Transactions Not Found" })

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}

export { createPage, getAllPages, updatePage, deletePage }