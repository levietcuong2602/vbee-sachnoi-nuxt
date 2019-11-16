import request from "@/utils/request";

export function convertTTS(options) {
  return request({
    method: "POST",
    url: "/api/v1/tts/convert",
    data: options
  });
}

export function convertBook(bookId) {
  return request({
    method: "GET",
    url: `/tts/convert/${bookId}`
  });
}
