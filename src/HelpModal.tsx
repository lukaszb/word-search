export interface Props {
  open?: boolean;
  close?(): void;
}

function HelpModal({ open = false, close }: Props) {
  if (!open) {
    return null;
  }
  const handleClose = () => {
    close?.();
  };

  const shortcuts = [
    {
      id: "help",
      keys: ["h", "?"],
      label: "This help panel",
    },
    {
      id: "showAll",
      keys: ["a"],
      label: "Show all words",
    },
    {
      id: "reload",
      keys: ["r"],
      label: "Generate new puzzle",
    },
  ];

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-400/80"
    >
      {/* wrapper */}
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* modal */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Help
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">Keyboard shortcuts</h3>
            <ul className="flex flex-col gap-2 divide-y divide-gray-100">
              {shortcuts.map((s) => (
                <li
                  className="flex justify-between py-2 items-center"
                  key={s.id}
                >
                  <p>{s.label}</p>
                  <p className="flex gap-2">
                    {s.keys.map((key, idx) => (
                      <>
                        <kbd className="">{key}</kbd>
                        {idx < s.keys.length - 1 && <span>or</span>}
                      </>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
