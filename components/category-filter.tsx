'use client';

import * as React from 'react';
import { Checkbox } from './ui/checkbox';
import { useQueryParams } from '@/lib/store';
import { CATEGORY_FILTERS } from '@/lib/constants';

export default function CategoryFilter() {
  const [_, dispatch] = useQueryParams();

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    console.log('CLICKED', event.target);

    // Test action
    // await dispatch({
    //   type: 'filter',
    //   payload: { value: 'str/indica', checked: true },
    // });
  }

  return (
    <div className="border border-red-500 lg:w-[300px] p-4">
      {CATEGORY_FILTERS.map((filter) => (
        <div key={filter.name}>
          <div className="font-bold">{filter.name}</div>
          {filter.options.map((option) => (
            <div key={option.name} className="items-top flex space-x-2">
              <Checkbox
                id={option.name}
                onClick={handleClick}
                value={option.value}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={option.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
