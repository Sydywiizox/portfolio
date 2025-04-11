import axios from "axios";

const PARSE_APPLICATION_ID = import.meta.env.VITE_PARSE_APPLICATION_ID;
const PARSE_REST_API_KEY = import.meta.env.VITE_PARSE_REST_API_KEY;
const PARSE_API_URL = "https://parseapi.back4app.com";

const parseAPI = axios.create({
  baseURL: PARSE_API_URL,
  headers: {
    "X-Parse-Application-Id": PARSE_APPLICATION_ID,
    "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
  },
});

export interface ProjectData {
  objectId?: string;
  title: string;
  githubLink: string;
  image: {
    name: string;
    url: string;
    __type: string;
  };
  description: string;
  skills: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const projectService = {
  async getProjects(): Promise<ProjectData[]> {
    try {
      const response = await parseAPI.get("/classes/project");
      console.log("Données reçues de Back4App:", response.data.results);
      return response.data.results;
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
      throw error;
    }
  },
};
