import request from "@/utils/request";

export async function getBooks(params) {
  return await request({
    url: "/api/v1/books",
    method: "GET",
    params
  });
}

export async function getBookInfo(bookId) {
  return await request({
    url: `/api/v1/books/${bookId}`,
    method: "GET",
    type: "GET"
  });
}

export async function createBook({
  userId,
  title,
  author,
  publicYear,
  status,
  numberChapter,
  voiceId,
  bitRate,
  rate,
  soundBackground,
  usedSoundBackground,
  soundBackgroundVolumn,
  audioType
}) {
  return await request({
    url: "/api/v1/books",
    method: "POST",
    data: {
      user_id: userId,
      title,
      author,
      public_year: publicYear,
      status,
      number_chapter: numberChapter,
      voice_id: voiceId,
      bit_rate: bitRate,
      rate,
      sound_background: soundBackground,
      used_sound_background: usedSoundBackground,
      sound_background_volumn: soundBackgroundVolumn,
      audio_type: audioType
    }
  });
}

export async function updateBook(
  bookId,
  {
    userId,
    title,
    author,
    publicYear,
    status,
    numberChapter,
    voiceId,
    bitRate,
    rate,
    soundBackground,
    usedSoundBackground,
    soundBackgroundVolumn,
    audioType
  }
) {
  return await request({
    url: `/api/v1/books/${bookId}`,
    method: "PUT",
    data: {
      user_id: userId,
      title,
      author,
      public_year: publicYear,
      status,
      number_chapter: numberChapter,
      voice_id: voiceId,
      bit_rate: bitRate,
      rate,
      sound_background: soundBackground,
      used_sound_background: usedSoundBackground,
      sound_background_volumn: soundBackgroundVolumn,
      audio_type: audioType
    }
  });
}
