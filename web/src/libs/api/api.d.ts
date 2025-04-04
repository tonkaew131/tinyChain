export interface paths {
    '/swagger/all-json': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getSwaggerAll-json'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/project/': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getProject'];
        put?: never;
        post: operations['postProject'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/project/{id}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getProjectById'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/project/{id}/thumbnail': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getProjectByIdThumbnail'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/project/{id}/token': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getProjectByIdToken'];
        put?: never;
        /** Add a token to the project */
        post: operations['postProjectByIdToken'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/project/{id}/token/{tokenId}/buy': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['postProjectByIdTokenByTokenIdBuy'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/developer/': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getDeveloper'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/developer/stats': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getDeveloperStats'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/payment/add': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['postPaymentAdd'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/payment/remove': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['postPaymentRemove'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/admin/destroy-expired-tokens': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['postAdminDestroy-expired-tokens'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/transaction/all': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getTransactionAll'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/transaction/my': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getTransactionMy'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getIndex'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    'getSwaggerAll-json': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProject: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            id: string;
                            type:
                                | 'agriculture'
                                | 'forestry'
                                | 'livestock'
                                | 'renewable'
                                | 'conservation';
                            name: string;
                            location: string;
                            description: string;
                            developerId: string;
                            createdAt: Record<string, never>;
                            updatedAt: Record<string, never>;
                            developer: string;
                            soldTokens: number;
                            unsoldTokens: number;
                        }[];
                    };
                    'multipart/form-data': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            id: string;
                            type:
                                | 'agriculture'
                                | 'forestry'
                                | 'livestock'
                                | 'renewable'
                                | 'conservation';
                            name: string;
                            location: string;
                            description: string;
                            developerId: string;
                            createdAt: Record<string, never>;
                            updatedAt: Record<string, never>;
                            developer: string;
                            soldTokens: number;
                            unsoldTokens: number;
                        }[];
                    };
                    'text/plain': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            id: string;
                            type:
                                | 'agriculture'
                                | 'forestry'
                                | 'livestock'
                                | 'renewable'
                                | 'conservation';
                            name: string;
                            location: string;
                            description: string;
                            developerId: string;
                            createdAt: Record<string, never>;
                            updatedAt: Record<string, never>;
                            developer: string;
                            soldTokens: number;
                            unsoldTokens: number;
                        }[];
                    };
                };
            };
        };
    };
    postProject: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': {
                    type?:
                        | 'agriculture'
                        | 'forestry'
                        | 'livestock'
                        | 'renewable'
                        | 'conservation';
                    name: string;
                    location: string;
                    description?: string;
                    /**
                     * Format: binary
                     * @default File
                     */
                    thumbnail: File;
                };
                'multipart/form-data': {
                    type?:
                        | 'agriculture'
                        | 'forestry'
                        | 'livestock'
                        | 'renewable'
                        | 'conservation';
                    name: string;
                    location: string;
                    description?: string;
                    /**
                     * Format: binary
                     * @default File
                     */
                    thumbnail: File;
                };
                'text/plain': {
                    type?:
                        | 'agriculture'
                        | 'forestry'
                        | 'livestock'
                        | 'renewable'
                        | 'conservation';
                    name: string;
                    location: string;
                    description?: string;
                    /**
                     * Format: binary
                     * @default File
                     */
                    thumbnail: File;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProjectById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            id: string;
                            type:
                                | 'agriculture'
                                | 'forestry'
                                | 'livestock'
                                | 'renewable'
                                | 'conservation';
                            name: string;
                            location: string;
                            description: string;
                            developerId: string;
                            createdAt: Record<string, never>;
                            updatedAt: Record<string, never>;
                            developer: string;
                            developerJoinedAt:
                                | Record<string, never>
                                | string
                                | number;
                        };
                    };
                    'multipart/form-data': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            id: string;
                            type:
                                | 'agriculture'
                                | 'forestry'
                                | 'livestock'
                                | 'renewable'
                                | 'conservation';
                            name: string;
                            location: string;
                            description: string;
                            developerId: string;
                            createdAt: Record<string, never>;
                            updatedAt: Record<string, never>;
                            developer: string;
                            developerJoinedAt:
                                | Record<string, never>
                                | string
                                | number;
                        };
                    };
                    'text/plain': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            id: string;
                            type:
                                | 'agriculture'
                                | 'forestry'
                                | 'livestock'
                                | 'renewable'
                                | 'conservation';
                            name: string;
                            location: string;
                            description: string;
                            developerId: string;
                            createdAt: Record<string, never>;
                            updatedAt: Record<string, never>;
                            developer: string;
                            developerJoinedAt:
                                | Record<string, never>
                                | string
                                | number;
                        };
                    };
                };
            };
        };
    };
    getProjectByIdThumbnail: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProjectByIdToken: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            id: string;
                            tokenId: number | null;
                            projectId: string;
                            name: string;
                            amount: string;
                            unsoldAmount: string;
                            pricePerToken: string;
                            startDate: Record<string, never>;
                            endDate: Record<string, never>;
                            createdAt: Record<string, never>;
                        }[];
                    };
                    'multipart/form-data': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            id: string;
                            tokenId: number | null;
                            projectId: string;
                            name: string;
                            amount: string;
                            unsoldAmount: string;
                            pricePerToken: string;
                            startDate: Record<string, never>;
                            endDate: Record<string, never>;
                            createdAt: Record<string, never>;
                        }[];
                    };
                    'text/plain': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            id: string;
                            tokenId: number | null;
                            projectId: string;
                            name: string;
                            amount: string;
                            unsoldAmount: string;
                            pricePerToken: string;
                            startDate: Record<string, never>;
                            endDate: Record<string, never>;
                            createdAt: Record<string, never>;
                        }[];
                    };
                };
            };
        };
    };
    postProjectByIdToken: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': {
                    name: string;
                    amount: string;
                    pricePerToken?: string;
                    startDate: Record<string, never>;
                    endDate: Record<string, never>;
                };
                'multipart/form-data': {
                    name: string;
                    amount: string;
                    pricePerToken?: string;
                    startDate: Record<string, never>;
                    endDate: Record<string, never>;
                };
                'text/plain': {
                    name: string;
                    amount: string;
                    pricePerToken?: string;
                    startDate: Record<string, never>;
                    endDate: Record<string, never>;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    postProjectByIdTokenByTokenIdBuy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                tokenId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': {
                    amount: number;
                };
                'multipart/form-data': {
                    amount: number;
                };
                'text/plain': {
                    amount: number;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            transactionHash: string;
                        };
                    };
                    'multipart/form-data': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            transactionHash: string;
                        };
                    };
                    'text/plain': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            transactionHash: string;
                        };
                    };
                };
            };
        };
    };
    getDeveloper: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getDeveloperStats: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            totalCarbonOffset: number;
                            activeCredits: number;
                            retiredCredits: number;
                            totalProjects: number;
                            revenue: number;
                        };
                    };
                    'multipart/form-data': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            totalCarbonOffset: number;
                            activeCredits: number;
                            retiredCredits: number;
                            totalProjects: number;
                            revenue: number;
                        };
                    };
                    'text/plain': {
                        /** @constant */
                        status: 'ok';
                        data: {
                            totalCarbonOffset: number;
                            activeCredits: number;
                            retiredCredits: number;
                            totalProjects: number;
                            revenue: number;
                        };
                    };
                };
            };
        };
    };
    postPaymentAdd: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': {
                    amount: number;
                };
                'multipart/form-data': {
                    amount: number;
                };
                'text/plain': {
                    amount: number;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @constant */
                        status: 'ok';
                    };
                    'multipart/form-data': {
                        /** @constant */
                        status: 'ok';
                    };
                    'text/plain': {
                        /** @constant */
                        status: 'ok';
                    };
                };
            };
        };
    };
    postPaymentRemove: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': {
                    amount: number;
                };
                'multipart/form-data': {
                    amount: number;
                };
                'text/plain': {
                    amount: number;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @constant */
                        status: 'ok';
                    };
                    'multipart/form-data': {
                        /** @constant */
                        status: 'ok';
                    };
                    'text/plain': {
                        /** @constant */
                        status: 'ok';
                    };
                };
            };
        };
    };
    'postAdminDestroy-expired-tokens': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getTransactionAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        id: string;
                        txId: string;
                        type: 'mint' | 'buy' | 'burn' | 'sell';
                        message: string;
                        userId: string;
                        createdAt: Record<string, never>;
                    }[];
                    'multipart/form-data': {
                        id: string;
                        txId: string;
                        type: 'mint' | 'buy' | 'burn' | 'sell';
                        message: string;
                        userId: string;
                        createdAt: Record<string, never>;
                    }[];
                    'text/plain': {
                        id: string;
                        txId: string;
                        type: 'mint' | 'buy' | 'burn' | 'sell';
                        message: string;
                        userId: string;
                        createdAt: Record<string, never>;
                    }[];
                };
            };
        };
    };
    getTransactionMy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        id: string;
                        txId: string;
                        type: 'mint' | 'buy' | 'burn' | 'sell';
                        message: string;
                        userId: string;
                        createdAt: Record<string, never>;
                    }[];
                    'multipart/form-data': {
                        id: string;
                        txId: string;
                        type: 'mint' | 'buy' | 'burn' | 'sell';
                        message: string;
                        userId: string;
                        createdAt: Record<string, never>;
                    }[];
                    'text/plain': {
                        id: string;
                        txId: string;
                        type: 'mint' | 'buy' | 'burn' | 'sell';
                        message: string;
                        userId: string;
                        createdAt: Record<string, never>;
                    }[];
                };
            };
        };
    };
    getIndex: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
