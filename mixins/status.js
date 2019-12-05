import { STATUS_BOOK, STATUS_SENTENCE } from "@/constant";

export const mixins = {
  methods: {
    convertStatusBook(status) {
      switch (status) {
        case STATUS_BOOK.INIT:
          return "Đã khởi tạo";
        case STATUS_BOOK.WAITING:
          return "Chờ convert";
        case STATUS_BOOK.DONE:
          return "Đã convert";
        default:
          return "Không xác định";
      }
    },
    convertStatusDetail(detail) {
      let total = 0;
      if (!detail) return "Không xác định";

      for (const key in detail) {
        if (detail.hasOwnProperty(key)) {
          total += detail[key];
        }
      }

      let status = "";
      for (const key in detail) {
        if (detail.hasOwnProperty(key)) {
          const percent = Math.round((detail[key] / total) * 100);
          if (key === STATUS_SENTENCE.SUCCESS)
            status += `<i class="text-success">${percent}% thành công</i>`;
          if (key === STATUS_SENTENCE.WAITING)
            status += `<i class="text-warning">${percent}% đang chờ</i>`;
          if (key === STATUS_SENTENCE.PROCESSING)
            status += `<i class="text-muted">${percent}% đang xử lý</i>`;
          if (key === STATUS_SENTENCE.ERROR)
            status += `<i class="text-danger">${percent}% có lỗi</i>`;
          if (key === STATUS_SENTENCE.EDIT)
            status += `<i class="text-primary">${percent}% chỉnh sửa</i>`;
          if (key === STATUS_SENTENCE.ADD)
            status += `<i class="text-info">${percent}% thêm mới</i>`;
        }
      }

      return status;
    }
  }
};
