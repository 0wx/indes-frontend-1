import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Iklan } from "../components/Iklan";
import Ombak from "../components/Ombak";
import OmbakFooter from "../components/OmbakFooter";
import style from "../styles/Home.module.css";

export interface AdminType {
  _id: number;
  email: string;
  nama: string;
}

export interface PaketType {
  _id: number;
  kecepatan: string;
  harga: number;
}
export interface RiwayatPembayaran {
  tanggal: Date;
  jumlahPembayaran: number;
}

export interface PelangganType {
  _id: number;
  nama: string;
  alamat: string;
  telepon: number;
  paket: number;
  pemasangan: Date;
  batasPembayaran: Date;
  riwayatPembayaran: RiwayatPembayaran[];
}

export type User = Omit<PelangganType, "_id">;
export interface IklanType {
  _id: number;
  nama_iklan: string;
  expired: Date;
  gambar: string;
}

const Home: NextPage = () => {
  const [input, setInput] = useState<string>("");
  const [pelanggan, setPelanggan] = useState<PelangganType | null>(null);
  const cari = async () => {
    const respon = await fetch(
      "https://api.wisnuaji.my.id/api/v1/search/" + input
    );

    const hasil = await respon.json();
    if (!hasil.message) {
      setPelanggan(hasil as PelangganType);
    }
  };
  const bayar = async () => {
    if (pelanggan) {
      const respon = await fetch(
        "https://api.wisnuaji.my.id/api/v1/bayar/" + pelanggan._id
      );
      const data = await respon.json();
      console.log(data.Data.SessionID);
      open(data.Data.Url);
    }
  };
  return (
    <div className={style.container}>
      <Head>
        <title>INDES</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* bagian atas */}
      <header className={style.header}>
        <div className={style.logo}>
          <Image src="/logo indes.png" width={60} height={60} />
        </div>
        <h1>Cek Tagihan Pembayaran</h1>
      </header>
      <Ombak />
      {/* ---------------------- */}
      {/* batasan atas */}
      {/* awal inputan id */}
      <div className={style.content}>
        <section className={style.input}>
          <input
            type="search"
            placeholder="silahkan masukkan id atau no telp"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={cari}>Cari</button>
          {pelanggan && (
            <div>
              <div>{JSON.stringify(pelanggan, null, 4)}</div>
              <button onClick={bayar}>bayar</button>
            </div>
          )}
        </section>
        {/* akhir inputan id */}
        {/* --------------------------- */}
        {/* awal iklan */}
        <section>
          <Iklan />
        </section>
        {/* akhir iklan */}
      </div>
      <OmbakFooter />
      {/* footer */}
      <footer>dszyryfutryte</footer>

      {/* akhir footer */}
    </div>
  );
};

export default Home;
