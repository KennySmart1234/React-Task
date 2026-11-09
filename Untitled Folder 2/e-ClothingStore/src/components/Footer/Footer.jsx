function Footer() {
  return (
    <footer className="mt-20 bg-[#F2F0F1] px-8 pb-10 pt-16 lg:px-16">

      {/* Newsletter */}
      <div className="mb-16 flex flex-col gap-8 rounded-3xl bg-black px-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">

        <h2 className="max-w-xl text-3xl font-black text-white lg:text-4xl">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>

        <div className="flex w-full flex-col gap-3 lg:w-96">

          <input
            type="email"
            placeholder="Enter your email address"
            className="rounded-full bg-white px-6 py-4 outline-none"
          />

          <button className="rounded-full bg-white px-6 py-4 font-semibold text-black">
            Subscribe to Newsletter
          </button>

        </div>

      </div>

      {/* Footer links */}
      <div className="grid grid-cols-2 gap-10 border-b border-gray-300 pb-12 md:grid-cols-3 lg:grid-cols-5">

        {/* Brand */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">

          <h2 className="mb-4 text-3xl font-black">
            SHOP.CO
          </h2>

          <p className="max-w-xs text-gray-500">
            We have clothes that suits your style and which you're proud to wear.
            From women to men.
          </p>

        </div>

        {/* Company */}
        <div>
          <h3 className="mb-5 font-bold">
            COMPANY
          </h3>

          <div className="space-y-3 text-gray-500">
            <p>About</p>
            <p>Features</p>
            <p>Works</p>
            <p>Career</p>
          </div>
        </div>

        {/* Help */}
        <div>
          <h3 className="mb-5 font-bold">
            HELP
          </h3>

          <div className="space-y-3 text-gray-500">
            <p>Customer Support</p>
            <p>Delivery Details</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="mb-5 font-bold">
            FAQ
          </h3>

          <div className="space-y-3 text-gray-500">
            <p>Account</p>
            <p>Manage Deliveries</p>
            <p>Orders</p>
            <p>Payments</p>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-5 font-bold">
            RESOURCES
          </h3>

          <div className="space-y-3 text-gray-500">
            <p>Free eBooks</p>
            <p>Development Tutorial</p>
            <p>How to - Blog</p>
            <p>Youtube Playlist</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-5 pt-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

        <p>
          Shop.co © 2000-2023, All Rights Reserved
        </p>

        <div className="flex gap-3">
          <span>💳</span>
          <span>💳</span>
          <span>💳</span>
          <span>💳</span>
          <span>💳</span>
        </div>

      </div>

    </footer>
  )
}

export default Footer