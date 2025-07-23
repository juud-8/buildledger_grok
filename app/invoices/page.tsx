import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

export default function InvoicesPage() {
  const { user, loading } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/auth/login');
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchInvoices = async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('id, title, total_amount, status, issued_date')
        .eq('user_id', user.id);
      if (error) console.error(error);
      else setInvoices(data || []);
    };
    fetchInvoices();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => navigate('/invoices/new')}>New Invoice</Button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Title</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-gray-600">
              <td className="p-2">{invoice.title}</td>
              <td className="p-2">${invoice.total_amount.toFixed(2)}</td>
              <td className="p-2">{invoice.status}</td>
              <td className="p-2">{new Date(invoice.issued_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}