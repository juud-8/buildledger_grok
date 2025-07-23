import { Outlet } from 'react-router-dom';

export default function InvoicesLayout() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <Outlet />
    </div>
  );
}