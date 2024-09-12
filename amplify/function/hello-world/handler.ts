import { Handler } from 'aws-lamda';

export const handler: Handler = async (event, context) => {
  return { message: 'Hello World!!'}
}

