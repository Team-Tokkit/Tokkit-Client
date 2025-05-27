import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", 
    env: {
      apiUrl: "http://localhost:8080", // 백엔드 API 기준
    },
  },
});
