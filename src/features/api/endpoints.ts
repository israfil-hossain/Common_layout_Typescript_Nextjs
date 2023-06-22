export const ApiPrefix = "/api/demo";
export const FilePrefix = `${process.env.NEXT_PUBLIC_API_URL}/static`;

export enum Api {
  // Auth
  Login = `${ApiPrefix}/login`, // post
  RefreshToken = `${ApiPrefix}/refresh-token`, // post

  // Users
  GetUsers = `${ApiPrefix}/users`, // get
}
