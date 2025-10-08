'use client'

import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "./language/LanguageSwitch";
import { fetchNavbarItems } from '@/lib/api/api';
import { useState, useEffect } from "react";

interface NavbarItem {
  id: string;
  name: React.ReactNode;
  url: string;
}

interface HeaderProps {
  initialNavbarItems: NavbarItem[];
}

export function Header({ initialNavbarItems}: HeaderProps) {
  const [locale, setLocale] = useState('en-US');
  const [navbarItems, setNavbarItems] = useState(initialNavbarItems);

useEffect(() => {
  async function loadNavbar() {
    if (locale === 'en-US') {
      setNavbarItems(initialNavbarItems);
    } else {
      // Fetch localized items 
      const items = await fetchNavbarItems(locale);
      setNavbarItems(items);
    }
  }

  loadNavbar();
}, [locale, initialNavbarItems]);

 
  function handleLanguageChange(newLocale: string) {
    setLocale(newLocale);
  }

  return (
    <header className=" sticky top-1 z-50 bg-white shadow-[0_4px_10px_rgba(78,86,255,0.3)] px-[190px] p-1">
      <nav className="max-w-7xl mx-auto px-0 py-1 flex items-center justify-between gap-3">
        
        {/* <h1 className="text-5xl font-bold text-[rgb(78,86,255)]">
          AITC
        </h1>  */}

        <Image
         src='/Logo.png'
         alt='Logo'
         width={90}
         height={30}
         className=" border-white border-6 "
        />

        <ul className="flex space-x-16 text-l font-light mx-8">
          {navbarItems.map(({ id, name, url }) => (
            <li key={id} className="relative group ">
              <Link href={url} className="hover:text-blue-500">
                {name}
              </Link>
              <span className="absolute -top-[36px] left-[-19px]  w-[110px] h-1 bg-[rgb(78,86,255)] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Link href= '/register'>
          <button className="bg-[rgb(78,86,255)] text-white text-l text-light rounded-full px-7 py-2 tracking-widest hover:bg-[rgb(34,42,192)] transition ">
            Registration
          </button>
          </Link>

          <LanguageSwitcher value={locale} onChange={handleLanguageChange} />
           {/* <LanguageSwitcher value="en-US" onChange={(locale) => console.log(locale)} />        */}

        </div>

      </nav>
    </header>
  );
}
