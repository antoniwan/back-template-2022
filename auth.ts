import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

let sessionSecret = process.env.AUTH_SESSION_SECRET;
let sessionMaxAge = 60 * 60 * 24 * 30;  // 30 days

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production'
    );
  } else {
    sessionSecret = 'ñakiñakichickenteriyakiC2L9iAMDNE48ggg5CwZXUs7V9jYQFELX';
  }
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password', 'createdOn'],
  },
});

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export { withAuth, session };
