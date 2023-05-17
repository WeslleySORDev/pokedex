import { useState } from "react";

export function Filters() {
  const [inputValue, setInputValue] = useState("");
  const [hoveringButton, setHoveringButton] = useState(false);

  const handleInputValue = (value: string) => {
    setInputValue(value);
  };
  const handleHoveringStatus = (value: boolean) => {
    setHoveringButton(value);
  };
  return (
    <div className="flex items-center gap-4 justify-between">
      <form
        action="submit"
        className={`rounded-2xl py-2 pl-3 pr-4 gap-2 w-full flex items-center ${
          inputValue.length > 0 ? "dropshadow-2dp" : "inner-shadow"
        } bg-grayscale-white`}
      >
        <svg
          className="fill-identity-primary w-4 h-4"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38.7 40.85L26.65 28.8C25.65 29.6667 24.4833 30.3417 23.15 30.825C21.8167 31.3083 20.4 31.55 18.9 31.55C15.3 31.55 12.25 30.3 9.75 27.8C7.25 25.3 6 22.2833 6 18.75C6 15.2167 7.25 12.2 9.75 9.7C12.25 7.2 15.2833 5.95 18.85 5.95C22.3833 5.95 25.3917 7.2 27.875 9.7C30.3583 12.2 31.6 15.2167 31.6 18.75C31.6 20.1833 31.3667 21.5667 30.9 22.9C30.4333 24.2333 29.7333 25.4833 28.8 26.65L40.95 38.7C41.25 38.9667 41.4 39.3083 41.4 39.725C41.4 40.1417 41.2333 40.5167 40.9 40.85C40.6 41.15 40.2333 41.3 39.8 41.3C39.3667 41.3 39 41.15 38.7 40.85ZM18.85 28.55C21.55 28.55 23.85 27.5917 25.75 25.675C27.65 23.7583 28.6 21.45 28.6 18.75C28.6 16.05 27.65 13.7417 25.75 11.825C23.85 9.90833 21.55 8.95 18.85 8.95C16.1167 8.95 13.7917 9.90833 11.875 11.825C9.95833 13.7417 9 16.05 9 18.75C9 21.45 9.95833 23.7583 11.875 25.675C13.7917 27.5917 16.1167 28.55 18.85 28.55Z" />
        </svg>
        <input
          value={inputValue}
          onChange={(e) => handleInputValue(e.currentTarget.value)}
          type="text"
          placeholder="Search"
          className="body-3 text-grayscale-dark placeholder:text-grayscale-medium focus:outline-none bg-grayscale-white"
        />
        {inputValue.length > 0 ? (
          <button className="ml-auto" onClick={() => handleInputValue("")}>
            <svg
              className="fill-identity-primary w-4 h-4"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 26.1L13.5 36.6C13.2 36.9 12.85 37.05 12.45 37.05C12.05 37.05 11.7 36.9 11.4 36.6C11.1 36.3 10.95 35.95 10.95 35.55C10.95 35.15 11.1 34.8 11.4 34.5L21.9 24L11.4 13.5C11.1 13.2 10.95 12.85 10.95 12.45C10.95 12.05 11.1 11.7 11.4 11.4C11.7 11.1 12.05 10.95 12.45 10.95C12.85 10.95 13.2 11.1 13.5 11.4L24 21.9L34.5 11.4C34.7999 11.1 35.15 10.95 35.5499 10.95C35.9499 10.95 36.2999 11.1 36.5999 11.4C36.8999 11.7 37.0499 12.05 37.0499 12.45C37.0499 12.85 36.8999 13.2 36.5999 13.5L26.1 24L36.5999 34.5C36.8999 34.8 37.0499 35.15 37.0499 35.55C37.0499 35.95 36.8999 36.3 36.5999 36.6C36.2999 36.9 35.9499 37.05 35.5499 37.05C35.15 37.05 34.7999 36.9 34.5 36.6L24 26.1Z" />
            </svg>
          </button>
        ) : null}
      </form>
      <button
        onMouseEnter={() => handleHoveringStatus(true)}
        onMouseLeave={() => handleHoveringStatus(false)}
        className={`rounded-full p-2 ${
          hoveringButton ? "dropshadow-2dp" : "inner-shadow"
        } bg-grayscale-white`}
      >
        <svg
          className="fill-identity-primary w-4 h-4"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.5 36H7.5C7.06667 36 6.70833 35.8583 6.425 35.575C6.14167 35.2917 6 34.9333 6 34.5C6 34.0667 6.14167 33.7083 6.425 33.425C6.70833 33.1417 7.06667 33 7.5 33H16.5C16.9333 33 17.2917 33.1417 17.575 33.425C17.8583 33.7083 18 34.0667 18 34.5C18 34.9333 17.8583 35.2917 17.575 35.575C17.2917 35.8583 16.9333 36 16.5 36ZM40.5 15H7.5C7.06667 15 6.70833 14.8583 6.425 14.575C6.14167 14.2917 6 13.9333 6 13.5C6 13.0667 6.14167 12.7083 6.425 12.425C6.70833 12.1417 7.06667 12 7.5 12H40.5C40.9333 12 41.2917 12.1417 41.575 12.425C41.8583 12.7083 42 13.0667 42 13.5C42 13.9333 41.8583 14.2917 41.575 14.575C41.2917 14.8583 40.9333 15 40.5 15ZM28.5 25.5H7.5C7.06667 25.5 6.70833 25.3583 6.425 25.075C6.14167 24.7917 6 24.4333 6 24C6 23.5667 6.14167 23.2083 6.425 22.925C6.70833 22.6417 7.06667 22.5 7.5 22.5H28.5C28.9333 22.5 29.2917 22.6417 29.575 22.925C29.8583 23.2083 30 23.5667 30 24C30 24.4333 29.8583 24.7917 29.575 25.075C29.2917 25.3583 28.9333 25.5 28.5 25.5Z" />
        </svg>
      </button>
    </div>
  );
}
