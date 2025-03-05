import { CCHubConfiguration } from "./cchub-configuration.js";
import axios, { AxiosResponse } from 'axios';
import { ApiClientConfiguration, StorefrontUsersApiClient, StorefrontUserDto, ProjectsApiClient, CreateProjectByRenderHiResScenarioDto, RenderHiResScenarioOutputColorSpace, RenderHiResScenarioOutputFormat, RenderHiResScenarioOutputFlipMode } from "@aurigma/axios-storefront-api-client";


interface AuthClientGrantResponse {
    "access_token": string,
    "expires_in": number,
    "token_type": string,
    "scope": string
}


export class CCHubService {

    private config: CCHubConfiguration;

    constructor(config: CCHubConfiguration) {
        this.config = config;
    }

    /**
     * Gets a special API token which can be used from the frontend without exposing the full access token.
     * 
     * Refer https://customerscanvas.com/dev/backoffice/concepts/storefront-users.html for explanation. 
     * 
     * @param userId An ID of a user from your system.
     * @returns A token which can be used on a storefront (not the same as the OAuth2 access token!)
     */
    public async getStorefrontToken(userId: string) {
        const storefrontUsersApiClient = await this.initStorefrontUsersApiClient();

        const user = await this.getOrCreateStorefrontUser(userId, storefrontUsersApiClient);
        return storefrontUsersApiClient.getToken(user.userId ?? userId, this.config.storefrontId);
    }

    /**
     * Submits a "project" to Customer's Canvas to start print file rendering process.
     * 
     * See these articles for details:
     * https://customerscanvas.com/dev/backoffice/concepts/projects.html
     * https://customerscanvas.com/dev/backoffice/howto/processing-personalization-results.html
     * https://customerscanvas.com/dev/backoffice/howto/rendering-print-files.html 
     * https://customerscanvas.com/dev/backoffice/howto/download-artifacts.html
     * 
     * @param privateDesignId An ID of a design created by the user.
     * @param userId A user ID, the same as you used to create a storefront token.
     * @param orderId An order ID in your system this project is created for.
     * @returns A project DTO.
     */
    public async saveProjectInCCHub(privateDesignId: string, userId: string, orderId: string) {
        const projectsApiClient = await this.initProjectsApiClient();

        const createProjectDto: CreateProjectByRenderHiResScenarioDto = {
            ownerId: userId,
            name: "Project for Order #" + orderId,
            orderDetails: {
                orderId: orderId,
                customerId: userId,
                customerName: "Johnny Appleseed"
            },
            scenario: {
                designId: privateDesignId,
                anonymousAccess: true,
                colorSpace: RenderHiResScenarioOutputColorSpace.Cmyk,
                dpi: 300,
                flipMode: RenderHiResScenarioOutputFlipMode.None,
                format: RenderHiResScenarioOutputFormat.Pdf
            }
        };
        console.log(createProjectDto);
        return await projectsApiClient.createByRenderHiResScenario(this.config.storefrontId, null, createProjectDto)
    }

    /**
     * Get storefront user registered in Customer's Canvas based on ID from your system. Creates
     * a user if it does not exist in Customer's Canvas yet.
     * 
     * Refer https://customerscanvas.com/dev/backoffice/howto/register-customers.html?tabs=js for details.
     *  
     * @param userId An ID of a user from your system.
     * @param storefrontUsersApiClient An API client.
     * @returns A user DTO.
     */
    private async getOrCreateStorefrontUser(userId: string, storefrontUsersApiClient: StorefrontUsersApiClient) {
        try {
            return await storefrontUsersApiClient.get(userId, this.config.storefrontId);
        }
        catch (e) {
            const createUserDto = { isAnonymous: true, storefrontUserId: userId };
            return await storefrontUsersApiClient.create(this.config.storefrontId, null, createUserDto);
        }
    }

    /**
     * Initializes the API Client for StorefrontUsers. 
     * 
     * Refer readme.MD in the @aurigma/axios-storefront-api-client package (e.g. in node_modules).
     * 
     * @returns API client for StorefrontUsers controller.
     */
    private async initStorefrontUsersApiClient(): Promise<StorefrontUsersApiClient> {
        const apiClientConfig = await this.initApiClientConfiguration("StorefrontUsers_full");
        
        return new StorefrontUsersApiClient(apiClientConfig);
    }

        /**
     * Initializes the API Client for ProjectsApiClient. 
     * 
     * Refer readme.MD in the @aurigma/axios-storefront-api-client package (e.g. in node_modules).
     * 
     * @returns API client for StorefrontUsers controller.
     */
        private async initProjectsApiClient(): Promise<ProjectsApiClient> {
            const apiClientConfig = await this.initApiClientConfiguration("Projects_full Private_assets_full");
            
            return new ProjectsApiClient(apiClientConfig);
        }
    
    /**
     * Initializes API Client configuration. 
     * 
     * @param scope  Access token scope (i.e. permissions). 
     * @returns An API Configuration object which can be used to init API Clients for all controllers.
     */
    private async initApiClientConfiguration(scope: string) {
        const accessToken = await this.getAccessToken(scope);

        const apiClientConfig = new ApiClientConfiguration();
        apiClientConfig.setAuthorizationToken(accessToken);
        apiClientConfig.apiUrl = this.config.apiUrl;

        return apiClientConfig;
    }
    

    /**
     * Receives Customer's Canvas access token through OAuth2 Client Credentials flow. 
     * 
     * Refer [Auth docs](https://customerscanvas.com/dev/backoffice/auth.html#requesting-an-access-token-for-the-client-credentials-flow) for details. 
     * 
     * @param scope Access token scope (i.e. permissions). Refer Discovery document for available values (see the Auth article).
     * @returns An access token for a specific Client Credentials configured in Customer's Canvas.
     */
    private async getAccessToken(scope: string): Promise<string> {
        const authUrl = `${this.config.baseUrl}/connect/token`;

        try {
            const response: AxiosResponse<AuthClientGrantResponse> = await axios.post(
                authUrl,
                {
                    "client_id": this.config.clientId,
                    "client_secret": this.config.clientSecret,
                    "grant_type": "client_credentials",
                    "scope": scope
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );   

            return response.data.access_token;
        } catch (e) {
            throw new Error(`Failed to authenticate. Server responded - ${e}`);
            
        }
    }
}
