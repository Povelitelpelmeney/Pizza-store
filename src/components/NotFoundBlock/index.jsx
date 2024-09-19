import React from "react";
import styles from "./NotFoundBlock.module.scss";
export default function index() {
  return (
    <div className={styles.root}>
      <h1>
        <span>💀💀💀</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>Что-то пошло не так</p>
    </div>
  );
}
