import styled from 'styled-components';

export const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 25px;
  padding-bottom: 120px;
`;

export const WeatherTitle = styled.div`
  color: #fff;
  font-size: 20px;
  margin-bottom: 15px;
`;

export const WeatherChartsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 24px;
  text-align: center;
`;
