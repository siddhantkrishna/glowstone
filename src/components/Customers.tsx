const customers = [
  {
    name: "CHARVIKON",
    url: "https://charvikon.com",
    description: "Education & technology",
    image: "/customers/charvikon.png",
  },
  {
    name: "SPARK LABS",
    url: "https://spark.charvikon.com",
    description: "AI learning laboratory",
    image: "/customers/spark-labs.jpg",
  },
  {
    name: "SPARK ACADEMY",
    url: "https://academy.charvikon.com",
    description: "Learning platform",
    image: "/customers/spark-academy.png",
  },
  {
    name: "SIDDHANT KRISHNA",
    url: "https://siddhantkrishna.com",
    description: "Personal website",
    image: null,
  },
  {
    name: "AIIT COLLEGE",
    url: "https://aiitcollege.in",
    description: "Technology institute",
    image: "/customers/aiit-college.png",
  },
  {
    name: "NGC SABLE",
    url: "https://ngc-sable.vercel.app/",
    description: "Digital experience",
    image: null,
  },
];

export default function Customers() {
  return (
    <section className="glowstone-customers">
      <div className="glowstone-customers-inner">

        <div className="glowstone-customers-header">
          <div>
            <span className="glowstone-customers-eyebrow">
              Selected clients
            </span>

            <h2>Our customers.</h2>
          </div>

          <p>
            A selection of brands, founders and organisations
            we’ve built digital experiences for.
          </p>
        </div>

        <div className="glowstone-customers-grid">
          {customers.map((customer) => (
            <a
              key={customer.name}
              href={customer.url}
              target="_blank"
              rel="noreferrer"
              className="glowstone-customer-card"
            >
              <div
                className={`glowstone-customer-thumbnail ${
                  customer.image
                    ? "glowstone-customer-thumbnail-image"
                    : ""
                }`}
              >
                {customer.image && (
                  <img
                    src={customer.image}
                    alt={`${customer.name} logo`}
                  />
                )}
              </div>

              <div className="glowstone-customer-content">
                <div>
                  <h3>{customer.name}</h3>
                  <p>{customer.description}</p>
                </div>

                <span className="glowstone-customer-arrow">↗</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
