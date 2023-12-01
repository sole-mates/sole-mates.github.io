import { get, post, put, del } from "./api.js";

const endpoints = {
  allItems: "/data/shoes?sortBy=_createdOn%20desc",
  shoes: '/data/shoes'
};

export function getAllItems() {
  return get(endpoints.allItems);
}
export function getItemById(id) {
  return get(`${endpoints.shoes}/${id}`
  )
}
export function createShoe(data) {
  return post(endpoints.shoes, data);
}
export function deleteShoe(id) {
  return del(`${endpoints.shoes}/${id}`)
}
export function editShoeById(itemId, data) {
  return put(`${endpoints.shoes}/${itemId}`, data)
}
export function searchByQuery(query) {
  return get(`${endpoints.shoes}?where=brand%20LIKE%20%22${query}%22`)
}