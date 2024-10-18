import { SessionOptions } from 'iron-session';


export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || crypto.getRandomValues(new Uint8Array(32)).toString(),
  cookieName: 'amplitude_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: { id: string; email: string };
  }
}
