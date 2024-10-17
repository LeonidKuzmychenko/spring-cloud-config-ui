import axios, {Axios, type AxiosResponse} from 'axios';
import type {Property} from "~/types/property";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/github',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    async getFiles():Promise<AxiosResponse<Property[]>> {
        return await apiClient.get('/configs/files');
    },
    async getFile(fileName: String):Promise<AxiosResponse<Property>> {
        const config = {
            params: {
                fileName: fileName,
            }
        }
        return await apiClient.get('/configs/file', config);
    },

    async edit(name: string, content: string, sha: string):Promise<AxiosResponse<Property>> {
        const config = {
            params: {
                fileName: name,
                sha: sha,
            },
            headers: {"Content-Type": "text/plain"},
        }
        return await apiClient.put(`/edit`, content, config);
    }

}
