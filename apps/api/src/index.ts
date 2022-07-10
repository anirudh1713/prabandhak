import express from 'express';
import {config} from './lib/config';

const app = express();

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
