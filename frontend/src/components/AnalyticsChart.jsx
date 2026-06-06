import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer

} from "recharts";
function AnalyticsChart({

    data,
    dataKey,
    xKey,
    title

}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">
                {title}

            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={dataKey} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
export default AnalyticsChart;