import library from './library'

export interface Transformer {
  (data: any, headers?: any): any
}

export interface ProxyConfig {
  host: string
  port: number
  auth?: {
    username: string
    password: string
  }
  protocol?: string
}

export interface RequestConfig {
  url?: string
  method?: string
  baseURL?: string
  transformRequest?: Transformer | Transformer[]
  transformResponse?: Transformer | Transformer[]
  headers?: any
  params?: any
  paramsSerializer?: (params: any) => string
  data?: any
  timeout?: number
  timeoutErrorMessage?: string
  withCredentials?: boolean
  adapter?: any
  auth?: Record<string, string>
  responseType?: ResponseType
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onUploadProgress?: (progressEvent: any) => void
  onDownloadProgress?: (progressEvent: any) => void
  maxContentLength?: number
  validateStatus?: ((status: number) => boolean) | null
  maxBodyLength?: number
  maxRedirects?: number
  socketPath?: string | null
  httpAgent?: any
  httpsAgent?: any
  proxy?: ProxyConfig | false
  decompress?: boolean
}

export interface Response<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: RequestConfig
  request?: any
}

export interface ResponseError<T = any> extends Error {
  config: RequestConfig
  code?: string
  request?: any
  response?: Response<T>
  isAxiosError: boolean
  toJSON: () => object
}

export interface InitConfig {
  accessToken: string
  endpoint: string
  interceptors?: {
    request?: {
      before?: (config: RequestConfig) => void
      error?: (error: ResponseError) => void
    }
    response?: {
      before?: (config: RequestConfig) => void
      error?: (error: ResponseError) => void
    }
  }
}

export interface Init {
  ({ accessToken, endpoint }: InitConfig): void
}

const init: Init = ({
  accessToken,
  endpoint,
  interceptors,
}: InitConfig): void => {
  library.baseUrl = `${endpoint}/api/`
  library.headers = {
    Authorization: `Bearer ${accessToken}`,
  }
  library.customInterceptors = interceptors
}

export default init
