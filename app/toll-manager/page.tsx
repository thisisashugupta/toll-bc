"use client"

import React from 'react'
import InitToll from './InitToll';
import GetOwner from './GetOwner';
import { Heading } from '@/components/ui/heading';

function TollManager() {
    return (
    <div className="flex flex-col flex-wrap w-screen items-center py-12 space-y-4">
        <Heading>Toll Manager</Heading>
        <GetOwner />
        <InitToll />
    </div>
    )
};

export default TollManager;