// Sınav sorularını çekmek için JSON dosyasının yolu
const jsonDosyaYolu = 'sorular.json';

// DOM öğelerini seçme
const soruDiv = document.getElementById('sorular');
const oncekiSoruBtn = document.getElementById('oncekiSoru');
const sonrakiSoruBtn = document.getElementById('sonrakiSoru');
const sinaviBitirBtn = document.getElementById('sinaviBitir');
const sonucDiv = document.getElementById('sonuc');
const sinavBilgisiDiv = document.getElementById('sınavBilgisi');

// Mevcut soru indeksi
let mevcutSoruIndex = 0;
let sorular;

// JSON dosyasından soruları çek
async function sorulariGetir() {
    const response = await fetch(jsonDosyaYolu);
    sorular = await response.json();
    sorulariGoster();
}

// Soruları göster
function sorulariGoster() {
    const mevcutSoru = sorular[mevcutSoruIndex];
    soruDiv.innerHTML = `
        <p>${mevcutSoru.soru}</p>
        <div class="flex justify-center mt-4 space-x-4">
            ${mevcutSoru.secenekler.map((secenek, index) => `
                <label class="inline-flex items-center">
                    <input type="radio" name="secenek" value="${secenek}">
                    
                     <span>${String.fromCharCode(65 + index)}) ${secenek}</span>
                </label>
            `).join('')}
        </div>
    `;

// Önceki soru butonunu kontrol et
oncekiSoruBtn.hidden = mevcutSoruIndex === 0;
// Sonraki soru butonunu kontrol et
sonrakiSoruBtn.hidden = mevcutSoruIndex === sorular.length - 1;
// Sınavı bitir butonunu kontrol et
sinaviBitirBtn.hidden = mevcutSoruIndex !== sorular.length - 1;


}

// Önceki soru butonuna tıklama olayı
oncekiSoruBtn.addEventListener('click', () => {
    mevcutSoruIndex--;
    sorulariGoster();
});

// Sonraki soru butonuna tıklama olayı
sonrakiSoruBtn.addEventListener('click', () => {
    mevcutSoruIndex++;
    sorulariGoster();
});

// Sınavı bitir butonuna tıklama olayı
sinaviBitirBtn.addEventListener('click', () => {
    // Seçilen cevapları kontrol et
    const secilenCevaplar = document.querySelectorAll('input[name="secenek"]:checked');
    let dogruSayisi = 0;
    secilenCevaplar.forEach((cevap, index) => {
        if (cevap.value === sorular[index].dogruCevap) {
            dogruSayisi++;
        }
    });

    // Sonucu göster
    sonucDiv.innerHTML = `
        <p>Doğru Sayısı: ${dogruSayisi}</p>
        <p>Yanlış Sayısı: ${sorular.length - dogruSayisi}</p>
        
    `;
});

// Sayfa yüklendiğinde soruları getir
sorulariGetir();
