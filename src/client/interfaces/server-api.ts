export interface SaveProjectInput {
    privateDesignId: string, 
    userId: string, 
    orderId: string 
}

export interface GetProductInfoOutput {
    tenantId: number,
    productId: string,
    cchubApiGatewayUrl: string,
    storefrontId: number
}