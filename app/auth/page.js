'use client'

import React, { Suspense } from 'react';
import AuthPage from '@/components/AuthPage';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthPage />
        </Suspense>
    );
}