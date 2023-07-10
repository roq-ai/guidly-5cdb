import axios from 'axios';
import queryString from 'query-string';
import {
  GuidedSellingSolutionInterface,
  GuidedSellingSolutionGetQueryInterface,
} from 'interfaces/guided-selling-solution';
import { GetQueryInterface } from '../../interfaces';

export const getGuidedSellingSolutions = async (query?: GuidedSellingSolutionGetQueryInterface) => {
  const response = await axios.get(`/api/guided-selling-solutions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGuidedSellingSolution = async (guidedSellingSolution: GuidedSellingSolutionInterface) => {
  const response = await axios.post('/api/guided-selling-solutions', guidedSellingSolution);
  return response.data;
};

export const updateGuidedSellingSolutionById = async (
  id: string,
  guidedSellingSolution: GuidedSellingSolutionInterface,
) => {
  const response = await axios.put(`/api/guided-selling-solutions/${id}`, guidedSellingSolution);
  return response.data;
};

export const getGuidedSellingSolutionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/guided-selling-solutions/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteGuidedSellingSolutionById = async (id: string) => {
  const response = await axios.delete(`/api/guided-selling-solutions/${id}`);
  return response.data;
};
