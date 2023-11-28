"use client"

import React from 'react'
import InitToll from './InitToll';
import GetOwner from './GetOwner';

function TollManager() {
    return (
    <>
        <div>Toll Manager</div>
        <GetOwner />
        <InitToll />
    </>
    )
};

export default TollManager;