"use client"

import {atom} from "recoil";

const accountAddressState = atom({
    key: 'address',
    default: "0xE378E02cE7175889DB55B21Db65a7dA7928f456d",
})

const feeState = atom({
    key: 'fee',
    default: '',
});