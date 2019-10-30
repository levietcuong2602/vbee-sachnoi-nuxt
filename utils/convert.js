export function changeToSlug(title = "vbee", replace = "_") {
  var slug = "";
  var titleLower = title.toLowerCase();
  slug = titleLower.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  slug = slug.replace(/ /gi, replace);
  slug = slug.replace(/\-\-\-\-\-/gi, replace);
  slug = slug.replace(/\-\-\-\-/gi, replace);
  slug = slug.replace(/\-\-\-/gi, replace);
  slug = slug.replace(/\-\-/gi, replace);
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
}

export function convertDate(inputFormat, format = "DD/MM/YYYY") {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  if (format === "DD/MM/YYYY") {
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  } else if (format === "YYYY-MM-DD") {
    return [pad(d.getFullYear()), pad(d.getMonth() + 1), d.getDate()].join("-");
  }
}

export function getMoneyByCharacters(characters) {
  characters = Number(characters);
  let totalMoney = 0;
  if (characters <= 1000000) {
    totalMoney = (characters / 10) * 3;
  } else if (characters > 1000000 && characters <= 10000000) {
    totalMoney = (characters / 10) * 2.9;
  } else if (characters > 10000000 && characters <= 20000000) {
    totalMoney = (characters / 10) * 2.8;
  } else if (characters > 20000000 && characters <= 50000000) {
    totalMoney = (characters / 10) * 2.7;
  } else if (characters > 50000000 && characters <= 100000000) {
    totalMoney = (characters / 10) * 2.5;
  } else if (characters > 100000000 && characters <= 200000000) {
    totalMoney = (characters / 10) * 2.3;
  } else if (characters > 200000000 && characters <= 500000000) {
    totalMoney = (characters / 10) * 2;
  } else if (characters > 500000000) {
    totalMoney = (characters / 10) * 1.7;
  }
  return totalMoney;
}

export function getTotalCharacters(text) {
  const words = text.split(/[ -./\\()"',;<>~!@#$%^&*|+=[\]{}`~?:]/u);
  var totalCount = 0;
  for (const word of words) {
    totalCount += word.length;
  }
  return totalCount;
}

export function breakTextToWords(text) {}

export function detachSentences(characters) {
  var sentences = characters
    .replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|")
    .split("|");
  return sentences;
}

export function getPageSentences(characters, limit) {
  var pages = [];
  var sentences = characters
    .replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|")
    .split("|");

  var totalSentence = sentences.length;
  var pageLength = 0;
  var start = 0;

  for (var i = 0; i < totalSentence; ++i) {
    pageLength += sentences[i].length;
    if (pageLength > limit) {
      pages.push(sentences.slice(start, i).join(" "));
      start = i;
      pageLength = 0;
    }
  }
  if (pageLength > 0) {
    pages.push(sentences.slice(start, i).join(" "));
  }
  if (totalSentence <= 0) {
    pages = [characters];
  }
  return pages;
}

export function pagination({ characters, limit, pageNum }) {
  var pages = getPageSentences(characters, limit);

  const totalPage = pages.length;
  const currentPageNum = totalPage >= pageNum ? pageNum : 1; // <= totalPage ? pageNum : totalPage;
  const hasPrev = currentPageNum > 1;
  const hasNext = currentPageNum < totalPage;
  const data = pages.length > 0 ? pages[currentPageNum - 1] : "";
  return {
    pager: {
      currentPageNum,
      hasPrev,
      hasNext,
      limit,
      prevPageNum: hasPrev ? currentPageNum - 1 : undefined,
      nextPageNum: hasNext ? currentPageNum + 1 : undefined,
      lastPageNum: totalPage
    },
    data
  };
}

export function detachChapter(content) {
  const regex = RegExp(
    /<c[0-9]+>|<C[0-9]+>|<\/c[0-9]+>|<\/C[0-9]+>|<c>|<\/C>|<C>|<\/c>/g
  );
  const regexChapter = RegExp(
    /<h[0-9]+>|<H[0-9]+>|<\/h[0-9]+>|<\/H[0-9]+>|<h>|<\/H>|<H>|<\/h>/g
  );
  if (!regex.test(content)) {
    return [];
  }
  let chapters = content.split(regex);
  let pageStart = 1;
  let pageEnd = 1;

  chapters = chapters
    .filter(chapter => chapter && chapter.length > 100)
    .map(chapter => {
      let pages = getPageSentences(chapter, 3000);
      pageStart = pageEnd;
      pageEnd = pageStart + pages.length;
      var title = null;
      if (regexChapter.test(chapter)) {
        const indexOfStart = chapter.indexOf("<h1>");
        const indexOfEnd = chapter.indexOf("</h1>");
        if (indexOfStart !== -1 && indexOfEnd !== -1) {
          title = chapter.substr(indexOfStart, indexOfEnd + 5);
          chapter = chapter.replace(title, "");
          title = title.replace(/<h[0-9]+>|<\/h[0-9]+>/gi, "");
        }
      }
      return {
        content: chapter,
        start: pageStart,
        end: pageEnd - 1,
        title
      };
    });

  return chapters;
}

export function formatNumber(value) {
  const val = (value / 1).toFixed().replace(",", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
