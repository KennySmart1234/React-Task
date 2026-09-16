import styles from "./mainsection.module.css";

const MainSection = () => {
  return (
    // <div>MainSection</div>

    <>
      {/* <!-- hero section --> */}
    <section className={styles.heroSection}>
        {/* <!-- left div --> */}
         <div className={styles.heroLeft}>
            <h1>Accelerating Africa's Digital Transformation</h1>

            <small>We are on a mission to empower African talent and drive digital innovation across the continent.</small>

            <div className={styles.buttons}>
                <a className={styles.mainButton} href="#">For Individuals</a>
                <a className={styles.outlineButton} href="#">For Businesses</a>
            </div>
         </div>

        {/* <!-- right div --> */}
         <div className={styles.heroImage}>
            <img src="./public/hero-gif.gif" alt="hero-gif"/>
         </div>
    </section>

    {/* <!-- what we do section --> */}
    <section className={styles.whatWeDo}>
         <h3 className={styles.title}>What <span className={styles.colored}>We</span> Do</h3>
         
         <div className={styles.boxes}>  
         {/* <!-- left box --> */}       
        <div className={styles.box}>
            <img src="./public/circle.svg" alt=""/>
            <p>We help <span className={styles.hero}>
              individuals</span> thrive and stand out 
              in the digital economy by training them
               to become world-className tech professionals. 
               We also help entrepreneurs successfully launch
                impactful, job-creating companies.</p>
        </div>

         {/* <!-- right box --> */}
          <div className={styles.box} >
            <img src="./public/circle.svg" alt=""/>
             <p>We support <span className={styles.hero}>
              businesses</span> on their digital transformation 
              journeys through talent placement, employee upskilling,
               project delivery, and advisory services.</p>
          </div>

          
        </div>
    </section>
    
    
    </>


  )
}

export default MainSection