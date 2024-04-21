
function FooterComponent() {
  return (
    <div className="sm:fixed w-full bottom-0">
      <div className="flex flex-col w-full h-60% bg-gray-800 p-5 ">
        <div className="flex flex-col">
          <h2 className="text-white text-[30px] mt-[20px] mb-[1em] text-center">
            Reach out to us
          </h2>
          <p className="font-medium text-white text-center text-[16px] leading-[28px] mb-[10px] custom-font">
            We're eager to hear about your feeback. Reach out to us via our
            email or Mobile.
            <br />
          </p>
        </div>
        <div className="flex flex-row justify-center mb-6">
          <div className="flex felx-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 13h3.4a1 1 0 0 1 1 .6 4 4 0 0 0 7.3 0 1 1 0 0 1 .9-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9"
              />
            </svg>
            <h5 className="font-medium text-white text-[16px] leading-loose ml-[1.5px]">
              info@techbuddies.com
            </h5>
          </div>
          <div className="flex felx-row ml-6 items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M5 4c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <h5 className="font-medium text-white text-[16px]  ml-[1.5px]">
              8466818663
            </h5>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-black text-white p-3">
        Copyright © Techbuddies Software Solutions Pvt Ltd
      </div>
    </div>
  );
}

export default FooterComponent;
