const contentUrl = "content.json";

const fallbackContent = {
  name: "Eric Riera",
  avatar: "img/fotoperfil.jpg",
  avatarAlt: "Foto de Eric Riera",
  footer: "Made with 💻 and ❤️ by Eric",
  links: [],
};

function createLinkButton(link) {
  const wrapper = document.createElement("div");
  const anchor = document.createElement("a");
  const icon = document.createElement("i");
  const label = document.createElement("span");

  wrapper.className = "button";
  anchor.className = "buttonTop";
  anchor.href = link.url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";

  icon.className = link.icon || "fa-solid fa-link";
  icon.setAttribute("aria-hidden", "true");
  label.textContent = link.label;

  anchor.append(icon, label);
  wrapper.append(anchor);

  return wrapper;
}

function renderContent(content) {
  const profileName = document.querySelector("#profile-name");
  const profileImage = document.querySelector("#profile-image");
  const linksContainer = document.querySelector("#links");
  const footerText = document.querySelector("#footer-text");
  const year = new Date().getFullYear();

  document.title = content.name;
  profileName.textContent = content.name;
  profileImage.src = content.avatar;
  profileImage.alt = content.avatarAlt || `Foto de ${content.name}`;
  footerText.textContent = `© Copyright ${year} | ${content.footer}`;

  linksContainer.replaceChildren(...content.links.map(createLinkButton));
}

async function loadContent() {
  try {
    const response = await fetch(contentUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${contentUrl}`);
    }

    const content = await response.json();
    renderContent(content);
  } catch (error) {
    console.error(error);
    renderContent(fallbackContent);
  }
}

loadContent();
