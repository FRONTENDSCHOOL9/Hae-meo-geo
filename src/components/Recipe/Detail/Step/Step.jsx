import { useEffect, useState } from "react";
import styles from "./Step.module.css";

function Step({ data }) {
  const { step } = styles;
  const [manual, setManual] = useState([]);

  const setManualFn = () => {
    const newArr = Array(20).fill("");
    newArr.map((_, i) => {
      let num = i + 1 < 10 ? `0${i + 1}` : i + 1;
      newArr[i] = {
        [`desc${i + 1}`]: data[`MANUAL${num}`],
        [`img${i + 1}`]: data[`MANUAL_IMG${num}`],
      };
    });
    setManual(newArr);
  };

  useEffect(() => {
    if (Object.keys(data).length) setManualFn();
  }, [data]);

  const list = manual.map((item, i) => {
    const idx = i + 1;
    if (!item[`img${idx}`]) return;
    const desc = item[`desc${idx}`].split(". ")[1];
    return (
      <li key={idx}>
        <img src={item[`img${idx}`]} alt={`${idx}단계`} />
        <p>
          <span>{idx}</span>
          {desc}
        </p>
      </li>
    );
  });

  return (
    <>
      <ul className={step}>{list}</ul>
    </>
  );
}

export default Step;
