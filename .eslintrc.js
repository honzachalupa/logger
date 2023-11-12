module.exports = {
    root: true,
    extends: ["next", "turbo", "prettier"],
    settings: {
        next: {
            rootDir: ["packages/*/"],
        },
    },
    ignorePatterns: ["**/build/*"],
    rules: {
        "import/no-anonymous-default-export": "off",
        "@next/next/no-html-link-for-pages": "off",
    },
};
