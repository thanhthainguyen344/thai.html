function toast(noiDung) {
    let o = document.getElementById("toast-dungchung");
    if (!o) {
        o = document.createElement("div");
        o.id = "toast-dungchung";
        o.className = "toast-thongbao";
        document.body.appendChild(o);
    }
    o.textContent = noiDung;
    o.classList.add("hien");
    clearTimeout(o._timer);
    o._timer = setTimeout(() => o.classList.remove("hien"), 2200);
}

// Làm nổi bật liên kết trang hiện tại trên menu
function initActiveNav() {
    const links = document.querySelectorAll("nav a");
    const trang = window.location.pathname.split("/").pop() || "index.html";
    links.forEach((a) => {
        const href = a.getAttribute("href").split("/").pop();
        if (href === trang || (href === "" && trang === "index.html")) {
            a.classList.add("active");
        }
    });
}
function initMobileMenu() {
    const nutHam = document.getElementById("hamburger");
    const nav = document.querySelector("nav");
    if (!nutHam || !nav) return;
    nutHam.addEventListener("click", () => {
        nav.classList.toggle("mo");
        nutHam.textContent = nav.classList.contains("mo") ? "✕" : "☰";
    });
    // Tự đóng menu khi bấm chọn 1 mục (trên di động)
    nav.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
            nav.classList.remove("mo");
            nutHam.textContent = "☰";
        });
    });
}
function initDarkMode() {
    const KHOA = "tinhocvp_giaodien";
    const nutToggle = document.getElementById("toggle-theme");
    const html = document.documentElement;

    function apDung(mau) {
        if (mau === "dark") {
            html.classList.add("dark");
            if (nutToggle) nutToggle.textContent = "☀️";
        } else {
            html.classList.remove("dark");
            if (nutToggle) nutToggle.textContent = "🌙";
        }
    }

    apDung(localStorage.getItem(KHOA) || "light");

    if (nutToggle) {
        nutToggle.addEventListener("click", () => {
            const dangToi = html.classList.contains("dark");
            const moi = dangToi ? "light" : "dark";
            localStorage.setItem(KHOA, moi);
            apDung(moi);
            toast(moi === "dark" ? "Đã bật chế độ tối" : "Đã tắt chế độ tối");
        });
    }
}
function layTienDoTongHop() {
    function demXong(khoa) {
        try {
            const obj = JSON.parse(localStorage.getItem(khoa)) || {};
            return Object.values(obj).filter(Boolean).length;
        } catch (e) {
            return 0;
        }
    }
    const diemQuiz = parseInt(localStorage.getItem("tinhocvp_quiz_diem_cao") || "0", 10);
    const tongCauQuiz = parseInt(localStorage.getItem("tinhocvp_quiz_tongcau") || "0", 10);
    return {
        buocBaihoc: demXong("tinhocvp_baihoc_tiendo"),
        cauBaitap: demXong("tinhocvp_baitap_tiendo"),
        diemQuiz,
        tongCauQuiz,
    };
}
document.addEventListener("DOMContentLoaded", () => {
    initActiveNav();
    initMobileMenu();
    initDarkMode();
});
