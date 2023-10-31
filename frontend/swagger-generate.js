import path from 'path';
import * as sta from 'swagger-typescript-api';

const PATH_TO_OUTPUT_DIR = './src/core/api';

sta.generateApi({
  name: 'api-models.ts',
  // eslint-disable-next-line
  output: path.resolve(process.cwd(), PATH_TO_OUTPUT_DIR),
  url: 'http://localhost:8000/openapi.json',
});
