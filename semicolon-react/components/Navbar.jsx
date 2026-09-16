
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";


const Navbar = () => {
  return (
    <>
        {/* navbar section */}
    <section className={styles.navSection}>
        <nav className={styles.navbar}>
            {/* logo */}
            <div className={styles.logoBox}>
                <img className={styles.logoImg} src="./public/logo.svg" alt="Semicolon Favicon" />
                {/* <img src="./public/" alt="" /> */}

            </div> 

            {/* navigation links */}
            <ul className={styles.navLinks}>

                    <li>
                        <Link to = "/individuals"> Individuals </Link>
                    </li>

                     <li>
                        <Link to = "/businesses"> Businesses </Link>
                    </li>

                    <li>
                        <Link to = "/about-us"> About Us </Link>
                    </li>

                    <li>
                        <Link to = "/careers"> Careers </Link>
                    </li>

                    <li>
                        <Link to = "/our-impact"> Our Impact </Link>
                    </li>




                {/* join talent-pool button  */}
                <Link className={styles.outlineButton} to="#apply.semicolon.africa" id="join-btn">Join Talent Pool</Link>
            </ul>
        </nav>
    </section>
    
    
    </>
  );
};

export default Navbar;  