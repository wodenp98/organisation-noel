import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name?: string;
    };
  }

  interface User {
    id: string;
    username: string;
    name?: string;
  }
}
