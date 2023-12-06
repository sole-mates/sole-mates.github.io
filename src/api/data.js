import { getUserData } from "../views/utils.js";
import { get, post, put, del } from "./api.js";

const endpoints = {
  shoes: '/classes/shoes'
};

export function getAllItems() {
  return get(endpoints.shoes);
}
export function getItemById(id) {
  return get(`${endpoints.shoes}/${id}`
  )
}
export function createShoe(data) {
  const user = getUserData()
  data.ownerId = {
    __type: 'Pointer',
    className: '_User',
    objectId: user.objectId
  }
  return post(endpoints.shoes, data);
}
export function deleteShoe(id) {
  return del(`${endpoints.shoes}/${id}`)
}
export function editShoeById(itemId, data) {
  return put(`${endpoints.shoes}/${itemId}`, data)
}
export function searchByQuery(query) {
  return get(`${endpoints.shoes}?where={"$or":[{"brand":{"$regex": "^.*${query}.*$"}},{"model":{"$regex": "^.*${query}.*$"}}]}`)
}