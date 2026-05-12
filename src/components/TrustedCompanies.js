export default function TrustedCompanies() {
  const companies = [
    { name: "Paystack", logo: "/paystack.png" },
    { name: "GIG Logistics", logo: "/gig.png" },
    { name: "Paga", logo: "/paga.png" },
    { name: "DHL", logo: "/dhl.png" },
    { name: "Sendbox", logo: "/sendbox.png" },
    { name: "Mercado", logo: "/mercado.png" },
    { name: "Flutterwave", logo: "/flutterwave.png" },
    { name: "Paypal", logo: "/PayPal.png" },
  ];

  return (
    <section className="relative z-10 bg-black md:pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center ">
          <p className="text-sm uppercase tracking-[0.25em] text-white/50 mb-3">
            Trusted Integrations
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
            Powered By Industry Leaders
          </h2>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 gap-y-2 md:gap-y-2 pt-10">
          {companies.map((company) => (
            <div
              key={company.name}
              className="group flex items-center justify-center h-[140px] backdrop-blur-md px-6 pb-5 transition-all duration-300"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="max-h-18 max-w-[180px] w-auto object-contain transition-all duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
