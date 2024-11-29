import mongoose from "mongoose";

const DbCon=async()=>{
    try {
        await mongoose.connect(process.env.MONGDB_URL)
        console.log('Mongodb is connected')
    } catch (error) {
        console.log('mongosdb connection error',error)
    }
}
export default DbCon

//MONGDB_URL='mongodb+srv://tushar0912:Z3EjoN6Bhc08k7fD@cluster0.b7dxrkb.mongodb.net/SacretSecret?retryWrites=true&w=majority&appName=Cluster0'
