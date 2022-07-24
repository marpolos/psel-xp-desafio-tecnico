import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});

export default server;