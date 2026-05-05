let dataKost = [];

function toggleTheme() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// auto load saat refresh
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
};

function formatRupiah(input) {
    let angka = input.value.replace(/[^,\d]/g, '');
    let ribuan = angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    input.value = "Rp " + ribuan;
}

function getAngka(rp) {
    return parseFloat(rp.replace(/[^0-9]/g, ""));
}

function tambahData() {

    if (!nama.value || !harga.value) {
        alert("Isi data dulu!");
        return;
    }

    let kost = {
        nama: nama.value,
        harga: getAngka(harga.value),
        jarak: parseFloat(jarak.value),
        km: parseInt(km.value),
        listrik: parseInt(listrik.value),
        ac: parseInt(ac.value),
        ukuran: parseFloat(ukuran.value),
        rating: parseFloat(rating.value)
    };

    dataKost.push(kost);

    tampilData();
    updateJumlah();
    flash("Data berhasil ditambahkan");
}

function tampilData() {
    let tbody = document.querySelector("#tabelData tbody");
    tbody.innerHTML = "";

    dataKost.forEach(k => {
        tbody.innerHTML += `
        <tr class="fade-in">
            <td>${k.nama}</td>
            <td>Rp ${k.harga.toLocaleString()}</td>
            <td>${k.jarak}</td>
            <td>${k.km == 2 ? "Dalam" : "Luar"}</td>
            <td>${k.listrik == 2 ? "Termasuk" : "Sendiri"}</td>
            <td>${k.ac == 2 ? "AC" : "Non AC"}</td>
            <td>${k.ukuran}</td>
            <td>${k.rating}</td>
        </tr>`;
    });
}

function updateJumlah() {
    document.getElementById("jumlahData").innerText = dataKost.length + " Data";
}

function hitungSAW() {

    let minHarga = Math.min(...dataKost.map(k => k.harga));
    let minJarak = Math.min(...dataKost.map(k => k.jarak));

    let maxKM = Math.max(...dataKost.map(k => k.km));
    let maxListrik = Math.max(...dataKost.map(k => k.listrik));
    let maxAC = Math.max(...dataKost.map(k => k.ac));
    let maxUkuran = Math.max(...dataKost.map(k => k.ukuran));
    let maxRating = Math.max(...dataKost.map(k => k.rating));

    let hasil = dataKost.map(k => {
        let nilai =
            (minHarga / k.harga) +
            (minJarak / k.jarak) +
            (k.km / maxKM) +
            (k.listrik / maxListrik) +
            (k.ac / maxAC) +
            (k.ukuran / maxUkuran) +
            (k.rating / maxRating);

        return { ...k, nilai };
    });

    hasil.sort((a, b) => b.nilai - a.nilai);

    let tbody = document.querySelector("#tabelHasil tbody");
    tbody.innerHTML = "";

    hasil.forEach((h, i) => {
        tbody.innerHTML += `
        <tr class="fade-in">
            <td>${i+1}</td>
            <td>${h.nama}</td>
            <td>${h.nilai.toFixed(3)}</td>
        </tr>`;
    });

    document.getElementById("kesimpulanBox").style.display = "block";
    document.getElementById("kesimpulanText").innerHTML =
        `Kost terbaik adalah <b>${hasil[0].nama}</b>`;
}

function flash(text) {
    let div = document.createElement("div");
    div.className = "toast";
    div.innerText = text;
    document.body.appendChild(div);

    setTimeout(() => div.remove(), 2000);
}

function updateIcon() {
    let btn = document.getElementById("themeBtn");
    if (document.body.classList.contains("dark")) {
        btn.innerHTML = "☀️";
    } else {
        btn.innerHTML = "🌙";
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );

    updateIcon();
}

window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
    updateIcon();
};