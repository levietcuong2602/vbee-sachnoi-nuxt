import request from "@/utils/request";

export function getChapters(params) {
  return request({
    url: "/api/v1/chapters",
    method: "GET",
    params
  });
}
