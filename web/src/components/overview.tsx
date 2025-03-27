'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
    {
        name: 'Jan',
        total: 1200,
    },
    {
        name: 'Feb',
        total: 1900,
    },
    {
        name: 'Mar',
        total: 2300,
    },
    {
        name: 'Apr',
        total: 2800,
    },
    {
        name: 'May',
        total: 3500,
    },
    {
        name: 'Jun',
        total: 4200,
    },
    {
        name: 'Jul',
        total: 4800,
    },
    {
        name: 'Aug',
        total: 5200,
    },
    {
        name: 'Sep',
        total: 5600,
    },
    {
        name: 'Oct',
        total: 6100,
    },
    {
        name: 'Nov',
        total: 6500,
    },
    {
        name: 'Dec',
        total: 7000,
    },
];

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
