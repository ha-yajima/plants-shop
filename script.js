document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Swiper 初期化 ---
    if (document.querySelector('.swiper')) {
        new Swiper('.swiper', {
            loop: true,
            speed: 1000,
            autoplay: { delay: 4000 },
            effect: 'fade',
            fadeEffect: { crossFade: true },
        });
    }

    // --- 2. ハンバーガーメニュー ---
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('js-nav');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // --- 3. フェードインアニメーション (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.js-fade').forEach(el => observer.observe(el));

    // --- 4. News絞り込み ---
    const filterBtns = document.querySelectorAll(".filter-btn");
    const newsItems = document.querySelectorAll(".news-item");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const target = btn.dataset.filter;
            
            newsItems.forEach(item => {
                if (target === "all" || item.dataset.category === target) {
                    item.classList.remove("is-hide");
                } else {
                    item.classList.add("is-hide");
                }
            });
        });
    });

    // --- 5. 商品モーダル ---
    const modal = document.getElementById("modal");
    if (modal) {
        document.querySelectorAll(".item").forEach(item => {
            item.addEventListener("click", (e) => {
                // リンク先が '#' の場合のみモーダルを開く
                if (item.getAttribute('href') === '#') {
                    e.preventDefault();
                    document.getElementById("modal-img").src = item.querySelector("img").src;
                    document.getElementById("modal-title").innerText = item.querySelector("p").firstChild.textContent.trim();
                    document.getElementById("modal-price").innerText = "価格：" + item.querySelector(".price").innerText;
                    modal.style.display = "block";
                }
            });
        });

        const closeBtn = document.querySelector(".modal-close");
        if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
        window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
    }
});

// --- 6. News詳細ページの処理 ---
const newsData = [
    { title: "春の新作リースが入荷しました", date: "2026.02.10", category: "INFO", image: "news-image0.jpg", content: "立春を過ぎ、少しずつ春の足音が聞こえてきました。ミモザをふんだんに使った黄色いリースなど..." },
    { title: "週末ワークショップ開催", date: "2026.02.05", category: "EVENT", image: "news-image1.jpg", content: "ハーブを使った寄せ植えや、美味しい淹れ方を学ぶワークショップを開催します。" },
    { title: "オンラインショップ送料改定", date: "2026.01.28", category: "INFO", image: "news-image2.jpg", content: "配送業者の運賃値上げに伴い、送料を改定させていただきます。" },
    { title: "冬のミントの育て方", date: "2026.01.15", category: "BLOG", image: "news-image3.jpg", content: "冬のミントは地上部が枯れても根は生きています。乾燥させすぎないのがコツです。" },
    { title: "新年明けましておめでとうございます", date: "2026.01.05", category: "INFO", image: "news-image4.jpg", content: "旧年中は格別のご愛顧を賜り、誠にありがとうございました。" },
    { title: "クリスマスギフト予約受付中", date: "2025.12.20", category: "CAMPAIGN", image: "news-image5.jpg", content: "大切な方への贈り物に。オリジナル巾着付きのセットをご用意。" }
];

if (document.querySelector('.news-detail')) {
    const id = parseInt(new URLSearchParams(window.location.search).get('id'));

    if (!isNaN(id) && newsData[id]) {
        const data = newsData[id];
        document.querySelector('.detail-header .date').innerText = data.date;
        document.querySelector('.detail-header .category').innerText = data.category;
        document.querySelector('.detail-header h1').innerText = data.title;
        document.querySelector('.detail-content').innerHTML = `
            <img src="images/${data.image}" class="detail-img">
            <div class="main-text">${data.content}</div>
        `;

        let navHtml = id > 0 ? `<a href="news-detail.html?id=${id - 1}" class="prev-btn">PREV</a>` : '<span></span>';
        navHtml += id < newsData.length - 1 ? `<a href="news-detail.html?id=${id + 1}" class="next-btn">NEXT</a>` : '';
        document.querySelector('.post-nav').innerHTML = navHtml;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const options = {
        threshold: 0.3 // 30%見えたら発火
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // 何度もアニメーションさせたい場合はここを残す
                // 一度きりで良いなら削除
                entry.target.classList.remove('active');
            }
        });
    }, options);

    document.querySelectorAll('.scene').forEach(scene => {
        observer.observe(scene);
    });
});