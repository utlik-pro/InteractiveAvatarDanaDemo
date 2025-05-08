"use client";

import Image from "next/image";
import logo from "@/public/logo-5.png"; // Помести свой логотип сюда

export default function NavBar() {
  return (
    <div className="flex flex-row justify-center items-center w-full p-4">
      <Image src={logo} alt="Utlik Logo" height={40} />
    </div>
  );
}
