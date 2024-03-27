// script.js

// Mobil menüyü açma/kapatma işlevselliği
document.getElementById("menu-toggle").addEventListener("click", function () {
    var mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px"; // Açılırken yüksekliği ayarla
    } else {
        mobileMenu.style.maxHeight = 0; // Kapanırken yüksekliği sıfıra ayarla
        mobileMenu.addEventListener('transitionend', function () {
            mobileMenu.classList.add("hidden"); // Geçiş tamamlandıktan sonra gizle
        }, {
            once: true
        });
    }
});


    // Galeri Resmi açma işlevi
    function openModal(imageSrc) {
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("modalImage");
        modal.style.display = "block"; // Modalı göster
        modalImg.src = imageSrc; // Modal içindeki resmin src'sini ayarla
    }

    //Galeri  Resmi kapatma işlevi
    function closeModal() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none"; // Modalı gizle
    }