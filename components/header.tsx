import styles from '../styles/Home.module.css'
import { FC, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../contexts/theme_context';
import { ThemeType } from '../types/types';

const Header: FC = () => {
  const { color_theme, altern_theme } = useContext<ThemeType>(ThemeContext)
  const header_ref = useRef(null)

  useEffect(
    ()=>{
      if(color_theme=="night"){
        header_ref.current.style.backgroundColor = "#444"
        header_ref.current.style.color = "#ddd"
        header_ref.current.style.boxShadow = '0px 5px 10px #222';
      }else{
        header_ref.current.style.backgroundColor = "#ddd"
        header_ref.current.style.color = "#000"
        header_ref.current.style.boxShadow = '0px 5px 10px #bbb';
      }
    }
  ,[color_theme])

  return (
    <div ref={header_ref} className={styles.header}>
        <h1>
            TODO APP
        </h1>
        <label className={styles.switch}>
            <input type='checkbox' onChange={()=>{altern_theme()}}/>
            <span className={styles.slider}></span>
        </label>
    </div>
  );
};

export default Header;