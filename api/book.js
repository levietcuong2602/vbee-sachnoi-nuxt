import request from "@/utils/request";

export function getBooks(params) {
  return request({
    url: "/api/v1/books",
    method: "GET",
    params
  });
}

export function getBookInfo(bookId) {
  return request({ url: `/api/v1/books/${bookId}`, method: "GET" });
}
