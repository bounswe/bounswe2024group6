import { server } from "./src/mocks/node.js";
import { beforeAll, afterAll, afterEach } from "vitest";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
