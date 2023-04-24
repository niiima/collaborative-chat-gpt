import React from "react";
import styles from "./ArrowButton.module.css";

function ArrowButton(props) {
  const { onClick, direction } = props;

  return (
    <button className={styles.root} onClick={onClick}>
      <div className={styles[direction]} />
    </button>
  );
}

export default ArrowButton;
