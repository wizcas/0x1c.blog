import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="remix-app">
            <header></header>
            <div className="content">{children}</div>
            <footer>&copy; 0x1C.dev</footer>
        </div>
    );
}
