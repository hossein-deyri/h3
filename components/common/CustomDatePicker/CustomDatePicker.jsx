import { CustomDatePickerStyles } from "./CustomDatePickerStyles";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const CustomDatePicker = ({
  value,
  onDateChange,
  minDate = "",
  maxDate = "",
  disabled = false,
  placeholder,
  error,
  touched,
}) => {
  const handleDatePicker = (e) => {
    onDateChange(e);
  };

  const weekDays = ["شنبه", "یک", "دو", "سه‌", "چهار", "پنج", "جمعه"];

  return (
    <CustomDatePickerStyles
      className={`has-validation ${
        touched ? (error ? "is-invalid" : "is-valid") : ""
      }`}
    >
      <DatePicker
        value={value || ""}
        onChange={(e) => handleDatePicker(e)}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD HH:mm"
        minDate={minDate}
        maxDate={maxDate}
        weekDays={weekDays}
        plugins={[<TimePicker position="bottom" hideSeconds />]}
        inputClass={`datepicker-input ${
          touched ? (error ? "is-invalid" : "is-valid") : ""
        }`}
        disabled={disabled}
        placeholder={placeholder}
      />
      {touched && error && <div className="invalid-feedback">{error}</div>}
    </CustomDatePickerStyles>
  );
};

export default CustomDatePicker;
