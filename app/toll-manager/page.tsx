"use client"

import React from 'react'
import InitToll from './InitToll';
import GetOwner from './GetOwner';

function TollManager() {
    return (
    <main className="flex flex-col flex-wrap w-screen items-center py-12 space-y-4">
        <div>Toll Manager</div>
        <GetOwner />
        <InitToll />
    </main>
    )
};

export default TollManager;