import request from "@/utils/request";

export function getBanksApi(query) {
  return request({
    url: "/api/v1/banks",
    method: "get",
    params: query
  });
}

export function getListBanksApi() {
  return request({
    url: "/api/v1/list-banks",
    method: "get"
  });
}

export function getDetailBankApi(id) {
  return request({
    url: `/api/v1/banks/${id}/edit`,
    method: "get"
  });
}

export function createBankApi(data) {
  return request({
    url: "/api/v1/banks",
    method: "post",
    data: data
  });
}

export function destroysBank(id) {
  return request({
    url: `/api/v1/banks/${id}`,
    method: "delete"
  });
}

export function editBank(id, data) {
  return request({
    url: `api/v1/banks/${id}`,
    method: "put",
    data: data
  });
}
