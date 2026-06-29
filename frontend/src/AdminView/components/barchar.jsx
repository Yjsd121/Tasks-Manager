import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

const DEFAULT_COLORS = [
  '#3B82F6',
  '#f0da13',
  '#22C55E',
  '#7C3AED',
  '#EF4444',
  '#06B6D4'
]

const STATUS_COLORS = {
  pending: '#faa512',
  'in process': '#7C3AED',
  completed: '#22C55E',
  cancelled: '#EF4444',
  low: '#22C55E',
  medium: '#F59E0B',
  high: '#EF4444'
}

function getKeys(data) {
  if (!data || data.length === 0) {
    return {
      labelKey: '',
      valueKey: ''
    }
  }

  const keys = Object.keys(data[0])

  return {
    labelKey: keys.find(key => key !== 'Total'),
    valueKey: 'Total'
  }
}

export default function MyChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available.</p>
  }

  const { labelKey, valueKey } = getKeys(data)

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 10,
          bottom: 5
        }}
      >
        <CartesianGrid stroke='#E5E7EB' strokeDasharray='4 4' />
        <XAxis dataKey={labelKey} />
        <YAxis allowDecimals={false} />
        <Tooltip />

        <Bar
          dataKey={valueKey}
          radius={[8, 8, 0, 0]}
          barSize={60}
        >
          {data.map((entry, index) => {
            const value = String(entry[labelKey]).toLowerCase()

            return (
              <Cell
                key={index}
                fill={
                  STATUS_COLORS[value] ||
                  DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                }
              />
            )
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
