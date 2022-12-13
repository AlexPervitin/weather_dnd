import styled from 'styled-components';

export const ChartContainer = styled.div`
  width: 100%;
  max-width: 420px;
  max-height: 400px;
  background: #fff;
  border-radius: 20px;

  .visx-axis-tick {
    text {
      font-size: 12px;
      font-weight: 400;
      fill: #666666;
    }
  }
`;

export const TooltipContainer = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 4px;
  color: #222222;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TooltipText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => (props.min ? '#00BFFF' : props.max ? '#FF0000' : '#000')};
`;
