/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Merriweather", "serif"], // untuk judul
        body: ["Inter", "sans-serif"], // untuk isi / soal
        button: ["Roboto", "sans-serif"], // untuk tombol
        accent: ["Plus Jakarta Sans", "sans-serif"], // untuk highlight
        alt: ["Source Sans Pro", "sans-serif"], // untuk elemen lain
      },
    },
  },
  plugins: [],
};
