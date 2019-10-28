import request from '@/utils/request';

export function getListPackageAPI(query) {
  return request({
    url: 'api/v1/packages',
    method: 'get',
    params: query,
  });
};

export function getPackageDetailsAPI(id) {
  // console.log(id);
  return request({
    url: 'api/v1/packages/' + id,
    method: 'get',
  });
};

export function addNewPackageAPI(data) {
  return request({
    url: 'api/v1/packages',
    method: 'post',
    data: data,
  });
}

export function editPackageAPI(id, data) {
  return request({
    url: `api/v1/packages/${id}`,
    method: 'put',
    data: data,
  });
}

export function deletePackageAPI(id) {
  return request({
    url: 'api/v1/packages/' + id,
    method: 'delete',
  });
};

export function saveOrders(data) {
  return request({
    url: 'api/v1/orders',
    method: 'post',
    data: data,
  });
}

export function orderDetail(orderId) {
  return request({
    url: `api/v1/orders/${orderId}/edit`,
    method: 'get',
  });
}

export function orderUpdate(data) {
  return request({
    url: `api/v1/orders/${data.id}`,
    method: 'put',
    data: data,
  });
}

export function getMethodPaymentApi() {
  return request({
    url: 'api/v1/methodpayments',
    method: 'get',
  });
}

export function getBanksApi() {
  return request({
    url: 'api/v1/list-banks',
    method: 'get',
  });
}

export function getOrderInfoApi() {
  return request({
    url: 'api/v1/order-info',
    method: 'get',
  });
}

export function sendOTPBuyPackage(query) {
  return request({
    url: 'api/v1/send_otp_buy_package',
    method: 'get',
    params: query,
  });
}

export function verifyOTPBuyPackage(data) {
  return request({
    url: `api/v1/verify_otp_buy_package`,
    method: 'post',
    data: data,
  });
}

export function cancelCurrentPackage(query) {
  return request({
    url: `api/v1/cancel_current_package`,
    method: 'get',
    data: query,
  });
}

export function getAllTransaction(query) {
  return request({
    url: 'api/v1/get_all_transaction',
    method: 'get',
    params: query,
  });
}
export function getAllPackageBook(query) {
  return request({
    url: 'api/v1/list-audiobook-packages',
    method: 'get',
    params: query,
  });
}
