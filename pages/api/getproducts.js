// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"
const handler =async(req, res)=>{
        let products= await Product.find()
        let jerseys={}
        for(let item of products){
                if (item.title in jerseys) {
                        if(!jerseys[item.title].color.includes(item.color) && item.availableQty>0){
                                jerseys[item.title].color.push(item.color)
                        }
                        if(!jerseys[item.title].size.includes(item.size) && item.availableQty>0){
                                jerseys[item.title].size.push(item.size)
                        }
                }
                else{
                        jerseys[item.title]=JSON.parse(JSON.stringify(item))
                        if(item.availableQty>0){
                                jerseys[item.title].color = [item.color] 
                                jerseys[item.title].size = [item.size] 
                        }
                }
        }
        res.status(200).json({ jerseys })
}
export default connectDb(handler)