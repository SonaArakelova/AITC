// 'use client';

// import { Select } from 'antd';
// import Image from 'next/image';
// import React from 'react';
// import '@ant-design/v5-patch-for-react-19';
// import './language-switcher.css'; 

// const options = [
//   {
//     value: 'en',
//     label: (
//       <div className="flex items-center space-x-2 rounded-full">
//         <Image 
//           src="https://flagcdn.com/gb.svg" 
//           alt="English" 
//           width={25}
//           height={25}
//           className="language-switcher-circle object-cover"
//         />
//         <span></span>
//       </div>
//     ),
//   },
//   {
//     value: 'hy',
//     label: (
//       <div className="flex items-center space-x-2 rounded-full">
//         <Image 
//           src="https://flagcdn.com/am.svg" 
//           alt="Armenian" 
//           width={25}
//           height={25}
//           className=" object-cover language-switcher-circle"
//         />
//         <span></span>
//       </div>
//     ),
//   },
// ];


// interface LanguageSwitcherProps {
//   value: string;
//   onChange: (locale: string) => void;
// }

// export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ value, onChange }) => {
//   const selectedOption = options.find(option => option.value === value) ?? options[0];

//   const handleChange = (val: { value: string; label: React.ReactNode }) => {
//     onChange(val.value);
//   };

//   return (
//     <Select
//       labelInValue
//       value={{ value: selectedOption.value, label: selectedOption.label }}
//       onChange={handleChange}
//       options={options}
//       className="language-switcher"
//     />
//   );
// };






'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

interface LanguageOption {
  value: string;
  label: string;
  flagUrl: string;
}

const options: LanguageOption[] = [
  {
    value: 'en-US',
    label: 'En',
    flagUrl: 'https://flagcdn.com/gb.svg',
  },
  {
    value: 'am',
    label: 'Am',
    flagUrl: 'https://flagcdn.com/am.svg',
  },
];

interface LanguageSwitcherProps {
  value: string;
  onChange: (locale: string) => void;
}

export function LanguageSwitcher({ value, onChange }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value) ?? options[0];

  const handleSelect = (option: LanguageOption) => {
    setOpen(false);
    if (option.value !== value) {
      onChange(option.value);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-center w-[70px] " ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-full px-2 py-2 gap-2 bg-white  w-[70px] h-[35px] shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
      >
        <div className="w-[20px] h-[20px] rounded-full overflow-hidden  border-gray-300">
          <Image
            src={selectedOption.flagUrl}
            alt={selectedOption.label}
            width={20}
            height={20}
            className="object-cover w-full h-full"
          />
        </div>
        <ChevronDownIcon className="w-4 h-4 text-gray-400 ml-1 hover:text-gray-800" />
      </button>

      {open && (
        <div className="absolute top-0 -left-0.5 z-10  w-[75px] bg-white rounded-3xl px-2 py-0.3 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <div className='flex  justify-center  gap-0 ' >
            <div className='-ml-3'>
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className="flex items-center justify-center rounded-full  gap-5  w-[40px] h-[35px]  "
              >
                <div className="w-[20px] h-[20px] rounded-full overflow-hidden ">
                  <Image
                    src={option.flagUrl}
                    alt={option.label}
                    width={20}
                    height={20}
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>
            ))}
            </div>
          <button onClick={() => setOpen(!open)}>
            <ChevronUpIcon className="w-4 h-4  text-gray-400 hover:text-gray-900 -mt-6.5 ml-0.8" />
          </button>
          </div>
       </div>
      )}
    </div>
  );
}
