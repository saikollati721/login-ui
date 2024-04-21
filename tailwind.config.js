/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "node_modules/flowbite-react/lib/esm/**/*.js"
    // Add other paths as needed
  ],
  plugins: [
    // Add your plugins as needed
    require("flowbite/plugin")
  ],
  // Add other Tailwind CSS configurations as needed
};
