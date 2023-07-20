import mongoose from "mongoose";

async function conectToDatabase() {
  const uri = String(process.env.DB_URI);

  try {
    await mongoose.connect(uri);
    console.info("Connected to the database.");
  } catch (error) {
    if (error instanceof Error) {
      error = `Database error: ${error.message}`;
    }

    console.error(error);
    console.info("The process has finished.\nPlease restart the process.");
    process.exit(0);
  }
}

conectToDatabase();
