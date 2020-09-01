import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalize3HoursFixture from '@test/fixtures/stormglass_normalize_response_3_hours.json';

jest.mock('axios');
describe('StormGlass client', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    it('Should return the normalized forecast from the StormGlass service', async () => {
        const lat = -33.792726;
        const lng = 151.797876;

        mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3HoursFixture });

        const stormGlass = new StormGlass(mockedAxios);
        const response = await stormGlass.fetchPoints(lat, lng);

        expect(response).toEqual(stormGlassNormalize3HoursFixture);
    });
});