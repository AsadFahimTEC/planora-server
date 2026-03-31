var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id        String   @id @default(uuid())\n  name      String\n  email     String   @unique\n  password  String?\n  isBanned  Boolean  @default(false)\n  createdAt DateTime @default(now())\n\n  tutorProfile    TutorProfile?\n  studentBookings Booking[]     @relation("StudentBookings")\n  reviews         Review[]\n  emailVerified   Boolean       @default(false)\n  image           String?\n  updatedAt       DateTime      @updatedAt\n  sessions        Session[]\n  accounts        Account[]\n\n  role String? @default("STUDENT")\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Booking {\n  id        String        @id @default(uuid())\n  studentId String\n  tutorId   String\n  status    BookingStatus @default(UPCOMING)\n  createdAt DateTime      @default(now())\n\n  student User         @relation("StudentBookings", fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id])\n}\n\nmodel Event {\n  id              String   @id @default(uuid())\n  title           String\n  startDate       DateTime\n  endDate         DateTime\n  venue           String\n  description     String\n  type            String\n  feeType         String\n  registrationFee Float\n  organizer       String\n  maxParticipants Int\n  category        String\n  status          String\n  createdAt       DateTime @default(now())\n  updatedAt       DateTime @updatedAt\n}\n\nenum BookingStatus {\n  UPCOMING\n  COMPLETED\n  CANCELLED\n}\n\nmodel TutorProfile {\n  id         String @id @default(uuid())\n  userId     String @unique\n  bio        String\n  pricePerHr Int\n  rating     Float  @default(0)\n\n  user         User           @relation(fields: [userId], references: [id])\n  categories   Category[]\n  availability Availability[]\n  bookings     Booking[]\n  reviews      Review[]\n}\n\nmodel Category {\n  id   String @id @default(uuid())\n  name String @unique\n\n  tutors TutorProfile[]\n}\n\nmodel Availability {\n  id        String @id @default(uuid())\n  tutorId   String\n  day       String\n  startTime String\n  endTime   String\n\n  tutor TutorProfile @relation(fields: [tutorId], references: [id])\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String\n  createdAt DateTime @default(now())\n\n  studentId String\n  tutorId   String\n\n  student User         @relation(fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"isBanned","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"studentBookings","kind":"object","type":"Booking","relationName":"StudentBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"student","kind":"object","type":"User","relationName":"StudentBookings"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"}],"dbName":null},"Event":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"startDate","kind":"scalar","type":"DateTime"},{"name":"endDate","kind":"scalar","type":"DateTime"},{"name":"venue","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"feeType","kind":"scalar","type":"String"},{"name":"registrationFee","kind":"scalar","type":"Float"},{"name":"organizer","kind":"scalar","type":"String"},{"name":"maxParticipants","kind":"scalar","type":"Int"},{"name":"category","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"pricePerHr","kind":"scalar","type":"Int"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"categories","kind":"object","type":"Category","relationName":"CategoryToTutorProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"tutors","kind":"object","type":"TutorProfile","relationName":"CategoryToTutorProfile"}],"dbName":null},"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"day","kind":"scalar","type":"String"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"AvailabilityToTutorProfile"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  AvailabilityScalarFieldEnum: () => AvailabilityScalarFieldEnum,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  EventScalarFieldEnum: () => EventScalarFieldEnum,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TutorProfileScalarFieldEnum: () => TutorProfileScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Booking: "Booking",
  Event: "Event",
  TutorProfile: "TutorProfile",
  Category: "Category",
  Availability: "Availability",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  isBanned: "isBanned",
  createdAt: "createdAt",
  emailVerified: "emailVerified",
  image: "image",
  updatedAt: "updatedAt",
  role: "role"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BookingScalarFieldEnum = {
  id: "id",
  studentId: "studentId",
  tutorId: "tutorId",
  status: "status",
  createdAt: "createdAt"
};
var EventScalarFieldEnum = {
  id: "id",
  title: "title",
  startDate: "startDate",
  endDate: "endDate",
  venue: "venue",
  description: "description",
  type: "type",
  feeType: "feeType",
  registrationFee: "registrationFee",
  organizer: "organizer",
  maxParticipants: "maxParticipants",
  category: "category",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TutorProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  bio: "bio",
  pricePerHr: "pricePerHr",
  rating: "rating"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name"
};
var AvailabilityScalarFieldEnum = {
  id: "id",
  tutorId: "tutorId",
  day: "day",
  startTime: "startTime",
  endTime: "endTime"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt",
  studentId: "studentId",
  tutorId: "tutorId"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/admin/admin.routes.ts
import express from "express";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: false
      },
      isBanned: {
        type: "boolean",
        defaultValue: false,
        required: false
      },
      image: {
        type: "string",
        required: false
      },
      emailVerified: {
        type: "boolean",
        defaultValue: false,
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email/?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Planora" <planora@ph.com>',
          to: user.email,
          subject: "Please verify your email!",
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:8px;overflow:hidden;
                 box-shadow:0 4px 10px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:#2563eb;color:#ffffff;padding:20px;text-align:center;">
              <h1 style="margin:0;font-size:24px;">Prisma Blog</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px;color:#333333;">
              <h2>Verify your email address</h2>

              <p style="font-size:16px;line-height:1.6;">
               Hello ${user.name} <br /> <br />
                Thanks for signing up! Please confirm your email address.
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a href="${verificationUrl}"
                  style="background:#2563eb;color:#ffffff;
                         text-decoration:none;padding:14px 28px;
                         border-radius:6px;font-size:16px;
                         font-weight:bold;display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="font-size:14px;color:#555;">
                Or copy and paste this link:
              </p>

              <p style="word-break:break-all;font-size:14px;">
                <a href="${verificationUrl}" style="color:#2563eb;">
                  ${url}
                </a>
              </p>

              <p style="font-size:14px;color:#777;">
                If you didn\u2019t create this account, ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f6f8;padding:15px;
                       text-align:center;font-size:12px;color:#777;">
              \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Prisma Blog
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`
        });
        console.log("Message sent:", info.messageId);
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: true,
    defaultCookieAttributes: {
      sameSite: "none",
      // local testing should be "lax"
      secure: true,
      // on local testing should be false
      httpOnly: true
      // on local testing should be false
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/middlewares/auth.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["USER"] = "USER";
  UserRole2["ADMIN"] = "ADMIN";
  return UserRole2;
})(UserRole || {});
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      console.log(req.headers);
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required. Please verify your email!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var auth_default = auth2;

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true
    }
  });
};
var getAllBookings = async () => {
  return await prisma.booking.findMany({
    select: {
      id: true,
      studentId: true,
      tutorId: true,
      status: true,
      createdAt: true
    }
  });
};
var updateUserStatus = async (id, isBanned) => {
  return await prisma.user.update({
    where: { id },
    data: { isBanned }
  });
};
var adminService = {
  getAllUsers,
  getAllBookings,
  updateUserStatus
};

// src/modules/admin/admin.controller.ts
var getUsers = async (req, res) => {
  const users = await adminService.getAllUsers();
  res.status(200).json({
    success: true,
    message: "All User retrieved successfully",
    data: users
  });
};
var getAllBookings2 = async (req, res) => {
  const bookings = await adminService.getAllBookings();
  res.status(200).json({
    success: true,
    message: "All Bookings retrieved successfully",
    data: bookings
  });
};
var updateUserStatus2 = async (req, res) => {
  const user = await adminService.updateUserStatus(
    req.params.id,
    req.body.isBanned
  );
  res.status(200).json({
    success: true,
    message: "User status updated",
    data: user
  });
};
var adminController = {
  getUsers,
  getAllBookings: getAllBookings2,
  updateUserStatus: updateUserStatus2
};

// src/modules/admin/admin.routes.ts
var router = express.Router();
router.get("/users", auth_default("ADMIN" /* ADMIN */), adminController.getUsers);
router.get("/bookings", auth_default("ADMIN" /* ADMIN */), adminController.getAllBookings);
router.patch("/users/:id", auth_default("ADMIN" /* ADMIN */), adminController.updateUserStatus);
var adminRouter = router;

// src/modules/review/review.routes.ts
import express2 from "express";

// src/modules/review/review.service.ts
var reviewService = {
  // Create a new review
  createReview: async (studentId, tutorId, rating, comment) => {
    try {
      const review = await prisma.review.create({
        data: {
          studentId,
          tutorId,
          rating,
          comment
        }
      });
      return review;
    } catch (error) {
      console.error("Create Review Service Error:", error);
      throw new Error("Failed to create review");
    }
  },
  // Get all reviews for a tutor
  getReviewsByTutor: async (tutorId) => {
    try {
      const reviews = await prisma.review.findMany({
        where: { tutorId },
        include: { student: { select: { id: true, name: true } } }
      });
      return reviews;
    } catch (error) {
      console.error("Get Reviews Service Error:", error);
      throw new Error("Failed to fetch reviews");
    }
  },
  // Get a single review by id
  getReviewById: async (id) => {
    try {
      const review = await prisma.review.findUnique({
        where: { id },
        include: { student: { select: { id: true, name: true } } }
      });
      return review;
    } catch (error) {
      console.error("Get Review By ID Service Error:", error);
      throw new Error("Failed to fetch review");
    }
  },
  // Update a review
  updateReview: async (reviewId, studentId, rating, comment) => {
    try {
      const review = await prisma.review.updateMany({
        where: {
          id: reviewId,
          studentId
          // ensure student can only update their review
        },
        data: {
          rating,
          comment
        }
      });
      if (review.count === 0) {
        throw new Error("Review not found or permission denied");
      }
      return await prisma.review.findUnique({ where: { id: reviewId } });
    } catch (error) {
      console.error("Update Review Service Error:", error);
      throw new Error("Failed to update review");
    }
  },
  // Delete a review
  deleteReview: async (reviewId, studentId) => {
    try {
      const review = await prisma.review.deleteMany({
        where: {
          id: reviewId,
          studentId
          // ensure student can only delete their review
        }
      });
      if (review.count === 0) {
        throw new Error("Review not found or permission denied");
      }
      return { id: reviewId };
    } catch (error) {
      console.error("Delete Review Service Error:", error);
      throw new Error("Failed to delete review");
    }
  }
};

// src/modules/review/review.controller.ts
var createReview = async (req, res) => {
  try {
    const { tutorId, rating, comment } = req.body;
    const review = await reviewService.createReview(
      req.user.id,
      tutorId,
      rating,
      comment
    );
    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
var getReviewsByTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const reviews = await reviewService.getReviewsByTutor(tutorId);
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
var getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id);
    if (!review)
      return res.status(404).json({ success: false, message: "Review not found" });
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
var updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const updated = await reviewService.updateReview(
      id,
      req.user.id,
      rating,
      comment
    );
    res.status(200).json({ success: true, message: "Review updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
var deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await reviewService.deleteReview(id, req.user.id);
    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
var reviewController = {
  createReview,
  getReviewsByTutor,
  getReviewById,
  updateReview,
  deleteReview
};

// src/modules/review/review.routes.ts
var router2 = express2.Router();
router2.post("/", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), reviewController.createReview);
router2.get("/tutor/:tutorId", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), reviewController.getReviewsByTutor);
router2.get("/:id", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), reviewController.getReviewById);
router2.patch("/:id", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), reviewController.updateReview);
router2.delete("/:id", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), reviewController.deleteReview);
var reviewRouter = router2;

// src/modules/events/events.routes.ts
import express3 from "express";

// src/modules/events/events.service.ts
var createEvent = async (data) => {
  return await prisma.event.create({
    data: {
      title: data.title,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      venue: data.venue,
      description: data.description,
      type: data.type,
      feeType: data.feeType,
      registrationFee: data.registrationFee,
      organizer: data.organizer,
      maxParticipants: data.maxParticipants,
      category: data.category,
      status: data.status
    }
  });
};
var getMyEvents = async (eventId) => {
  return await prisma.event.findMany({
    where: {
      id: eventId
    }
  });
};
var getEventsById = async (eventId) => {
  return await prisma.event.findUnique({
    where: {
      id: eventId
    }
  });
};
var getAllEvents = async () => {
  return await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
      venue: true,
      description: true,
      type: true,
      feeType: true,
      registrationFee: true,
      organizer: true,
      maxParticipants: true,
      category: true,
      status: true
    }
  });
};
var updateEvent = async (eventId, data) => {
  return await prisma.event.update({
    where: { id: eventId },
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : void 0,
      endDate: data.endDate ? new Date(data.endDate) : void 0,
      registrationFee: data.registrationFee ? Number(data.registrationFee) : void 0,
      maxParticipants: data.maxParticipants ? Number(data.maxParticipants) : void 0
    }
  });
};
var deleteEvent = async (eventId, userId) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });
  if (!event) throw new Error("Event not found");
  return await prisma.event.delete({
    where: { id: eventId }
  });
};
var eventParticipations = [];
var joinEvent = async (eventId, userId) => {
  const exists = eventParticipations.find(
    (p) => p.eventId === eventId && p.userId === userId
  );
  if (exists) return null;
  const participation = { userId, eventId, status: "joined" };
  eventParticipations.push(participation);
  return participation;
};
var requestEvent = async (eventId, userId) => {
  const exists = eventParticipations.find(
    (p) => p.eventId === eventId && p.userId === userId
  );
  if (exists) return null;
  const participation = { userId, eventId, status: "requested" };
  eventParticipations.push(participation);
  return participation;
};
var eventService = {
  createEvent,
  getMyEvents,
  getEventsById,
  getAllEvents,
  updateEvent,
  deleteEvent,
  joinEvent,
  requestEvent
};

// src/modules/events/events.controller.ts
var createEvent2 = async (req, res) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create an event!"
    });
  }
};
var getMyEvents2 = async (req, res) => {
  const tutors = await eventService.getMyEvents(req.params.id);
  res.status(200).json({
    success: true,
    message: "All Events retrieved successfully",
    data: tutors
  });
};
var getEventDetails = async (req, res) => {
  const booking = await eventService.getEventsById(req.params.id);
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }
  res.json({ success: true, data: booking });
};
var getAllEvents2 = async (req, res) => {
  const tutors = await eventService.getAllEvents();
  res.status(200).json({
    success: true,
    message: "All Events retrieved successfully",
    data: tutors
  });
};
var updateEvent2 = async (req, res) => {
  const event = await eventService.updateEvent(
    req.params.id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Event updated",
    data: event
  });
};
var deleteEvent2 = async (req, res) => {
  const event = await eventService.deleteEvent(
    req.params.id,
    req.user?.id
  );
  res.status(200).json({
    success: true,
    message: "Event deleted",
    data: event
  });
};
var joinEvent2 = async (req, res) => {
  const eventId = Number(req.params.id);
  const userId = Number(req.user?.id);
  if (!eventId || !userId) {
    return res.status(400).json({ message: "Event ID and user ID required" });
  }
  try {
    const result = await eventService.joinEvent(eventId, userId);
    if (result) {
      return res.json({ message: "Joined successfully", data: result });
    }
    return res.status(404).json({ message: "Event not found or already joined" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Join failed" });
  }
};
var requestEvent2 = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user?.id;
    if (!eventId || !userId) {
      return res.status(400).json({
        message: "Event ID and user ID required"
      });
    }
    const result = await eventService.requestEvent(eventId, userId);
    res.status(200).json({
      message: "Request sent successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
var eventController = {
  createEvent: createEvent2,
  getMyEvents: getMyEvents2,
  getEventDetails,
  getAllEvents: getAllEvents2,
  updateEvent: updateEvent2,
  deleteEvent: deleteEvent2,
  joinEvent: joinEvent2,
  requestEvent: requestEvent2
};

// src/modules/events/events.routes.ts
var router3 = express3.Router();
router3.get("/", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), eventController.getMyEvents);
router3.get("/:id", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), eventController.getEventDetails);
router3.get("/", auth_default("USER" /* USER */), eventController.getAllEvents);
router3.post("/", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), eventController.createEvent);
router3.post("/:id/join", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), eventController.joinEvent);
router3.post("/:id/request", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), eventController.requestEvent);
router3.put("/:id", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), eventController.updateEvent);
router3.delete("/:id", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), eventController.deleteEvent);
var bookingRouter = router3;

// src/modules/invitations/invitation.route.ts
import express4 from "express";

// src/modules/invitations/invitation.service.ts
var invitations = [];
var InvitationService = {
  // ✅ GET all
  getAllInvitations: () => {
    return invitations;
  },
  // ✅ GET by id
  getInvitationById: (id) => {
    return invitations.find((inv) => inv.id === id);
  },
  // ✅ CREATE (from Postman)
  createInvitation: (payload) => {
    invitations.push(payload);
    return payload;
  },
  // ✅ UPDATE status
  updateStatus: (id, status) => {
    const invitation = invitations.find((inv) => inv.id === id);
    if (!invitation) return null;
    invitation.status = status;
    return invitation;
  },
  // ✅ DELETE (optional but useful)
  deleteInvitation: (id) => {
    const index = invitations.findIndex((inv) => inv.id === id);
    if (index === -1) return null;
    const deleted = invitations.splice(index, 1);
    return deleted[0];
  }
};

// src/modules/invitations/invitation.controller.ts
var InvitationController = {
  // ✅ GET all
  getAll: (req, res) => {
    const data = InvitationService.getAllInvitations();
    res.status(200).json({
      success: true,
      message: "Invitations fetched successfully",
      data
    });
  },
  // ✅ GET by id
  getById: (req, res) => {
    const id = Number(req.params.id);
    const data = InvitationService.getInvitationById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found"
      });
    }
    res.status(200).json({
      success: true,
      data
    });
  },
  // ✅ POST (create from Postman)
  create: (req, res) => {
    const payload = req.body;
    if (!payload || !payload.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid data"
      });
    }
    const data = InvitationService.createInvitation(payload);
    res.status(201).json({
      success: true,
      message: "Invitation created successfully",
      data
    });
  },
  // ✅ PATCH (update status)
  updateStatus: (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;
    const data = InvitationService.updateStatus(id, status);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data
    });
  },
  // ✅ DELETE
  delete: (req, res) => {
    const id = Number(req.params.id);
    const data = InvitationService.deleteInvitation(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
      data
    });
  }
};

// src/modules/invitations/invitation.route.ts
var router4 = express4.Router();
router4.get("/", auth_default("USER" /* USER */), InvitationController.getAll);
router4.get("/:id", auth_default("USER" /* USER */), InvitationController.getById);
router4.post("/", auth_default("USER" /* USER */), InvitationController.create);
router4.patch("/:id", auth_default("USER" /* USER */), InvitationController.updateStatus);
router4.delete("/:id", auth_default("USER" /* USER */), InvitationController.delete);
var invitationRouter = router4;

// src/modules/category/category.routes.ts
import express5 from "express";
var router5 = express5.Router();
router5.get("/categories", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json({
    success: true,
    data: categories
  });
});
var categoryRouter = router5;

// src/modules/tutor/tutor.routes.ts
import express6 from "express";

// src/modules/tutor/tutor.service.ts
var getTutors = (filters) => {
  const where = {};
  if (filters?.price) {
    where.pricePerHr = {
      lte: Number(filters.price)
    };
  }
  if (filters?.rating) {
    where.rating = {
      gte: Number(filters.rating)
    };
  }
  if (filters?.category) {
    where.categories = {
      some: {
        name: filters.category
      }
    };
  }
  return prisma.tutorProfile.findMany({
    where,
    include: {
      user: true,
      categories: true
    }
  });
};
var getTutorById = (id) => {
  return prisma.tutorProfile.findUnique({
    where: { id },
    include: {
      user: true,
      categories: true,
      availability: true,
      reviews: true
    }
  });
};
var createProfile = async (userId, data) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    throw new Error("User not found");
  }
  const existingProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (existingProfile) {
    throw new Error("Tutor profile already exists");
  }
  if (!data.categoryIds || data.categoryIds.length === 0) {
    throw new Error("At least one category is required");
  }
  const categories = await prisma.category.findMany({
    where: {
      id: { in: data.categoryIds }
    }
  });
  if (categories.length !== data.categoryIds.length) {
    throw new Error("One or more categories not found");
  }
  return prisma.tutorProfile.create({
    data: {
      userId,
      bio: data.bio,
      pricePerHr: Number(data.pricePerHr),
      categories: {
        connect: data.categoryIds.map((id) => ({ id }))
      }
    },
    include: {
      categories: true,
      user: true
    }
  });
};
var updateProfile = (userId, data) => {
  return prisma.tutorProfile.update({
    where: { userId },
    data: {
      bio: data.bio,
      pricePerHr: data.pricePerHr,
      categories: {
        set: data.categoryIds.map((id) => ({ id })) || []
      }
    }
  });
};
var setAvailability = async (userId, slots) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: {
      userId
    }
  });
  await prisma.availability.deleteMany({
    where: { tutorId: tutor.id }
  });
  return prisma.availability.createMany({
    data: slots.map((slot) => ({
      tutorId: tutor.id,
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime
    }))
  });
};
var getAvailability = async (req, res) => {
  try {
    const userId = req.user?.id;
    const availability = await tutorService.getAvailability(userId);
    res.status(200).json({
      success: true,
      message: "Availability fetched",
      data: availability
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
var getTutorDashboard = async () => {
  return await prisma.tutorProfile.findMany({
    select: {
      userId: true,
      id: true,
      bio: true,
      pricePerHr: true,
      rating: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    }
  });
};
var tutorService = {
  getTutors,
  getTutorById,
  createProfile,
  updateProfile,
  setAvailability,
  getAvailability,
  getTutorDashboard
};

// src/modules/tutor/tutor.controller.ts
var listTutors = async (req, res) => {
  const tutors = await tutorService.getTutors(req.query);
  res.status(200).json({
    success: true,
    data: tutors
  });
};
var tutorDetails = async (req, res) => {
  const tutor = await tutorService.getTutorById(req.params.id);
  res.status(200).json({
    success: true,
    data: tutor
  });
};
var createTutorProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const profile = await tutorService.createProfile(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Tutor profile created successfully",
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create tutor profile"
    });
  }
};
var updateTutorProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const profile = await tutorService.updateProfile(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Tutor profile updated",
      data: profile
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Tutor profile update failed"
    });
  }
};
var setAvailability2 = async (req, res) => {
  const userId = req.user?.id;
  const availability = await tutorService.setAvailability(userId, req.body);
  res.status(200).json({
    success: true,
    message: "Availability updated",
    data: availability
  });
};
var getAvailability2 = async (userId) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutor) throw new Error("Tutor not found");
  return prisma.availability.findMany({
    where: { tutorId: tutor.id },
    orderBy: [
      { day: "asc" },
      { startTime: "asc" }
    ]
  });
};
var getTutorDashboard2 = async (req, res) => {
  const tutors = await tutorService.getTutorDashboard();
  res.status(200).json({
    success: true,
    message: "All Tutors retrieved successfully",
    data: tutors
  });
};
var tutorController = {
  listTutors,
  tutorDetails,
  createTutorProfile,
  updateTutorProfile,
  setAvailability: setAvailability2,
  getAvailability: getAvailability2,
  getTutorDashboard: getTutorDashboard2
};

// src/modules/tutor/tutor.routes.ts
var router6 = express6.Router();
router6.get("/", tutorController.listTutors);
router6.get("/:id", tutorController.tutorDetails);
router6.get("/", auth_default(UserRole.TUTOR), tutorController.getTutorDashboard);
router6.get("/availability", auth_default(UserRole.TUTOR), tutorController.getAvailability);
router6.post("/profile", auth_default(UserRole.TUTOR), tutorController.createTutorProfile);
router6.put("/profile", auth_default(UserRole.TUTOR), tutorController.updateTutorProfile);
router6.put("/availability", auth_default(UserRole.TUTOR), tutorController.setAvailability);
var tutorRouter = router6;

// src/modules/auth/auth.service.ts
var register = async (data) => {
  return auth.api.signUpEmail(data);
};
var login = async (data) => {
  return auth.api.signInEmail(data);
};
var me = async (req) => {
  return auth.api.getUser(req);
};
var authService = {
  register,
  login,
  me
};

// src/modules/auth/auth.controller.ts
var register2 = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || "Registration failed"
    });
  }
};
var login2 = async (req, res) => {
  try {
    const session = await authService.login(req.body);
    return res.status(201).json({
      success: true,
      message: "Login successful.",
      data: session
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || "Invalid email or password"
    });
  }
};
var getMe = async (req, res) => {
  try {
    const user = await authService.me(req.body);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }
    return res.status(201).json({
      success: true,
      message: "User fetched successfully.",
      data: user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to fetch user"
    });
  }
};
var authController = {
  register: register2,
  login: login2,
  getMe
};

// src/modules/auth/auth.routes.ts
import express7 from "express";
var router7 = express7.Router();
router7.post("/sign-up/email", authController.register);
router7.post("/sign-in/email", authController.login);
router7.get("/me", authController.getMe);
var authRouter = router7;

// src/app.ts
import express9 from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/middlewares/globalErrorHandling.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing fields!";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found. {cause}";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = "PANIC: internal error: entered unreachable code";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your credentials.";
    }
  } else if (err.errorCode === "P1001") {
    statusCode = 400;
    errorMessage = "Can't reach database server";
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandling_default = errorHandler;

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(400).json({
    message: "Route not found!",
    path: req.originalUrl,
    date: Date()
  });
}

// src/modules/sslcommerz/payment.route.ts
import express8 from "express";

// src/modules/sslcommerz/payment.service.ts
import axios from "axios";
var sslcommerzPayment = {
  createPayment: async (req, res) => {
    try {
      const { eventId, amount } = req.body;
      const userId = req.user?.id;
      if (!eventId || !amount || !userId) {
        return res.status(400).json({
          message: "eventId, amount, userId required"
        });
      }
      const paymentData = {
        store_id: "asadt69ca141a84b32",
        store_passwd: "asadt69ca141a84b32@ssl",
        total_amount: Number(amount).toFixed(2),
        currency: "BDT",
        tran_id: `tran_${Date.now()}`,
        success_url: `http://localhost:3000/payment/success?eventId=${eventId}&userId=${userId}`,
        fail_url: `http://localhost:3000/payment/fail`,
        cancel_url: `http://localhost:3000/payment/cancel`,
        cus_name: "Test User",
        cus_email: "test@example.com",
        cus_add1: "Dhaka",
        cus_city: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        shipping_method: "NO",
        product_name: `Event-${eventId}`,
        product_category: "Event",
        product_profile: "general"
      };
      const response = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        paymentData,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (response.data?.GatewayPageURL) {
        return res.status(200).json({
          GatewayPageURL: response.data.GatewayPageURL
        });
      }
      return res.status(500).json({
        message: "Payment gateway failed"
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message || "Payment failed"
      });
    }
  }
};

