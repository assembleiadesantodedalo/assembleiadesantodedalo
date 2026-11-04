document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("site-header");

  if (!container) return;

  try {
    const response = await fetch("components/header.html");

    if (!response.ok) {
      throw new Error("Não foi possível carregar o header.");
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
});