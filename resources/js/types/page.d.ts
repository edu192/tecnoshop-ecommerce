import '@inertiajs/react'
import {Page} from '@inertiajs/core';

declare module '@inertiajs/react' {
    export function usePage(): Page<App.Data.SharedData>;
}