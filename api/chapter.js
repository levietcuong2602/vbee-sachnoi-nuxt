import request from "@/utils/request";

export function getChapters(params) {
  return request({
    url: "/api/v1/chapters",
    method: "GET",
    params
  });
}

export function getChapter(chapterId) {
  return request({
    url: `/api/v1/chapters/${chapterId}`,
    method: "GET",
    type: "GET"
  });
}

export function updateChapter(chapterId, params) {
  return request({
    url: `/api/v1/chapters/${chapterId}`,
    method: "PUT",
    data: params
  });
}

export function downloadChapter(url) {
  return request({
    url,
    method: "GET",
    responseType: "blob"
  });
}
