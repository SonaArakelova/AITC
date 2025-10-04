
'use client';

import { Select } from 'antd';
import Image from 'next/image';
import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import './language-switcher.css'; 

const options = [
  {
    value: 'en',
    label: (
      <div className="flex items-center space-x-2 rounded-full">
        <Image 
          src="https://flagcdn.com/gb.svg" 
          alt="English" 
          width={25}
          height={25}
          className="language-switcher-circle object-cover"
        />
        <span></span>
      </div>
    ),
  },
  {
    value: 'hy',
    label: (
      <div className="flex items-center space-x-2 rounded-full">
        <Image 
          src="https://flagcdn.com/am.svg" 
          alt="Armenian" 
          width={25}
          height={25}
          className=" object-cover language-switcher-circle"
        />
        <span></span>
      </div>
    ),
  },
];


interface LanguageSwitcherProps {
  value: string;
  onChange: (locale: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ value, onChange }) => {
  const selectedOption = options.find(option => option.value === value) ?? options[0];

  const handleChange = (val: { value: string; label: React.ReactNode }) => {
    onChange(val.value);
  };

  return (
    <Select
      labelInValue
      value={{ value: selectedOption.value, label: selectedOption.label }}
      onChange={handleChange}
      options={options}
      className="language-switcher"
    />
  );
};



   