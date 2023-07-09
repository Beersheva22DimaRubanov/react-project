import { Box, Container, Grid } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useMemo, useState } from "react"
import Employee from "../model/Employee"
import { count } from "../util/number-functions"
import { useTheme } from '@mui/material/styles';
import React from "react"
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

type Props = {
    employees: Employee[],
    defaultInterval: number,
    field: string
}

const Statistics: React.FC<Props> = ({ employees, defaultInterval, field }) => {
    const [interval, setInterval] = useState(defaultInterval);
    const rows = useMemo(() => getRows(), [employees, interval])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', sortable: false },
        { field: 'min', headerName: 'MIN', flex: 0.3 },
        { field: 'max', headerName: 'MAX', flex: 0.3 },
        { field: 'count', headerName: 'COUNT', flex: 0.5 },
    ]

    function getRows() {
        let array = [];
        if(field === 'age'){
            const currentYear: number = new Date().getFullYear();
            array = employees.map(e=>{ 
                return {'age': currentYear - +e.birthYear }
            })
        }else{
            array = employees;
        }
        
        const statisticObj = count(array, field, interval)
        const res = Object.entries(statisticObj).map((el, index) => {
            const min = Number.parseInt(el[0]) * interval
            const max = min + interval - 1;
            return { id: index + 1, min, max, count: el[1] }
        })
        return res
    }
    const theme = useTheme();
    const data = rows.map(el => {
        const age = el.min;
        const amount = el.count;
        return { age, amount }
    })

    return <Grid container>
        <Grid item xs={12} sm={12} md={6} >
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '50vh' }}>
                {<DataGrid columns={columns} rows={rows} />}
            </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <React.Fragment>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }}
                    >
                        <XAxis
                            dataKey="age"
                            stroke={theme.palette.text.secondary}
                            style={theme.typography.body2}>
                        </XAxis>
                        <YAxis
                            stroke={theme.palette.text.secondary}
                            style={theme.typography.body2}
                        >
                            <Label
                                angle={270}
                                position="left"
                                style={{
                                    textAnchor: 'middle',
                                    fill: theme.palette.text.primary,
                                    ...theme.typography.body1,
                                }}
                            >
                                Employees (Amount)
                            </Label>
                        </YAxis>
                        <Line
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="amount"
                            stroke={theme.palette.primary.main}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        </Grid>
    </Grid>
}

export default Statistics;