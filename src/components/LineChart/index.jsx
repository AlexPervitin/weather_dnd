import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { format } from 'date-fns';
import { ChartContainer, TooltipContainer, TooltipText } from './styles';

const accessors = {
  xAccessor: (d) => new Date(`${d.x}T00:00:00`),
  yAccessor: (d) => d.y,
};

export default function LineChart({ data }) {
  const min = data?.map((item) => {
    return { x: item.date, y: item.tempMin };
  });
  const max = data?.map((item) => {
    return { x: item.date, y: item.tempMax };
  });
  return (
    <ChartContainer>
      <XYChart
        height={400}
        margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear' }}
      >
        <AnimatedGrid
          columns={false}
          numTicks={8}
          lineStyle={{
            stroke: '#e1e1e1',
            strokeLinecap: 'round',
            strokeWidth: 1,
          }}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="bottom"
          tickLabelProps={() => ({ dy: 10 })}
          numTicks={8}
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="left"
          numTicks={8}
          tickLabelProps={() => ({ dx: -10 })}
        />

        <AnimatedLineSeries
          stroke="#00BFFF"
          dataKey="primary_line"
          data={min}
          {...accessors}
        />
        <AnimatedLineSeries
          stroke="#FF0000"
          dataKey="secondary_line"
          data={max}
          {...accessors}
        />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          glyphStyle={{
            fill: 'grey',
            strokeWidth: 0,
          }}
          renderTooltip={({ tooltipData }) => {
            return (
              <TooltipContainer>
                <TooltipText>
                  {format(
                    new Date(tooltipData.datumByKey.primary_line.datum.x),
                    'dd MMMM yyyy',
                  )}
                </TooltipText>
                <TooltipText max>
                  MAX TEMP: {tooltipData.datumByKey.secondary_line.datum.y}°C
                </TooltipText>
                <TooltipText min>
                  MIN TEMP: {tooltipData.datumByKey.primary_line.datum.y}°C
                </TooltipText>
              </TooltipContainer>
            );
          }}
        />
      </XYChart>
    </ChartContainer>
  );
}
