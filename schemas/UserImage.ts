import { list } from "@keystone-6/core";
import { text, relationship, timestamp } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";

export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  folder: "backend-template/user-images/",
};

export const UserImage = list({
  fields: {
    title: text(),
    image: cloudinaryImage({
      cloudinary: cloudinaryConfig,
      label: "Source",
    }),
    author: relationship({
      ref: "User.images",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name", "email"] },
      },
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
