/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { Tooltip, useTooltip, defaultStyles } from '@visx/tooltip';
import { format } from 'date-fns';
import { ChartContainer } from './styles';

const letters = [
  { letter: 'N', frequency: 0.0625, fullName: 'north wind (N)' },
  { letter: 'NNE', frequency: 0.0625, fullName: 'north-northeast wind (NNE)' },
  { letter: 'NE', frequency: 0.0625, fullName: 'northeast wind (NE)' },
  { letter: 'ENE', frequency: 0.0625, fullName: 'east-northeast wind (ENE)' },
  { letter: 'E', frequency: 0.0625, fullName: 'east wind (E)' },
  { letter: 'ESE', frequency: 0.0625, fullName: 'east-southeast wind (ESE)' },
  { letter: 'SE', frequency: 0.0625, fullName: 'southeast wind (SE)' },
  { letter: 'SSE', frequency: 0.0625, fullName: 'south-southeast wind (SSE)' },
  { letter: 'S', frequency: 0.0625, fullName: 'south wind (S)' },
  { letter: 'SSW', frequency: 0.0625, fullName: 'south-southwest wind (SSW)' },
  { letter: 'SW', frequency: 0.0625, fullName: 'southwest wind (SW)' },
  { letter: 'WSW', frequency: 0.0625, fullName: 'west-southwest wind (WSW)' },
  { letter: 'W', frequency: 0.0625, fullName: 'west wind (W)' },
  { letter: 'WNW', frequency: 0.0625, fullName: 'west-northwest wind (WNW)' },
  { letter: 'NW', frequency: 0.0625, fullName: 'north-northwest wind (NNW)' },
  { letter: 'NNW', frequency: 0.0625, fullName: 'northeast wind (NE)' },
];

const frequency = (d) => d.frequency;

const getLetterFrequencyColor = scaleOrdinal({
  domain: letters.map((l) => l),
  range: [
    'rgb(25,25,112)',
    'rgb(0,0,128)',
    'rgb(0,0,139)',
    'rgb(0,0,205)',
    'rgb(30,144,255)',
    'rgb(0,191,255)',
    'rgb(135,206,250)',
    'rgb(173,216,230)',
    'rgb(173,216,230)',
    'rgb(135,206,250)',
    'rgb(0,191,255)',
    'rgb(30,144,255)',
    'rgb(0,0,205)',
    'rgb(0,0,139)',
    'rgb(0,0,128)',
    'rgb(25,25,112)',
  ],
});

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export default function PieChart({
  width = 420,
  height = 400,
  margin = defaultMargin,
  data,
}) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  const pieSortValues = (a, b) => b - a;

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  let tooltipTimeout;

  const onMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip();
    }, 100);
  }, [hideTooltip]);

  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    minHeight: 40,
    backgroundColor: '#fff',
    color: '#84BCEF',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <ChartContainer>
      <svg width={width} height={height}>
        <Group top={top} left={left}>
          <Pie
            data={letters}
            pieValue={frequency}
            pieSortValues={pieSortValues}
            outerRadius={radius}
          >
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                const { letter } = arc.data;
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                const arcPath = pie.path(arc);
                const arcFill = getLetterFrequencyColor(letter);
                return (
                  <g key={`arc-${letter}-${index}`}>
                    <path
                      d={arcPath}
                      fill={arcFill}
                      onMouseLeave={onMouseLeave}
                      onMouseMove={(event) => {
                        if (tooltipTimeout) {
                          clearTimeout(tooltipTimeout);
                        }
                        showTooltip({
                          tooltipData: arc.data,
                          tooltipTop: event.clientY,
                          tooltipLeft: event.clientX,
                        });
                      }}
                    />
                    {hasSpaceForLabel && (
                      <text
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fill="#ffffff"
                        fontSize={14}
                        textAnchor="middle"
                      >
                        {arc.data.letter}
                      </text>
                    )}
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div>{tooltipData.fullName.toUpperCase()}:</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {data
              .filter((day) => day.dir === tooltipData.letter)
              .map((item) => {
                return <div>{format(new Date(item.date), 'dd MMMM yyyy')}</div>;
              })}
          </div>
        </Tooltip>
      )}
    </ChartContainer>
  );
}
