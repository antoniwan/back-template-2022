import { list } from "@keystone-6/core";
import { text, relationship, timestamp, select } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { document } from "@keystone-6/fields-document";

export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  folder: "backend-template/user-images/",
};

if (
  !cloudinaryConfig.cloudName ||
  !cloudinaryConfig.apiKey ||
  !cloudinaryConfig.apiSecret ||
  !cloudinaryConfig.folder
) {
  throw new Error(
    "Missing Cloudinary Configurations! Please verify your .env file!"
  );
}

export const UserImage = list({
  fields: {
    title: text(),
    type: select({
      type: "enum",
      options: [
        { label: "Profile Picture", value: "profile_picture" },
        { label: "Post", value: "post_picture" },
      ],
      defaultValue: "post_picture",
      validation: {
        isRequired: true,
      },
    }),
    image: cloudinaryImage({
      cloudinary: cloudinaryConfig,
      label: "Source",
    }),
    altText: text(),
    content: document({
      formatting: true,
      links: true,
    }),
    author: relationship({
      ref: "User.images",
    }),
    post: relationship({
      ref: "Post.userImages",
    }),
    tags: relationship({
      ref: "Tag.userImages",
      many: true,
    }),
    createdOn: timestamp({
      defaultValue: {
        kind: "now",
      },
      validation: {
        isRequired: true,
      },
      isIndexed: true,
    }),
  },
});

export default UserImage;
