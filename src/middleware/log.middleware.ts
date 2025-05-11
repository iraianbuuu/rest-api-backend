import morgan from 'morgan';
import logger from '../utils/logger';
import { config } from '../config';

const stream = {
  write: (message: string) => logger.http(message),
};

const skip = () => {
  const env = config.nodeEnv;
  return env !== 'development';
};

const logMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream,
    skip,
  },
);

export default logMiddleware;
