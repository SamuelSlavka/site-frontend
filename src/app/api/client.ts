

type ApiRequestOptions = {
    [key: string]: any;
};


export async function client(endpoint: string, options?: ApiRequestOptions) {
    const headers = { 'Content-Type': 'application/json' }
  
    const config = {
      method: options?.body ? 'POST' : 'GET',
      ...(options?.customConfig ?? []),
      headers: {
        ...headers,
        ...(options?.customConfig?.headers ?? []),
      },
    }
  
    if (options?.customConfig.body) {
        config.body = JSON.stringify(options?.customConfig.body)
    }
  
    let data
    try {
      const response = await window.fetch(endpoint, config)
      data = await response.json()
      if (response.ok) {
        return data
      }
      throw new Error(response.statusText)
    } catch (err: any) {
      return Promise.reject(err.message ? err.message : data)
    }
  }
  
  client.get = function (endpoint: string, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' })
  }
  
  client.post = function (endpoint: string, body: string, customConfig = {}) {
    return client(endpoint, { ...customConfig, body })
  }
  