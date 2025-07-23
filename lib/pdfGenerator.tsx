import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});

export const InvoicePDF = ({ invoice }: { invoice: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Invoice</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Title: </Text>
        <Text>{invoice.title}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Total Amount: </Text>
        <Text>${invoice.total_amount.toFixed(2)}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Status: </Text>
        <Text>{invoice.status}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Issued Date: </Text>
        <Text>{new Date(invoice.issued_date).toLocaleDateString()}</Text>
      </View>
      {invoice.client_id && (
        <View style={styles.section}>
          <Text style={styles.label}>Client ID: </Text>
          <Text>{invoice.client_id}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export const generatePDF = async (invoice: any) => {
  const { pdf } = await import('@react-pdf/renderer');
  const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice_${invoice.id}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};