import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});

export default server;