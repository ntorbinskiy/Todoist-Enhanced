const connectFonts = () => {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
  );

  document.head.appendChild(link);
};

export default connectFonts;
