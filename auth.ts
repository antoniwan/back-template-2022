import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  secret: process.env.AUTH_SESSION_SECRET,
};

if (!sessionConfig.secret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "The SESSION_SECRET environment variable must be set in production"
    );
  } else {
    sessionConfig.secret =
      "ñakiñakichickenteriyakiC2L9iAMDNE48ggg5CwZXUs7V9jYQFELX";
  }
}

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  sessionData: "id",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password", "createdOn"],
  },
});

const session = statelessSessions({
  secret: sessionConfig.secret,
  maxAge: sessionConfig.maxAge,
});

export { withAuth, session };
