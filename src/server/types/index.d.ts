import { Camera } from '@tsed/gphoto2-driver';
export {};

declare global {
  namespace Express {
    export interface Response {
      camera?: Camera;
    }
    export interface Request {
      camera?: Camera;
    }
  }
}
