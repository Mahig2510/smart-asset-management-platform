import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" });

console.log(
  "MONGODB_URI:",
  process.env.MONGODB_URI
);

import mongoose from "mongoose";

import Category from "../src/models/Category";
import User from "../src/models/User";
import Asset from "../src/models/Asset";

async function seed() {
  try {
    await mongoose.connect(
  process.env.MONGODB_URI!
);

console.log("MongoDB Connected");

    console.log("MongoDB Connected");

    // =====================
    // Categories
    // =====================

    const categoryNames = [
      "Electronics",
      "Networking",
      "Furniture",
      "Laboratory",
      "Accessories",
    ];

    const categories: any[] = [];

    for (const name of categoryNames) {
      let category = await Category.findOne({
        name,
      });

      if (!category) {
        category = await Category.create({
          name,
          description: `${name} Assets`,
        });

        console.log(
          `✅ Created Category: ${name}`
        );
      }

      categories.push(category);
    }

    // =====================
    // Users
    // =====================

    const usersData = [
      {
        name: "Sakshi",
        email: "sakshi@college.com",
      },
      {
        name: "Rahul",
        email: "rahul@college.com",
      },
      {
        name: "Priya",
        email: "priya@college.com",
      },
      {
        name: "Aman",
        email: "aman@college.com",
      },
      {
        name: "Neha",
        email: "neha@college.com",
      },
      {
        name: "Rohit",
        email: "rohit@college.com",
      },
    ];

    const hashedPassword =
      await bcrypt.hash(
        "Password@123",
        10
      );

    for (const userData of usersData) {
      const existingUser =
        await User.findOne({
          email: userData.email,
        });

      if (!existingUser) {
        await User.create({
          ...userData,
          password:
            hashedPassword,
          role: "USER",
        });

        console.log(
          `✅ Created User: ${userData.email}`
        );
      }
    }

    // =====================
    // Assets
    // =====================

    const assetNames = [
      "HP EliteBook",
      "Dell Latitude",
      "MacBook Air",
      "Lenovo ThinkPad",
      "Epson Projector",

      "Cisco Router",
      "TP-Link Router",
      "24 Port Switch",
      "Access Point",
      "Firewall Device",

      "Office Chair",
      "Conference Table",
      "Study Desk",
      "Whiteboard",
      "Filing Cabinet",

      "Oscilloscope",
      "Function Generator",
      "Multimeter",
      "Power Supply",
      "Arduino Kit",

      "HDMI Cable",
      "USB Hub",
      "Keyboard",
      "Mouse",
      "Monitor",
    ];

    let assetCounter = Date.now();

    for (
      let i = 0;
      i < assetNames.length;
      i++
    ) {
      const assetName =
        assetNames[i];

      const existingAsset =
  await Asset.findOne({
    name: assetName,
  });

if (existingAsset) {
  console.log(
    `Skipping ${assetName}`
  );
  continue;
}

      const category =
        categories[
          i %
            categories.length
        ];

      const totalQty =
        Math.floor(
          Math.random() * 10
        ) + 5;

      const availableQty =
        Math.floor(
          Math.random() *
            totalQty
        ) + 1;

      await Asset.create({
        assetId:
          `AST-${assetCounter++}`,

        name: assetName,

        description:
          `${assetName} asset`,

        category:
          category._id,

        totalQuantity:
          totalQty,

        availableQuantity:
          availableQty,

        serialNumber:
          `SN-${Date.now()}-${i}`,

        purchaseCost:
          Math.floor(
            Math.random() *
              50000
          ) + 1000,

        location:
          "Main Store",

        condition: "GOOD",

        status:
          "AVAILABLE",

        isActive: true,
      });

      console.log(
        `✅ Created Asset: ${assetName}`
      );
    }

    console.log(
      "\n🎉 Seed completed successfully"
    );

    console.log(
  "Categories:",
  await Category.countDocuments()
);

console.log(
  "Users:",
  await User.countDocuments()
);

console.log(
  "Assets:",
  await Asset.countDocuments()
);

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Seed Error:",
      error
    );

    process.exit(1);
  }
}

seed();