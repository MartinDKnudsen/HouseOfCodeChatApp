module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "quotes": ["error", "double"],
    "indent": "off",
	"no-tabs": "off",
	"eol-last": "off",
	"no-trailing-spaces": "off",
  },
  parser: "babel-eslint",
};
