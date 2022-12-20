import BarChart from 'components/BarChart';
import LineChart from 'components/LineChart';
import OpenStreetMap from 'components/OpenStreetMap';
import PieChart from 'components/PieChart';
import { Spinner } from 'components/Spinner/Spinner';
import useGetWeatherData from 'hooks/useGetWeatherData.hook';
import {
  ErrorText,
  WeatherChartsContainer,
  WeatherTitle,
  WeatherWrapper,
} from './styles';

function Weather() {
  const {
    minMaxTempData,
    windSpeed,
    windDirectory,
    cityName,
    error,
    loading,
    data,
  } = useGetWeatherData();

  return (
    <WeatherWrapper>
      <WeatherTitle>Get info about weather in your region</WeatherTitle>
      <OpenStreetMap cityName={cityName} />
      {!data && !error && loading ? (
        <Spinner />
      ) : (
        <WeatherChartsContainer>
          {minMaxTempData && windSpeed && windDirectory ? (
            <>
              <LineChart data={minMaxTempData} />
              <BarChart data={windSpeed} />
              <PieChart data={windDirectory} />
            </>
          ) : (
            <ErrorText>{error}</ErrorText>
          )}
        </WeatherChartsContainer>
      )}
    </WeatherWrapper>
  );
}
export default Weather;
