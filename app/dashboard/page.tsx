import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { askAI } from '@/lib/aiAgent';
import { Button } from '@/components/ui/button';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Registers Chart.js components

export default function DashboardPage() {
  const [cashFlow, setCashFlow] = useState<number[]>([]);
  const [arOutstanding, setArOutstanding] = useState<number>(0);
  const [profitability, setProfitability] = useState<number>(0);
  const [aiResponse, setAiResponse] = useState<string>('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: invoices, error: invError } = await supabase
        .from('invoices')
        .select('total_amount, status, issued_date')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      if (invError) console.error(invError);

      const monthlyCashFlow = Array(12).fill(0);
      let totalAr = 0;
      let totalRevenue = 0;

      invoices?.forEach((inv) => {
        const month = new Date(inv.issued_date).getMonth();
        monthlyCashFlow[month] += inv.total_amount;
        if (inv.status === 'sent' || inv.status === 'overdue') totalAr += inv.total_amount;
        if (inv.status === 'paid') totalRevenue += inv.total_amount;
      });

      setCashFlow(monthlyCashFlow);
      setArOutstanding(totalAr);
      setProfitability(totalRevenue - (invoices?.length * 50 || 0)); // Placeholder cost
    };
    fetchDashboardData();
  }, []);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Cash Flow ($)",
      data: cashFlow,
      fill: false,
      borderColor: "#f97316", // Orange accent
      backgroundColor: "#1e3a8a", // Navy
      tension: 0.1
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount ($)"
        }
      },
      x: {
        title: {
          display: true,
          text: "Month"
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff" // White for dark mode
        }
      }
    }
  };

  const handleAIQuery = async () => {
    const response = await askAI('How much did I make last month?');
    setAiResponse(response || 'No data available');
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-card p-4 rounded-lg">
          <h2>Outstanding A/R</h2>
          <p>${arOutstanding.toFixed(2)}</p>
        </div>
        <div className="bg-card p-4 rounded-lg">
          <h2>Profitability</h2>
          <p>${profitability.toFixed(2)}</p>
        </div>
      </div>
      <Button onClick={handleAIQuery} className="mb-4">
        Ask AI
      </Button>
      {aiResponse && <p>AI: {aiResponse}</p>}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Monthly Cash Flow</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}