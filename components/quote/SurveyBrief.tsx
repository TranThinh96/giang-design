import { BriefBox } from "./BriefBox";

/**
 * The site-survey brief.
 *
 * Signage, shop fit-out, booths and seasonal décor cannot be quoted from a
 * file — someone has to stand in front of the wall and measure it. That makes
 * it a different sale from printing, with different questions (where is the
 * frontage, how wide, is there power, when can we come), and it deserves its
 * own path rather than being squeezed into the printing brief.
 *
 * No state of its own, so it stays a Server Component; `BriefBox` owns the
 * clipboard.
 */
function buildMessage() {
  return [
    "Chào Giang Design, mình muốn đặt lịch khảo sát:",
    "• Hạng mục (bảng hiệu / hộp đèn / thi công shop / gian hàng / trang trí):",
    "• Địa chỉ mặt bằng:",
    "• Kích thước mặt tiền ước tính (ngang × cao):",
    "• Đã có sẵn điện tại vị trí lắp chưa:",
    "• Thời gian mong muốn hoàn thành:",
    "• Khung giờ tiện cho xưởng tới khảo sát:",
    "• Người liên hệ tại mặt bằng:",
  ].join("\n");
}

export function SurveyBrief({ zalo }: { zalo: string }) {
  return (
    <BriefBox
      title="Nội dung nên nhắn khi đặt khảo sát"
      intro="Có địa chỉ và kích thước ước tính là xưởng đã ước lượng được chi phí trước khi tới, nên buổi khảo sát chỉ còn là chốt phương án."
      message={buildMessage()}
      zalo={zalo}
      note="Ảnh chụp mặt bằng hiện trạng gửi kèm trong Zalo sẽ rút ngắn được một vòng trao đổi."
    />
  );
}
