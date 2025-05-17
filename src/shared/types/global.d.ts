// src/types/express.d.ts
import * as admin from 'firebase-admin';

declare module 'express' {
  interface Request {
    user?: admin.auth.DecodedIdToken;
  }
}
