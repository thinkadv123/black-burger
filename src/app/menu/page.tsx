"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MenuSection } from '@/components/MenuSection';

function MenuContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('cat') || 'ALL MENU';

  return <MenuSection initialCategory={categoryParam} />;
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white pt-32 text-center">Loading Black Burger Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