// src/modules/sslcommerz/payment.controller.ts
var PaymentController = class {
  static async createPayment(req, res) {
    try {
      await sslcommerzPayment.createPayment(req, res);
    } catch (err) {
      res.status(500).json({
        message: err.message || "Payment initiation failed"
      });
    }
  }
  // ✅ FIXED SUCCESS
  static async paymentSuccess(req, res) {
    try {
      const { tran_id, eventId, userId } = req.query;
      if (!tran_id || !eventId || !userId) {
        return res.status(400).send("Missing parameters");
      }
      console.log("Payment success:", tran_id);
      await eventService.joinEvent(eventId, userId);
      return res.redirect(
        `http://localhost:3000/dashboard?payment=success`
      );
    } catch (err) {
      console.error(err);
      return res.redirect(
        `http://localhost:3000/dashboard?payment=error`
      );
    }
  }
  static paymentFail(req, res) {
    const { tran_id } = req.query;
    console.log("Payment failed:", tran_id);
    return res.redirect(
      `http://localhost:3000/dashboard?payment=failed`
    );
  }
  static paymentCancel(req, res) {
    const { tran_id } = req.query;
    console.log("Payment cancelled:", tran_id);
    return res.redirect(
      `http://localhost:3000/dashboard?payment=cancelled`
    );
  }
};

// src/modules/sslcommerz/payment.route.ts
var router8 = express8.Router();
router8.post("/sslcommerz", PaymentController.createPayment);
router8.get("/success", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), PaymentController.paymentSuccess);
router8.get("/fail", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), PaymentController.paymentFail);
router8.get("/cancel", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), PaymentController.paymentCancel);
var paymentRouter = router8;

// src/app.ts
var app = express9();
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express9.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/auth", authRouter);
app.use("/api/tutors", tutorRouter);
app.use("/api/admin", categoryRouter);
app.use("/api/events", bookingRouter);
app.use("/api/invitations", invitationRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);
app.use("/api/payments", paymentRouter);
app.get("/", (req, res) => {
  res.send("Planora is Running!");
});
app.use(notFound);
app.use(globalErrorHandling_default);
var app_default = app;

// src/server.ts
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
var PORT = process.env.PORT || 5e3;
try {
  app_default.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
  });
} catch (error) {
  console.error("error");
}
var server_default = app_default;
export {
  server_default as default
};
