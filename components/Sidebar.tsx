import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 p-4">
      <div className="mb-8">
        <img src="/logo.svg" alt="BuildLedger" className="h-8" />
      </div>
      <nav className="space-y-2">
        <NavLink to="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
        </NavLink>
        <NavLink to="/invoices">
          <Button variant="ghost" className="w-full justify-start">
            Invoices
          </Button>
        </NavLink>
        <NavLink to="/quotes">
          <Button variant="ghost" className="w-full justify-start">
            Quotes
          </Button>
        </NavLink>
        <NavLink to="/clients">
          <Button variant="ghost" className="w-full justify-start">
            Clients
          </Button>
        </NavLink>
        <NavLink to="/expenses">
          <Button variant="ghost" className="w-full justify-start">
            Expenses
          </Button>
        </NavLink>
      </nav>
    </aside>
  );
}