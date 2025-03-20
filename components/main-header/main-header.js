'use client';

import Link from "next/link";
import MainLogoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import { usePathname } from "next/navigation";

export default function MainHeader() {
  const currentPath = usePathname();

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={MainLogoImg} alt="NextLevel Food Logo" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals" className={currentPath.startsWith('/meals') ? classes.active : undefined}>Browse Meals</Link>
            </li>
            <li>
              <Link href="/community" className={currentPath.startsWith('/community') ? classes.active : undefined}>Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
