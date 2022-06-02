import { app } from './app.js';
import mongoose from 'mongoose';
import { password } from './password.js';

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://maxdyachenko111:${password}@cluster0.fvp9ekf.mongodb.net/?retryWrites=true&w=majority`);
    console.log('connected to mongobd')
  } catch (error) {
    console.log("ERROR connecting to mongodb")
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
}

start();
