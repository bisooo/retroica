"use client";

export function GlobalStyles() {
  return (
    <style jsx global>{`
      ::selection {
        background-color: #ff5c00;
        color: black;
      }

      .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `}</style>
  );
}
