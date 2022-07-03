
import 'dotenv/config'
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

const { APP_PORT, DB_PROVIDER, DB_URL } = process.env;

export default withAuth(
  config({
    server: {
      port: APP_PORT || 3001
    },
    db: {
      provider: DB_PROVIDER || "sqlite",
      url: DB_URL || "file:./keystone.db",
    },
    // Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
