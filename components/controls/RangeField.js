import { useState } from "react";
import styles from "./RangeField.module.css";
import ArrowButton from "./ArrowButton";

const RangeMode = {
  lessThen: "lessThen",
  exact: "exact",
  greaterThen: "greaterThen",
  range: "range",
  inverseRange: "inverseRanges",
};

function absoluteToPercentageValue(min, max, value) {
  return ((value - min) / (max - min)) * 100;
}

function percentageToAbsoluteValue(min, max, value) {
  return (value / 100) * (max - min) + min;
}

const valueFormatterFn = (v) => v;

const RangeField = (props) => {
  const { val, min, max, step } = props;
  const [value, setValue] = useState(val);

  const handleRangeChange = () => (ev) => {
    const value = parseInt(ev.target.value, 10);

    setValue(value);
  };

  const handleIncreaseClick = () => {
    setValue((currentValue) => {
      if (min > value || value >= max) {
        return currentValue;
      }
      return currentValue + step;
    });
  };

  const handleDecreaseClick = () => {
    if (min >= value || value > max) {
      return;
    }

    setValue((currentValue) => currentValue - step);
  };

  //const { min, max, step, valueFormatterFn, mode } = this.props;

  //const { firstValue, secondValue } = this.state;
  // const leftBound = absoluteToPercentageValue(min, max, firstValue);
  // const rightBound = absoluteToPercentageValue(min, max, secondValue);

  //const rangeIsActive =
  //mode === RangeMode.range || mode === RangeMode.inverseRange;
  const mode = "exact";
  return (
    <div>
      <label className='label__center'>
        {valueFormatterFn(value)}
        {/* {rangeIsActive && ` to ${valueFormatterFn(secondValue)}`} */}
      </label>

      <div className={styles.range}>
        <div className={styles.range__track} />

        <input
          className={styles.range__input}
          type='range'
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleRangeChange()}
          name='firstValue'
        />

        {/* {rangeIsActive && (
            <input
              className={styles.range__input}
              type="range"
              value={secondValue}
              onChange={this.handleRangeChange("secondValue")}
              min={min}
              max={max}
              step={step}
              name="secondValue"
            />
          )} */}
      </div>
      <div className={styles.range__controls}>
        <div>
          <ArrowButton onClick={() => handleDecreaseClick()} direction='left' />
          <ArrowButton
            onClick={() => handleIncreaseClick()}
            direction='right'
          />
        </div>
        {/* {rangeIsActive && (
            <div>
              <ArrowButton
                onClick={() => this.handleDecreaseClick("secondValue")}
                direction="left"
              />
              <ArrowButton
                onClick={() => this.handleIncreaseClick("secondValue")}
                direction="right"
              />
            </div>
          )} */}
      </div>
    </div>
  );
};

export default RangeField;
