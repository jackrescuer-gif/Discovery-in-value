;(function () {
  const placeholder = document.getElementById("nav-placeholder");
  if (!placeholder) return;

  const currentPage =
    typeof CURRENT_PAGE !== "undefined" && CURRENT_PAGE
      ? CURRENT_PAGE
      : (window.location.pathname.split("/").pop() || "").split("?")[0].split("#")[0] ||
        "visualization.html";

  // Load external CSS instead of inlining
  if (!document.getElementById("global-nav-style")) {
    const link = document.createElement("link");
    link.id = "global-nav-style";
    link.rel = "stylesheet";
    link.href = "css/nav.css";
    document.head.appendChild(link);
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
          <a href="filtration.html" class="global-nav-link nav-link" data-page="filtration.html">Фильтрация</a>
          <a href="delivery.html" class="global-nav-link nav-link" data-page="delivery.html">Delivery</a>
          <a href="holst-process-diagram.html" class="global-nav-link nav-link" data-page="holst-process-diagram.html">Holst диаграмма</a>
          <a href="cross-process.html" class="global-nav-link nav-link" data-page="cross-process.html">Кросс-процесс</a>
        </div>
      </div>
    </nav>
  `;

  placeholder.innerHTML = navHtml;

  // Set active link
  const links = placeholder.querySelectorAll('.nav-link');
  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const page = link.getAttribute('data-page') || href;
    if (currentPage === page || (currentPage === '' && href === 'visualization.html')) {
      link.classList.add('active');
    }
  });

  // Handle body padding compensation on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
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
