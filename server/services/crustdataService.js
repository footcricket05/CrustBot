import axios from 'axios';
import { CRUSTDATA_CONFIG } from '../config/crustdata.js';

class CrustdataService {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.regions = null;
  }

  async initialize() {
    try {
      const response = await axios.get(CRUSTDATA_CONFIG.REGIONS_URL);
      this.regions = response.data;
    } catch (error) {
      console.error('Failed to fetch regions:', error);
      this.regions = [];
    }
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.apiToken}`
    };
  }

  async validateRegions(regions) {
    if (!this.regions) await this.initialize();
    const invalidRegions = regions.filter(r => !this.regions.includes(r));
    if (invalidRegions.length > 0) {
      throw new Error(`Invalid regions: ${invalidRegions.join(', ')}`);
    }
    return true;
  }

  async validateApiCall(curlCommand) {
    try {
      // Extract regions from curl command if present
      const regionMatch = curlCommand.match(/"filter_type":\s*"REGION"[^}]+?"value":\s*\[(.*?)\]/);
      if (regionMatch) {
        const regions = JSON.parse(`[${regionMatch[1]}]`);
        await this.validateRegions(regions);
      }
      return { isValid: true };
    } catch (error) {
      return { 
        isValid: false, 
        error: error.message,
        validRegions: this.regions 
      };
    }
  }

  async searchPeople(filters) {
    const response = await axios.post(
      `${CRUSTDATA_CONFIG.BASE_URL}${CRUSTDATA_CONFIG.ENDPOINTS.PERSON_SEARCH}`,
      { filters, page: 1 },
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async enrichPerson(email) {
    const response = await axios.post(
      `${CRUSTDATA_CONFIG.BASE_URL}${CRUSTDATA_CONFIG.ENDPOINTS.PERSON_ENRICH}`,
      { email },
      { headers: this.getHeaders() }
    );
    return response.data;
  }
}