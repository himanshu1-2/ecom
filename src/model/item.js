const mongoose = require('mongoose')
const userSchema= new mongoose.Schema({

  data:{
        widgets: [
          {
            context: {
              template:String
             
            },
            subdata: {
              Description: String,
              Image:String,
              price:Number
        
             
            }


          }
]


}


   

})

userSchema.methods.inserItem=async function()
{
const items=this
const data= {
            context: {
              template: "rv"
             
            },
            subdata: {
             Description : "premia",
             Image:"url",
             price:100
             
             
            }
          }

const data1= {
            context: {
              template: "rv"
             
            },
            subdata: {
             Description : "colgate",
             Image:"url",
             price:300
             
            }
          }

items.data.widgets.push(data,data1)
  await items.save()

}





const Item = mongoose.model('Item',userSchema )
module.exports = Item





