
import 'dotenv/config'
import { config } from '@keystone-6/core';
import { lists } from './schemas';
import { withAuth, session } from './auth';
const { APP_PORT, FRONTEND_APP_URL, DB_PROVIDER, DB_URL } = process.env;

export default withAuth(
  config({
    server: {
      port: APP_PORT || 3001,
      cors: {
        origin: [FRONTEND_APP_URL],
        credentials: true
      }
    },
    db: {
      provider: DB_PROVIDER || "sqlite",
      url: DB_URL || "file:./keystone.db",
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
