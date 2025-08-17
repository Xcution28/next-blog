import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Link from "next/link";

NProgress.configure({ showSpinner: false });

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const start = () => NProgress.start();
        const done = () => NProgress.done();
        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', done);
        Router.events.on('routeChangeError', done);
        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', done);
            Router.events.off('routeChangeError', done);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="sticky top-0 z-10 border-b bg-white/80">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                    <Link href="/posts" className="font-semibold tracking-tight">Next Blog</Link>
                    <nav className="text-sm text-gray-600">
                        <Link href="/posts" className="hover:text-gray-900">Posts</Link>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-4 py-6">
                <Component {...pageProps} />
            </main>
            <footer className="mx-auto max-w-5xl px-4 py-10 text-xs text-gray-500">by Jasur Meylikhurramov</footer>
        </div>
    );
}
