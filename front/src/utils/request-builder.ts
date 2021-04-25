import { ParsedUrlQueryInput, stringify } from 'querystring';
import { getTokenName } from './get-token-name';

export type ResponseError = {
  statusCode: number;
  message: string;
  error: string;
};

type Methods = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * Builder para requisições HTTP
 * @typeparam T - Corpo da resposta (response)
 * @typeparam K - Corpo da requisição (payload). Opcional. Requerido apenas se usar `withBody`.
 */
export class RequestBuilder<T, K = undefined> {
  private headers = new Headers();

  private hasHeaders = true;

  private baseUrl = process.env.REACT_APP_BASE_URL;

  private url = '';

  private queryString = '';

  private errorMessage?: string;

  private dataChanger?: (e: T) => T;

  private body?: K;

  private method: Methods = 'GET';

  private static tryGetJson<J>(resp: Response) {
    return new Promise<J>((resolve) => {
      if (resp) {
        resp
          .json()
          .then((json: J) => resolve(json))
          .catch(() => resolve({} as J));
      } else {
        resolve({} as J);
      }
    });
  }

  /** Define o início da URL da requisição. Requerido. Ex.: `http://www.google.com/` */
  withBaseUrl(baseUrl: string): RequestBuilder<T, K> {
    this.baseUrl = baseUrl;
    return this;
  }

  /** Define a parte subsequente da URL da requisição */
  withUrl(url: string): RequestBuilder<T, K> {
    this.url = url;
    return this;
  }

  /** Define a query string da requisição */
  withQueryString<Q extends ParsedUrlQueryInput>(
    query: Q | string,
  ): RequestBuilder<T, K> {
    this.queryString =
      '?' + (typeof query === 'string' ? query : stringify(query));
    return this;
  }

  /** Define a mensagem de erro a ser lançada com `throw` caso backend não retorne nenhuma mensagem tratada. */
  withErrorMessage(errorMessage: string): RequestBuilder<T, K> {
    this.errorMessage = errorMessage;
    return this;
  }

  /** Define o verbo (`method`) da requisição. Padrão `GET`. */
  withMethod(method: Methods): RequestBuilder<T, K> {
    this.method = method;
    return this;
  }

  /** Método a ser executado para manipulação dos dados retornados do backend. */
  withDataChange(call: (e: T) => T): RequestBuilder<T, K> {
    this.dataChanger = call;
    return this;
  }

  /** Define o corpo (`body`) da requisição. */
  withBody(body: K): RequestBuilder<T, K> {
    this.body = body;
    return this;
  }

  async call(): Promise<T>;

  async call(options: {
    returnFullResponse: boolean;
  }): Promise<{ response: Response; json: T }>;

  /** Monta a requisição, dispara para o backend.
   *
   * @returns Uma `promise` de `T`.
   */
  async call(
    options: { returnFullResponse: boolean } = { returnFullResponse: false },
  ) {
    const { returnFullResponse } = options;
    if (this.baseUrl === undefined)
      throw new Error('baseUrl não foi definido no builder');

    this.headers.append('Content-Type', 'application/json;charset=UTF-8');
    const token = localStorage.getItem(getTokenName());
    if (token) this.headers.append('Authorization', `Bearer ${token}`);

    const init: RequestInit = { method: this.method };
    if (this.body !== undefined) init.body = JSON.stringify(this.body);
    if (this.hasHeaders) init.headers = this.headers;

    const response = await fetch(
      `${this.baseUrl}${this.url}${this.queryString}`,
      init,
    );

    if (!response.ok && !returnFullResponse) {
      const payload =
        response.json && ((await response.json()) as ResponseError);
      if (payload) {
        throw new Error(payload.message);
      } else {
        throw new Error(this.errorMessage + ' Status Code: ' + response.status);
      }
    }

    let json = await RequestBuilder.tryGetJson<T>(response);
    if (this.dataChanger) json = this.dataChanger(json);

    if (returnFullResponse) return { response, json };
    return json;
  }
}
