import mongoose from "mongoose";

/**
 * Connect to database
 *
 * @param {string} url
 * @returns
 */
async function connect(url: string) {
  const db: any = await mongoose.connect(url, { useNewUrlParser: true });

  return db;
}

export { connect };
