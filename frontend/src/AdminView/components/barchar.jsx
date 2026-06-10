import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
function getKeys(data) {
  if (!data || data.length === 0) return {}

  const keys = Object.keys(data[0])

  const labelKey = keys.find(k => k !== 'Total')
  const valueKey = keys.find(k => k === 'Total')

  return { labelKey, valueKey }
}

export default function MyChart({ data }) {
  const { labelKey, valueKey } = getKeys(data)
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data}>
        <YAxis />
        <XAxis dataKey={labelKey} />
        <Tooltip />
        <Bar dataKey='Total' fill='#082581' barSize={80} />
      </BarChart>
    </ResponsiveContainer>
  )
}
