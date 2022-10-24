import mongoose from 'mongoose';
const uri = "mongodb+srv://Hamed:url-short@cluster0.tfkzgqb.mongodb.net/?retryWrites=true&w=majority";

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('connected to db');
  } catch (e) {
    console.log(e)
  }

}

export default connect