module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "auth-background":
          "url('/src/assets/images/authentication/background.jpeg')",
      },
      colors: {
        "main-blue": "#004975",
        "secondary-blue": "#089CFF",
      },
    },
  },
  plugins: [],
};
