;(function () {
  const placeholder = document.getElementById("nav-placeholder");
  if (!placeholder) return;

  const currentPage =
    typeof CURRENT_PAGE !== "undefined" && CURRENT_PAGE
      ? CURRENT_PAGE
      : (window.location.pathname.split("/").pop() || "").split("?")[0].split("#")[0] ||
        "visualization.html";

  if (!document.getElementById("global-nav-style")) {
    const style = document.createElement("style");
    style.id = "global-nav-style";
    style.textContent = `
      .global-nav {
        background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
        color: #ffffff;
        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.35);
      }

      .global-nav-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }

      .global-nav-brand {
        font-weight: 600;
        font-size: 1rem;
        color: #ffffff;
        text-decoration: none;
        white-space: nowrap;
      }

      .global-nav-links {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        flex: 1;
      }

      .global-nav-link {
        text-decoration: none;
        color: #e5e7eb;
        padding: 6px 12px;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 500;
        border: 1px solid transparent;
        background: transparent;
        transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      }

      .global-nav-link:hover {
        background: rgba(255, 255, 255, 0.14);
        color: #ffffff;
      }

      .global-nav-link.active {
        background: #ffffff;
        color: #1e3a5f;
        border-color: rgba(15, 23, 42, 0.16);
      }

      @media (max-width: 640px) {
        .global-nav-inner {
          padding: 8px 12px;
        }

        .global-nav-links {
          justify-content: flex-start;
        }

        .global-nav-brand {
          font-size: 0.95rem;
        }

        .global-nav-link {
          font-size: 0.8rem;
          padding: 5px 10px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const navHtml = `
    <nav class="global-nav">
      <div class="global-nav-inner">
        <a href="visualization.html" class="global-nav-brand nav-link">Discovery Process</a>
        <div class="global-nav-links">
          <a href="visualization.html" class="global-nav-link nav-link" data-page="visualization.html">Процесс Discovery</a>
          <a href="hypothesis-digest.html" class="global-nav-link nav-link" data-page="hypothesis-digest.html">Дайджест гипотез</a>
          <a href="executive-dashboard.html" class="global-nav-link nav-link" data-page="executive-dashboard.html">Дайджест процесса Discovery</a>
          <a href="framework-selection.html" class="global-nav-link nav-link" data-page="framework-selection.html">Выбор фреймворка</a>
        </div>
      </div>
    </nav>
  `;

  placeholder.innerHTML = navHtml;

  const normalizedCurrent = currentPage.split("?")[0].split("#")[0];

  placeholder.querySelectorAll(".global-nav-link").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const file = href.split("?")[0].split("#")[0];
    if (file === normalizedCurrent) {
      link.classList.add("active");
    }
  });
})();

