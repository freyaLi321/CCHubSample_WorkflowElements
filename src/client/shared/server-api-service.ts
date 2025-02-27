import axios, { AxiosResponse } from "axios";
import { GetProductInfoOutput, SaveProjectInput } from "../interfaces/server-api";
import { ProjectDto } from "@aurigma/axios-storefront-api-client";

export class ServerApiService {

    static getStartPersonalizationData = (userId: string) => Promise.all([
        ServerApiService.getToken(userId),
        ServerApiService.getProductInfo()
    ]);

    static getToken = async (userId: string): Promise<string> => {
        const response: AxiosResponse<{ storefrontUserToken: string }> = await axios.get(`/api/get-token/${userId}`);
        const token = response?.data?.storefrontUserToken;
        return token;
    };

    static getProductInfo = async (): Promise<GetProductInfoOutput> => {
        const response: AxiosResponse<GetProductInfoOutput> = await axios.get(`/api/get-product-info/`);
        return response?.data;
    };

    static saveProject = async (body: SaveProjectInput): Promise<ProjectDto> => {
        const response: AxiosResponse<ProjectDto> = await axios.post("/api/save-project/", body);
        return response?.data;
    }
}