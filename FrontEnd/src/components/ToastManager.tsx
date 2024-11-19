import { ToastProvider } from '@/context';
import { ReactNode } from 'react';

export const ToastManager = ({ children }: { children: ReactNode }) => {
    return (
        <ToastProvider>
            {children}
        </ToastProvider>
    );
};

