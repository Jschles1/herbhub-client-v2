'use client';

import { useQueryParams } from '@/lib/store';
import * as React from 'react';

export default function CategoryFilter() {
  const [_, dispatch] = useQueryParams();

  async function handleClick() {
    // Test action
    await dispatch({
      type: 'filter',
      payload: { value: 'str/indica', checked: true },
    });
  }

  return (
    <button
      className="border border-red-500 w-[300px] p-2"
      onClick={handleClick}
    >
      CategoryFilter
    </button>
  );
}
