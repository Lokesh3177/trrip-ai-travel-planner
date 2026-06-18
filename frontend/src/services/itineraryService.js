import api from "../api/axios";

/**
 * Fetch all itineraries for the logged-in user
 */
export const getItineraries = async () => {
  const response = await api.get("/itineraries");
  return response;
};

/**
 * Fetch a single specific itinerary by its ID or Share Token
 */
export const getItineraryById = async (id) => {
  // Uses the configured instance 'api' uniformly instead of breaking on raw undefined 'axios'
  const response = await api.get(`/itineraries/${id}`);
  return response;
};

/**
 * Delete a specific itinerary by its ID
 */
export const deleteItinerary = async (id) => {
  const response = await api.delete(`/itineraries/${id}`);
  return response;
};