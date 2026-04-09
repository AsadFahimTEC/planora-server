import { UserRole } from './../middlewares/auth';

import { prisma } from "../lib/prisma";


async function seedAdmin() {
    try {
        console.log("***** Admin seeding started");
        const adminData = {
            name: "Admin Shaheb",
            email: "admin6@skillbridge.com",
            password: "admin1234",
            role: UserRole.ADMIN,
        }
        console.log("***** Checking Admin Exist or not");
        // check user exist on db or not
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });

        if (existingUser) {
            throw new Error("User already exits!!");
        }

        const signUpAdmin = await fetch("https://planora-server-eta.vercel.app/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "https://planora-client.vercel.app",
            },
            body: JSON.stringify(adminData)
        })


        if (signUpAdmin.ok) {
            console.log("***** Admin created");
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            })
            console.log("***** Email verification status updated!");
        }
        console.log("***** Success *****");

    } catch (error) {
        console.error(error);
    }
}

seedAdmin();