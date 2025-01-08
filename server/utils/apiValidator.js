import axios from 'axios';

export async function validateApiCall(response) {
  try {
    // Extract curl command from the response
    const curlMatch = response.match(/```bash\n(curl.+?)```/s);
    if (!curlMatch) return { error: null };

    const curlCommand = curlMatch[1];
    
    // Parse curl command to get the endpoint and body
    const urlMatch = curlCommand.match(/'https:\/\/api\.crustdata\.com([^']+)'/);
    const bodyMatch = curlCommand.match(/--data '({[^}]+})'/);
    
    if (!urlMatch || !bodyMatch) return { error: null };

    const endpoint = urlMatch[1];
    const body = JSON.parse(bodyMatch[1]);

    // Validate region format if present
    if (body.filters) {
      const regionFilter = body.filters.find(f => f.filter_type === 'REGION');
      if (regionFilter) {
        const regions = await axios.get('https://crustdata-docs-region-json.s3.us-east-2.amazonaws.com/updated_regions.json');
        const validRegions = regions.data;
        
        const invalidRegions = regionFilter.value.filter(r => !validRegions.includes(r));
        if (invalidRegions.length > 0) {
          return { error: `Invalid region values: ${invalidRegions.join(', ')}` };
        }
      }
    }

    return { error: null };
  } catch (error) {
    console.error('API validation error:', error);
    return { error: 'Failed to validate API call' };
  }
}