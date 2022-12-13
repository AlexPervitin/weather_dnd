import BarChart from 'components/BarChart';
import LineChart from 'components/LineChart';
import OpenStreetMap from 'components/OpenStreetMap';
import PieChart from 'components/PieChart';
import useGetWeatherData from 'hooks/useGetWeatherData.hook';
import { WeatherChartsContainer, WeatherTitle, WeatherWrapper } from './styles';

function Weather() {
  const { minMaxTempData, windSpeed, windDirectory, cityName, error } =
    useGetWeatherData();

  return (
    <WeatherWrapper>
      <WeatherTitle>Get info about weather in your region</WeatherTitle>
      <OpenStreetMap cityName={cityName} />
      <WeatherChartsContainer>
        {minMaxTempData && windSpeed && windDirectory ? (
          <>
            <LineChart data={minMaxTempData} />
            <BarChart data={windSpeed} />
            <PieChart data={windDirectory} />
          </>
        ) : (
          error
        )}
      </WeatherChartsContainer>
    </WeatherWrapper>
  );
}
export default Weather;
