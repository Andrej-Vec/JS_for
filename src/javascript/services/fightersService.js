import { callApi } from '../helpers/apiHelper';

class FighterService {
  #endpoint = 'fighters.json';

  async getFighters() {
    try {
      const apiResult = await callApi(this.#endpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  //У класі FighterService створити метод для отримання детальної інформації про бійця.
  async getFighterDetails(id) {
    const endpoint = `details/fighter/${id}.json`;
    try {
      const fighterInfo = await callApi(endpoint);
      return fighterInfo;
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
