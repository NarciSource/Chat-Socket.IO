import { defineConfig, loadEnv } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // 환경변수 증설
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    // 서버포트
    const serverPort = Number(process.env.VITE_SERVER_PORT);

    // vite 설정
    return {
        plugins: [
            tsconfigPaths({
                loose: true,
            }), // tsconfig.json의 paths 설정을 적용
            vue(),
        ],
        build: {
            target: "esnext",
            emptyOutDir: false,
        },
        resolve: {
            extensions: [".ts", ".js", ".vue"], // 확장자 인식
        },
        server: {
            // 개발 서버 설정
            port: serverPort,
            cors: true,
        },
        preview: {
            port: serverPort,
        },
        base: process.env.VITE_PUBLIC_URL,
    };
});
