import styles from "./../../styles/principles.module.css";
export default function Principles() {
  return (
    <div className={styles["container"]}>
      <header>
        <h1>TOP Principles of our link building company</h1>
      </header>
      <div className={styles["features-container"]}>
        <div className={styles["feature-container"]}>
          <div className={styles["description-container"]}>
            <h1>Scalability</h1>
            <p>
              The link building process at scale requires specialized marketing
              capabilities. Our extensive industry relationships and expertise
              allow us to cater to the unique needs of our clients across all
              niches. Years of experience developing effective link building
              solutions enable us to seamlessly integrate with your team,
              expanding your backlink portfolio on a larger scale.
            </p>
          </div>
          <div className={styles["svg-container"]}>
            <img src="./assets/scalibility.webp" alt="scalibility" />
          </div>
        </div>

        <div className={styles["feature-container"]}>
          <div className={styles["svg-container"]}>
            <img src="./assets/Sustainability.webp" alt="Sustainability" />
          </div>
          <div className={styles["description-container"]}>
            <h1>Sustainability</h1>
            <p>
              Consistently building links for your website demands time,
              resources, and focused effort, particularly in a competitive
              search landscape. By outsourcing this aspect of SEO to our link
              building firm, you gain the full support of our dedicated team in
              executing a sustainable link building strategy. We ensure the
              continuous acquisition of quality links to your site, enabling you
              to thrive online.
            </p>
          </div>
        </div>

        <div className={styles["feature-container"]}>
          <div className={styles["description-container"]}>
            <h1>Quality</h1>
            <p>
              We uphold the highest quality standards for our SEO link building
              methods, ensuring the acquisition of valuable backlinks. Our
              expertise boosts brand awareness among your target audience,
              delivering reliable and impactful results.
            </p>
          </div>
          <div className={styles["svg-container"]}>
            <img src="./assets/quality2.webp" alt="Quality" />
          </div>
        </div>
      </div>
    </div>
  );
}
