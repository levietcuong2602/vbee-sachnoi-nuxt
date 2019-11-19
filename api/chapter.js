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
