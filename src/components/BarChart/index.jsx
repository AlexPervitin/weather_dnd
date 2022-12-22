import { Axis } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Tooltip, useTooltip, defaultStyles } from '@visx/tooltip';
import { Bar } from '@visx/shape';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { ChartContainer, SpeedInfo } from './styles';

function BarChart(props) {
  const { height = 400, width = 420, data } = props;

  const HOVER_OUTLINE_WIDTH = 3;

  const getDate = ({ date }) => format(new Date(date), 'MMM dd');

  const getSpeed = ({ speed }) => speed;

  const margin = { top: 50, left: 50, bottom: 50, right: 50 };

  let tooltipTimeout;

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    minHeight: 40,
    backgroundColor: '#fff',
    color: '#84BCEF',
    display: 'flex',
    flexDirection: 'column',
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, innerWidth],
        round: true,
        domain: data?.map(getDate),
        padding: 0.4,
      }),
    [innerWidth],
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        round: true,
        domain: [0, Math.max(...data.map(getSpeed))],
      }),
    [innerHeight, data],
  );

  const onMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip();
    }, 100);
  }, [hideTooltip]);

  return (
    <ChartContainer>
      <svg height={height} width={width}>
        <GridRows
          stroke="#84BCEF"
          width={innerWidth}
          scale={yScale}
          numTicks={4}
          left={margin.left}
          top={margin.top}
        />
        <Axis
          hideTicks
          hideAxisLine
          orientation="bottom"
          scale={xScale}
          left={margin.left}
          top={height - margin.bottom}
        />
        <Axis
          left={margin.left / 2}
          top={margin.top}
          hideAxisLine
          hideTicks
          numTicks={4}
          orientation="left"
          scale={yScale}
        />
        <Group top={margin.top} left={margin.left}>
          {data?.map((d) => {
            const letter = getDate(d);
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - (yScale(getSpeed(d)) ?? 0);
            const barX = xScale(letter);
            const barY = innerHeight - barHeight;

            return (
              <g key={`bar-${letter}`}>
                {tooltipData === d ? (
                  <Bar
                    x={(barX || 0) - HOVER_OUTLINE_WIDTH}
                    y={barY - HOVER_OUTLINE_WIDTH}
                    opacity={0.25}
                    width={barWidth + 2 * HOVER_OUTLINE_WIDTH}
                    height={barHeight + HOVER_OUTLINE_WIDTH}
                    fill="#84BCEF"
                  />
                ) : null}
                <Bar
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="#84BCEF"
                  onMouseLeave={onMouseLeave}
                  onMouseMove={(event) => {
                    if (tooltipTimeout) {
                      clearTimeout(tooltipTimeout);
                    }
                    showTooltip({
                      tooltipData: d,
                      tooltipTop: event.clientY,
                      tooltipLeft: event.clientX,
                    });
                  }}
                />
              </g>
            );
          })}
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div>{format(new Date(tooltipData.date), 'dd MMMM yyyy')}</div>
          <SpeedInfo>Wind speed: {tooltipData.speed} m/s</SpeedInfo>
        </Tooltip>
      )}
    </ChartContainer>
  );
}

export default BarChart;
