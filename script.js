let dataMahasiswa = JSON.parse(localStorage.getItem("mahasiswa")) || [];
let form = document.getElementById("form");
let tabel = document.getElementById("tabel");
let filter = document.getElementById("filter");
// Menentukan grade
function tentukanGrade(nilai) {
    if (nilai >= 85) {
        return "A";
    } else if (nilai >= 75) {
        return "B";
    } else if (nilai >= 65) {
        return "C";
    } else if (nilai >= 50) {
        return "D";
    } else {
        return "E";
    }
}
// Menampilkan data ke tabel
function tampilkanData() {
    tabel.innerHTML = "";
    for (let i = 0; i < dataMahasiswa.length; i++) {
        let mahasiswa = dataMahasiswa[i];
        if (filter.value == "semua" ||
            mahasiswa.status == filter.value) {
            tabel.innerHTML += `
                <tr>
                    <td>${mahasiswa.nama}</td>
                    <td>${mahasiswa.nim}</td>
                    <td>${mahasiswa.nilai}</td>
                    <td>${mahasiswa.grade}</td>
                    <td>${mahasiswa.status}</td>
                    <td>
                        <button class="btn btn-danger btn-sm"
                            onclick="hapusData(${i})">
                            Hapus
                        </button>
                    </td>
                </tr>
            `;
        }
    }
}
// Menambahkan data
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let nama = document.getElementById("nama");
    let nim = document.getElementById("nim");
    let nilai = document.getElementById("nilai");
    // Validasi
    if (nama.value == "" || nim.value == "" || nilai.value == "") {
        alert("Semua data harus diisi!");
        return;
    }
    let grade = tentukanGrade(Number(nilai.value));
    let status;
    if (Number(nilai.value) >= 75) {
        status = "Lulus";
    } else {
        status = "Tidak Lulus";
    }
    let mahasiswa = {
        nama: nama.value,
        nim: nim.value,
        nilai: Number(nilai.value),
        grade: grade,
        status: status
    };
    dataMahasiswa.push(mahasiswa);
    localStorage.setItem(
        "mahasiswa",
        JSON.stringify(dataMahasiswa)
    );
    form.reset();
    tampilkanData();
});
// Filter data
filter.addEventListener("change", function() {
    tampilkanData();
});
// Menghapus data
function hapusData(index) {
    dataMahasiswa.splice(index, 1);
    localStorage.setItem(
        "mahasiswa",
        JSON.stringify(dataMahasiswa)
    );
    tampilkanData();
}
// Menampilkan data saat halaman dibuka
tampilkanData();