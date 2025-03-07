/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type RegisterDTO = object

export type LoginEmailDTO = object

export type LoginDTO = object

export type ConfirmationDto = object

export type UpdateUserDTO = object

export type NewPasswordDto = object

export type ResetPasswordDto = object

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean
	/** request path */
	path: string
	/** content type of request body */
	type?: ContentType
	/** query params */
	query?: QueryParamsType
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat
	/** request body */
	body?: unknown
	/** base url */
	baseUrl?: string
	/** request cancellation token */
	cancelToken?: CancelToken
}

export type RequestParams = Omit<
	FullRequestParams,
	'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<RequestParams | void> | RequestParams | void
	customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
	extends Response {
	data: D
	error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = 'https://sauschkin.ru:4000'
	private securityData: SecurityDataType | null = null
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
	private abortControllers = new Map<CancelToken, AbortController>()
	private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
		fetch(...fetchParams)

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	}

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig)
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data
	}

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key)
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key])
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key]
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {}
		const keys = Object.keys(query).filter(
			key => 'undefined' !== typeof query[key]
		)
		return keys
			.map(key =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key)
			)
			.join('&')
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery)
		return queryString ? `?${queryString}` : ''
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null &&
			(typeof input === 'object' || typeof input === 'string')
				? JSON.stringify(input)
				: input,
		[ContentType.Text]: (input: any) =>
			input !== null && typeof input !== 'string'
				? JSON.stringify(input)
				: input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key]
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
							? JSON.stringify(property)
							: `${property}`
				)
				return formData
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
	}

	protected mergeRequestParams(
		params1: RequestParams,
		params2?: RequestParams
	): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {})
			}
		}
	}

	protected createAbortSignal = (
		cancelToken: CancelToken
	): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken)
			if (abortController) {
				return abortController.signal
			}
			return void 0
		}

		const abortController = new AbortController()
		this.abortControllers.set(cancelToken, abortController)
		return abortController.signal
	}

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken)

		if (abortController) {
			abortController.abort()
			this.abortControllers.delete(cancelToken)
		}
	}

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === 'boolean'
				? secure
				: this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{}
		const requestParams = this.mergeRequestParams(params, secureParams)
		const queryString = query && this.toQueryString(query)
		const payloadFormatter =
			this.contentFormatters[type || ContentType.Json]
		const responseFormat = format || requestParams.format

		return this.customFetch(
			`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== ContentType.FormData
						? { 'Content-Type': type }
						: {})
				},
				signal:
					(cancelToken
						? this.createAbortSignal(cancelToken)
						: requestParams.signal) || null,
				body:
					typeof body === 'undefined' || body === null
						? null
						: payloadFormatter(body)
			}
		).then(async response => {
			const r = response.clone() as HttpResponse<T, E>
			r.data = null as unknown as T
			r.error = null as unknown as E

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then(data => {
							if (r.ok) {
								r.data = data
							} else {
								r.error = data
							}
							return r
						})
						.catch(e => {
							r.error = e
							return r
						})

			if (cancelToken) {
				this.abortControllers.delete(cancelToken)
			}

			if (!response.ok) throw data
			return data
		})
	}
}

/**
 * @title Sauschkin.ru API
 * @version 1.0.0
 * @baseUrl https://sauschkin.ru:4000
 * @contact Vadim Sauschkin <help@sauschkin.ru> (https://sauschkin.ru)
 *
 * This project is a backend for the sauschkin.ru. It is developed using modern technologies to ensure high performance, scalability, and ease of use.
 */
export class Api<
	SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
	auth = {
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerRegister
		 * @request POST:/auth/register
		 */
		authControllerRegister: (
			data: RegisterDTO,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/auth/register`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerLoginEmail
		 * @request POST:/auth/login_email
		 */
		authControllerLoginEmail: (
			data: LoginEmailDTO,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/auth/login_email`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerLogin
		 * @request POST:/auth/login
		 */
		authControllerLogin: (data: LoginDTO, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/login`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerCallback
		 * @request GET:/auth/oauth/callback/{provider}
		 */
		authControllerCallback: (
			provider: string,
			query: {
				code: string
			},
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/auth/oauth/callback/${provider}`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerConnect
		 * @request GET:/auth/oauth/connect/{provider}
		 */
		authControllerConnect: (provider: string, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/oauth/connect/${provider}`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerLogout
		 * @request POST:/auth/logout
		 */
		authControllerLogout: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/logout`,
				method: 'POST',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags EmailConfirmation
		 * @name EmailConfirmationControllerNewVerification
		 * @request POST:/auth/email-confirmation
		 */
		emailConfirmationControllerNewVerification: (
			data: ConfirmationDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/auth/email-confirmation`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags PasswordRecovery
		 * @name PasswordRecoveryControllerNewPaswword
		 * @request POST:/auth/password-recovery/new/{token}
		 */
		passwordRecoveryControllerNewPaswword: (
			token: string,
			data: NewPasswordDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/auth/password-recovery/new/${token}`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags PasswordRecovery
		 * @name PasswordRecoveryControllerResetPassword
		 * @request POST:/auth/password-recovery/reset
		 */
		passwordRecoveryControllerResetPassword: (
			data: ResetPasswordDto,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/auth/password-recovery/reset`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			})
	}
	users = {
		/**
		 * No description
		 *
		 * @tags User
		 * @name UserControllerFindProfile
		 * @request GET:/users/profile
		 */
		userControllerFindProfile: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/users/profile`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags User
		 * @name UserControllerUpdateProfile
		 * @request PATCH:/users/profile
		 */
		userControllerUpdateProfile: (
			data: UpdateUserDTO,
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/users/profile`,
				method: 'PATCH',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags User
		 * @name UserControllerFindById
		 * @request GET:/users/by-id/{id}
		 */
		userControllerFindById: (id: string, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/users/by-id/${id}`,
				method: 'GET',
				...params
			})
	}
	captcha = {
		/**
		 * No description
		 *
		 * @tags Captcha
		 * @name CaptchaControllerGenerateCaptcha
		 * @request GET:/captcha/generate
		 */
		captchaControllerGenerateCaptcha: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/captcha/generate`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Captcha
		 * @name CaptchaControllerValidateCaptcha
		 * @request GET:/captcha/validate
		 */
		captchaControllerValidateCaptcha: (
			query: {
				answer: string
				token: string
			},
			params: RequestParams = {}
		) =>
			this.request<void, any>({
				path: `/captcha/validate`,
				method: 'GET',
				query: query,
				...params
			})
	}
	swagger = {
		/**
		 * No description
		 *
		 * @tags Swagger
		 * @name SwaggerControllerGetJson
		 * @request GET:/swagger/json
		 */
		swaggerControllerGetJson: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/swagger/json`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags Swagger
		 * @name SwaggerControllerGetTypescript
		 * @request GET:/swagger/typescript
		 */
		swaggerControllerGetTypescript: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/swagger/typescript`,
				method: 'GET',
				...params
			})
	}
}
