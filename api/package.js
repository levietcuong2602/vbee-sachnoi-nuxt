import request from "@/utils/request";

export function getPackages() {
  return request({
    type: "GET",
    method: "GET",
    url: "/api/v1/packages"
  });
}