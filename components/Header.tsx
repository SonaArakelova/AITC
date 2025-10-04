
'use client'

import Link from "next/link";
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
      const items = await fetchNavbarItems(locale);
      setNavbarItems(items);
    }

    if (locale !== 'en-US') {
      loadNavbar();
    }
  }, [locale]);

  function handleLanguageChange(newLocale: string) {
    setLocale(newLocale);
  }

  return (
    <header className=" sticky top-2 z-50 bg-white shadow-[0_4px_10px_rgba(78,86,255,0.3)] px-[160px] p-2">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        
        <h1 className="text-5xl font-bold text-[rgb(78,86,255)]">
          AITC
        </h1> 

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
          <button className="bg-[rgb(78,86,255)] text-white text-l text-light rounded-full px-7 py-2 tracking-widest hover:bg-[rgb(34,42,192)] transition ">
            Registration
          </button>
          <LanguageSwitcher value={locale} onChange={handleLanguageChange} />
        </div>

      </nav>
    </header>
  );
}
