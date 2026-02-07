/* ─── Scroll reveal ─── */
(() => {
    const els = document.querySelectorAll(".r");
    if (!("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("on"));
        return;
    }
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("on");
                    io.unobserve(e.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
})();

/* ─── #2 Section atmosphere visibility ─── */
(() => {
    const atmos = document.querySelectorAll(".sec-atmosphere");
    if (!atmos.length) return;
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) =>
                e.target.classList.toggle(
                    "visible",
                    e.isIntersecting,
                ),
            );
        },
        { threshold: 0.15 },
    );
    atmos.forEach((a) => io.observe(a.parentElement));
})();

/* ─── Header scroll ─── */
(() => {
    const h = document.getElementById("header");
    const check = () => h.classList.toggle("scrolled", scrollY > 8);
    check();
    addEventListener("scroll", check, { passive: true });
})();

/* ─── #9 Scroll progress bar ─── */
(() => {
    const bar = document.getElementById("scrollProgress");
    const update = () => {
        const h =
            document.documentElement.scrollHeight -
            window.innerHeight;
        bar.style.width = h > 0 ? (scrollY / h) * 100 + "%" : "0%";
    };
    addEventListener("scroll", update, { passive: true });
})();

/* ─── Smooth scroll ─── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const t = document.querySelector(href);
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* ─── Drawer ─── */
(() => {
    const drawer = document.getElementById("drawer");
    const btn = document.getElementById("menuBtn");
    const close = document.getElementById("closeDrawer");
    const open = () => {
        drawer.classList.add("open");
        drawer.setAttribute("aria-hidden", "false");
        btn.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    };
    const shut = () => {
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
        btn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    };
    btn.addEventListener("click", open);
    close.addEventListener("click", shut);
    drawer.addEventListener("click", (e) => {
        if (e.target === drawer) shut();
    });
    drawer
        .querySelectorAll("a")
        .forEach((a) => a.addEventListener("click", shut));
    addEventListener("keydown", (e) => {
        if (e.key === "Escape") shut();
    });
})();

/* ─── #1 Fixed: Active nav (spread operator + aria-current semantics) ─── */
(() => {
    const links = document.querySelectorAll("nav.primary .navlink");
    const ids = [...links]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h?.startsWith("#") && h.length > 1);
    const sections = ids
        .map((id) => document.querySelector(id))
        .filter(Boolean);
    if (!sections.length) return;
    const map = new Map();
    links.forEach((a) => map.set(a.getAttribute("href"), a));
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    links.forEach((a) =>
                        a.removeAttribute("aria-current"),
                    );
                    const a = map.get("#" + e.target.id);
                    if (a) a.setAttribute("aria-current", "page");
                }
            });
        },
        { threshold: 0.35 },
    );
    sections.forEach((s) => io.observe(s));
})();

/* ─── #8 Sticky mobile CTA ─── */
(() => {
    const sticky = document.getElementById("stickyCta");
    const hero = document.getElementById("top");
    const install = document.getElementById("install");
    if (!sticky || !hero || !install) return;

    let heroVisible = true;
    let installVisible = false;

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.target === hero)
                    heroVisible = e.isIntersecting;
                if (e.target === install)
                    installVisible = e.isIntersecting;
            });
            // Show sticky only if hero is NOT visible AND install is NOT visible
            sticky.classList.toggle(
                "visible",
                !heroVisible && !installVisible,
            );
        },
        { threshold: 0 },
    );

    io.observe(hero);
    io.observe(install);
})();

/* ─── #11 Page Visibility API: pause animations when hidden ─── */
(() => {
    const mesh = document.querySelector(".bg-mesh");
    const orbs = document.querySelectorAll(".glow-orb");
    const marquees = document.querySelectorAll(".marquee-track");
    document.addEventListener("visibilitychange", () => {
        const hidden = document.hidden;
        const state = hidden ? "paused" : "running";
        if (mesh) mesh.style.animationPlayState = state;
        orbs.forEach((o) => (o.style.animationPlayState = state));
        marquees.forEach(
            (m) => (m.style.animationPlayState = state),
        );
    });
})();
