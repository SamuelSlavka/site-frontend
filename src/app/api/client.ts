type ApiRequestOptions = {
    [key: string]: any;
};

// const baseUrl = 'http://localhost:5000/api/'
// TODO: move to config or .env 
const baseUrl = 'https://sam-sla.net/api/'

export async function client(endpoint: string, options?: ApiRequestOptions) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: options?.body ? 'POST' : 'GET',
    ...options?.customConfig,
    headers: {
      ...headers,
      ...options?.customConfig?.headers,
    },
  }
  if (options?.body) {
    config.body = JSON.stringify(options?.body)
  }

  let data
  try {
    const response = await window.fetch(`${baseUrl}${endpoint}`, config)
    data = await response.json()
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    console.error(err)
    return Promise.reject(err?.message ? err?.message : data)
  }
}

client.get = function (endpoint: string, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}
