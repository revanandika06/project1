"use client"

import { useState } from "react";

export default function KalkulatorBMI() {
  const [nama, setNama] = useState("");
  const [berat, setBerat] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [bmi, setBMI] = useState(null);
  const [kategori, setKategori] = useState("");
  const [saran, setSaran] = useState("");

  // Fungsi untuk menghitung BMI
  function hitungBMI(berat, tinggi) {
    const tinggiMeter = tinggi / 100; // Konversi tinggi dari cm ke m
    const nilaiBMI = berat / (tinggiMeter * tinggiMeter);
    return nilaiBMI.toFixed(2); // Mengembalikan nilai BMI dengan dua angka desimal
  }

  // Fungsi untuk memberikan saran berdasarkan BMI
  function berikanSaran(nilaiBMI) {
    if (nilaiBMI < 18.5) {
      return "Anda sebaiknya mempertimbangkan untuk menambah berat badan demi kesehatan yang lebih baik.";
    } else if (nilaiBMI >= 18.5 && nilaiBMI <= 24.9) {
      return "Pertahankan kerja baik Anda untuk menjaga berat badan saat ini!";
    } else if (nilaiBMI >= 25 && nilaiBMI <= 29.9) {
      return "Pertimbangkan untuk mengadopsi pola makan yang lebih sehat dan rutin berolahraga.";
    } else {
      return "Anda sebaiknya berkonsultasi dengan penyedia layanan kesehatan untuk saran tentang pengelolaan berat badan.";
    }
  }

  // Fungsi untuk menghitung kategori BMI dan saran ketika pengguna submit form
  const tanganiSubmit = (e) => {
    e.preventDefault();
    const nilaiBMI = hitungBMI(parseFloat(berat), parseFloat(tinggi));
    setBMI(nilaiBMI);

    if (nilaiBMI < 18.5) {
      setKategori("Anda termasuk berat badan kurang.");
    } else if (nilaiBMI >= 18.5 && nilaiBMI <= 24.9) {
      setKategori("Anda memiliki berat badan normal.");
    } else if (nilaiBMI >= 25 && nilaiBMI <= 29.9) {
      setKategori("Anda termasuk berat badan berlebih.");
    } else {
      setKategori("Anda termasuk obesitas.");
    }

    setSaran(berikanSaran(nilaiBMI));
  };

  return (
    <div>
      <h1>Kalkulator BMI</h1>
      <form onSubmit={tanganiSubmit}>
        <div>
          <label>
            Nama:
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Berat (kg):
            <input
              type="number"
              value={berat}
              onChange={(e) => setBerat(e.target.value)}
              required
              min="0" // Menghindari nilai negatif
            />
          </label>
        </div>
        <div>
          <label>
            Tinggi (cm):
            <input
              type="number"
              value={tinggi}
              onChange={(e) => setTinggi(e.target.value)}
              required
              min="0" // Menghindari nilai negatif
            />
          </label>
        </div>
        <button type="submit">Hitung BMI</button>
      </form>

      {bmi && (
        <div>
          <h2>Halo, {nama}!</h2>
          <p>BMI Anda adalah: {bmi}</p>
          <p>{kategori}</p>
          <p>{saran}</p>
        </div>
      )}

      <div>
        <h3>Berikut adalah daftar kategori berat badan menurut BMI:</h3>
        <ul>
          <li>Berat badan kurang: BMI {"<"} 18.5</li>
          <li>Berat badan normal: BMI 18.5 - 24.9</li>
          <li>Berat badan berlebih: BMI 25 - 29.9</li>
          <li>Obesitas: BMI {">"} 30</li>
        </ul>
      </div>
    </div>
  );
}