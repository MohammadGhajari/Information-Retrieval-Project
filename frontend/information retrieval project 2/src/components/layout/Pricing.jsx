import styles from "./../../styles/pricing.module.css";
export default function Pricing() {
  return (
    <div className={styles["container"]}>
      <header>
        <h1>HOW MUCH DOES CUSTOM LINK BUILDING COST?</h1>
        <div className={styles["description-container"]}>
          <p>
            The cost of custom backlink building can vary depending on multiple
            factors, such as the scope of the project, the level of
            customization required, and the expertise of the link building
            providers. The quality of the link also affects how much you’ll pay
            for guest posting.
          </p>
          <p>
            It is essential to consider your specific goals, budget, and the
            value you expect to gain from building links.
          </p>
          <p>
            When it comes to the link building strategy and the resources needed
            to deliver high-quality backlinks, several expenses need to be
            covered to obtain top-notch, authentic outreach-based links.
          </p>
        </div>
      </header>
      <div className={styles["features-container"]}>
        <div className={styles["feature-container"]}>
          <div className={styles["description-container"]}>
            <h1>Writer</h1>
            <p>
              Reliably researched articles by experienced writers require
              certain compensation as well. Obtaining high quality links
              requires relevant, well-drafted content that’s also engaging to
              the reader.
            </p>
          </div>
          <div className={styles["svg-container"]}>
            <img src="./assets/writer.webp" alt="writer fees" />
          </div>
        </div>

        <div className={styles["feature-container"]}>
          <div className={styles["svg-container"]}>
            <img src="./../../../public/assets/admin.webp" alt="admin fees" />
          </div>
          <div className={styles["description-container"]}>
            <h1>Outreach Admin</h1>
            <p>
              Dedicated specialized outreach individuals are needed to reach out
              to these relevant sites and coordinate the placement. These link
              building providers carefully choose guest post links most relevant
              to your business industry.
            </p>
          </div>
        </div>

        <div className={styles["feature-container"]}>
          <div className={styles["description-container"]}>
            <h1>Order Management</h1>
            <p>
              Dedicated team members are also required to oversee your order and
              provide customer service. This ensures your brand is able to build
              links that most closely align with your goals.
            </p>
          </div>
          <div className={styles["svg-container"]}>
            <img src="./assets/order.webp" alt="order fees" />
          </div>
        </div>

        <div className={styles["feature-container"]}>
          <div className={`${styles["svg-container"]} ${styles["last-svg"]}`}>
            <img src="./assets/quality.webp" alt="quality fees" />
          </div>
          <div className={styles["description-container"]}>
            <h1>Quality Control</h1>
            <p>
              While not all link building service providers offer this, properly
              evaluating the quality of each placement typically takes time as
              well. Taking all of these factors into account, the price range
              for a high-quality, relevant outreach-based backlink typically
              falls between $300 and $400 for low-tier domain authority sites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
