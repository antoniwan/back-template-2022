import { list } from "@keystone-6/core";
import { text, relationship } from "@keystone-6/core/fields";

export const Tag = list({
  fields: {
    name: text({
      isIndexed: "unique",
    }),
    posts: relationship({ ref: "Post.tags", many: true }),
    userImages: relationship({ ref: "UserImage.tags", many: true }),
  },
});

export default Tag;
