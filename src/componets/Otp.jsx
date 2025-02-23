import { useState, useRef } from "react";

const Otp = ({ onSubmit }) => {
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <div className="d-flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleBackspace(index, e)}
            maxLength="1"
            className="form-control text-center fw-bold"
            style={{ width: "45px", height: "45px", fontSize: "1.5rem" }}
          />
        ))}
      </div>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onSubmit(otp.join(""))}
        disabled={otp.includes("")}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default Otp;