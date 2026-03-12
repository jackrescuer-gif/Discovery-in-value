;(function () {
  const placeholder = document.getElementById("nav-placeholder");
  if (!placeholder) return;

  const currentPage =
    typeof CURRENT_PAGE !== "undefined" && CURRENT_PAGE
      ? CURRENT_PAGE
      : (window.location.pathname.split("/").pop() || "").split("?")[0].split("#")[0] ||
        "index.html";

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
        <a href="index.html" class="global-nav-brand nav-link">Discovery Process</a>
        <div class="global-nav-links">
          <a href="index.html" class="global-nav-link nav-link" data-page="index.html">Поток создания ценности</a>
          <a href="value-stream.html" class="global-nav-link nav-link" data-page="value-stream.html">Этапы процесса</a>
          <a href="framework-selection.html" class="global-nav-link nav-link" data-page="framework-selection.html">Выбор фреймворка реализации</a>
          <a href="delivery.html" class="global-nav-link nav-link" data-page="delivery.html">Деливери</a>
          <div class="nav-dropdown">
            <button type="button" class="global-nav-link nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">Ещё</button>
            <ul class="nav-dropdown-menu" role="menu">
              <li><a href="executive-dashboard.html" class="nav-dropdown-link" data-page="executive-dashboard.html" role="menuitem">Аналитика процесса</a></li>
              <li><a href="value-stream-canvas.html" class="nav-dropdown-link" data-page="value-stream-canvas.html" role="menuitem">Холст Value Stream</a></li>
              <li><a href="value-stream-diagram.html" class="nav-dropdown-link" data-page="value-stream-diagram.html" role="menuitem">Диаграмма процесса</a></li>
              <li><a href="holst-process-diagram.html" class="nav-dropdown-link" data-page="holst-process-diagram.html" role="menuitem">Holst диаграмма</a></li>
              <li><a href="cross-process.html" class="nav-dropdown-link" data-page="cross-process.html" role="menuitem">Кросс-процесс</a></li>
              <li><a href="process-board.html" class="nav-dropdown-link" data-page="process-board.html" role="menuitem">Схема процесса</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `;

  placeholder.innerHTML = navHtml;

  // Set active link
  const links = placeholder.querySelectorAll('.nav-link:not(.nav-dropdown-trigger)');
  const dropdownLinks = placeholder.querySelectorAll('.nav-dropdown-link');
  const dropdownPages = ['executive-dashboard.html', 'value-stream-canvas.html', 'value-stream-diagram.html', 'holst-process-diagram.html', 'cross-process.html', 'process-board.html'];
  const isDropdownPage = dropdownPages.includes(currentPage);

  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const page = link.getAttribute('data-page') || href;
    if (currentPage === page || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  dropdownLinks.forEach((link) => {
    const page = link.getAttribute('data-page') || '';
    if (currentPage === page) link.classList.add('active');
  });

  if (isDropdownPage) {
    const trigger = placeholder.querySelector('.nav-dropdown-trigger');
    if (trigger) trigger.classList.add('active');
  }

  // Dropdown: toggle on click, close on outside click
  const dropdown = placeholder.querySelector('.nav-dropdown');
  if (dropdown) {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const open = menu.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        menu.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

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
