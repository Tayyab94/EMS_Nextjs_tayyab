import mongoose from "mongoose"


const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            family: 4, // Force using IPv4
            // useNewUrlParser: true, // As long as needed
            // useUnifiedTopology: true // As long as needed
        })
    } catch (error) {
        console.error(error)
    }
}

export default connectMongoDB;