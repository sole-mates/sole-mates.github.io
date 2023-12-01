import { get, post, put, del } from "./api.js";

const endpoints = {
  allItems: "/data/shoes?sortBy=_createdOn%20desc",
  shoes: '/data/shoes/',
  create: '/data/shoes'
};

export function getAllItems() {
  return get(endpoints.allItems);
}
export function getItemById(id) {
  return get(`${endpoints.shoes}${id}`
  )
}
export function createShoe(data) {
  return post(endpoints.create, data);
}
export function deleteShoe(id) {
  return del(`${endpoints.shoes}${id}`)
}
export function editShoeById(itemId, data) {
  return put(`${endpoints.shoes}${itemId}`, data)
}
export function searchByQuery(query) {
  return get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`)
}




export function getAllMembers() {
  return get(endpoints.allMembers);
}
export function getAllMembersInTeam(teamId) {
  return get(`/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`)
}


export function getMemberById(id) {
  return get(`/data/members/${id}`)
}

export function joinTeam(teamId) {
  return post('/data/members', { teamId })
}

export function approveMember(memberId) {
  return put(`/data/members/${memberId}`, { status: 'member' })
}

export function removeMember(memberId) {
  return del(`/data/members/${memberId}`)
}
