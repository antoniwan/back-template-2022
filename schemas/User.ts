import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  checkbox,
  timestamp
} from '@keystone-6/core/fields';

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox({ defaultValue: false }),
    posts: relationship({ ref: 'Post.author', many: true }),
    lastOnlineOn: timestamp ({
      defaultValue: undefined,
      db: {
        isNullable: true,
      }
    }),
    createdOn: timestamp({
      defaultValue: {
        "kind": "now"
      },
      validation: {
        isRequired: true
      },
      isIndexed: true
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'email', 'posts'],
    },
  },
});

export default User;
