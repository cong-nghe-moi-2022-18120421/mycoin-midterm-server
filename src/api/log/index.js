import devLogger from './development';
import prodLogger from './production';

const logger = process.env.NODE_ENV === 'development' ? devLogger : prodLogger;

export default logger;
