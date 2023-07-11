import mongoose from "mongoose";

async function conectToDatabase() {
  const uri = String(process.env.DB_URI);

  try {
    await mongoose.connect(uri);
    console.info("Connected to the database.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database error:", error.message);
    } else {
      console.error("An unexpected error happend while trying to connect to the database");
    }

    console.info("The process has finished.\nPlease restart the process.");
    process.exit(0);
  }
}

conectToDatabase();
