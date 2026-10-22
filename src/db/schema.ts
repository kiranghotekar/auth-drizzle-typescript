import { timestamp } from "drizzle-orm/cockroach-core";
import { uuid, integer, pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    password: varchar('password', { length: 66 }),
    salt: text('salt'),

    createdAt : timestamp('created at').defaultNow().notNull(),
    updatedAt : timestamp('update at').$onUpdate(()=>new Date()),
    
});
