'use client';

import * as React from 'react';
import { Input } from './ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import { SORT_BY_OPTIONS } from '@/lib/constants';

export default function ProductListActions() {
  return (
    <div className="border border-yellow-500 mb-4 p-4 flex justify-between">
      <div className="flex items-center w-1/2">
        <Input placeholder="Search Products" className="mr-4" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sort By:" />
          </SelectTrigger>
          <SelectContent>
            {SORT_BY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
