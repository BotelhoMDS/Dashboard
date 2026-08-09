import type { ReactNode } from "react";
import { NavLink } from "react-router";

type LayoutProps = {
  children: ReactNode;
};

function navClass({ isActive }: { isActive: boolean }) {
  return [
    "shrink-0 rounded-xl px-3 py-2 text-sm font-semibold transition",
    isActive
      ? "bg-teal-700 text-white shadow-sm"
      : "text-slate-600 hover:bg-teal-50 hover:text-teal-800",
  ].join(" ");
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <header className="sticky top-0 z-20 border-b border-teal-100/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-end px-3 sm:px-4 md:px-6 lg:px-8">
          <nav className="scrollbar-none flex max-w-full items-center justify-end gap-1 overflow-x-auto py-2">
            <NavLink to="/" end className={navClass}>
              Início
            </NavLink>

            <NavLink
              to="/medicamentos"
              className={navClass}
            >
              Medicamentos
            </NavLink>

            <NavLink
              to="/compras"
              className={navClass}
            >
              Compras
            </NavLink>

            <NavLink
              to="/leitos"
              className={navClass}
            >
              Leitos
            </NavLink>

            <NavLink
              to="/mapa"
              className={navClass}
            >
              Mapa
            </NavLink>
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}