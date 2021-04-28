import { increment, decrement } from './demoSlice';
// import action
// 1) NOTE: JUST import action which are handled middleware (call API)
// 2) In case action is a plain obj (no call API middleware), we just dispatch action directly in component tsx.
// 3) In case action is a function to handle call API:
//      - Create function in this file fileAction.ts
//      - After call API then recieve a response
//      - then dispatch it to action to slice

export {};
