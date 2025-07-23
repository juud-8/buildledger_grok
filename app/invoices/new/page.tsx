import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { generatePDF } from '@/lib/pdfGenerator';

export default function NewInvoicePage() {
  const { user, loading } = useAuth();
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [error, setError] = useState('');
  const [newInvoice, setNewInvoice] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/auth/login');
  }, [loading, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setError('User not authenticated');
    let clientUuid = null;
    if (clientId) {
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(clientId)) {
        return setError('Invalid UUID for Client ID');
      }
      clientUuid = clientId;
    }
    const { data, error: insertError } = await supabase.from('invoices').insert({
      user_id: user.id,
      client_id: clientUuid,
      title,
      total_amount: parseFloat(totalAmount),
      status: 'draft',
    }).select();
    if (insertError) setError(insertError.message);
    else {
      setNewInvoice(data[0]);
      navigate('/invoices');
    }
  };

  const handleDownloadPDF = () => {
    if (newInvoice) generatePDF(newInvoice);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">New Invoice</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Client ID (UUID or leave blank)</label>
          <Input value={clientId} onChange={(e) => setClientId(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Total Amount</label>
          <Input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Create Invoice</Button>
      </form>
      {newInvoice && (
        <div className="mt-4">
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
        </div>
      )}
    </div>
  );
}