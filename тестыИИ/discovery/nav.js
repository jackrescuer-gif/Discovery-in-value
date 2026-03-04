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
      /* =============================================
         GLOBAL NAV — fully isolated styles
         ============================================= */

      #nav-placeholder {
        display: block;
        margin: 0;
        padding: 0;
      }

      .global-nav,
      .global-nav *,
      .global-nav *::before,
      .global-nav *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif !important;
        line-height: 1.4;
        letter-spacing: normal;
        text-transform: none;
      }

      .global-nav {
        background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
        color: #ffffff;
        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.35);
        width: 100%;
        position: relative;
        z-index: 1050;
        margin: 0;
        border: none;
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
        font-weight: 600 !important;
        font-size: 1rem !important;
        color: #ffffff !important;
        text-decoration: none !important;
        white-space: nowrap;
        border: none !important;
        border-bottom: none !important;
        background: transparent !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      .global-nav-brand:hover,
      .global-nav-brand:focus,
      .global-nav-brand:visited {
        color: #ffffff !important;
        text-decoration: none !important;
        border: none !important;
      }

      .global-nav-links {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        flex: 1;
      }

      .global-nav-link {
        text-decoration: none !important;
        color: #e5e7eb !important;
        padding: 6px 12px !important;
        border-radius: 999px !important;
        font-size: 0.85rem !important;
        font-weight: 500 !important;
        border: 1px solid transparent !important;
        background: transparent !important;
        transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        display: inline-block;
        cursor: pointer;
        margin: 0 !important;
      }

      .global-nav-link:visited {
        color: #e5e7eb !important;
      }

      .global-nav-link:hover,
      .global-nav-link:focus {
        background: rgba(255, 255, 255, 0.14) !important;
        color: #ffffff !important;
        text-decoration: none !important;
        border: 1px solid transparent !important;
      }

      .global-nav-link.active,
      .global-nav-link.active:visited {
        background: #ffffff !important;
        color: #1e3a5f !important;
        border: 1px solid rgba(15, 23, 42, 0.16) !important;
      }

      .global-nav-link.active:hover,
      .global-nav-link.active:focus {
        background: #ffffff !important;
        color: #1e3a5f !important;
      }

      @media (max-width: 640px) {
        .global-nav-inner {
          padding: 8px 12px;
        }
        .global-nav-links {
          justify-content: flex-start;
        }
        .global-nav-brand {
          font-size: 0.95rem !important;
        }
        .global-nav-link {
          font-size: 0.8rem !important;
          padding: 5px 10px !important;
        }
      }

      /* =============================================
         UNIVERSAL PAGE HERO — auto-applied to all page headers
         ============================================= */

      /* Gap between nav and page headers */
      .page-hero,
      header.header {
        margin-top: 20px !important;
      }

      @media (max-width: 768px) {
        .page-hero,
        header.header {
          margin-top: 14px !important;
        }
      }

      /* Auto-apply unified style to common header patterns */
      .page-hero,
      .hero-section,
      header.header,
      section.hero-section {
        background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%) !important;
        color: #ffffff !important;
        padding: 32px !important;
        border-radius: 16px !important;
        box-shadow: 0 4px 20px rgba(30, 58, 95, 0.15) !important;
        margin-bottom: 20px !important;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif !important;
      }

      /* Universal h1 styling for page headers */
      .page-hero h1,
      .hero-section h1,
      header.header h1,
      section.hero-section h1 {
        font-family: Georgia, "Times New Roman", serif !important;
        font-size: 2rem !important;
        font-weight: 600 !important;
        color: #ffffff !important;
        margin-bottom: 12px !important;
        letter-spacing: -0.02em !important;
        max-width: 1000px !important;
        font-style: normal !important;
        line-height: 1.25 !important;
      }

      /* Universal subtitle/description styling */
      .page-hero .hero-subtitle,
      .page-hero p:not(.hero-pill):not(.hero-meta),
      .hero-section .hero-subtitle,
      .hero-section p:not(.hero-pill):not(.hero-meta),
      header.header p:not(.hero-pill):not(.hero-meta),
      section.hero-section p:not(.hero-pill):not(.hero-meta) {
        color: rgba(255, 255, 255, 0.92) !important;
        max-width: 1000px !important;
        margin-bottom: 8px !important;
        font-size: 1rem !important;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif !important;
        line-height: 1.5 !important;
        font-weight: 400 !important;
      }

      /* Unified pill/badge styling */
      .hero-pill,
      .audience-pill,
      .hero-meta {
        display: inline-flex !important;
        align-items: center !important;
        gap: 8px !important;
        background: rgba(255, 255, 255, 0.16) !important;
        border: 1px solid rgba(255, 255, 255, 0.25) !important;
        padding: 8px 16px !important;
        border-radius: 999px !important;
        font-size: 0.85rem !important;
        font-weight: 500 !important;
        color: #ffffff !important;
        margin-bottom: 16px !important;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif !important;
      }

      /* Auto-wrapper for headers outside containers */
      .page-hero-wrap,
      .auto-hero-wrap {
        max-width: 1200px !important;
        margin: 0 auto !important;
        padding: 20px 20px 0 !important;
      }

      @media (max-width: 768px) {
        .page-hero,
        .hero-section,
        header.header,
        section.hero-section {
          padding: 24px 20px !important;
          border-radius: 12px !important;
          margin-bottom: 16px !important;
        }

        .page-hero h1,
        .hero-section h1,
        header.header h1,
        section.hero-section h1 {
          font-size: 1.6rem !important;
        }

        .page-hero-wrap,
        .auto-hero-wrap {
          padding: 16px 16px 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* Compensate for body padding */
  const bodyStyles = window.getComputedStyle(document.body);
  const bodyPaddingTop = parseFloat(bodyStyles.paddingTop) || 0;
  const bodyPaddingLeft = parseFloat(bodyStyles.paddingLeft) || 0;
  const bodyPaddingRight = parseFloat(bodyStyles.paddingRight) || 0;
  const needsCompensation = bodyPaddingTop > 0 || bodyPaddingLeft > 0 || bodyPaddingRight > 0;

  const navStyle = needsCompensation
    ? ` style="margin-top:-${bodyPaddingTop}px;margin-left:-${bodyPaddingLeft}px;margin-right:-${bodyPaddingRight}px;padding-left:${bodyPaddingLeft}px;padding-right:${bodyPaddingRight}px;"`
    : '';

  const navHtml = `
    <nav class="global-nav"${navStyle}>
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

  /* AUTO-WRAP HEADERS: automatically wrap page headers that aren't inside proper containers */
  function autoWrapHeaders() {
    const headerSelectors = [
      'header:not(.global-nav):not([class*="nav"]):not([class*="menu"])',
      'section.hero-section:not(.wrapped)',
      '.page-hero:not(.wrapped)'
    ];
    
    headerSelectors.forEach(selector => {
      const headers = document.querySelectorAll(selector);
      headers.forEach(header => {
        if (!header.closest('.page-hero-wrap, .auto-hero-wrap, .page, .container')) {
          // Header is not wrapped properly, let's wrap it
          const wrapper = document.createElement('div');
          wrapper.className = 'auto-hero-wrap';
          header.parentNode.insertBefore(wrapper, header);
          wrapper.appendChild(header);
          header.classList.add('wrapped');
        }
      });
    });
  }

  // Apply auto-wrapping after DOM loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoWrapHeaders);
  } else {
    autoWrapHeaders();
  }

  /* Re-compensate nav on resize */
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const nav = placeholder.querySelector(".global-nav");
      if (!nav) return;
      const bs = window.getComputedStyle(document.body);
      const pt = parseFloat(bs.paddingTop) || 0;
      const pl = parseFloat(bs.paddingLeft) || 0;
      const pr = parseFloat(bs.paddingRight) || 0;
      if (pt > 0 || pl > 0 || pr > 0) {
        nav.style.marginTop = `-${pt}px`;
        nav.style.marginLeft = `-${pl}px`;
        nav.style.marginRight = `-${pr}px`;
        nav.style.paddingLeft = `${pl}px`;
        nav.style.paddingRight = `${pr}px`;
      } else {
        nav.style.marginTop = "";
        nav.style.marginLeft = "";
        nav.style.marginRight = "";
        nav.style.paddingLeft = "";
        nav.style.paddingRight = "";
      }
    }, 100);
  });
})();
