import { HttpClient } from './HttpClient';

function getSupportedTokens(tokenId) {
  return HttpClient.get('/api/v1/tokens', { params: { tokenId } }).then(
    (response) => response.tokens
  );
}

export const ConfigService = {
  getSupportedTokens,
};
