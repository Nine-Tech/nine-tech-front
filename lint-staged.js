export default {
  "*.{js,jsx}": [
    "eslint . --report-unused-disable-directives --max-warnings 0 --fix",
  ],
  "*.{js,jsx,json,css,scss}": ["prettier --write"],
};
