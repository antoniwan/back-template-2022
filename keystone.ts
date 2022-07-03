
import 'dotenv/config'
import { config } from '@keystone-6/core';
import { lists } from './schemas';
import { withAuth, session } from './auth';

export default withAuth(
  config({
    server: {
      port: Number(process.env.APP_PORT) || 3001,
      cors: {
        origin: [process.env.FRONTEND_APP_URL || 'http://localhost:3000'],
        credentials: true
      }
    },
    db: {
      provider: process.env.DB_PROVIDER || "sqlite",
      url: process.env.DB_URL || "file:./keystone.db",
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    },
    lists,
    session,
  })
);
