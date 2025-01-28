import 'dotenv/config';
import dotenv from 'dotenv';
import { envString, envNumber } from '../utils/envUtils';

dotenv.config();


export const config = {
    http: {
      host: envString('HOST', 'localhost'),
      port: envNumber('PORT', 8080),
      origin: envString('ORIGIN')
    },
    app: {
        email: envString('EDUWORLD_AUTH_EMAIL'),
        password: envString('EDUWORLD_AUTH_PASSWORD'),
        node_env:envString('NODE_ENV'),
        email_service:envString('EMAIL_SERVICE')
      },
      admin: {
        email: envString('ADMIN_EMAIL'),
        password: envString('ADMIN_PASSWORD')
    }
}