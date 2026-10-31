// @ts-nocheck
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n);
  new MutationObserver((n) => {
    for (const s of n)
      if (s.type === "childList")
        for (const l of s.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && a(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(n) {
    const s = {};
    return (
      n.integrity && (s.integrity = n.integrity),
      n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function a(n) {
    if (n.ep) return;
    n.ep = !0;
    const s = i(n);
    fetch(n.href, s);
  }
})();
const ue = "cwv-theme";
function oe() {
  const e = localStorage.getItem(ue);
  return (
    e ||
    (window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark")
  );
}
function ve(e) {
  (document.documentElement.setAttribute("data-theme", e),
    localStorage.setItem(ue, e));
}
function we() {
  const e =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "dark"
      : "light";
  return (ve(e), e);
}
ve(oe());
const he = "cwv-liked",
  O = new Set(
    (() => {
      try {
        return JSON.parse(localStorage.getItem(he) ?? "[]");
      } catch {
        return [];
      }
    })(),
  );
function xe(e) {
  O.has(e) ? O.delete(e) : O.add(e);
  try {
    localStorage.setItem(he, JSON.stringify([...O]));
  } catch {}
  return O.has(e);
}
function ke(e) {
  const t = (e.platform || "eduteria").toLowerCase();
  switch (e.view) {
    case "home":
      return "/";
    case "courses":
      return `/${t}`;
    case "subjects":
      return `/${t}/${e.courseId}`;
    case "topics":
      return `/${t}/${e.courseId}/${e.subjectId}`;
    case "lectures":
      return `/${t}/${e.courseId}/${e.subjectId}/${e.topicId}`;
    default:
      return "/";
  }
}
function ge(e) {
  const t = e.split("?")[0].replace(/^\/+|\/+$/g, "");
  if (!t || t === "eduteria") return { view: "courses", platform: "eduteria" };
  const i = t.split("/"),
    a = i[0] || "eduteria";
  if (i.length === 1) return { view: "courses", platform: a };
  const n = Number(i[1]);
  if (i.length === 2 && !isNaN(n))
    return { view: "subjects", platform: a, courseId: n };
  const s = Number(i[2]);
  if (i.length === 3 && !isNaN(n) && !isNaN(s))
    return { view: "topics", platform: a, courseId: n, subjectId: s };
  const l = Number(i[3]);
  return !isNaN(n) && !isNaN(s) && !isNaN(l)
    ? { view: "lectures", platform: a, courseId: n, subjectId: s, topicId: l }
    : { view: "courses", platform: "eduteria" };
}
let ie = ge(window.location.pathname);
const re = new Set();
function Ce(e) {
  re.add(e);
}
function T(e, t = !1) {
  ie = e;
  const i = ke(e);
  (t
    ? window.history.replaceState(e, "", i)
    : window.history.pushState(e, "", i),
    re.forEach((a) => a(e)));
}
window.addEventListener("popstate", (e) => {
  const t = e.state || ge(window.location.pathname);
  ((ie = t), re.forEach((i) => i(t)));
});
function C(e, t = "", i = "") {
  const a = document.createElement(e);
  return (t && (a.className = t), i && (a.innerHTML = i), a);
}
function m(e) {
  return e == null
    ? ""
    : String(e)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
function Se(e) {
  if (!e) return "";
  const t = Math.floor(e / 3600),
    i = Math.floor((e % 3600) / 60),
    a = e % 60;
  return t > 0
    ? `${t}:${String(i).padStart(2, "0")}:${String(a).padStart(2, "0")}`
    : `${i}:${String(a).padStart(2, "0")}`;
}
const se = (e = 28) =>
    `<svg class="spin" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-dasharray="50" stroke-dashoffset="15" stroke-linecap="round"/></svg>`,
  fe = () =>
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
function ae(e = 8) {
  return Array.from({ length: e })
    .map(
      () => `
      <div class="skel-card">
        <div class="skel-thumb"></div>
        <div class="skel-body">
          <div class="skel-line full"></div>
          <div class="skel-line short"></div>
        </div>
      </div>
    `,
    )
    .join("");
}
function J(e = 6) {
  return Array.from({ length: e })
    .map(
      () => `
      <div class="skel-row">
        <div class="skel-icon"></div>
        <div class="skel-text">
          <div class="skel-line med"></div>
          <div class="skel-line short"></div>
        </div>
      </div>
    `,
    )
    .join("");
}
function Le(e = 6) {
  return Array.from({ length: e })
    .map(
      () => `
      <div class="skel-lec">
        <div class="skel-lec-thumb"></div>
        <div class="skel-text">
          <div class="skel-line full"></div>
          <div class="skel-line short"></div>
        </div>
        <div class="skel-btn"></div>
      </div>
    `,
    )
    .join("");
}
let B = { enabled: !1, isVerified: !0, expiresAt: null, remainingMs: 0 },
  W = null,
  H = null,
  z = null,
  le = !1;
function Ee(e) {
  ((W = e),
    le ||
      ((le = !0), window.addEventListener("verification-required", () => G())),
    ne(),
    $e());
}
async function $e() {
  try {
    const e = await fetch("/api/verify/status", {
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    });
    if (e.ok) {
      B = await e.json();
    } else {
      B = { enabled: false, isVerified: true, expiresAt: null, remainingMs: 0 };
    }
    ne();
    z && clearInterval(z);
    z = null;
    if (B && B.enabled && B.isVerified && B.expiresAt) {
      z = setInterval(() => {
        const t = Math.max(0, B.expiresAt - Date.now());
        ((B = { ...B, remainingMs: t, isVerified: t > 0 }),
          ne(),
          t === 0 && (z && clearInterval(z), (z = null), G(!0)));
      }, 1e3);
    } else if (B && B.enabled && !B.isVerified) {
      G();
    }
  } catch (e) {
    B = { enabled: false, isVerified: true, expiresAt: null, remainingMs: 0 };
    ne();
  }
}
function ne() {
  if (!W || (W.replaceChildren(), (W.hidden = !B.enabled), !B.enabled)) return;
  if (B.isVerified) {
    const t = document.createElement("div");
    t.className = "verification-timer-group";
    const i = document.createElement("span");
    ((i.className = "verification-badge active"),
      (i.textContent = `Access ${Ae(B.remainingMs)}`),
      (i.title = B.expiresAt
        ? `Verification expires at ${new Date(B.expiresAt).toLocaleTimeString()}`
        : "Verification active"));
    const a = document.createElement("button");
    ((a.type = "button"),
      (a.className = "verification-extend"),
      a.setAttribute("aria-label", "Add 72 hours to verification"),
      (a.title = "Add 72 hours"),
      (a.textContent = "+"),
      a.addEventListener("click", () => G(!1, !0)),
      t.append(i, a),
      W.appendChild(t));
    return;
  }
  const e = document.createElement("button");
  ((e.type = "button"),
    (e.className = "verification-badge required"),
    (e.textContent = "Verify access"),
    e.addEventListener("click", () => G()),
    W.appendChild(e));
}
function Ae(e) {
  const t = Math.max(0, Math.floor(e / 1e3)),
    i = Math.floor(t / 3600),
    a = Math.floor((t % 3600) / 60),
    n = t % 60;
  return `${String(i).padStart(2, "0")}:${String(a).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function G(e = !1, t = !1) {
  H ||
    ((H = document.createElement("div")),
    (H.className = "verification-overlay"),
    (H.innerHTML = `
      <section class="verification-dialog" role="dialog" aria-modal="true" aria-labelledby="verification-title">
        <button type="button" class="verification-close" aria-label="Close verification dialog">&times;</button>
        <div class="verification-icon" aria-hidden="true">🔐</div>
        <h2 id="verification-title">Verify access</h2>
        <p class="verification-description"></p>
        <ol>
          <li class="verification-step-first"></li>
          <li class="verification-step-second"></li>
        </ol>
        <p class="verification-error" role="alert" hidden></p>
        <button type="button" class="verification-start">Verify with VPLink</button>
      </section>
    `),
    document.body.appendChild(H),
    H.querySelector(".verification-close").addEventListener("click", () => {
      H == null || H.classList.remove("visible");
    }),
    H.querySelector(".verification-start").addEventListener("click", Me));
  const i = H.querySelector(".verification-description"),
    a = H.querySelector("#verification-title");
  ((a.textContent = t ? "Add 72 hours" : "Verify access"),
    (i.textContent = t
      ? "Complete VPLink verification to add 72 hours to your current access."
      : e
        ? "Your 72-hour verification has expired. Verify again to continue."
        : "Complete the short-link step to receive 72 hours of access for this browser."),
    (H.querySelector(".verification-step-first").textContent =
      "Continue through the VPLink short link."),
    (H.querySelector(".verification-step-second").textContent = t
      ? "Return here in this browser; 72 hours will be added to your current expiry."
      : "Return here in this browser to activate 72-hour access."));
  const n = H.querySelector(".verification-start");
  ((n.textContent = t ? "Verify to add 72 hours" : "Verify with VPLink"),
    H.classList.add("visible"));
}
async function Me() {
  if (!H) return;
  const e = H.querySelector(".verification-start"),
    t = H.querySelector(".verification-error");
  ((e.disabled = !0), (e.textContent = "Creating VPLink..."), (t.hidden = !0));
  try {
    const i = await fetch("/api/verify/start", {
        method: "POST",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      }),
      a = await i.json();
    if (!i.ok || typeof a.shortUrl != "string")
      throw new Error(
        a.error || `Verification request returned HTTP ${i.status}`,
      );
    window.location.assign(a.shortUrl);
  } catch (i) {
    (console.error("Failed to start VPLink verification:", i),
      (t.textContent =
        i instanceof Error ? i.message : "Unable to start verification."),
      (t.hidden = !1),
      (e.disabled = !1),
      (e.textContent = "Try again"));
  }
}
const Te =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  je =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  He =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
function K(e, t) {
  const i = document.createElement("header");
  i.className = "app-header";
  const a = document.createElement("div");
  if (
    ((a.className = "brand"),
    (a.style.cursor = "pointer"),
    (a.innerHTML = `
    <img src="https://i.ibb.co/Q3g9fGSt/1791541921524.png" alt="GB STUDY" class="brand-logo" onerror="this.src='/logo.png'" />
    <span class="brand-name">GB <span class="brand-accent">STUDY</span></span>
  `),
    a.addEventListener("click", () => T({ view: "courses", platform: "eduteria" })),
    i.appendChild(a),
    t && t.length > 0)
  ) {
    const f = document.createElement("nav");
    ((f.className = "header-breadcrumbs"),
      f.setAttribute("aria-label", "Breadcrumb"),
      t.forEach((v) => {
        const S = document.createElement("span");
        ((S.className = "bc-sep"), (S.textContent = "/"), f.appendChild(S));
        const g = document.createElement("a");
        ((g.className = `bc-item${v.active ? " active" : ""}`),
          (g.textContent = v.label),
          v.onClick &&
            !v.active &&
            g.addEventListener("click", (x) => {
              (x.preventDefault(), v.onClick());
            }),
          f.appendChild(g));
      }),
      i.appendChild(f));
  }
  const n = document.createElement("div");
  ((n.style.flex = "1"), i.appendChild(n));
  const s = document.createElement("div");
  ((s.className = "verification-widget"), i.appendChild(s), Ee(s));
  const l = document.createElement("button");
  ((l.className = "btn-theme"), (l.title = "Toggle light / dark mode"));
  const d = () => {
    ((l.innerHTML = oe() === "dark" ? je : Te),
      l.setAttribute(
        "aria-label",
        oe() === "dark" ? "Switch to light mode" : "Switch to dark mode",
      ));
  };
  return (
    d(),
    l.addEventListener("click", () => {
      (we(), d());
    }),
    i.appendChild(l),
    i
  );
}
async function Pe() {
  const e = C("div", "page page-home");
  e.appendChild(K());
  const t = C("div");
  return (
    (t.innerHTML = `
    <div class="home-hero">
      <div class="hero-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        All-in-One Learning Hub
      </div>
      <h1>Learn Without Limits</h1>
      <p>Select a platform to stream online batches, explore recorded lectures &amp; unlocked course materials</p>
    </div>
    <div class="platform-list">
      <div class="platform-card available" id="card-eduteria">
        <div class="platform-icon platform-icon-img">
          <img src="https://decicqog4ulhy.cloudfront.net/0/admin_v1/application_management/clientlogo/5049068166_Eduteria-logo.png" alt="Eduteria" loading="lazy"/>
        </div>
        <div class="platform-info">
          <div class="platform-name">Eduteria <span class="platform-tag">450+ Batches</span></div>
          <div class="platform-desc">BPSC, UPSC &amp; State PCS Online Batches</div>
        </div>
        <div class="platform-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
      <div class="platform-card available" id="card-nexttoppers">
        <div class="platform-icon platform-icon-img">
          <img src="https://decicqog4ulhy.cloudfront.net/0/admin_v2/uploads/courses/thumbnail/2345517_1_nexttoppers_header_logo.jpg" alt="Next Toppers" loading="lazy"/>
        </div>
        <div class="platform-info">
          <div class="platform-name">Next Toppers <span class="platform-tag">Olympiads</span></div>
          <div class="platform-desc">IOQM, Olympiads, CBSE &amp; Crash Courses</div>
        </div>
        <div class="platform-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
      <div class="platform-card available" id="card-futurekul">
        <div class="platform-icon platform-icon-img">
          <img src="https://www.futurekul.com/next_images/logo.png" alt="Futurekul" loading="lazy"/>
        </div>
        <div class="platform-info">
          <div class="platform-name">Futurekul <span class="platform-tag">Exam Prep</span></div>
          <div class="platform-desc">Live and recorded exam preparation courses</div>
        </div>
        <div class="platform-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
      <div class="platform-card disabled">
        <div class="platform-icon" style="background:rgba(255,255,255,.05);color:var(--mu)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </div>
        <div class="platform-info">
          <div class="platform-name">More Platforms</div>
          <div class="platform-desc">Stay tuned for new platform additions</div>
        </div>
        <div class="platform-arrow"><span class="pill-soon">Soon</span></div>
      </div>
    </div>
  `),
    e.appendChild(t),
    e
      .querySelector("#card-eduteria")
      .addEventListener("click", () =>
        T({ view: "courses", platform: "eduteria" }),
      ),
    e
      .querySelector("#card-nexttoppers")
      .addEventListener("click", () =>
        T({ view: "courses", platform: "next-toppers" }),
      ),
    e
      .querySelector("#card-futurekul")
      .addEventListener("click", () =>
        T({ view: "courses", platform: "futurekul" }),
      ),
    e
  );
}
const qe = "/api",
  Be = !0;
async function D(e, t) {
  var s;
  const i = (t || ie.platform || "eduteria").toLowerCase(),
    a = new AbortController(),
    n = setTimeout(() => a.abort(), 10000);
  const outgoingHeaders = {
    "x-platform": i,
    platform: i,
    "x-api-platform": i,
    "x-real-api": Be ? "true" : "false",
  };
  try {
    let l = await fetch(qe + e, {
      signal: a.signal,
      headers: outgoingHeaders,
    }).catch(() => null);

    // Fallback directly to target API if local proxy failed
    if (!l || (!l.ok && (l.status === 404 || l.status >= 500 || l.status === 400))) {
      try {
        const fallbackRes = await fetch("https://all.codewithvivek.qzz.io" + qe + e, {
          signal: a.signal,
          headers: outgoingHeaders,
        });
        if (fallbackRes.ok) {
          l = fallbackRes;
        }
      } catch {}
    }

    if (!l || !l.ok) {
      throw (
        l && l.status === 403 &&
          (s = l.headers.get("content-type")) != null &&
          s.includes("application/json") &&
          (await l.clone().json()).code === "VERIFICATION_REQUIRED" &&
          window.dispatchEvent(new Event("verification-required")),
        new Error(`HTTP ${l ? l.status : "Request failed"}`)
      );
    }
    const d = await l.json();
    if (d.success === !1) throw new Error(d.error || "API error");
    return (
      Array.isArray(d.data) &&
        d.courseTitle &&
        (d.data.courseTitle = d.courseTitle),
      d.data ?? d
    );
  } finally {
    clearTimeout(n);
  }
}
async function ye(e) {
  const t = await D("/courses", e);
  return Array.isArray(t) ? t : [];
}
async function Ue(e, t) {
  try {
    return await D(`/course/details?courseId=${e}`, t);
  } catch {
    return null;
  }
}
async function Q(e, t, i, a) {
  let n = `/course/subjects?courseId=${e}`;
  (i && (n += `&tileId=${encodeURIComponent(i)}`),
    a && (n += `&type=${encodeURIComponent(a)}`));
  const s = await D(n, t);
  return Array.isArray(s) ? s : [];
}
async function me(e, t, i, a, n) {
  let s = `/course/topics?courseId=${e}&subjectId=${t}`;
  (a && (s += `&tileId=${encodeURIComponent(a)}`),
    n && (s += `&type=${encodeURIComponent(n)}`));
  const l = await D(s, i);
  return Array.isArray(l) ? l : [];
}
async function Re(e, t, i, a, n, s) {
  let l = `/course/lectures?courseId=${e}&topicId=${t}`;
  (i != null && (l += `&subjectId=${i}`),
    n && (l += `&tileId=${encodeURIComponent(n)}`),
    s && (l += `&type=${encodeURIComponent(s)}`));
  const d = await D(l, a);
  return Array.isArray(d) ? d : [];
}
async function Ne(e, t) {
  return D(`/video/stream?vdcId=${encodeURIComponent(e)}`, t);
}
async function Ve(e, t) {
  return D(
    `/video/stream?courseId=${encodeURIComponent(e)}&videoId=${encodeURIComponent(t)}`,
    "vidyagram",
  );
}
const Oe = [
    {
      id: 9001,
      name: "PARMAR'S COMPLETE COMBO TOPPERS BATCH",
      category: "COMBO",
      validity: "24 Months",
      finalPrice: 2199,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-09-05-0.679714023497747.jpg",
    },
    {
      id: 9002,
      name: "UPSSSC GK DIGITAL NOTES",
      category: "STATE EXAMS",
      validity: "12 Months",
      finalPrice: 99,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-09-11-0.6380789833119838.jpg",
    },
    {
      id: 9003,
      name: "PARMAR'S GK 5.0 TOPPERS BATCH",
      category: "SSC",
      validity: "12 Months",
      finalPrice: 1299,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-09-06-0.7484256320833926.jpg",
    },
    {
      id: 9004,
      name: "PARMAR'S MATHS TOPPERS BATCH",
      category: "SSC",
      validity: "24 Months",
      finalPrice: 999,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-09-05-0.7338438769888199.jpg",
    },
    {
      id: 9005,
      name: "PARMAR'S REASONING TOPPERS BATCH",
      category: "SSC",
      validity: "12 Months",
      finalPrice: 699,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-09-05-0.3474174751283987.jpg",
    },
    {
      id: 9006,
      name: "PARMAR'S ENGLISH TOPPERS BATCH",
      category: "SSC",
      validity: "12 Months",
      finalPrice: 699,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-09-05-0.4412125057752688.jpg",
    },
    {
      id: 9007,
      name: "PARMAR'S MATHS + REASONING COMBO TOPPERS BATCH",
      category: "COMBO",
      validity: "24 Months",
      finalPrice: 1599,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-09-05-0.35175366650733675.jpg",
    },
    {
      id: 9008,
      name: "PARMAR'S MATHS + GK/GS COMBO TOPPERS BATCH",
      category: "COMBO",
      validity: "24 Months",
      finalPrice: 1899,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-09-05-0.5434778853862384.jpg",
    },
    {
      id: 9009,
      name: "PARMAR RAILWAY COMPLETE COMBO BATCH",
      category: "RAILWAY",
      validity: "12 Months",
      finalPrice: 1499,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-08-22-0.5795875231109067.jpg",
    },
    {
      id: 9010,
      name: "PARMAR RAILWAY GENERAL SCIENCE BATCH",
      category: "RAILWAY",
      validity: "12 Months",
      finalPrice: 599,
      imageUrl:
        "https://appx-content-v2.classx.co.in/paid_course3/2026-08-20-0.4077871953841511.jpg",
    },
  ],
  ce = () =>
    '<svg width="17" height="17" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  de = () =>
    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
function Ie(e, t) {
  const i = O.has(e.id),
    a = t === "parmar",
    n = C("div", "course-card"),
    gbLogo = "https://i.ibb.co/Q3g9fGSt/1791541921524.png",
    hasImg = !!(e.imageUrl && e.imageUrl.trim());
  return (
    (n.innerHTML = `
    <div class="c-thumb">
      ${
        hasImg
          ? `<img src="${m(e.imageUrl)}" alt="${m(e.name)}" loading="lazy" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
             <div class="c-thumb-placeholder gb-thumb-placeholder" style="display:none;">
               <div class="gb-card-logo-wrap">
                 <img src="${gbLogo}" alt="GB STUDY" class="gb-card-placeholder-logo" />
               </div>
               <span class="gb-card-placeholder-title">GB STUDY</span>
             </div>`
          : `<div class="c-thumb-placeholder gb-thumb-placeholder">
               <div class="gb-card-logo-wrap">
                 <img src="${gbLogo}" alt="GB STUDY" class="gb-card-placeholder-logo" />
               </div>
               <span class="gb-card-placeholder-title">GB STUDY</span>
             </div>`
      }
      <button class="like-btn${i ? " liked" : ""}" data-id="${e.id}" title="${i ? "Unlike" : "Like"}">${i ? ce() : de()}</button>
    </div>
    <div class="c-body">
      ${a ? `<div class="parmar-card-meta"><span>${m(e.category || "COURSE")}</span><span>${m(e.validity || "12 Months")}</span></div>` : ""}
      <div class="c-name">${m(e.name)}</div>
      ${
        e.finalPrice || e.price
          ? `<div class="c-price-row">
              <span class="c-price">₹${e.finalPrice ?? e.price}</span>
              ${e.finalPrice && e.price && e.finalPrice < e.price ? `<span class="c-mrp">₹${e.price}</span>` : ""}
            </div>`
          : ""
      }
      ${a ? '<div class="parmar-view-link">Explore batch <span aria-hidden="true">→</span></div>' : ""}
    </div>
  `),
    n.querySelector(".like-btn").addEventListener("click", (s) => {
      s.stopPropagation();
      const l = xe(e.id),
        d = n.querySelector(".like-btn");
      ((d.innerHTML = l ? ce() : de()),
        l ? d.classList.add("liked") : d.classList.remove("liked"));
    }),
    n.addEventListener("click", () =>
      T({ view: "subjects", platform: t, courseId: e.id, courseName: e.name }),
    ),
    n
  );
}
async function ze(e = "eduteria") {
  var $;
  const t = C("div", "page"),
    i =
      e === "next-toppers"
        ? "Next Toppers"
        : e === "vidyagram"
          ? "Vidyagram"
          : e.charAt(0).toUpperCase() + e.slice(1);
  t.appendChild(K(() => T({ view: "home" }), [{ label: i, active: !0 }]));
  const a = e === "vidyagram",
    n = e === "parmar",
    s = C("div");
  if (
    ((s.innerHTML = `
    <div class="page-title-bar" style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap;">
      <div>
        <h1>${n ? "Parmar Academy Courses" : `${m(i)} Courses`}</h1>
        <div class="breadcrumb">${a ? "IIT-JEE, NEET &amp; Board Exam Batches" : n ? "SSC, Railway, State Exams &amp; Combo Batches" : "Explore and stream video lectures"}</div>
      </div>
      ${
        a
          ? `
        <div id="vg-auth-ctrl">
          <button id="vg-auth-trigger">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span id="vg-trigger-label">Login</span>
          </button>
        </div>
      `
          : ""
      }
    </div>
    ${n ? '<div class="course-tabs" id="course-tabs"><button class="course-tab active" data-category="ALL">All Courses</button><button class="course-tab" data-category="SSC">SSC</button><button class="course-tab" data-category="RAILWAY">Railway</button><button class="course-tab" data-category="STATE EXAMS">State Exams</button><button class="course-tab" data-category="COMBO">Combo</button></div>' : ""}
    <div class="search-wrap">
      <div class="search-box-inner">
        <svg class="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input class="search-input" id="search" type="search" placeholder="Search ${m(i)} courses..." />
      </div>
    </div>
    <div class="courses-grid" id="grid">
      ${ae(8)}
    </div>
    ${
      a
        ? `
      <div id="vg-modal-backdrop" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.75); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); z-index:10000; isolation:isolate; align-items:center; justify-content:center; padding:16px;">
        <div id="vg-modal-card" style="background:var(--sf); color:var(--tx); border:1px solid var(--bd2); border-radius:18px; width:100%; max-width:390px; box-shadow:0 24px 64px rgba(0,0,0,.7); padding:24px; position:relative; z-index:1; display:flex; flex-direction:column; gap:16px; pointer-events:auto;" onclick="event.stopPropagation()">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:700; font-size:15px; color:var(--tx); display:flex; align-items:center; gap:8px;">
              <img src="https://vidyagram.online/favicon.ico" style="width:20px;height:20px;border-radius:4px;background:#1a1a2e;padding:2px;" onerror="this.style.display='none'"/>
              Vidyagram Account
            </div>
            <button id="vg-modal-close" style="color:var(--mu); font-size:22px; line-height:1; cursor:pointer; padding:2px 6px; border:none; background:none;">&times;</button>
          </div>
          
          <div id="vg-loggedin-panel" style="display:none; flex-direction:column; gap:12px;">
            <div style="background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.25); border-radius:10px; padding:12px; font-size:13px; color:#22c55e;">
              <div style="font-weight:700; display:flex; align-items:center; gap:6px;">
                <span style="width:8px; height:8px; border-radius:50%; background:#22c55e; display:inline-block;"></span>
                <span id="vg-user-name">Logged In</span>
              </div>
              <div style="font-size:11px; opacity:0.8; margin-top:3px;" id="vg-user-id"></div>
            </div>
            <p style="font-size:12px; color:var(--mu); line-height:1.4;">You are signed in to Vidyagram. All unlocked batches and lectures are accessible.</p>
            <button id="vg-logout-action" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--bd2); background:transparent; color:var(--tx); font-weight:600; cursor:pointer; font-size:13px; transition:background .15s;">Log Out</button>
          </div>

          <div id="vg-login-panel" style="display:flex; flex-direction:column; gap:12px;">
            <p style="font-size:12px; color:var(--mu); line-height:1.4;">Sign in with your Vidyagram registered mobile number or User ID to unlock purchased courses.</p>
            <input id="vg-input-user" type="text" placeholder="Mobile / User ID" style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--bd2); background:var(--bg); color:var(--tx); font-size:13px; box-sizing:border-box; outline:none;" />
            <div style="position:relative; display:flex; align-items:center; width:100%;">
              <input id="vg-input-pass" type="password" placeholder="Password" style="width:100%; padding:10px 40px 10px 12px; border-radius:8px; border:1px solid var(--bd2); background:var(--bg); color:var(--tx); font-size:13px; box-sizing:border-box; outline:none;" />
              <button id="vg-toggle-pw" type="button" title="View / Hide Password" style="position:absolute; right:8px; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--mu); padding:4px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                <svg id="vg-eye-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            <div id="vg-login-feedback" style="font-size:12px; min-height:16px;"></div>
            <button id="vg-login-submit" style="width:100%; padding:10px; border-radius:8px; border:none; background:#f59e0b; color:#000; font-weight:700; cursor:pointer; font-size:13px; transition:opacity .15s;">Login</button>
          </div>
        </div>
      </div>
    `
        : ""
    }
  `),
    t.appendChild(s),
    a)
  ) {
    const r = s.querySelector("#vg-modal-backdrop");
    r &&
      (($ = document.getElementById("vg-modal-backdrop")) == null || $.remove(),
      document.body.appendChild(r));
  }
  const l = s.querySelector("#grid"),
    d = s.querySelector("#search");
  let f = [],
    v = "ALL";
  const S = (r) => {
      if (!r.length) {
        l.innerHTML =
          '<div class="empty" style="grid-column: 1/-1;"><div style="font-size:2rem;margin-bottom:8px;">🔍</div>No courses found</div>';
        return;
      }
      ((l.innerHTML = ""), r.forEach((o) => l.appendChild(Ie(o, e))));
    },
    g = () => {
      const r = d.value.toLowerCase().trim();
      S(
        f.filter(
          (o) =>
            (v === "ALL" || o.category === v) &&
            (!r || o.name.toLowerCase().includes(r)),
        ),
      );
    };
  (d.addEventListener("input", g),
    s.querySelectorAll(".course-tab").forEach((r) => {
      r.addEventListener("click", () => {
        ((v = r.dataset.category || "ALL"),
          s
            .querySelectorAll(".course-tab")
            .forEach((o) => o.classList.remove("active")),
          r.classList.add("active"),
          g());
      });
    }));
  const x = async () => {
    l.innerHTML = ae(8);
    try {
      ((f = n ? Oe : await ye(e)),
        f.sort((r, o) => (O.has(o.id) ? 1 : 0) - (O.has(r.id) ? 1 : 0)),
        S(f));
    } catch (r) {
      l.innerHTML = `<div class="error-box" style="grid-column: 1/-1;">Failed to load courses from ${m(e)}.<br/><small>${m(String(r))}</small></div>`;
    }
  };
  if ((await x(), a)) {
    const r = s.querySelector("#vg-auth-trigger"),
      o = s.querySelector("#vg-trigger-label"),
      u = document.getElementById("vg-modal-backdrop"),
      c = s.querySelector("#vg-modal-close"),
      b = s.querySelector("#vg-login-panel"),
      L = s.querySelector("#vg-loggedin-panel"),
      h = s.querySelector("#vg-user-name"),
      y = s.querySelector("#vg-user-id"),
      A = s.querySelector("#vg-login-submit"),
      j = s.querySelector("#vg-logout-action"),
      E = s.querySelector("#vg-login-feedback"),
      U = s.querySelector("#vg-input-user"),
      w = s.querySelector("#vg-input-pass"),
      M = async () => {
        try {
          const q = await (await fetch("/api/vidyagram/auth-status")).json();
          q.isLoggedIn
            ? (o && (o.textContent = q.userName || "Account"),
              r &&
                ((r.style.borderColor = "rgba(34,197,94,0.3)"),
                (r.style.color = "#22c55e"),
                (r.style.background = "rgba(34,197,94,0.12)")),
              b && (b.style.display = "none"),
              L && (L.style.display = "flex"),
              h && (h.textContent = q.userName || "Active Account"),
              y && (y.textContent = "ID: " + (q.userId || "—")))
            : (o && (o.textContent = "Login"),
              r &&
                ((r.style.borderColor = "rgba(245,158,11,0.3)"),
                (r.style.color = "#f59e0b"),
                (r.style.background = "rgba(245,158,11,0.12)")),
              b && (b.style.display = "flex"),
              L && (L.style.display = "none"));
        } catch {}
      };
    M();
    const R = () => {
        u && ((u.style.display = "flex"), E && (E.textContent = ""));
      },
      k = () => {
        u && (u.style.display = "none");
      };
    (r == null || r.addEventListener("click", R),
      c == null || c.addEventListener("click", k),
      u == null ||
        u.addEventListener("click", (p) => {
          p.target === u && k();
        }));
    const V = s.querySelector("#vg-toggle-pw"),
      N = s.querySelector("#vg-eye-icon");
    (V == null ||
      V.addEventListener("click", (p) => {
        (p.preventDefault(),
          p.stopPropagation(),
          w &&
            (w.type === "password"
              ? ((w.type = "text"),
                N &&
                  (N.innerHTML =
                    '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'))
              : ((w.type = "password"),
                N &&
                  (N.innerHTML =
                    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'))));
      }),
      A == null ||
        A.addEventListener("click", async () => {
          const p = (U == null ? void 0 : U.value.trim()) || "",
            q = (w == null ? void 0 : w.value) || "";
          if (!p || !q) {
            E &&
              ((E.textContent = "Please enter both mobile/ID and password."),
              (E.style.color = "#ef4444"));
            return;
          }
          (E &&
            ((E.textContent = "Authenticating..."),
            (E.style.color = "#f59e0b")),
            (A.disabled = !0),
            (A.textContent = "Signing in..."));
          try {
            const I = await (
              await fetch("/api/vidyagram/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile: p, password: q }),
              })
            ).text();
            let Y = {};
            try {
              Y = JSON.parse(I);
            } catch {
              Y = {
                success: !1,
                error: `Server error: ${I.substring(0, 120)}`,
              };
            }
            Y.success
              ? (E &&
                  ((E.textContent = "✓ " + (Y.message || "Login successful")),
                  (E.style.color = "#22c55e")),
                await M(),
                await x(),
                setTimeout(() => k(), 1e3))
              : E &&
                ((E.textContent = Y.error || "Login failed"),
                (E.style.color = "#ef4444"));
          } catch (P) {
            E &&
              ((E.textContent = String(P.message || P)),
              (E.style.color = "#ef4444"));
          } finally {
            ((A.disabled = !1), (A.textContent = "Login"));
          }
        }),
      j == null ||
        j.addEventListener("click", async () => {
          ((j.disabled = !0), (j.textContent = "Logging out..."));
          try {
            (await fetch("/api/vidyagram/logout", { method: "POST" }),
              await M(),
              await x(),
              k());
          } catch {
          } finally {
            ((j.disabled = !1), (j.textContent = "Log Out"));
          }
        }));
  }
  return t;
}
function _e(e) {
  switch (e) {
    case "overview":
      return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
    case "content":
      return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>';
    case "pdf":
      return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>';
    case "test":
      return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>';
    case "video":
    default:
      return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>';
  }
}
async function De(e, t, i = "eduteria", a, n) {
  const s = C("div", "page");
  let l = t || `Course ${e}`;
  const d =
    i === "next-toppers"
      ? "Next Toppers"
      : i === "vidyagram"
        ? "Vidyagram"
        : i.charAt(0).toUpperCase() + i.slice(1);
  s.appendChild(
    K(() => {
      window.history.length > 1
        ? window.history.back()
        : T({ view: "courses", platform: i });
    }, [
      { label: d, onClick: () => T({ view: "courses", platform: i }) },
      { label: String(e), active: !0 },
    ]),
  );
  const f = C("div");
  ((f.innerHTML = `
    <div class="page-title-bar">
      <h1 id="course-title">${m(l)}</h1>
      <div class="breadcrumb" id="sub-breadcrumb">${m(d)} &rsaquo; Subjects</div>
    </div>
    <div class="list-wrap" id="list">${J(6)}</div>
  `),
    s.appendChild(f));
  const v = f.querySelector("#list"),
    S = f.querySelector("#course-title"),
    g = f.querySelector("#sub-breadcrumb");
  t ||
    ye(i)
      .then((r) => {
        const o = r.find((u) => u.id === e);
        o && ((l = o.name), S && (S.textContent = o.name));
      })
      .catch(() => {});
  const x = (r, o) => {
    const u = C("div", "list-row"),
      c = !!r.isCourse,
      b = (o == null ? void 0 : o.type) === "pdf" || r.tileType === "pdf",
      L = (o == null ? void 0 : o.type) === "test" || r.tileType === "test",
      h = c
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
           <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
         </svg>`
        : b
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/>
         </svg>`
          : L
            ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
           <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
         </svg>`
            : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
           <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
         </svg>`;
    let y = "";
    if (c)
      ((y =
        '<span class="row-badge" style="background:rgba(245,158,11,.15);color:var(--amber,#f59e0b);font-weight:600;">Batch / Paper</span>'),
        r.videoCount &&
          (y += ` <span class="row-badge">${r.videoCount} videos</span>`));
    else if (r.videoCount) {
      const A = b ? "documents" : L ? "tests" : "videos";
      y = `<span class="row-badge">${r.videoCount} ${A}</span>`;
    }
    return (
      (u.innerHTML = `
      <div class="row-icon ${c ? "folder" : b ? "book" : L ? "award" : "book"}">
        ${h}
      </div>
      <div class="row-body">
        <div class="row-title">${m(r.name)}</div>
        ${y ? `<div class="row-meta">${y}</div>` : ""}
      </div>
      <div class="row-arrow">${fe()}</div>
    `),
      u.addEventListener("click", () => {
        T(
          c
            ? {
                view: "subjects",
                platform: i,
                courseId: r.id,
                courseName: r.name,
              }
            : {
                view: "topics",
                platform: i,
                courseId: e,
                courseName: (S == null ? void 0 : S.textContent) || l,
                subjectId: r.id,
                subjectName: r.name,
                tileId: (o == null ? void 0 : o.id) || r.tileId,
                tileType: (o == null ? void 0 : o.type) || r.tileType,
              },
        );
      }),
      u
    );
  };
  async function $(r) {
    if (
      (g && (g.innerHTML = `${m(d)} &rsaquo; ${m(r.name)}`),
      r.type === "overview")
    ) {
      const o =
        r.overviewHtml ||
        '<p style="color:var(--tx2);padding:16px 0;">No information provided for this section.</p>';
      v.innerHTML = `<div class="overview-container">${o}</div>`;
      return;
    }
    if (r.type === "content") {
      v.innerHTML = J(5);
      try {
        const o = await Q(e, i, r.id, "content");
        if (!o.length) {
          v.innerHTML =
            '<div class="empty"><div style="font-size:2rem;margin-bottom:8px;">📦</div>No included batches found.</div>';
          return;
        }
        ((v.innerHTML = ""), o.forEach((u) => v.appendChild(x(u, r))));
      } catch (o) {
        v.innerHTML = `<div class="error-box">Failed to load content batches.<br/><small>${m(String(o))}</small></div>`;
      }
      return;
    }
    v.innerHTML = J(6);
    try {
      const o = await Q(e, i, r.id, r.type);
      if (!o.length) {
        const u = r.type === "pdf" ? "📑" : r.type === "test" ? "📝" : "📚";
        v.innerHTML = `<div class="empty"><div style="font-size:2rem;margin-bottom:8px;">${u}</div>No items found under ${m(r.name)}.</div>`;
        return;
      }
      ((v.innerHTML = ""), o.forEach((u) => v.appendChild(x(u, r))));
    } catch (o) {
      v.innerHTML = `<div class="error-box">Failed to load ${m(r.name)}.<br/><small>${m(String(o))}</small></div>`;
    }
  }
  try {
    const r = await Ue(e, i);
    if (
      (r != null && r.title && S && ((S.textContent = r.title), (l = r.title)),
      r != null && r.tiles && r.tiles.length > 0)
    ) {
      let h = r.tiles.find((p) => (a && p.id === a) || (n && p.type === n));
      h ||
        (h =
          r.tiles.find((p) => p.isDefault) ||
          r.tiles.find((p) => p.type === "video") ||
          r.tiles.find((p) => p.type === "content") ||
          r.tiles[0]);
      const y = C("div", "course-tiles-container"),
        A = C("div", "tiles-fade-left"),
        j = C("div", "tiles-fade-right"),
        E = C("button", "tiles-scroll-btn left");
      (E.setAttribute("aria-label", "Scroll left"),
        (E.innerHTML =
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'));
      const U = C("button", "tiles-scroll-btn right");
      (U.setAttribute("aria-label", "Scroll right"),
        (U.innerHTML =
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'));
      const w = C("div", "course-tiles-bar"),
        M = () => {
          const p = w.scrollLeft,
            q = w.scrollWidth - w.clientWidth - 2,
            P = p > 6,
            I = p < q;
          (E.classList.toggle("visible", P),
            A.classList.toggle("visible", P),
            U.classList.toggle("visible", I),
            j.classList.toggle("visible", I));
        };
      (E.addEventListener("click", () => {
        w.scrollBy({ left: -240, behavior: "smooth" });
      }),
        U.addEventListener("click", () => {
          w.scrollBy({ left: 240, behavior: "smooth" });
        }),
        w.addEventListener("scroll", M, { passive: !0 }),
        w.addEventListener(
          "wheel",
          (p) => {
            p.deltaY !== 0 &&
              (p.preventDefault(), (w.scrollLeft += p.deltaY), M());
          },
          { passive: !1 },
        ));
      let R = !1,
        k = 0,
        V = 0,
        N = !1;
      return (
        w.addEventListener("mousedown", (p) => {
          ((R = !0),
            (N = !1),
            (k = p.pageX - w.offsetLeft),
            (V = w.scrollLeft));
        }),
        window.addEventListener("mouseup", () => {
          R = !1;
        }),
        w.addEventListener("mousemove", (p) => {
          if (!R) return;
          const P = p.pageX - w.offsetLeft - k;
          (Math.abs(P) > 4 && (N = !0), (w.scrollLeft = V - P), M());
        }),
        r.tiles.forEach((p) => {
          const q = p.id === (h == null ? void 0 : h.id),
            P = C("button", "course-tile-tab" + (q ? " active" : ""));
          ((P.innerHTML = `
          <span class="tile-tab-icon">${_e(p.type)}</span>
          <span>${m(p.name)}</span>
        `),
            P.addEventListener("click", () => {
              N ||
                ((h == null ? void 0 : h.id) !== p.id &&
                  (w
                    .querySelectorAll(".course-tile-tab")
                    .forEach((I) => I.classList.remove("active")),
                  P.classList.add("active"),
                  P.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  }),
                  (h = p),
                  $(p)));
            }),
            w.appendChild(P));
        }),
        y.appendChild(A),
        y.appendChild(E),
        y.appendChild(w),
        y.appendChild(U),
        y.appendChild(j),
        f.insertBefore(y, v),
        requestAnimationFrame(() => {
          const p = w.querySelector(".course-tile-tab.active");
          (p &&
            p.scrollIntoView({
              behavior: "auto",
              block: "nearest",
              inline: "center",
            }),
            M());
        }),
        h && (await $(h)),
        s
      );
    }
    const o = await Q(e, i);
    if (
      (!t && o.courseTitle && S && (S.textContent = o.courseTitle), !o.length)
    )
      return (
        i === "vidyagram"
          ? (v.innerHTML = `
          <div class="empty-box" style="text-align:center; padding: 48px 20px; background:var(--sf); border:1px solid var(--bd2); border-radius:var(--r); margin:10px 0;">
            <div style="font-size: 34px; margin-bottom: 12px;">🔒</div>
            <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px; color: var(--tx);">Authentication Required</h3>
            <p style="font-size: 13px; color: var(--tx2); max-width: 360px; margin: 0 auto 18px auto; line-height: 1.5;">
              Sign in with your Vidyagram registered mobile number to unlock subjects and video lectures for this batch.
            </p>
            <button onclick="window.location.hash='#/vidyagram'" style="background: #f59e0b; color: #000; font-weight: 700; border: none; border-radius: 20px; padding: 9px 22px; font-size: 13px; cursor: pointer; transition: transform .15s;">
              Go to Vidyagram &amp; Login
            </button>
          </div>
        `)
          : (v.innerHTML =
              '<div class="empty"><div style="font-size:2rem;margin-bottom:8px;">📚</div>No subjects found in this course</div>'),
        s
      );
    const u = o.filter((h) => h.isCourse),
      c = o.filter((h) => !h.isCourse),
      b = u.length > 0 && c.length > 0;
    g &&
      (b
        ? (g.textContent = `${d} › Contents & Subjects`)
        : u.length > 0
          ? (g.textContent = `${d} › Batches & Papers`)
          : (g.textContent = `${d} › Subjects`));
    const L = (h = "all") => {
      if (((v.innerHTML = ""), b && h === "all")) {
        const y = C("div", "sub-section-header");
        ((y.innerHTML = `<span>📦 Included Batches / Contents (${u.length})</span>`),
          v.appendChild(y),
          u.forEach((j) => v.appendChild(x(j))));
        const A = C("div", "sub-section-header");
        ((A.style.marginTop = "18px"),
          (A.innerHTML = `<span>📚 Course Subjects (${c.length})</span>`),
          v.appendChild(A),
          c.forEach((j) => v.appendChild(x(j))));
      } else
        h === "batches"
          ? u.forEach((y) => v.appendChild(x(y)))
          : h === "subjects"
            ? c.forEach((y) => v.appendChild(x(y)))
            : o.forEach((y) => v.appendChild(x(y)));
    };
    if (b) {
      const h = C("div", "sub-filter-tabs");
      ((h.innerHTML = `
        <button class="sub-filter-tab active" data-tab="all">All (${o.length})</button>
        <button class="sub-filter-tab" data-tab="batches">Contents / Batches (${u.length})</button>
        <button class="sub-filter-tab" data-tab="subjects">Subjects (${c.length})</button>
      `),
        f.insertBefore(h, v),
        h.querySelectorAll(".sub-filter-tab").forEach((y) => {
          y.addEventListener("click", () => {
            (h
              .querySelectorAll(".sub-filter-tab")
              .forEach((j) => j.classList.remove("active")),
              y.classList.add("active"));
            const A = y.getAttribute("data-tab");
            L(A);
          });
        }));
    }
    L("all");
  } catch (r) {
    v.innerHTML =
      i === "parmar"
        ? `<div class="empty-box" style="text-align:center; padding:48px 20px; background:var(--sf); border:1px solid var(--bd2); border-radius:var(--r); margin:10px 0;">
          <div style="font-size:34px; margin-bottom:12px;">🔐</div>
          <h3 style="font-size:16px; font-weight:700; margin-bottom:8px; color:var(--tx);">Sign in to explore this batch</h3>
          <p style="font-size:13px; color:var(--tx2); max-width:380px; margin:0 auto 18px; line-height:1.5;">Parmar Academy protects batch subjects and lectures behind its account and purchase access. Open the batch on Parmar Academy to sign in or enroll.</p>
          <a href="https://www.parmaracademy.in/courses/" target="_blank" rel="noreferrer" style="display:inline-flex; align-items:center; gap:6px; background:var(--ac); color:#fff; border-radius:8px; padding:9px 14px; font-size:13px; font-weight:700;">Open Parmar Academy <span aria-hidden="true">↗</span></a>
        </div>`
        : `<div class="error-box">Failed to load subjects.<br/><small>${m(String(r))}</small></div>`;
  }
  return s;
}
async function Fe(e, t, i, a, n = "eduteria", s, l) {
  const d = C("div", "page"),
    f = a || `Course ${e}`,
    v = i || `Subject ${t}`,
    S =
      n === "next-toppers"
        ? "Next Toppers"
        : n === "vidyagram"
          ? "Vidyagram"
          : n.charAt(0).toUpperCase() + n.slice(1);
  d.appendChild(
    K(
      () =>
        T({
          view: "subjects",
          platform: n,
          courseId: e,
          courseName: a,
          tileId: s,
          tileType: l,
        }),
      [
        { label: S, onClick: () => T({ view: "courses", platform: n }) },
        {
          label: String(e),
          onClick: () =>
            T({
              view: "subjects",
              platform: n,
              courseId: e,
              courseName: a,
              tileId: s,
              tileType: l,
            }),
        },
        { label: i || String(t), active: !0 },
      ],
    ),
  );
  const g = C("div");
  ((g.innerHTML = `
    <div class="page-title-bar">
      <h1 id="subject-title">${m(v)}</h1>
      <div class="breadcrumb">${m(S)} &rsaquo; ${m(f)} &rsaquo; Topics</div>
    </div>
    <div class="list-wrap" id="list">${J(6)}</div>
  `),
    d.appendChild(g));
  const x = g.querySelector("#list");
  i ||
    Q(e, n, s, l)
      .then(($) => {
        const r = $.find((o) => o.id === t);
        if (r) {
          const o = g.querySelector("#subject-title");
          o && (o.textContent = r.name);
        }
      })
      .catch(() => {});
  try {
    const $ = await me(e, t, n, s, l);
    if (!$.length)
      return (
        (x.innerHTML =
          '<div class="empty"><div style="font-size:2rem;margin-bottom:8px;">📂</div>No topics found in this subject</div>'),
        d
      );
    ((x.innerHTML = ""),
      $.forEach((r) => {
        const o = n === "next-toppers" && !r.isLeaf,
          u = l === "pdf" || r.tileType === "pdf",
          c = C("div", "list-row"),
          b = u
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
            : o
              ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>'
              : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>';
        ((c.innerHTML = `
        <div class="row-icon ${u ? "book" : o ? "folder" : "video"}">
          ${b}
        </div>
        <div class="row-body">
          <div class="row-title">${m(r.name)}</div>
          ${r.videoCount ? `<div class="row-meta"><span class="row-badge">${r.videoCount} ${u ? "documents" : o ? "items" : "lectures"}</span></div>` : ""}
        </div>
        <div class="row-arrow">${fe()}</div>
      `),
          c.addEventListener("click", () => {
            var L;
            T(
              o
                ? {
                    view: "topics",
                    platform: n,
                    courseId: e,
                    courseName: a,
                    subjectId: r.id,
                    subjectName: r.name,
                    tileId: s || r.tileId,
                    tileType: l || r.tileType,
                  }
                : {
                    view: "lectures",
                    platform: n,
                    courseId: e,
                    courseName: a,
                    subjectId: r.id,
                    subjectName:
                      ((L = g.querySelector("#subject-title")) == null
                        ? void 0
                        : L.textContent) || r.name,
                    topicId: r.id,
                    topicName: r.name,
                    tileId: s || r.tileId,
                    tileType: l || r.tileType,
                  },
            );
          }),
          x.appendChild(c));
      }));
  } catch ($) {
    x.innerHTML = `<div class="error-box">Failed to load topics.<br/><small>${m(String($))}</small></div>`;
  }
  return d;
}
let X = null,
  Z = null;
function ee() {
  if (X) {
    try {
      X.destroy();
    } catch {}
    X = null;
  }
  if (Z) {
    try {
      Z.destroy();
    } catch {}
    Z = null;
  }
}
function pe() {
  const e = document.getElementById("vmodal");
  if (!e) return;
  const t = e.querySelector("video");
  (t && (t.pause(), (t.src = "")),
    ee(),
    e.classList.remove("open"),
    setTimeout(() => e.remove(), 260));
}
function We(e) {
  let t = 0;
  const i = 2,
    a = () => {
      (t++, t >= i && e());
    };
  if (window.shaka) t++;
  else {
    const n = document.createElement("script");
    ((n.src =
      "https://cdn.jsdelivr.net/npm/shaka-player@4.9.4/dist/shaka-player.compiled.js"),
      (n.onload = () => {
        try {
          window.shaka.polyfill.installAll();
        } catch {}
        a();
      }),
      (n.onerror = a),
      document.head.appendChild(n));
  }
  if (window.Hls) t++;
  else {
    const n = document.createElement("script");
    ((n.src = "https://cdn.jsdelivr.net/npm/hls.js@1.5.15/dist/hls.min.js"),
      (n.onload = a),
      (n.onerror = a),
      document.head.appendChild(n));
  }
  t >= i && e();
}
function F(e, t, i, a) {
  var u;
  (u = document.getElementById("vmodal")) == null || u.remove();
  const n = C("div", "vmodal");
  n.id = "vmodal";
  const s = typeof t == "string" ? t : t.url,
    l = typeof t == "string" ? void 0 : t.licenseUrl,
    d = typeof t == "string" ? void 0 : t.token,
    f = typeof t == "string" ? void 0 : t.directUrl,
    v = f || a;
  let S = "";
  (i &&
    i.length > 1 &&
    (S = `
      <div class="vmodal-qualities">
        <span>Quality:</span>
        ${i.map((c, b) => `<button class="quality-btn" data-url="${m(c.url)}" style="background:${b === 0 ? "var(--ac)" : "var(--sf2)"}; color:${b === 0 ? "#fff" : "var(--tx)"};">${m(c.title)}p</button>`).join("")}
      </div>
    `),
    (n.innerHTML = `
    <div class="vmodal-backdrop"></div>
    <div class="vmodal-box">
      <div class="vmodal-hdr">
        <span class="vmodal-title">${m(e)}</span>
        <button class="vmodal-close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="vmodal-player">
        <video id="hls-video" controls playsinline></video>
      </div>
      ${S}
      <div class="vmodal-info">
        <span class="vmodal-live-dot"></span>
        <span class="vmodal-stream-label">Stream active &bull; Unlocked HD Playback</span>
      </div>
    </div>
  `),
    document.body.appendChild(n),
    requestAnimationFrame(() => n.classList.add("open")),
    n.querySelector(".vmodal-close").addEventListener("click", pe),
    n.querySelector(".vmodal-backdrop").addEventListener("click", pe));
  const g = n.querySelector("#hls-video");
  function x(c, b, L) {
    (ee(),
      We(async () => {
        var E, U;
        const h = window.shaka,
          y = window.Hls,
          A = c.includes(".mpd");
        if ((E = h == null ? void 0 : h.polyfill) != null && E.installAll)
          try {
            h.polyfill.installAll();
          } catch {}
        function j(w) {
          if (y != null && y.isSupported()) {
            const M = new y({ enableWorker: !0, maxBufferLength: 30 });
            ((Z = M),
              M.loadSource(w),
              M.attachMedia(g),
              M.on(y.Events.MANIFEST_PARSED, (R, k) => {
                if (k != null && k.levels && k.levels.length > 1) {
                  const V = `
                <div class="vmodal-qualities">
                  <span>Quality:</span>
                  <button class="hls-quality-btn" data-level="-1" style="background:var(--ac); color:#fff;">Auto</button>
                  ${k.levels.map((p, q) => `<button class="hls-quality-btn" data-level="${q}" style="background:var(--sf2); color:var(--tx);">${p.height ? p.height + "p" : "Level " + (q + 1)}</button>`).join("")}
                </div>
              `,
                    N = n.querySelector(".vmodal-qualities");
                  if (N) N.outerHTML = V;
                  else {
                    const p = n.querySelector(".vmodal-player");
                    p && p.insertAdjacentHTML("afterend", V);
                  }
                  n.querySelectorAll(".hls-quality-btn").forEach((p) => {
                    p.addEventListener("click", () => {
                      (n.querySelectorAll(".hls-quality-btn").forEach((P) => {
                        ((P.style.background = "var(--sf2)"),
                          (P.style.color = "var(--tx)"));
                      }),
                        (p.style.background = "var(--ac)"),
                        (p.style.color = "#fff"));
                      const q = parseInt(
                        p.getAttribute("data-level") || "-1",
                        10,
                      );
                      M.currentLevel = q;
                    });
                  });
                }
                g.play().catch(() => {});
              }),
              M.on(y.Events.ERROR, (R, k) => {
                k.fatal && (ee(), (g.src = w), g.play().catch(() => {}));
              }));
          } else
            g.canPlayType("application/vnd.apple.mpegurl")
              ? ((g.src = w), g.play().catch(() => {}))
              : ((g.src = w), g.play().catch(() => {}));
        }
        if (!A && c.includes(".m3u8")) {
          j(c);
          return;
        }
        if (A && h)
          try {
            if (
              (U = (await h.Player.probeSupport()).drm) != null &&
              U["com.widevine.alpha"]
            ) {
              const M = new h.Player(g);
              ((X = M),
                M.addEventListener("error", (R) => {
                  const k = R.detail;
                  console.error("Shaka error:", {
                    code: k == null ? void 0 : k.code,
                    message: k == null ? void 0 : k.message,
                    browserMessage: Array.isArray(k == null ? void 0 : k.data)
                      ? k.data[0]
                      : void 0,
                  });
                }),
                b &&
                  (M.configure({
                    drm: {
                      servers: { "com.widevine.alpha": b },
                      advanced: {
                        "com.widevine.alpha": {
                          videoRobustness: "",
                          audioRobustness: "",
                        },
                      },
                    },
                  }),
                  d &&
                    M.getNetworkingEngine().registerRequestFilter((R, k) => {
                      R === h.net.NetworkingEngine.RequestType.LICENSE &&
                        ((k.headers["pallycon-customdata-v2"] = d),
                        (k.headers["Content-Type"] =
                          "application/octet-stream"));
                    })),
                await M.load(c),
                await g.play().catch(() => {}));
              return;
            }
            console.warn(
              "Widevine DRM is not supported in this browser/environment.",
            );
          } catch (w) {
            (console.warn("Shaka DASH failed, trying HLS fallback:", w), ee());
          }
        if (L) {
          j(L);
          return;
        }
        ((g.src = c), g.play().catch(() => {}));
      }));
  }
  const $ = !!f;
  (x($ ? f : s, $ ? void 0 : l, v),
    n.querySelectorAll(".quality-btn").forEach((c) => {
      c.addEventListener("click", () => {
        (n.querySelectorAll(".quality-btn").forEach((L) => {
          ((L.style.background = "var(--sf2)"), (L.style.color = "var(--tx)"));
        }),
          (c.style.background = "var(--ac)"),
          (c.style.color = "#fff"));
        const b = c.getAttribute("data-url");
        b && x(b, l);
      });
    }));
}
function Ye(e, t) {
  const i = C("div", "list-row"),
    a = e.videoCount;
  return (
    (i.innerHTML = `
    <div class="row-icon folder">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    </div>
    <div class="row-body">
      <div class="row-title">${m(e.name)}</div>
      ${a ? `<div class="row-meta"><span class="row-badge">${a} videos</span></div>` : ""}
    </div>
    <div class="row-arrow">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  `),
    i.addEventListener("click", () => t(e)),
    i
  );
}
function Ge(e, t) {
  var r;
  const i = e.contentType === 1 || e.contentType === 3,
    a = !i,
    n = !i && e.duration ? Se(e.duration) : "",
    s = !!(e.fileUrl || e.videoUrl || e.vdcId),
    l = i && !s,
    d = C("div", "lec-row" + (l ? " row-locked" : "")),
    f = i
      ? '<span class="type-pill d">PDF Document</span>'
      : '<span class="type-pill v">Video</span>',
    v = l
      ? `<span class="badge-status locked">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Locked
       </span>`
      : s
        ? e.originalLocked
          ? `<span class="badge-status unlocked">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 11V7a5 5 0 0 1 9.9-1"/><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/></svg>
          Unlocked
        </span>`
          : '<span class="badge-status available">Available</span>'
        : '<span class="badge-status" style="color:var(--mu);">Unavailable</span>',
    S =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
    g =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    x = l
      ? '<div class="play-overlay" style="background:rgba(0,0,0,0.65);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>'
      : i
        ? '<div class="play-overlay"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></div>'
        : '<div class="play-overlay"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>',
    $ = l
      ? `<button class="play-btn locked" title="Document is locked" disabled>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
       </button>`
      : i
        ? `<button class="play-btn" title="Open Document">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
       </button>`
        : `<button class="play-btn" title="Play lecture">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
       </button>`;
  if (
    ((d.innerHTML = `
    <div class="lec-thumb ${a ? "v" : "d"}">
      ${e.thumbnailUrl ? `<img src="${m(e.thumbnailUrl)}" alt="" loading="lazy"/>` : i ? S : g}
      ${x}
    </div>
    <div class="lec-body">
      <div class="lec-title">${m(e.name)}</div>
      <div class="lec-meta">
        ${f}
        ${n ? `<span class="dur">${n}</span>` : ""}
        ${v}
      </div>
    </div>
    ${$}
  `),
    !l)
  ) {
    const o = () => t(e);
    ((r = d.querySelector(".play-btn")) == null ||
      r.addEventListener("click", (u) => {
        (u.stopPropagation(), o());
      }),
      d.addEventListener("click", o));
  }
  return d;
}
async function Ke(e, t, i, a, n, s = "eduteria", l, d) {
  const f = C("div", "page"),
    v = a || `Course ${e}`,
    S = i || `Topic ${t}`,
    g =
      s === "next-toppers"
        ? "Next Toppers"
        : s.charAt(0).toUpperCase() + s.slice(1);
  f.appendChild(
    K(
      () =>
        T({
          view: "topics",
          platform: s,
          courseId: e,
          courseName: a,
          subjectId: n,
          tileId: l,
          tileType: d,
        }),
      [
        { label: g, onClick: () => T({ view: "courses", platform: s }) },
        {
          label: String(e),
          onClick: () =>
            T({
              view: "subjects",
              platform: s,
              courseId: e,
              courseName: a,
              tileId: l,
              tileType: d,
            }),
        },
        ...(n
          ? [
              {
                label: `Subject ${n}`,
                onClick: () =>
                  T({
                    view: "topics",
                    platform: s,
                    courseId: e,
                    courseName: a,
                    subjectId: n,
                    tileId: l,
                    tileType: d,
                  }),
              },
            ]
          : []),
        { label: i || String(t), active: !0 },
      ],
    ),
  );
  const x = C("div");
  ((x.innerHTML = `
    <div class="page-title-bar">
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
        <h1 id="topic-title">${m(S)}</h1>
        <span id="lec-count-pill" style="display:none;" class="row-badge"></span>
      </div>
      <div class="breadcrumb">${m(g)} &rsaquo; ${m(v)}</div>
    </div>
    <div class="list-wrap" id="lec-list">${Le(8)}</div>
  `),
    f.appendChild(x));
  const $ = x.querySelector("#lec-list");
  !i &&
    n &&
    me(e, n, s, l, d)
      .then((o) => {
        const u = o.find((c) => c.id === t);
        if (u) {
          const c = x.querySelector("#topic-title");
          c && (c.textContent = u.name);
        }
      })
      .catch(() => {});
  async function r(o) {
    if (o.contentType === 3 || o.contentType === 1) {
      const c = o.fileUrl || o.videoUrl;
      if (c) {
        window.open(c, "_blank");
        return;
      }
      alert("This document is locked or requires student authorization.");
      return;
    }
    if (o.isYouTube && o.videoUrl) {
      F(o.name, o.videoUrl, o.bitrateUrls);
      return;
    }
    if (s === "vidyagram" && o.id > 0) {
      const c = C(
        "div",
        "global-loading",
        `${se(36)}<span style="font-weight:600; font-size:14px;">Resolving fresh Vidyagram stream...</span>`,
      );
      document.body.appendChild(c);
      try {
        const b = await Ve(e, o.id),
          L = te(b);
        if (L) {
          ((o.videoUrl = L),
            document.body.contains(c) && document.body.removeChild(c),
            F(o.name, L, o.bitrateUrls));
          return;
        }
      } catch {}
      document.body.contains(c) && document.body.removeChild(c);
    }
    if (
      !!o.videoUrl &&
      (o.videoUrl.includes(".m3u8") || o.videoUrl.includes(".mp4")) &&
      !o.videoUrl.includes("/download/")
    ) {
      F(o.name, o.videoUrl, o.bitrateUrls);
      return;
    }
    if (o.vdcId) {
      const c = C(
        "div",
        "global-loading",
        `${se(36)}<span style="font-weight:600; font-size:14px; letter-spacing:-.2px;">Unlocking HD video stream…</span>`,
      );
      document.body.appendChild(c);
      try {
        const b = await Ne(o.vdcId, s),
          L = b.directUrl || b.url,
          h = o.videoUrl;
        ((o.videoUrl = L),
          document.body.removeChild(c),
          F(o.name, b, o.bitrateUrls, h));
      } catch (b) {
        if (
          (document.body.removeChild(c),
          o.videoUrl && !o.videoUrl.includes("/download/"))
        ) {
          F(o.name, o.videoUrl, o.bitrateUrls);
          return;
        }
        alert("Unable to unlock stream: " + String(b));
      }
      return;
    }
    if (o.videoUrl && !o.videoUrl.includes("/download/")) {
      F(o.name, o.videoUrl, o.bitrateUrls);
      return;
    }
    alert("This lecture's video is no longer available from Vidyagram.");
  }
  try {
    const o = await Re(e, t, n, s, l, d);
    if (!o.length) {
      const c = d === "pdf";
      return (
        ($.innerHTML = `<div class="empty"><div style="font-size:2rem;margin-bottom:8px;">${c ? "📄" : "🎬"}</div>No ${c ? "documents" : "lectures"} found in this topic</div>`),
        f
      );
    }
    $.innerHTML = "";
    const u = x.querySelector("#lec-count-pill");
    if (u) {
      const c = d === "pdf";
      ((u.textContent = `${o.length} ${o.length === 1 ? (c ? "document" : "lecture") : c ? "documents" : "lectures"}`),
        (u.style.display = "inline-block"));
    }
    o.forEach((c) => {
      c.contentType === 0
        ? $.appendChild(
            Ye(c, (b) => {
              T({
                view: "lectures",
                platform: s,
                courseId: e,
                courseName: a,
                subjectId: n,
                topicId: b.id,
                topicName: b.name,
              });
            }),
          )
        : $.appendChild(Ge(c, r));
    });
  } catch (o) {
    $.innerHTML = `<div class="error-box">Failed to load lectures.<br/><small>${m(String(o))}</small></div>`;
  }
  return f;
}
function te(e) {
  if (typeof e == "string")
    return e.startsWith("http") &&
      (e.includes(".m3u8") || e.includes(".mpd") || e.includes(".mp4"))
      ? e
      : "";
  if (Array.isArray(e)) {
    for (const t of e) {
      const i = te(t);
      if (i) return i;
    }
    return "";
  }
  if (!e || typeof e != "object") return "";
  for (const t of [
    "video_player_url",
    "file_url",
    "video_url",
    "file_link",
    "url",
    "path",
    "link",
  ]) {
    const i = te(e[t]);
    if (i) return i;
  }
  for (const t of Object.values(e)) {
    const i = te(t);
    if (i) return i;
  }
  return "";
}
let _ = document.getElementById("app");
async function be(e) {
  if (!_) _ = document.getElementById("app") || document.getElementById("root");
  if (!_) return;
  _.innerHTML = "";
  try {
    switch (e.view) {
      case "home":
        _.appendChild(await Pe());
        break;
      case "courses":
        _.appendChild(await ze(e.platform || "eduteria"));
        break;
      case "subjects":
        _.appendChild(
          await De(
            e.courseId,
            e.courseName,
            e.platform || "eduteria",
            e.tileId,
            e.tileType,
          ),
        );
        break;
      case "topics":
        _.appendChild(
          await Fe(
            e.courseId,
            e.subjectId,
            e.subjectName,
            e.courseName,
            e.platform || "eduteria",
            e.tileId,
            e.tileType,
          ),
        );
        break;
      case "lectures":
        _.appendChild(
          await Ke(
            e.courseId,
            e.topicId,
            e.topicName,
            e.courseName,
            e.subjectId,
            e.platform || "eduteria",
            e.tileId,
            e.tileType,
          ),
        );
        break;
      default:
        T({ view: "courses", platform: "eduteria" }, !0);
    }
  } catch (t) {
    if (_) _.innerHTML = `<div style="padding:40px;color:var(--red)">Navigation error: ${t}</div>`;
  }
}

let initialized = false;
export function initGBStudy(container) {
  if (container) _ = container;
  if (!initialized) {
    initialized = true;
    Ce((e) => be(e));
  }
  be(ie);
}

// Auto-run if #app exists on load
if (typeof document !== "undefined") {
  const el = document.getElementById("app");
  if (el) {
    initGBStudy(el);
  }
}

