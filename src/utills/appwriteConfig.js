
import { Client, Databases, Permission, Role, Account, ID } from 'appwrite';
import conf from '../conf/conf';

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId); // Replace with your project ID

// Initialize services
const appwriteDB = new Databases(client);
const account = new Account(client);

// Define roles and permissions
const Permissions = {
  any: () => Permission.read(Role.any()), // Anyone can read
  user: () => Permission.write(Role.any()), // Specific user can write
  authenticated: () => Permission.read(Role.any()), // Only authenticated users can read
  admin: () => Permission.write(Role.role(Role.any())), // Admin role can write
};

// You can also define roles for access control
const Roles = {
  admin: 'admin',
  teacher: 'teacher',
  student: 'student',
  guest: 'guest',
};

// Export the Appwrite configuration and utilities
export {
  client,
  appwriteDB,
  account,
  Permissions,
  Roles,
  ID, // Export ID so you can use it for creating unique document IDs
};
