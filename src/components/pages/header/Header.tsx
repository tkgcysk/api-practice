import React from "react";
import styles from "./Header.module.css";
// import {} from "@material-ui/core";

interface Props {
  handleOnLogout: () => void;
  isLoggedIn: boolean;
}
export const Header: React.FC<Props> = (props) => {
  return (
    <div className={styles.header}>
      <span className={styles.header__title}>task-manager</span>
      <ul className={styles.ul}>
        <li className={styles.li}>Setting</li>
        <li className={styles.li}>Mypage</li>
        <li
          className={styles.li}
          onClick={() => props.handleOnLogout()}
          // propsでログアウトする際のアクションを受け取る
        >
          Logout
        </li>
      </ul>
    </div>
  );
};
