import styled from "styled-components";

const GroupRadioWrapper = styled.div`
  --button-group-height: 30px;
  --button-group-line-height: var(--button-group-height);
  --button-group-padding: 10px;
  --button-group-border-radius: 8px;
  --button-group-font-color: #ccc;
  --button-group-background-color: #03c0e2;
  --button-group-border-color: #fff;
  --button-group-selected-background-color: #39f;
  --button-group-selected-font-color: #fff;
  --button-group-selected-border-color: #666;
  margin: 1px 2px;
  &.button-group {
    display: table;

    .button-group__btn {
      cursor: pointer;
      display: table-cell;
      position: relative;

      input[type="radio"],
      input[type="checkbox"] {
        opacity: 0;
        position: absolute;
      }

      .button-group__label {
        background-color: var(--button-group-background-color);
        border-bottom: 1px solid var(--button-group-border-color);
        border-right: 1px solid var(--button-group-border-color);
        border-top: 1px solid var(--button-group-border-colo);
        color: var(--button-group-font-color);
        display: block;
        /* height: 50px; */
        line-height: var(--button-group-height);
        padding: 0 var(--button-group-padding);
        text-align: center;
      }

      // Border radius on first element
      &:first-child .button-group__label {
        border-left: 1px solid var(--button-group-border-color);
        border-radius: var(--button-group-border-radius) 0 0
          var(--button-group-border-radius);
      }

      // Border radius on last element
      &:last-child .button-group__label {
        border-radius: 0 var(--button-group-border-radius)
          var(--button-group-border-radius) 0;
      }

      // Styles when selected
      input:checked + .button-group__label {
        background-color: var(--button-group-selected-background-color);
        border-bottom-color: var(--button-group-selected-border-color);
        border-top-color: var(--button-group-selected-border-color);
        color: var(--button-group-selected-font-color);
      }

      // Fix selected border on first element
      & .button-group__btn:first-child input:checked + .button-group__label {
        border-left-color: var(--button-group-selected-border-color);
      }

      // Fix selected border on last element
      & .button-group__btn:last-child input:checked + .button-group__label {
        border-right-color: var(--button-group-selected-border-color);
      }
    }

    .button-group--full-width {
      table-layout: fixed;
      width: 100%;
    }

    .button-group + .button-group {
      margin-top: 10px;
    }
  }
`;

const GroupRadioButtons = ({ items, changeHandler }) => {
  return (
    <GroupRadioWrapper className='button-group'>
      {items.map((item) => (
        <label key={item.value} className='button-group__btn'>
          <input
            type='radio'
            name='group'
            value={item.value}
            onChange={() => changeHandler(item.value)}
          />{" "}
          <span className='button-group__label'>{item.text}</span>
        </label>
      ))}
    </GroupRadioWrapper>
  );
};
export default GroupRadioButtons;
