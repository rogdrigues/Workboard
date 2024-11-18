import { IRequest, IRequestSchema } from '@/types/IRequest';
import { BaseResponse, BaseResponseSchema } from '@/types/BaseResponse';
import queryString from 'query-string';

export const customFetch = async <T>(request: IRequest): Promise<BaseResponse> => {
    // Validate and parse the request using zod schema
    const parsedRequest = IRequestSchema.parse(request);

    let { url, method, body, headers, queryParams, useCredentials } = parsedRequest;

    try {
        // Prepare fetch options
        const options: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        };

        if (useCredentials) {
            options.credentials = 'include'; // Include credentials if needed
        }

        // Append query parameters to URL if present
        if (queryParams) {
            url = `${url}?${queryString.stringify(queryParams)}`;
        }

        // Make the fetch call
        const response = await fetch(url, options);

        if (response.ok) {
            // Parse successful response
            const data = (await response.json()) as T;
            const baseResponse = BaseResponseSchema.parse({
                EC: 0, // Assuming EC=0 means no error
                message: 'Success',
                data,
                metadata: null,
            });
            return baseResponse;
        } else {
            // Handle non-OK response
            const data = await response.json();
            return BaseResponseSchema.parse({
                EC: response.status,
                message: data?.message || 'Error',
                data: null,
                metadata: null,
            });
        }
    } catch (error: unknown) {
        // Handle network or unexpected errors
        const message = (error as Error).message || 'Cannot connect to the API';
        return {
            EC: 500,
            message,
            data: null,
            metadata: null,
        };
    }
};
