export default function Commentary({ text }) {
  return (
    <div style={{
      background: '#0f172a',
      border: '1px solid #1e293b',
      borderRadius: 8,
      padding: '10px 14px',
      fontSize: 13,
      color: '#cbd5e1',
      fontStyle: 'italic',
      minHeight: 42,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <span style={{ fontSize: 16 }}>📢</span>
      <span>{text}</span>
    </div>
  );
}
